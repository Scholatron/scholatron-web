"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const TABS = ["people", "posts", "clubs"] as const;
type Tab = (typeof TABS)[number];

// Mock data for demonstration; Replace with real API calls
const MOCK_PEOPLE = [
  { id: "u1", name: "Alice Johnson", title: "Software Engineer", avatar: null },
  { id: "u2", name: "Bob Smith", title: "Product Manager", avatar: null },
  { id: "u3", name: "Clara Lee", title: "UX Designer", avatar: null },
];
const MOCK_POSTS = [
  { id: "p1", title: "Excited to join the new Computer Science Club!" },
  { id: "p2", title: "Check out this amazing tech event." },
];
const MOCK_CLUBS = [
  { id: "c1", name: "Computer Science Club" },
  { id: "c2", name: "Music Society" },
  { id: "c3", name: "Drama Club" },
];

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("people");
  const [query, setQuery] = useState("");

  // Filtered search results (mocked, filtering by query substring)
  const filteredPeople = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return MOCK_PEOPLE;
    return MOCK_PEOPLE.filter(
      (p) => p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return MOCK_POSTS;
    return MOCK_POSTS.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  const filteredClubs = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return MOCK_CLUBS;
    return MOCK_CLUBS.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Search bar */}
      <div className="border border-border rounded-full shadow-sm overflow-hidden flex items-center">
        <input
          type="search"
          aria-label="Search"
          placeholder="Search people, posts, clubs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <button
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="pr-4 pl-2 text-muted-foreground hover:text-foreground transition"
          >
            &#10005;
          </button>
        )}
      </div>

      {/* Tabs bar */}
      <Tabs value={tab} onValueChange={setTab} className="mt-4">
        <TabsList className="flex rounded-full bg-secondary/20 p-1 w-full max-w-md mx-auto">
          <TabsTrigger
            value="people"
            className="flex-1 text-center rounded-full px-3 py-1.5 cursor-pointer text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            People
          </TabsTrigger>
          <TabsTrigger
            value="posts"
            className="flex-1 text-center rounded-full px-3 py-1.5 cursor-pointer text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="clubs"
            className="flex-1 text-center rounded-full px-3 py-1.5 cursor-pointer text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Clubs
          </TabsTrigger>
        </TabsList>

        {/* Results */}
        <TabsContent value="people" className="mt-6">
          {filteredPeople.length === 0 ? (
            <p className="text-muted-foreground text-center">No people found.</p>
          ) : (
            filteredPeople.map(({ id, name, title, avatar }) => (
              <Card key={id} className="mb-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <CardContent className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    {avatar ? (
                      <AvatarImage src={avatar} alt={name} />
                    ) : (
                      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="text-foreground font-semibold">{name}</p>
                    <p className="text-muted-foreground text-sm">{title}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground text-center">No posts found.</p>
          ) : (
            filteredPosts.map(({ id, title }) => (
              <Card key={id} className="mb-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <CardContent>
                  <p className="text-foreground">{title}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="clubs" className="mt-6">
          {filteredClubs.length === 0 ? (
            <p className="text-muted-foreground text-center">No clubs found.</p>
          ) : (
            filteredClubs.map(({ id, name }) => (
              <Card key={id} className="mb-4 hover:bg-muted/20 transition-colors cursor-pointer">
                <CardContent>
                  <p className="text-foreground font-semibold">{name}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
