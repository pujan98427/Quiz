<script setup lang="ts">
import { ref } from "vue";
import IncorrectQuestionModal from "@/components/IncorrectQuestionModal.vue";
import { useQuizStore } from "@/stores/quizStore";
const QuizStore = useQuizStore();

QuizStore.fill();

function closeModal(): void {
  document.body.style.overflow = "auto";
  QuizStore.scoreModal = false;
}

const selectedOption: Ref<UnwrapRef<string>> = ref("inCorrect");

function handleOptionChange(event) {
  selectedOption.value = event.target.value;
}
</script>
<template>
  <div
    class="p-1 mb-8 rounded-lg bg-gray-100 flex gap-1 md:items-center flex-col md:flex-row space-x-1"
  >
    <span class="block flex-1">
      <input
        id="inCorrect_toggle"
        v-model="selectedOption"
        class="hidden peer"
        name=""
        type="radio"
        value="inCorrect"
        @change="handleOptionChange"
      />
      <label
        class="block text-center gap-2 py-3 rounded-md cursor-pointer text-sm font-semibold peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow hover:text-indigo-600 hover:shadow hover:bg-white transition-all duration-300 ease-in-out px-12"
        for="inCorrect_toggle"
      >
        InCorrect
        <span class="text-indigo-600 pl-2">
          ({{ QuizStore.inCorrectQuestion.length }})
        </span>
      </label>
    </span>
    <span class="block flex-1">
      <input
        id="correct_toggle"
        v-model="selectedOption"
        class="hidden peer"
        name=""
        type="radio"
        value="correct"
        @change="handleOptionChange"
      />
      <label
        class="block text-center gap-2 py-3 rounded-md cursor-pointer text-sm font-semibold peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-8 hover:text-indigo-600 hover:shadow-8 hover:bg-white transition-all duration-300 ease-in-out px-12"
        for="correct_toggle"
      >
        Correct
        <span class="text-indigo-600 pl-2">
          ({{ QuizStore.correctQuestion.length }})
        </span>
      </label>
    </span>
  </div>
  <transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div class="space-y-8" v-if="selectedOption === 'inCorrect'">
      <template
        v-for="(questionModal, questionIndex) in QuizStore.inCorrectQuestion"
      >
        <IncorrectQuestionModal :questionModal="questionModal" />
      </template>

      <div class="flex items-center gap-4 mt-8">
        <router-link
          :to="{ name: 'layout' }"
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Back to Home
        </router-link>
        <button
          type="submit"
          class="flex w-full items-center justify-center rounded-md border border-indigo-600 px-8 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="QuizStore.showQuestion = false"
        >
          Play Again
        </button>
      </div>
    </div>
    <div class="space-y-8" v-else>
      <template
        v-for="(questionModal, questionIndex) in QuizStore.correctQuestion"
      >
        <IncorrectQuestionModal :questionModal="questionModal" />
      </template>
      <div class="flex items-center gap-4 mt-8">
        <router-link
          :to="{ name: 'layout' }"
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Back to Home
        </router-link>
        <button
          type="submit"
          class="flex w-full items-center justify-center rounded-md border border-indigo-600 px-8 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          @click="QuizStore.showQuestion = false"
        >
          Play Again
        </button>
      </div>
    </div>
  </transition>
</template>
