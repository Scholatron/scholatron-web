"use client";

import { useState, useMemo, useRef, useEffect } from "react";

import SiteHeader from "@/app/components/header";
import { Sidebar } from "@/app/components/sidebar";
import { SiteFooter } from "@/app/components/footer";

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

export default function SearchWithPopup() {
  const [tab, setTab] = useState<Tab>("people");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popup if clicked outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", onClick);
    } else {
      document.removeEventListener("mousedown", onClick);
    }
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  const filteredPeople = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return MOCK_PEOPLE;
    return MOCK_PEOPLE.filter(
      (p) => p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
    );
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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 max-w-md mx-auto p-6" ref={containerRef}>
          <input
            type="search"
            placeholder="Search people, posts, clubs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="
              w-full rounded-full border border-border px-4 py-2
              focus:outline-none focus:ring-2 focus:ring-ring
              bg-background text-foreground placeholder:text-muted-foreground
            "
          />

          {isOpen && (
            <div
              className="
                absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg
                shadow-lg text-foreground max-h-80 overflow-auto z-50
              "
            >
              <div className="flex border-b border-border">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`
                      flex-1 py-2 text-center font-semibold cursor-pointer
                      ${
                        tab === t
                          ? "border-b-2 border-primary text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }
                    `}
                    role="tab"
                    aria-selected={tab === t}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {tab === "people" &&
                  (filteredPeople.length === 0 ? (
                    <p className="text-muted-foreground text-center">No people found.</p>
                  ) : (
                    filteredPeople.map(({ id, name, title }) => (
                      <div
                        key={id}
                        className="py-2 border-b last:border-0 border-border cursor-pointer hover:bg-muted-foreground/10 rounded px-2"
                      >
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-muted-foreground">{title}</p>
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
                        className="py-2 border-b last:border-0 border-border cursor-pointer hover:bg-muted-foreground/10 rounded px-2"
                      >
                        <p>{title}</p>
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
                        className="py-2 border-b last:border-0 border-border cursor-pointer hover:bg-muted-foreground/10 rounded px-2"
                      >
                        <p className="font-semibold">{name}</p>
                      </div>
                    ))
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
