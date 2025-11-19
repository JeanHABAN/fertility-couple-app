import { useMemo } from "react";
import { useCycle } from "./useCycle";
import type { FertilityGoal } from "../app/types/cycle";

export type CoachMessage = {
  id: string;
  text: string;
};

function introLine(goal: FertilityGoal): string {
  if (goal === "AVOID_PREGNANCY") {
    return "You chose to avoid pregnancy. I’ll highlight risk days and protection tips.";
  }
  if (goal === "TRY_TO_CONCEIVE") {
    return "You’re trying to conceive. I’ll highlight your best fertile days.";
  }
  return "You’re tracking your cycle. I’ll help you understand patterns and signals.";
}

export function useCoach() {
  const { getTodayStatus, getDayLog, settings } = useCycle();

  const today = new Date();
  const status = getTodayStatus(today);
  const log = getDayLog(today);
  const goal = settings.goal;

  const messages: CoachMessage[] = useMemo(() => {
    const out: CoachMessage[] = [];

    // 1) Intro message based on goal
    out.push({
      id: "goal-intro",
      text: introLine(goal),
    });

    // 2) Fertility level message depends on goal
    if (status.level === "HIGH") {
      if (goal === "AVOID_PREGNANCY") {
        out.push({
          id: "high-avoid",
          text:
            "Today is a high-fertility day. If you don’t want pregnancy, avoid unprotected sex or use reliable protection.",
        });
      } else if (goal === "TRY_TO_CONCEIVE") {
        out.push({
          id: "high-ttc",
          text:
            "High fertility today. Having sex today and over the next 1–2 days can increase your chances of conceiving.",
        });
      } else {
        out.push({
          id: "high-track",
          text:
            "High-fertility day. Notice how your mood, energy, and discharge feel on days like this; it helps you learn your personal pattern.",
        });
      }
    } else if (status.level === "MEDIUM") {
      if (goal === "AVOID_PREGNANCY") {
        out.push({
          id: "medium-avoid",
          text:
            "Fertility is medium. It’s still safer than peak days, but you can’t fully rely on this if you must avoid pregnancy.",
        });
      } else if (goal === "TRY_TO_CONCEIVE") {
        out.push({
          id: "medium-ttc",
          text:
            "Moderate fertility. If you’re trying to conceive, sex around these days can still support your chances over the full fertile window.",
        });
      } else {
        out.push({
          id: "medium-track",
          text:
            "Medium fertility. Keep logging symptoms so you can see how your body changes across the whole cycle.",
        });
      }
    } else {
      // LOW fertility
      if (goal === "AVOID_PREGNANCY") {
        out.push({
          id: "low-avoid",
          text:
            "Low-fertility day. Risk of pregnancy is lower, but not zero. If pregnancy would be a big concern, still use protection.",
        });
      } else if (goal === "TRY_TO_CONCEIVE") {
        out.push({
          id: "low-ttc",
          text:
            "Low-fertility day. This is a good time to rest, but staying consistent over multiple cycles is what really helps conception chances.",
        });
      } else {
        out.push({
          id: "low-track",
          text:
            "Low-fertility day. Use these calmer days to reflect, rest, and review your past logs.",
        });
      }
    }

    // 3) Period advice (same for all goals)
    if (log?.period) {
      out.push({
        id: "period-care",
        text:
          "You logged period today. Rest, hydrate, and consider a warm pad for cramps. If pain is very strong or unusual, talk to a doctor.",
      });
    }

    // 4) Unprotected sex on high fertility (extra warning if avoiding pregnancy)
    if (status.level === "HIGH" && log?.sex?.some((s) => s.protection === "NONE")) {
      if (goal === "AVOID_PREGNANCY") {
        out.push({
          id: "unprotected-high-avoid",
          text:
            "You logged unprotected sex on a high-fertility day. If pregnancy is not desired, consider emergency contraception and medical advice as soon as possible.",
        });
      } else if (goal === "TRY_TO_CONCEIVE") {
        out.push({
          id: "unprotected-high-ttc",
          text:
            "Unprotected sex on a high-fertility day can significantly increase your chances of pregnancy this cycle.",
        });
      } else {
        out.push({
          id: "unprotected-high-track",
          text:
            "Unprotected sex on a high-fertility day. It’s useful to remember this if you’re watching for possible pregnancy signs later in the cycle.",
        });
      }
    }

    // 5) Symptoms encouragement
    if (log?.symptoms && log.symptoms.symptoms.length > 0) {
      out.push({
        id: "symptoms-note",
        text:
          "You logged symptoms today. Tracking them across several cycles can help you and your doctor understand your pattern better.",
      });
    }

    return out;
  }, [status, log, goal]);

  return {
    todayMessages: messages,
    todayStatus: status,
    goal,
  };
}
