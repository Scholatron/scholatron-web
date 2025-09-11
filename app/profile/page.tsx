
"use client";

import { useMemo } from "react";
import { PROFILE, Club, Post } from "@/lib/profile";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Add branch field in PROFILE (update your mock to include this)
// e.g., export const PROFILE = { name, profilePic, branch: "CSE", clubs, posts }

export default function ProfilePage() {
  const { name, profilePic, clubs, posts, branch } = PROFILE;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
        <img
          src={profilePic}
          alt={`${name}'s profile picture`}
          className="w-24 h-24 rounded-full object-cover border border-border"
        />
        <div className="mt-4 sm:mt-0">
          <h1 className="text-3xl font-bold text-foreground">{name}</h1>
          {branch && (
            <span
              className="
                inline-block mt-1 px-3 py-0.5 rounded-full text-sm font-medium
                bg-secondary/30 text-secondary-foreground
                border border-secondary/50
                select-none
              "
              aria-label={`Branch: ${branch}`}
            >
              {branch}
            </span>
          )}
        </div>
      </div>

      {/* Clubs section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Clubs</h2>
        {clubs.length === 0 ? (
          <p className="text-muted-foreground">You are not part of any clubs yet.</p>
        ) : (
          <ul className="space-y-2">
            {clubs.map((club: Club) => (
              <li
                key={club.id}
                className="py-2 px-4 border border-border rounded bg-background text-foreground"
              >
                {club.name}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Posts section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">You haven't made any posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post: Post) => (
              <li
                key={post.id}
                className="border border-border rounded-lg p-4 bg-card"
              >
                <h3 className="text-lg font-semibold text-foreground mb-1">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{formatDate(post.createdAt)}</p>
                <p className="text-foreground">{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
