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
      width="max-w-md w-[92%] sm:w-full"
      icon={<ShieldAlert size={20} className="text-red-400" />}
      title="Report Prompt"
      description="Help us maintain standards."
      footer={
        <div className="flex items-center justify-end gap-2.5 w-full pt-2 border-t border-white/5">
          <Button
            variant="bordered"
            onPress={handleClose}
            className="h-9 px-4 rounded-xl border border-white/10 bg-[#131C33] text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all"
          >
            Cancel
          </Button>

          <Button
            color="danger"
            isLoading={loading}
            onPress={handleSubmit}
            className="h-9 px-4 rounded-xl bg-linear-to-r from-red-600 to-rose-500 text-xs font-semibold text-white shadow-md shadow-red-900/30 hover:from-red-500 hover:to-rose-400 transition-all"
          >
            Submit
          </Button>
        </div>
      }
    >
      <div className="space-y-4 max-h-[35vh] sm:max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
        {/* Intro Description */}
        <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
          If this prompt contains malicious content or violates guidelines,
          report it below.
        </p>

        {/* Reason Select Box */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Reason
          </label>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/10 bg-[#0B1221] px-3 text-xs sm:text-sm text-white outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          >
            <option>Inappropriate Content</option>
            <option>Spam</option>
            <option>Copyright Violation</option>
            <option>Harassment</option>
            <option>Fake Information</option>
            <option>Other</option>
          </select>
        </div>

        {/* Additional Description Textarea */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Additional Details{" "}
            <span className="text-slate-600 font-normal">(Optional)</span>
          </label>

          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe the issue..."
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0B1221] p-3 text-xs sm:text-sm text-white placeholder:text-slate-600 outline-none transition-all focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          />
        </div>
      </div>
    </Modal>
  );
}
