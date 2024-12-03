<template>
  <div class="chart-container">
    <div v-if="chartData.length">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div v-else>
      <p style="color: white;">Cargando datos...</p>
    </div>
    <div class="tabs">
      <button
        v-for="period in periods"
        :key="period.value"
        :class="{ active: selectedPeriod === period.value }"
        @click="updatePeriod(period.value)"
      >
        {{ period.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "ChartComponent",
  props: {
    selectedInstrument: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const chartData = ref([]);
    const filteredData = ref([]);
    const chartInstance = ref(null);
    const chartCanvas = ref(null);

    const selectedPeriod = ref("1D");
    const periods = ref([
      { label: "1 Día", value: "1D" },
      { label: "1 Mes", value: "1M" },
      { label: "3 Meses", value: "3M" },
      { label: "6 Meses", value: "6M" },
      { label: "1 Año", value: "1Y" },
    ]);

    const loadChartData = async () => {
      try {
        const response = await fetch(
          `/data/history/history-${props.selectedInstrument}.json`
        );
        if (!response.ok) throw new Error("Error al cargar los datos");
        const data = await response.json();
        chartData.value = data.data.chart;

        if (chartData.value.length) {
          filterData();
          await nextTick();
          renderChart();
        } else {
          console.error("Los datos del gráfico están vacíos.");
        }
      } catch (error) {
        console.error("Error cargando los datos del gráfico:", error);
      }
    };

    const filterData = () => {
      const latestDate = new Date(
        chartData.value[chartData.value.length - 1].datetimeLastPrice
      );

      const filterByPeriod = {
        "1D": (date) => date.getDate() === latestDate.getDate(),
        "1M": (date) =>
          date >= new Date(latestDate.setMonth(latestDate.getMonth() - 1)),
        "3M": (date) =>
          date >= new Date(latestDate.setMonth(latestDate.getMonth() - 3)),
        "6M": (date) =>
          date >= new Date(latestDate.setMonth(latestDate.getMonth() - 6)),
        "1Y": (date) =>
          date >= new Date(latestDate.setFullYear(latestDate.getFullYear() - 1)),
      };

      filteredData.value = chartData.value.filter((item) => {
        const date = new Date(item.datetimeLastPrice);
        return filterByPeriod[selectedPeriod.value](date);
      });
    };

    const renderChart = () => {
      if (!chartCanvas.value) {
        console.error("El canvas aún no está disponible.");
        return;
      }

      if (chartInstance.value) {
        chartInstance.value.destroy();
      }

      chartInstance.value = new Chart(chartCanvas.value, {
        type: "line",
        data: {
          labels: filteredData.value.map((item) =>
            new Date(item.datetimeLastPrice).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Precio de apertura (openPrice)",
              data: filteredData.value.map((item) => item.openPrice),
              borderColor: "#42A5F5",
              backgroundColor: "rgba(66, 165, 245, 0.2)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "#fff",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#fff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
            y: {
              ticks: {
                color: "#fff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.2)",
              },
            },
          },
        },
      });
    };

    const updatePeriod = async (period) => {
      selectedPeriod.value = period;
      filterData();
      await nextTick();
      renderChart();
    };

    onMounted(loadChartData);

    watch(() => props.selectedInstrument, async () => {
      await nextTick();
      loadChartData();
    });

    return {
      chartData,
      filteredData,
      chartCanvas,
      selectedPeriod,
      periods,
      updatePeriod,
    };
  },
};
</script>

<style>
.chart-container {
  width: 100%; 
  height: 800px; 
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  background-color: #000; 
  overflow: hidden;
}

canvas {
  width: 100%; 
  height: 100%; 
}

.tabs {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.tabs button {
  background-color: #222;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.tabs button.active {
  background-color: #42A5F5;
}
</style>
