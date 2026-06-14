import CreatePost from "@/components/forum/create-post";
import PostCard from "@/components/forum/post-card";

export default function ForumPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Anonymous Support Forum
        </h1>

        <p className="mt-3 max-w-2xl text-white/90">
          Connect with fellow students, share experiences,
          seek advice, and support one another in a safe
          and anonymous environment.
        </p>
      </section>

      {/* Community Stats */}

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Total Posts
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            1,245
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Active Members
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            642
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Support Replies
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            4,387
          </h2>
        </div>
      </section>

      {/* Create Post */}

      <CreatePost />

      {/* Posts */}

      <section className="space-y-6">
        <PostCard
          author="Anonymous Student"
          time="2 hours ago"
          content="I've been feeling overwhelmed with assignments and exams lately. How do you manage stress during busy academic periods?"
        />

        <PostCard
          author="Anonymous Student"
          time="5 hours ago"
          content="I've started tracking my sleep and mood regularly. It's helping me stay more aware of my mental health."
        />

        <PostCard
          author="Anonymous Student"
          time="1 day ago"
          content="Any recommendations for maintaining a healthy study-life balance?"
        />
      </section>
    </div>
  );
}