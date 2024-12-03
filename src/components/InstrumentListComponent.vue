<template>
  <div class="instrument-list">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Último</th>
          <th>Monto (MM)</th>
          <th>Var día</th>
          <th>Var 30d</th>
          <th>País</th>
          <th>Moneda</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="url in instrumentUrls" :key="url">
          <InstrumentItemComponent :instrument-url="url" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import InstrumentItemComponent from "./InstrumentItemComponent.vue";

export default {
  name: "InstrumentListComponent",
  components: {
    InstrumentItemComponent,
  },
  setup() {
    const instrumentUrls = [
      "/data/history/history-AGUAS-A.json",
      "/data/history/history-ANDINA-B.json",
      "/data/history/history-BCI.json",
      "/data/history/history-BSANTANDER.json",
      "/data/history/history-CAP.json",
      "/data/history/history-IPSA.json",
    ];

    return {
      instrumentUrls,
    };
  },
};
</script>

<style>
.instrument-list {
  width: 100%;
  overflow-x: auto;
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #000;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

thead {
  background-color: #222;
}

thead th {
  padding: 15px 10px;
  text-align: left;
  border-bottom: 2px solid #fff;
}

tbody tr {
  border-bottom: 1px solid #444;
}

tbody tr:hover {
  background-color: #333;
}

tbody td {
  padding: 12px 10px;
  text-align: left;
}

tbody td:nth-child(1) {
  font-weight: bold;
}
</style>
