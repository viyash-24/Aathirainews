"use client";

import { useState } from "react";
import AdminFooter from "@/components/AdminFooter";

interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  articlesPerPage: string;
  breakingNewsText: string;
  googleAnalyticsId: string;
}

interface UserProfile {
  name: string;
  nameTa: string;
  email: string;
  role: string;
  bio: string;
}

interface NotificationSettings {
  emailOnPublish: boolean;
  emailOnComment: boolean;
  emailOnDraft: boolean;
  browserPush: boolean;
  dailySummary: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "site" | "profile" | "notifications" | "security"
  >("site");
  const [toastMsg, setToastMsg] = useState("");

  const [site, setSite] = useState<SiteSettings>({
    siteName: "AathiraiNews",
    tagline: "Journalistic Integrity & Modern Sophistication",
    contactEmail: "support@aathirainews.com",
    articlesPerPage: "12",
    breakingNewsText:
      "முக்கியச் செய்தி: தமிழக பட்ஜெட் 2024 - கல்வி மற்றும் சுகாதாரத்திற்கு முன்னுரிமை அளிக்கப்படும் என அறிவிப்பு.",
    googleAnalyticsId: "G-XXXXXXXXXX",
  });

  const [profile, setProfile] = useState<UserProfile>({
    name: "Selva Kumar",
    nameTa: "செல்வகுமார்",
    email: "selva@aathirainews.com",
    role: "Editor-in-Chief",
    bio: "Senior journalist with 14 years of experience in Tamil media.",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailOnPublish: true,
    emailOnComment: false,
    emailOnDraft: true,
    browserPush: false,
    dailySummary: true,
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleSaveSite = () => {
    showToast("✅ Site settings saved successfully!");
  };

  const handleSaveProfile = () => {
    showToast("✅ Profile updated successfully!");
  };

  const handleSaveNotifications = () => {
    showToast("✅ Notification preferences saved!");
  };

  const handleChangePassword = () => {
    if (!currentPassword) {
      setPasswordError("Current password is required.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showToast("✅ Password changed successfully!");
  };

  const tabs = [
    { key: "site", label: "Site Settings", icon: "settings" },
    { key: "profile", label: "My Profile", icon: "person" },
    { key: "notifications", label: "Notifications", icon: "notifications" },
    { key: "security", label: "Security", icon: "lock" },
  ] as const;

  return (
    <>
      <main className="p-6 max-w-[1280px] min-h-[calc(100vh-140px)]">
        {/* Toast */}
        {toastMsg && (
          <div className="fixed top-6 right-6 z-50 bg-white border border-gray-200 shadow-lg px-5 py-3 rounded-lg text-sm font-bold text-slate-700">
            {toastMsg}
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
          <div>
            <h2 className="font-['Work_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-blue-900 uppercase tracking-tight">
              System Settings
            </h2>
            <p className="font-[Inter] text-[14px] leading-[20px] text-slate-500">
              Configure CMS preferences, user profile, and security.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Tabs */}
          <div className="col-span-12 lg:col-span-3">
            <nav className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-bold transition-all border-b border-gray-100 last:border-0 ${
                    activeTab === tab.key
                      ? "bg-blue-900 text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Info Card */}
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-xs font-bold text-blue-900 mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  info
                </span>
                CMS Version
              </p>
              <p className="text-xs text-slate-500">AathiraiNews CMS v2.4.1</p>
              <p className="text-xs text-slate-400 mt-1">
                Last updated: Oct 24, 2024
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-12 lg:col-span-9">
            {/* === SITE SETTINGS === */}
            {activeTab === "site" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-['Work_Sans'] text-[20px] font-bold text-blue-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    settings
                  </span>
                  Site Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Site Name
                    </label>
                    <input
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                      value={site.siteName}
                      onChange={(e) =>
                        setSite({ ...site, siteName: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Contact Email
                    </label>
                    <input
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                      type="email"
                      value={site.contactEmail}
                      onChange={(e) =>
                        setSite({ ...site, contactEmail: e.target.value })
                      }
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Tagline
                    </label>
                    <input
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                      value={site.tagline}
                      onChange={(e) =>
                        setSite({ ...site, tagline: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Articles Per Page
                    </label>
                    <select
                      className="border border-gray-200 p-2.5 outline-none text-sm"
                      value={site.articlesPerPage}
                      onChange={(e) =>
                        setSite({ ...site, articlesPerPage: e.target.value })
                      }
                    >
                      <option value="6">6</option>
                      <option value="9">9</option>
                      <option value="12">12</option>
                      <option value="18">18</option>
                      <option value="24">24</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Google Analytics ID
                    </label>
                    <input
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm font-mono"
                      placeholder="G-XXXXXXXXXX"
                      value={site.googleAnalyticsId}
                      onChange={(e) =>
                        setSite({ ...site, googleAnalyticsId: e.target.value })
                      }
                    />
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Breaking News Text (Tamil)
                    </label>
                    <textarea
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm font-[Mukta_Malar] text-[16px]"
                      rows={2}
                      value={site.breakingNewsText}
                      onChange={(e) =>
                        setSite({ ...site, breakingNewsText: e.target.value })
                      }
                    />
                    <p className="text-[10px] text-slate-400">
                      This text scrolls in the breaking news ticker at the top of the homepage.
                    </p>
                  </div>
                </div>

                {/* Maintenance Mode */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-slate-700 mb-3">
                    Site Visibility
                  </h4>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-gray-200">
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        Maintenance Mode
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Enable to show a maintenance page to public visitors.
                      </p>
                    </div>
                    <button
                      className="w-11 h-6 rounded-full bg-slate-200 relative transition-colors"
                      aria-label="Toggle maintenance mode"
                    >
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"></span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveSite}
                    className="px-8 py-2.5 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors"
                  >
                    SAVE SETTINGS
                  </button>
                </div>
              </div>
            )}

            {/* === PROFILE === */}
            {activeTab === "profile" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-['Work_Sans'] text-[20px] font-bold text-blue-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    person
                  </span>
                  My Profile
                </h3>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest overflow-hidden shrink-0">
                    <img
                      alt="Profile"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8QUsSclJVucaFf7coElIfrI_sOY0jn8ygVVHUdJwRdSpuKvmf42spetIi-Zrlwh9j9ayv2GXnIChXiT6g2u4gyIvMOCSmNe6kfAjAe6C17Gin8fnkb-2Jj1ctUxNgtBNnNqrAbR31YxkGq62MO80xmMZORiMz89E8NR1TcmndFTIunxKFY8DRTe3jUAPAhMwEihd9zBJ9wKSGJi_p21Als3VOrV_adbX_Awsb71S4PXrXVZvxqpl0aTJEbBmZMwfXipAZMULjKwA"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">{profile.name}</p>
                    <p className="text-xs text-slate-400">{profile.role}</p>
                    <button className="mt-2 text-xs font-bold text-blue-900 hover:underline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        upload
                      </span>
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Full Name (English)
                    </label>
                    <input
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Full Name (Tamil)
                    </label>
                    <input
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none font-[Mukta_Malar] text-[16px]"
                      value={profile.nameTa}
                      onChange={(e) =>
                        setProfile({ ...profile, nameTa: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Role
                    </label>
                    <select
                      className="border border-gray-200 p-2.5 outline-none text-sm"
                      value={profile.role}
                      onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })
                      }
                    >
                      <option>Editor-in-Chief</option>
                      <option>Senior Editor</option>
                      <option>Reporter</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Bio
                    </label>
                    <textarea
                      className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                      rows={3}
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="px-8 py-2.5 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors"
                  >
                    UPDATE PROFILE
                  </button>
                </div>
              </div>
            )}

            {/* === NOTIFICATIONS === */}
            {activeTab === "notifications" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-['Work_Sans'] text-[20px] font-bold text-blue-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    notifications
                  </span>
                  Notification Preferences
                </h3>

                <div className="flex flex-col divide-y divide-gray-100">
                  {(
                    [
                      {
                        key: "emailOnPublish",
                        label: "Article Published",
                        desc: "Get an email when an article is published.",
                      },
                      {
                        key: "emailOnComment",
                        label: "New Comment",
                        desc: "Get notified when a reader leaves a comment.",
                      },
                      {
                        key: "emailOnDraft",
                        label: "Draft Submitted",
                        desc: "Get an email when a reporter submits a draft.",
                      },
                      {
                        key: "browserPush",
                        label: "Browser Push Notifications",
                        desc: "Receive real-time browser notifications.",
                      },
                      {
                        key: "dailySummary",
                        label: "Daily Summary Email",
                        desc:
                          "Get a daily digest of published articles and stats.",
                      },
                    ] as const
                  ).map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-4"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-700">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications((prev) => ({
                            ...prev,
                            [item.key]: !prev[item.key],
                          }))
                        }
                        className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${
                          notifications[item.key]
                            ? "bg-blue-900"
                            : "bg-slate-200"
                        }`}
                        aria-label={`Toggle ${item.label}`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                            notifications[item.key]
                              ? "left-6"
                              : "left-1"
                          }`}
                        ></span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleSaveNotifications}
                    className="px-8 py-2.5 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors"
                  >
                    SAVE PREFERENCES
                  </button>
                </div>
              </div>
            )}

            {/* === SECURITY === */}
            {activeTab === "security" && (
              <div className="flex flex-col gap-6">
                {/* Change Password */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-['Work_Sans'] text-[20px] font-bold text-blue-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      lock
                    </span>
                    Change Password
                  </h3>
                  {passwordError && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 text-sm">
                      {passwordError}
                    </div>
                  )}
                  <div className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                        placeholder="Min. 8 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="border border-gray-200 p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={handleChangePassword}
                      className="self-start px-8 py-2.5 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors"
                    >
                      CHANGE PASSWORD
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-['Work_Sans'] text-[20px] font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      devices
                    </span>
                    Active Sessions
                  </h3>
                  <div className="flex flex-col divide-y divide-gray-100">
                    {[
                      {
                        device: "Chrome on Windows",
                        icon: "computer",
                        location: "Chennai, IN",
                        time: "Now (current)",
                        current: true,
                      },
                      {
                        device: "Safari on iPhone",
                        icon: "phone_iphone",
                        location: "Chennai, IN",
                        time: "2 hours ago",
                        current: false,
                      },
                    ].map((session, i) => (
                      <div
                        key={i}
                        className="py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-500">
                              {session.icon}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700">
                              {session.device}
                            </p>
                            <p className="text-xs text-slate-400">
                              {session.location} · {session.time}
                            </p>
                          </div>
                        </div>
                        {session.current ? (
                          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            Current
                          </span>
                        ) : (
                          <button className="text-xs font-bold text-primary hover:underline">
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="font-['Work_Sans'] text-[18px] font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">warning</span>
                    Danger Zone
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    These actions are irreversible. Please proceed with caution.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-2.5 border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors text-sm">
                      Deactivate Account
                    </button>
                    <button className="px-6 py-2.5 bg-primary text-white font-bold hover:bg-red-800 transition-colors text-sm">
                      Delete Account Permanently
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
