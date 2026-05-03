"use client";

import { useState } from "react";
import AdminFooter from "@/components/AdminFooter";

interface Category {
  id: number;
  name: string;
  nameTa: string;
  slug: string;
  articleCount: number;
  color: string;
  status: "Active" | "Inactive";
}

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Politics",
    nameTa: "அரசியல்",
    slug: "politics",
    articleCount: 540,
    color: "#af101a",
    status: "Active",
  },
  {
    id: 2,
    name: "Technology",
    nameTa: "தொழில்நுட்பம்",
    slug: "technology",
    articleCount: 360,
    color: "#4c56af",
    status: "Active",
  },
  {
    id: 3,
    name: "Local News",
    nameTa: "உள்ளூர் செய்திகள்",
    slug: "local-news",
    articleCount: 385,
    color: "#455b65",
    status: "Active",
  },
  {
    id: 4,
    name: "Sports",
    nameTa: "விளையாட்டு",
    slug: "sports",
    articleCount: 180,
    color: "#16a34a",
    status: "Active",
  },
  {
    id: 5,
    name: "Cinema",
    nameTa: "சினிமா",
    slug: "cinema",
    articleCount: 120,
    color: "#7c3aed",
    status: "Active",
  },
  {
    id: 6,
    name: "Agriculture",
    nameTa: "விவசாயம்",
    slug: "agriculture",
    articleCount: 98,
    color: "#d97706",
    status: "Active",
  },
  {
    id: 7,
    name: "Health",
    nameTa: "ஆரோக்கியம்",
    slug: "health",
    articleCount: 76,
    color: "#0891b2",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Education",
    nameTa: "கல்வி",
    slug: "education",
    articleCount: 64,
    color: "#db2777",
    status: "Active",
  },
];

interface FormData {
  name: string;
  nameTa: string;
  slug: string;
  color: string;
  status: "Active" | "Inactive";
}

