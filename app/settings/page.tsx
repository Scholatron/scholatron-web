"use client";

import { useState } from "react";

export default function SettingsPage() {
  // Sample state hooks for form controls
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 234 567 890");
  const [password, setPassword] = useState("");
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsSMS, setNotificationsSMS] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("public");

  const onSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile settings saved!");
  };

  const onSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account settings saved!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold mb-6 text-foreground">Settings</h1>

      {/* Profile Info */}
      <section className="bg-card rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Profile Information</h2>
        <form onSubmit={onSaveProfile} className="space-y-4">
          <label className="block">
            <span className="text-muted-foreground">Full Name</span>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-muted-foreground">Email Address</span>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-muted-foreground">Phone Number</span>
            <input
              type="tel"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90 transition"
          >
            Save Profile
          </button>
        </form>
      </section>

      {/* Account Settings */}
      <section className="bg-card rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Account Settings</h2>
        <form onSubmit={onSaveAccount} className="space-y-4">
          <label className="block">
            <span className="text-muted-foreground">Change Password</span>
            <input
              type="password"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
          </label>

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold hover:bg-primary/90 transition"
          >
            Update Password
          </button>
        </form>
      </section>

      {/* Notifications */}
      <section className="bg-card rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Notifications</h2>
        <div className="space-y-3">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsEmail}
              onChange={(e) => setNotificationsEmail(e.target.checked)}
              className="rounded border border-border text-primary focus:ring-primary"
            />
            <span className="text-foreground select-none">Email Notifications</span>
          </label>
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationsSMS}
              onChange={(e) => setNotificationsSMS(e.target.checked)}
              className="rounded border border-border text-primary focus:ring-primary"
            />
            <span className="text-foreground select-none">SMS Notifications</span>
          </label>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-card rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Privacy</h2>
        <div className="space-y-3">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              checked={profileVisibility === "public"}
              onChange={() => setProfileVisibility("public")}
              name="profileVisibility"
              className="rounded-full border border-border text-primary focus:ring-primary"
            />
            <span className="text-foreground select-none">Public Profile</span>
          </label>
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              checked={profileVisibility === "private"}
              onChange={() => setProfileVisibility("private")}
              name="profileVisibility"
              className="rounded-full border border-border text-primary focus:ring-primary"
            />
            <span className="text-foreground select-none">Private Profile</span>
          </label>
        </div>
      </section>
    </div>
  );
}
