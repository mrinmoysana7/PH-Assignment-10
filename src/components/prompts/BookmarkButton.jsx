// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Bookmark } from "lucide-react";

// import { Button } from "@heroui/react";

// import { checkBookmarkStatus } from "@/lib/api/bookmarks";
// import { authClient } from "@/lib/auth-client";
// import { toggleBookmark } from "@/lib/actions/bookmarks";

// export default function BookmarkButton({ promptId }) {
//   const { data: session } = authClient.useSession();

//   const user = session?.user;

//   const [bookmarked, setBookmarked] = useState(false);

//   const [loading, setLoading] = useState(false);

//   // Load Bookmark Status

//   useEffect(() => {
//     if (!user) return;

//     const loadBookmark = async () => {
//       const data = await checkBookmarkStatus(user.id, promptId);

//       setBookmarked(data.bookmarked);
//     };

//     loadBookmark();
//   }, [user, promptId]);

//   // Toggle Bookmark

//   const handleBookmark = async () => {
//     if (!user) {
//       toast.error("Please login first.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await toggleBookmark(user.id, promptId);

//       setBookmarked(result.bookmarked);

//       toast.success(result.message);
//     } catch {
//       toast.error("Bookmark failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button
//       isIconOnly
//       variant="flat"
//       isLoading={loading}
//       onPress={handleBookmark}
//       className="bg-slate-100"
//     >
//       <Bookmark
//         size={18}
//         className={
//           bookmarked ? "fill-indigo-600 text-indigo-600" : "text-slate-500"
//         }
//       />
//     </Button>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { Bookmark } from "lucide-react";

import { Button } from "@heroui/react";

import { authClient } from "@/lib/auth-client";

import { checkBookmarkStatus } from "@/lib/api/bookmarks";
import { toggleBookmark } from "@/lib/actions/bookmarks";

export default function BookmarkButton({ promptId }) {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [bookmarked, setBookmarked] = useState(false);

  const [loading, setLoading] = useState(false);

  // Load bookmark status
  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const result = await checkBookmarkStatus(user.id, promptId);

      if (result.success) {
        setBookmarked(result.bookmarked);
      }
    };

    load();
  }, [user, promptId]);

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    try {
      setLoading(true);

      const result = await toggleBookmark(user.id, promptId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setBookmarked(result.bookmarked);

      toast.success(result.message);
    } catch (error) {
      console.error(error);

      toast.error("Bookmark failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      isIconOnly
      variant="flat"
      isLoading={loading}
      onPress={handleBookmark}
      className="bg-slate-100 max-h-10 px-3 rounded-lg hover:bg-slate-200 hover:cursor-pointer border border-slate-200"
    >
      <Bookmark
        size={18}
        className={
          bookmarked ? "fill-indigo-600 text-indigo-600" : "text-slate-500"
        }
      />
    </Button>
  );
}
