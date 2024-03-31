import { defineStore } from 'pinia'

export const useQuizStore = defineStore('QuizStore', {
  state: () => ({
      questionModals: [],
      inCorrectQuestion: [],
      scoreModal:false,
      score: 0,
      showQuestion:false,
    
  }),
  getters: {
    totalQuestion: (state) => {
      return state.questionModals.questionModals.length;
    },
   
  },
  actions: {
    async fill() {
      const db = await import('@/data/db.json');
      this.questionModals = db.default;
      
    },
 
  }
})
