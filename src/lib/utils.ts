import { Emonote } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GetLogTime(date: Date) {
  const utcDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const localTime = utcDate.toLocaleTimeString("en-US", options);

  return localTime; // 👉 "9:23 AM" (if your local time is UTC+1.5, i.e., India)
}

export function getDominantEmotion(
  logs: Emonote[]
): { emotion: string; count: number } | null {
  if (!logs.length) return null;

  const emotionCount: Record<string, number> = {};

  for (const log of logs) {
    const emotion = log.emotions.toLowerCase(); // Normalize casing
    emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
  }

  // Find the emotion with the highest count
  let dominantEmotion = "";
  let maxCount = 0;

  for (const [emotion, count] of Object.entries(emotionCount)) {
    if (count > maxCount) {
      dominantEmotion = emotion;
      maxCount = count;
    }
  }

  return {
    emotion: dominantEmotion,
    count: maxCount,
  };
}

export function getEmojiWithEmotion(emotion: string) {
  switch (emotion) {
    case "good":
      return "😊";
    case "neutral":
      return "😐";
    case "sad":
      return "😔";
    default:
      return "😐";
  }
}



export function filterLogsCreatedToday(logs: Emonote[]): Emonote[] {
  const today = new Date();
  const todayDateOnly = today.toISOString().split('T')[0]; // e.g. "2025-07-19"

  return logs.filter(log => {
    const createdDateOnly = new Date(log.createdAt).toISOString().split('T')[0];
    return createdDateOnly === todayDateOnly;
  });
}