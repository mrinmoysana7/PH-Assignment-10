"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { ChevronDown } from "@gravity-ui/icons";
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
  FieldError,
} from "@heroui/react";
import { ArrowUpFromLine, CirclePlus, Code, Sparkles } from "@gravity-ui/icons";
import { addPrompt } from "@/lib/actions/add-prompts";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddPromptPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [formData, setFormData] = useState({
    promptTitle: "",
    fullDescription: "",
    promptContent: "",
    usageInstructions: "",
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

  const handleSelectChange = (name, keys) => {
    const selectedValue =
      keys instanceof Set ? keys.values().next().value : keys;
    setFormData((prev) => ({ ...prev, [name]: selectedValue }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: imageFormData },
      );
      const data = await res.json();
      if (data.success) {
        setThumbnailUrl(data.data.url);
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
    // const payload = {
    //   ...formData,
    //   image: thumbnailUrl,
    //   tags: formData.tags.split(",").map((tag) => tag.trim()),
    //   copyCount: 0,
    //   status: "pending",
    // };

    const payload = {
      ...formData,

      image: thumbnailUrl,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      copyCount: 0,
      reviews: 0,
      rating: 0,
      status: "pending",
      authorId: user?.id,
      authorName: user?.name,
      authorEmail: user?.email,
      authorImage: user?.image || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      const res = await addPrompt(payload);
      if (res.insertedId) {
        toast.success("Prompt Added Successfully");
        // window.location.reload();
        router.push("/dashboard/user/my-prompts");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Light Mode Styles
  const labelClass =
    "mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500";
  const fieldWrapperClass = "flex w-full flex-col gap-2";
  const inputClass = `
h-14
rounded-2xl
border
border-gray-200
bg-white
px-4
text-gray-900
placeholder:text-gray-400
shadow-md
transition-all
duration-300
hover:border-violet-300
focus:border-violet-500
focus:ring-4
focus:ring-violet-100
`;
  const selectTriggerClass = `
h-14
rounded-2xl
border
border-gray-200
bg-white
px-4
shadow-md
transition-all
duration-300
hover:border-violet-300
focus:border-violet-500
focus:ring-4
focus:ring-violet-100
`;
  const selectPopoverClass = `
rounded-2xl
border
border-gray-200
bg-white
p-2
shadow-2xl
`;

  const categories = [
    "System Assistant",
    "Coding",
    "Marketing",
    "Writing",
    "Education",
    "Business",
  ];

  const aiTools = [
    "ChatGPT",
    "Claude",
    "Gemini",
    "Midjourney",
    "Stable Diffusion",
    "Perplexity",
    "Grok",
    "Copilot",
    "Cursor AI",
    "Other",
  ];

  const difficultyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:py-12 font-sans text-gray-900">
      <Toaster />
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2 text-gray-900 tracking-tight">
            Create New Prompt
          </h1>
          <p className="text-gray-500">
            Submit your template to the community catalog.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm">
          <Form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <TextField isRequired className={fieldWrapperClass}>
              <Label className={labelClass}>Prompt Title</Label>
              <Input
                name="promptTitle"
                value={formData.promptTitle}
                onChange={handleInputChange}
                placeholder="e.g. React Tailwind Builder"
                className={inputClass}
              />
            </TextField>

            <TextField isRequired className={fieldWrapperClass}>
              <Label className={labelClass}>Short Description</Label>
              <Input
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleInputChange}
                placeholder="Briefly describe the prompt..."
                className={inputClass}
              />
            </TextField>

            <TextField isRequired className={fieldWrapperClass}>
              <Label className={labelClass}>Prompt Content</Label>
              <TextArea
                name="promptContent"
                value={formData.promptContent}
                onChange={handleInputChange}
                placeholder="Paste instructions here..."
                className={`${inputClass} min-h-30`}
                rows={4}
              />
            </TextField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <Select
                className={fieldWrapperClass}
                placeholder="All Categories"
                selectedKeys={
                  formData.category ? new Set([formData.category]) : new Set([])
                }
                onSelectionChange={(keys) =>
                  handleSelectChange("category", keys)
                }
              >
                <Label className={labelClass}>Category</Label>

                <Select.Trigger className={selectTriggerClass}>
                  <div className="flex items-center justify-between gap-3">
                    <Select.Value placeholder="All Categories" />
                    <ChevronDown />
                  </div>
                </Select.Trigger>

                <Select.Popover className={selectPopoverClass}>
                  <ListBox>
                    {categories.map((item) => (
                      <ListBox.Item
                        key={item}
                        id={item}
                        className="
    rounded-xl
    px-3
    py-2.5
    text-sm
    transition
    hover:bg-violet-50
    hover:text-violet-600
  "
                      >
                        {item}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* AI Tool */}
              <Select
                className={fieldWrapperClass}
                placeholder="All AI Tools"
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
                    <Select.Value placeholder="All AI Tools" />
                    <ChevronDown />
                  </div>
                </Select.Trigger>

                <Select.Popover className={selectPopoverClass}>
                  <ListBox>
                    {aiTools.map((tool) => (
                      <ListBox.Item
                        key={tool}
                        id={tool}
                        className="
    rounded-xl
    px-3
    py-2.5
    text-sm
    transition
    hover:bg-violet-50
    hover:text-violet-600
  "
                      >
                        {tool}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Difficulty Level */}
              <Select
                className={fieldWrapperClass}
                placeholder="All Levels"
                selectedKeys={
                  formData.difficultyLevel
                    ? new Set([formData.difficultyLevel])
                    : new Set([])
                }
                onSelectionChange={(keys) =>
                  handleSelectChange("difficultyLevel", keys)
                }
              >
                <Label className={labelClass}>Difficulty</Label>

                <Select.Trigger className={selectTriggerClass}>
                  <div className="flex items-center justify-between gap-3">
                    <Select.Value placeholder="All Levels" />
                    <ChevronDown />
                  </div>
                </Select.Trigger>

                <Select.Popover className={selectPopoverClass}>
                  <ListBox>
                    {difficultyLevels.map((level) => (
                      <ListBox.Item
                        key={level}
                        id={level}
                        className="
    rounded-xl
    px-3
    py-2.5
    text-sm
    transition
    hover:bg-violet-50
    hover:text-violet-600
  "
                      >
                        {level}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Visibility Status */}

            <RadioGroup
              orientation="horizontal"
              value={formData.visibility}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  visibility: value,
                }))
              }
              className="mt-3"
            >
              <Label className="mb-4 text-xs font-semibold uppercase tracking-wider text-default-400">
                Visibility Status *
              </Label>

              <div className="flex items-start gap-10">
                {/* Public */}

                <Radio value="public">
                  <Radio.Content className="flex items-center gap-3 cursor-pointer">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>

                    <div className="leading-5">
                      <span className="font-medium text-default-400">
                        Public
                      </span>

                      <span className="text-default-400"> (Free access)</span>
                    </div>
                  </Radio.Content>
                </Radio>

                {/* Private */}

                <Radio value="private">
                  <Radio.Content className="flex items-center gap-3 cursor-pointer">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>

                    <div className="leading-5">
                      <span className="font-medium text-default-400">
                        Private
                      </span>

                      <span className="text-default-400"> (Premium lock)</span>
                    </div>
                  </Radio.Content>
                </Radio>
              </div>

              <FieldError />
            </RadioGroup>

            {/* Thumbnail Upload */}
            <div className="flex flex-col gap-2">
              <span className={labelClass}>Thumbnail</span>
              <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="absolute opacity-0 cursor-pointer w-full h-24"
                />
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    width={100}
                    height={100}
                    alt="preview"
                    className="rounded"
                  />
                ) : (
                  <>
                    <ArrowUpFromLine className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-600">
                      Click to upload image
                    </p>
                  </>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-md transition-all mt-4"
            >
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
