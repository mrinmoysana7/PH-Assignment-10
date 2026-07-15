// "use client";

// import { useState } from "react";

// import { useRouter } from "next/navigation";

// import toast from "react-hot-toast";

// import {
//   Button,
//   Input,
//   RadioGroup,
//   Radio,
//   TextArea,
//   Label,
// } from "@heroui/react";

// import { Pencil, Save, X } from "lucide-react";

// import { updatePrompt } from "@/lib/api/prompts";

// const categories = [
//   "Writing",
//   "Programming",
//   "Marketing",
//   "Business",
//   "Education",
//   "Productivity",
//   "Design",
//   "AI",
// ];

// const aiTools = [
//   "ChatGPT",
//   "Claude",
//   "Gemini",
//   "Copilot",
//   "Perplexity",
//   "Midjourney",
// ];

// const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

// export default function UpdatePromptModal({ prompt, onUpdated }) {
//   const router = useRouter();

//   const [open, setOpen] = useState(false);

//   const [saving, setSaving] = useState(false);

//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     promptTitle: "",
//     fullDescription: "",
//     promptContent: "",
//     usageInstructions: "",
//     category: "",
//     aiToolName: "",
//     difficultyLevel: "",
//     visibility: "public",
//     tags: "",
//     image: "",
//   });

//   const handleOpen = () => {
//     setFormData({
//       promptTitle: prompt.promptTitle || "",
//       fullDescription: prompt.fullDescription || "",
//       promptContent: prompt.promptContent || "",
//       usageInstructions: prompt.usageInstructions || "",
//       category: prompt.category || "",
//       aiToolName: prompt.aiToolName || "",
//       difficultyLevel: prompt.difficultyLevel || "",
//       visibility: prompt.visibility || "public",
//       tags: Array.isArray(prompt.tags) ? prompt.tags.join(", ") : "",
//       image: prompt.image || "",
//     });

//     setOpen(true);
//   };

//   const handleClose = () => {
//     if (saving) return;

//     setOpen(false);
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [field]: "",
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.promptTitle.trim()) {
//       newErrors.promptTitle = "Prompt title is required.";
//     }

//     if (!formData.fullDescription.trim()) {
//       newErrors.fullDescription = "Prompt description is required.";
//     }

//     if (!formData.promptContent.trim()) {
//       newErrors.promptContent = "Prompt content is required.";
//     }

//     if (!formData.category) {
//       newErrors.category = "Category is required.";
//     }

//     if (!formData.aiToolName) {
//       newErrors.aiToolName = "AI Engine is required.";
//     }

//     if (!formData.difficultyLevel) {
//       newErrors.difficultyLevel = "Difficulty is required.";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) {
//       toast.error("Please fill all required fields.");

//       return;
//     }

//     try {
//       setSaving(true);

//       const payload = {
//         ...formData,
//         tags: formData.tags
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter(Boolean),
//       };

//       const result = await updatePrompt(prompt._id, payload);

//       if (!result.success) {
//         toast.error(result.message || "Update failed.");

//         return;
//       }

//       toast.success("Prompt updated successfully.");

//       setOpen(false);

//       router.refresh();

//       onUpdated?.();
//     } catch (err) {
//       console.error(err);

//       toast.error("Something went wrong.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const labelClass =
//     "mb-2 text-md font-semibold uppercase tracking-[0.12em] text-gray-500";

//   const inputClass =
//     "border border-gray-300 rounded-xl px-5 pt-1.5 h-30 shadow hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none";

//   return (
//     <>
//       {/* Trigger Button */}

//       <Button
//         isIconOnly
//         size="sm"
//         variant="flat"
//         color="secondary"
//         title="Update Prompt"
//         onPress={handleOpen}
//         className="
//           bg-zinc-900/50
//           hover:bg-violet-600
//           border
//           border-violet-600
//           transition-all
//           duration-300
//           p-2
//           rounded-lg
//           text-white
//         "
//       >
//         <Pencil size={16} />
//       </Button>

//       {/* Modal */}

//       {open && (
//         <div className="fixed inset-0 z-9999 flex items-center justify-center">
//           {/* Backdrop */}

//           <div
//             className="absolute inset-0 bg-black/70 backdrop-blur-md"
//             onClick={handleClose}
//           />

//           {/* Modal Card */}

//           <div
//             className="
//               relative
//               z-10
//               w-full
//               max-w-2xl
//               mx-4
//               overflow-hidden
//               rounded-3xl
//               border
//               border-gray-200
//               bg-white
//            backdrop-blur-xl
//               shadow-[0_30px_80px_rgba(0,0,0,0.25)]
//             "
//           >
//             {/* Header */}

//             <div className="flex items-start justify-between border-b border-gray-200 px-8 py-6">
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-900">
//                   Update Prompt Template
//                 </h2>

//                 <p className="mt-2 text-sm text-gray-500">
//                   Edit your prompt template and save the latest version.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleClose}
//                 disabled={saving}
//                 className="
//                   flex
//                   h-10
//                   w-10
//                   items-center
//                   justify-center
//                   rounded-xl
//                   text-gray-500
//                   transition
//                   hover:bg-gray-100
//                   hover:text-gray-900
//                 "
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Body */}

