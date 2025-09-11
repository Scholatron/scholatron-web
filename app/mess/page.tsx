"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMemo, useState } from "react";

type Item = { dish: string; notes?: string };
type MenuDay = { breakfast: Item[]; lunch: Item[]; dinner: Item[] };
type MenusByDay = Record<string, MenuDay>;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const MENUS: MenusByDay = {
  Mon: {
    breakfast: [{ dish: "Idli & Sambar" }, { dish: "Tea" }],
    lunch: [{ dish: "Veg Thali" }, { dish: "Curd" }],
    dinner: [{ dish: "Veg Biryani" }, { dish: "Salad" }],
  },
  Tue: {
    breakfast: [{ dish: "Poha" }, { dish: "Milk" }],
    lunch: [{ dish: "Rajma Chawal" }],
    dinner: [{ dish: "Roti + Paneer Butter Masala" }],
  },
  Wed: {
    breakfast: [{ dish: "Upma" }],
    lunch: [{ dish: "Sambar Rice" }],
    dinner: [{ dish: "Fried Rice + Gobi Manchurian" }],
  },
  Thu: {
    breakfast: [{ dish: "Dosa + Chutney" }],
    lunch: [{ dish: "Chole Bhature" }],
    dinner: [{ dish: "Curd Rice + Pickle" }],
  },
  Fri: {
    breakfast: [{ dish: "Aloo Paratha + Curd" }],
    lunch: [{ dish: "Dal Tadka + Rice" }],
    dinner: [{ dish: "Pulao + Raita" }],
  },
  Sat: {
    breakfast: [{ dish: "Pongal + Vada" }],
    lunch: [{ dish: "Mixed Veg Curry + Roti" }],
    dinner: [{ dish: "Noodles + Sauce" }],
  },
  Sun: {
    breakfast: [{ dish: "Masala Dosa" }],
    lunch: [{ dish: "Pav Bhaji" }],
    dinner: [{ dish: "Chapati + Kadai Paneer" }],
  },
};

function todayLabel() {
  const idx = new Date().getDay(); // 0 Sun..6 Sat
  return DAYS[(idx + 6) % 7]; // map to Mon..Sun order
}

export default function MessMenuPage() {
  const [day, setDay] = useState<string>(todayLabel());
  const menu = useMemo(() => MENUS[day] ?? null, [day]);

  return (
    <div className="tt">
      <h1 className="tt-title text-2xl font-semibold mb-4">Mess Menu</h1>

      {/* Top tabs bar (days) */}
      <Tabs value={day} onValueChange={setDay}>
        <div className="tt-tabs">
          <TabsList className="tt-tablist">
            {DAYS.map((d) => (
              <TabsTrigger key={d} value={d} className="tt-trigger">
                {d}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Day panel */}
        <TabsContent value={day} className="tt-panel">
          {!menu ? (
            <div className="opacity-70">No menu available.</div>
          ) : (
            <div className="tt-cards">
              <MenuCard title="Breakfast" items={menu.breakfast} />
              <MenuCard title="Lunch" items={menu.lunch} />
              <MenuCard title="Dinner" items={menu.dinner} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MenuCard({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="tt-card">
      <div className="tt-card-header p-4">
        <div className="tt-title-sm font-medium">{title}</div>
        <div className="tt-time text-sm">Today</div>
      </div>
      <div className="p-4">
        <hr className="tt-sep" />
        <ul className="tt-meta">
          {items.map((it, idx) => (
            <li key={it.dish + idx}>
              {it.dish}
              {it.notes ? ` — ${it.notes}` : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}