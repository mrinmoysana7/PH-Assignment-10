import ProfileCard from "@/components/dashboard/ProfileCard";
import { getProfile } from "@/lib/api/profile";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function MyProfilePage() {
  const session = await getUserSession();

  console.log('Session',session);

  if (!session) {
    redirect("/signin");
  }

  const profile = await getProfile(session.id);

  console.log("Profile Data:", profile);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-20 sm:py-20 md:py-22 lg:py-10 px-6 sm:px-8 md:px-10 lg:px-15">
      <div clasName="">
        <h1 className="text-3xl font-bold">User Account Profile</h1>

        <p className="mt-2 text-zinc-400">
          Manage your plan, credentials and published prompt details.
        </p>
      </div>

      <ProfileCard profile={profile} />
    </div>
  );
}
