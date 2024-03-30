import { defineStore } from 'pinia'

export const useQuizStore = defineStore('QuizStore', {
  state: () => ({
      questionModals: [],
      currentQuestionIndex: 0,
      score: 0,
      wrong:0,
    
  }),
  getters:{
    
  },
  actions: {
    async fill() {
      const db = await import('@/data/db.json');
      this.questionModals = db.default;
      
    },
 
    resetQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
    }
  }
})
