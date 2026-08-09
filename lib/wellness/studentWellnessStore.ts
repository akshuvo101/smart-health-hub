// import {
//   HabitContext,
//   MoodContext,
//   MoodLevel,
//   ReportContext,
//   RiskIndicatorData,
//   RiskLevel,
//   SleepContext,
//   StudentContext,
//   StressLevel,
//   WellnessSnapshotData,
// } from "@/app/student/chat-with-ai/types";

// /* ==========================================================
//    Shared Student Wellness Data
//    Dashboard ও Chat AI একই সোর্স ব্যবহার করবে
// ========================================================== */

// export interface RawWellnessData {
//   moodLevel: MoodLevel;
//   moodScore: number;
//   moodTrend: MoodContext["trend"];
//   stressLevel: StressLevel;
//   stressScore: number;
//   sleepHours: number;
//   sleepQuality: SleepContext["quality"];
//   sleepConsistency: number;
//   habitCompletion: number;
//   habitStreak: number;
//   assessmentScore: number;
//   assessmentTrend: ReportContext["trend"];
//   upcomingAppointment: string | null;
//   completedSessions: number;
// }

// const DEFAULT_WELLNESS: RawWellnessData = {
//   moodLevel: "Good",
//   moodScore: 78,
//   moodTrend: "stable",
//   stressLevel: "Moderate",
//   stressScore: 52,
//   sleepHours: 6.8,
//   sleepQuality: "Fair",
//   sleepConsistency: 72,
//   habitCompletion: 68,
//   habitStreak: 5,
//   assessmentScore: 74,
//   assessmentTrend: "neutral",
//   upcomingAppointment: null,
//   completedSessions: 2,
// };

// const STORAGE_KEY = "wellmind-student-wellness";

// function loadFromStorage(): RawWellnessData {
//   if (typeof window === "undefined") return DEFAULT_WELLNESS;

//   try {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (stored) return { ...DEFAULT_WELLNESS, ...JSON.parse(stored) };
//   } catch {
//     /* ignore */
//   }

//   return DEFAULT_WELLNESS;
// }

// function computeWellnessScore(data: RawWellnessData): number {
//   const moodPart = data.moodScore * 0.3;
//   const sleepPart =
//     Math.min(data.sleepHours / 8, 1) * 100 * 0.25;
//   const habitPart = data.habitCompletion * 0.25;
//   const stressPart =
//     (100 - data.stressScore) * 0.2;

//   return Math.round(moodPart + sleepPart + habitPart + stressPart);
// }

// function computeRiskLevel(data: RawWellnessData): RiskLevel {
//   const score = computeWellnessScore(data);

//   if (
//     data.moodLevel === "Critical" ||
//     data.stressLevel === "High" ||
//     data.moodScore < 40
//   ) {
//     return "high";
//   }

//   if (
//     score < 60 ||
//     data.stressLevel === "Moderate" ||
//     data.moodTrend === "declining"
//   ) {
//     return "medium";
//   }

//   return "low";
// }

// function buildRiskIndicator(data: RawWellnessData): RiskIndicatorData {
//   const level = computeRiskLevel(data);

//   const configs: Record<
//     RiskLevel,
//     Omit<RiskIndicatorData, "level" | "confidence" | "updatedAt">
//   > = {
//     low: {
//       title: "স্থিতিশীল ওয়েলনেস ট্রেন্ড",
//       description:
//         "আপনার সাম্প্রতিক mood, sleep ও habit রেকর্ড একটি স্থিতিশীল অবস্থা নির্দেশ করে।",
//       recommendation:
//         "বর্তমান স্বাস্থ্যকর রুটিন বজায় রাখুন এবং WellMind AI-এর সাথে নিয়মিত কথা বলুন।",
//     },
//     medium: {
//       title: "কিছু পরিবর্তন লক্ষ্য করা যাচ্ছে",
//       description: `আপনার mood ${data.moodLevel}, stress ${data.stressLevel} এবং sleep ${data.sleepHours} ঘণ্টার কাছাকাছি। এটি মনোযোগের দাবি রাখতে পারে।`,
//       recommendation:
//         "আজ ১০–১৫ মিনিট বিশ্রাম নিন, হাইড্রেটেড থাকুন এবং চ্যাটে আপনার অনুভূতি শেয়ার করুন।",
//     },
//     high: {
//       title: "অতিরিক্ত সহায়তা প্রয়োজন হতে পারে",
//       description:
//         "আপনার সাম্প্রতিক ডেটা উচ্চ stress বা mood চ্যালেঞ্জ নির্দেশ করছে। আপনি একা নন।",
//       recommendation:
//         "একজন কাউন্সেলর বা বিশ্বস্ত কাউকে যোগাযোগ করুন। WellMind AI আপনার পাশে আছে।",
//     },
//   };

//   return {
//     level,
//     ...configs[level],
//     confidence: level === "low" ? 92 : level === "medium" ? 85 : 78,
//     updatedAt: "Just now",
//   };
// }

// export function buildStudentContext(
//   raw: RawWellnessData = loadFromStorage()
// ): StudentContext {
//   const wellnessScore = computeWellnessScore(raw);
//   const risk = buildRiskIndicator(raw);

//   // Map to the canonical StudentContext used across the app
//   const profile = {
//     id: "local",
//     name: "Student",
//     email: "",
//     university: "",
//     department: "",
//     semester: "",
//     avatar: "",
//   };

//   const preferences = {
//     theme: "system",
//     notifications: true,
//     aiReminders: true,
//     language: "en",
//   };

//   const statistics = {
//     streakDays: raw.habitStreak,
//     completedAssessments: 0,
//     completedHabits: Math.round(raw.habitCompletion),
//     moodEntries: 0,
//     sleepEntries: 0,
//   };

//   const ai = {
//     companionName: "WellMind",
//     model: "local",
//     online: true,
//     lastAnalysis: new Date(),
//     memoryEnabled: false,
//   };

//   const wellness = {
//     mood: {
//       score: raw.moodScore,
//       level: (raw.moodLevel.toLowerCase() as any) || "neutral",
//       label: String(raw.moodLevel),
//       updatedAt: new Date(),
//     },
//     sleep: {
//       duration: raw.sleepHours,
//       quality: Math.max(1, Math.min(5, Math.round((raw.sleepQuality === "Good" ? 4 : raw.sleepQuality === "Fair" ? 3 : 2)))),
//       updatedAt: new Date(),
//     },
//     habit: {
//       completed: Math.round(raw.habitCompletion),
//       total: 100,
//       completionRate: raw.habitCompletion,
//     },
//     assessment: {
//       total: raw.assessmentScore,
//       latestScore: raw.assessmentScore,
//       lastCompleted: new Date(),
//     },
//     risk: {
//       score: wellnessScore,
//       level: (risk.level as any) || "low",
//       description: risk.title,
//     },
//     reminders: [],
//   };

//   return {
//     profile,
//     preferences,
//     statistics,
//     ai,
//     wellness,
//   } as StudentContext;
// }

// export function getStudentContext(): StudentContext {
//   return buildStudentContext();
// }

// export function updateWellnessData(
//   partial: Partial<RawWellnessData>
// ): StudentContext {
//   const current = loadFromStorage();
//   const updated = { ...current, ...partial };

//   if (typeof window !== "undefined") {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//   }

//   return buildStudentContext(updated);
// }

// export { DEFAULT_WELLNESS, loadFromStorage };
