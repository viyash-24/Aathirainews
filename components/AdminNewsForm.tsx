"use client";

import { useState, FormEvent } from "react";

interface ArticleFormData {
  englishTitle: string;
  tamilTitle: string;
  category: string;
  publishDate: string;
  content: string;
}

interface FormErrors {
  englishTitle?: string;
  tamilTitle?: string;
  content?: string;
}

export default function AdminNewsForm() {
  const [formData, setFormData] = useState<ArticleFormData>({
    englishTitle: "",
    tamilTitle: "",
    category: "Politics",
    publishDate: "",
    content: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "published" | "drafted">(
    "idle"
  );

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.englishTitle.trim()) {
      newErrors.englishTitle = "English title is required";
    }
    if (!formData.tamilTitle.trim()) {
      newErrors.tamilTitle = "Tamil title is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus("published");
      setFormData({
        englishTitle: "",
        tamilTitle: "",
        category: "Politics",
        publishDate: "",
        content: "",
      });
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleDraft = () => {
    setStatus("drafted");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="col-span-12 lg:col-span-5 bg-white border border-gray-200 p-8 flex flex-col gap-6 h-fit">
      <h3 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold text-blue-900 flex items-center gap-2">
        <span className="material-symbols-outlined">post_add</span>
        New Entry
      </h3>

      {status === "published" && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 text-sm">
          ✅ Article published successfully!
        </div>
      )}
      {status === "drafted" && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-3 text-sm">
          📝 Article saved as draft.
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-1">
          <label className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-600 uppercase">
            English Title
          </label>
          <input
            className={`w-full border ${
              errors.englishTitle ? "border-error" : "border-gray-200"
            } focus:ring-2 focus:ring-blue-900 focus:border-blue-900 p-2 font-[Inter] text-[16px] leading-[24px] outline-none`}
            placeholder="Enter headline in English"
            type="text"
            value={formData.englishTitle}
            onChange={(e) =>
              setFormData({ ...formData, englishTitle: e.target.value })
            }
          />
          {errors.englishTitle && (
            <p className="text-error text-xs">{errors.englishTitle}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-600 uppercase">
            Tamil Title (தமிழ் தலைப்பு)
          </label>
          <input
            className={`w-full border ${
              errors.tamilTitle ? "border-error" : "border-gray-200"
            } focus:ring-2 focus:ring-blue-900 focus:border-blue-900 p-2 font-[Mukta_Malar] text-[18px] leading-[30px] outline-none`}
            placeholder="செய்தி தலைப்பை உள்ளிடவும்"
            type="text"
            value={formData.tamilTitle}
            onChange={(e) =>
              setFormData({ ...formData, tamilTitle: e.target.value })
            }
          />
          {errors.tamilTitle && (
            <p className="text-error text-xs">{errors.tamilTitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-600 uppercase">
              Category
            </label>
            <select
              className="w-full border border-gray-200 focus:ring-2 focus:ring-blue-900 p-2 outline-none"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Politics</option>
              <option>Technology</option>
              <option>Local News</option>
              <option>Sports</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-600 uppercase">
              Publish Schedule
            </label>
            <input
              className="w-full border border-gray-200 focus:ring-2 focus:ring-blue-900 p-2 outline-none"
              type="datetime-local"
              value={formData.publishDate}
              onChange={(e) =>
                setFormData({ ...formData, publishDate: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-600 uppercase">
            Article Content (Bilingual)
          </label>
          <textarea
            className={`w-full border ${
              errors.content ? "border-error" : "border-gray-200"
            } focus:ring-2 focus:ring-blue-900 p-2 font-[Inter] text-[14px] leading-[20px] outline-none`}
            placeholder="Start typing the story here..."
            rows={6}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
          {errors.content && (
            <p className="text-error text-xs">{errors.content}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-600 uppercase">
            Featured Image
          </label>
          <div className="border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center gap-2 hover:border-blue-900 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-900">
              cloud_upload
            </span>
            <p className="text-sm text-slate-500">
              Drag and drop or click to upload
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            className="px-6 py-2 border border-slate-300 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            type="button"
            onClick={handleDraft}
          >
            SAVE AS DRAFT
          </button>
          <button
            className="px-6 py-2 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors"
            type="submit"
          >
            PUBLISH ARTICLE
          </button>
        </div>
      </form>
    </section>
  );
}
