<template>
  <div class="section intro">
    <p>
      On June 24, 2021, City Council approved the
      <a
        href="https://admin.phila.gov/media/20210709120158/budget-in-brief-FY2022-approved.pdf"
        target="_blanl"
        >budget for Fiscal Year 2022</a
      >
      (FY22) as part of the City’s annual Five Year Financial Plan after several
      weeks of negotiations with Mayor Kenney. While these negotiations are a
      typical part of the budget-making process, the discussions around the
      City’s spending priorities were heavily focused on addressing the
      increasing levels of gun violence in Philadelphia. Upon the approval of
      the Five Year Plan, City Council and the Mayor’s administration
      <a
        href="https://phlcouncil.com/city-council-fy2022-budget/"
        target="_blank"
        >announced</a
      >
      they had agreed to add $68.3M to existing anti-violence funding, bringing
      the total investment in anti-violence efforts to $155M for FY22.
    </p>

    <p>
      To increase transparency around this significant investment and ensure
      that taxpayer dollars are being used to effectively reduce gun violence,
      the Controller’s Office examined the line items that constitute the $155M
      investment as defined by City Council and Mayor Kenney. The analysis
      categorizes spending using three types of anti-violence investments as
      defined by experts<sup><a href="#ref1" id="fn1">[1]</a></sup> in the
      field: Intervention efforts that address the immediate problem of gun
      violence; Prevention efforts that seek to mitigate risk of gun violence in
      the medium-term; and Transformation efforts that address the root causes
      of gun violence and improve the economic and social dynamics of
      communities over decades.
    </p>

    <!-- Categories -->
    <div class="d-flex justify-content-center">
      <img
        loading="lazy"
        class="mt-3 elevation-3"
        src="https://controller.phila.gov/wp-content/uploads/2021/08/Anti-Violence-Categories.png?modified=123"
        alt="The three types of anti-violence investments: Intervention, Prevention, and Transformation."
        width="450"
        sizes="(max-width: 450px) 100vw, 450px"
      />
    </div>

    <p class="mt-5">
      The analysis also includes a “Police Response” category to describe
      funding for reforms to the City’s 911 procedures in the wake of the murder
      of Walter Wallace, Jr. The new funding will improve the identification of
      911 calls related to mental health crises and help to improve coordination
      with behavioral health specialists during police responses. While
      classified as anti-violence spending by the Mayor’s administration, these
      important initiatives are not aimed at combating the city’s gun violence
      crisis. For this reason, the analysis separates these initiatives into
      their own category.
    </p>

    <p class="font-italic">
      The charts below summarize the funding for the four categories used in
      this analysis for the existing funding prior to FY22 and the new funding
      added in FY22.
    </p>

    <!-- Charts -->
    <v-row no-gutters class="mt-5 elevation-3 ml-2 mr-2">
      <v-col
        cols="12"
        sm="12"
        md="6"
        class="d-flex flex-column align-items-center"
      >
        <div class="mt-3 subtitle">
          Existing Funding Prior to FY22: {{ existingTotal }}
        </div>
        <BarChart
          :data="existingTotals"
          :categories="allowedCategoryNames"
          :colors="allowedCategoryNames.map(getShortCategoryColor)"
          :height="200"
          class="w-100"
          :show_percents="false"
          :xmax="70e6"
        />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
        class="d-flex flex-column align-items-center"
      >
        <div class="mt-3 subtitle">New Funding in FY22: {{ newTotal }}</div>
        <BarChart
          :data="newTotals"
          :categories="allowedCategoryNames"
          :colors="allowedCategoryNames.map(getShortCategoryColor)"
          :height="200"
          class="w-100"
          :show_percents="false"
          :xmax="70e6"
        />
      </v-col>
    </v-row>

    <p class="mt-5">
      Most of the City’s anti-violence investments are directed towards
      preventative and transformational programs rather than evidence-based
      intervention programs that work to reduce gun violence in the short-term.
      The spending includes budget increases for Parks & Recreation and the Free
      Library, despite this funding being used for general operations and to
      restore services cut during the pandemic rather than specific
      anti-violence initiatives.
    </p>
    <p>
      One of the only new investments added in FY22 for intervention efforts was
      the expansion of
      <a
        href="https://www.phila.gov/2020-08-10-group-violence-intervention-partnering-with-community-and-law-enforcement-to-stop-the-shooting/"
        target="_blank"
        >Group Violence Intervention
      </a>
      (GVI) and the
      <a href="https://www.paan1989.org/programs" target="_blank"
        >Community Crisis Intervention Program</a
      >
      (CCIP), totaling $1.3M for both programs. While these programs have now
      been operating for several years, the City has not yet evaluated their
      success and does not know if they are working as intended. Rigorous
      evaluation processes are critical to ensure that existing programs deserve
      expansion and that new efforts will work effectively to save lives now and
      in the future.
    </p>

    <p>
      The City’s preventative investments in other areas, such as reentry and
      juvenile justice services and after-school programs, typically take years
      to achieve a measurable reduction in shootings, while investments in
      transformational programs, such as blight abatement and workforce
      development, can take up to a decade or more. The residents in
      neighborhoods where gun violence is concentrated face a complex set of
      intersecting challenges, in addition to years of compounding
      disinvestment, and long-term investments are certainly necessary. However,
      they have not been found to yield the kind of short-term reductions in gun
      violence that are possible with targeted community intervention programs.
    </p>

    <p>
      The new funding added in FY22 also includes $20M in grants to community
      organizations which are yet to be awarded. These grants are classified as
      prevention in this analysis, based on the recipients of previous grants
      from the City’s Targeted Community Investment Grant program. With the
      contract process for these new grants just beginning, the City’s
      anti-violence efforts could be substantially improved if these awards were
      directed to organizations implementing short-term, evidence-based violence
      intervention strategies, such as the
      <a href="http://cureviolence.org/" target="_blank">Cure Violence</a>
      street outreach model. As noted in the
      <a
        href="https://controller.phila.gov/philadelphia-audits/american-rescue-plan-recommendations/"
        target="_blank"
        >recent Controller’s Office report</a
      >
      on recommendations for the use of American Rescue Plan funds,
      Philadelphia’s investment in this kind of violence intervention model and
      the associated support services is substantially lower than cities with
      similar, and more successful, approaches. If Philadelphia were to invest
      at the level of New York or Los Angeles, it would cost about $55 million
      annually. Instead, the City has allocated only $12.8M for
      intervention-focused initiatives during FY22.
    </p>

    <p class="font-italic mt-5">
      Explore the full list of anti-violence programs funded in FY22 in the
      section below.
    </p>
  </div>
