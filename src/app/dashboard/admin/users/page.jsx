import AllUsersTable from "@/components/admin/AllUsersTable";
import { getAllUsers } from "@/lib/api/users";

export default async function AllUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-10 xl:px-0 py-22 lg:py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          User Role & Accounts Management
        </h1>

        <p className="text-default-500 mt-2">
          Review accounts, modify role scopes and delete users.
        </p>
      </div>

      <AllUsersTable users={users} />
    </div>
  );
}
