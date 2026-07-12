// // "use client";

// // export default function AdminPromptsTable({ prompts }) {
// //   return (
// //     <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-8">
// //       <div className="flex items-center justify-between">
// //         <div>
// //           <h2 className="text-2xl font-bold text-white">
// //             All Prompt Templates
// //           </h2>

// //           <p className="mt-2 text-slate-400">
// //             Total Prompts : {prompts.length}
// //           </p>
// //         </div>
// //       </div>

// //       <div className="mt-10">
// //         <div className="rounded-xl border border-dashed border-slate-700 py-24">
// //           <p className="text-center text-slate-500">
// //             Prompt Table Coming Next...
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { Table, Chip, Button, Avatar } from "@heroui/react";

// import { Eye, Check, X, Trash2, Star } from "lucide-react";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// import toast from "react-hot-toast";

// import { approvePrompt, featurePrompt } from "@/lib/api/adminPrompts";
// import RejectPromptModal from "./PromptActions/RejectPromptModal";
// import PromptPreviewModal from "./PromptActions/PromptPreviewModal";
// import DeletePromptModal from "./PromptActions/DeletePromptModal";

// export default function AdminPromptsTable({ prompts }) {
//   const router = useRouter();

//   const [loadingId, setLoadingId] = useState(null);

//   const [previewPrompt, setPreviewPrompt] = useState(null);

//   const [rejectPrompt, setRejectPrompt] = useState(null);

//   const [deletePrompt, setDeletePrompt] = useState(null);

//   // ===========================
//   // Status Badge
//   // ===========================

//   const getStatusClasses = (status) => {
//     switch (status) {
//       case "approved":
//         return "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400";

//       case "rejected":
//         return "bg-red-500/15 border border-red-500/30 text-red-400";

//       default:
//         return "bg-yellow-500/15 border border-yellow-500/30 text-yellow-400";
//     }
//   };

//   const handleApprove = async (promptId) => {
//     try {
//       setLoadingId(promptId);

//       const result = await approvePrompt(promptId);

//       if (!result.success) {
//         toast.error(result.message);
//         return;
//       }

//       toast.success("Prompt approved successfully.");

//       router.refresh();
//     } catch (error) {
//       console.error(error);

//       toast.error("Failed to approve prompt.");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const handleFeature = async (prompt) => {
//     try {
//       setLoadingId(prompt._id);

//       const result = await featurePrompt(prompt._id, !prompt.featured);

//       if (!result.success) {
//         toast.error(result.message);
//         return;
//       }

//       toast.success(
//         prompt.featured
//           ? "Prompt removed from featured."
//           : "Prompt featured successfully.",
//       );

//       router.refresh();
//     } catch (error) {
//       console.error(error);

//       toast.error("Failed to update featured status.");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const openPreview = (prompt) => {
//     setPreviewPrompt(prompt);
//   };

//   const closePreview = () => {
//     setPreviewPrompt(null);
//   };

//   const openReject = (prompt) => {
//     setRejectPrompt(prompt);
//   };

//   const closeReject = () => {
//     setRejectPrompt(null);
//   };

//   const openDelete = (prompt) => {
//     setDeletePrompt(prompt);
//   };

//   const closeDelete = () => {
//     setDeletePrompt(null);
//   };

//   return (
//     <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#0F172A] shadow-xl">
//       <Table
//         aria-label="Admin Prompt Table"
//         removeWrapper
//         className="bg-transparent"
//       >
//         <Table.ScrollContainer>
//           <Table.Content aria-label="Example table">
//             {/* ====================================== */}
//             {/* HEADER */}
//             {/* ====================================== */}

//             <Table.Header>
//               <Table.Column>TEMPLATE TITLE</Table.Column>

//               <Table.Column>CREATOR</Table.Column>

//               <Table.Column>AI ENGINE</Table.Column>

//               <Table.Column>VISIBILITY</Table.Column>

//               <Table.Column>FEATURED</Table.Column>

//               <Table.Column>STATUS</Table.Column>

//               <Table.Column className="text-center">ACTIONS</Table.Column>
//             </Table.Header>

//             {/* ====================================== */}
//             {/* BODY */}
//             {/* ====================================== */}

//             <Table.Body items={prompts}>
//               {(prompt) => {
//                 const {
//                   _id,
//                   promptTitle,
//                   category,
//                   aiToolName,
//                   visibility,
//                   status,
//                   featured,
//                   creatorInformation,
//                 } = prompt;

//                 return (
//                   <Table.Row key={prompt._id}>
//                     {/* ============================= */}
//                     {/* TITLE */}
//                     {/* ============================= */}

