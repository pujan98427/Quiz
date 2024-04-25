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
  <div class="space-y-6">
    <p class="text-lg font-medium text-gray-900">
      {{ props.questionModal?.question }}
    </p>
    <fieldset class="mt-4">
      <legend class="sr-only">Notification method</legend>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <template v-for="(answer, answerIndex) in props.questionModal?.answers">
          <label
            :for="idGenerator + questionIndex + answerIndex"
            :class="[
              props.questionModal?.selectedOption === answerIndex
                ? 'border-red-600 ring-2 ring-red-600'
                : answerIndex === props.questionModal?.correctIndex
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
              :checked="answerIndex === props.questionModal?.correctIndex"
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
</template>

<style scoped></style>
