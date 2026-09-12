import React, { createContext, useContext, useState, useEffect } from "react";
import { TOPICS_DATA, FULL_TOPIC_LIST } from "../data/curriculumData";

interface QuizScore {
  correct: number;
  total: number;
  completedAt: string;
}

interface ProgressContextType {
  completedLessons: string[];
  quizScores: Record<string, QuizScore>;
  totalLessons: number;
  completedCount: number;
  completionPercentage: number;
  isLessonCompleted: (lessonId: string) => boolean;
  toggleLessonCompleted: (lessonId: string) => boolean;
  markLessonCompleted: (lessonId: string) => void;
  markLessonIncomplete: (lessonId: string) => void;
  recordQuizResult: (lessonId: string, correct: number, total: number) => void;
  getTopicProgress: (topicId: number) => {
    completed: number;
    total: number;
    percentage: number;
    isFinished: boolean;
  };
  resetAllProgress: () => void;
}

const STORAGE_KEY_COMPLETED = "bdhvs_gialai_completed_lessons_v1";
const STORAGE_KEY_SCORES = "bdhvs_gialai_quiz_scores_v1";
const TOTAL_LESSONS = 136;

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Error reading completed lessons from localStorage", e);
    }
    return [];
  });

  const [quizScores, setQuizScores] = useState<Record<string, QuizScore>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCORES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (e) {
      console.error("Error reading quiz scores from localStorage", e);
    }
    return {};
  });

  // Save to localStorage whenever completedLessons change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedLessons));
    } catch (e) {
      console.error("Error saving completed lessons to localStorage", e);
    }
  }, [completedLessons]);

  // Save to localStorage whenever quizScores change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(quizScores));
    } catch (e) {
      console.error("Error saving quiz scores to localStorage", e);
    }
  }, [quizScores]);

  const isLessonCompleted = (lessonId: string): boolean => {
    return completedLessons.includes(lessonId);
  };

  const markLessonCompleted = (lessonId: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  };

  const markLessonIncomplete = (lessonId: string) => {
    setCompletedLessons((prev) => prev.filter((id) => id !== lessonId));
  };

  const toggleLessonCompleted = (lessonId: string): boolean => {
    const willBeCompleted = !completedLessons.includes(lessonId);
    if (willBeCompleted) {
      markLessonCompleted(lessonId);
    } else {
      markLessonIncomplete(lessonId);
    }
    return willBeCompleted;
  };

  const recordQuizResult = (lessonId: string, correct: number, total: number) => {
    setQuizScores((prev) => ({
      ...prev,
      [lessonId]: {
        correct,
        total,
        completedAt: new Date().toISOString(),
      },
    }));

    // Auto mark completed if user answered at least 1 question correctly or completed the quiz
    if (correct > 0 || total > 0) {
      markLessonCompleted(lessonId);
    }
  };

  const getTopicProgress = (topicId: number) => {
    // Find lessons belonging to this topic from TOPICS_DATA or FULL_TOPIC_LIST
    const topicData = TOPICS_DATA.find((t) => t.id === topicId);
    const meta = FULL_TOPIC_LIST.find((m) => m.id === topicId);
    const total = topicData?.lessons?.length || meta?.lessons || 5;

    let completed = 0;
    if (topicData?.lessons) {
      completed = topicData.lessons.filter((l) => completedLessons.includes(l.id)).length;
    } else {
      // Fallback check by pattern cd{topicId}-b{num}
      for (let i = 1; i <= total; i++) {
        if (completedLessons.includes(`cd${topicId}-b${i}`)) {
          completed++;
        }
      }
    }

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isFinished = completed >= total && total > 0;

    return { completed, total, percentage, isFinished };
  };

  const resetAllProgress = () => {
    setCompletedLessons([]);
    setQuizScores({});
    try {
      localStorage.removeItem(STORAGE_KEY_COMPLETED);
      localStorage.removeItem(STORAGE_KEY_SCORES);
    } catch (e) {
      console.error("Error clearing progress in localStorage", e);
    }
  };

  const completedCount = completedLessons.length;
  const completionPercentage = Math.min(
    100,
    Math.round((completedCount / TOTAL_LESSONS) * 100)
  );

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        quizScores,
        totalLessons: TOTAL_LESSONS,
        completedCount,
        completionPercentage,
        isLessonCompleted,
        toggleLessonCompleted,
        markLessonCompleted,
        markLessonIncomplete,
        recordQuizResult,
        getTopicProgress,
        resetAllProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
