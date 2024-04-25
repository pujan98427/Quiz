<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed, ref, watch } from "vue";
import { useQuizStore } from "@/stores/quizStore";
import SelectField from "@/components/SelectField.vue";
const QuizStore = useQuizStore();
const options = [
  {
    id: 1,
    title: "General",
  },
  {
    id: 2,
    title: "Structural Geology",
  },

  {
    id: 3,
    title: "Building Materials",
  },
  {
    id: 4,
    title: "Geology of Nepal",
  },
];
let selectedQuestionModal = ref(1);
watch(selectedQuestionModal, () => {
  QuizStore.globalSelectedQuestionModal = selectedQuestionModal.value;
});

function validateInput() {
  if (QuizStore.fetchQuestion < 0) {
    QuizStore.fetchQuestion = 0;
  }
}
</script>
<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" src="/quizWhiz.svg" alt="Your Company" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[630px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div>
          <form class="space-y-6">
            <fieldset>
              <label for="tquestion">Number of Questions:</label>
              <input
                type="number"
                name="tquestion"
                id="tquestion"
                v-model="QuizStore.fetchQuestion"
                @input="validateInput"
                class="block mt-2 w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter the number of questions"
              />
            </fieldset>
            <fieldset>
              <label for="tquestion">Select question Modal</label>
              <SelectField
                :lists="options"
                v-model="selectedQuestionModal"
                valueKey="id"
                nameKey="title"
                class="mt-1.5"
              />
            </fieldset>
          </form>

          <div class="relative mt-7 mb-4">
            <div class="w-full border-t border-gray-200" />
          </div>
          <h2
            class="mb-5 text-xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Select your preferred layout
          </h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <RouterLink
              :to="{ name: 'list' }"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
              ><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33789 7C5.06694 4.01099 8.29866 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 17.5228 17.5229 22 12.0001 22C8.29866 22 5.06694 19.989 3.33789 17M12 16L16 12M16 12L12 8M16 12H2"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="text-sm font-semibold leading-6"
                >List View</span
              ></RouterLink
            >

            <RouterLink
              to="/pagination"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33789 7C5.06694 4.01099 8.29866 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0001 17.5228 17.5229 22 12.0001 22C8.29866 22 5.06694 19.989 3.33789 17M12 16L16 12M16 12L12 8M16 12H2"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span class="text-sm font-semibold leading-6"
                >Pagination View</span
              >
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
