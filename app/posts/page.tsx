// app/page.tsx (or pages/index.tsx if using Pages Router)
"use client";
import { SetStateAction, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

const privacyOptions = [
  { value: "public", label: "Public" },
  { value: "friends", label: "Friends only" },
  { value: "private", label: "Private" },
];

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleAttachmentChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setAttachments(Array.from(e.target.files));
  }

  function addEmoji(emoji: string) {
    setDescription((desc) => desc + emoji);
    setShowEmojiPicker(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    toast.success("Post submitted!");
    setTitle("");
    setDescription("");
    setAttachments([]);
    setPrivacy("public");
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full p-6 rounded-lg shadow-lg bg-card border border-border"
        style={{ borderRadius: "var(--radius)" }}
      >
        <h2 className="text-2xl font-semibold mb-6 font-brand bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Create a Post
        </h2>

        {/* Title */}
        <div className="mb-4">
          <Label htmlFor="title" className="font-medium text-secondary-foreground">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
            required
            className="mt-1 bg-background text-foreground border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
        </div>

        {/* Description + emoji */}
        <div className="mb-4 relative">
          <Label htmlFor="description" className="font-medium text-secondary-foreground">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Write something..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 bg-background text-foreground border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          <button
            type="button"
            aria-label="Toggle emoji picker"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="absolute top-9 right-3 text-accent hover:text-primary transition-colors"
          >
            ☺︎
          </button>

          {showEmojiPicker && (
            <div
              className="absolute top-full right-0 mt-2 p-2 bg-popover text-popover-foreground border border-border rounded shadow-lg z-10"
              style={{ width: 200 }}
            >
              {["😀", "😂", "😍", "😎", "👍", "🎉", "🚀"].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  className="text-xl mr-2 mb-2 rounded px-1 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-popover"
                  aria-label={`Add emoji ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Attachments */}
        <div className="mb-4">
          <Label htmlFor="attachments" className="font-medium text-secondary-foreground">
            Attachments
          </Label>
          <input
            id="attachments"
            type="file"
            multiple
            onChange={handleAttachmentChange}
            className="block mt-1 file:mr-3 file:rounded file:border-0 file:bg-secondary file:text-secondary-foreground file:px-3 file:py-1.5 hover:file:bg-secondary/80"
          />
          {attachments.length > 0 && (
            <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside">
              {attachments.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Privacy */}
        <div className="mb-6">
          <Label htmlFor="privacy" className="font-medium text-secondary-foreground mb-1 block">
            Privacy Settings
          </Label>
          <Select onValueChange={setPrivacy} value={privacy}>
            <SelectTrigger
              id="privacy"
              className="w-full bg-background text-foreground border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <SelectValue placeholder="Select privacy" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground border border-border">
              <SelectGroup>
                <SelectLabel className="text-muted-foreground">Privacy</SelectLabel>
                {privacyOptions.map(({ value, label }) => (
                  <SelectItem key={value} value={value} className="focus:bg-secondary/30">
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Post
        </Button>
      </form>
    </main>
  );
}
