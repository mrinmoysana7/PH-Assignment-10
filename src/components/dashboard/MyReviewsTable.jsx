"use client";

import Link from "next/link";

import { Table, Chip } from "@heroui/react";

import { Eye, CalendarDays, Star } from "lucide-react";

export default function MyReviewsTable({ reviews = [] }) {
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getPromptId = (review) =>
    review.promptId?.$oid || review.promptId || review.prompt?._id;

  return (
    <div
      className="
        mt-8
        overflow-x-auto
        rounded-3xl
        border
        border-slate-800
        bg-[#0F172A]
        shadow-2xl
      "
    >
      <Table aria-label="My Reviews Table" removeWrapper className="min-w-300">
        <Table.ResizableContainer>
          <Table.Content>
            {/* Header */}

            <Table.Header className="bg-[#131C33]">
              <Table.Column
                isRowHeader
                minWidth={300}
                className="
                  border-r
                  border-slate-800
                  px-6
                  py-5
                  text-xs
                  font-bold
                  tracking-widest
                  text-slate-400
                  uppercase
                "
              >
                Prompt Title
              </Table.Column>

              <Table.Column
                minWidth={180}
                className="
                  border-r
                  border-slate-800
                  px-6
                  text-xs
                  font-bold
                  tracking-widest
                  text-slate-400
                  uppercase
                "
              >
                AI Tool
              </Table.Column>

              <Table.Column
                minWidth={120}
                className="
                  border-r
                  border-slate-800
                  text-center
                  text-xs
                  font-bold
                  tracking-widest
                  text-slate-400
                  uppercase
                "
              >
                Rating
              </Table.Column>

              <Table.Column
                minWidth={320}
                className="
                  border-r
                  border-slate-800
                  px-6
                  text-xs
                  font-bold
                  tracking-widest
                  text-slate-400
                  uppercase
                "
              >
                Comment
              </Table.Column>

              <Table.Column
                minWidth={170}
                className="
                  border-r
                  border-slate-800
                  text-xs
                  font-bold
                  tracking-widest
                  text-slate-400
                  uppercase
                "
              >
                Submitted Date
              </Table.Column>

              <Table.Column
                minWidth={130}
                className="
                  text-center
                  text-xs
                  font-bold
                  tracking-widest
                  text-slate-400
                  uppercase
                "
              >
                Action
              </Table.Column>
            </Table.Header>

            {/* Body */}

            <Table.Body>
              {reviews.map((review) => (
                <Table.Row
                  key={review._id}
                  className="
                    border-b
                    border-slate-800
                    transition
                    hover:bg-slate-800/30
                  "
                >
                  {/* Prompt */}

                  <Table.Cell className="px-6 py-6">
                    <div className="max-w-65">
                      <h3
                        className="
                          truncate
                          font-semibold
                          text-white
                        "
                      >
                        {review.promptTitle}
                      </h3>
                    </div>
                  </Table.Cell>

                  {/* AI */}

                  <Table.Cell className="px-6">
                    <Chip
                      size="sm"
                      variant="flat"
                      className="
                        border
                        border-violet-600/40
                        bg-violet-500/10
                        text-violet-400
                        font-semibold
                      "
                    >
                      {review.aiToolName}
                    </Chip>
                  </Table.Cell>

                  {/* Rating */}

                  <Table.Cell>
                    <div className="flex items-center justify-center gap-1">
                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-semibold text-white">
                        {Number(review.rating).toFixed(1)}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Comment */}

                  <Table.Cell className="px-6">
                    <p
                      className="
                        max-w-65
                        truncate
                        text-slate-300
                      "
                    >
                      {review.comment}
                    </p>
                  </Table.Cell>

                  {/* Date */}

                  <Table.Cell>
                    <div className="flex items-center gap-2 text-slate-400">
                      <CalendarDays size={15} />

                      {formatDate(review.createdAt)}
                    </div>
                  </Table.Cell>

                  {/* View */}

                  <Table.Cell>
                    <div className="flex justify-center">
                      <Link
                        href={`/prompts/${getPromptId(
                          review,
                        )}?returnTo=/dashboard/user/my-reviews`}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-slate-700
                          bg-slate-800
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:border-violet-500
                          hover:bg-violet-600
                        "
                      >
                        <Eye size={16} />
                        View
                      </Link>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>

      {/* Empty State */}

      {reviews.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-xl font-semibold text-white">No Reviews Found</h3>

          <p className="mt-3 text-slate-400">
            You havent submitted any reviews yet.
          </p>
        </div>
      )}
    </div>
  );
}
