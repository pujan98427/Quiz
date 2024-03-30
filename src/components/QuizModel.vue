<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuizStore } from '@/stores/quizStore'


const props = defineProps({
  questionModal: {}
})
const QuizStore = useQuizStore()

// for (const selectedAnswer of props.questionModal) {
//   console.log(selectedAnswer);

// }



let selectedOptions = ref([]);
// const answeredQuestion = ref([]);

// const checkAnswer = (answerIndex, questionIndex, questionModal, correctAnswer) => {
//   const isAlreadyAnswered = answeredQuestion.value.includes(questionIndex);

//   // Check if the question has already been answered
//   if (isAlreadyAnswered) {
//     const previousAnswerIndex = computed(() => {
//       return questionModal.answer.map(option => {
//         return option.indexOf(selectedOption.value[questionIndex]);
//       })
//     });
//     console.log('previousAnswerIndex is ' + previousAnswerIndex);

//     const previousCorrectAnswer = correctAnswer === previousAnswerIndex;
//     console.log('previousCorrectAnswer is ' + previousCorrectAnswer);
//     // If previous answer was wrong and new answer is correct
//     if (!previousCorrectAnswer && answerIndex === correctAnswer) {
//       QuizStore.calcCorrect; // Increase score
//       QuizStore.adjustWrong; // Decrease wrong count
//     }
//     // If previous answer was correct and new answer is wrong
//     else if (previousCorrectAnswer && answerIndex !== correctAnswer) {
//       QuizStore.calcWrong; // Increase wrong count
//       QuizStore.adjustCorrect; // Decrease score
//     }
//   }
//   // If question hasn't been answered before
//   else {
//     // If answer is correct
//     if (answerIndex === correctAnswer) {
//       QuizStore.calcCorrect; // Increase score
//     } else {
//       QuizStore.calcWrong; // Increase wrong count
//     }

//     // Mark the question as answered
//     answeredQuestion.value.push(questionIndex);
//   }

//   // Update the selected option for the question
//   selectedOption.value[questionIndex] = answerIndex;
// };

function submitQuiz() {
  const score = calculateScore();
  QuizStore.score = score;
}

function calculateScore() {
  let score = 0;
  console.log(score);

  const selectedAnswers = selectedOptions.value.map((selectOption, index) => {
    const selectedOptionIndex = props.questionModal[index].answers.indexOf(selectOption);

    return { questionIndex: index, answer: selectedOptionIndex }
  })

  selectedAnswers.forEach(selectedAnswer => {
    const questionIndex = Number(selectedAnswer.questionIndex);
    const question = props.questionModal[questionIndex];
    const correctIndex = question.correctIndex;
    const selectedOption = selectedAnswer.answer;
    if (selectedOption === correctIndex) {
      score++;
    }
  });
  return score
}
const idGenerator = Math.random().toString(36).slice(2)

</script>
<template>

  <ul class="space-y-6">
    <li class=" " v-for="(questionModal, questionIndex) in props.questionModal" :key="questionIndex">

      <p class="text-lg font-medium text-gray-900">{{ questionModal.question }}</p>
      <fieldset class="mt-4">
        <legend class="sr-only">Notification method</legend>
        <div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          <template v-for="(answer, answerIndex) in questionModal.answers">

            <div class="flex items-center">
              <input type="radio" :name="'question_' + questionIndex" :id="idGenerator + answerIndex" :value="answer"
                v-model="selectedOptions[questionIndex]"
                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />


              <label :for="idGenerator + questionIndex" class="ml-3 block text-sm  leading-6 text-gray-800">
                {{ answer }}
              </label>
            </div>
          </template>
        </div>
      </fieldset>


    </li>
    <!-- <label class="text-base font-semibold text-gray-900">Notifications</label> -->
  </ul>
  <p>Score: {{ QuizStore.score }}</p>
  <p>Wrong: {{ QuizStore.wrong }}</p>
  <button type="submit"
    class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    @click="submitQuiz">Add
    to bag</button>
</template>

<style scoped></style>
