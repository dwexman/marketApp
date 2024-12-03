import { setActivePinia, createPinia } from "pinia";
import { useGlobalStore } from "@/store/index.js";

describe("useGlobalStore", () => {
  // Configura un Pinia activo antes de cada prueba
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("inicia con el estado correcto", () => {
    const store = useGlobalStore();
    expect(store.selectedIndex).toBe(null); // Verifica que el índice inicial sea null
    expect(store.selectedInstrument).toBe(null); // Verifica que no haya un instrumento seleccionado
    expect(store.resumenData).toEqual([]); // El estado inicial del resumen debe ser un array vacío
    expect(store.historyData).toEqual([]); // El estado inicial del historial debe ser un array vacío
  });

  it("actualiza el índice correctamente", () => {
    const store = useGlobalStore();
    store.setIndex("IPSA"); // Llama a la acción setIndex
    expect(store.selectedIndex).toBe("IPSA"); // Verifica que el índice se actualizó
  });

  it("actualiza el instrumento seleccionado correctamente", () => {
    const store = useGlobalStore();
    store.selectInstrument("Instrumento 1"); // Llama a la acción selectInstrument
    expect(store.selectedInstrument).toBe("Instrumento 1"); // Verifica que el instrumento se seleccionó correctamente
  });

  it("actualiza los datos del resumen e historial correctamente", () => {
    const store = useGlobalStore();
    const resumenMock = [{ name: "Resumen 1" }, { name: "Resumen 2" }];
    const historyMock = [{ name: "Historial 1" }, { name: "Historial 2" }];

    // Llama a la acción setInstrumentsData con datos mock
    store.setInstrumentsData({ resumen: resumenMock, history: historyMock });

    expect(store.resumenData).toEqual(resumenMock); // Verifica que los datos de resumen se actualizaron
    expect(store.historyData).toEqual(historyMock); // Verifica que los datos de historial se actualizaron
  });
});
