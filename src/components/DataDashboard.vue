<template>
  <div class="data-dashboard">
    <!-- First row: Filters and charts -->
    <v-row no-gutters class="mt-5">
      <!-- 1. Filters -->
      <v-col cols="12" sm="12" md="4">
        <!-- Header -->
        <div>
          <div class="subtitle">Filters</div>
          <div class="font-italic mb-3">
            Use the filters below to view a subset of the data.
          </div>
        </div>

        <!-- Range slider -->
        <div
          class="
            w-100
            total-slider-wrapper
            d-flex
            flex-column
            justify-content-center
          "
        >
          <label for="input-8" class="v-label v-label--active theme--light mb-5"
            >Funding Amount</label
          >
          <vue-slider
            class="total-slider"
            v-model="totalRange"
            :min="allowedTotalRange[0]"
            :max="allowedTotalRange[1]"
            :lazy="true"
            tooltip="always"
            :enableCross="false"
            width="80%"
            :clickable="false"
            tooltipPlacement="bottom"
            :tooltip-formatter="formatTotal"
          ></vue-slider>
        </div>

        <!-- New or Existing? -->
        <div>
          <v-select
            :items="allowedKinds"
            v-model="selectedKind"
            item-text="value"
            item-value="id"
            label="New or Existing?"
            chips
            @change="filterKind"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeKind(item.id)"
                :color="getExistingColor(item.value)"
                label
              >
                {{ item.value }}
              </v-chip>
            </template>
          </v-select>
        </div>

        <!-- Spending Type -->
        <div>
          <v-select
            :items="allowedCategories"
            v-model="selectedCategories"
            item-text="value"
            item-value="id"
            label="Spending Type"
            chips
            multiple
            @change="filterCategory"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="removeCategory(item.id)"
                :color="getShortCategoryColor(item.value)"
                label
              >
                {{ item.value }}
              </v-chip>
            </template>
          </v-select>
        </div>

        <!-- Search field -->
        <div>
          <v-text-field
            class="my-search-field"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
        </div>

        <!-- Reset button -->
        <div
          class="
            d-flex
            justify-content-center
            align-items-center
            reset-button-wrapper
          "
        >
          <v-btn
            v-if="showResetButton"
            class="reset-button"
            @click="resetFilters"
            outlined
            light
            :ripple="false"
          >
            <i class="fas fa-undo"></i
            ><span class="ml-3">Reset All Filters</span></v-btn
          >
        </div>
      </v-col>

      <!-- Add space between filters and charts -->
      <v-spacer></v-spacer>

      <!-- 2. Charts -->
      <v-col cols="12" sm="12" md="7">
        <div>
          <div class="subtitle indented">Funding Summary</div>
          <div class="font-italic mb-3 indented">
            Charts will update automatically to reflect the current data
            selection when filters are applied.
          </div>
        </div>
        <div>
          <div class="d-flex flex-column align-items-end">
            <BarChart
              :data="kindTotals"
              :categories="allowedKindNames"
              :colors="allowedKindNames.map(getExistingColor)"
              :height="125"
              class="w-100"
              :show_percents="true"
            />
            <BarChart
              :data="categoryTotals"
              :categories="allowedCategoryNames"
              :colors="allowedCategoryNames.map(getShortCategoryColor)"
              :height="200"
              class="w-100"
              :show_percents="true"
            />
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Second row: data table -->
    <v-row no-gutters class="mt-5 ml-2 mr-2">
      <!-- Title and Subtitle -->
      <v-col cols="12" md="8" sm="12">
        <div class="d-flex flex-column">
          <div class="subtitle">Funded Programs</div>
          <div class="font-italic mb-3">
            Additional details for each program can be shown by clicking on an
            individual row.
          </div>
        </div>
      </v-col>

      <v-spacer></v-spacer>

      <!-- Buttons: Show/Collapse Rows -->
      <v-col cols="12" md="2" sm="6" xs="12">
        <div class="d-flex flex-column">
          <v-btn
            class="table-button"
            @click="expandRows"
            :disabled="allExpanded"
            outlined
            light
            small
            :ripple="false"
            >Expand Rows</v-btn
          >
          <v-btn
            class="table-button mt-2"
            @click="collapseRows"
            :disabled="noExpanded"
            outlined
            light
            small
            :ripple="false"
          >
            Collapse Rows</v-btn
          >
        </div>
      </v-col>

      <!-- Table -->
      <v-col cols="12" class="mt-3">
        <v-data-table
          class="my-data-table elevation-2 mb-2"
          ref="dataTable"
          :headers="headers"
          :items="filteredData"
          item-key="id"
          :search="search"
          sort-by="total"
          :sort-desc="true"
          :disable-pagination="true"
          :hide-default-footer="true"
          show-expand
          must-sort
          :expanded.sync="expanded"
          @click:row="clicked"
        >
          <template v-slot:item.program="{ item }">
            {{ loadTitle(item.id) }}
          </template>
          <template v-slot:item.kind="{ item }">
            <v-chip
              class="existing-chip"
              :color="getExistingColor(item.kind)"
              label
            >
              {{ item.kind }}
            </v-chip>
          </template>
          <template v-slot:item.short_cat="{ item }">
            <v-chip
              class="short-category-chip"
              :color="getShortCategoryColor(item.short_cat)"
              label
            >
              {{ item.short_cat }}
            </v-chip>
          </template>
          <template v-slot:item.total="{ item }">
            <span>{{ formatTotal(item.total) }}</span>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td
              :colspan="headers.length"
              class="expanded-content"
              v-html="loadDescription(item.id)"
            ></td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { formatFn } from "@/utils/formatFns.js";
