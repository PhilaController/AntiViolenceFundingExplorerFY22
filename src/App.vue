<template>
  <div data-vuetify>
    <v-app>
      <v-main>
        <DataDashboard :data="data" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import DataDashboard from "./components/DataDashboard";

export default {
  name: "App",
  components: {
    DataDashboard,
  },
  data: () => ({
    data: require("@/data/data.json"),
  }),
};
</script>
