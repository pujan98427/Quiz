<script setup lang="ts">
import { ref } from "vue";
import IncorrectQuestionModal from "@/components/IncorrectQuestionModal.vue";
import QuizModel from "@/components/QuizPaginationModal.vue";
import Modal from "@/components/ResultModal.vue";
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
    className="bg-white p-5 md:p-8 max-w-[599px] w-full space-y-8 shadow rounded-lg relative"
  >
    <template v-if="QuizStore.showQuestion">
      <div class="p-1 rounded-lg bg-gray-100 flex items-center space-x-1">
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
            class="block text-center gap-2 py-2 rounded-md cursor-pointer text-sm font-semibold peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow hover:text-indigo-600 hover:shadow hover:bg-white transition-all duration-300 ease-in-out px-12"
            for="inCorrect_toggle"
          >
            InCorrect
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
            class="block text-center gap-2 py-2 rounded-md cursor-pointer text-sm font-semibold peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow-8 hover:text-indigo-600 hover:shadow-8 hover:bg-white transition-all duration-300 ease-in-out px-12"
            for="correct_toggle"
          >
            <span>
              <correctSvg />
            </span>
            Correct
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
            v-for="(
              questionModal, questionIndex
            ) in QuizStore.inCorrectQuestion"
          >
            <IncorrectQuestionModal :questionModal="questionModal" />
          </template>
          <button
            type="submit"
            class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="QuizStore.showQuestion = false"
          >
            Play Again
          </button>
        </div>
        <div class="space-y-8" v-else>
          <p class="text-center font-bold text-indigo-600">coming soon</p>
          <IncorrectQuestionModal />
          <button
            type="submit"
            class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click="QuizStore.showQuestion = false"
          >
            Play Again
          </button>
        </div>
      </transition>
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
