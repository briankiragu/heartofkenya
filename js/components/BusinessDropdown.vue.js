import useFormatting from '../composables/useFormatting.js';

export default {
  template: `
    <div v-if="categories" class="business-list-dropdown form-floating">
      <select
        id="business-list-filter"
        class="form-select"
        aria-label="Floating label select example"
        @change="onFilter($event)"
      >
        <option value="">All categories</option>
        <option
          v-for="category in categories"
          :key="category.param"
          :value="category.param"
        >
          {{ toTitle(category.title) }}
        </option>
      </select>
      <label for="business-list-filter">Choose a category</label>
    </div>
  `,

  name: 'BusinessDropdown',

  props: {
    filterTerm: { type: String, default: '' },
  },
  emits: ['update:filterTerm'],

  setup(props, { emit }) {
    const categories = Vue.inject('categories');

    // Get formatting tools.
    const { toTitle } = useFormatting();

    const onFilter = (e) => {
      emit('update:filterTerm', e.target.value);
    };

    return { categories, toTitle, onFilter };
  },
};
