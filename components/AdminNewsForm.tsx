"use client";

import { useState, FormEvent, useEffect } from "react";
import { createNews, fetchCategories, type CategoryData } from "@/lib/api";

interface FormData {
  titleEn: string;
  titleTa: string;
  category: string;
  language: "english" | "tamil";
  contentEn: string;
  contentTa: string;
  image: string;
  author: string;
  publishDate: string;
}

interface Props {
  /** Called after a successful save so the table can refresh */
  onSaved?: () => void;
}

export default function AdminNewsForm({ onSaved }: Props) {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  useEffect(() => {
    fetchCategories()
      .then((res) => {
        setCategories(res.data.filter(c => c.status === "Active"));
      })
      .catch((err) => console.error(err));
  }, []);

  const [form, setForm] = useState<FormData>({
    titleEn: "",
    titleTa: "",
    category: "Politics",
    language: "english",
    contentEn: "",
    contentTa: "",
    image: "",
    author: "",
    publishDate: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "published" | "drafted" | "error">("idle");
  const [apiError, setApiError] = useState("");

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.titleEn.trim()) e.titleEn = "English title is required";
    if (!form.titleTa.trim()) e.titleTa = "Tamil title is required";
    if (form.language === "english" && !form.contentEn.trim()) {
      e.contentEn = "English content is required";
    }
    if (form.language === "tamil" && !form.contentTa.trim()) {
      e.contentTa = "Tamil content is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () =>
    setForm({
      titleEn: "", titleTa: "", category: categories.length > 0 ? categories[0].name : "Politics",
      language: "english", contentEn: "", contentTa: "", image: "", author: "", publishDate: "",
    });

  const submit = async (publish: boolean) => {
    if (!validate()) return;
    setStatus("saving");
    setApiError("");
    try {
      await createNews({
        titleEn: form.titleEn,
        titleTa: form.titleTa,
        category: form.category || (categories.length > 0 ? categories[0].name : "Politics"),
        newsLanguage: form.language,
        contentEn: form.contentEn,
        contentTa: form.contentTa,
        image: form.image,
        author: form.author || "Admin",
        isPublished: publish,
        publishDate: form.publishDate || null,
      });
      setStatus(publish ? "published" : "drafted");
      reset();
      onSaved?.();
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleImageFile = async (file: File | null) => {
    if (!file) return;
    setImageUploadError("");
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.error || json?.message || "Image upload failed");
      }
      if (!json?.url) {
        throw new Error("Image upload failed");
      }
      set("image", json.url);
    } catch (err) {
      setImageUploadError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePublish = (e: FormEvent) => { e.preventDefault(); submit(true); };
  const handleDraft = () => submit(false);

  const isBusy = status === "saving";

  return (
    <section className="col-span-12 bg-white border border-gray-200 p-8 flex flex-col gap-6 h-fit">
      <h3 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold text-blue-900 flex items-center gap-2">
        <span className="material-symbols-outlined">post_add</span>
        New Entry
      </h3>

      {/* Status banners */}
      {status === "published" && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          Article published successfully! It is now live on the website.
        </div>
      )}
      {status === "drafted" && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">draft</span>
          Article saved as draft. Publish it from the table below when ready.
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {apiError || "Failed to save article. Are you logged in as admin?"}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handlePublish} noValidate>

        {/* English Title */}
        <div className="flex flex-col gap-1">
          <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
            English Title *
          </label>
          <input
            className={`w-full border ${errors.titleEn ? "border-red-400" : "border-gray-200"} focus:ring-2 focus:ring-blue-900 focus:border-blue-900 p-2 font-[Inter] text-[16px] outline-none disabled:opacity-50`}
            placeholder="Enter headline in English"
            type="text"
            value={form.titleEn}
            disabled={isBusy}
            onChange={(e) => set("titleEn", e.target.value)}
          />
          {errors.titleEn && <p className="text-red-500 text-xs">{errors.titleEn}</p>}
        </div>

        {/* Tamil Title */}
        <div className="flex flex-col gap-1">
          <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
            Tamil Title (தமிழ் தலைப்பு) *
          </label>
          <input
            className={`w-full border ${errors.titleTa ? "border-red-400" : "border-gray-200"} focus:ring-2 focus:ring-blue-900 focus:border-blue-900 p-2 font-[Mukta_Malar] text-[18px] leading-[30px] outline-none disabled:opacity-50`}
            placeholder="செய்தி தலைப்பை உள்ளிடவும்"
            type="text"
            value={form.titleTa}
            disabled={isBusy}
            onChange={(e) => set("titleTa", e.target.value)}
          />
          {errors.titleTa && <p className="text-red-500 text-xs">{errors.titleTa}</p>}
        </div>

        {/* Category + Language + Author */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
              Category
            </label>
            <select
              className="w-full border border-gray-200 focus:ring-2 focus:ring-blue-900 p-2 outline-none disabled:opacity-50"
              value={form.category}
              disabled={isBusy}
              onChange={(e) => set("category", e.target.value)}
            >
              {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
              {categories.length === 0 && <option value="Politics">Politics</option>}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
              Language
            </label>
            <select
              className="w-full border border-gray-200 focus:ring-2 focus:ring-blue-900 p-2 outline-none disabled:opacity-50"
              value={form.language}
              disabled={isBusy}
              onChange={(e) => set("language", e.target.value as FormData["language"])}
            >
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
              Author
            </label>
            <input
              className="w-full border border-gray-200 focus:ring-2 focus:ring-blue-900 p-2 font-[Inter] text-[14px] outline-none disabled:opacity-50"
              placeholder="Reporter name"
              type="text"
              value={form.author}
              disabled={isBusy}
              onChange={(e) => set("author", e.target.value)}
            />
          </div>
        </div>

        {/* Schedule + Image URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
              Publish Schedule (optional)
            </label>
            <input
              className="w-full border border-gray-200 focus:ring-2 focus:ring-blue-900 p-2 outline-none disabled:opacity-50"
              type="datetime-local"
              value={form.publishDate}
              disabled={isBusy}
              onChange={(e) => set("publishDate", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
              Image URL (optional)
            </label>
            <input
              className="w-full border border-gray-200 focus:ring-2 focus:ring-blue-900 p-2 font-[Inter] text-[14px] outline-none disabled:opacity-50"
              placeholder="https://example.com/image.jpg"
              type="url"
              value={form.image}
              disabled={isBusy}
              onChange={(e) => set("image", e.target.value)}
            />
          </div>
        </div>

        {/* Local Image Upload */}
        <div className="flex flex-col gap-1">
          <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
            Upload Image (optional)
          </label>
          <input
            className="w-full border border-gray-200 focus:ring-2 focus:ring-blue-900 p-2 outline-none disabled:opacity-50 file:mr-3 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-blue-700"
            type="file"
            accept="image/*"
            disabled={isBusy || uploadingImage}
            onChange={(e) => handleImageFile(e.target.files?.[0] || null)}
          />
          {uploadingImage && (
            <p className="text-xs text-slate-500">Uploading image...</p>
          )}
          {imageUploadError && (
            <p className="text-red-500 text-xs">{imageUploadError}</p>
          )}
          {form.image && !imageUploadError && (
            <p className="text-xs text-slate-500">Selected: {form.image}</p>
          )}
        </div>

        {form.language === "english" && (
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
              English Content *
            </label>
            <textarea
              className={`w-full border ${errors.contentEn ? "border-red-400" : "border-gray-200"} focus:ring-2 focus:ring-blue-900 p-2 font-[Inter] text-[14px] leading-[20px] outline-none disabled:opacity-50`}
              placeholder="Start typing the story in English..."
              rows={6}
              value={form.contentEn}
              disabled={isBusy}
              onChange={(e) => set("contentEn", e.target.value)}
            />
            {errors.contentEn && <p className="text-red-500 text-xs">{errors.contentEn}</p>}
          </div>
        )}

        {form.language === "tamil" && (
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] font-bold text-slate-600 uppercase tracking-wider">
              Tamil Content *
            </label>
            <textarea
              className={`w-full border ${errors.contentTa ? "border-red-400" : "border-gray-200"} focus:ring-2 focus:ring-blue-900 p-2 font-[Mukta_Malar] text-[16px] leading-[26px] outline-none disabled:opacity-50`}
              placeholder="தமிழில் செய்தியை எழுதவும்..."
              rows={6}
              value={form.contentTa}
              disabled={isBusy}
              onChange={(e) => set("contentTa", e.target.value)}
            />
            {errors.contentTa && <p className="text-red-500 text-xs">{errors.contentTa}</p>}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            className="px-6 py-2 border border-slate-300 font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-40"
            type="button"
            disabled={isBusy}
            onClick={handleDraft}
          >
            {isBusy ? "SAVING…" : "SAVE AS DRAFT"}
          </button>
          <button
            className="px-6 py-2 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors disabled:opacity-40 flex items-center gap-2"
            type="submit"
            disabled={isBusy}
          >
            {isBusy && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            )}
            {isBusy ? "PUBLISHING…" : "PUBLISH ARTICLE"}
          </button>
        </div>
      </form>
    </section>
  );
}
