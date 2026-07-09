"use client";

import Image from "next/image";

import { Card, Button } from "@heroui/react";

import { Calendar, Pencil, Trash2, Star } from "lucide-react";
import RatingStars from "../rating/RatingStars";

export default function ReviewCard({ review, currentUser, onEdit, onDelete }) {
  const isOwner =
    currentUser &&
    (currentUser.id === review.userId || currentUser._id === review.userId);

  const reviewDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Unknown";

  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <Card.Content className="p-5">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={review.userImage || "/default-avatar.png"}
              alt={review.userName || "User"}
              width={42}
              height={42}
              className="rounded-full border border-slate-200 object-cover"
            />

            <div>
              <h4 className="font-semibold text-slate-900">
                {review.userName || "Anonymous"}
              </h4>

              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Calendar size={12} />

                <span>{reviewDate}</span>
              </div>
            </div>
          </div>

          {/* Rating */}

          <RatingStars value={review.rating} size={16} />
        </div>

        {/* Comment */}

        <div className="mt-5">
          <p className="leading-7 text-slate-600 whitespace-pre-wrap">
            {review.comment}
          </p>
        </div>

        {/* Actions */}

        {isOwner && (
          <div className="mt-5 flex justify-end gap-2 border-t border-slate-200 pt-4">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="secondary"
              onPress={() => onEdit?.(review)}
            >
              <Pencil size={16} />
            </Button>

            <Button
              isIconOnly
              size="sm"
              variant="flat"
              color="danger"
              onPress={() => onDelete?.(review)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
