"use client";

import { useState } from "react";

import { Button } from "@heroui/react";

import { Flag } from "lucide-react";

import ReportPromptModal from "./ReportPromptModal";

export default function ReportPromptButton({ prompt, user }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        isIconOnly
        variant="flat"
        onPress={() => setOpen(true)}
        className="bg-slate-100 h-10 px-3 rounded-lg hover:bg-slate-200 hover:cursor-pointer border border-slate-200"
      >
        <Flag size={18} />
      </Button>

      <ReportPromptModal
        open={open}
        setOpen={setOpen}
        prompt={prompt}
        user={user}
      />
    </>
  );
}
