<template>
  <div id="app">
    <div class="layout">
      <SearchBarComponent />
      <div class="content">
        <div class="header-summary-row">
          <HeaderComponent />
          <SummaryComponent :selectedInstrument="selectedInstrument" />
        </div>
        <div class="chart-wrapper">
          <ChartComponent :selectedInstrument="selectedInstrument" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBarComponent from "./components/SearchBarComponent.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
import SummaryComponent from "./components/SummaryComponent.vue";
import ChartComponent from "./components/ChartComponent.vue";
import { ref } from "vue";

export default {
  components: {
    SearchBarComponent,
    HeaderComponent,
    SummaryComponent,
    ChartComponent,
  },
  setup() {
    const selectedInstrument = ref("IPSA");
    return {
      selectedInstrument,
    };
  },
};
</script>

<style>
/* Estilo Global */
body {
  margin: 0;
  padding: 0;
  background-color: #000; 
  font-family: Arial, sans-serif;
}

/* App */
#app {
  background-color: #000;
  color: #fff;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

/* Layout */
.layout {
  display: flex;
  flex-direction: column;
}

/* Content */
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
}

/* Header + Summary */
.header-summary-row {
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: baseline; 
  width: 100%;
  margin-bottom: 20px;
}

/* Chart Wrapper */
.chart-wrapper {
  position: relative;
  margin-top: -200px; 
  max-width: 100%;
  height: 800px; 
  overflow: hidden; 
  padding: 0 10px;
}

.chart-wrapper canvas {
  max-width: 100%; 
  height: 100%;
}
</style>
