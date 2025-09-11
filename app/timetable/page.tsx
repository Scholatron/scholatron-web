"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Slot = { time: string; subject: string; room: string; professor: string };
type Day = { id: string; label: string; items: Slot[] };

const monday: Slot[] = [
  { time: "08:00 AM - 09:00 AM", subject: "Mathematics", room: "Room 101", professor: "Dr. Alice Johnson" },
  { time: "09:15 AM - 10:15 AM", subject: "Physics", room: "Room 202", professor: "Prof. Bob Smith" },
  { time: "10:30 AM - 11:30 AM", subject: "Chemistry", room: "Lab 3", professor: "Dr. Clara Lee" },
  { time: "11:45 AM - 12:45 PM", subject: "English Literature", room: "Room 105", professor: "Ms. Diana Patel" },
  { time: "01:30 PM - 02:30 PM", subject: "Computer Science", room: "Room 303", professor: "Prof. Ethan Brown" },
];

const tuesday: Slot[] = [
  { time: "08:00 AM - 09:00 AM", subject: "Mathematics II", room: "Room 101", professor: "Dr. Alice Johnson" },
  { time: "09:15 AM - 10:15 AM", subject: "Mechanics", room: "Room 202", professor: "Prof. Bob Smith" },
  { time: "10:30 AM - 11:30 AM", subject: "Organic Chemistry", room: "Lab 3", professor: "Dr. Clara Lee" },
];

const wednesday: Slot[] = [
  { time: "09:00 AM - 10:00 AM", subject: "Discrete Math", room: "Room 110", professor: "Dr. Alice Johnson" },
  { time: "10:15 AM - 11:15 AM", subject: "Electromagnetics", room: "Room 204", professor: "Prof. Bob Smith" },
];

const thursday: Slot[] = monday;
const friday: Slot[] = tuesday;
const saturday: Slot[] = wednesday;
const sunday: Slot[] = wednesday;

const days: Day[] = [
  { id: "mon", label: "Mon", items: monday },
  { id: "tue", label: "Tue", items: tuesday },
  { id: "wed", label: "Wed", items: wednesday },
  { id: "thu", label: "Thu", items: thursday },
  { id: "fri", label: "Fri", items: friday },
  { id: "sat", label: "Sat", items: saturday },
  { id: "sun", label: "Sun", items: sunday },
];

export default function DailyTimetable() {
  const defaultDay = days?.id ?? "mon";

  return (
    <div className="tt">
      <h1 className="tt-heading text-2xl font-semibold mb-4">Daily Timetable</h1>

      <Tabs defaultValue={defaultDay}>
        {/* Top tabs bar */}
        <div className="tt-tabs">
          <TabsList className="tt-tablist">
            {days.map((d) => (
              <TabsTrigger key={d.id} value={d.id} className="tt-trigger">
                {d.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Panels */}
        {days.map((d) => (
          <TabsContent key={d.id} value={d.id} className="tt-panel">
            <div className="tt-cards">
              {d.items.map(({ time, subject, room, professor }, idx) => (
                <Card key={subject + time + idx} className="tt-card">
                  <CardHeader className="tt-card-header">
                    <CardTitle className="tt-title-sm">{subject}</CardTitle>
                    <CardDescription className="tt-time">{time}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Separator className="tt-sep" />
                    <div className="tt-meta">
                      <div>Room: {room}</div>
                      <div>Professor: {professor}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}