const BusinessListItem = Vue.defineAsyncComponent(
  // eslint-disable-next-line import/extensions
  () => import('./BusinessListItem.vue.js'),
);

export default {
  template: `
    <div class="business-list mb-5">
      <div
        v-if="hasBusinesses"
        id="business-directory-accordion"
        class="business-list__cards accordion"
      >
        <BusinessListItem
          v-for="business in businesses"
          :key="business.directoryIdx"
          :business="business"
        />
      </div>

      <div v-else class="card">
        <div class="card-body text-center">
          There are no businesses to display.
        </div>
      </div>
    </div>
  `,

  name: 'BusinessList',
  components: { BusinessListItem },
  props: {
    businesses: { type: Array, default: () => [] },
  },

  setup(props) {
    const hasBusinesses = Vue.computed(() => props.businesses.length > 0);

    return { hasBusinesses };
  },
};
