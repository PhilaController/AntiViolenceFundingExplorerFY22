<template>
  <div class="data-dashboard section">
    <!-- First row: Filters and charts -->
    <v-row no-gutters class="mt-5">
      <!-- 1. Charts -->
      <v-col cols="12" sm="12" md="6">
        <div>
          <div class="subtitle">Funding Summary</div>
          <div class="font-italic mb-3">
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
              :xmax="100e6"
            />
            <BarChartCategory
              :data="categoryTotals"
              :show_note="true"
              :categories="allowedCategoryNames"
              :colors="allowedCategoryNames.map(getShortCategoryColor)"
              :height="200"
              class="w-100"
              :show_percents="true"
              :xmax="100e6"
            />
          </div>
        </div>
      </v-col>

      <!-- Add space between filters and charts -->
      <v-spacer></v-spacer>

      <!-- 2. Filters -->
      <v-col cols="12" sm="12" md="5" class="mt-5 mt-md-0">
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
                :style="getExistingBorderColor(item.value)"
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
                :style="getCategoryBorderColor(item.value)"
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
    </v-row>

    <!-- Second row: data table -->
    <v-row no-gutters class="data-table-row ml-2 mr-2">
      <!-- Title and Subtitle -->
      <v-col cols="12" md="8" sm="7">
        <div class="d-flex flex-column">
          <div class="subtitle">Program Details</div>
          <div class="font-italic mb-3">
            Show/hide additional details for each program by clicking on an
            individual row.
          </div>
        </div>
      </v-col>

      <v-spacer></v-spacer>

      <!-- Buttons: Show/Collapse Rows -->
      <v-col cols="12" md="2" sm="4" xs="12">
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
          :expanded="expanded"
          @click:row="handleClickedRow"
        >
          <template v-slot:item.program="{ item }">
            {{ loadTitle(item.id) }}
          </template>
          <template v-slot:item.kind="{ item }">
            <v-chip
              class="existing-chip"
              :color="getExistingColor(item.kind)"
              :style="getExistingBorderColor(item.kind)"
              label
            >
              {{ item.kind }}
            </v-chip>
          </template>
          <template v-slot:item.short_cat="{ item }">
            <v-chip
              class="short-category-chip"
              :color="getCategoryChipColor(item)"
              :style="getCategoryBorderColor(item.short_cat)"
              :class="{
                'dashed-chip': item.short_cat == 'Intervention/Prevention',
              }"
              label
            >
              {{
                item.short_cat == "Intervention/Prevention"
                  ? "Intervention"
                  : item.short_cat
              }}
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
import BarChartCategory from "./BarChartCategory";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import "pattern.css/dist/pattern.css";

export default {
  props: ["data"],
  components: { BarChart, VueSlider, BarChartCategory },
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
      totalRange: [0, 100e6],
      allowedTotalRange: [0, 100e6],
    };
  },
  mounted() {
    this.$nextTick(() => {
      // Calculate allowed range for the totals
      this.allowedTotalRange = this.totalRange = [
        min(this.data, (d) => d.total),
        max(this.data, (d) => d.total),
      ];

      // Expand the table too (if not on mobile)
      if (!this.$vuetify.breakpoint.mobile) this.expanded = this.data;
    });
  },
  computed: {
    currentDataSelection() {
      let data = this.filteredData;
      if (this.search !== "") data = this.$refs.dataTable.internalCurrentItems;

      return data;
    },
    allExpanded() {
      for (let i = 0; i < this.currentDataSelection.length; i++) {
        let index = this.expanded.indexOf(this.currentDataSelection[i]);
        if (index == -1) return false;
      }
      return true;
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
      let selectedCategories = this.selectedCategories;
      if (selectedCategories.length > 0) {
        // Get the categorie names from the indices
        selectedValues = this.allowedCategories
          .filter((item) => selectedCategories.indexOf(item.id) !== -1)
          .map((item) => item.value);

        // Make sure Intervention/Prevention is handled
        if (selectedValues.indexOf("Intervention") !== -1) {
          selectedValues.push("Intervention/Prevention");
        }

        // Filter by categories
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
        { text: "Total", value: "total", width: "15%" },
        {
          text: "New or Existing?",
          value: "kind",
          sortable: false,
          width: "15%",
        },
        {
          text: "Spending Type",
          value: "short_cat",
          sortable: false,
          width: "15%",
        },
        { text: "", value: "data-table-expand", width: "5%" },
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
    handleClickedRow(value) {
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
    getExistingBorderColor(value) {
      let color;
      if (value == "Existing") color = "#E57373";
      else color = "#81C784";
      return { border: `2px solid ${color}` };
    },
    getCategoryBorderColor(value) {
      let color;
      if (value == "Intervention") color = "#FFCA28";
      if (value == "Police Response") color = "#78909C";
      if (value == "Prevention") color = "#42A5F5";
      if (value == "Transformation") color = "#7E57C2";
      return { border: `2px solid ${color}` };
    },
    getCategoryChipColor(item) {
      let cat =
        item.short_cat == "Intervention/Prevention"
          ? "Intervention"
          : item.short_cat;
      return this.getShortCategoryColor(cat);
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
[data-vuetify]
  .theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #cfcfcf;
}

.data-table-row {
  margin-top: 50px !important;
}
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
.dashed-chip {
  background: repeating-linear-gradient(
    45deg,
    white,
    white 3px,
    #ffe082 3px,
    #ffe082 calc(2 * 3px)
  ) !important;
  border: 2px solid #ffca28 !important;
  text-shadow: white 0px 0px 10px !important;
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