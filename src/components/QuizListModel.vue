<script setup lang="ts">
import { ref } from "vue";
import { useQuizStore } from "@/stores/quizStore";

const props = defineProps({
  questionModal: {
    type: Object,
  },
});
const QuizStore = useQuizStore();
let selectedOptions = ref<string[]>([]);

function submitQuiz(): void {
  const { score, incorrectQuestion } = calculateScore();

  QuizStore.score = score;

  // Add all incorrect question to store
  QuizStore.inCorrectQuestion = incorrectQuestion;

  // hide scroll when modal is open
  document.body.style.overflow = "hidden";

  //  open modal  to show final score
  QuizStore.scoreModal = true;

  // make empty for final score
  selectedOptions.value = [];

  //toggle question
  QuizStore.showQuestion = true;
}

/**
 * Calculate the score and the list of incorrect questions.
 * @returns An object with the score and the list of incorrect questions.
 */
function calculateScore(): { score: number; incorrectQuestion: any[] } {
  let score = 0;
  let incorrectQuestion: any[] = [];

  const selectedAnswers = selectedOptions.value.map((selectOption, index) => {
    const selectedOptionIndex =
      props.questionModal[index].answers.indexOf(selectOption);
    const questionIndex = Number(index);
    const question = props.questionModal[questionIndex];
    const correctIndex = question.correctIndex;

    const isCorrectAnswer = selectedOptionIndex === correctIndex;
    const updatedQuestionModal = {
      ...question,
      selectedOption: selectedOptionIndex,
    };

    if (!isCorrectAnswer && !incorrectQuestion.includes(updatedQuestionModal)) {
      incorrectQuestion.push(updatedQuestionModal);
    }

    return isCorrectAnswer ? 1 : 0;
  });

  score = selectedAnswers.reduce((acc, curr) => acc + curr, 0);

  return { score, incorrectQuestion };
}

const idGenerator = Math.random().toString(36).slice(2);
</script>
<template>
  <div class="absolute -top-4 left-10">
    <p
      class="pointed-clip rounded-t-lg text-xs font-medium text-center w-16 bg-[linear-gradient(30.59deg,_#E38415_20.8%,_#F59F18_84.66%)] text-white py-3"
    >
      {{ props.questionModal.length }}
    </p>
  </div>
  <div class="py-5 md:py-8 max-w-[666px] space-y-8 relative">
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
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
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
