// import Image from "next/image";

// import { Card, Button, Chip } from "@heroui/react";
// import { ArrowLeft, Bookmark, Flag, Copy, Star } from "lucide-react";
// import { getPromptsById } from "@/lib/api/prompts";
// import Link from "next/link";

// export default async function PromptDetailsPage({ params }) {
//   const { id } = await params;
//   const prompt = await getPromptsById(id);

//   if (!prompt) {
//     return <div className="p-20 text-center">Prompt not found</div>;
//   }

//   return (
//     <div className="bg-slate-50 text-slate-900 py-25 px-20">
//       <div className="max-w-5xl mx-auto my-auto flex flex-col gap-8">
//         <Link
//           href="/prompts"
//           className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit"
//         >
//           <ArrowLeft size={16} /> Back to previous page
//         </Link>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl">
//             <Card.Content className="p-6 md:p-8 flex flex-col gap-6">
//               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//                 <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
//                   {prompt.promptTitle}
//                 </h1>
//                 <div className="flex items-center gap-2 shrink-0">
//                   <Button isIconOnly variant="flat" className="bg-slate-100">
//                     <Bookmark size={18} />
//                   </Button>
//                   <Button isIconOnly variant="flat" className="bg-slate-100">
//                     <Flag size={18} />
//                   </Button>
//                 </div>
//               </div>

//               <p className="text-slate-600 text-base leading-relaxed">
//                 {prompt.fullDescription}
//               </p>

//               <div className="flex flex-col gap-3 mt-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-bold text-slate-900">
//                     Prompt Template
//                   </h3>
//                   <Button
//                     size="sm"
//                     variant="flat"
//                     className="bg-slate-100 text-slate-700 font-medium"
//                     startContent={<Copy size={14} />}
//                   >
//                     Copy
//                   </Button>
//                 </div>
//                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-inner">
//                   <p className="font-mono text-sm leading-relaxed text-indigo-700 wrap-break-words whitespace-pre-wrap">
//                     {prompt.promptContent}
//                   </p>
//                 </div>
//               </div>

//               {/* <Divider className="my-2 opacity-50" /> */}

//               <div className="flex flex-col gap-2">
//                 <h3 className="text-lg font-bold text-slate-900">
//                   Usage Instructions
//                 </h3>
//                 <p className="text-sm text-slate-600 leading-relaxed">
//                   {prompt.usageInstructions}
//                 </p>
//               </div>
//             </Card.Content>
//           </Card>

//           <div className="lg:col-span-1 flex flex-col gap-6">
//             <Card className="bg-white border border-slate-200 shadow-sm rounded-2xl h-fit">
//               <Card.Content className="p-6 flex flex-col gap-6">
//                 <h3 className="text-lg font-bold text-slate-900">
//                   Prompt Details
//                 </h3>

//                 <div className="flex flex-col gap-4 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-slate-500">AI Engine</span>
//                     <Chip size="sm">{prompt.aiToolName}</Chip>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-500">Category</span>
//                     <Chip size="sm">{prompt.category}</Chip>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-slate-500">Difficulty</span>
//                     <Chip size="sm">{prompt.difficultyLevel}</Chip>
//                   </div>
//                 </div>

//                 {/* <Divider /> */}

//                 <div className="flex flex-col gap-3 text-sm">
//                   <div className="flex justify-between">
//                     <span>Copies Made</span>
//                     <span className="font-bold">{prompt.copyCount}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Rating</span>
//                     <span className="font-bold flex items-center gap-1">
//                       <Star size={14} className="fill-amber-400" />
//                       {prompt.rating}
//                     </span>
//                   </div>
//                 </div>

//                 {/* <Divider /> */}

//                 <div className="flex flex-col gap-3">
//                   <h3 className="text-sm font-bold text-slate-900">
//                     Creator Information
//                   </h3>
//                   <div className="flex items-center gap-3">
//                     <div className="relative h-10 w-10 shrink-0">
//                       <Image
//                         src={prompt?.creatorInformation?.avatar}
//                         alt={prompt?.creatorInformation?.name}
//                         fill
//                         className="rounded-full object-cover"
//                         sizes="40px"
//                       />
//                     </div>
//                     <div className="flex-1 space-y-0.5">
//                       <div className="text-sm font-semibold">
//                         {prompt?.creatorInformation?.name}
//                       </div>
//                       <div className="text-xs text-slate-500">
//                         {prompt?.creatorInformation?.username}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Card.Content>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import { Card, Button, Chip } from "@heroui/react";
import { ArrowLeft, Bookmark, Flag, Copy, Star } from "lucide-react";
import { getPromptsById } from "@/lib/api/prompts";
import Link from "next/link";

export default async function PromptDetailsPage({ params }) {
  const { id } = await params;
  const prompt = await getPromptsById(id);

  if (!prompt) {
    return <div className="p-20 text-center">Prompt not found</div>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 py-25 px-20">
      <div className="max-w-5xl mx-auto my-auto flex flex-col gap-8">
        <Link
          href="/prompts"
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Back to previous page
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-2xl">
            <Card.Content className="p-6 md:p-8 flex flex-col gap-6">
              {/* ... (Header section remains the same) ... */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                  {prompt.promptTitle}
                </h1>
                <div className="flex items-center gap-2 shrink-0">
                  <Button isIconOnly variant="flat" className="bg-slate-100">
                    <Bookmark size={18} />
                  </Button>
                  <Button isIconOnly variant="flat" className="bg-slate-100">
                    <Flag size={18} />
                  </Button>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed">
                {prompt.fullDescription}
              </p>

              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">
                    Prompt Template
                  </h3>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-slate-100 text-slate-700 font-medium"
                    startContent={<Copy size={14} />}
                  >
                    Copy
                  </Button>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-inner">
                  <p className="font-mono text-sm leading-relaxed text-indigo-700 wrap-break-words whitespace-pre-wrap">
                    {prompt.promptContent}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Usage Instructions
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {prompt.usageInstructions}
                </p>
              </div>
            </Card.Content>
          </Card>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <Card className="bg-white border border-slate-200 shadow-sm rounded-2xl h-fit">
              <Card.Content className="p-6 flex flex-col gap-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Prompt Details
                </h3>

                <div className="flex flex-col gap-4 text-sm">
                  {/* ফিক্সড চিপস */}
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">AI Engine</span>
                    <Chip size="sm" className="max-w-none h-auto px-2">
                      {prompt.aiToolName || "N/A"}
                    </Chip>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Category</span>
                    <Chip size="sm" className="max-w-none h-auto px-2">
                      {prompt.category || "General"}
                    </Chip>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Difficulty</span>
                    <Chip size="sm" className="max-w-none h-auto px-2">
                      {prompt.difficultyLevel || "Beginner"}
                    </Chip>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Copies Made</span>
                    <span className="font-bold">{prompt.copyCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating</span>
                    <span className="font-bold flex items-center gap-1">
                      <Star size={14} className="fill-amber-400" />
                      {prompt.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Creator Information
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0">
                      <Image
                        src={
                          prompt?.creatorInformation?.avatar ||
                          "/default-avatar.png"
                        }
                        alt={prompt?.creatorInformation?.name || "User"}
                        fill
                        className="rounded-full object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="text-sm font-semibold">
                        {prompt?.creatorInformation?.name || "Anonymous"}
                      </div>
                      <div className="text-xs text-slate-500">
                        @{prompt?.creatorInformation?.username || "unknown"}
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
