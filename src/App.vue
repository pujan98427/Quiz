<script setup lang="ts">
import QuizModel from '@/components/QuizModel.vue'
import Modal from '@/components/Modal.vue'
import { useQuizStore } from '@/stores/quizStore'
import { ref } from 'vue';
const QuizStore = useQuizStore()
// console.log(QuizStore.fill)
QuizStore.fill();


function closeModal() {
  document.body.style.overflow = "auto";
  QuizStore.scoreModal = false;
}
</script>

<template>
  <div className="justify-center flex items-center min-h-screen ">


    <template v-for="(questionModal, index) in QuizStore.questionModals" :key="index">

      <QuizModel :questionModal="questionModal" />
    </template>

  </div>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <Transition enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200"
    leave-from="opacity-100" leave-to="opacity-0">
    <Modal :totalQuestion="QuizStore.totalQuestion" :score="QuizStore.score" v-if="QuizStore.scoreModal"
      @closeModal="closeModal" />
  </Transition>
  <RouterView />
</template>

<style lang="scss"></style>
