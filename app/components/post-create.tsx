// app/components/post-create.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { createPost } from "@/lib/actions/create-post";

// Form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(50, { message: "Title must be 50 characters or less" }),
  content: z.string().min(1, { message: "Content is required" }),
  images: z.array(z.instanceof(File)).optional(),
  privacyType: z.enum(["public", "clubs", "classes", "privacy_lists"]).optional(),
  selectedItems: z.array(z.string()).optional(),
  everyone: z.boolean(),
  exception: z.array(z.string()).optional(),
});

type PrivacyType = "public" | "clubs" | "classes" | "privacy_lists";
interface PrivacyOption { uid: string; name: string; }
interface PrivacyOptions {
  groups: PrivacyOption[];
  clubs: PrivacyOption[];
  classes: PrivacyOption[];
  users: PrivacyOption[];
  [key: string]: PrivacyOption[];
}

export default function PostCreate({ user }: { user: { uid: string } | null }) {
  const [isPending, startTransition] = useTransition();
  const [privacyOptions, setPrivacyOptions] = useState<PrivacyOptions | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      images: [],
      privacyType: "public",
      selectedItems: [],
      everyone: true,
      exception: [],
    },
  });

  // Fetch privacy options
  useEffect(() => {
    if (!user?.uid) {
      setError("User not authenticated");
      return;
    }

    const fetchOptions = async () => {
      const endpoints = [
        { url: `/api/user/privacy/lists?user_uuid=${user.uid}`, key: "groups" },
        { url: `/api/user/clubs?user_uuid=${user.uid}`, key: "clubs" },
        { url: `/api/user/classes?user_uuid=${user.uid}`, key: "classes" },
      ];

      const errors: string[] = [];
      const results = await Promise.all(
        endpoints.map(async ({ url, key }) => {
          try {
            const res = await fetch(url);
            if (!res.ok) {
              throw new Error(`Failed to fetch ${key}: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.error) {
              throw new Error(`Failed to fetch ${key}: ${data.error}`);
            }
            return { key, data: data.data || [] };
          } catch (err: any) {
            errors.push(err.message);
            return { key, data: [] };
          }
        })
      );

      if (errors.length > 0) {
        setApiErrors(errors);
        setError("Failed to load some privacy options");
        return;
      }

      const options: PrivacyOptions = results.reduce((acc, { key, data }) => {
        acc[key] = data;
        return acc;
      }, { groups: [], clubs: [], classes: [], users: [] } as PrivacyOptions);

      setPrivacyOptions(options);
      setApiErrors([]);
      setError(null);
    };

    fetchOptions();
  }, [user?.uid]);

  // Reset privacyType and selectedItems when everyone is enabled
  const everyone = form.watch("everyone");
  useEffect(() => {
    if (everyone) {
      form.setValue("privacyType", "public");
      form.setValue("selectedItems", []);
      form.setValue("exception", []);
    }
  }, [everyone, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("privacyType", values.privacyType || "public");
      formData.append("selectedItems", JSON.stringify(values.selectedItems));
      formData.append("everyone", values.everyone.toString());
      formData.append("exception", JSON.stringify([]));
      selectedFiles.forEach((file) => formData.append("images", file));

      const result = await createPost(formData);
      if (result.error) {
        setError(result.error);
      } else {
        form.reset();
        setSelectedFiles([]);
        setError(null);
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          setError("Each file must be under 10MB");
          return false;
        }
        return true;
      });
      setSelectedFiles(validFiles);
    }
  };

  const privacyTypes: PrivacyType[] = ["clubs", "classes", "privacy_lists"];
  const currentItems =
    form.watch("privacyType") === "clubs"
      ? privacyOptions?.clubs || []
      : form.watch("privacyType") === "classes"
      ? privacyOptions?.classes || []
      : form.watch("privacyType") === "privacy_lists"
      ? privacyOptions?.groups || []
      : [];

  return (
    <div className="p-4 bg-background rounded-lg shadow-md border border-border max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter post title"
                    className="border border-input rounded-md p-3 text-foreground bg-background focus:ring-primary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What's on your mind?"
                    className="resize-none border border-input rounded-md p-3 text-foreground bg-background focus:ring-primary min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel className="text-foreground">Images (up to 10MB each)</FormLabel>
            <FormControl>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="text-foreground bg-background border-input"
              />
            </FormControl>
            {selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </FormItem>
          <FormField
            control={form.control}
            name="everyone"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel className="text-foreground">Visible to Everyone</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!everyone && (
            <>
              <FormField
                control={form.control}
                name="privacyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Privacy Types</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {privacyTypes.map((type) => (
                        <Button
                          key={type}
                          variant={field.value === type ? "default" : "secondary"}
                          className={cn(
                            "text-sm",
                            field.value === type
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                          )}
                          onClick={() => {
                            form.setValue("privacyType", type);
                            form.setValue("selectedItems", []);
                          }}
                        >
                          {type === "privacy_lists" ? "Groups" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("privacyType") && currentItems.length > 0 && (
                <FormField
                  control={form.control}
                  name="selectedItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Select {form.watch("privacyType") === "privacy_lists" ? "groups" : form.watch("privacyType")}
                      </FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {currentItems.map((item) => (
                          <Button
                            key={item.uid}
                            variant={(field.value || []).includes(item.uid) ? "default" : "secondary"}
                            className={cn(
                              "text-sm",
                              (field.value || []).includes(item.uid)
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            )}
                            onClick={() => {
                              const current = field.value || [];
                              const updated = current.includes(item.uid)
                                ? current.filter((id) => id !== item.uid)
                                : [...current, item.uid];
                              field.onChange(updated);
                            }}
                          >
                            {item.name}
                          </Button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          {apiErrors.length > 0 && (
            <div className="text-destructive text-sm">
              <p>Errors loading privacy options:</p>
              <ul className="list-disc pl-5">
                {apiErrors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? "Posting..." : "Post"}
          </Button>
          {error && <p className="text-destructive text-center">{error}</p>}
        </form>
      </Form>
    </div>
  );
}