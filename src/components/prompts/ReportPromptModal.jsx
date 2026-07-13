"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import { Button } from "@heroui/react";

import { ShieldAlert } from "lucide-react";

import Modal from "../ui/Modal";
import { submitReport } from "@/lib/api/reports";

export default function ReportPromptModal({ open, setOpen, prompt, user }) {
  const [reason, setReason] = useState("Inappropriate Content");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);

    setReason("Inappropriate Content");

    setDescription("");
  };

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Please select a reason.");

      return;
    }

    try {
      setLoading(true);

      const payload = {
        promptId: prompt._id,

        promptTitle: prompt.promptTitle,

        promptImage: prompt.image,

        creator: {
          id: prompt.creatorInformation.id,
          name: prompt.creatorInformation.name,
          email: prompt.creatorInformation.email,
          image: prompt.creatorInformation.image,
        },

        reporter: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },

        reason,

        description,
      };

      console.log(payload);

      const res = await submitReport(payload);

      if (res.success) {
        toast.success("Report submitted successfully.");

        handleClose();
      } else {
        toast.error(res.message || "Failed to submit report.");
      }
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      width="max-w-2xl"
      icon={<ShieldAlert size={24} />}
      title="Report Prompt Template"
      description="Help us maintain community standards."
      footer={
        <>
          <Button
            variant="bordered"
            onPress={handleClose}
            className="
              border-slate-600
              bg-[#1E293B]
              text-white
              hover:bg-slate-700
              p-2
              rounded-lg
            "
          >
            Cancel
          </Button>

          <Button
            color="danger"
            isLoading={loading}
            onPress={handleSubmit}
            className="
              bg-linear-to-r
              from-red-600
              to-red-500
              text-white
              p-2
              rounded-lg
            "
          >
            Submit Report
          </Button>
        </>
      }
    >
      <div className="space-y-7">
        {/* Description */}

        <p className="text-[15px] leading-7 text-slate-400">
          Help us maintain community standards. If this prompt contains
          malicious instructions, plagiarized files, spam content or violates
          our guidelines, please report it below.
        </p>

        {/* Reason */}

        <div className="space-y-3">
          <label
            className="
              block
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-slate-400
            "
          >
            Reason
          </label>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-[#151D30]
              px-5
              text-white
              outline-none
              transition
              focus:border-red-500
            "
          >
            <option>Inappropriate Content</option>

            <option>Spam</option>

            <option>Copyright Violation</option>

            <option>Harassment</option>

            <option>Fake Information</option>

            <option>Other</option>
          </select>
        </div>

        {/* Description */}

        <div className="space-y-3">
          <label
            className="
              block
              text-xs
              font-bold
              uppercase
              tracking-widest
              text-slate-400
            "
          >
            Additional Description (Optional)
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide details about the infraction..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-slate-700
              bg-[#151D30]
              px-5
              py-4
              text-white
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-red-500
            "
          />
        </div>
      </div>
    </Modal>
  );
}
