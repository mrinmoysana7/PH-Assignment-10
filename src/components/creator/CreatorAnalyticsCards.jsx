import { FileText, Copy, Bookmark } from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

export default function CreatorAnalyticsCards({
  totalPrompts,

  totalCopies,

  totalBookmarks,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AnalyticsCard
        title="Total Prompts"
        value={totalPrompts}
        icon={<FileText size={22} />}
        color="violet"
      />

      <AnalyticsCard
        title="Total Copies"
        value={totalCopies}
        icon={<Copy size={22} />}
        color="cyan"
      />

      <AnalyticsCard
        title="Total Bookmarks"
        value={totalBookmarks}
        icon={<Bookmark size={22} />}
        color="emerald"
      />
    </div>
  );
}
