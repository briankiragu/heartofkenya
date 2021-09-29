import useFormatting from '../composables/useFormatting';

const BusinessForm = Vue.defineAsyncComponent(() => import('./BusinessForm.vue.js'));

export default {
  template: `
    <h1>This is the Business List Item</h1>
  `,

  name: 'BusinessListItem',

  components: { BusinessForm },

  props: {
    business: { type: Object, default: () => { } },
  },

  setup(props) {
    // Get formatting methods.
    const { toTitle } = useFormatting();

    // Check if the business has an owner.
    const hasOwner = Vue.computed(() => !!props.business.owner);

    // Check if the business has an website.
    const hasWebsite = Vue.computed(() => !!props.business.website);

    // Check if the business has any data.
    const hasData = Vue.computed(() => hasOwner.value || hasWebsite.value);

    return {
      hasOwner, hasWebsite, hasData, toTitle,
    };
  },
};