//             <div className="max-h-[72vh] overflow-y-auto p-8 space-y-7">
//               {/* Prompt Title */}
//               <div className="flex flex-col">
//                 <Label className={labelClass}>
//                   Prompt Title
//                   <span className="text-danger ml-1">*</span>
//                 </Label>
//                 <Input
//                   placeholder="Enter prompt title..."
//                   value={formData.promptTitle}
//                   onChange={(e) => handleChange("promptTitle", e.target.value)}
//                   isRequired
//                   isInvalid={!!errors.promptTitle}
//                   errorMessage={errors.promptTitle}
//                   radius="lg"
//                   variant="bordered"
//                   className="h-12 border border-gray-300 px-5 rounded-xl shadow hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
//                 />
//               </div>

//               {/* Prompt Description */}

//               <div className="flex flex-col">
//                 <Label className={labelClass}>
//                   Prompt Description
//                   <span className="text-danger ml-1">*</span>
//                 </Label>

//                 <Input
//                   value={formData.fullDescription}
//                   placeholder="Describe your prompt..."
//                   onChange={(e) =>
//                     handleChange("fullDescription", e.target.value)
//                   }
//                   minRows={4}
//                   isRequired
//                   isInvalid={!!errors.fullDescription}
//                   errorMessage={errors.fullDescription}
//                   radius="lg"
//                   variant="bordered"
//                   className="h-12 border border-gray-300 px-5 rounded-xl shadow  hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
//                 />
//               </div>

//               {/* Prompt Template */}

//               <div className="flex flex-col">
//                 <Label className={labelClass}>
//                   Prompt Content Template
//                   <span className="text-danger ml-1">*</span>
//                 </Label>

//                 <TextArea
//                   value={formData.promptContent}
//                   placeholder="Write your AI prompt template..."
//                   onChange={(e) =>
//                     handleChange("promptContent", e.target.value)
//                   }
//                   minRows={10}
//                   isRequired
//                   isInvalid={!!errors.promptContent}
//                   errorMessage={errors.promptContent}
//                   radius="lg"
//                   variant="bordered"
//                   className={inputClass}
//                 />
//               </div>

//               {/* Category & AI Tool */}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Category */}

//                 <div className="space-y-2">
//                   <label className={labelClass}>
//                     Category
//                     <span className="text-danger ml-1">*</span>
//                   </label>

//                   <select
//                     value={formData.category}
//                     onChange={(e) => handleChange("category", e.target.value)}
//                     className="
//                       h-12
//                       mt-1
//                       w-full
//                       rounded-xl
//                       border
//                       border-gray-300
//                       bg-white
//                       px-4
//                       text-md
//                       font-semibold
//                       text-gray-800
//                       shadow
//                       outline-none
//                       transition-all
//                       focus:border-violet-500
//                       focus:ring-4
//                       focus:ring-violet-100
//                     "
//                   >
//                     <option value="">Select Category</option>

//                     {categories.map((item) => (
//                       <option key={item} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </select>

//                   {errors.category && (
//                     <p className="text-sm text-danger">{errors.category}</p>
//                   )}
//                 </div>

//                 {/* AI Tool */}

//                 <div className="space-y-2">
//                   <label className={labelClass}>
//                     AI Engine
//                     <span className="text-danger ml-1">*</span>
//                   </label>

