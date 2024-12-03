import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    resumenData: [], 
    historyData: [], 
    selectedInstrument: null, 
    selectedIndex: "IPSA",
  }),
  actions: {
    setInstrumentsData({ resumen }) {
      this.resumenData = resumen;
    },
    selectInstrument(instrument) {
      this.selectedInstrument = instrument;
    },
    setIndex(index) {
        this.selectedIndex = index; 
      },
  },
  getters: {
    filteredInstruments(state) {
      return state.resumenData;
    },
  },
});
