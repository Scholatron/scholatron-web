"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  // Profile
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [phone, setPhone] = useState("+1 234 567 890");

  // Account
  const [password, setPassword] = useState("");

  // Notifications
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [notificationsSMS, setNotificationsSMS] = useState(false);
  const [notificationsPush, setNotificationsPush] = useState(true);

  // Privacy
  const [profileVisibility, setProfileVisibility] = useState("public");

  // Appearance
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");

  // Security
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const onSaveProfile = (e) => {
    e.preventDefault();
    alert("Profile settings saved!");
  };

  const onSaveAccount = (e) => {
    e.preventDefault();
    alert("Account settings saved!");
  };

  const onSaveNotifications = (e) => {
    e.preventDefault();
    alert("Notification settings saved!");
  };

  const onSavePrivacy = (e) => {
    e.preventDefault();
    alert("Privacy settings saved!");
  };

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Animation variants for inputs
  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 3px color-mix(in oklab, var(--ring) 30%, transparent)", transition: { duration: 0.2 } },
    blur: { scale: 1, boxShadow: "none", transition: { duration: 0.2 } },
  };

  // Animation variants for buttons
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 bg-[var(--gradient-hero)]">
      <motion.h1
        className="tt-heading text-4xl md:text-5xl font-brand font-extrabold text-center mb-12 animate-glow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Settings
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Info */}
        <motion.section
          className="tt-card p-8 animate-pulse"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Profile Information</h2>
          <form onSubmit={onSaveProfile} className="space-y-6">
            <label className="block">
              <span className="text-muted-foreground font-medium">Full Name</span>
              <motion.input
                type="text"
                className="mt-2 w-full rounded-[--radius-md] border border-input px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring smooth-transition glow-on-hover"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                variants={inputVariants}
                whileFocus="focus"
              />
            </label>

            <label className="block">
              <span className="text-muted-foreground font-medium">Email Address</span>
              <motion.input
                type="email"
                className="mt-2 w-full rounded-[--radius-md] border border-input px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring smooth-transition glow-on-hover"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variants={inputVariants}
                whileFocus="focus"
              />
            </label>

            <label className="block">
              <span className="text-muted-foreground font-medium">Phone Number</span>
              <motion.input
                type="tel"
                className="mt-2 w-full rounded-[--radius-md] border border-input px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring smooth-transition glow-on-hover"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
              />
            </label>

            <motion.button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-[--radius-md] font-semibold hover:bg-[color-mix(in_oklab,_var(--primary)_90%,_var(--secondary))] smooth-transition glow-on-hover"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Save Profile
            </motion.button>
          </form>
        </motion.section>

        {/* Account Settings */}
        <motion.section
          className="tt-card p-8 animate-pulse"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Account Settings</h2>
          <form onSubmit={onSaveAccount} className="space-y-6">
            <label className="block">
              <span className="text-muted-foreground font-medium">Change Password</span>
              <motion.input
                type="password"
                className="mt-2 w-full rounded-[--radius-md] border border-input px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring smooth-transition glow-on-hover"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
                variants={inputVariants}
                whileFocus="focus"
              />
            </label>

            <motion.button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-[--radius-md] font-semibold hover:bg-[color-mix(in_oklab,_var(--primary)_90%,_var(--secondary))] smooth-transition glow-on-hover"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Update Password
            </motion.button>
          </form>
        </motion.section>

        {/* Notifications */}
        <motion.section
          className="tt-card p-8 animate-pulse"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Notifications</h2>
          <form onSubmit={onSaveNotifications} className="space-y-6">
            <div className="space-y-4">
              <motion.label
                className="inline-flex items-center gap-3 cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="checkbox"
                  checked={notificationsEmail}
                  onChange={(e) => setNotificationsEmail(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-ring w-5 h-5 smooth-transition"
                />
                <span className="text-foreground font-medium">Email Notifications</span>
              </motion.label>
              <motion.label
                className="inline-flex items-center gap-3 cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="checkbox"
                  checked={notificationsSMS}
                  onChange={(e) => setNotificationsSMS(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-ring w-5 h-5 smooth-transition"
                />
                <span className="text-foreground font-medium">SMS Notifications</span>
              </motion.label>
              <motion.label
                className="inline-flex items-center gap-3 cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="checkbox"
                  checked={notificationsPush}
                  onChange={(e) => setNotificationsPush(e.target.checked)}
                  className="rounded border-input text-primary focus:ring-ring w-5 h-5 smooth-transition"
                />
                <span className="text-foreground font-medium">Push Notifications</span>
              </motion.label>
            </div>
            <motion.button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-[--radius-md] font-semibold hover:bg-[color-mix(in_oklab,_var(--primary)_90%,_var(--secondary))] smooth-transition glow-on-hover"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Save Notifications
            </motion.button>
          </form>
        </motion.section>

        {/* Privacy */}
        <motion.section
          className="tt-card p-8 animate-pulse"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Privacy</h2>
          <form onSubmit={onSavePrivacy} className="space-y-6">
            <div className="space-y-4">
              <motion.label
                className="inline-flex items-center gap-3 cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="radio"
                  checked={profileVisibility === "public"}
                  onChange={() => setProfileVisibility("public")}
                  name="profileVisibility"
                  className="rounded-full border-input text-primary focus:ring-ring w-5 h-5 smooth-transition"
                />
                <span className="text-foreground font-medium">Public Profile</span>
              </motion.label>
              <motion.label
                className="inline-flex items-center gap-3 cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="radio"
                  checked={profileVisibility === "private"}
                  onChange={() => setProfileVisibility("private")}
                  name="profileVisibility"
                  className="rounded-full border-input text-primary focus:ring-ring w-5 h-5 smooth-transition"
                />
                <span className="text-foreground font-medium">Private Profile</span>
              </motion.label>
            </div>
            <motion.button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-[--radius-md] font-semibold hover:bg-[color-mix(in_oklab,_var(--primary)_90%,_var(--secondary))] smooth-transition glow-on-hover"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Save Privacy
            </motion.button>
          </form>
        </motion.section>

        {/* Appearance */}
        <motion.section
          className="tt-card p-8 animate-pulse"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Appearance</h2>
          <div className="space-y-6">
            <label className="block">
              <span className="text-muted-foreground font-medium">Theme</span>
              <motion.select
                className="mt-2 w-full rounded-[--radius-md] border border-input px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring smooth-transition glow-on-hover"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </motion.select>
            </label>

            <label className="block">
              <span className="text-muted-foreground font-medium">Language</span>
              <motion.select
                className="mt-2 w-full rounded-[--radius-md] border border-input px-4 py-3 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring smooth-transition glow-on-hover"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="hi">हिन्दी</option>
              </motion.select>
            </label>
          </div>
        </motion.section>

        {/* Security */}
        <motion.section
          className="tt-card p-8 animate-pulse"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-6 text-primary">Security</h2>
          <motion.label
            className="inline-flex items-center gap-3 cursor-pointer"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={(e) => setTwoFactorAuth(e.target.checked)}
              className="rounded border-input text-primary focus:ring-ring w-5 h-5 smooth-transition"
            />
            <span className="text-foreground font-medium">
              Enable Two-Factor Authentication (2FA)
            </span>
          </motion.label>
        </motion.section>

        {/* Danger Zone */}
        <motion.section
          className="tt-card p-8 border-l-4 border-destructive animate-pulse"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-6 text-destructive">Danger Zone</h2>
          <motion.button
            onClick={() =>
              confirm("Are you sure you want to delete your account? This action cannot be undone.") &&
              alert("Account deleted.")
            }
            className="bg-destructive text-destructive-foreground px-6 py-3 rounded-[--radius-md] font-semibold hover:bg-[color-mix(in_oklab,_var(--destructive)_90%,_var(--secondary))] smooth-transition glow-on-hover"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Delete Account
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}