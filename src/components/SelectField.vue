<script lang="ts" setup>
import { computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import ChevronUpDownIcon from "@/svgs/ChevronUpDownIconSvg.vue";
import CheckIcon from "@/svgs/CheckIconSvg.vue";

interface PropsInterface {
  lists: Array<typeof T>;
  valueKey: string | number;
  nameKey: string;
  modelValue: number | string | boolean | object;
}
const props = defineProps<PropsInterface>();

const selectedList = computed<string>(() => {
  const selected = props.lists.find(
    (l) => l[props.valueKey] === props.modelValue
  );
  if (!selected) {
    return "";
  }
  return selected[props.nameKey];
});
</script>

<template>
  <Listbox
    as="div"
    :modelValue="props.modelValue"
    @update:modelValue="(value) => $emit('update:modelValue', value)"
  >
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <span class="block truncate">{{ selectedList }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 small-scroll w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="(list, index) in props.lists"
            :key="index"
            :value="list[props.valueKey]"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-3 pr-9',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-semibold text-pr' : 'font-normal',
                  'block truncate',
                ]"
                >{{ list[props.nameKey] }}</span
              >

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<style></style>
