"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  Radio,
  RadioGroup,
  Button,
  FieldError,
} from "@heroui/react";

import { ChevronDown } from "@gravity-ui/icons";
import { ArrowUpFromLine } from "lucide-react";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";
import { addPrompt } from "@/lib/api/prompts";

import FormHeader from "./FormHeader";
import FreePlanAlert from "./FreePlanAlert";

/* ==========================================
            CONSTANTS
========================================== */

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

/* ==========================================
              COMPONENT
========================================== */

export default function AddPromptForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

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

  /* ==========================================
          COMMON CSS CLASSES
  ========================================== */

  const fieldWrapperClass = "w-full";
  const labelClass =
    "mb-2 text-xs font-semibold uppercase tracking-wider text-default-400";
  const inputClass =
    "rounded-xl border border-default-300 bg-background transition-all";
  const selectTriggerClass =
    "h-12 rounded-xl border border-default-300 bg-background px-4";
  const selectPopoverClass =
    "rounded-xl border border-default-200 bg-background p-2 shadow-xl";

  /* ==========================================
          INPUT CHANGE
  ========================================== */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ==========================================
          SELECT CHANGE
  ========================================== */

  const handleSelectChange = (field, keys) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Array.from(keys)[0],
    }));
  };

  /* ==========================================
          IMAGE CHANGE
  ========================================== */

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setThumbnailUrl(URL.createObjectURL(file));
  };

  /* ==========================================
          VALIDATION
  ========================================== */

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

  /* ==========================================
        IMAGE UPLOAD
  ========================================== */

  const uploadImage = async () => {
    if (!imageFile) return "";

    const form = new FormData();
    form.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: form,
      },
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed.");
    }

    return data.data.url;
  };

  /* ==========================================
        HANDLE SUBMIT
  ========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic check for authenticated user
    if (!user) {
      toast.error("Please log in to submit a prompt.");
      return;
    }

    // 2. Run validations
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      // 3. Upload thumbnail if provided
      const uploadedImageUrl = await uploadImage();

      // 4. Construct Payload
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

      // 5. Send to API
      const result = await addPrompt(payload);
      console.log(result);

      // 6. Success handling
      toast.success("Prompt submitted for review successfully!");

      // Redirect user (update path according to your app structure)
      router.push("/dashboard/creator/my-prompts");
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.message || "Failed to submit prompt.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <FormHeader />

      <div className="mt-8">
        <FreePlanAlert currentCount={1} limit={3} plan="free" />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-lg md:p-10">
        <Form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
          {/* ======================================
            Prompt Title
    ====================================== */}
          <TextField isRequired className={fieldWrapperClass}>
            <Label className={labelClass}>Prompt Title</Label>
            <Input
              name="promptTitle"
              value={formData.promptTitle}
              onChange={handleInputChange}
              placeholder="e.g. React Landing Page Generator"
              className={inputClass}
            />
            <FieldError />
          </TextField>

          {/* ======================================
          Short Description
    ====================================== */}
          <TextField isRequired className={fieldWrapperClass}>
            <Label className={labelClass}>Short Description</Label>
            <TextArea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleInputChange}
              placeholder="Briefly explain what this prompt does..."
              rows={3}
              className={`${inputClass} min-h-28`}
            />
            <FieldError />
          </TextField>

          {/* ======================================
            Prompt Content
    ====================================== */}
          <TextField isRequired className={fieldWrapperClass}>
            <Label className={labelClass}>Prompt Content</Label>
            <TextArea
              name="promptContent"
              value={formData.promptContent}
              onChange={handleInputChange}
              placeholder="Paste your AI prompt template..."
              rows={12}
              className={`${inputClass} min-h-72`}
            />
            <FieldError />
          </TextField>

          {/* ======================================
          Category & AI Tool
    ====================================== */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Category */}
            <Select
              className={fieldWrapperClass}
              placeholder="Select Category"
              selectedKeys={
                formData.category ? new Set([formData.category]) : new Set([])
              }
              onSelectionChange={(keys) => handleSelectChange("category", keys)}
            >
              <Label className={labelClass}>Category</Label>
              <Select.Trigger className={selectTriggerClass}>
                <div className="flex items-center justify-between gap-3">
                  <Select.Value placeholder="Select Category" />
                  <ChevronDown />
                </div>
              </Select.Trigger>

              <Select.Popover className={selectPopoverClass}>
                <ListBox>
                  {categories.map((category) => (
                    <ListBox.Item
                      key={category}
                      id={category}
                      className="rounded-xl px-3 py-2.5 text-sm transition hover:bg-violet-50 hover:text-violet-600"
                    >
                      {category}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* AI Tool */}
            <Select
              className={fieldWrapperClass}
              placeholder="Select AI Tool"
              selectedKeys={
                formData.aiToolName
                  ? new Set([formData.aiToolName])
                  : new Set([])
              }
              onSelectionChange={(keys) =>
                handleSelectChange("aiToolName", keys)
              }
            >
              <Label className={labelClass}>AI Tool</Label>
              <Select.Trigger className={selectTriggerClass}>
                <div className="flex items-center justify-between gap-3">
                  <Select.Value placeholder="Select AI Tool" />
                  <ChevronDown />
                </div>
              </Select.Trigger>

              <Select.Popover className={selectPopoverClass}>
                <ListBox>
                  {aiTools.map((tool) => (
                    <ListBox.Item
                      key={tool}
                      id={tool}
                      className="rounded-xl px-3 py-2.5 text-sm transition hover:bg-violet-50 hover:text-violet-600"
                    >
                      {tool}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* ======================================
            Difficulty & Visibility
    ====================================== */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Difficulty */}
            <Select
              className={fieldWrapperClass}
              placeholder="Select Difficulty"
              selectedKeys={
                formData.difficultyLevel
                  ? new Set([formData.difficultyLevel])
                  : new Set([])
              }
              onSelectionChange={(keys) =>
                handleSelectChange("difficultyLevel", keys)
              }
            >
              <Label className={labelClass}>Difficulty Level</Label>
              <Select.Trigger className={selectTriggerClass}>
                <div className="flex items-center justify-between gap-3">
                  <Select.Value placeholder="Select Difficulty" />
                  <ChevronDown />
                </div>
              </Select.Trigger>

              <Select.Popover className={selectPopoverClass}>
                <ListBox>
                  {difficultyLevels.map((level) => (
                    <ListBox.Item
                      key={level}
                      id={level}
                      className="rounded-xl px-3 py-2.5 text-sm transition hover:bg-violet-50 hover:text-violet-600"
                    >
                      {level}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Visibility */}
            <RadioGroup
              orientation="horizontal"
              value={formData.visibility}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  visibility: value,
                }))
              }
              className="mt-2"
            >
              <Label className={labelClass}>Visibility Status</Label>
              <div className="flex flex-wrap items-start gap-8">
                {/* Public */}
                <Radio value="public">
                  <Radio.Content className="flex cursor-pointer items-center gap-3">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <div className="leading-5">
                      <span className="font-medium text-default-300">
                        Public
                      </span>
                      <span className="text-default-400"> (Free Access)</span>
                    </div>
                  </Radio.Content>
                </Radio>

                {/* Private */}
                <Radio value="private">
                  <Radio.Content className="flex cursor-pointer items-center gap-3">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <div className="leading-5">
                      <span className="font-medium text-default-300">
                        Private
                      </span>
                      <span className="text-default-400"> (Premium Only)</span>
                    </div>
                  </Radio.Content>
                </Radio>
              </div>
              <FieldError />
            </RadioGroup>
          </div>

          {/* ======================================
          Usage Instructions
    ====================================== */}
          <TextField className={fieldWrapperClass}>
            <Label className={labelClass}>Usage Instructions</Label>
            <TextArea
              name="usageInstructions"
              value={formData.usageInstructions}
              onChange={handleInputChange}
              placeholder="Explain how users should use this prompt for the best results..."
              rows={5}
              className={`${inputClass} min-h-36`}
            />
            <FieldError />
          </TextField>

          {/* ======================================
                  Tags
    ====================================== */}
          <TextField className={fieldWrapperClass}>
            <Label className={labelClass}>Tags</Label>
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="react, nextjs, tailwind, ai, prompt"
              className={inputClass}
            />
            <p className="mt-2 text-xs text-default-400">
              Separate each tag using commas (,).
            </p>
            <FieldError />
          </TextField>

          {/* ======================================
            Thumbnail Upload
    ====================================== */}
          <div className="flex flex-col gap-3">
            <span className={labelClass}>Thumbnail Image</span>
            <div className="relative flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-default-300 bg-default-50 transition-all hover:border-violet-500 hover:bg-violet-50/40">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              {thumbnailUrl ? (
                <div className="relative h-64 w-full">
                  <Image
                    src={thumbnailUrl}
                    alt="Thumbnail Preview"
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
              ) : (
                <>
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <ArrowUpFromLine size={30} />
                  </div>
                  <h3 className="text-lg font-semibold text-default-700">
                    Upload Thumbnail
                  </h3>
                  <p className="mt-2 text-sm text-default-500">
                    Click or Drag & Drop your image here
                  </p>
                  <p className="mt-1 text-xs text-default-400">
                    PNG • JPG • WEBP (Max 2MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* ======================================
            Submit Section
    ====================================== */}
          <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-default-700">
                  Ready to Submit?
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-default-500">
                  Every prompt goes through an admin review before being
                  published on the PromptVerse marketplace. This helps us
                  maintain high-quality prompt templates for everyone.
                </p>
                <div className="mt-4 inline-flex items-center rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                  ● Status: Pending Review
                </div>
              </div>

              <Button
                type="submit"
                isLoading={isSubmitting}
                className="h-13 min-w-60 rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl data-[hover=true]:from-violet-500 data-[hover=true]:to-fuchsia-500"
              >
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
