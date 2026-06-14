import {
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

import CommentCard from "./comment-card";

interface PostCardProps {
  author: string;
  content: string;
  time: string;
}

export default function PostCard({
  author,
  content,
  time,
}: PostCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {author}
          </h3>

          <p className="text-sm text-slate-500">
            {time}
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10">
          Anonymous
        </span>
      </div>

      <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
        {content}
      </p>

      <div className="mt-6 flex items-center gap-6 border-t border-slate-100 pt-4 dark:border-slate-800">
        <button className="flex items-center gap-2 text-slate-500 transition hover:text-red-500">
          <Heart className="h-5 w-5" />
          24
        </button>

        <button className="flex items-center gap-2 text-slate-500 transition hover:text-emerald-500">
          <MessageCircle className="h-5 w-5" />
          8
        </button>

        <button className="flex items-center gap-2 text-slate-500 transition hover:text-cyan-500">
          <Share2 className="h-5 w-5" />
          Share
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <CommentCard
          author="Student A"
          comment="You're not alone. I faced similar challenges last semester."
        />

        <CommentCard
          author="Student B"
          comment="Try taking short breaks and getting enough sleep."
        />
      </div>
    </div>
  );
}