"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import SiteHeader from "@/app/components/header";
import { Sidebar } from "@/app/components/sidebar";
import { SiteFooter } from "@/app/components/footer";

// Mock data — replace with real results as needed
type Person = { id: string; name: string; title?: string };
type Post = { id: string; title: string };
type Club = { id: string; name: string };

const MOCK_PEOPLE: Person[] = [
  { id: "u1", name: "Alice Johnson", title: "Software Engineer" },
  { id: "u2", name: "Bob Smith", title: "Product Manager" },
  { id: "u3", name: "Clara Lee", title: "UX Designer" },
];

const MOCK_POSTS: Post[] = [
  { id: "p1", title: "Excited to join the Computer Science Club!" },
  { id: "p2", title: "Check out this amazing tech event." },
];

const MOCK_CLUBS: Club[] = [
  { id: "c1", name: "Computer Science Club" },
  { id: "c2", name: "Music Society" },
  { id: "c3", name: "Drama Club" },
];

const TAB_KEYS = ["people", "posts", "clubs"] as const;
type TabKey = typeof TAB_KEYS[number];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Search query
  const [query, setQuery] = useState("");

  // Initialize active tab from URL (?t=people|posts|clubs), default to "people"
  const initialTab: TabKey = useMemo(() => {
    const t = (searchParams.get("t") || "").toLowerCase();
    return (TAB_KEYS.includes(t as TabKey) ? t : "people") as TabKey;
  }, [searchParams]);

  const [tab, setTab] = useState<TabKey>(initialTab);

  // Keep state in sync if the URL changes (e.g., back/forward navigation)
  useEffect(() => {
    const t = (searchParams.get("t") || "").toLowerCase();
    if (TAB_KEYS.includes(t as TabKey) && t !== tab) {
      setTab(t as TabKey);
    }
  }, [searchParams, tab]);

  // Update URL when tab changes (shareable deep link)
  const onChangeTab = useCallback(
    (value: string) => {
      const next = (value as TabKey) || "people";
      setTab(next);
      const params = new URLSearchParams(searchParams.toString());
      params.set("t", next);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // Filtered results (client-side demo)
  const filteredPeople = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_PEOPLE;
    return MOCK_PEOPLE.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.title ? p.title.toLowerCase().includes(q) : false)
    );
  }, [query]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_POSTS;
    return MOCK_POSTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  const filteredClubs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_CLUBS;
    return MOCK_CLUBS.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  const counts = {
    people: filteredPeople.length,
    posts: filteredPosts.length,
    clubs: filteredClubs.length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-3xl">
            {/* Shell card for glass effect */}
            <div className="rounded-[var(--radius-xl)] border border-input bg-card/70 backdrop-blur-xl shadow-sm p-4 md:p-8">
              <div className="flex items-end justify-between gap-3 mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Search</h1>
                  <p className="text-sm text-muted-foreground">
                    Find people, posts, and clubs in one place.
                  </p>
                </div>
              </div>

              {/* Search input */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search people, posts, clubs"
                    className="w-full rounded-full border border-input bg-background/90 px-5 py-3 pr-10 shadow-sm transition focus:ring-2 focus:ring-ring hover:shadow-md"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    ⌘K
                  </span>
                </div>
              </div>

              {/* Segmented tabs */}
              <Tabs value={tab} onValueChange={onChangeTab} className="w-full">
                <TabsList className="mb-3 grid w-full grid-cols-3 rounded-[var(--radius-xl)] border border-input bg-muted/60 p-1 shadow-inner">
                  <TabsTrigger
                    value="people"
                    className="rounded-full px-3 py-2 text-sm transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow"
                  >
                    People ({counts.people})
                  </TabsTrigger>
                  <TabsTrigger
                    value="posts"
                    className="rounded-full px-3 py-2 text-sm transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow"
                  >
                    Posts ({counts.posts})
                  </TabsTrigger>
                  <TabsTrigger
                    value="clubs"
                    className="rounded-full px-3 py-2 text-sm transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow"
                  >
                    Clubs ({counts.clubs})
                  </TabsTrigger>
                </TabsList>

                {/* People */}
                <TabsContent value="people" className="mt-4">
                  {filteredPeople.length === 0 ? (
                    <div className="text-muted-foreground text-center">
                      No people found.
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {filteredPeople.map(({ id, name, title }) => (
                        <li
                          key={id}
                          className="rounded-[var(--radius-lg)] border border-input bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-muted/60 hover:shadow-md"
                        >
                          <div className="font-semibold">{name}</div>
                          {title ? (
                            <div className="text-sm text-muted-foreground">{title}</div>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </TabsContent>

                {/* Posts */}
                <TabsContent value="posts" className="mt-4">
                  {filteredPosts.length === 0 ? (
                    <div className="text-muted-foreground text-center">
                      No posts found.
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {filteredPosts.map(({ id, title }) => (
                        <li
                          key={id}
                          className="rounded-[var(--radius-lg)] border border-input bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-muted/60 hover:shadow-md"
                        >
                          <div className="font-semibold">{title}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </TabsContent>

                {/* Clubs */}
                <TabsContent value="clubs" className="mt-4">
                  {filteredClubs.length === 0 ? (
                    <div className="text-muted-foreground text-center">
                      No clubs found.
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {filteredClubs.map(({ id, name }) => (
                        <li
                          key={id}
                          className="rounded-[var(--radius-lg)] border border-input bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-muted/60 hover:shadow-md"
                        >
                          <div className="font-semibold">{name}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
