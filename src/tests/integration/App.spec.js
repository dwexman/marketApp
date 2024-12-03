import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import { createPinia, setActivePinia } from "pinia";
import { useGlobalStore } from "@/store/index.js";

describe("Flujo de selección de instrumentos", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("actualiza los componentes cuando se selecciona un nuevo instrumento", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
      },
    });
    const store = useGlobalStore();

    // Simula la selección de un instrumento
    const tabButtons = wrapper.findComponent({ name: "TabComponent" }).findAll("button");
    await tabButtons[1].trigger("click"); // Selecciona "IGPA"

    expect(store.selectedIndex).toBe("IGPA"); // Verifica que el índice global cambió
    expect(wrapper.findComponent({ name: "HeaderComponent" }).text()).toContain("IGPA");
    expect(wrapper.findComponent({ name: "SummaryComponent" }).text()).toContain("IGPA");

    // Verifica que el gráfico se actualizó
    const chartComponent = wrapper.findComponent({ name: "ChartComponent" });
    expect(chartComponent.props("selectedInstrument")).toBe("IGPA");
  });
});
