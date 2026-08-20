"use client";

import {
  HeartHandshake,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { useChatContext } from "../../context/ChatContext";

// ==========================================================
// Suggestions
// ==========================================================

const SUGGESTIONS = [
  {
    emoji: "😊",
    text: "I'm feeling stressed today",
  },
  {
    emoji: "😴",
    text: "Help me improve my sleep",
  },
  {
    emoji: "📚",
    text: "I can't focus on studying",
  },
  {
    emoji: "🌱",
    text: "Give me today's wellness advice",
  },
];

// ==========================================================
// Component
// ==========================================================

export default function EmptyState() {
  const {
    activeConversationId,
    createConversation,
    sendMessage,
    isSendingMessage,
    isInitializingConversation,
  } = useChatContext();

  // ========================================================
  // Handle suggestion
  // ========================================================

  const handleSuggestionClick = async (text: string) => {
    if (
      isSendingMessage ||
      isInitializingConversation
    ) {
      return;
    }

    try {
      // ----------------------------------------------------
      // Use existing conversation
      // or create a new one
      // ----------------------------------------------------

      const conversationId =
        activeConversationId ??
        (await createConversation());

      // ----------------------------------------------------
      // Send suggestion
      //
      // Explicit conversationId is important because
      // createConversation updates state asynchronously.
      // ----------------------------------------------------

      await sendMessage(
        text,
        conversationId
      );
    } catch (error) {
      console.error(
        "Failed to send suggestion:",
        error
      );
    }
  };

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        items-center
        justify-center

        overflow-hidden

        px-4
        py-4

        sm:px-6
        sm:py-5

        lg:py-6
      "
    >
      <div
        className="
          flex
          w-full
          max-w-lg
          flex-col
          items-center
          text-center
        "
      >
        {/* ==================================================
            Icon
        ================================================== */}

        <div className="relative mb-3 sm:mb-4">
          {/* Glow */}

          <div
            className="
              absolute
              inset-0

              rounded-full

              bg-indigo-500/20

              blur-2xl
            "
          />

          {/* Icon container */}

          <div
            className="
              relative

              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-br
              from-indigo-500
              via-violet-500
              to-sky-500

              text-white

              shadow-lg
              shadow-indigo-500/20

              sm:h-16
              sm:w-16
            "
          >
            <HeartHandshake
              className="
                h-7
                w-7

                sm:h-8
                sm:w-8
              "
            />
          </div>
        </div>

        {/* ==================================================
            Badge
        ================================================== */}

        <div
          className="
            mb-2.5

            inline-flex
            items-center
            gap-1.5

            rounded-full

            border
            border-indigo-100

            bg-indigo-50

            px-3
            py-1

            text-xs
            font-medium

            text-indigo-700

            dark:border-indigo-900/50
            dark:bg-indigo-950/30
            dark:text-indigo-300

            sm:mb-3
            sm:px-3.5
            sm:py-1.5
          "
        >
          <Sparkles
            className="
              h-3
              w-3

              sm:h-3.5
              sm:w-3.5
            "
          />

          WellMind AI
        </div>

        {/* ==================================================
            Title
        ================================================== */}

        <h1
          className="
            text-2xl
            font-bold
            leading-tight
            tracking-tight

            text-slate-900

            sm:text-3xl

            dark:text-white
          "
        >
          Welcome 👋
        </h1>

        {/* ==================================================
            Description
        ================================================== */}

        <p
          className="
            mt-2

            max-w-md

            text-xs
            leading-5

            text-slate-500

            sm:mt-2.5
            sm:text-sm
            sm:leading-6

            dark:text-slate-400
          "
        >
          I'm here to support your mental wellbeing,
          help you reflect on your thoughts and
          emotions, and guide you toward healthier
          daily habits.
        </p>

        {/* ==================================================
            Suggestions
        ================================================== */}

        <div
          className="
            mt-5

            grid
            w-full

            gap-2

            sm:mt-6
            sm:gap-2.5

            sm:grid-cols-2
          "
        >
          {SUGGESTIONS.map(
            ({ emoji, text }) => (
              <button
                key={text}
                type="button"
                disabled={
                  isSendingMessage ||
                  isInitializingConversation
                }
                onClick={() =>
                  handleSuggestionClick(text)
                }
                className="
                  group

                  flex
                  items-center
                  justify-between
                  gap-3

                  rounded-xl

                  border
                  border-slate-200

                  bg-white/70

                  px-3.5
                  py-2.5

                  text-left

                  shadow-sm

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:border-indigo-300
                  hover:shadow-md

                  disabled:cursor-not-allowed
                  disabled:opacity-60

                  dark:border-slate-700
                  dark:bg-slate-900/60

                  dark:hover:border-indigo-700

                  sm:px-4
                  sm:py-3
                "
              >
                {/* Text */}

                <span
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2

                    text-xs
                    font-medium

                    text-slate-700

                    sm:text-sm

                    dark:text-slate-300
                  "
                >
                  <span
                    className="
                      shrink-0

                      text-lg
                      leading-none
                    "
                  >
                    {emoji}
                  </span>

                  <span className="truncate">
                    {text}
                  </span>
                </span>

                {/* Arrow */}

                <ArrowRight
                  className="
                    h-3.5
                    w-3.5
                    shrink-0

                    text-slate-300

                    transition-transform
                    duration-200

                    group-hover:translate-x-1
                    group-hover:text-indigo-500

                    dark:text-slate-600
                  "
                />
              </button>
            )
          )}
        </div>

        {/* ==================================================
            Footer
        ================================================== */}

        <p
          className="
            mt-4

            max-w-sm

            text-[10px]
            leading-4

            text-slate-400

            sm:mt-5
            sm:text-xs
            sm:leading-5

            dark:text-slate-500
          "
        >
          Choose a topic above or start typing
          below. Your conversations are private
          and focused on supporting your wellbeing.
        </p>
      </div>
    </div>
  );
}