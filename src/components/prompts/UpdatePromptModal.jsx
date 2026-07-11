"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  Button,
  Input,
  RadioGroup,
  Radio,
  TextArea,
  Label,
} from "@heroui/react";

import { Pencil, Save, X } from "lucide-react";

import { updatePrompt } from "@/lib/api/prompts";

const categories = [
  "Writing",
  "Programming",
  "Marketing",
  "Business",
  "Education",
  "Productivity",
  "Design",
  "AI",
];

const aiTools = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Copilot",
  "Perplexity",
  "Midjourney",
];

const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

export default function UpdatePromptModal({ prompt, onUpdated }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});

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
    image: "",
  });

  const handleOpen = () => {
    setFormData({
      promptTitle: prompt.promptTitle || "",
      fullDescription: prompt.fullDescription || "",
      promptContent: prompt.promptContent || "",
      usageInstructions: prompt.usageInstructions || "",
      category: prompt.category || "",
      aiToolName: prompt.aiToolName || "",
      difficultyLevel: prompt.difficultyLevel || "",
      visibility: prompt.visibility || "public",
      tags: Array.isArray(prompt.tags) ? prompt.tags.join(", ") : "",
      image: prompt.image || "",
    });

    setOpen(true);
  };

  const handleClose = () => {
    if (saving) return;

    setOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.promptTitle.trim()) {
      newErrors.promptTitle = "Prompt title is required.";
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = "Prompt description is required.";
    }

    if (!formData.promptContent.trim()) {
      newErrors.promptContent = "Prompt content is required.";
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
    }

    if (!formData.aiToolName) {
      newErrors.aiToolName = "AI Engine is required.";
    }

    if (!formData.difficultyLevel) {
      newErrors.difficultyLevel = "Difficulty is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Please fill all required fields.");

      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const result = await updatePrompt(prompt._id, payload);

      if (!result.success) {
        toast.error(result.message || "Update failed.");

        return;
      }

      toast.success("Prompt updated successfully.");

      setOpen(false);

      router.refresh();

      onUpdated?.();
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const labelClass =
    "mb-2 text-md font-semibold uppercase tracking-[0.12em] text-gray-500";

  const inputClass =
    "border border-gray-300 rounded-xl px-5 pt-1.5 h-30 shadow hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none";

  return (
    <>
      {/* Trigger Button */}

      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="secondary"
        title="Update Prompt"
        onPress={handleOpen}
        className="
          bg-zinc-900/50
          hover:bg-violet-600 
          border
          border-violet-600
          transition-all
          duration-300
          p-2
          rounded-lg
          text-white
        "
      >
        <Pencil size={16} />
      </Button>

      {/* Modal */}

      {open && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
          {/* Backdrop */}

          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Card */}

          <div
            className="
              relative
              z-10
              w-full
              max-w-2xl
              mx-4
              overflow-hidden
              rounded-3xl
              border
              border-gray-200
              bg-white
           backdrop-blur-xl
              shadow-[0_30px_80px_rgba(0,0,0,0.25)]
            "
          >
            {/* Header */}

            <div className="flex items-start justify-between border-b border-gray-200 px-8 py-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Update Prompt Template
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Edit your prompt template and save the latest version.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  text-gray-500
                  transition
                  hover:bg-gray-100
                  hover:text-gray-900
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}

            <div className="max-h-[72vh] overflow-y-auto p-8 space-y-7">
              {/* Prompt Title */}
              <div className="flex flex-col">
                <Label className={labelClass}>
                  Prompt Title
                  <span className="text-danger ml-1">*</span>
                </Label>
                <Input
                  placeholder="Enter prompt title..."
                  value={formData.promptTitle}
                  onChange={(e) => handleChange("promptTitle", e.target.value)}
                  isRequired
                  isInvalid={!!errors.promptTitle}
                  errorMessage={errors.promptTitle}
                  radius="lg"
                  variant="bordered"
                  className="h-12 border border-gray-300 px-5 rounded-xl shadow hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
                />
              </div>

              {/* Prompt Description */}

              <div className="flex flex-col">
                <Label className={labelClass}>
                  Prompt Description
                  <span className="text-danger ml-1">*</span>
                </Label>

                <Input
                  value={formData.fullDescription}
                  placeholder="Describe your prompt..."
                  onChange={(e) =>
                    handleChange("fullDescription", e.target.value)
                  }
                  minRows={4}
                  isRequired
                  isInvalid={!!errors.fullDescription}
                  errorMessage={errors.fullDescription}
                  radius="lg"
                  variant="bordered"
                  className="h-12 border border-gray-300 px-5 rounded-xl shadow  hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
                />
              </div>

              {/* Prompt Template */}

              <div className="flex flex-col">
                <Label className={labelClass}>
                  Prompt Content Template
                  <span className="text-danger ml-1">*</span>
                </Label>

                <TextArea
                  value={formData.promptContent}
                  placeholder="Write your AI prompt template..."
                  onChange={(e) =>
                    handleChange("promptContent", e.target.value)
                  }
                  minRows={10}
                  isRequired
                  isInvalid={!!errors.promptContent}
                  errorMessage={errors.promptContent}
                  radius="lg"
                  variant="bordered"
                  className={inputClass}
                />
              </div>

              {/* Category & AI Tool */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}

                <div className="space-y-2">
                  <label className={labelClass}>
                    Category
                    <span className="text-danger ml-1">*</span>
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="
                      h-12
                      mt-1
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      text-md
                      font-semibold
                      text-gray-800
                      shadow
                      outline-none
                      transition-all
                      focus:border-violet-500
                      focus:ring-4
                      focus:ring-violet-100
                    "
                  >
                    <option value="">Select Category</option>

                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <p className="text-sm text-danger">{errors.category}</p>
                  )}
                </div>

                {/* AI Tool */}

                <div className="space-y-2">
                  <label className={labelClass}>
                    AI Engine
                    <span className="text-danger ml-1">*</span>
                  </label>

                  <select
                    value={formData.aiToolName}
                    onChange={(e) => handleChange("aiToolName", e.target.value)}
                    className="
                      h-12
                      mt-1
                      w-full
                      border
                      border-gray-300
                      bg-white
                      px-4
                      text-md
                      font-semibold
                      rounded-xl
                      text-gray-800
                      shadow
                      outline-none
                      transition-all
                      focus:border-violet-500
                      focus:ring-4
                      focus:ring-violet-100
                    "
                  >
                    <option value="">Select AI Engine</option>

                    {aiTools.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.aiToolName && (
                    <p className="text-sm text-danger">{errors.aiToolName}</p>
                  )}
                </div>
              </div>

              {/* Difficulty & Visibility */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Difficulty */}

                <div className="space-y-2">
                  <label className={labelClass}>
                    Difficulty
                    <span className="text-danger ml-1">*</span>
                  </label>

                  <select
                    value={formData.difficultyLevel}
                    onChange={(e) =>
                      handleChange("difficultyLevel", e.target.value)
                    }
                    className="
                      h-12
                      mt-1
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      bg-white
                      px-4
                      text-md
                      font-semibold
                      text-gray-800
                      shadow
                      outline-none
                      transition-all
                      focus:border-violet-500
                      focus:ring-4
                      focus:ring-violet-100
                    "
                  >
                    <option value="">Select Difficulty</option>

                    {difficultyLevels.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {errors.difficultyLevel && (
                    <p className="text-sm text-danger">
                      {errors.difficultyLevel}
                    </p>
                  )}
                </div>

                {/* Visibility */}

                <div>
                  <span className={labelClass}>
                    Visibility
                    <span className="text-danger ml-1">*</span>
                  </span>
                  <RadioGroup
                    defaultValue="public"
                    orientation="horizontal"
                    value={formData.visibility}
                    onChange={(value) => handleChange("visibility", value)} // Updated to v3 'onChange'
                    className="mt-1"
                  >
                    <Radio value="public">
                      <Radio.Content className="cursor-pointer">
                        {/* Let HeroUI handle the sizing and borders automatically */}
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        Public
                      </Radio.Content>
                    </Radio>

                    <Radio value="private">
                      <Radio.Content className="cursor-pointer">
                        <Radio.Control>
                          <Radio.Indicator />
                        </Radio.Control>
                        Private (Premium)
                      </Radio.Content>
                    </Radio>
                  </RadioGroup>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-21">
                <div className="flex flex-col">
                  <Label className={labelClass}>
                    Tags
                    <span className="text-danger ml-1">*</span>
                  </Label>

                  <Input
                    placeholder="e.g. marketing, copywriting, seo"
                    value={formData.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                    radius="lg"
                    variant="bordered"
                    description="Separate multiple tags with commas (,)"
                    className="h-10 border w-full border-gray-300 px-5 rounded-xl shadow hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
                  />
                </div>

                {/* Thumbnail URL */}
                <div className="flex flex-col">
                  <Label className={labelClass}>
                    Thumbnail Url
                    <span className="text-danger ml-1">*</span>
                  </Label>

                  <Input
                    label="Thumbnail URL"
                    labelPlacement="outside"
                    placeholder="https://example.com/image.png"
                    value={formData.image}
                    onValueChange={(value) => handleChange("image", value)}
                    radius="lg"
                    variant="bordered"
                    className="h-10 border w-full border-gray-300 px-5 rounded-xl shadow hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}

            <div className="border-t border-gray-200 bg-gray-50 px-8 py-5">
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="flat"
                  onPress={handleClose}
                  isDisabled={saving}
                  className="min-w-28"
                >
                  Cancel
                </Button>

                <Button
                  color="secondary"
                  isLoading={saving}
                  startContent={
                    !saving && <Save size={16} className="w-4 h-4" />
                  }
                  onPress={handleSubmit}
                  className="min-w-40"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
