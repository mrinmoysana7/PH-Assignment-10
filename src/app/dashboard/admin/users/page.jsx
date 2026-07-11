import AllUsersTable from "@/components/admin/AllUsersTable";
import { getAllUsers } from "@/lib/api/users";

export default async function AllUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">User Role & Accounts Management</h1>

        <p className="text-default-500 mt-2">
          Review accounts, modify role scopes and delete users.
        </p>
      </div>

      <AllUsersTable users={users} />
    </div>
  );
}
