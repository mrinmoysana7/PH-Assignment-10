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
    <div className="max-w-7xl mx-auto py-22 lg:py-10 w-full px-5 sm:px-6 md:px-10 lg:px-15">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">
          My Prompt Templates
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Review approval statuses, change details, and check analytics.
        </p>
      </div>

      {/* ৩. টেবিলে প্রম্পট ডাটা পাস করুন */}
      <PromptsTable prompts={prompts} user={user} />
    </div>
  );
};

export default MyPromptsPage;
