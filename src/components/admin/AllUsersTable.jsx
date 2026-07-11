"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


import { Table, Button } from "@heroui/react";

import {  Person, Calendar } from "@gravity-ui/icons";

import DeleteUserModal from "./DeleteUserModal";
import Image from "next/image";
import { updateUserRole } from "@/lib/api/users";

export default function AllUsersTable({ users = [] }) {
  const router = useRouter();

  const [loadingUser, setLoadingUser] = useState(null);



  const getUserId = (user) => user?._id || user?.id || "";

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB");
  };



  const handleRoleChange = async (userId, role) => {
    if (!role) return;

    try {
      setLoadingUser(userId);

      const result = await updateUserRole(userId, role);

      if (!result.success) {
        alert(result.message);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update role.");
    } finally {
      setLoadingUser(null);
    }
  };

  return (
    <div
      className="
      mt-8
      overflow-x-auto
      rounded-3xl
      border
      border-slate-800
      bg-[#0F172A]
      shadow-2xl
    "
    >
      <Table aria-label="All Users Table">
        <Table.ResizableContainer>
          <Table.Content>
            <Table.Header className="bg-[#131C33]">
              <Table.Column
                isRowHeader
                minWidth={260}
                className="
                px-5
                py-4
                text-xs
                font-bold
                tracking-wider
                uppercase
                text-slate-400
                text-start
              "
              >
                PROFILE DETAILS
              </Table.Column>

              <Table.Column
                minWidth={260}
                className="
                text-xs
                uppercase
                tracking-wider
                font-bold
                text-slate-400
                text-start
              "
              >
                EMAIL ADDRESS
              </Table.Column>

              <Table.Column
                minWidth={160}
                className="
                text-xs
                uppercase
                tracking-wider
                font-bold
                text-slate-400
                text-start
              "
              >
                SUBSCRIPTION
              </Table.Column>

              <Table.Column
                minWidth={200}
                className="
                text-xs
                uppercase
                tracking-wider
                font-bold
                text-slate-400
                text-start
              "
              >
                ROLE LEVEL
              </Table.Column>

              <Table.Column
                minWidth={120}
                className="
                text-xs
                uppercase
                tracking-wider
                font-bold
                text-slate-400
                text-start
              "
              >
                REGISTERED DATE
              </Table.Column>

              <Table.Column
                minWidth={70}
                className="
                text-xs
                uppercase
                tracking-wider
                font-bold
                text-slate-400
                text-center
              "
              >
                ACTIONS
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {users.map((user) => {
                const userId = getUserId(user);

                return (
                  <Table.Row
                    key={userId}
                    className="
        border-b
        border-slate-800
        hover:bg-slate-900/40
        transition-colors
      "
                  >
                    {/* ================================= */}
                    {/* PROFILE */}
                    {/* ================================= */}

                    <Table.Cell className="px-5 py-5">
                      <div className="flex items-center gap-4">
                        <Image
                          alt="image"
                          width={30}
                          height={5}
                          src={user?.image || ""}
                          className="ring-2 ring-violet-500/20 rounded-full"
                        />

                        <div className="flex flex-col">
                          <h3 className="font-semibold text-white">
                            {user.name || "Unknown User"}
                          </h3>

                          <p className="text-sm text-slate-400">
                            {user.role?.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* ================================= */}
                    {/* EMAIL */}
                    {/* ================================= */}

                    <Table.Cell>
                      <span className="text-slate-300">{user.email}</span>
                    </Table.Cell>

                    {/* ================================= */}
                    {/* PLAN */}
                    {/* ================================= */}

                    <Table.Cell>
                      <div className="">
                        <span
                          className={`
        px-3
        py-1
        rounded-full
        text-[11px]
        font-bold
        uppercase
        tracking-wide
        border

        ${
          user.plan === "premium"
            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
            : "bg-amber-500/15 border-amber-500/30 text-amber-400"
        }
      `}
                        >
                          {user.plan || "FREE"}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* ================================= */}
                    {/* ROLE */}
                    {/* ================================= */}

                    

                    <Table.Cell>
                      <div className="">
                        <select
                          value={user.role || "user"}
                          onChange={(e) =>
                            handleRoleChange(userId, e.target.value)
                          }
                          disabled={loadingUser === userId}
                          className={`
        w-32
        rounded-xl
        border
        px-3
        py-2
        text-sm
        font-semibold
        outline-none
        bg-[#131C33]

        ${
          user.role === "admin"
            ? "border-red-500/40 text-red-400"
            : user.role === "creator"
              ? "border-cyan-500/40 text-cyan-400"
              : "border-violet-500/40 text-white"
        }
      `}
                        >
                          <option value="user">User</option>
                          <option value="creator">Creator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </Table.Cell>

                    {/* ================================= */}
                    {/* REGISTER DATE */}
                    {/* ================================= */}

                    <Table.Cell>
                      <div className="flex justify-start items-center gap-2 text-slate-400">
                        <Calendar width={14} />

                        <span>{formatDate(user.createdAt)}</span>
                      </div>
                    </Table.Cell>

                    {/* ================================= */}
                    {/* ACTIONS */}
                    {/* ================================= */}

                    <Table.Cell>
                      <div className="flex justify-center">
                        <DeleteUserModal
                          user={user}
                          onDeleted={() => router.refresh()}
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>

      {/* ========================================= */}
      {/* EMPTY STATE */}
      {/* ========================================= */}

      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24">
          <Person width={55} height={55} className="text-slate-500 mb-5" />

          <h3 className="text-2xl font-bold text-white">No Users Found</h3>

          <p className="mt-3 text-slate-400 max-w-md text-center">
            There are currently no registered users available in the system.
          </p>

          <Button
            size="lg"
            color="secondary"
            className="mt-8"
            onPress={() => router.refresh()}
          >
            Refresh
          </Button>
        </div>
      )}
    </div>
  );
}
