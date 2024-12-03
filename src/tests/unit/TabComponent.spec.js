import { mount } from "@vue/test-utils";
import TabComponent from "@/components/TabComponent.vue";
import { createPinia, setActivePinia } from "pinia";
import { useGlobalStore } from "@/store/index.js";

describe("TabComponent", () => {
  beforeEach(() => {
    setActivePinia(createPinia()); // Configura el estado global
  });

  it("renderiza correctamente los botones", () => {
    const wrapper = mount(TabComponent);
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBe(5); // Asegúrate de que haya 5 botones
    expect(buttons[0].text()).toBe("IPSA");
  });

  it("cambia el índice cuando se hace clic en un botón", async () => {
    const wrapper = mount(TabComponent);
    const store = useGlobalStore();
    const buttons = wrapper.findAll("button");

    await buttons[1].trigger("click"); // Simula un clic en el segundo botón (IGPA)
    expect(store.selectedIndex).toBe("IGPA"); // Verifica que el índice global cambió
  });

  it("aplica la clase activa al botón seleccionado", async () => {
    const wrapper = mount(TabComponent);
    const store = useGlobalStore();
    store.setIndex("DOW JONES"); // Cambia el índice global

    await wrapper.vm.$nextTick(); // Espera a que el DOM se actualice
    const activeButton = wrapper.find("button.active");
    expect(activeButton.text()).toBe("DOW JONES");
  });
});
