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
    globalSelectedQuestionModal: null,
  }),
  getters: {
    totalQuestion: (state) => {
      return state.questionModals.questionModals.length;
    },
  },
  actions: {
    async fill() {
      let allQuestions;

      // Determine which JSON file to import based on the selected option
      switch (this.globalSelectedQuestionModal) {
        case 1:
          allQuestions = await import("@/data/db.json");
          break;
        case 2:
          allQuestions = await import("@/data/Geology/StructuralGeology.json");
          break;
        case 3:
          allQuestions = await import(
            "@/data/Geology/Geologyofnepalhimalaya.json"
          );
          break;
        case 4:
          allQuestions = await import("@/data/Buildingmaterials.json");
          break;
        default:
          // Default case if none of the specific cases match
          allQuestions = await import("@/data/db.json");
          break;
      }

      // Extract questionModals from imported data
      const questionModals = Array.isArray(allQuestions.questionModals)
        ? allQuestions.questionModals
        : [];

      if (questionModals.length > 0) {
        if (this.fetchQuestion !== null && this.fetchQuestion > 0) {
          // Slice and shuffle questions if fetchQuestion is specified
          const slicedQuestions = questionModals
            .sort(() => Math.random() - 0.5)
            .slice(0, this.fetchQuestion);

          // Update questionModals with sliced questions
          this.questionModals = { questionModals: slicedQuestions };
        } else {
          // Update questionModals with all questions
          this.questionModals = { questionModals };
        }
      } else {
        console.error("No questions found in the loaded data.");
      }
    },
  },
});
