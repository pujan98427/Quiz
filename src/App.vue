<script setup lang="ts">
import QuizModel from '@/components/QuizModel.vue'
import { useQuizStore } from '@/stores/quizStore'
const QuizStore = useQuizStore()
// console.log(QuizStore.fill)
QuizStore.fill();


import { ref } from 'vue';
// import { useQuizStore } from './store';

const quizStore = useQuizStore();

const selectedOptions = ref([]);
const questions = [
  {
    question: 'Question 1?',
    options: ['Option 1', 'Option 2', 'Option 3'],
    correctAnswer: 'Option 1'
  },
  {
    question: 'Question 2?',
    options: ['Option A', 'Option B', 'Option C'],
    correctAnswer: 'Option C'
  },
  // Add more questions as needed
];



</script>

<template>
  <div class="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">

    <template v-for="(questionModal, index) in QuizStore.questionModals" :key="index">

      <QuizModel :questionModal="questionModal" />
    </template>
  </div>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>


  <RouterView />
</template>

<style lang="scss"></style>
