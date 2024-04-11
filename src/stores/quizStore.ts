import { defineStore } from 'pinia'
import {useLocalStorage} from '@vueuse/core'

export const useQuizStore = defineStore('QuizStore', {
  state: () => ({
      questionModals: useLocalStorage("quizStore:questionModals",[]), 
      inCorrectQuestion:useLocalStorage("quizStore:inCorrectQuestion",[]),
      scoreModal:useLocalStorage("quizStore:scoreModal",false),
      score: useLocalStorage("quizStore:score",0),
      showQuestion:useLocalStorage("quizStore:showQuestion",false),
      fetchQuestion:useLocalStorage("quizStore:fetchQuestion",null),
    
  }),
  getters: {
    totalQuestion: (state) => {
      return state.questionModals.questionModals.length;
    },
   
  },
  actions: {
    async fill() {
      
      const db = await import('@/data/db.json');
     let allQuestions = db.default;
      
      if(Array.isArray(allQuestions.questionModals)){
        if (this.fetchQuestion > 0 || null) {
          console.log(true);
          const slicedQuestion = allQuestions.questionModals.sort(() => Math.random() - 0.5).slice(0, this.fetchQuestion );
          
          console.log(slicedQuestion);
          
          allQuestions = slicedQuestion
          this.questionModals.questionModals =slicedQuestion
    
          
        }
        else{
          this.questionModals =  allQuestions
        }
      }else {
        console.error('Data loaded from db.json is not an array.');
      }
    },
 
  }
})
