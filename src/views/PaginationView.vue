<script setup lang="ts">
import QuizModel from "@/components/QuizPaginationModal.vue";
import Modal from "@/components/ResultModal.vue";
import { useQuizStore } from "@/stores/quizStore";
import CompletedModel from "@/components/CompletedModel.vue";
const QuizStore = useQuizStore();

QuizStore.fill();

function closeModal(): void {
  document.body.style.overflow = "auto";
  QuizStore.scoreModal = false;
}
</script>
<template>
  <div
    className="bg-white p-5 md:p-8 max-w-[599px] w-full space-y-8 shadow rounded-lg relative"
  >
    <template v-if="QuizStore.showQuestion">
      <CompletedModel />
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