const emptyForm: FormData = {
  name: "",
  nameTa: "",
  slug: "",
  color: "#af101a",
  status: "Active",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "English name is required";
    if (!form.nameTa.trim()) e.nameTa = "Tamil name is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    else if (!/^[a-z0-9-]+$/.test(form.slug))
      e.slug = "Slug must be lowercase letters, numbers, and hyphens only";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNameChange = (value: string) => {
    setForm({
      ...form,
      name: value,
      slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    });
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editId !== null) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editId ? { ...c, ...form } : c
        )
      );
      showToast("✅ Category updated successfully!");
    } else {
      const newCat: Category = {
        id: Date.now(),
        ...form,
        articleCount: 0,
      };
      setCategories((prev) => [...prev, newCat]);
      showToast("✅ Category added successfully!");
    }
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleEdit = (cat: Category) => {
    setForm({
      name: cat.name,
      nameTa: cat.nameTa,
      slug: cat.slug,
      color: cat.color,
      status: cat.status,
    });
    setEditId(cat.id);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirmId(null);
    showToast("🗑️ Category deleted.");
  };

  const toggleStatus = (id: number) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );
  };

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.nameTa.includes(searchQuery) ||
      c.slug.includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main className="p-6 max-w-[1280px] min-h-[calc(100vh-140px)]">
        {/* Toast */}
        {toastMsg && (
          <div className="fixed top-6 right-6 z-50 bg-white border border-gray-200 shadow-lg px-5 py-3 rounded-lg text-sm font-bold text-slate-700">
            {toastMsg}
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteConfirmId !== null && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl">
              <div className="text-center mb-6">
                <span className="material-symbols-outlined text-5xl text-primary">
                  warning
                </span>
                <h3 className="font-['Work_Sans'] text-[20px] font-bold text-blue-900 mt-2">
                  Delete Category?
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  This action cannot be undone. All articles under this category
                  will be unassigned.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-6 py-2 border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="px-6 py-2 bg-primary text-white font-bold hover:bg-red-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
          <div>
            <h2 className="font-['Work_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-blue-900 uppercase tracking-tight">
              Category Management
            </h2>
            <p className="font-[Inter] text-[14px] leading-[20px] text-slate-500">
              {categories.length} categories ·{" "}
              {categories.filter((c) => c.status === "Active").length} active
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setForm(emptyForm);
              setErrors({});
            }}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-red-800 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined">add_circle</span>
            ADD CATEGORY
          </button>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Form Panel */}
          {showForm && (
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-['Work_Sans'] text-[20px] font-bold text-blue-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                      {editId ? "edit" : "add_circle"}
                    </span>
                    {editId ? "Edit Category" : "Add New Category"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setErrors({});
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {/* English Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      English Name *
                    </label>
                    <input
                      className={`w-full border ${
                        errors.name ? "border-primary" : "border-gray-200"
                      } p-2.5 focus:ring-2 focus:ring-blue-900 outline-none text-sm`}
                      placeholder="e.g. Politics"
                      value={form.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                    />
                    {errors.name && (
                      <p className="text-primary text-xs">{errors.name}</p>
                    )}
                  </div>

                  {/* Tamil Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Tamil Name (தமிழ்) *
                    </label>
                    <input
                      className={`w-full border ${
                        errors.nameTa ? "border-primary" : "border-gray-200"
                      } p-2.5 focus:ring-2 focus:ring-blue-900 outline-none font-[Mukta_Malar] text-[16px]`}
                      placeholder="எ.கா. அரசியல்"
                      value={form.nameTa}
                      onChange={(e) =>
                        setForm({ ...form, nameTa: e.target.value })
                      }
                    />
                    {errors.nameTa && (
                      <p className="text-primary text-xs">{errors.nameTa}</p>
                    )}
                  </div>

                  {/* Slug */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      URL Slug *
                    </label>
                    <div className="flex items-center border border-gray-200 focus-within:ring-2 focus-within:ring-blue-900">
                      <span className="px-3 py-2.5 bg-slate-50 text-slate-400 text-xs border-r border-gray-200 select-none">
                        /category/
                      </span>
                      <input
                        className="flex-1 p-2.5 outline-none text-sm bg-transparent"
                        placeholder="politics"
                        value={form.slug}
                        onChange={(e) =>
                          setForm({ ...form, slug: e.target.value })
                        }
                      />
                    </div>
                    {errors.slug && (
                      <p className="text-primary text-xs">{errors.slug}</p>
                    )}
                  </div>

                  {/* Color & Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Color
                      </label>
                      <div className="flex items-center gap-2 border border-gray-200 p-2">
                        <input
                          type="color"
                          className="w-8 h-8 cursor-pointer border-0 p-0 bg-transparent"
                          value={form.color}
                          onChange={(e) =>
                            setForm({ ...form, color: e.target.value })
                          }
                        />
                        <span className="text-xs text-slate-500 font-mono">
                          {form.color}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Status
                      </label>
                      <select
                        className="w-full border border-gray-200 p-2.5 outline-none text-sm"
                        value={form.status}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            status: e.target.value as "Active" | "Inactive",
                          })
                        }
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">
                      Preview
                    </p>
                    <span
                      className="inline-block text-white text-xs font-bold px-3 py-1 uppercase tracking-wider"
                      style={{ backgroundColor: form.color }}
                    >
                      {form.name || "Category Name"}
                    </span>
                    <span className="ml-2 font-[Mukta_Malar] text-sm text-slate-600">
                      {form.nameTa || "வகை பெயர்"}
                    </span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setErrors({});
                      }}
                      className="flex-1 py-2.5 border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-2.5 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-colors text-sm"
                    >
                      {editId ? "Update" : "Add Category"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Categories Table */}
          <div className={`col-span-12 ${showForm ? "lg:col-span-8" : ""}`}>
            {/* Search */}
            <div className="mb-4 flex gap-3 items-center">
              <div className="relative flex-1 max-w-sm">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                  search
                </span>
                <input
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 text-sm focus:ring-2 focus:ring-blue-900 outline-none"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <span className="text-sm text-slate-500">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="bg-white border border-gray-200 overflow-hidden rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Slug
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      Articles
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((cat) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: cat.color }}
                          ></div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">
                              {cat.name}
                            </p>
                            <p className="font-[Mukta_Malar] text-xs text-slate-400">
                              {cat.nameTa}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <code className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          /{cat.slug}
                        </code>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(
                                  (cat.articleCount / 540) * 100,
                                  100
                                )}%`,
                                backgroundColor: cat.color,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-slate-600">
                            {cat.articleCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleStatus(cat.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold uppercase cursor-pointer ${
                            cat.status === "Active"
                              ? "text-emerald-600"
                              : "text-slate-400"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              cat.status === "Active"
                                ? "bg-emerald-500"
                                : "bg-slate-300"
                            }`}
                          ></span>
                          {cat.status}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(cat.id)}
                            className="p-1.5 text-slate-400 hover:text-primary hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-12 text-center text-slate-400 text-sm"
                      >
                        No categories match your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
