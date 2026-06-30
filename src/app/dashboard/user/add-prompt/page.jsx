"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Input,
  TextArea,
  Select,
  Label,
  ListBox,
  RadioGroup,
  Radio,
  Button,
} from "@heroui/react";
import { ArrowUpFromLine, CirclePlus } from "@gravity-ui/icons";
import { addPrompt } from "@/lib/actions/add-prompts";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";

export default function AddPromptPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State - আপনার ব্যাকএন্ড ডাটার সাথে মিলিয়ে আপডেট করা হয়েছে
  const [formData, setFormData] = useState({
    promptTitle: "",
    fullDescription: "",
    promptContent: "",
    usageInstructions: "", // নতুন যোগ করা হয়েছে
    category: "",
    aiToolName: "",
    difficultyLevel: "Beginner",
    visibility: "public",
    tags: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for composable Select
  const handleSelectChange = (name, keys) => {
    // const selectedValue = Array.from(keys)[0] || "";
    const selectedValue =
      keys instanceof Set ? keys.values().next().value : keys;
    setFormData((prev) => ({ ...prev, [name]: selectedValue }));
  };

  // ImageBB Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imageFormData,
        },
      );
      const data = await res.json();

      if (data.success) {
        setThumbnailUrl(data.data.url);
      } else {
        console.error("Image upload failed:", data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      image: thumbnailUrl, // ব্যাকএন্ডের 'image' ফিল্ডের সাথে মেলানো হয়েছে
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      copyCount: 0,
      status: "pending",
    };

    try {
      console.log("Submitting Payload:", payload);
      const res = await addPrompt(payload);

      if (res.insertedId) {
        toast.success("Prompt Added Successfully");
        e.target.reset();
        window.location.reload();
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared dark mode styling for Hero UI composable elements
  const labelClass =
    "text-gray-400 text-xs font-semibold uppercase tracking-wider pb-1";
  const fieldWrapperClass = "w-full flex flex-col gap-1";
  const inputClass =
    "bg-[#0d1117] border border-[#30363d] hover:border-gray-500 transition-colors shadow-none rounded-lg text-gray-200 placeholder:text-gray-600 px-3 py-2";
  const selectTriggerClass =
    "bg-[#0d1117] border border-[#30363d] hover:border-gray-500 transition-colors rounded-lg text-gray-200 min-h-[40px] px-3 shadow-sm";
  const selectPopoverClass =
    "bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl";

  return (
    <div className="min-h-screen p-2 py-15 lg:py-0 font-sans ">
      <Toaster></Toaster>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">
            Create New Prompt Template
          </h1>
          <p className="text-gray-400 text-sm">
            Fill in details to submit a prompt to the community catalog.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 md:p-8 shadow-xl">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {/* Title */}
            <TextField isRequired className={fieldWrapperClass}>
              <Label className={labelClass}>Prompt Title</Label>
              <Input
                name="promptTitle" // আপডেট করা হয়েছে
                value={formData.promptTitle}
                onChange={handleInputChange}
                placeholder="e.g. Optimized React Tailwind Card Builder"
                className={inputClass}
              />
            </TextField>

            {/* Description */}
            <TextField isRequired className={fieldWrapperClass}>
              <Label className={labelClass}>Short Description</Label>
              <Input
                name="fullDescription" // আপডেট করা হয়েছে
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Explain what this prompt accomplishes in 1-2 sentences"
                className={inputClass}
              />
            </TextField>

            {/* Content Template */}
            <TextField isRequired className={fieldWrapperClass}>
              <Label className={labelClass}>Prompt Content Template</Label>
              <TextArea
                name="promptContent" // আপডেট করা হয়েছে
                value={formData.promptContent}
                onChange={handleInputChange}
                placeholder="Write the full, detailed prompt instructions."
                className={inputClass}
                rows={4}
              />
            </TextField>

            {/* Usage Instructions (New Field) */}
            <TextField isRequired className={fieldWrapperClass}>
              <Label className={labelClass}>Usage Instructions</Label>
              <TextArea
                name="usageInstructions" // ডাটাবেসের সাথে মেলানো হয়েছে
                value={formData.usageInstructions}
                onChange={handleInputChange}
                placeholder="e.g. Paste meeting transcript before generating."
                className={inputClass}
                rows={2}
              />
            </TextField>

            {/* 2-Column Grid for Composable Selects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2">
              {/* Category Select */}
              <Select
                className={fieldWrapperClass}
                placeholder="Select category"
                // selectedKeys={formData.category ? [formData.category] : []}
                selectedKeys={
                  formData.category ? new Set([formData.category]) : new Set([])
                }
                onSelectionChange={(keys) =>
                  handleSelectChange("category", keys)
                }
              >
                <Label className={labelClass}>Category *</Label>
                <Select.Trigger className={selectTriggerClass}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={selectPopoverClass}>
                  <ListBox className="text-gray-200">
                    <ListBox.Item
                      id="System Assistant"
                      textValue="System Assistant"
                    >
                      System Assistant <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Coding" textValue="Coding">
                      Coding <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Marketing" textValue="Marketing">
                      Marketing <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* AI Tool Name Select */}
              <Select
                className={fieldWrapperClass}
                placeholder="Select AI Tool"
                // selectedKeys={formData.aiToolName ? [formData.aiToolName] : []}
                selectedKeys={
                  formData.aiToolName
                    ? new Set([formData.aiToolName])
                    : new Set([])
                }
                onSelectionChange={
                  (keys) => handleSelectChange("aiToolName", keys) // 'aiEngine' থেকে 'aiToolName' করা হয়েছে
                }
              >
                <Label className={labelClass}>AI Tool *</Label>
                <Select.Trigger className={selectTriggerClass}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={selectPopoverClass}>
                  <ListBox className="text-gray-200">
                    <ListBox.Item id="ChatGPT" textValue="ChatGPT">
                      ChatGPT <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Claude" textValue="Claude">
                      Claude <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Gemini" textValue="Gemini">
                      Gemini <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Midjourney" textValue="Midjourney">
                      Midjourney <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* 2-Column Grid for Difficulty & Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start mt-2">
              {/* Difficulty Level Select */}
              <Select
                className={fieldWrapperClass}
                placeholder="Select Difficulty"
                selectedKeys={
                  formData.difficultyLevel ? [formData.difficultyLevel] : []
                }
                onSelectionChange={
                  (keys) => handleSelectChange("difficultyLevel", keys) // 'difficulty' থেকে 'difficultyLevel' করা হয়েছে
                }
              >
                <Label className={labelClass}>Difficulty Level *</Label>
                <Select.Trigger className={selectTriggerClass}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className={selectPopoverClass}>
                  <ListBox className="text-gray-200">
                    <ListBox.Item id="Beginner" textValue="Beginner">
                      Beginner <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Intermediate" textValue="Intermediate">
                      Intermediate <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Advanced" textValue="Advanced">
                      Advanced <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Visibility Radio Group */}
              <div className="flex flex-col gap-2">
                <span className={labelClass}>Visibility Status *</span>
                <RadioGroup
                  orientation="horizontal"
                  name="visibility"
                  value={formData.visibility}
                  onValueChange={(val) =>
                    setFormData((prev) => ({ ...prev, visibility: val }))
                  }
                  classNames={{ wrapper: "gap-6 mt-1" }}
                >
                  <Radio
                    value="public"
                    classNames={{
                      label: "text-gray-300 text-sm",
                      control: "bg-purple-600",
                    }}
                  >
                    Public (Free access)
                  </Radio>
                  <Radio
                    value="private"
                    classNames={{
                      label: "text-gray-300 text-sm",
                      control: "bg-purple-600",
                    }}
                  >
                    Private (Premium lock)
                  </Radio>
                </RadioGroup>
              </div>
            </div>

            {/* Tags */}
            <TextField className={fieldWrapperClass}>
              <Label className={labelClass}>Tags (Comma-Separated)</Label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g. Meetings, Productivity, Notes"
                className={inputClass}
              />
            </TextField>

            {/* Thumbnail Upload */}
            <div className="flex flex-col gap-2 w-full mt-2">
              <span className={labelClass}>Thumbnail Image Upload</span>
              <div className="relative border-2 border-dashed border-[#30363d] rounded-xl bg-[#0d1117] hover:bg-[#121820] transition-colors p-8 flex flex-col items-center justify-center text-center">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploadingImage}
                />

                {uploadingImage ? (
                  <p className="text-sm text-gray-400 font-medium">
                    Uploading to ImgBB...
                  </p>
                ) : thumbnailUrl ? (
                  <div className="flex flex-col items-center gap-2">
                    <Image
                      height={300}
                      width={300}
                      src={thumbnailUrl}
                      alt="Thumbnail preview"
                      className="h-24 rounded-md object-cover"
                    />
                    <p className="text-xs text-purple-400">
                      Image Uploaded Successfully
                    </p>
                  </div>
                ) : (
                  <>
                    <ArrowUpFromLine className="w-6 h-6 text-gray-400 mb-3" />
                    <p className="text-sm text-white font-semibold mb-1">
                      Click to choose a thumbnail image file
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports PNG, JPG, or WEBP (Max 2MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium py-6 rounded-xl mt-4 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20 transition-all"
              disabled={isSubmitting || uploadingImage}
            >
              <CirclePlus className="w-5 h-5" />
              {isSubmitting ? "Submitting..." : "Submit Prompt for Review"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
