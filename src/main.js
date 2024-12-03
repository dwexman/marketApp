import { createApp } from "vue";
import App from "./App.vue";
import Vuikit from "vuikit";
import VuikitIcons from "@vuikit/icons";
import "@vuikit/theme";
import { createPinia } from "pinia";
import { useGlobalStore } from "./store/index.js";

const app = createApp(App);

// Configuración de Vuikit
app.use(Vuikit);
app.use(VuikitIcons);

// Configuración de Pinia
const pinia = createPinia();
app.use(pinia);

const store = useGlobalStore();

// Cargar datos iniciales de resumen
const loadInitialData = async () => {
  console.log("Ejecutando loadInitialData...");
  try {
    const resumenResponse = await fetch("/data/resumen.json");
    if (!resumenResponse.ok) {
      throw new Error(`Error al cargar resumen.json: ${resumenResponse.statusText}`);
    }
    const resumenData = await resumenResponse.json();

    // Pasar los datos al store
    store.setInstrumentsData({
      resumen: resumenData,
      history: [], // No cargamos history aquí, se gestiona en los componentes
    });
  } catch (error) {
    console.error("Error cargando datos iniciales:", error);
  }
};

// Ejecutar la carga de datos iniciales
loadInitialData();

app.mount("#app");
