import ReportedPromptsList from "@/components/admin/ReportedPromptsList";
import { getReportedPrompts } from "@/lib/api/reports";

export default async function ReportedPromptsPage() {
  const reports = await getReportedPrompts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Reported Prompts Moderation Queue
        </h1>

        <p className="mt-2 text-default-500">
          Review community warnings, warn creators, dismiss complaints, or
          remove posts.
        </p>
      </div>

      <ReportedPromptsList reports={reports} />
    </div>
  );
}
