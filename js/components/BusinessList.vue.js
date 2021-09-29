const BusinessListItem = Vue.defineAsyncComponent(
  () => import('./BusinessListItem.vue.js'),
);

export default {
  template: `
    <h1>This is the Business List</h1>
  `,

  components: { BusinessListItem },

  props: {
    businesses: { type: Array, default: () => [] },
  },

  setup(props) {
    const hasBusinesses = Vue.computed(() => props.businesses.length > 0);

    return { hasBusinesses };
  },
};