import { rollup, sum, min, max } from "d3-array";
import BarChart from "./BarChart";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  props: ["data"],
  components: { BarChart, VueSlider },
  data() {
    return {
      expanded: [],
      search: "",
      allowedKindNames: ["Existing", "New"],
      allowedCategoryNames: [
        "Intervention",
        "Prevention",
        "Transformation",
        "Police Response",
      ],
      selectedKind: null,
      selectedCategories: [],
      totalRange: [null, null],
      allowedTotalRange: [null, null],
    };
  },
  mounted() {
    this.$nextTick(() => {
      // Calculate allowed range
      this.allowedTotalRange = [
        min(this.data, (d) => d.total),
        max(this.data, (d) => d.total),
      ];

      // Set it
      this.totalRange = this.allowedTotalRange;
    });
  },
  computed: {
    currentDataSelection() {
      let data = this.filteredData;
      if (this.search !== "") data = this.$refs.dataTable.internalCurrentItems;

      return data;
    },
    allExpanded() {
      return this.expanded.length == this.currentDataSelection.length;
    },
    noExpanded() {
      return this.expanded.length == 0;
    },
    showResetButton() {
      return (
        this.search != "" ||
        this.selectedKind != null ||
        this.selectedCategories.length > 0 ||
        this.totalRange[0] !== this.allowedTotalRange[0] ||
        this.totalRange[1] !== this.allowedTotalRange[1]
      );
    },
    allowedCategories() {
      let out = [];
      for (let i = 0; i < this.allowedCategoryNames.length; i++)
        out.push({ id: i + 1, value: this.allowedCategoryNames[i] });
      return out;
    },
    allowedKinds() {
      let out = [];
      for (let i = 0; i < this.allowedKindNames.length; i++)
        out.push({ id: i + 1, value: this.allowedKindNames[i] });
      return out;
    },
    categoryTotals() {
      return rollup(
        this.currentDataSelection,
        (v) => sum(v, (d) => d.total),
        (d) => d.short_cat
      );
    },
    kindTotals() {
      return rollup(
        this.currentDataSelection,
        (v) => sum(v, (d) => d.total),
        (d) => d.kind
      );
    },
    filteredData() {
      // Start from the full data
      let out = this.data;

      // Trim by range
      out = out.filter((item) => item.total >= this.totalRange[0]);
      out = out.filter((item) => item.total <= this.totalRange[1]);

      // No other filters
      if (this.selectedKind === null && this.selectedCategories.length == 0)
        return out;

      // Trim by New or Existing
      if (this.selectedKind !== null) {
        let kind = this.allowedKindNames[this.selectedKind - 1];
        out = out.filter((item) => item.kind === kind);
      }

      // Trim by categories
      let selectedValues;
      if (this.selectedCategories.length > 0) {
        selectedValues = this.allowedCategories
          .filter((item) => this.selectedCategories.indexOf(item.id) !== -1)
          .map((item) => item.value);
        out = out.filter(
          (item) => selectedValues.indexOf(item.short_cat) !== -1
        );
      }

      return out;
    },
    headers() {
      return [
        {
          text: "Program",
          align: "start",
          sortable: false,
          value: "program",
          width: "50%",
        },

        {
          text: "New or Existing?",
          value: "kind",
          sortable: false,
          width: "20%",
        },
        {
          text: "Spending Type",
          value: "short_cat",
          sortable: false,
          width: "20%",
        },
        { text: "Total", value: "total", width: "10%" },
        { text: "", value: "data-table-expand" },
      ];
    },
  },
  methods: {
    loadDescription(id) {
      let html = require(`@/data/descriptions/${id}.md`).html;
      html = html.replaceAll("<a ", "<a target='_blank' ");
      html = $(`<div>${html}</div>`);

      // Add in links
      let links = html.find("a");
      links.each((i, e) => {
        e.innerHTML += " <i class='fas fa-external-link-alt'></i>";
      });

      return html.html();
    },
    loadTitle(id) {
      return require(`@/data/descriptions/${id}.md`).attributes["title"];
    },
    expandRows() {
      this.expanded = this.currentDataSelection;
    },
    collapseRows() {
      this.expanded = [];
    },
    resetFilters() {
      this.search = "";
      this.selectedKind = null;
      this.selectedCategories = [];
      this.totalRange = this.allowedTotalRange;
    },
    clicked(value) {
      let i = this.expanded.indexOf(value);
      if (i == -1) this.expanded.push(value);
      else {
        this.expanded.splice(i, 1);
        this.expanded = [...this.expanded];
      }
    },
    formatTotal(value) {
      return formatFn(value);
    },
    getExistingColor(value) {
      if (value == "Existing") return "#FFCDD2";
      else return "#C8E6C9";
    },
    getShortCategoryColor(value) {
      if (value == "Intervention") return "#FFE082";
      if (value == "Police Response") return "#B0BEC5";
      if (value == "Prevention") return "#90CAF9";
      if (value == "Transformation") return "#B39DDB";
    },
    filterKind(val) {
      this.selectedKind = val;
    },
    filterCategory(val) {
      this.selectedCategories = val;
    },
    removeCategory(item) {
      this.selectedCategories.splice(this.selectedCategories.indexOf(item), 1);
      this.selectedCategories = [...this.selectedCategories];
    },
    removeKind(item) {
      this.selectedKind = null;
    },
  },
};
</script>

