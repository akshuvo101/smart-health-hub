"use client";

import { useState } from "react";
import {
  Shield,
  Search,
  UserCog,
  Save,
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    role: "student",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@gmail.com",
    role: "counselor",
  },
  {
    id: 3,
    name: "Dr. Michael",
    email: "doctor@gmail.com",
    role: "doctor",
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@gmail.com",
    role: "admin",
  },
];

export default function RolesPage() {
  const [users, setUsers] =
    useState(mockUsers);

  const updateRole = (
    id: number,
    role: string
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              role,
            }
          : user
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Role Management
          </h1>

          <p className="mt-1 text-slate-500">
            Manage platform roles and permissions
          </p>
        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-indigo-600
            px-5
            py-3
            font-medium
            text-white
            transition-all
            hover:shadow-lg
          "
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Students
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            420
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Counselors
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            25
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Doctors
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            18
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Admins
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            4
          </h2>
        </div>
      </section>

      {/* Search */}

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search user..."
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            py-3
            pl-11
            pr-4
            dark:border-slate-800
            dark:bg-slate-900
          "
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left">
                User
              </th>

              <th className="px-6 py-4 text-left">
                Email
              </th>

              <th className="px-6 py-4 text-left">
                Role
              </th>

              <th className="px-6 py-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t dark:border-slate-800"
              >
                <td className="px-6 py-5 font-medium">
                  {user.name}
                </td>

                <td className="px-6 py-5 text-slate-500">
                  {user.email}
                </td>

                <td className="px-6 py-5">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      updateRole(
                        user.id,
                        e.target.value
                      )
                    }
                    className="
                      rounded-xl
                      border
                      border-slate-200
                      px-3
                      py-2
                      dark:border-slate-700
                      dark:bg-slate-800
                    "
                  >
                    <option value="student">
                      Student
                    </option>

                    <option value="counselor">
                      Counselor
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                    <option value="super_admin">
                      Super Admin
                    </option>
                  </select>
                </td>

                <td className="px-6 py-5">
                  <button
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-indigo-500
                      px-4
                      py-2
                      text-white
                    "
                  >
                    <UserCog className="h-4 w-4" />
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-3">
          <Shield className="h-6 w-6 text-indigo-500" />

          <h2 className="text-xl font-semibold">
            Role Permissions
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="font-semibold">
              Student
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Wellness tracking, assessments,
              appointments.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="font-semibold">
              Counselor
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Student sessions, reports, AI
              support.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="font-semibold">
              Doctor
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Medical assessments, prescriptions,
              reports.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              User management, appointments,
              moderation.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="font-semibold">
              Super Admin
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Full platform control and security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}