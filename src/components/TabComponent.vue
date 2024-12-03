<template>
  <div class="tabs">
    <button
      v-for="index in indices"
      :key="index"
      :class="{ active: index === selectedIndex }"
      @click="changeIndex(index)"
    >
      {{ index }}
    </button>
  </div>
</template>

<script>
import { useGlobalStore } from "../store/index.js";
import { computed } from "vue";

export default {
  name: "TabComponent",
  setup() {
    const store = useGlobalStore();
    const indices = ["IPSA", "IGPA", "NASDAQ", "DOW JONES", "SP/BVL"];
    const selectedIndex = computed(() => store.selectedIndex);

    const changeIndex = (index) => {
      store.setIndex(index);
    };

    return {
      indices,
      selectedIndex,
      changeIndex,
    };
  },
};
</script>

<style>
.tabs {
  display: flex;
  justify-content: start;
  gap: 10px;
  margin: 10px 15px;
}

button {
  background-color: #222;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.active {
  background-color: #42A5F5;
}
</style>