<style >
/* Sliders */
.total-slider-wrapper {
  height: 100px;
  margin-top: 30px !important
  ;
}
.total-slider {
  margin-bottom: 60px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.vue-slider-dot-tooltip-inner {
  font-size: 1rem;
  padding: 5px !important;
}
.vue-slider-rail {
  background-color: #ccc;
  height: 5px;
}
.vue-slider-dot-tooltip-inner {
  background-color: rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.5);
}
.vue-slider-process {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Chips */
.existing-chip {
  width: 75px;
  justify-content: center;
}
.short-category-chip {
  width: 125px;
  justify-content: center;
}
.my-search-field .v-text-field__slot {
  min-height: 42px;
  align-items: flex-end;
}
.data-dashboard .subtitle {
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 10px;
}
.data-dashboard .indented {
  margin-left: 150px;
}
@media only screen and (max-width: 960px) {
  .data-dashboard .indented {
    margin-left: 0px;
  }
}

.expanded-content {
  padding-bottom: 20px !important;
  padding-top: 20px !important;
  background: rgb(238, 238, 238, 0.5);
}
.v-data-table-header th {
  font-size: 0.9rem !important;
}
.data-dashboard input {
  background-color: transparent !important;
  border-width: 0px !important;
}
.my-data-table tbody .v-chip {
  pointer-events: none;
}
.reset-button-wrapper {
  height: 70px;
}
</style>