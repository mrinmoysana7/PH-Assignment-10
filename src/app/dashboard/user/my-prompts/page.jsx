// src/app/dashboard/my-prompts/page.jsx
import PromptsTable from "@/components/dashboard/PromptsTable";

import { getUserPrompts } from "@/lib/api/prompts"; // ইউজার ভিত্তিক প্রম্পট আনার API
import { getLoggedInUser } from "@/lib/api/user";

const MyPromptsPage = async () => {
  // ১. বর্তমানে লগইন থাকা ইউজারকে গেট করুন
  const user = await getLoggedInUser();

  // ২. শুধুমাত্র এই ইউজারের তৈরি করা প্রম্পটগুলো ডেটাবেজ থেকে নিয়ে আসুন
  const prompts = await getUserPrompts(user.id);

  return (
    <div className="max-w-7xl mx-auto py-22 lg:py-10 w-full px-6">
      {/* Header */}

      <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-8 shadow-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              My Product Reviews
            </h1>

            <p className="max-w-2xl mb-3 text-slate-400">
              Feedback and ratings you have posted on the PromptVerse
              marketplace.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-6 py-5">
            <p className="text-xs uppercase tracking-widest text-violet-300">
              Total Prompts
            </p>

            <h2 className="mt-2 text-4xl font-bold text-white">
              {prompts.length}
            </h2>
          </div>
        </div>
      </div>

      {/* ৩. টেবিলে প্রম্পট ডাটা পাস করুন */}
      <PromptsTable prompts={prompts} user={user} />
    </div>
  );
};

export default MyPromptsPage;
