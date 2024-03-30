<script setup lang="ts">
import { ref } from "vue";
import { useQuizStore } from "@/stores/quizStore";

const props = defineProps({
  questionModal: {},
});
const QuizStore = useQuizStore();

let selectedOptions = ref([]);

function submitQuiz() {
  const score = calculateScore();
  QuizStore.score = score;
  document.body.style.overflow = "hidden";
  QuizStore.scoreModal = true;
  selectedOptions.value = [];
}

function calculateScore() {
  let score = 0;
  console.log(score);

  const selectedAnswers = selectedOptions.value.map((selectOption, index) => {
    const selectedOptionIndex =
      props.questionModal[index].answers.indexOf(selectOption);

    return { questionIndex: index, answer: selectedOptionIndex };
  });

  selectedAnswers.forEach((selectedAnswer) => {
    const questionIndex = Number(selectedAnswer.questionIndex);
    const question = props.questionModal[questionIndex];
    const correctIndex = question.correctIndex;
    const selectedOption = selectedAnswer.answer;
    if (selectedOption === correctIndex) {
      score++;
    }
  });
  return score;
}

const idGenerator = Math.random().toString(36).slice(2);
</script>
<template>
  <div
    class="bg-white p-5 md:p-8 max-w-[666px] space-y-8 shadow rounded-lg w-11/12"
  >
    <div
      class="space-y-6"
      v-for="(questionModal, questionIndex) in props.questionModal"
      :key="questionIndex"
    >
      <p class="text-lg font-medium text-gray-900">
        {{ questionModal.question }}
      </p>
      <fieldset class="mt-4">
        <legend class="sr-only">Notification method</legend>
        <div class="grid grid-cols-2 gap-6">
          <template v-for="(answer, answerIndex) in questionModal.answers">
            <label
              :for="idGenerator + questionIndex + answerIndex"
              :class="[
                selectedOptions[questionIndex] === answer
                  ? 'border-indigo-600 ring-2 ring-indigo-600'
                  : 'border-gray-300',
                'relative flex items-center cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
              ]"
            >
              <input
                type="radio"
                :name="'question_' + questionIndex"
                :id="idGenerator + questionIndex + answerIndex"
                :value="answer"
                v-model="selectedOptions[questionIndex]"
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

    <button
      type="submit"
      class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      @click="submitQuiz"
    >
      View Result
    </button>
  </div>
</template>

<style scoped></style>
