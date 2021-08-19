import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from "@/router";

Vue.config.productionTip = false

// load and set the HTML template we are using
let audit_content = $(".audit-content");
audit_content.html(`<div id="app"></div>`);

// add a button to view the data set
function add_data_button() {

  if ($(".download-button").length > 0)
    return;

  // add a new button
  let url = "https://controller.phila.gov/wp-content/uploads/2021/08/Philadelphia-FY22-Anti-Violence-Investments.xlsx";
  let btn = `<a href="${url}" class="btn btn-primary btn-block btn-block download-button">
            <i class="fas fa-download"></i>
            Download Data
        </a>`;

  // add download data button after the report button
  $(".entry-header .btn").first().after(btn);

}

function add_help_message() {

  if ($(".help-message").length > 0) return;

  let helpMessage = `<p class='help-message'>
  Comments or feedback? Please contact
  <a href="mailto:controller@phila.gov">controller@phila.gov</a>.
  </p>`;
  $(".back-link").after(helpMessage);
}

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

// the link to the dataset
add_data_button();

// add a help message
add_help_message();
