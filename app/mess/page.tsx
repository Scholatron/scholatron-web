"use client";

import { useMemo, useState } from "react";

type Item = { dish: string; notes?: string };
type MenuDay = { breakfast: Item[]; lunch: Item[]; snacks: Item[]; dinner: Item[] };
type MenusByDay = Record<string, MenuDay>;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const MENUS: MenusByDay = {
  Mon: {
    breakfast: [{ dish: "Idli & Sambar" }, { dish: "Tea" }],
    lunch: [{ dish: "Veg Thali" }, { dish: "Curd" }],
    snacks: [{ dish: "Samosa" }, { dish: "Tea" }],
    dinner: [{ dish: "Veg Biryani" }, { dish: "Salad" }],
  },
  Tue: {
    breakfast: [{ dish: "Poha" }, { dish: "Milk" }],
    lunch: [{ dish: "Rajma Chawal" }],
    snacks: [{ dish: "Pakora" }, { dish: "Coffee" }],
    dinner: [{ dish: "Roti + Paneer Butter Masala" }],
  },
  Wed: {
    breakfast: [{ dish: "Upma" }],
    lunch: [{ dish: "Sambar Rice" }],
    snacks: [{ dish: "Vada Pav" }],
    dinner: [{ dish: "Fried Rice + Gobi Manchurian" }],
  },
  Thu: {
    breakfast: [{ dish: "Dosa + Chutney" }],
    lunch: [{ dish: "Chole Bhature" }],
    snacks: [{ dish: "Pani Puri" }],
    dinner: [{ dish: "Curd Rice + Pickle" }],
  },
  Fri: {
    breakfast: [{ dish: "Aloo Paratha + Curd" }],
    lunch: [{ dish: "Dal Tadka + Rice" }],
    snacks: [{ dish: "Bhajji" }],
    dinner: [{ dish: "Pulao + Raita" }],
  },
  Sat: {
    breakfast: [{ dish: "Pongal + Vada" }],
    lunch: [{ dish: "Mixed Veg Curry + Roti" }],
    snacks: [{ dish: "Masala Fries" }],
    dinner: [{ dish: "Noodles + Sauce" }],
  },
  Sun: {
    breakfast: [{ dish: "Masala Dosa" }],
    lunch: [{ dish: "Pav Bhaji" }],
    snacks: [{ dish: "Bhel Puri" }],
    dinner: [{ dish: "Chapati + Kadai Paneer" }],
  },
};

function todayLabel() {
  const idx = new Date().getDay(); // 0 Sun..6 Sat
  return DAYS[(idx + 6) % 7];
}

const MEAL_TIMINGS: Record<string, string> = {
  Breakfast: "7:00 - 9:00 AM",
  Lunch: "12:30 - 2:30 PM",
  Snacks: "4:30 - 6:15 PM",
  Dinner: "7:00 - 9:00 PM",
};

export default function MessMenuPage() {
  const [day, setDay] = useState(todayLabel());
  const menu = useMemo(() => MENUS[day] ?? null, [day]);

  return (
    <div className="mess-app p-6 max-w-4xl mx-auto">
      <h1 className="mess-title font-bold text-3xl mb-6">Mess Menu</h1>

      {/* Tabs Bar */}
      <div className="mess-tabs-bar sticky top-0 z-20 bg-background border-b border-border mb-6">
        <div className="mess-tabs-list flex gap-2 overflow-x-auto no-scrollbar px-2">
          {DAYS.map((d) => (
            <button
              key={d}
              className={`mess-tab-trigger rounded-md px-4 py-2 whitespace-nowrap transition
                ${d === day ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground border-primary" : ""}
              `}
              onClick={() => setDay(d)}
              aria-current={d === day ? "true" : undefined}
              role="tab"
              tabIndex={d === day ? 0 : -1}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical stacked Meal Cards */}
      {!menu ? (
        <p className="mess-empty text-center text-muted-foreground">No menu available.</p>
      ) : (
        <div className="flex flex-col gap-6 max-w-md mx-auto">
          <MenuCard title="Breakfast" items={menu.breakfast} />
          <MenuCard title="Lunch" items={menu.lunch} />
          <MenuCard title="Snacks" items={menu.snacks} />
          <MenuCard title="Dinner" items={menu.dinner} />
        </div>
      )}
    </div>
  );
}

function MenuCard({ title, items }: { title: string; items: Item[] }) {
  return (
    <div className="mess-card border-primary border-l-4 rounded-2xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1">
      <header className="mess-card-header px-6 py-4 bg-white rounded-t-2xl border-b border-border text-black font-semibold text-lg">
        {title}
      </header>
      <ul className="mess-items-list px-6 py-4 text-primary-foreground text-base">
        {items.map((it, idx) => (
          <li key={idx} className="mb-1 last:mb-0">
            {it.dish}
            {it.notes && <span className="text-muted-foreground italic"> — {it.notes}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
