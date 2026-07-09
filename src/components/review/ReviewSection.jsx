"use client";

import { useMemo, useState } from "react";

import { Card } from "@heroui/react";

import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";

export default function ReviewSection({ prompt, user, reviews }) {
  const [reviewList, setReviewList] = useState(reviews);
  /* ===============================
            CALCULATIONS
  =============================== */

  const averageRating = useMemo(() => {
    if (!reviewList.length) return 0;

    const total = reviewList.reduce(
      (sum, review) => sum + Number(review.rating),
      0,
    );

    return (total / reviewList.length).toFixed(1);
  }, [reviewList]);

  const hasReviewed = reviewList.some(
    (review) => String(review.userId) === String(user?.id),
  );

  const handleReviewAdded = (Review) => {
    setReviewList((prev) => [Review, ...prev]);
  };

  return (
    <section className="mt-12">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Community Reviews
            <span className="ml-2 text-violet-600">({reviewList.length})</span>
          </h2>

          <p className="mt-2 text-slate-500">
            Share your experience and help other users choose better prompts.
          </p>
        </div>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Card.Content className="flex items-center gap-6 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Average Rating
              </p>

              <h3 className="mt-1 text-3xl font-bold text-slate-900">
                {averageRating}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-none text-slate-300"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.8"
                    d="M12 2l2.9 6 6.6.8-4.8 4.6 1.3 6.5L12 16.8 6 19.9l1.3-6.5L2.5 8.8 9.1 8z"
                  />
                </svg>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Content */}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left */}

        <ReviewForm
          promptId={prompt._id}
          user={user}
          hasReviewed={hasReviewed}
          onSuccess={handleReviewAdded}
        />

        {/* Right */}

        <div className="space-y-5">
          {reviewList.length === 0 ? (
            <Card className="rounded-2xl border border-dashed border-slate-300 shadow-sm">
              <Card.Content className="flex min-h-62.5 flex-col items-center justify-center p-10 text-center">
                <h3 className="text-xl font-semibold text-slate-800">
                  No Reviews Yet
                </h3>

                <p className="mt-3 max-w-md text-slate-500">
                  Be the first person to review this prompt and help the
                  community.
                </p>
              </Card.Content>
            </Card>
          ) : (
            reviewList.map((review) => (
              <ReviewCard key={review._id} review={review} currentUser={user} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
