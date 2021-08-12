<template>
  <div data-vuetify>
    <v-app>
      <v-main>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#2176d2"
          centered
        >
          <v-tab key="analysis" to="/" :ripple="false"> Analysis </v-tab>
          <v-tab key="funding-explorer" to="/explorer" :ripple="false">
            Funding Explorer
          </v-tab>
        </v-tabs>

        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    tab: null,
  }),
};
</script>

<style>
.section:nth-child(n + 2) {
  margin-top: 50px !important;
}
.titlebar {
  padding-bottom: 20px !important;
}
</style>
