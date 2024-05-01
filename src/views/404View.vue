<script setup></script>
<template>
  <main
    class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
  >
    <div class="">
      <router-link to="https://poojanchapagain.com.np/" class="text-center"
        ><img
          src="/images/mylogo.png"
          class="mx-auto max-w-[150px]"
          alt="pujan chapagain logo"
      /></router-link>
      <div class="mx-auto mt-10 max-w-2xl text-center md:mt-16">
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
          class="text-sm inline-block font-semibold leading-6 text-indigo-600 pt-10"
        >
          <span aria-hidden="true">&larr;</span>
          Back to home
        </router-link>
      </div>
    </div>
  </main>
</template>
