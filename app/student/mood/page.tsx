import PageHeader from "@/components/layout/page-header";

import MoodSelector from "@/components/mood/mood-selector";
import MoodForm from "@/components/mood/mood-form";
import MoodHistory from "@/components/mood/mood-history";

export default function MoodPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Mood Tracker"
        description="Track your emotional wellness and monitor daily mood patterns."
      />

      <MoodSelector />

      <div className="grid gap-6 xl:grid-cols-2">
        <MoodForm />
        <MoodHistory />
      </div>
    </div>
  );
}