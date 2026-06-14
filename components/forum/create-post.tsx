"use client";

import { MessageCircle, Send } from "lucide-react";

export default function CreatePost() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3 dark:bg-emerald-500/10">
          <MessageCircle className="h-6 w-6 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Share Your Thoughts
          </h2>

          <p className="text-sm text-slate-500">
            Post anonymously and connect with peers.
          </p>
        </div>
      </div>

      <textarea
        rows={5}
        placeholder="What's on your mind today?"
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none transition-all focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
      />

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Anonymous Posting Enabled
        </span>

        <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg">
          <Send className="h-4 w-4" />
          Publish
        </button>
      </div>
    </div>
  );
}