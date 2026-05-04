/**
 * API Utility — Centralised fetch helpers
 * ----------------------------------------
 * All components import from here so the base URL is
 * defined in one place.  Token is read from localStorage
 * (set by the admin login flow).
 */

export const BASE = "/api";

/** Shape returned by every endpoint */
export interface NewsArticle {
  _id: string;
  titleEn: string;
  titleTa: string;
  contentEn: string;
  contentTa: string;
  category: string;
  newsLanguage: "tamil" | "english" | "bilingual";
  image: string;
  author: string;
  isPublished: boolean;
  publishDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface NewsListResponse {
  success: boolean;
  data: NewsArticle[];
  pagination: Pagination;
  stats?: { total: number; published: number; drafts: number };
}

/** Helper: attach Bearer token if present in localStorage */
function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("aathirai_token") ?? localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Public ────────────────────────────────────────────────────

export async function fetchPublishedNews(params?: {
  category?: string;
  newsLanguage?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<NewsListResponse> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set("category", params.category);
  if (params?.newsLanguage) qs.set("language", params.newsLanguage);
  if (params?.search) qs.set("search", params.search);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));

  const res = await fetch(`${BASE}/news?${qs.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export async function fetchSingleNews(id: string): Promise<NewsArticle> {
  const res = await fetch(`${BASE}/news/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Article not found");
  const json = await res.json();
  return json.data as NewsArticle;
}

// ── Admin ─────────────────────────────────────────────────────

export async function fetchAdminNews(params?: {
  status?: "published" | "draft";
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<NewsListResponse> {
  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.category) qs.set("category", params.category);
  if (params?.search) qs.set("search", params.search);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));

  const res = await fetch(`${BASE}/admin/news?${qs.toString()}`, {
    headers: authHeader(),
    cache: "no-store",
  });
  if (!res.ok) {
    const errorJson = await res.json().catch(() => null);
    if (res.status === 401) {
      throw new Error("Unauthorized: Please log in as admin.");
    }
    throw new Error(errorJson?.error || errorJson?.message || `Failed to fetch admin news (${res.status})`);
  }
  return res.json();
}

export async function createNews(body: Partial<NewsArticle>): Promise<NewsArticle> {
  const res = await fetch(`${BASE}/news`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to create article");
  return json.data as NewsArticle;
}

export async function updateNews(
  id: string,
  body: Partial<NewsArticle>
): Promise<NewsArticle> {
  const res = await fetch(`${BASE}/news/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to update article");
  return json.data as NewsArticle;
}

export async function deleteNews(id: string): Promise<void> {
  const res = await fetch(`${BASE}/news/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to delete article");
}

export async function togglePublish(
  id: string,
  isPublished: boolean
): Promise<NewsArticle> {
  const res = await fetch(`${BASE}/news/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ isPublished }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to toggle publish");
  return json.data as NewsArticle;
}

// ── Auth ──────────────────────────────────────────────────────

export async function login(
  email: string,
  password: string
): Promise<{ token: string; data: { name: string; email: string; role: string } }> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Login failed");
  return json;
}

/** Relative time formatter (e.g. "2 HOURS AGO") */
export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 1) return `${days} DAYS AGO`;
  if (days === 1) return "1 DAY AGO";
  if (hrs > 1) return `${hrs} HOURS AGO`;
  if (hrs === 1) return "1 HOUR AGO";
  if (mins > 1) return `${mins} MINUTES AGO`;
  return "JUST NOW";
}

/** Short date formatter for admin table (e.g. "May 3, 10:45 AM") */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// ── Categories ────────────────────────────────────────────────

export interface CategoryData {
  _id: string;
  name: string;
  nameTa: string;
  slug: string;
  color: string;
  status: "Active" | "Inactive";
}

export async function fetchCategories(): Promise<{ success: boolean; data: CategoryData[] }> {
  const res = await fetch(`${BASE}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createCategory(body: Partial<CategoryData>): Promise<CategoryData> {
  const res = await fetch(`${BASE}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to create category");
  return json.data;
}

export async function updateCategory(id: string, body: Partial<CategoryData>): Promise<CategoryData> {
  const res = await fetch(`${BASE}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to update category");
  return json.data;
}

export async function deleteCategory(id: string): Promise<void> {
  const res = await fetch(`${BASE}/categories/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Failed to delete category");
}

// ── Settings ──────────────────────────────────────────────────

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  articlesPerPage: string;
  breakingNewsText: string;
  googleAnalyticsId: string;
}

export async function fetchSettings(): Promise<{ success: boolean; data: SiteSettings }> {
  const res = await fetch(`${BASE}/settings`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch settings");
  return res.json();
}

export async function updateSettings(body: Partial<SiteSettings>): Promise<SiteSettings> {
  const res = await fetch(`${BASE}/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to update settings");
  return json.data;
}
