"use client";

import React from "react";
import { Table, Chip } from "@heroui/react";
import {
  Eye,
  Pencil,
  Trash2,
  BarChart3,
  Lock,
  Unlock,
  Star,
} from "lucide-react";

export default function PromptsTable({ prompts = [] }) {
  console.log("PromptsTable received prompts:", prompts); // Debugging line
  const getPromptId = (prompt) => prompt._id?.$oid || prompt._id;

  return (
    <div className="container mx-auto mt-6 rounded-2xl border border-gray-200 bg-white shadow-xl overflow-x-auto">
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
                minWidth={150}
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
                    <Table.Cell className="">
                      <div className="flex gap-2 items-center justify-center flex-wrap">
                        {/* View Details */}
                        {/* <button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="primary"
                          title="View Details"
                          className="p-2 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800/80 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </button> */}
                        {/* Edit Prompt */}
                        <button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="secondary"
                          title="Edit Prompt"
                          className="p-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800/80 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-white" />
                        </button>
                        {/* View Analytics */}
                        <button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="success"
                          title="View Analytics"
                          className="p-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800/80 rounded-lg transition-colors"
                        >
                          <BarChart3 className="w-4 h-4 text-white" />
                        </button>
                        {/* Delete Prompt */}
                        <button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="danger"
                          title="Delete Prompt"
                          className="p-2 bg-red-200 hover:bg-red-500 border border-red-500 hover:border-red-900/50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 hover:text-white text-red-500" />
                        </button>
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
        <div className="text-center py-12 text-zinc-500 text-sm bg-zinc-950/20">
          No prompt templates found. Create your first template.
        </div>
      )}
    </div>
  );
}
