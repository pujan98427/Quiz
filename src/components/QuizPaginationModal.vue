<script setup lang="ts">
import { ref } from "vue";
import { useQuizStore } from "@/stores/quizStore";
import { defineProps } from "vue";

const props = defineProps({
  questionModal: {
    type: Object,
  },
});

const QuizStore = useQuizStore();
const currentIndex = ref(0);
const selectedOptions = ref([]);
const selectedAnswer = ref<number | null>(null);
const listWrongQuestion = ref([]);
const listCorrectQuestion = ref([]);
const internalScore = ref(0);

function submitQuiz() {
  QuizStore.score = internalScore.value;
  QuizStore.inCorrectQuestion = listWrongQuestion.value;
  QuizStore.correctQuestion = listCorrectQuestion.value;
  QuizStore.scoreModal = true;
  QuizStore.showQuestion = true;
}

function answered(e) {
  const selectedIndex = Number(e.target.value);
  const currentQuestion = props.questionModal[currentIndex.value];
  const correctIndex = currentQuestion["correctIndex"];
  let updatedQuestionModal = {
    ...currentQuestion,
    selectedOption: selectedIndex,
  };
  if (selectedIndex === correctIndex) {
    internalScore.value += 1;
    const indexToRemove = listWrongQuestion.value.findIndex(
      (question) => question === currentQuestion
    );
    if (indexToRemove !== -1) {
      listWrongQuestion.value.splice(indexToRemove, 1);
    }
    if (!listCorrectQuestion.value.includes(currentQuestion)) {
      listCorrectQuestion.value.push(currentQuestion);
    }
  } else {
    if (!listWrongQuestion.value.includes(updatedQuestionModal)) {
      listWrongQuestion.value.push(updatedQuestionModal);
    }
  }
}

function fetchNextQuestion(): void {
  currentIndex.value++;
  selectedOptions.value = null;
}
</script>
<template>
  <div class="">
    <div class="absolute -top-4 left-10">
      <p
        class="pointed-clip rounded-t-lg text-xs font-medium text-center w-16 bg-[linear-gradient(30.59deg,_#E38415_20.8%,_#F59F18_84.66%)] text-white py-3"
      >
        {{ currentIndex + 1 }} /
        {{ props.questionModal.length }}
      </p>
    </div>

    <div class="space-y-6">
      <p class="text-lg font-medium text-gray-900">
        {{ props.questionModal[currentIndex]?.question }}
      </p>
      <fieldset class="mt-4">
        <legend class="sr-only">Notification method</legend>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <template
            v-for="(answer, answerIndex) in props.questionModal[currentIndex]
              ?.answers"
          >
            <label
              :for="answerIndex"
              :class="[
                selectedOptions === answerIndex
                  ? 'border-indigo-600 ring-2 ring-indigo-600'
                  : 'border-gray-300',
                'relative flex items-center cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
              ]"
            >
              <input
                type="radio"
                :name="'question_' + currentIndex"
                :id="answerIndex"
                :value="answerIndex"
                v-model="selectedOptions"
                @change="answered($event)"
                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
    <!-- :class="currentIndex > 0 ? 'justify-between' : 'justify-end'" -->
    <div
      class="flex items-center justify-end"
      v-if="currentIndex < props.questionModal.length - 1"
    >
      <!-- <button
        type="submit"
        class="mt-8 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        @click="fetchPreviousQuestion"
        v-if="currentIndex > 0"
      >
        Previous
      </button> -->
      <button
        type="submit"
        class="mt-8 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        :class="
          selectedOptions == null
            ? 'pointer-events-none opacity-60'
            : 'cursor-pointer'
        "
        @click="fetchNextQuestion"
        :disabled="selectedOptions == null"
      >
        Next
      </button>
    </div>

    <button
      type="submit"
      class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="submitQuiz"
      v-if="
        selectedOptions != null &&
        currentIndex === props.questionModal.length - 1
      "
    >
      View Result
    </button>
  </div>
</template>

<style scoped>
.pointed-clip {
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 8px),
    50% 100%,
    0 calc(100% - 8px)
  );
}
</style>
