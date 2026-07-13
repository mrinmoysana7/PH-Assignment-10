import AdminPromptsTable from "@/components/admin/AdminPromptsTable";
import { getAllPrompts } from "@/lib/api/adminPrompts";

export default async function AdminPromptsPage() {
  const response = await getAllPrompts();

  const prompts = response?.prompts || [];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-10 xl:px-0 py-22 lg:py-10">
      {/* ================= Header ================= */}

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">
          Prompt Template Submissions Moderation
        </h1>

        <p className="mt-3 text-slate-400">
          Approve templates, reject with feedback, delete prompts, and manage
          featured prompt highlights.
        </p>
      </div>

      {/* ================= Table ================= */}

      <AdminPromptsTable prompts={prompts} />
    </div>
  );
}
