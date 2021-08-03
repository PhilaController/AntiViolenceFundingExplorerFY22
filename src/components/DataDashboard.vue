<template>
  <div class="data-dashboard">
    <!-- Filters -->
    <v-layout row wrap class="mt-5">
      <v-flex xs4>
        <v-flex xs12>
          <div class="subtitle">Filters</div>
          <div class="font-italic mb-3">
            Use the filters below to select a subset of the data.
          </div>
        </v-flex>
        <v-flex xs12>
          <!-- Search field -->
          <v-text-field
            class="my-search-field"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <!-- New or Existing? -->
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
        </v-flex>
        <v-flex xs12>
          <!-- Spending Type -->
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
        </v-flex>
        <v-flex xs12 class="d-flex justify-content-center">
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
        </v-flex>
      </v-flex>

      <!-- Charts -->
      <v-flex xs8>
        <v-flex xs12>
          <div class="subtitle indented">Funding Summary</div>
          <div class="font-italic mb-3 indented">
            Charts will update automatically when filters are applied.
          </div>
        </v-flex>
        <v-flex xs12>
          <div class="d-flex flex-column align-items-end">
            <BarChart
              :data="kindTotals"
              :categories="allowedKindNames"
              :colors="allowedKindNames.map(getExistingColor)"
              :height="125"
              class="w-100"
            />
            <BarChart
              :data="categoryTotals"
              :categories="allowedCategoryNames"
              :colors="allowedCategoryNames.map(getShortCategoryColor)"
              :height="200"
              class="w-100"
            />
          </div>
        </v-flex>
      </v-flex>

      <v-flex xs12 class="mt-5">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-column">
            <div class="subtitle">Funded Programs</div>
            <div class="font-italic mb-3">
              Additional details for each program can be shown by clicking on an
              individual row.
            </div>
          </div>

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
        </div>

        <!-- Table -->
        <v-data-table
          class="my-data-table"
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
            <td :colspan="headers.length" class="expanded-content">
              {{ require(`@/data/descriptions/${item.id}.md`) }}
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { formatFn } from "@/utils/formatFns.js";
import { rollup, sum } from "d3-array";
import BarChart from "./BarChart";

export default {
  props: ["data"],
  components: { BarChart },
  data() {
    return {
      expanded: [],
      search: "",
      allowedKindNames: ["Existing", "New"],
      allowedCategoryNames: [
        "Intervention",
        "Police Response",
        "Prevention",
        "Transformation",
      ],
      selectedKind: null,
      selectedCategories: [],
    };
  },
  computed: {
    allExpanded() {
      let data = this.filteredData;
      if (this.search !== "") data = this.$refs.dataTable.internalCurrentItems;

      return this.expanded.length == data.length;
    },
    noExpanded() {
      return this.expanded.length == 0;
    },
    showResetButton() {
      return (
        this.search != "" ||
        this.selectedKind != null ||
        this.selectedCategories.length > 0
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
      let data = this.filteredData;
      if (this.search !== "") data = this.$refs.dataTable.internalCurrentItems;

      return rollup(
        data,
        (v) => sum(v, (d) => d.total),
        (d) => d.short_cat
      );
    },
    kindTotals() {
      let data = this.filteredData;
      if (this.search !== "") data = this.$refs.dataTable.internalCurrentItems;

      return rollup(
        data,
        (v) => sum(v, (d) => d.total),
        (d) => d.kind
      );
    },
    filteredData() {
      // No filters
      if (this.selectedKind === null && this.selectedCategories.length == 0)
        return this.data;

      // Start from the full data
      let out = this.data;
      let selectedValues;

      // Trim by New or Existing
      if (this.selectedKind !== null) {
        let kind = this.allowedKindNames[this.selectedKind - 1];
        out = out.filter((item) => item.kind === kind);
      }

      // Trim by categories
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
        { text: "", value: "data-table-expand" },
        {
          text: "Program",
          align: "start",
          sortable: false,
          value: "program",
          width: "50%",
        },

        {
          text: "New or Existing",
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
      ];
    },
  },
  methods: {
    expandRows() {
      let data = this.filteredData;
      if (this.search !== "") data = this.$refs.dataTable.internalCurrentItems;
      this.expanded = data;
    },
    collapseRows() {
      this.expanded = [];
    },
    resetFilters() {
      this.search = "";
      this.selectedKind = null;
      this.selectedCategories = [];
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
  margin-left: 250px;
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
.data-dashboard .layout {
  margin: 15px !important;
}
.reset-button {
  margin-top: 30px !important;
}
.my-data-table .v-chip {
  pointer-events: none;
}
</style>