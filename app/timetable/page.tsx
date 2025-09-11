"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const timetableData = [
  { time: "08:00 AM - 09:00 AM", subject: "Mathematics", room: "Room 101", professor: "Dr. Alice Johnson" },
  { time: "09:15 AM - 10:15 AM", subject: "Physics", room: "Room 202", professor: "Prof. Bob Smith" },
  { time: "10:30 AM - 11:30 AM", subject: "Chemistry", room: "Lab 3", professor: "Dr. Clara Lee" },
  { time: "11:45 AM - 12:45 PM", subject: "English Literature", room: "Room 105", professor: "Ms. Diana Patel" },
  { time: "01:30 PM - 02:30 PM", subject: "Computer Science", room: "Room 303", professor: "Prof. Ethan Brown" },
];

export default function DailyTimetable() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center">
      <h1
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Daily Timetable
      </h1>

      <div className="w-full max-w-3xl space-y-6">
        {timetableData.map(({ time, subject, room, professor }, idx) => (
          <Card
            key={idx}
            className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
            style={{ borderRadius: "var(--radius)" }}
          >
            <CardHeader>
              <CardTitle className="text-primary">{subject}</CardTitle>
              <CardDescription className="text-muted-foreground">
                {time}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <Separator className="my-2 bg-border" />
              <p className="text-sm text-foreground mb-1">
                <span className="font-medium text-accent">Room:</span> {room}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Professor:</span> {professor}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
