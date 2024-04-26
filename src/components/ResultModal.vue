<script setup lang="ts">
import ConfettiExplosion from "vue-confetti-explosion";

const props = defineProps({
  totalQuestion: {
    type: Number,
  },
  score: {
    type: Number,
  },
});

const emits = defineEmits(["closeModal"]);

const close = () => {
  return emits("closeModal");
};
</script>

<template>
  <div
    className="fixed z-[99999] top-0 left-0 bottom-0 right-0 transition-all  ease-in-out"
  >
    <div
      class="flex justify-center relative z-1 items-center h-full w-full p-4"
    >
      <div
        class="overlay absolute z-0 top-0 left-0 right-0 bottom-0 bg-black/30 transition-all duration-300 ease-in-out"
        @click.prevent="close"
      ></div>
      <div
        class="bg-white max-w-[600px] mx-auto text-center w-full relative rounded-lg"
      >
        <ConfettiExplosion class="mx-auto" v-if="props.score > 2" />
        <div className="   p-8  rounded-lg ">
          <h4 className="text-3xl pb-3 text-center font-bold">
            Your score is
            <span
              :className="props.score > 2 ? 'text-green-600' : 'text-red-600'"
            >
              {{ props.score }}
            </span>
          </h4>
          <p className="py-2">
            You got {{ props.score }}/{{ props.totalQuestion }}
          </p>
          <p className="py-2 font-medium" v-if="props.score > 2">Congrats!!!</p>
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
              @click.prevent="close"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
