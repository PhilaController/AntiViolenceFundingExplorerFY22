<template>
  <div class="analysis-section">
    <div class="section intro mt-5">
      <p>
        On June 24, 2021, City Council approved the
        <a
          href="https://admin.phila.gov/media/20210709120158/budget-in-brief-FY2022-approved.pdf"
          target="_blank"
          >budget for fiscal year 2022</a
        >
        (FY22). In light of the increasing levels of gun violence and the
        infusion of money from the American Rescue Plan, anti-violence spending
        was a key focus of negotiations between the Mayor’s Office and City
        Council. According to data provided by the Kenney administration, the
        final FY22 budget included a $155 million (M) investment for
        anti-violence strategies, with $68M in new funding and $87M allocated to
        existing anti-violence efforts.
      </p>
      <p>
        To better understand the programs funded with this investment, the City
        Controller’s Office examined the line items that constitute the $155M
        investment in violence prevention programming. This examination is meant
        to serve as a resource for policymakers and Philadelphians alike,
        bringing necessary transparency to this critical investment and to
        ensure that taxpayer dollars are being used effectively to reduce gun
        violence.
      </p>
      <p>
        While we found many of the investments to be valuable, most of the
        funding supports programs that will likely take years to produce
        measurable reductions in gun violence. Moreover, some of the funding
        characterized as anti-violence by the Kenney administration is earmarked
        for other uses and is not specifically focused on the gun violence
        crisis. As this analysis shows, only 21 percent ($33M) out of the total
        $155M investment is intended to support evidence-based interventions
        that have been found to yield short-term reductions in shootings and
        homicides.
      </p>

      <h2 class="mb-2 mt-5">Background</h2>
      <hr class="titlebar" />
      <p>
        The analysis categorizes spending using three types of anti-violence
        investments as defined by experts in the field:<sup
          ><a href="#ref1" id="fn1">[1]</a>,<a href="#ref2" id="fn2"
            >[2]</a
          ></sup
        >
      </p>
      <ul class="ml-5">
        <li>
          <span class="font-italic">Intervention</span> efforts that address the
          immediate problem of gun violence;
        </li>
        <li>
          <span class="font-italic">Prevention</span> efforts that seek to
          mitigate risk of gun violence in the medium-term; and
        </li>
        <li>
          <span class="font-italic">Transformation</span>
          efforts that address the root causes of gun violence and improve the
          economic and social dynamics of communities over decades.
        </li>
      </ul>
      <br />
      <p>
        These categories help to frame the expectations for violence reduction
        results. It should be noted that the Kenney administration developed
        <a
          href="https://www.phila.gov/2021-06-30-fy22-budget-how-were-investing-over-150-million-to-reduce-gun-violence/"
          target="_blank"
          >its own categories</a
        >
        to describe their anti-violence spending priorities: Community
        Empowerment; Healing; Prevention; Employment and Careers; and Safe
        Havens for Youth and Families.
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
        This analysis also uses a “Police Response” category to describe funding
        for reforms to the City’s 911 procedures in the wake of the murder of
        Walter Wallace, Jr. The new funding is intended to improve the
        identification of 911 calls related to mental health crises and improve
        coordination with behavioral health specialists during police responses.
        While classified as anti-violence spending by the Kenney administration,
        these initiatives, while important, are not aimed at combating the
        city’s gun violence crisis. For this reason, the analysis separates
        these initiatives into their own category.
      </p>

      <p>
        The charts below summarize the funding for the four categories used in
        this analysis, comparing existing funding prior to FY22 and the new
        funding added in FY22.
      </p>

      <!-- Charts -->
      <v-row no-gutters class="mt-5 elevation-3 ml-2 mr-2">
        <v-col
          cols="12"
          sm="12"
          md="6"
          class="d-flex flex-column align-items-center"
        >
          <div class="subtitle m-2 font-weight-bold">
            Existing Funding Prior to FY22:
            {{ existingTotal }}
          </div>
          <hr class="titlebar" />
          <BarChartCategory
            :data="existingTotals"
            :show_note="false"
            :categories="allowedCategoryNames"
            :colors="allowedCategoryNames.map(getShortCategoryColor)"
            :height="200"
            class="w-100 pl-5"
            :show_percents="false"
            :xmax="80e6"
          />
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          class="d-flex flex-column align-items-center"
        >
          <div class="m-2 subtitle font-weight-bold">
            New Funding in FY22:
            {{ newTotal }}
          </div>
          <hr class="titlebar" />
          <BarChartCategory
            :data="newTotals"
            :categories="allowedCategoryNames"
            :colors="allowedCategoryNames.map(getShortCategoryColor)"
            :height="200"
            class="w-100"
            :show_percents="false"
            :xmax="80e6"
          />
        </v-col>
        <div class="bar-chart-footer mb-3 ml-3">
          Note: The diagonal yellow lines denote funding for the Anti-Violence
          Community Expansion Grants, which are intended to fund intervention
          work but have not yet been awarded to community organizations.
        </div>
      </v-row>

      <div class="section key-findings">
        <h2 class="mb-2 mt-5">Key Findings</h2>
        <hr class="titlebar" />

        <p class="mt-5">
          About 70 percent of the City’s total $155M anti-violence investment in
          FY22 is directed toward preventive and transformational programs,
          while 21 percent is targeted to intervention efforts to interrupt
          violence in the short term. The remaining 9 percent is intended to
          improve police responses to behavioral health incidents. As listed in
          the <router-link to="/explorer">Funding Explorer</router-link>,
          investments that the City considers to be part of its violence
          reduction efforts include:
        </p>

        <ul class="ml-5">
          <li>
            $28.3M for after-school programs for students in pre-K through grade
            12;
          </li>
          <li>$27.4M for economic development and workforce programs;</li>
          <li>$23.0M for reentry and juvenile justice services;</li>
          <li>
            $13.3M for efforts to mitigate police violence and reform 911
            procedures;
          </li>
          <li>
            $7.1M for partial restoration of the Parks & Recreation budget; and
          </li>
          <li>$3.0M for partial restoration of the Free Library budget.</li>
        </ul>
        <br />
        <p>
          While these are worthy investments for the City to make, this funding
          allocation is not being used exclusively for anti-violence programs.
          As an example, funding for Parks and Recreation and the Free Library
          restores some pandemic-related service cuts. For the purpose of this
          analysis, this funding is classified as prevention, as these
          departments play an important role in creating safe and thriving
          neighborhoods. However, some of the added funding is being used to
          support general City operations and preexisting programming. It
          includes restoration of the seasonal and aquatics Parks and Recreation
          programs, funding for the Dell Music Center, restoration of citywide
          5-day library service, and support for the LEAP after-school program.
        </p>

        <p>
          Preventive investments in other areas, such as reentry and juvenile
          justice services and after-school programs, typically take years to
          achieve a measurable reduction in shootings. Other programs, such as
          blight abatement and workforce development, focus on creating
          long-term, transformational change in neighborhoods over decades.
          These are important initiatives with long-term benefits to residents,
          but national experts are clear that the most successful anti-violence
          efforts are targeted to the hotspot areas where violence is most
          concentrated and are focused on the relatively small group of people
          who are most likely to be involved in gun violence.<sup
            ><a href="#ref3" id="fn3">[3]</a></sup
          >
        </p>
        <p>
          Out of the $68M in new anti-violence investments in FY22, about 34
          percent of the funding is directed to short-term violence
          intervention. One of these added investments is the expansion of the
          <a
            href="https://www.phila.gov/2020-08-10-group-violence-intervention-partnering-with-community-and-law-enforcement-to-stop-the-shooting/"
            target="_blank"
            >Group Violence Intervention</a
          >
          (GVI) initiative and the
          <a href="https://www.paan1989.org/programs" target="_blank"
            >Community Crisis Intervention Program</a
          >
          (CCIP), totaling $1.3M for both programs. With this additional
          funding, these programs will receive a combined $6.6M in funding in
          FY22. While GVI and CCIP are versions of evidence-based programs that
          have had success in other cities, it is difficult to measure the
          programs’ effectiveness in Philadelphia as the City has not released
          evaluation of these programs publicly. These programs are administered
          by the City’s Office of Violence Prevention. The office, which has an
          annual budget of about $9M, was created in 2017 to coordinate the
          City’s anti-violence efforts. However, its creation has not led to a
          measurable reduction in gun violence, as Philadelphia’s homicide rate
          has continued to rise each year since 2017. In response to the
          increasing violence levels, the City created the Office of Policy and
          Strategic Initiatives for Criminal Justice and Public Safety in 2021
          to oversee the Office of Violence Prevention and improve the
          coordination of the City’s public safety efforts.
        </p>
        <p>
          The City also earmarked $20M for Anti-Violence Community Expansion
          Grants. These grants will focus on supporting mid-size organizations
          working in neighborhoods impacted by gun violence and must be used for
          projects occurring between fall 2021 and summer 2022.<sup
            ><a href="#ref4" id="fn4">[4]</a></sup
          >
          The grants can be used to fund new or existing programming in one of
          two areas: Trauma Informed Healing and Restorative Practices; and Safe
          Havens and Mentorship. To help administer these grants, City Council
          and the Kenney administration created the Violence Prevention and
          Opportunity Monitoring Group. This group will help craft the request
          for proposals, working with organizations selected by the
          administration, and ultimately measuring outcomes to inform future
          funding decisions. For the purpose of this analysis, these grants are
          classified as intervention. However, as the grants have not yet been
          awarded, it is possible that some of the selected organizations will
          focus on longer-term prevention rather than intervention work.
        </p>
        <p>
          The Community Expansion Grants could provide a unique opportunity for
          Philadelphia to expand its evidence-based community violence
          intervention (CVI) infrastructure in the neighborhoods most affected
          by gun violence. CVI organizations use credible messengers, also known
          as violence interrupters, to work directly with the individuals most
          at risk from gun violence, intervene before violence occurs, and
          connect them to social and economic resources. CVIs are the foundation
          of the federal government’s recently released Comprehensive Strategy
          to Prevent and Respond to Gun Crime and Ensure Public Safety. They are
          also one of the highlighted use cases for the $350B in state and local
          aid in the American Rescue Plan (ARP).<sup
            ><a href="#ref5" id="fn5">[5]</a></sup
          >
          As noted in the
          <a
            href="https://controller.phila.gov/philadelphia-audits/american-rescue-plan-recommendations/"
            target="_blank"
            >Controller’s Office report</a
          >
          on recommendations for the City’s ARP funds, Philadelphia’s investment
          in CVI programs and the associated support services is substantially
          lower than cities with similar, and more successful, approaches. If
          Philadelphia were to invest at the level of New York or Los Angeles,
          it would cost about $55M annually. Even if all of the Community
          Expansion Grants are awarded to CVIs, the City will dedicate only $33M
          for intervention-focused initiatives during FY22.
        </p>

        <h2 class="mb-2 mt-5">Conclusion</h2>
        <hr class="titlebar" />
        <p>
          In 2020, Philadelphia experienced 499 homicides, the second most
          violent year in its recorded history. The violence has only worsened
          in 2021. In response, the City significantly expanded its investment
          in anti-violence strategies in FY22, adding $68M in new funding for a
          total of $155M to reduce gun violence citywide. Given the magnitude of
          the city’s gun violence crisis and the considerable funds dedicated to
          addressing it, transparency around the administration’s plan is
          critically important. In examining the individual anti-violence
          initiatives funded, the Controller’s Office found that some of the
          funds are earmarked for purposes other than violence reduction
          programs and that the majority is directed to prevention and
          transformation strategies with only 21 percent allocated to violence
          intervention. While prevention and transformation strategies are vital
          to long-term community development and addressing the systemic
          challenges that contribute to violence, intervention programs are
          critical to reducing violence in the short-term. As such, the
          Controller’s Office recommends that the City increase its support for
          anti-violence programs overall, and specifically, that the City should
          increase funding for evidence-based violence interventions with proven
          track records of reducing shootings and homicides in the short term.
        </p>

        <p class="font-italic mt-5">
          <i class="fas fa-long-arrow-alt-right fa-2x my-arrow mr-1"></i>
          <span
            >Explore the full list of anti-violence programs funded in FY22
            using the
            <router-link to="/explorer">Funding Explorer</router-link>.</span
          >
        </p>
      </div>
    </div>
    <div class="section footnotes">
      <!-- Header -->
      <h2 class="mb-2">Footnotes</h2>
      <hr class="titlebar" />

      <!-- Footnote #1 -->
      <p>
        <a
          href="#fn1"
          id="ref1"
          title="Jump back to footnote 1 in the
        text."
          >[1]&nbsp;</a
        >
        The Centers for Disease Control, Vetoviolence.cdc.gov. (2019).
        <span class="font-italic">Violence Prevention Fundamentals</span
        >&nbsp;<a
          href="https://vetoviolence.cdc.gov/apps/main/prevention-information/47"
          target="_blank"
          ><i class="fas fa-external-link-alt"></i></a
        >; Escamilla, J. (2020).
        <span class="font-italic"
          >Violence prevention: Basic ideas for approaches and
          coordination.</span
        >
        Chicago, IL: Illinois Criminal Justice Information Authority
        <a
          href="https://icjia.illinois.gov/researchhub/articles/violence-prevention-basic-ideas-for-approaches-and-coordination#reducing-violence"
          target="_blank"
          ><i class="fas fa-external-link-alt"></i></a
        >; Muhammad, D. (2019).
        <span class="font-italic"
          >Oakland Gun Violence Reduction Strategy.</span
        >
        The Ideas We Should Steal Conference. Philadelphia, PA
        <a
          href="https://controller.phila.gov/wp-content/uploads/2021/08/Ideas-We-Should-Steal-2019-Confercence-—-David-Muhammad.pdf"
          target="_blank"
          ><i class="fas fa-external-link-alt"></i></a
        >; Abt, T.
        <span class="font-italic"
          >Bleeding Out: The Devastating Consequences of Urban Violence — and a
          Bold New Plan for Peace in the Streets.</span
        >
        (2019). New York: Basic Books.
      </p>

      <!-- Footnote #2 -->
      <p>
        <a
          href="#fn2"
          id="ref2"
          title="Jump back to footnote 2 in the
        text."
          >[2]&nbsp;</a
        >The categorization used in this analysis was outlined by David Muhammad
        of the National Institute for Criminal Justice Reform during
        <a
          href="https://controller.phila.gov/wp-content/uploads/2021/08/Ideas-We-Should-Steal-2019-Confercence-—-David-Muhammad.pdf"
          target="_blank"
          >a 2019 presentation <i class="fas fa-external-link-alt"></i></a
        >. The categorization is similar to the primary, secondary, and tertiary
        classification scheme widely used in the public health field to describe
        violence reduction strategies (see, e.g.,
        <a href="https://vetoviolence.cdc.gov/apps/main/home" target="_blank"
          >the CDC website <i class="fas fa-external-link-alt"></i
        ></a>
        for more information).
      </p>

      <!-- Footnote #3 -->
      <p>
        <a
          href="#fn3"
          id="ref3"
          title="Jump back to footnote 3 in the
        text."
          >[3]&nbsp;</a
        >Giffords Law Center to Prevent Gun Violence. (2016).
        <span class="font-italic"
          >Healing Communities in Crisis: Lifesaving Solutions to the Urban Gun
          Violence Epidemic</span
        >&nbsp;<a
          href="https://giffords.org/wp-content/uploads/2019/01/Healing-Communities-in-Crisis.pdf"
          target="_blank"
          ><i class="fas fa-external-link-alt"></i></a
        >; National Institute for Criminal Justice Reform. (2021).
        <span class="font-italic"
          >Effective Community Based Violence Reduction Strategies</span
        >&nbsp;<a
          href="https://nicjr.org/wp-content/uploads/2021/06/Effective-Community-Based-Violence-Reduction-Strategies.pdf"
          target="_blank"
          ><i class="fas fa-external-link-alt"></i></a
        >; Abt, T., (2019). <span class="font-italic">Bleeding Out</span>.
      </p>

      <!-- Footnote #4 -->
      <p>
        <a
          href="#fn4"
          id="ref4"
          title="Jump back to footnote 4 in the
        text."
          >[4]&nbsp;</a
        >See the
        <a
          href="https://www.phila.gov/documents/anti-violence-community-expansion-grant-program-application/"
          target="_blank"
          >program application <i class="fas fa-external-link-alt"></i
        ></a>
        for additional details.
      </p>

      <!-- Footnote #5 -->
      <p>
        <a
          href="#fn5"
          id="ref5"
          title="Jump back to footnote 5 in the
        text."
          >[5]&nbsp;</a
        >The White House, “Fact Sheet: Biden-⁠Harris Administration Announces
        Comprehensive Strategy to Prevent and Respond to Gun Crime and Ensure
        Public Safety,” June 23, 2021
        <a
          href="https://www.whitehouse.gov/briefing-room/statements-releases/2021/06/23/fact-sheet-biden-harris-administration-announces-comprehensive-strategy-to-prevent-and-respond-to-gun-crime-and-ensure-public-safety/"
          target="_blank"
          ><i class="fas fa-external-link-alt"></i></a
        >.
      </p>
    </div>
  </div>
</template>

<script>
import BarChartCategory from "./BarChartCategory";
import { sum, rollup } from "d3-array";
import { formatFn } from "@/utils/formatFns.js";

export default {
  name: "Intro",
  props: ["data"],
  components: { BarChartCategory },
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
.my-arrow {
  vertical-align: -0.6rem !important;
  color: #2176d2;
}
.section.footnotes {
  margin-top: 100px !important;
}
.subtitle {
  font-weight: 500;
  font-size: 1.4rem;
}

@media only screen and (max-width: 768px) {
  .analysis-section .subtitle {
    text-align: center;
  }
}
</style>