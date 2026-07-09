"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Table, Chip } from "@heroui/react";
import { Eye, Lock, Unlock, Star } from "lucide-react";
import Link from "next/link";
import UpdatePromptModal from "../prompts/UpdatePromptModal";

import DeletePromptModal from "../prompts/DeletePromptModal";
import PromptAnalyticsModal from "../prompts/PromptAnalyticsModal";

export default function PromptsTable({ prompts = [], user }) {
  // console.log("PromptsTable received prompts:", prompts);
  const getPromptId = (prompt) => prompt._id?.$oid || prompt._id;

  const router = useRouter();

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-x-auto">
      <Table aria-label="My prompt templates table" className="min-w-200">
        <Table.ResizableContainer>
          <Table.Content>
            <Table.Header className="bg-gray-50">
              <Table.Column
                isRowHeader
                minWidth={220}
                className="text-xs
              
uppercase
tracking-wider
font-bold
text-gray-500
border-r border-gray-200
px-4"
              >
                TITLE
              </Table.Column>
              <Table.Column
                minWidth={200}
                className=" text-xs
             
uppercase
tracking-wider
font-bold
text-gray-500
border-r border-gray-200
px-1"
              >
                AI ENGINE
              </Table.Column>
              <Table.Column
                minWidth={150}
                className=" text-xs
              
uppercase
tracking-wider
font-bold
text-gray-500
border-r border-gray-200
"
              >
                VISIBILITY
              </Table.Column>
              <Table.Column
                minWidth={150}
                className="text-xs
              w-37.5
uppercase
tracking-wider
font-bold
text-gray-500
border-r border-gray-200
 "
              >
                STATUS
              </Table.Column>
              <Table.Column
                minWidth={120}
                className="text-xs
              w-22.5
uppercase
tracking-wider
font-bold
text-gray-500
border-r border-gray-200
text-center"
              >
                COPIES
              </Table.Column>
              <Table.Column
                minWidth={100}
                className="text-xs
              w-25
uppercase
tracking-wider
font-bold
text-gray-500
border-r border-gray-200
text-center"
              >
                RATING
              </Table.Column>
              <Table.Column
                minWidth={170}
                className="text-xs
              w-50
uppercase
tracking-wider
font-bold
text-gray-500

py-4 "
              >
                ACTIONS
              </Table.Column>
            </Table.Header>

            {/* টেবিল বডি */}
            <Table.Body>
              {prompts.map((prompt) => {
                console.log("Prompt Data:", prompt); // Debugging line to check the structure of prompt
                const isRejected = prompt.status?.toLowerCase() === "rejected";

                return (
                  <Table.Row
                    key={getPromptId(prompt)}
                    className="border-b border-zinc-900 hover:bg-zinc-900/10 transition-colors"
                  >
                    {/* TITLE COLUMN (ইমেজ অনুযায়ী টাইটেল, ক্যাটাগরি এবং রিজেকশন ফিডব্যাক সহ) */}
                    <Table.Cell className="py-6 px-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-black/80 text-base text-ellipsis overflow-hidden whitespace-nowrap">
                          {prompt.promptTitle}
                        </span>
                        <span className="text-xs text-zinc-600">
                          Category: {prompt.category}
                        </span>

                        {/* যদি স্ট্যাটাস REJECTED হয় তবেই লাল ফিডব্যাক বক্সটি দেখাবে */}
                        {isRejected && prompt.feedback && (
                          <div className="mt-2 text-xs bg-red-950/30 border border-red-900/50 text-red-400 px-2 py-1 rounded max-w-xs">
                            <span className="font-medium">Feedback:</span>{" "}
                            {prompt.feedback}
                          </div>
                        )}
                      </div>
                    </Table.Cell>

                    {/* AI ENGINE COLUMN */}
                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="flat"
                        className="flex items-center justify-center"
                      >
                        <div className="text-center bg-violet-200 border border-violet-300 px-7 py-1 rounded-full text-violet-700 font-semibold">
                          {prompt.aiToolName}
                        </div>
                      </Chip>
                    </Table.Cell>

                    {/* VISIBILITY COLUMN */}
                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          prompt.visibility === "private"
                            ? "warning"
                            : "success"
                        }
                        className="flex justify-center items-center gap-1 text-black/80"
                      >
                        {prompt.visibility === "private" ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                        <div className="text-center font-semibold">
                          {prompt.visibility === "private"
                            ? "Private"
                            : "Public"}
                        </div>
                      </Chip>
                    </Table.Cell>

                    {/* STATUS COLUMN */}
                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          prompt.status === "approved"
                            ? "success text-green-500"
                            : "text-red-500"
                        }
                      >
                        <div className="text-center text-black/80 font-semibold">
                          {/* {prompt.status === "approved"
                            ? "Approved"
                            : prompt.status === "pending"
                              ? "Pending"
                              : "Rejected"} */}

                          {prompt.status === "pending" ? (
                            <span className="text-yellow-500 border border-yellow-500 rounded-full px-3 py-1 bg-orange-100">
                              {" "}
                              Pending
                            </span>
                          ) : prompt.status === "rejected" ? (
                            <span className="text-red-500 border border-red-500 rounded-full px-3 py-1 bg-red-100">
                              {" "}
                              Rejected
                            </span>
                          ) : null}
                        </div>
                      </Chip>
                    </Table.Cell>

                    {/* COPIES COLUMN */}
                    <Table.Cell className="text-center text-black/80 font-semibold">
                      {prompt.copyCount || 0}
                    </Table.Cell>

                    {/* RATING COLUMN */}
                    <Table.Cell className="text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <Star size={15} fill="#facc15" stroke="#facc15" />

                        <span className="font-medium text-black/80">
                          {prompt.rating.toFixed(1)}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* ACTIONS COLUMN (৪টি চমৎকার বাটন) */}
                    <Table.Cell className="p-2">
                      <div className="grid grid-cols-4 gap-1 items-center justify-center flex-wrap">
                        {/* View Details */}
                        <div>
                          <Link
                            href={`/prompts/${getPromptId(prompt)}?returnTo=/dashboard/user/my-prompts`}
                            isIconOnly
                            size="sm"
                            variant="flat"
                            color="primary"
                            title="View Details"
                            className="p-2 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800/80 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 text-white" />
                          </Link>
                        </div>
                        {/* Edit Prompt */}

                        <div>
                          <UpdatePromptModal
                            prompt={prompt}
                            onUpdated={() => router.refresh()}
                          />
                        </div>

                        {/* View Analytics */}

                        <div>
                          <PromptAnalyticsModal prompt={prompt} />
                        </div>

                        {/* Delete Prompt */}

                        <div>
                          <DeletePromptModal
                            prompt={prompt}
                            user={user}
                            onDeleted={() => router.refresh()}
                          />
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>

      {/* Empty State fallback */}
      {prompts.length === 0 && (
        <div className=" overflow-x-auto text-center py-12 text-zinc-500 text-sm bg-zinc-950/20">
          No prompt templates found. Create your first template.
        </div>
      )}
    </div>
  );
}
