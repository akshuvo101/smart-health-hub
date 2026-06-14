const posts = [
  {
    title: "Managing Exam Stress",
    author: "Anonymous",
    replies: 24,
  },
  {
    title: "Tips For Better Sleep",
    author: "Anonymous",
    replies: 17,
  },
];

export default function ForumPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-white">
        <h1 className="text-4xl font-bold">
          Forum Moderation
        </h1>

        <p className="mt-3 text-white/90">
          Review and manage community discussions.
        </p>
      </section>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="font-semibold">
              {post.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {post.author}
            </p>

            <div className="mt-4 flex gap-3">
              <button className="rounded-xl bg-emerald-500 px-4 py-2 text-white">
                Approve
              </button>

              <button className="rounded-xl bg-red-500 px-4 py-2 text-white">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}