import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useQuizStore = defineStore("QuizStore", {
  state: () => ({
    questionModals: useLocalStorage("quizStore:questionModals", []),
    inCorrectQuestion: useLocalStorage("quizStore:inCorrectQuestion", []),
    scoreModal: useLocalStorage("quizStore:scoreModal", false),
    score: useLocalStorage("quizStore:score", 0),
    showQuestion: useLocalStorage("quizStore:showQuestion", false),
    fetchQuestion: useLocalStorage("quizStore:fetchQuestion", null),
  }),
  getters: {
    totalQuestion: (state) => {
      return state.questionModals.questionModals.length;
    },
  },
  actions: {
    async fill() {
      const db = await import("@/data/db.json");
      const allQuestions = db.default;

      if (Array.isArray(allQuestions.questionModals)) {
        if (this.fetchQuestion !== null && this.fetchQuestion > 0) {
          const slicedQuestions = allQuestions.questionModals
            .sort(() => Math.random() - 0.5)
            .slice(0, this.fetchQuestion);

          // Wrap sliced questions in an object with the same structure as allQuestions
          const slicedQuestionsObject = { questionModals: slicedQuestions };

          // Assign the wrapped sliced questions to this.questionModals
          this.questionModals = slicedQuestionsObject;
        } else {
          this.questionModals = allQuestions;
        }
      } else {
        console.error("Data loaded from db.json is not an array.");
      }
    },
  },
});
