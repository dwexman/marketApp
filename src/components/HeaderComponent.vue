<template>
  <div class="header">
    <div class="header-title">IPSA, CHILE</div>
    <div class="header-subtitle">Índice</div>
    <div class="separator"></div>
    <div class="header-values">
      <!-- Valor Actual -->
      <div class="value-item">
        <span class="label">Valor Actual:</span>
        <span
          class="value"
          :class="{ negative: valueActual < 0, positive: valueActual >= 0 }"
        >
          {{ valueActual.toLocaleString() }}
        </span>
      </div>
      <!-- Variación Porcentual -->
      <div class="value-item">
        <span class="label">Var. % Actual:</span>
        <span
          class="value"
          :class="{ negative: variationPercentage < 0, positive: variationPercentage >= 0 }"
        >
          {{ variationPercentage }}%
        </span>
      </div>
      <!-- Variación en Puntos -->
      <div class="value-item">
        <span class="label">Var. Puntos Actual:</span>
        <span
          class="value"
          :class="{ negative: variationPoints < 0, positive: variationPoints >= 0 }"
        >
          {{ variationPoints }}
        </span>
      </div>
    </div>
    <div class="separator"></div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      valueActual: 6474.37, 
      variationPercentage: -0.78, 
      variationPoints: -51.01, 
    };
  },
};
</script>

<style scoped>
.header {
  width: 70%; 
  margin: 0;
  padding: 10px 20px;
  color: #fff;
  box-sizing: border-box;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.header-subtitle {
  font-size: 16px;
  margin-bottom: 4px;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.6);
  margin: 8px 0;
}

.header-values {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.value-item {
  display: flex;
  gap: 4px; 
}

.label {
  font-size: 16px;
  color: #9a9797; 
}

.value {
  font-size: 16px;
  font-weight: bold;
}

/* Colores dinámicos */
.positive {
  color: #fff; 
}

.negative {
  color: #f00; 
}
</style>
