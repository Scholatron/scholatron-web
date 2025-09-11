"use client";

import { useState, useMemo } from "react";

const TABS = ["people", "posts", "clubs"] as const;
type Tab = (typeof TABS)[number];

const MOCK_PEOPLE = [
  { id: "u1", name: "Alice Johnson", title: "Software Engineer" },
  { id: "u2", name: "Bob Smith", title: "Product Manager" },
  { id: "u3", name: "Clara Lee", title: "UX Designer" },
];
const MOCK_POSTS = [
  { id: "p1", title: "Excited to join the Computer Science Club!" },
  { id: "p2", title: "Check out this amazing tech event." },
];
const MOCK_CLUBS = [
  { id: "c1", name: "Computer Science Club" },
  { id: "c2", name: "Music Society" },
  { id: "c3", name: "Drama Club" },
];

export default function SearchPage() {
  const [tab, setTab] = useState<Tab>("people");
  const [query, setQuery] = useState("");

  const filteredPeople = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return MOCK_PEOPLE;
    return MOCK_PEOPLE.filter((p) => p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q));
  }, [query]);

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return MOCK_POSTS;
    return MOCK_POSTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  const filteredClubs = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return MOCK_CLUBS;
    return MOCK_CLUBS.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <input
        type="search"
        className="w-full rounded-full border border-border px-4 py-2 focus:ring-2 focus:ring-ring text-foreground bg-background placeholder:text-muted-foreground"
        placeholder="Search people, posts, clubs"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex justify-center mt-4 gap-4 text-sm font-semibold">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full cursor-pointer ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
            aria-selected={tab === t}
            role="tab"
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "people" &&
          (filteredPeople.length === 0 ? (
            <p className="text-muted-foreground text-center">No people found.</p>
          ) : (
            filteredPeople.map(({ id, name, title }) => (
              <div
                key={id}
                className="p-4 border border-border rounded-lg mb-4 hover:bg-muted/10 cursor-pointer"
              >
                <p className="text-foreground font-semibold">{name}</p>
                <p className="text-muted-foreground text-sm">{title}</p>
              </div>
            ))
          ))}

        {tab === "posts" &&
          (filteredPosts.length === 0 ? (
            <p className="text-muted-foreground text-center">No posts found.</p>
          ) : (
            filteredPosts.map(({ id, title }) => (
              <div
                key={id}
                className="p-4 border border-border rounded-lg mb-4 hover:bg-muted/10 cursor-pointer"
              >
                <p className="text-foreground">{title}</p>
              </div>
            ))
          ))}

        {tab === "clubs" &&
          (filteredClubs.length === 0 ? (
            <p className="text-muted-foreground text-center">No clubs found.</p>
          ) : (
            filteredClubs.map(({ id, name }) => (
              <div
                key={id}
                className="p-4 border border-border rounded-lg mb-4 hover:bg-muted/10 cursor-pointer"
              >
                <p className="text-foreground font-semibold">{name}</p>
              </div>
            ))
          ))}
      </div>
    </div>
  );
}
