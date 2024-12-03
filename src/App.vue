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
        <div class="instrument-container">
          <TabComponent />
          <ListComponent />
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
import TabComponent from "./components/TabComponent.vue";
import ListComponent from "./components/InstrumentListComponent.vue";
import { ref } from "vue";

export default {
  components: {
    SearchBarComponent,
    HeaderComponent,
    SummaryComponent,
    ChartComponent,
    TabComponent,
    ListComponent,
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
body {
  background-color: #000; 
  margin: 0;
  padding: 0;
}

#app {
  background-color: transparent; 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  align-items: flex-start; 
  width: 100%;
  margin-bottom: 20px;
  z-index: 2; 
}

/* Chart Wrapper */
.chart-wrapper {
  position: relative;
  margin-top: -130px;
  margin-left: 50px;
  width: 100%; 
  height: 600px; 
  margin-bottom: 20px; 
  padding: 0;
  background-color: #000; 
}

/* Instrument Container */
.instrument-container {
  background-color: #000;
  margin-top: -280px; 
  z-index: 2;
}

/* Tabs */
.tab-component {
  margin-top: 0px;
  background-color: #fff;
  color: #000; 
  padding: 10px;
  border-radius: 5px;
}

.tab-component button {
  background-color: transparent;
  border: none;
  color: inherit;
  margin: 0 5px;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

.tab-component button.active {
  background-color: #007bff; 
  color: #fff; 
}
</style>
