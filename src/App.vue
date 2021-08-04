<template>
  <div data-vuetify>
    <v-app>
      <v-main>
        <!-- Intro section -->
        <Intro :data="data" />

        <div class="section funding-details">
          <!-- Header -->
          <h2 class="mb-2">Funding Details</h2>
          <hr class="titlebar" />

          <!-- Dashboard content -->
          <DataDashboard :data="data" />
        </div>

        <div class="section footnotes">
          <!-- Header -->
          <h2 class="mb-2">Footnotes</h2>
          <hr class="titlebar" />

          <!-- Footnote #1 -->
          <p>
            <a
              href="#"
              id="ref1"
              title="Jump back to footnote 1 in the
        text."
              >[1]&nbsp;</a
            >
            The categorization used in this analysis was outlined by David
            Muhammad of the National Institute for Criminal Justice Reform
            during a
            <a
              href="https://controller.phila.gov/wp-content/uploads/2021/08/Ideas-We-Should-Steal-2019-Confercence-—-David-Muhammad.pdf"
              target="_blank"
              >2019 presentation</a
            >. His organization has extensive experience, e.g., see
            <a
              href="https://citiesunited.org/pdf/Cities_United_and_NICJR_Four_Proven_Ways_June_2017.pdf"
              target="_blank"
              >this 2017 report</a
            >, in researching and implementing effective violence reduction
            efforts. Thomas Abt of the Council on Criminal Justice advocates for
            similar approaches to gun violence reduction in his recent book
            <span class="font-italic">Bleeding Out</span>. In particular, he
            recommends that efforts should be focused on violence itself rather
            than related economic and social challenges such as poverty.
          </p>
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import DataDashboard from "@/components/DataDashboard";
import Intro from "@/components/Intro";

export default {
  name: "App",
  components: {
    DataDashboard,
    Intro,
  },
  data: () => ({
    data: require("@/data/data.json"),
  }),
};
</script>

<style>
.section:nth-child(n + 2) {
  margin-top: 50px !important;
}
</style>
