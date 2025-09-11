// app/posts/[post_uid]/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

// Link the interactive components
import { EngagementActions } from "./engangement-actions";
import { Comments } from "./comments-section";

interface PostData {
  uid: string;
  author_uid: string;
  title: string;
  description: string | null;
  type: string;
  created_at: string;
  updated_at: string;
}

interface PostFile {
  uid: string;
  file_name: string;
  file_url: string;
  contentType: string | null;
}

interface PostEngagement {
  uid: string;
  user_uid: string;
  engagement_type: string;
  comment_content: string | null;
  created_at: string;
}

interface AuthorData {
  id: string;
  email: string;
  user_metadata: {
    name?: string;
    username?: string;
    avatar_url?: string;
  };
}

async function getPostData(postUid: string) {
  const supabase = createSupabaseServerClient();

  // Get post data
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("uid", postUid)
    .single();

  if (postError || !post) {
    return null;
  }

  // Get post files
  const { data: files } = await supabase
    .from("post_files")
    .select("*")
    .eq("post_id", postUid)
    .order("created_at", { ascending: true });

  // Get post engagements
  const { data: engagements } = await supabase
    .from("post_engagements")
    .select("*")
    .eq("post_id", postUid)
    .order("created_at", { ascending: false });

  // Get current user for personalized engagement state
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  // Replace with real author profile fetch if available
  const authorData: AuthorData = {
    id: post.author_uid,
    email: "user@example.com",
    user_metadata: {
      name: "John Doe",
      username: "johndoe",
      avatar_url: "/placeholder-avatar.jpg",
    },
  };

  return {
    post: post as PostData,
    files: (files || []) as PostFile[],
    engagements: (engagements || []) as PostEngagement[],
    author: authorData,
    currentUser,
  };
}

export default async function PostPage({
  params,
}: {
  params: { post_uid: string };
}) {
  const data = await getPostData(params.post_uid);

  if (!data) {
    notFound();
  }

  const { post, files, engagements, author, currentUser } = data;

// snippet inside default PostPage after computing engagements:
const likes = engagements.filter(e => e.engagement_type === "like").length;
const commentsEng = engagements.filter(e => e.engagement_type === "comment");
const shares = engagements.filter(e => e.engagement_type === "share").length;

const isLiked = !!currentUser && engagements.some(e => e.user_uid === currentUser.id && e.engagement_type === "like");
const isBookmarked = !!currentUser && engagements.some(e => e.user_uid === currentUser.id && e.engagement_type === "bookmark");

// Map PostEngagement[] -> Comment[] with non-null content
const commentItems = commentsEng
  .filter(c => typeof c.comment_content === "string" && c.comment_content.trim().length > 0)
  .map(c => ({
    uid: c.uid,
    user_uid: c.user_uid,
    comment_content: c.comment_content as string,
    created_at: c.created_at,
  }));

  // Separate media files
  const images = files.filter((f) => f.contentType?.startsWith("image/"));
  const videos = files.filter((f) => f.contentType?.startsWith("video/"));
  const otherFiles = files.filter(
    (f) =>
      !f.contentType?.startsWith("image/") && !f.contentType?.startsWith("video/")
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-2xl py-8 px-4">
        <Card className="w-full">
          {/* Post Header */}
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={author.user_metadata.avatar_url} />
                  <AvatarFallback>
                    {author.user_metadata.name?.charAt(0) ||
                      author.user_metadata.username?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Link
                    href={`/profile/${author.user_metadata.username || author.id}`}
                    className="font-semibold text-sm hover:underline"
                  >
                    {author.user_metadata.name ||
                      author.user_metadata.username ||
                      "Anonymous"}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Post Title */}
            {post.title && (
              <h1 className="text-lg font-semibold">{post.title}</h1>
            )}

            {/* Post Description */}
            {post.description && (
              <p className="text-sm leading-relaxed">{post.description}</p>
            )}

            {/* Post Type Badge */}
            {post.type !== "post" && (
              <Badge variant="secondary" className="w-fit">
                {post.type}
              </Badge>
            )}

            {/* Media Gallery */}
            {(images.length > 0 || videos.length > 0) && (
              <div className="space-y-2">
                {/* Images */}
                {images.length > 0 && (
                  <div
                    className={`grid gap-2 ${
                      images.length === 1
                        ? "grid-cols-1"
                        : images.length === 2
                        ? "grid-cols-2"
                        : images.length === 3
                        ? "grid-cols-3"
                        : "grid-cols-2"
                    }`}
                  >
                    {images.map((image, index) => (
                      <div
                        key={image.uid}
                        className={`relative overflow-hidden rounded-lg ${
                          images.length === 1
                            ? "aspect-square max-h-96"
                            : images.length > 3 && index >= 3
                            ? "hidden"
                            : "aspect-square"
                        }`}
                      >
                        <Image
                          src={image.file_url}
                          alt={image.file_name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-200"
                        />
                        {images.length > 4 && index === 3 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold">
                              +{images.length - 4} more
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Videos */}
                {videos.map((video) => (
                  <div key={video.uid} className="relative rounded-lg overflow-hidden">
                    <video
                      controls
                      className="w-full max-h-96 bg-black"
                      preload="metadata"
                    >
                      <source
                        src={video.file_url}
                        type={video.contentType || "video/mp4"}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            )}

            {/* Other Files */}
            {otherFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Attachments
                </h4>
                <div className="space-y-1">
                  {otherFiles.map((file) => (
                    <a
                      key={file.uid}
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent text-sm"
                    >
                      <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                        📎
                      </div>
                      <span className="truncate">{file.file_name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Engagement Actions */}
            <EngagementActions
  postId={post.uid}
  isLiked={isLiked}
  isBookmarked={isBookmarked}
  likesCount={likes}
  commentsCount={commentItems.length}
  sharesCount={shares}
  isAuthenticated={!!currentUser}
/>

<Comments
  postId={post.uid}
  comments={commentItems}
  currentUserId={currentUser?.id}
  isAuthenticated={!!currentUser}
/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
