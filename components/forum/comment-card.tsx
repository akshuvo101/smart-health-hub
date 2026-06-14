import { Heart, Reply } from "lucide-react";

interface CommentCardProps {
  author: string;
  comment: string;
}

export default function CommentCard({
  author,
  comment,
}: CommentCardProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-slate-900 dark:text-white">
          {author}
        </h4>

        <button className="text-slate-400 hover:text-emerald-500">
          <Reply className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {comment}
      </p>

      <button className="mt-3 flex items-center gap-2 text-sm text-slate-500 hover:text-red-500">
        <Heart className="h-4 w-4" />
        Like
      </button>
    </div>
  );
}