//                     <Table.Cell>
//                       <div>
//                         <h4 className="font-semibold text-white">
//                           {promptTitle}
//                         </h4>

//                         <p className="mt-1 text-sm text-slate-400">
//                           Category : {category}
//                         </p>
//                       </div>
//                     </Table.Cell>

//                     {/* ============================= */}
//                     {/* CREATOR */}
//                     {/* ============================= */}

//                     <Table.Cell>
//                       <div className="flex items-center gap-3">
//                         <Avatar
//                           src={
//                             creatorInformation?.image || "/default-avatar.png"
//                           }
//                           name={creatorInformation?.name || "Anonymous"}
//                         />

//                         <div>
//                           <h4 className="font-medium text-white">
//                             {creatorInformation?.name}
//                           </h4>

//                           <p className="text-xs text-slate-400">
//                             {creatorInformation?.email}
//                           </p>
//                         </div>
//                       </div>
//                     </Table.Cell>

//                     {/* ============================= */}
//                     {/* AI ENGINE */}
//                     {/* ============================= */}

//                     <Table.Cell>
//                       <Chip size="sm" color="secondary" variant="flat">
//                         {aiToolName}
//                       </Chip>
//                     </Table.Cell>

//                     {/* ============================= */}
//                     {/* VISIBILITY */}
//                     {/* ============================= */}

//                     <Table.Cell>
//                       <span className="font-medium text-white">
//                         {visibility}
//                       </span>
//                     </Table.Cell>

//                     {/* ============================= */}
//                     {/* FEATURED */}
//                     {/* ============================= */}

//                     <Table.Cell>
//                       <div className="flex justify-center">
//                         <Button
//                           size="sm"
//                           radius="full"
//                           isLoading={loadingId === prompt._id}
//                           onPress={() => handleFeature(prompt)}
//                           className={
//                             prompt.featured
//                               ? `
//             bg-amber-500/15
//             border
//             border-amber-500/30
//             text-amber-400
//             hover:bg-amber-500/25
//           `
//                               : `
//             bg-slate-800
//             border
//             border-slate-700
//             text-slate-300
//             hover:bg-slate-700
//           `
//                           }
//                           startContent={
//                             !loadingId && (
//                               <Star
//                                 size={15}
//                                 className={
//                                   prompt.featured ? "fill-amber-400" : ""
//                                 }
//                               />
//                             )
//                           }
//                         >
//                           {prompt.featured ? "Featured" : "Feature"}
//                         </Button>
//                       </div>
//                     </Table.Cell>

//                     {/* ============================= */}
//                     {/* STATUS */}
//                     {/* ============================= */}

//                     <Table.Cell>
//                       <div className="flex justify-center">
//                         <span
//                           className={`
//         rounded-full
//         px-3
//         py-1
//         text-xs
//         font-bold
//         uppercase
//         tracking-wide

//         ${getStatusClasses(status)}
//       `}
//                         >
//                           {status}
//                         </span>
//                       </div>
//                     </Table.Cell>

//                     {/* ============================= */}
//                     {/* ACTIONS */}
//                     {/* ============================= */}

//                     <Table.Cell>
//                       <div className="flex items-center justify-center gap-2">
//                         {/* Preview */}

//                         <Button
//                           isIconOnly
//                           size="sm"
//                           variant="flat"
//                           onPress={() => openPreview(prompt)}
//                           className="
//         bg-slate-800
//         border
//         border-slate-700
//         text-slate-300
//         hover:bg-violet-600
//         hover:text-white
//       "
//                         >
//                           <Eye size={16} />
//                         </Button>

//                         {/* Approve */}

//                         <Button
//                           isIconOnly
//                           size="sm"
//                           color="success"
//                           variant="flat"
//                           isDisabled={
//                             loadingId === prompt._id || status === "approved"
//                           }
//                           isLoading={
//                             loadingId === prompt._id && status !== "approved"
//                           }
//                           onPress={() => handleApprove(prompt._id)}
//                           className="
//         bg-emerald-500/15
//         border
//         border-emerald-500/30
//         text-emerald-400
//         hover:bg-emerald-500
//         hover:text-white
//       "
//                         >
//                           {!loadingId && <Check size={16} />}
//                         </Button>

//                         {/* Reject */}

//                         <Button
//                           isIconOnly
//                           size="sm"
//                           color="warning"
//                           variant="flat"
//                           isDisabled={loadingId === prompt._id}
//                           onPress={() => openReject(prompt)}
//                           className="
//         bg-amber-500/15
//         border
//         border-amber-500/30
//         text-amber-400
//         hover:bg-amber-500
//         hover:text-white
//       "
//                         >
//                           <X size={16} />
//                         </Button>

