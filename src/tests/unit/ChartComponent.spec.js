import { mount } from "@vue/test-utils";
import ChartComponent from "@/components/ChartComponent.vue";

describe("ChartComponent", () => {
  it("muestra 'Cargando datos...' si no hay datos", () => {
    const wrapper = mount(ChartComponent, {
      props: { selectedInstrument: "IPSA" },
    });
    expect(wrapper.text()).toContain("Cargando datos...");
  });

  it("renderiza el gráfico cuando hay datos", async () => {
    const mockData = [
      { datetimeLastPrice: "2024-12-01", openPrice: 100 },
      { datetimeLastPrice: "2024-12-02", openPrice: 200 },
    ];

    const wrapper = mount(ChartComponent, {
      props: { selectedInstrument: "IPSA" },
      data() {
        return {
          chartData: mockData,
        };
      },
    });

    await wrapper.vm.$nextTick(); // Espera a que el gráfico se renderice
    expect(wrapper.find("canvas").exists()).toBe(true);
  });
});
