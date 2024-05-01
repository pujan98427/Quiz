<script setup></script>
<template>
  <main class="">
    <div class="">
      <div class="mx-auto max-w-2xl text-center md:mt-16">
        <p class="text-base font-semibold leading-8 text-indigo-600">404</p>
        <h1
          class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          This page does not exist
        </h1>
        <p
          class="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8"
        >
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <router-link
          to="/"
          class="inline-block font-semibold leading-6 text-indigo-600 hover:text-indigo-800 pt-10"
        >
          <span aria-hidden="true">&larr;</span>
          Back to home
        </router-link>
        <div class="mt-10">
          <router-link to="https://poojanchapagain.com.np/" class="text-center"
            ><img
              src="/images/mylogo.png"
              class="mx-auto max-w-[150px]"
              alt="pujan chapagain logo"
          /></router-link>
        </div>
      </div>
    </div>
  </main>
</template>
