"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Form } from "@heroui/react";
import { ChevronDown } from "@gravity-ui/icons";
import Image from "next/image";
import { addPrompt } from "@/lib/api/prompts";
import FormHeader from "./FormHeader";
import FreePlanAlert from "./FreePlanAlert";

import {
  Sparkles,
  ArrowUpFromLine,
  Type,
  AlignLeft,
  Tags,
  LayoutGrid,
  Cpu,
  Gauge,
  Eye,
  ImageIcon,
} from "lucide-react";

const categories = [
  "Coding",
  "Writing",
  "Marketing",
  "Business",
  "Education",
  "Design",
  "SEO",
  "Productivity",
];

const aiTools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Perplexity",
  "Cursor AI",
  "GitHub Copilot",
  "Midjourney",
  "Grok",
];

const difficultyLevels = ["Beginner", "Intermediate", "Pro"];

// Helper function to convert File to Base64 to ensure API compatibility
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
};

export default function AddPromptForm({ user, plan, promptCount }) {
  const router = useRouter();

  // Move limit logic to the top so it is globally available to the component
  const maxLimit = plan?.maxPromptLimit ?? 3;
  const reachedLimit = maxLimit !== -1 && Number(promptCount) >= maxLimit;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [formData, setFormData] = useState({
    promptTitle: "",
    fullDescription: "",
    promptContent: "",
    usageInstructions: "",
    category: "",
    aiToolName: "",
    difficultyLevel: "",
    visibility: "public",
    tags: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Enforce the 2MB size limit stated in the UI
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    setImageFile(file);
    setThumbnailUrl(URL.createObjectURL(file));
  };

  const validate = () => {
    if (!formData.promptTitle.trim()) {
      toast.error("Prompt Title is required.");
      return false;
    }
    if (!formData.fullDescription.trim()) {
      toast.error("Prompt Description is required.");
      return false;
    }
    if (!formData.promptContent.trim()) {
      toast.error("Prompt Content is required.");
      return false;
    }
    if (!formData.category) {
      toast.error("Please select a category.");
      return false;
    }
    if (!formData.aiToolName) {
      toast.error("Please select an AI Tool.");
      return false;
    }
    if (!formData.difficultyLevel) {
      toast.error("Please select difficulty.");
      return false;
    }
    return true;
  };

  const uploadImage = async () => {
    if (!imageFile) return "";

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing. Check your .env file.");
    }

    // Convert to Base64 to avoid fetch multipart/form-data boundary drops
    const base64Image = await fileToBase64(imageFile);

    const form = new FormData();
    form.append("image", base64Image);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (!data.success) {
      // Expose the EXACT reason ImgBB rejected the image
      throw new Error(data.error?.message || "ImgBB image upload failed.");
    }

    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reachedLimit) {
      toast.error("Free plan limit reached. Upgrade to Premium.");
      return;
    }

    if (!user) {
      toast.error("Please log in to submit a prompt.");
      return;
    }

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      const uploadedImageUrl = await uploadImage();

      const payload = {
        ...formData,
        userId: user.id,
        thumbnailUrl: uploadedImageUrl,
        creatorInformation: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        },
      };

      const result = await addPrompt(payload);
      console.log("Success Result:", result);

      window.location.reload(true);
      toast.success(
        "Prompt submitted successfully. Waiting for admin approval.",
      );
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.message || "Failed to submit prompt.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const premiumLabelClass =
    "flex items-center gap-2 text-sm font-medium text-slate-300 mb-2.5";
  const premiumInputClass =
    "w-full bg-[#171C2B] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/70 transition-all shadow-inner shadow-black/20 appearance-none";
  const premiumFieldWrapper = "flex flex-col w-full relative";

  const isProUser = true;

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-12 lg:px-10 xl:px-0 py-22 lg:py-10">
      <FormHeader />

      <div className="mt-8">
        <FreePlanAlert
          currentCount={Number(promptCount)}
          limit={plan?.maxPromptLimit ?? 3}
          plan={plan?.plan_id ?? "free"}
        />
      </div>

      <div
        className={`
    mt-8
    rounded-2xl
    border
    border-slate-800
    bg-[#111520]
    shadow-lg
    transition-all
    duration-300
    ${reachedLimit ? "pointer-events-none opacity-0 select-none" : ""}
  `}
      >
        <Form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-8 max-w-5xl p-2 md:p-8 mx-auto"
        >
          {/* SECTION 1: Core Information */}
          <div className="bg-[#111520] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/40 space-y-8">
            <div className="border-b border-slate-800/80 pb-4 mb-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="text-violet-400" size={20} /> Prompt
                Details
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Provide the core structure of your AI template.
              </p>
            </div>

            <div className={premiumFieldWrapper}>
              <label className={premiumLabelClass}>
                <Type size={16} className="text-violet-400" /> Prompt Title
              </label>
              <input
                type="text"
                name="promptTitle"
                value={formData.promptTitle}
                onChange={handleInputChange}
                placeholder="e.g. React Landing Page Generator"
                className={premiumInputClass}
                required
              />
            </div>

            <div className={premiumFieldWrapper}>
              <label className={premiumLabelClass}>
                <AlignLeft size={16} className="text-violet-400" /> Short
                Description
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Briefly explain what this prompt does..."
                rows={3}
                className={`${premiumInputClass} h-20 resize-y`}
                required
              />
            </div>

            <div className={premiumFieldWrapper}>
              <label className={premiumLabelClass}>
                <AlignLeft size={16} className="text-emerald-400" /> Prompt
                Content
              </label>
              <textarea
                name="promptContent"
                value={formData.promptContent}
                onChange={handleInputChange}
                placeholder="Paste your exact AI prompt template here..."
                rows={10}
                className={`${premiumInputClass} h-30 font-mono text-sm leading-relaxed text-slate-300 resize-y`}
                required
              />
            </div>
          </div>

          {/* SECTION 2: Metadata & Classification */}
          <div className="bg-[#111520] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/40 space-y-8">
            <div className="border-b border-slate-800/80 pb-4 mb-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutGrid className="text-cyan-400" size={20} />{" "}
                Classification
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Category - Native Select */}
              <div className={premiumFieldWrapper}>
                <label className={premiumLabelClass}>
                  <LayoutGrid size={16} className="text-slate-400" /> Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category || ""}
                    onChange={handleInputChange}
                    className={`${premiumInputClass} cursor-pointer pr-10`}
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-[#171C2B] text-white"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                </div>
              </div>

              {/* AI Tool - Native Select */}
              <div className={premiumFieldWrapper}>
                <label className={premiumLabelClass}>
                  <Cpu size={16} className="text-slate-400" /> Target AI Tool
                </label>
                <div className="relative">
                  <select
                    name="aiToolName"
                    value={formData.aiToolName || ""}
                    onChange={handleInputChange}
                    className={`${premiumInputClass} cursor-pointer pr-10`}
                    required
                  >
                    <option value="" disabled>
                      Select AI Tool
                    </option>
                    {aiTools.map((tool) => (
                      <option
                        key={tool}
                        value={tool}
                        className="bg-[#171C2B] text-white"
                      >
                        {tool}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Difficulty - Native Select */}
              <div className={premiumFieldWrapper}>
                <label className={premiumLabelClass}>
                  <Gauge size={16} className="text-slate-400" /> Difficulty
                  Level
                </label>
                <div className="relative">
                  <select
                    name="difficultyLevel"
                    value={formData.difficultyLevel || ""}
                    onChange={handleInputChange}
                    className={`${premiumInputClass} cursor-pointer pr-10`}
                    required
                  >
                    <option value="" disabled>
                      Select Difficulty
                    </option>
                    {difficultyLevels.map((level) => (
                      <option
                        key={level}
                        value={level}
                        className="bg-[#171C2B] text-white"
                      >
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                </div>
              </div>

              {/* Visibility - Native Radio Inputs styled with Tailwind */}
              <div className={premiumFieldWrapper}>
                <label className={premiumLabelClass}>
                  <Eye size={16} className="text-slate-400" /> Visibility Status
                </label>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  {/* Public Radio */}
                  <label
                    className={`flex-1 flex cursor-pointer items-center gap-3 p-4 rounded-xl border transition-all ${
                      formData.visibility === "public"
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-slate-700/60 bg-[#171C2B] hover:border-violet-500/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={formData.visibility === "public"}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.visibility === "public" ? "border-violet-500" : "border-slate-500"}`}
                    >
                      {formData.visibility === "public" && (
                        <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="leading-tight">
                      <div className="font-semibold text-slate-200">Public</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Free Access
                      </div>
                    </div>
                  </label>

                  {/* Private Radio (Protected by isProUser) */}
                  <label
                    className={`flex-1 flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      !isProUser
                        ? "opacity-50 cursor-not-allowed border-slate-800 bg-[#111520]"
                        : "cursor-pointer"
                    } ${
                      formData.visibility === "private"
                        ? "border-violet-500 bg-violet-500/10"
                        : isProUser
                          ? "border-slate-700/60 bg-[#171C2B] hover:border-violet-500/50"
                          : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={formData.visibility === "private"}
                      onChange={handleInputChange}
                      disabled={!isProUser}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.visibility === "private" ? "border-violet-500" : "border-slate-500"}`}
                    >
                      {formData.visibility === "private" && (
                        <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="leading-tight">
                      <div className="font-semibold text-slate-200">
                        Private
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {isProUser ? "Premium Only" : "Upgrade to Pro"}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className={premiumFieldWrapper}>
              <label className={premiumLabelClass}>
                <Tags size={16} className="text-slate-400" /> Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="react, nextjs, tailwind, ai"
                className={premiumInputClass}
              />
              <p className="mt-2 text-xs text-slate-500">
                Separate each tag using commas (,).
              </p>
            </div>
          </div>

          {/* SECTION 3: Media Upload */}
          <div className="bg-[#111520] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg shadow-black/40">
            <div className="flex flex-col gap-4">
              <span className={premiumLabelClass}>
                <ImageIcon size={16} className="text-fuchsia-400" /> Thumbnail
                Image
              </span>
              <div className="relative flex min-h-70 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-700/60 bg-[#171C2B] transition-all hover:border-violet-500 hover:bg-violet-500/5 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />
                {thumbnailUrl ? (
                  <div className="relative h-full w-full min-h-70">
                    <Image
                      src={thumbnailUrl}
                      alt="Thumbnail Preview"
                      fill
                      className="rounded-xl object-cover p-2"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl pointer-events-none">
                      <span className="text-white font-medium bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                        Change Image
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                      <ArrowUpFromLine size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200">
                      Upload Thumbnail
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Click or Drag & Drop your high-res image here
                    </p>
                    <p className="mt-2 text-xs font-medium text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-md">
                      PNG • JPG • WEBP (Max 2MB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 4: Submit Area */}
          <div className="relative rounded-2xl border border-violet-500/30 bg-violet-900/10 p-6 md:p-8 overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-violet-500/10 blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Ready to Submit?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                  Every prompt goes through an admin review before being
                  published.
                </p>
                <div className="mt-4 inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-xs font-semibold text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                  Status: Pending Review
                </div>
              </div>

              <button
                type="submit"
                disabled={reachedLimit || isSubmitting}
                className="h-14 min-w-60 rounded-xl bg-violet-600 font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:bg-violet-500 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSubmitting ? "Submitting Template..." : "Submit for Review"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
