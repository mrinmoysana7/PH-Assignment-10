import ReportedPromptsList from "@/components/admin/ReportedPromptsList";
import { getReportedPrompts } from "@/lib/api/reports";

export default async function ReportedPromptsPage() {
  const reports = await getReportedPrompts();

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-10 xl:px-5 py-22 lg:py-10">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-2xl md:text-4xl font-bold">
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
