"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Card, Button, Textarea, TextArea } from "@heroui/react";
import { Send, Star } from "lucide-react";
import RatingStars from "../rating/RatingStars";
import { submitReview } from "@/lib/api/reviews";
// import { useRouter } from "next/navigation";

export default function ReviewForm({
  promptId,
  user,
  onSuccess,
  hasReviewed = false,
}) {
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

//   const router = useRouter();

  /* ==========================================
                SUBMIT REVIEW
  ========================================== */

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your review.");
      return;
    }

    try {
      setLoading(true);

      const result = await submitReview(
        promptId,

        {
          userId: user.id,
          userName: user.name,
          userImage: user.image,
          rating,
          comment,
        },
      );

      if (!result.success) {
        toast.error(result.message);

        return;
      }

      toast.success("Review submitted successfully.");
    //   router.refresh();

      setRating(0);
      setComment("");
      onSuccess?.(result.review);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col space-y-6 p-6 sm:p-8">
        {/* Heading */}
        <div>
          <h3 className="text-xl font-bold text-slate-900">Submit a Review</h3>
          <p className="mt-1 text-sm text-slate-500">
            Share your experience with this prompt.
          </p>
        </div>

        {/* Already Reviewed */}

        {hasReviewed ? (
          <div
            className="
      rounded-xl
      border
      border-emerald-200
      bg-emerald-50
      px-5
      py-4
    "
          >
            <div className="flex items-start gap-3">
              <div
                className="
          mt-0.5
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          bg-emerald-100
        "
              >
                <svg
                  className="h-4 w-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div>
                <h4 className="font-semibold text-emerald-700">
                  Review Submitted
                </h4>

                <p className="mt-1 text-sm leading-6 text-emerald-600">
                  You have already reviewed this prompt template. Thank you for
                  your valuable feedback.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Rating */}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Rating
              </label>

              <RatingStars value={rating} interactive onChange={setRating} />
            </div>

            {/* Comment */}

            <div className="mt-5 flex flex-col space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Comment
              </label>

              <TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here. What worked? How did you test it?"
                minRows={4}
                radius="md"
                variant="bordered"
                className="
          h-40
          border-2
          rounded-lg
          border-gray-200
          pl-5
          pt-3
          transition
          focus:border-violet-500
          focus:ring-4
          focus:ring-violet-100
        "
              />
            </div>

            {/* Submit */}

            <Button
              fullWidth
              size="lg"
              isLoading={loading}
              startContent={!loading && <Send size={18} />}
              onPress={handleSubmit}
              className="
        rounded-lg
        bg-violet-600
        py-3
        font-semibold
        text-white
        shadow-md
        shadow-violet-500/20
        transition-all
        hover:-translate-y-0.5
        hover:shadow-xl
        data-[hover=true]:bg-violet-700
      "
            >
              Submit Review
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
