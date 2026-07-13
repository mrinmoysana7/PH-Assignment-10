"use client";

import { Table, TableColumn, Chip, Button } from "@heroui/react";

import { Eye, Check, X, Trash2, Star } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/10 py-1.5 rounded-full border-3 border-emerald-500/20 text-emerald-500";
      case "rejected":
        return "bg-rose-500/10 py-1.5 px-2.5 rounded-full border-3 border-rose-500/20 text-rose-500";
      case "pending":
      default:
        return "bg-amber-500/10 py-1.5 px-3 rounded-full border-3 border-amber-500/20 text-amber-500";
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
    <div className="overflow-x-auto rounded-2xl border border-[#1F2937] bg-[#0F172A]  shadow-2xl ">
      <Toaster></Toaster>
      <Table aria-label="Admin Premium Prompt Table" removeWrapper>
        <Table.ResizableContainer>
          <Table.Content>
            <Table.Header className="bg-[#131C33]">
              <Table.Column
                isRowHeader
                minWidth={220}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
py-4
pl-4
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
py-4"
              >
                CREATOR
              </Table.Column>

              <Table.Column
                isRowHeader
                minWidth={150}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
py-4"
              >
                AI ENGINE
              </Table.Column>

              <Table.Column
                isRowHeader
                minWidth={100}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
py-4"
              >
                VISIBILITY
              </Table.Column>

              <TableColumn
                isRowHeader
                minWidth={130}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
py-4"
              >
                FEATURED
              </TableColumn>

              <Table.Column
                isRowHeader
                minWidth={120}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
py-4"
              >
                STATUS
              </Table.Column>

              <Table.Column
                isRowHeader
                minWidth={200}
                className="text-xs
text-start              
uppercase
tracking-wider
font-bold
text-gray-500
py-4"
              >
                ACTIONS
              </Table.Column>
            </Table.Header>

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
                  <Table.Row
                    key={_id}
                    className="border-b
        border-slate-800
        hover:bg-slate-900/40
        transition-colors"
                  >
                    <Table.Cell className="px-5 py-5">
                      <div className="flex flex-col gap-1 pl-4">
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
                        className="border-3 border-purple-500/20 bg-purple-500/10 px-2.5 rounded-full py-1.5 font-bold uppercase tracking-wider text-purple-400 text-[10px]"
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
                            ? "border-3 py-0.5 border-amber-500/30 bg-amber-500/10 px-2 rounded-full text-amber-500 font-semibold flex items-center gap-1"
                            : "border-3 px-4.5 border-gray-600 py-0.5 rounded-full text-white  hover:border-[#374151] hover:text-slate-300 font-medium"
                        }
                      >
                        {featured ? (
                          <Star
                            size={14}
                            className={
                              featured ? "fill-amber-500 text-amber-500" : ""
                            }
                          />
                        ) : (
                          ""
                        )}
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
                          className="border border-white/70 text-white p-2 hover:bg-slate-100 bg-white/30 rounded-lg hover:border-slate-500 hover:text-black"
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
          text-red-600
          hover:text-white
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
          text-red-600
          hover:text-white
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
          prompt={deletePrompt}
          onDeleted={() => router.refresh()}
          onClose={closeDelete}
        />
      )}
    </div>
  );
}