//                   <select
//                     value={formData.aiToolName}
//                     onChange={(e) => handleChange("aiToolName", e.target.value)}
//                     className="
//                       h-12
//                       mt-1
//                       w-full
//                       border
//                       border-gray-300
//                       bg-white
//                       px-4
//                       text-md
//                       font-semibold
//                       rounded-xl
//                       text-gray-800
//                       shadow
//                       outline-none
//                       transition-all
//                       focus:border-violet-500
//                       focus:ring-4
//                       focus:ring-violet-100
//                     "
//                   >
//                     <option value="">Select AI Engine</option>

//                     {aiTools.map((item) => (
//                       <option key={item} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </select>

//                   {errors.aiToolName && (
//                     <p className="text-sm text-danger">{errors.aiToolName}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Difficulty & Visibility */}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Difficulty */}

//                 <div className="space-y-2">
//                   <label className={labelClass}>
//                     Difficulty
//                     <span className="text-danger ml-1">*</span>
//                   </label>

//                   <select
//                     value={formData.difficultyLevel}
//                     onChange={(e) =>
//                       handleChange("difficultyLevel", e.target.value)
//                     }
//                     className="
//                       h-12
//                       mt-1
//                       w-full
//                       rounded-xl
//                       border
//                       border-gray-300
//                       bg-white
//                       px-4
//                       text-md
//                       font-semibold
//                       text-gray-800
//                       shadow
//                       outline-none
//                       transition-all
//                       focus:border-violet-500
//                       focus:ring-4
//                       focus:ring-violet-100
//                     "
//                   >
//                     <option value="">Select Difficulty</option>

//                     {difficultyLevels.map((item) => (
//                       <option key={item} value={item}>
//                         {item}
//                       </option>
//                     ))}
//                   </select>

//                   {errors.difficultyLevel && (
//                     <p className="text-sm text-danger">
//                       {errors.difficultyLevel}
//                     </p>
//                   )}
//                 </div>

//                 {/* Visibility */}

//                 <div>
//                   <span className={labelClass}>
//                     Visibility
//                     <span className="text-danger ml-1">*</span>
//                   </span>
//                   <RadioGroup
//                     defaultValue="public"
//                     orientation="horizontal"
//                     value={formData.visibility}
//                     onChange={(value) => handleChange("visibility", value)} // Updated to v3 'onChange'
//                     className="mt-1"
//                   >
//                     <Radio value="public">
//                       <Radio.Content className="cursor-pointer">
//                         {/* Let HeroUI handle the sizing and borders automatically */}
//                         <Radio.Control>
//                           <Radio.Indicator />
//                         </Radio.Control>
//                         Public
//                       </Radio.Content>
//                     </Radio>

//                     <Radio value="private">
//                       <Radio.Content className="cursor-pointer">
//                         <Radio.Control>
//                           <Radio.Indicator />
//                         </Radio.Control>
//                         Private (Premium)
//                       </Radio.Content>
//                     </Radio>
//                   </RadioGroup>
//                 </div>
//               </div>

//               {/* Tags */}
//               <div className="flex gap-21">
//                 <div className="flex flex-col">
//                   <Label className={labelClass}>
//                     Tags
//                     <span className="text-danger ml-1">*</span>
//                   </Label>

//                   <Input
//                     placeholder="e.g. marketing, copywriting, seo"
//                     value={formData.tags}
//                     onChange={(e) => handleChange("tags", e.target.value)}
//                     radius="lg"
//                     variant="bordered"
//                     description="Separate multiple tags with commas (,)"
//                     className="h-10 border w-full border-gray-300 px-5 rounded-xl shadow hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
//                   />
//                 </div>

//                 {/* Thumbnail URL */}
//                 <div className="flex flex-col">
//                   <Label className={labelClass}>
//                     Thumbnail Url
//                     <span className="text-danger ml-1">*</span>
//                   </Label>

//                   <Input
//                     label="Thumbnail URL"
//                     labelPlacement="outside"
//                     placeholder="https://example.com/image.png"
//                     value={formData.image}
//                     onValueChange={(value) => handleChange("image", value)}
//                     radius="lg"
//                     variant="bordered"
//                     className="h-10 border w-full border-gray-300 px-5 rounded-xl shadow hover:border-2 hover:translate-y-0.5 transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-100 outline-none"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}

//             <div className="border-t border-gray-200 bg-gray-50 px-8 py-5">
//               <div className="flex items-center justify-end gap-3">
//                 <Button
//                   variant="flat"
//                   onPress={handleClose}
//                   isDisabled={saving}
//                   className="min-w-28"
//                 >
//                   Cancel
//                 </Button>

