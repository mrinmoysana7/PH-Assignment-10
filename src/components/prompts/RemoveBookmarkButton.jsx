"use client";

import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { removeBookmark } from "@/lib/api/bookmarks";

export default function RemoveBookmarkButton({ promptId, userId }) {
  const router = useRouter();

  const handleRemove = async () => {
    try {
      const res = await removeBookmark({
        promptId,
        userId,
      });

      if (res.success) {
        toast.success("Bookmark removed");

        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong.");
    }
  };

  return (
    <Button
      isIconOnly
      color="danger"
      variant="flat"
      radius="md"
      onPress={handleRemove}
      className="
        bg-red-600/10
        hover:bg-red-600/20
        text-red-400
      "
    >
      <Trash2 size={18} />
    </Button>
  );
}
