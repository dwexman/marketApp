<template>
  <div class="summary">
    <h3 class="summary-title">Resumen</h3>
    <div class="summary-separator"></div>
    <ul class="summary-list">
      <li v-for="row in tableData" :key="row.id">
        {{ row.Campo }}: {{ row.Valor }}
      </li>
    </ul>
    <div class="summary-separator"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "SummaryComponent",
  setup() {
    const tableData = ref([]);

    const loadData = async () => {
      try {
        const response = await fetch(`/data/resumen/IPSA.json`);

        if (!response.ok) {
          console.error(`Error al cargar el archivo JSON: ${response.status} - ${response.statusText}`);
          return;
        }

        const json = await response.json();

        if (json && json.data) {
          const data = json.data;
          tableData.value = [
            { id: 1, Campo: "Mercado", Valor: data.info.marketName },
            { id: 2, Campo: "Apertura", Valor: data.price.openPrice.toLocaleString() },
            { id: 3, Campo: "Cierre Anterior", Valor: data.price.closePrice.toLocaleString() },
            { id: 4, Campo: "Máximo Diario", Valor: data.price.maxDay.toLocaleString() },
            { id: 5, Campo: "Mínimo Diario", Valor: data.price.minDay.toLocaleString() },
            { id: 6, Campo: "Máximo 52 Semanas", Valor: data.price.max52W.toLocaleString() },
            { id: 7, Campo: "Mínimo 52 Semanas", Valor: data.price.min52W.toLocaleString() },
            { id: 8, Campo: "Variación 1 Mes", Valor: `${(data.price.pct30D * 100).toFixed(2)}%` },
            { id: 9, Campo: "Variación 1 Año", Valor: `${(data.price.pctRelCY * 100).toFixed(2)}%` },
            { id: 10, Campo: "Año a la Fecha", Valor: `${(data.price.pctRelW52 * 100).toFixed(2)}%` },
          ];
        } else {
          console.error("Estructura del JSON inválida.");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    // Cargar los datos al montar el componente
    onMounted(() => loadData());

    return {
      tableData,
    };
  },
};
</script>

<style scoped>
.summary {
  width: 30%;
  color: #fff;
  font-family: Arial, sans-serif;
}

.summary-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  padding-bottom: 8px;
}

.summary-separator {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.6);
  margin: 8px 0;
}

.summary-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.summary-list li {
  font-size: 17px;
  line-height: 1.8;
}
</style>
