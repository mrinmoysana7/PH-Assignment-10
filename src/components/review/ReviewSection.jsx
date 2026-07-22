"use client";

import { useMemo, useState } from "react";
import { Button, Card } from "@heroui/react";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import { Crown } from "lucide-react";
import { Lock } from "@gravity-ui/icons";
import Link from "next/link";

export default function ReviewSection({
  prompt,
  user,
  reviews,
  isLocked,
  onReviewAdded,
}) {
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

  // নতুন রিভিউ সাবমিট হলে লোকাল স্টেট এবং প্যারেন্ট কম্পোনেন্ট উভয়কেই আপডেট করা
  const handleReviewAdded = (newReview) => {
    const updatedList = [newReview, ...reviewList];
    setReviewList(updatedList);

    // নতুন গড় রেটিং হিসাব করে প্যারেন্টে পাঠানো
    const total = updatedList.reduce((sum, r) => sum + Number(r.rating), 0);
    const newAvgRating = Number((total / updatedList.length).toFixed(1));

    if (onReviewAdded) {
      onReviewAdded(newReview, newAvgRating);
    }
  };

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div>
            <h2 className="text-[22px] md:text-3xl font-bold text-slate-900">
              Community Reviews
              <span className="ml-2 text-violet-600">
                ({reviewList.length})
              </span>
              {isLocked && (
                <span className="ml-3 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  Premium Only
                </span>
              )}
            </h2>
          </div>

          <p className="mt-2 text-slate-500">
            Share your experience and help other users choose better prompts.
          </p>
        </div>

        <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
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
        {isLocked ? (
          <Card className="rounded-3xl border border-amber-300 bg-linear-to-br from-amber-50 to-orange-50 shadow-sm">
            <Card.Content className="p-8 text-center">
              <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-amber-100">
                <Crown size={34} className="text-amber-600" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Premium Reviews
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Upgrade your account to write reviews, rate premium prompts and
                help other users.
              </p>

              <Link
                href="/pricing"
                className="mt-8 inline-block w-full rounded-xl bg-amber-600 py-3 text-center font-bold text-white shadow-md hover:bg-amber-700"
              >
                Upgrade to Premium
              </Link>
            </Card.Content>
          </Card>
        ) : (
          <ReviewForm
            promptId={prompt._id}
            user={user}
            hasReviewed={hasReviewed}
            onSuccess={handleReviewAdded}
          />
        )}

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
          ) : isLocked ? (
            <Card className="rounded-3xl border border-dashed border-slate-300">
              <Card.Content className="flex min-h-70 flex-col items-center justify-center p-8 text-center">
                <Lock size={34} className="text-slate-400" />

                <h3 className="mt-5 text-xl font-bold">Reviews Hidden</h3>

                <p className="mt-3 max-w-sm leading-7 text-slate-500">
                  Upgrade to Premium to read community reviews and ratings for
                  this prompt.
                </p>

                <Button
                  as={Link}
                  href="/pricing"
                  color="warning"
                  className="mt-6"
                >
                  Unlock Reviews
                </Button>
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
