<script setup lang="ts">
import { ref } from "vue";
import { useQuizStore } from "@/stores/quizStore";

const props = defineProps({
  questionModal: {
    type: Object,
  },
});

const QuizStore = useQuizStore();

const idGenerator = Math.random().toString(36).slice(2);
</script>
<template>
  <div class="space-y-8">
    <div
      class="space-y-6"
      v-for="(questionModal, questionIndex) in QuizStore.inCorrectQuestion"
      :key="questionIndex"
    >
      <p class="text-lg font-medium text-gray-900">
        {{ questionModal.question }}
      </p>
      <fieldset class="mt-4">
        <legend class="sr-only">Notification method</legend>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <template v-for="(answer, answerIndex) in questionModal.answers">
            <label
              :for="idGenerator + questionIndex + answerIndex"
              :class="[
                questionModal.selectedOption === answerIndex
                  ? 'border-red-600 ring-2 ring-red-600'
                  : answerIndex === questionModal.correctIndex
                  ? 'border-green-600 ring-2 ring-green-600'
                  : 'border-gray-300',
                'relative flex items-center cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
              ]"
            >
              <input
                type="radio"
                :name="'question_' + questionIndex"
                :id="idGenerator + questionIndex + answerIndex"
                :value="answer"
                :checked="answerIndex === questionModal.correctIndex"
                disabled
                class="h-4 w-4 border-green-600 text-green-600 focus:ring-green-600"
              />

              <span
                class="ml-3 block text-sm leading-6 text-gray-800 cursor-pointer"
              >
                {{ answer }}
              </span>
            </label>
          </template>
        </div>
      </fieldset>
    </div>
    <button
      type="submit"
      class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="QuizStore.showQuestion = false"
    >
      Play Again
    </button>
  </div>
</template>

<style scoped></style>