//                 <Button
//                   color="secondary"
//                   isLoading={saving}
//                   startContent={
//                     !saving && <Save size={16} className="w-4 h-4" />
//                   }
//                   onPress={handleSubmit}
//                   className="min-w-40"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Pencil,
  Save,
  X,
  Type,
  AlignLeft,
  LayoutGrid,
  Cpu,
  Gauge,
  Eye,
  Tags,
  ImageIcon,
  ChevronDown,
  Sparkles,
} from "lucide-react";
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
    setErrors({});
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
    if (!formData.promptTitle.trim())
      newErrors.promptTitle = "Prompt title is required.";
    if (!formData.fullDescription.trim())
      newErrors.fullDescription = "Prompt description is required.";
    if (!formData.promptContent.trim())
      newErrors.promptContent = "Prompt content is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.aiToolName) newErrors.aiToolName = "AI Engine is required.";
    if (!formData.difficultyLevel)
      newErrors.difficultyLevel = "Difficulty is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

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

  // Premium UI Styling Classes
  const premiumLabelClass =
    "flex items-center gap-2 text-sm font-medium text-slate-300 mb-2.5";
  const premiumInputClass =
    "w-full bg-[#171C2B] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/70 transition-all shadow-inner shadow-black/20 appearance-none";
  const premiumFieldWrapper = "flex flex-col w-full relative";

  // Quick helper for dynamic border color on error
  const getBorderClass = (fieldName) =>
    errors[fieldName]
      ? "border-red-500/70 focus:border-red-500/70"
      : "border-slate-700/60 focus:border-violet-500/70";

  // Check if user is PRO (Replace with your actual logic if needed, forced true for the private radio to work)
  const isProUser = true;

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        title="Update Prompt"
        onClick={handleOpen}
        className="flex items-center justify-center h-8 w-8 bg-zinc-900/50 hover:bg-violet-600 border border-violet-600 transition-all duration-300 rounded-lg text-white"
      >
        <Pencil size={14} />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-4xl flex flex-col max-h-[90vh] bg-[#0B0F19] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#111520] px-6 py-5 md:px-8 shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  Update Prompt Template
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Refine your template and save the latest version.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171C2B] text-slate-400 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-6 md:px-8 space-y-8 hide-scrollbar">
              {/* SECTION 1: Core Information */}
              <div className="bg-[#111520] border border-slate-800/60 rounded-2xl p-6 shadow-lg shadow-black/20 space-y-6">
                <div className="border-b border-slate-800/80 pb-3 mb-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Sparkles className="text-violet-400" size={18} /> Core
                    Details
                  </h3>
                </div>

                <div className={premiumFieldWrapper}>
                  <label className={premiumLabelClass}>
                    <Type size={16} className="text-violet-400" /> Prompt Title{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.promptTitle}
                    onChange={(e) =>
                      handleChange("promptTitle", e.target.value)
                    }
                    placeholder="Enter prompt title..."
                    className={`${premiumInputClass} ${getBorderClass("promptTitle")}`}
                  />
                  {errors.promptTitle && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.promptTitle}
                    </p>
                  )}
                </div>

                <div className={premiumFieldWrapper}>
                  <label className={premiumLabelClass}>
                    <AlignLeft size={16} className="text-violet-400" /> Prompt
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) =>
                      handleChange("fullDescription", e.target.value)
                    }
                    placeholder="Briefly explain what this prompt does..."
                    rows={3}
                    className={`${premiumInputClass} ${getBorderClass("fullDescription")} h-13 resize-y`}
                  />
                  {errors.fullDescription && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.fullDescription}
                    </p>
                  )}
                </div>

                <div className={premiumFieldWrapper}>
                  <label className={premiumLabelClass}>
                    <AlignLeft size={16} className="text-emerald-400" /> Prompt
                    Content Template <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.promptContent}
                    onChange={(e) =>
                      handleChange("promptContent", e.target.value)
                    }
                    placeholder="Paste your exact AI prompt template here..."
                    rows={8}
                    className={`${premiumInputClass} ${getBorderClass("promptContent")} h-20 font-mono text-sm leading-relaxed text-slate-300 resize-y`}
                  />
                  {errors.promptContent && (
                    <p className="text-xs text-red-400 mt-1.5">
                      {errors.promptContent}
                    </p>
                  )}
                </div>
              </div>

              {/* SECTION 2: Metadata & Classification */}
              <div className="bg-[#111520] border border-slate-800/60 rounded-2xl p-6 shadow-lg shadow-black/20 space-y-6">
                <div className="border-b border-slate-800/80 pb-3 mb-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <LayoutGrid className="text-cyan-400" size={18} />{" "}
                    Classification & Visibility
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Category */}
                  <div className={premiumFieldWrapper}>
                    <label className={premiumLabelClass}>
                      <LayoutGrid size={16} className="text-slate-400" />{" "}
                      Category <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          handleChange("category", e.target.value)
                        }
                        className={`${premiumInputClass} ${getBorderClass("category")} cursor-pointer pr-10`}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {categories.map((cat) => (
                          <option
                            key={cat}
                            value={cat}
                            className="bg-[#171C2B] text-white"
                          >
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      />
                    </div>
                    {errors.category && (
                      <p className="text-xs text-red-400 mt-1.5">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* AI Tool */}
                  <div className={premiumFieldWrapper}>
                    <label className={premiumLabelClass}>
                      <Cpu size={16} className="text-slate-400" /> AI Engine{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.aiToolName}
                        onChange={(e) =>
                          handleChange("aiToolName", e.target.value)
                        }
                        className={`${premiumInputClass} ${getBorderClass("aiToolName")} cursor-pointer pr-10`}
                      >
                        <option value="" disabled>
                          Select AI Engine
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
                    {errors.aiToolName && (
                      <p className="text-xs text-red-400 mt-1.5">
                        {errors.aiToolName}
                      </p>
                    )}
                  </div>

                  {/* Difficulty */}
                  <div className={premiumFieldWrapper}>
                    <label className={premiumLabelClass}>
                      <Gauge size={16} className="text-slate-400" /> Difficulty{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.difficultyLevel}
                        onChange={(e) =>
                          handleChange("difficultyLevel", e.target.value)
                        }
                        className={`${premiumInputClass} ${getBorderClass("difficultyLevel")} cursor-pointer pr-10`}
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
                    {errors.difficultyLevel && (
                      <p className="text-xs text-red-400 mt-1.5">
                        {errors.difficultyLevel}
                      </p>
                    )}
                  </div>

                  {/* Visibility (Custom Radio) */}
                  <div className={premiumFieldWrapper}>
                    <label className={premiumLabelClass}>
                      <Eye size={16} className="text-slate-400" /> Visibility
                      Status
                    </label>
                    <div className="flex gap-4 mt-1">
                      {/* Public Radio */}
                      <label
                        className={`flex-1 flex cursor-pointer items-center gap-3 p-3 rounded-xl border transition-all ${
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
                          onChange={(e) =>
                            handleChange("visibility", e.target.value)
                          }
                          className="hidden"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.visibility === "public" ? "border-violet-500" : "border-slate-500"}`}
                        >
                          {formData.visibility === "public" && (
                            <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-slate-200">
                          Public
                        </div>
                      </label>

                      {/* Private Radio */}
                      <label
                        className={`flex-1 flex items-center gap-3 p-3 rounded-xl border transition-all ${
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
                          onChange={(e) =>
                            handleChange("visibility", e.target.value)
                          }
                          disabled={!isProUser}
                          className="hidden"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${formData.visibility === "private" ? "border-violet-500" : "border-slate-500"}`}
                        >
                          {formData.visibility === "private" && (
                            <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-slate-200">
                          Private
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Tags & Media */}
              <div className="bg-[#111520] border border-slate-800/60 rounded-2xl p-6 shadow-lg shadow-black/20 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={premiumFieldWrapper}>
                    <label className={premiumLabelClass}>
                      <Tags size={16} className="text-slate-400" /> Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => handleChange("tags", e.target.value)}
                      placeholder="e.g. marketing, seo, react"
                      className={`${premiumInputClass} border-slate-700/60`}
                    />
                    <p className="mt-2 text-xs text-slate-500">
                      Separate multiple tags with commas (,)
                    </p>
                  </div>

                  <div className={premiumFieldWrapper}>
                    <label className={premiumLabelClass}>
                      <ImageIcon size={16} className="text-slate-400" />{" "}
                      Thumbnail URL
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => handleChange("image", e.target.value)}
                      placeholder="https://example.com/image.png"
                      className={`${premiumInputClass} border-slate-700/60`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800/80 bg-[#111520] px-6 py-4 md:px-8 shrink-0 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white bg-transparent hover:bg-slate-800 rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