//                         {/* Delete */}

//                         <Button
//                           isIconOnly
//                           size="sm"
//                           color="danger"
//                           variant="flat"
//                           isDisabled={loadingId === prompt._id}
//                           onPress={() => openDelete(prompt)}
//                           className="
//         bg-red-500/15
//         border
//         border-red-500/30
//         text-red-400
//         hover:bg-red-500
//         hover:text-white
//       "
//                         >
//                           <Trash2 size={16} />
//                         </Button>
//                       </div>
//                     </Table.Cell>
//                   </Table.Row>
//                 );
//               }}
//             </Table.Body>
//           </Table.Content>
//         </Table.ScrollContainer>
//       </Table>

//       {/* Preview Modal */}

//       {previewPrompt && (
//         <PromptPreviewModal prompt={previewPrompt} onClose={closePreview} />
//       )}

//       {/* Reject Modal */}

//       {rejectPrompt && (
//         <RejectPromptModal
//           prompt={rejectPrompt}
//           onClose={closeReject}
//           onSuccess={() => {
//             closeReject();
//             router.refresh();
//           }}
//         />
//       )}

//       {/* Delete Modal */}

//       {deletePrompt && (
//         <DeletePromptModal
//           prompt={deletePrompt}
//           onClose={closeDelete}
//           onDeleted={() => {
//             closeDelete();
//             router.refresh();
//           }}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@heroui/react";

import { Eye, Check, X, Trash2, Star } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { approvePrompt, featurePrompt } from "@/lib/api/adminPrompts";
import RejectPromptModal from "./PromptActions/RejectPromptModal";
import PromptPreviewModal from "./PromptActions/PromptPreviewModal";
import DeletePromptModal from "./PromptActions/DeletePromptModal";

