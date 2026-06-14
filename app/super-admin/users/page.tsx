"use client";

import { useState } from "react";
import {
  Search,
  Users,
  Shield,
  UserCog,
  Stethoscope,
  GraduationCap,
  MoreHorizontal,
  Plus,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "AK Shuvo",
    email: "akshuvo@gmail.com",
    role: "Super Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Sarah Wilson",
    email: "sarah@gmail.com",
    role: "Doctor",
    status: "Active",
  },
  {
    id: 4,
    name: "Michael Lee",
    email: "michael@gmail.com",
    role: "Counselor",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma@gmail.com",
    role: "Student",
    status: "Active",
  },
];

export default function SuperAdminUsersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}

      <section className="rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-8 text-white shadow-2xl">
        <h1 className="text-4xl font-bold">
          User Management
        </h1>

        <p className="mt-3 max-w-2xl text-white/90">
          Manage students, counselors, doctors,
          admins, and platform access permissions.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-500">
              Total Users
            </h3>

            <Users className="h-5 w-5 text-violet-500" />
          </div>

          <p className="mt-4 text-3xl font-bold">
            12,458
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-500">
              Students
            </h3>

            <GraduationCap className="h-5 w-5 text-emerald-500" />
          </div>

          <p className="mt-4 text-3xl font-bold">
            10,920
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-500">
              Doctors
            </h3>

            <Stethoscope className="h-5 w-5 text-cyan-500" />
          </div>

          <p className="mt-4 text-3xl font-bold">
            324
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-500">
              Admins
            </h3>

            <Shield className="h-5 w-5 text-rose-500" />
          </div>

          <p className="mt-4 text-3xl font-bold">
            18
          </p>
        </div>
      </section>

      {/* Controls */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-violet-500
                dark:border-slate-700
                dark:bg-slate-800
              "
            />
          </div>

          <button
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              to-fuchsia-600
              px-5
              py-3
              font-semibold
              text-white
              transition-all
              hover:-translate-y-1
            "
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>
      </section>

      {/* Users Table */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-violet-500
                          to-fuchsia-500
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {user.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium">
                          {user.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className="
                        rounded-full
                        bg-violet-100
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-violet-700
                        dark:bg-violet-500/10
                        dark:text-violet-400
                      "
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button
                      className="
                        rounded-xl
                        p-2
                        transition-all
                        hover:bg-slate-100
                        dark:hover:bg-slate-800
                      "
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Permissions */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <UserCog className="h-6 w-6 text-violet-500" />

          <h2 className="text-xl font-bold">
            Role Permissions Overview
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Student",
            "Counselor",
            "Doctor",
            "Admin",
            "Super Admin",
          ].map((role) => (
            <div
              key={role}
              className="
                rounded-2xl
                border
                border-slate-200
                p-4
                dark:border-slate-800
              "
            >
              <h3 className="font-semibold">
                {role}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Access permissions managed
                through role-based security.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}