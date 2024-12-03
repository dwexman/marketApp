<template>
  <template v-if="instrumentData">
    <td>{{ instrumentData.info.shortName }}</td>
    <td>{{ formatPrice(instrumentData.chart[0]?.lastPrice || 0) }}</td>
    <td>{{ formatVolume(instrumentData.chart[0]?.volumeMoney || 0) }}</td>
    <td :class="getClass(instrumentData.chart[0]?.performanceAbsolute || 0)">
      {{ formatPercentage(instrumentData.chart[0]?.performanceAbsolute || 0) }}
    </td>
    <td :class="getClass(instrumentData.chart[1]?.performanceAbsolute || 0)">
      {{ formatPercentage(instrumentData.chart[1]?.performanceAbsolute || 0) }}
    </td>
    <td>{{ instrumentData.info.countryName }}</td>
    <td>{{ instrumentData.info.currencyName }}</td>
  </template>
  <template v-else>
    <td colspan="7" class="loading">Cargando datos...</td>
  </template>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "InstrumentItemComponent",
  props: {
    instrumentUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const instrumentData = ref(null);

    const fetchInstrumentData = async () => {
      try {
        const response = await fetch(props.instrumentUrl);
        if (!response.ok) {
          throw new Error(`Error al cargar ${props.instrumentUrl}: ${response.statusText}`);
        }
        const data = await response.json();
        instrumentData.value = data.data; // Extrae la propiedad "data" del JSON
      } catch (error) {
        console.error(`Error al cargar los datos del instrumento:`, error);
      }
    };

    onMounted(fetchInstrumentData);

    const formatPrice = (value) => `$${value.toFixed(2)}`;
    const formatVolume = (value) => `${(value / 1_000_000).toFixed(2)}M`;
    const formatPercentage = (value) => `${value.toFixed(2)}%`;
    const getClass = (value) => (value > 0 ? "positive" : value < 0 ? "negative" : "");

    return {
      instrumentData,
      formatPrice,
      formatVolume,
      formatPercentage,
      getClass,
    };
  },
};
</script>

<style>
.loading {
  text-align: center;
  color: #ccc;
  font-style: italic;
}
.positive {
  color: #00ff00;
}
.negative {
  color: #ff0000;
}
</style>