export default function AdminPromptsTable({ prompts }) {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState(null);
  const [previewPrompt, setPreviewPrompt] = useState(null);
  const [rejectPrompt, setRejectPrompt] = useState(null);
  const [deletePrompt, setDeletePrompt] = useState(null);

  // ===========================
  // Premium Status Badge Styles
  // ===========================
  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/10 py-1 rounded-full border-emerald-500/20 text-emerald-500";
      case "rejected":
        return "bg-rose-500/10 py-1 px-2.5 rounded-full border-rose-500/20 text-rose-500";
      case "pending":
      default:
        return "bg-amber-500/10 py-1 px-3 rounded-full border-amber-500/20 text-amber-500";
    }
  };

  const handleApprove = async (promptId) => {
    try {
      setLoadingId(promptId);
      const result = await approvePrompt(promptId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Prompt approved successfully.");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve prompt.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleFeature = async (prompt) => {
    try {
      setLoadingId(prompt._id);
      const result = await featurePrompt(prompt._id, !prompt.featured);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        prompt.featured
          ? "Prompt removed from featured."
          : "Prompt featured successfully.",
      );
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update featured status.");
    } finally {
      setLoadingId(null);
    }
  };

  const openPreview = (prompt) => setPreviewPrompt(prompt);
  const closePreview = () => setPreviewPrompt(null);
  const openReject = (prompt) => setRejectPrompt(prompt);
  const closeReject = () => setRejectPrompt(null);
  const openDelete = (prompt) => setDeletePrompt(prompt);
  const closeDelete = () => setDeletePrompt(null);

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1F2937] bg-[#0B0F19] p-4 shadow-2xl sm:p-6">
      <Table aria-label="Admin Premium Prompt Table" removeWrapper className="">
        <Table.ResizableContainer>
          <Table.Content>
            {/* ====================================== */}
            {/* HEADER */}
            {/* ====================================== */}

            <Table.Header>
              <Table.Column
                isRowHeader
                minWidth={220}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
pb-4
"
              >
                TEMPLATE TITLE
              </Table.Column>

              <Table.Column
                isRowHeader
                minWidth={220}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
pb-4"
              >
                CREATOR
              </Table.Column>

              <Table.Column
                isRowHeader
                minWidth={220}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
pb-4"
              >
                AI ENGINE
              </Table.Column>

              <Table.Column
                isRowHeader
                minWidth={220}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
pb-4"
              >
                VISIBILITY
              </Table.Column>

              <TableColumn
                isRowHeader
                minWidth={220}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
pb-4"
              >
                FEATURED
              </TableColumn>

              <Table.Column
                isRowHeader
                minWidth={220}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
pb-4"
              >
                STATUS
              </Table.Column>

              <Table.Column
                isRowHeader
                minWidth={220}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
pb-4"
              >
                ACTIONS
              </Table.Column>
            </Table.Header>

            {/* ====================================== */}
            {/* BODY */}
            {/* ====================================== */}
            <Table.Body
              items={prompts || []}
              emptyContent={
                <div className="py-10 text-slate-500">
                  No prompts available right now.
                </div>
              }
            >
              {(prompt) => {
                const {
                  _id,
                  promptTitle,
                  category,
                  aiToolName,
                  visibility,
                  status,
                  featured,
                  creatorInformation,
                } = prompt;

                return (
                  <Table.Row key={_id}>
                    <Table.Cell>
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold text-slate-200">
                          {promptTitle}
                        </h4>
                        <p className="text-xs text-slate-500">
                          Category:{" "}
                          <span className="text-slate-400">{category}</span>
                        </p>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex flex-col gap-0.5">
                        <h4 className="text-sm font-medium text-slate-200">
                          {creatorInformation?.name || "Anonymous User"}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {creatorInformation?.email || "No email provided"}
                        </p>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="flat"
                        className="border border-purple-500/20 bg-purple-500/10 px-2 font-bold uppercase tracking-wider text-purple-400 text-[10px]"
                      >
                        {aiToolName}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm font-medium text-slate-300 capitalize">
                        {visibility}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <Button
                        size="sm"
                        variant="bordered"
                        radius="full"
                        isLoading={loadingId === _id}
                        onPress={() => handleFeature(prompt)}
                        className={
                          featured
                            ? "border border-amber-500/30 bg-amber-500/10 px-3.5 rounded-full text-amber-500 font-semibold"
                            : "border px-4.5 border-gray-200  rounded-full text-white  hover:border-[#374151] hover:text-slate-300 font-medium"
                        }
                        startContent={
                          !loadingId && (
                            <Star
                              size={14}
                              className={
                                featured ? "fill-amber-500 text-amber-500" : ""
                              }
                            />
                          )
                        }
                      >
                        {featured ? "Featured" : "Feature"}
                      </Button>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`border px-2 font-bold uppercase tracking-widest text-[10px] ${getStatusClasses(
                          status,
                        )}`}
                      >
                        {status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        {/* Preview */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          radius="full"
                          onPress={() => openPreview(prompt)}
                          className="border-[#1F2937] text-[#6B7280] p-2 hover:bg-slate-100 bg-slate-300 rounded-lg hover:border-slate-500 hover:text-slate-200"
                        >
                          <Eye size={15} />
                        </Button>

                        {/* Approve */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          radius="full"
                          isDisabled={
                            loadingId === _id || status === "approved"
                          }
                          isLoading={loadingId === _id && status !== "approved"}
                          onPress={() => handleApprove(_id)}
                          className="border border-emerald-500/30 p-2 hover:bg-emerald-500/70 rounded-lg
          transition-all hover:text-white text-emerald-500 hover:border-emerald-500 bg-emerald-500/10"
                        >
                          {!loadingId && <Check size={15} />}
                        </Button>

                        {/* Reject */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          radius="full"
                          isDisabled={loadingId === _id}
                          onPress={() => openReject(prompt)}
                          className=" p-2
          bg-red-900/20
          hover:bg-red-600
          text-white
          border
          border-red-700/30
          rounded-lg
          transition-all"
                        >
                          <X size={15} />
                        </Button>

                        {/* Delete */}
                        <Button
                          isIconOnly
                          size="sm"
                          variant="bordered"
                          radius="full"
                          isDisabled={loadingId === _id}
                          onPress={() => openDelete(prompt)}
                          className=" p-2
          bg-red-900/20
          hover:bg-red-600
          text-white
          border
          border-red-700/30
          rounded-lg
          transition-all"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              }}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>

      {previewPrompt && (
        <PromptPreviewModal
          prompt={previewPrompt}
          onClose={closePreview}
          onUpdated={() => router.refresh()}
        />
      )}

      {rejectPrompt && (
        <RejectPromptModal
          prompt={rejectPrompt}
          onClose={closeReject}
          onSuccess={() => {
            closeReject();
            router.refresh();
          }}
        />
      )}

      {deletePrompt && (
        <DeletePromptModal
          onDeleted={() => router.refresh()}
          prompt={deletePrompt}
          onClose={closeDelete}
        />
      )}

      {prompts.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl font-semibold text-white">No prompt found</h3>

          <p className="mt-3 text-slate-400">
            You havent published any prompts yet.
          </p>
        </div>
      )}
    </div>
  );
}
