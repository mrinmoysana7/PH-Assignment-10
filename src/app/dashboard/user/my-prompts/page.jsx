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
    <div className="text-zinc-100 pt-10 mx-auto w-full px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">
          My Prompt Templates
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Review approval statuses, change details, and check analytics.
        </p>
      </div>

      {/* ৩. টেবিলে প্রম্পট ডাটা পাস করুন */}
      <PromptsTable prompts={prompts} />
    </div>
  );
};

export default MyPromptsPage;
