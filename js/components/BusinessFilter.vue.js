const BusinessFilterItem = Vue.defineAsyncComponent(
  // eslint-disable-next-line import/extensions
  () => import('./BusinessFilterItem.vue.js'),
);

export default {
  template: `
     <div id="categoryAccordion" class="business-filter accordion">
      <div class="card">
        <div id="categoryHeading" class="card-header">
          <button
            class="
              btn btn-link btn-block
              text-left
              d-flex
              justify-content-between
              align-items-center
            "
            type="button"
            data-toggle="collapse"
            data-target="#filterCollapse"
            :aria-expanded="isExpanded"
            aria-controls="filterCollapse"
          >
            <div class="business-filter__title">
              <h2 class="business-filter__heading mb-1">Filter by category</h2>
              <h4 class="business-filter__subheading mb-0">
                {{ filterCount }} categories available
              </h4>
            </div>

            <div class="business-filter__icon">
              <i class="fas fa-caret-down"></i>
            </div>
          </button>
        </div>

        <div
          id="filterCollapse"
          class="collapse"
          :class="{ show: isExpanded }"
          aria-labelledby="categoryHeading"
          data-parent="#categoryAccordion"
        >
          <div class="card-body">
            <div v-if="hasItems" class="business-filter__items d-flex flex-wrap">
              <BusinessFilterItem
                v-for="item of items"
                :key="item.param"
                :item="item"
                class="mb-2 mr-2"
                :active="filters.includes(item.param)"
                @selected="updateFilters"
              />
            </div>

            <p v-else class="mb-0 text-center">
              There are no categories to show.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,

  components: { BusinessFilterItem },

  props: {
    modelValue: { type: String, default: '' },
    items: { type: Array, default: () => [] },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // Count the number of filters.
    const filterCount = Vue.computed(() => props.items.length);
    const isExpanded = Vue.computed(() => props.items.length <= 10);

    // Applied filters.
    const filters = Vue.ref([]);

    // Check if there are any filter items.
    const hasItems = Vue.computed(() => props.items.length > 0);

    // When a filter item is selected.
    const updateFilters = (value) => {
      // Check if the item is in the filters already.
      const index = filters.value.findIndex((filter) => filter === value);

      if (index >= 0) {
        // If it exists, remove it from the filters.
        filters.value.splice(index, 1);
      } else {
        // If it does not exist, add it to the list.
        filters.value = [...filters.value, value];
      }

      // Emit the updated filters as a string.
      emit('update:modelValue', filters.value.join(','));
    };

    // Pre-fill the filters.
    Vue.onMounted(() => {
      filters.value = props.modelValue.split(',').filter((val) => val);
    });

    return {
      filters, hasItems, filterCount, isExpanded, updateFilters,
    };
  },
};
