"use client";

import { useState, FormEvent } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="lg:col-span-7 bg-white p-10 border border-surface-container-highest shadow-sm">
      {submitted && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 font-[Inter] text-[14px] leading-[20px]">
          ✅ Message sent successfully! We&apos;ll get back to you soon.
        </div>
      )}
      <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
        <div className="relative group">
          <input
            className={`form-input w-full border-0 border-b ${
              errors.name ? "border-error" : "border-outline"
            } py-3 px-0 focus:ring-0 focus:border-primary bg-transparent font-[Inter] text-[16px] leading-[24px] peer outline-none`}
            id="contact-name"
            placeholder=" "
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <label
            className="absolute left-0 top-3 text-tertiary-container font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold uppercase transition-all"
            htmlFor="contact-name"
          >
            Full Name / முழு பெயர்
          </label>
          {errors.name && (
            <p className="text-error text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="relative group">
          <input
            className={`form-input w-full border-0 border-b ${
              errors.email ? "border-error" : "border-outline"
            } py-3 px-0 focus:ring-0 focus:border-primary bg-transparent font-[Inter] text-[16px] leading-[24px] peer outline-none`}
            id="contact-email"
            placeholder=" "
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label
            className="absolute left-0 top-3 text-tertiary-container font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold uppercase transition-all"
            htmlFor="contact-email"
          >
            Email Address / மின்னஞ்சல்
          </label>
          {errors.email && (
            <p className="text-error text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative group">
          <textarea
            className={`form-input w-full border-0 border-b ${
              errors.message ? "border-error" : "border-outline"
            } py-3 px-0 focus:ring-0 focus:border-primary bg-transparent font-[Inter] text-[16px] leading-[24px] peer resize-none outline-none`}
            id="contact-message"
            placeholder=" "
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
          <label
            className="absolute left-0 top-3 text-tertiary-container font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold uppercase transition-all"
            htmlFor="contact-message"
          >
            Your Message / உங்கள் செய்தி
          </label>
          {errors.message && (
            <p className="text-error text-xs mt-1">{errors.message}</p>
          )}
        </div>

        <button
          className="bg-blue-900 text-white py-4 px-8 font-['Work_Sans'] text-[24px] leading-[32px] font-semibold uppercase tracking-widest hover:bg-primary transition-colors duration-300 transform active:scale-95 self-start"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
