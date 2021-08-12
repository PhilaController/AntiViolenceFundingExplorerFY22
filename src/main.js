import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from "@/router";

Vue.config.productionTip = false

// load and set the HTML template we are using
let audit_content = $(".audit-content");
audit_content.html(`<div id="app"></div>`);

// add help message
let helpMessage = `<p class='help-message mt-2'>
  Comments or feedback? Please contact
  <a href="mailto:controller.policy@phila.gov">controller@phila.gov</a>.
  </p>`;
$(".back-link").after(helpMessage);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
