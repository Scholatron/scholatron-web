"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SiteHeader from "@/app/components/header";
import { Sidebar } from "@/app/components/sidebar";
import { SiteFooter } from "@/app/components/footer";

// Types
type School = { id: string; name: string; fullName?: string };
type Post = { id: string; title: string };
type Club = { id: string; name: string };

// Mock data
const MOCK_SCHOOLS: School[] = [
  { id: "s1", name: "SCOPE", fullName: "School of Computer Science and Engineering" },
  { id: "s2", name: "SENSE", fullName: "School of Electronics Engineering" },
  { id: "s3", name: "SAS", fullName: "School of Advanced Sciences" },
  { id: "s4", name: "HOT", fullName: "School of Hotel & Tourism Studies" },
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

const TAB_KEYS = ["schools", "posts", "clubs"] as const;
type TabKey = typeof TAB_KEYS[number];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");

  // Initial tab from URL (?t=schools|posts|clubs)
  const initialTab: TabKey = useMemo(() => {
    const t = (searchParams.get("t") || "").toLowerCase();
    return (TAB_KEYS.includes(t as TabKey) ? t : "schools") as TabKey;
  }, [searchParams]);

  const [tab, setTab] = useState<TabKey>(initialTab);

  // Sync state with URL
  useEffect(() => {
    const t = (searchParams.get("t") || "").toLowerCase();
    if (TAB_KEYS.includes(t as TabKey) && t !== tab) {
      setTab(t as TabKey);
    }
  }, [searchParams, tab]);

  // Update URL when tab changes
  const onChangeTab = useCallback(
    (value: string) => {
      const next = (value as TabKey) || "schools";
      setTab(next);
      const params = new URLSearchParams(searchParams.toString());
      params.set("t", next);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // Filter results
  const filteredSchools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_SCHOOLS;
    return MOCK_SCHOOLS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.fullName ? s.fullName.toLowerCase().includes(q) : false)
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
    schools: filteredSchools.length,
    posts: filteredPosts.length,
    clubs: filteredClubs.length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Page title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Search</h1>
              <p className="text-sm text-muted-foreground">
                Find schools, posts, and clubs in one place.
              </p>
            </div>

            {/* Search input (tokens only) */}
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search schools, posts, clubs"
                className="
                  w-full rounded-[--radius-xl]
                  border border-input
                  bg-card
                  px-5 py-3 pr-10 shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-ring
                  transition
                "
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ⌘K
              </span>
            </div>

            {/* Tabs (tokens only) */}
            <Tabs value={tab} onValueChange={onChangeTab} className="w-full">
              <TabsList
                className="
                  mb-4 grid w-full grid-cols-3
                  rounded-[--radius-xl]
                  border border-input
                  bg-muted
                  p-1
                "
              >
                <TabsTrigger
                  value="schools"
                  className="rounded-full px-3 py-2 text-sm transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Schools ({counts.schools})
                </TabsTrigger>
                <TabsTrigger
                  value="posts"
                  className="rounded-full px-3 py-2 text-sm transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Posts ({counts.posts})
                </TabsTrigger>
                <TabsTrigger
                  value="clubs"
                  className="rounded-full px-3 py-2 text-sm transition data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Clubs ({counts.clubs})
                </TabsTrigger>
              </TabsList>

              {/* Schools */}
              <TabsContent value="schools" className="mt-2">
                {filteredSchools.length === 0 ? (
                  <div className="text-muted-foreground text-center">
                    No schools found.
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {filteredSchools.map(({ id, name, fullName }) => (
                      <li
                        key={id}
                        className="
                          rounded-[--radius-lg]
                          border border-border
                          bg-card
                          p-4 shadow-sm
                          hover:bg-muted
                          transition
                        "
                      >
                        <div className="font-semibold">{name}</div>
                        {fullName && (
                          <div className="text-sm text-muted-foreground">
                            {fullName}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>

              {/* Posts */}
              <TabsContent value="posts" className="mt-2">
                {filteredPosts.length === 0 ? (
                  <div className="text-muted-foreground text-center">
                    No posts found.
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {filteredPosts.map(({ id, title }) => (
                      <li
                        key={id}
                        className="
                          rounded-[--radius-lg]
                          border border-border
                          bg-card
                          p-4 shadow-sm
                          hover:bg-muted
                          transition
                        "
                      >
                        <div className="font-semibold">{title}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>

              {/* Clubs */}
              <TabsContent value="clubs" className="mt-2">
                {filteredClubs.length === 0 ? (
                  <div className="text-muted-foreground text-center">
                    No clubs found.
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {filteredClubs.map(({ id, name }) => (
                      <li
                        key={id}
                        className="
                          rounded-[--radius-lg]
                          border border-border
                          bg-card
                          p-4 shadow-sm
                          hover:bg-muted
                          transition
                        "
                      >
                        <div className="font-semibold">{name}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
