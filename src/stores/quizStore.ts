import { defineStore } from 'pinia'

export const useQuizStore = defineStore('QuizStore', {
  state: () => ({
      questionModals: [],
      scoreModal:false,
      score: 0,
      wrong:0,
    
  }),
  getters: {
    totalQuestion: (state) => {
      return state.questionModals.length;
    }
  },
  actions: {
    async fill() {
      const db = await import('@/data/db.json');
      this.questionModals = db.default;
      
    },
 
  }
})
