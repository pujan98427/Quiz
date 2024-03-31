<script setup lang="ts">
import IncorrectQuestionModal from "@/components/IncorrectQuestionModal.vue";
import QuizModel from "@/components/QuizModel.vue";
import Modal from "@/components/Modal.vue";
import { useQuizStore } from "@/stores/quizStore";
const QuizStore = useQuizStore();

QuizStore.fill();

function closeModal(): void {
  document.body.style.overflow = "auto";
  QuizStore.scoreModal = false;
}
</script>
<template>
  <div className="justify-center flex items-center min-h-screen py-6">
    <template v-if="QuizStore.showQuestion">
      <IncorrectQuestionModal />
    </template>
    <template
      v-for="(questionModal, index) in QuizStore.questionModals"
      :key="index"
      v-else
    >
      <QuizModel :questionModal="questionModal" />
    </template>
  </div>

  <Transition
    enter="ease-out duration-300"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="ease-in duration-200"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <Modal
      :totalQuestion="QuizStore.totalQuestion"
      :score="QuizStore.score"
      v-if="QuizStore.scoreModal"
      @closeModal="closeModal"
    />
  </Transition>
</template>

<style lang="scss"></style>
