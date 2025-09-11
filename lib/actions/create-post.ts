// lib/actions/create-post.ts
"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserFromCookie } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";
import { VerifiedUser } from "@/lib/auth/types";

export async function createPost(formData: FormData) {
  const user = await getUserFromCookie() as VerifiedUser | null;
  if (!user) {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const privacyType = formData.get("privacyType") as string;
  const selectedItemsStr = formData.get("selectedItems") as string;
  const everyone = formData.get("everyone") === "true";
  const selectedItems = selectedItemsStr ? JSON.parse(selectedItemsStr) : [];
  const images = formData.getAll("images") as File[];

  if (!title) {
    return { error: "Title is required" };
  }
  if (!content) {
    return { error: "Content is required" };
  }

  if (images.length > 0) {
    for (const file of images) {
      if (file.size > 10 * 1024 * 1024) {
        return { error: "Each image must be under 10MB" };
      }
    }
  }

  const supabase = createSupabaseServerClient();

  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert({
      poster: user.uid,
      type: "post",
      title,
      description: content,
    })
    .select("uid")
    .single();

  if (postError) {
    return { error: postError.message };
  }

  const postUid = post.uid;

  // Upload images
  for (let index = 0; index < images.length; index++) {
    const file = images[index];
    const fileExt = file.name.split(".").pop();
    const filePath = `${postUid}/${index + 1}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("posts")
      .upload(filePath, file);

    if (uploadError) {
      await supabase.from("posts").delete().eq("uid", postUid);
      return { error: uploadError.message };
    }

    const { data: { publicUrl } } = supabase.storage.from("posts").getPublicUrl(filePath);

    const { error: fileInsertError } = await supabase
      .from("post_files")
      .insert({
        post_id: postUid,
        file_name: file.name,
        file_url: publicUrl,
      });

    if (fileInsertError) {
      await supabase.storage.from("posts").remove([filePath]);
      await supabase.from("posts").delete().eq("uid", postUid);
      return { error: fileInsertError.message };
    }
  }

  // Insert post_privacy if not everyone
  if (!everyone) {
    const privacyData: any = { post_uid: postUid, everyone, exception: [] };
    if (privacyType !== "public") {
      if (privacyType === "clubs") {
        privacyData.clubs = selectedItems;
      } else if (privacyType === "classes") {
        privacyData.class = selectedItems;
      } else if (privacyType === "privacy_lists") {
        privacyData.privacy_list = selectedItems;
      }
    }

    const { error: privacyError } = await supabase.from("post_privacy").insert(privacyData);

    if (privacyError) {
      await supabase.from("posts").delete().eq("uid", postUid);
      await supabase.storage.from("posts").remove(
        images.map((_, i) => `${postUid}/${i + 1}.${_.name.split(".").pop()}`)
      );
      return { error: privacyError.message };
    }
  }

  revalidatePath("/home");

  return { success: true };
}