</template>

<script>
import BarChart from "./BarChart";
import { sum, rollup } from "d3-array";
import { formatFn } from "@/utils/formatFns.js";

export default {
  name: "Intro",
  props: ["data"],
  components: { BarChart },
  data() {
    return {
      allowedCategoryNames: [
        "Intervention",
        "Prevention",
        "Transformation",
        "Police Response",
      ],
    };
  },
  methods: {
    getShortCategoryColor(value) {
      if (value == "Intervention") return "#FFE082";
      if (value == "Police Response") return "#B0BEC5";
      if (value == "Prevention") return "#90CAF9";
      if (value == "Transformation") return "#B39DDB";
    },
  },
  computed: {
    existingTotal() {
      let x = sum(
        this.data.filter((d) => d.kind == "Existing"),
        (d) => d.total
      );
      return formatFn(x);
    },
    newTotal() {
      let x = sum(
        this.data.filter((d) => d.kind == "New"),
        (d) => d.total
      );
      return formatFn(x);
    },
    existingTotals() {
      return rollup(
        this.data.filter((d) => d.kind == "Existing"),
        (v) => sum(v, (d) => d.total),
        (d) => d.short_cat
      );
    },
    newTotals() {
      return rollup(
        this.data.filter((d) => d.kind == "New"),
        (v) => sum(v, (d) => d.total),
        (d) => d.short_cat
      );
    },
  },
};
</script>

<style>
.subtitle {
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 10px;
}
</style>