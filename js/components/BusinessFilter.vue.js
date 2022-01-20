// eslint-disable-next-line no-undef
const BusinessFilterItem = Vue.defineAsyncComponent(
  // eslint-disable-next-line import/extensions
  () => import('./BusinessFilterItem.vue.js')
);

export default {
  template: `
    <div
      :id="name + 'Accordion'"
      class="accordion accordion-flush business-filter"
    >
      <div class="accordion-item">
        <h2
          :id="name + '-heading'"
          class="accordion-header d-none d-md-block border-bottom-0"
        >
          <button
            class="accordion-button rounded"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#' + name + '-collapse'"
            :aria-expanded="isExpanded"
            :aria-controls="name + '-collapse'"
          >
            <h2 class="business-filter__heading mb-0">
              <span>{{ filterCount }}</span> {{ name }} available
            </h2>
          </button>
        </h2>
        <div
          :id="name + '-collapse'"
          class="accordion-collapse collapse"
          :class="{ show: isExpanded }"
          :aria-labelledby="name + '-heading'"
        >
          <div class="accordion-body p-0 p-md-3">
            <div
              v-if="hasItems"
              class="business-filter__items d-flex flex-md-wrap"
            >
              <BusinessFilterItem
                v-for="item of items"
                :key="item.param"
                :item="item"
                class="mb-md-2 me-2"
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

  name: 'BusinessFilter',
  components: { BusinessFilterItem },
  props: {
    modelValue: { type: String, default: '' },
    name: { type: String, default: 'categories' },
    items: { type: Array, default: () => [] },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // Count the number of filters.
    // eslint-disable-next-line no-undef
    const filterCount = Vue.computed(() => props.items.length);
    // eslint-disable-next-line no-undef
    const isExpanded = Vue.computed(() => props.items.length <= 10);

    // Applied filters.
    // eslint-disable-next-line no-undef
    const filters = Vue.ref([]);

    // Check if there are any filter items.
    // eslint-disable-next-line no-undef
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
    // eslint-disable-next-line no-undef
    Vue.onMounted(() => {
      filters.value = props.modelValue.split(',').filter((val) => val);
    });

    return {
      filters,
      hasItems,
      filterCount,
      isExpanded,
      updateFilters,
    };
  },
};
