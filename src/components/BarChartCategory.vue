<template>
  <div>
    <apexchart
      class="histogram"
      :height="height"
      type="bar"
      :series="series"
      :options="chartOptions"
      v-if="showChart"
    ></apexchart>
    <div v-if="show_note && series.length == 5" class="bar-chart-footer">
      Note: The diagonal yellow lines denote funding for the Anti-Violence
      Community Expansion Grants, which are intended to fund intervention work
      but have not yet been awarded to community organizations.
    </div>
  </div>
</template>

<script>
import { formatFn } from "@/utils/formatFns.js";
import VueApexCharts from "vue-apexcharts";
import { sum } from "d3-array";

export default {
  props: [
    "show_note",
    "data",
    "height",
    "categories",
    "colors",
    "show_percents",
    "xmax",
  ],
  components: { apexchart: VueApexCharts },
  data() {
    return {
      labelWidth: 125,
    };
  },
  methods: {
    formatTooltip(d, opts) {
      if (opts.seriesIndex == opts.dataPointIndex) {
        let total = sum(this.series[opts.dataPointIndex].data);
        if (opts.seriesIndex == 0 && this.series.length == 5)
          total += sum(this.series[4].data);
        let out = formatFn(total);
        if (this.show_percents)
          out = `${out} (${((100 * total) / this.total).toFixed(0)}%)`;
        return out;
      }
    },
  },
  computed: {
    showChart() {
      if (!this.data) return false;
      else return this.total > 0;
    },
    total() {
      if (this.data) {
        let total = 0;
        for (const [key, value] of this.data) total += value;
        return total;
      }
    },
    series() {
      if (this.data) {
        let data = [];
        for (let i = 0; i < this.categories.length; i++) {
          let key = this.categories[i];
          let value = this.data.get(key) || 0;
          let s = [];
          let d = { name: key };
          for (let j = 0; j < this.categories.length; j++) {
            if (i == j) {
              s.push(value);
            } else s.push(null);
          }
          d["data"] = s;
          data.push(d);
        }

        let key = "Intervention/Prevention";
        let value = this.data.get(key);

        if (value) {
          let i = this.categories.indexOf("Intervention");
          let s = [];
          let d = { name: key };
          for (let j = 0; j < this.categories.length; j++) {
            if (i == j) {
              s.push(value);
            } else s.push(null);
          }
          d["data"] = s;
          data.push(d);
        }
        return data;
      }
    },
    chartOptions() {
      return {
        chart: {
          type: "bar",
          stacked: true,
          height: this.height,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: { position: "bottom" },
          },
        },
        colors: this.colors,
        legend: { show: false },
        xaxis: {
          type: "category",
          categories: this.categories,
          labels: {
            style: { fontSize: "1rem" },
            formatter: (d) => formatFn(d, 2),
            show: false,
          },
          axisTicks: { show: false },
          axisBorder: { show: false },
          max: this.xmax,
        },
        yaxis: {
          labels: {
            style: { fontSize: "16px" },
            trim: false,
            minWidth: this.labelWidth,
            maxWidth: this.labelWidth,
          },
          axisBorder: { show: false },
        },
        tooltip: {
          enabled: false,
        },
        dataLabels: {
          enabled: true,
          formatter: this.formatTooltip,
          textAnchor: "start",
          offsetY: 7,
          offsetX: 10,
          style: {
            fontSize: "1rem",
            fontWeight: "bold",
            colors: ["#212529"],
          },
        },
        grid: { show: false, padding: { bottom: -10 } },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
          active: {
            filter: {
              type: "none",
            },
          },
        },
        stroke: {
          width: 2,
        },
        fill: {
          type: ["fill", "fill", "fill", "fill", "pattern"],
          opacity: 1,
          pattern: {
            style: "slantedLines",
            width: 7,
            strokeWidth: 2.5,
            height: 40,
          },
        },
      };
    },
  },
};
</script>

<style>
.bar-chart-footer {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.9rem;
  font-style: italic;
}
.apexcharts-xaxis-label {
  dominant-baseline: middle !important;
}
.apexcharts-yaxis-label {
  dominant-baseline: middle !important;
}
</style>