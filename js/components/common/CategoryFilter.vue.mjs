// Import the composables...
import { toTitle } from '../../composables/useFormatting.mjs';

// Define the component.
const CategoryFilter = {
  props: {
    category: { type: String, required: true },
    categories: { type: Array, default: () => [], required: true },
  },
  emits: ['update:category'],

  setup(props, { emit }) {
    /**
     * Set the category to filter the products by.
     *
     * @param {string} category The category to filter by.
     *
     * @returns {void}
     * @author Brian Kariuki <bkariuki@hotmail.com>
     */
    const setCategory = (category = 'all') => {
      emit('update:category', category);
    };

    return { toTitle, setCategory };
  },

  template: `
    <ul class="category-slider">
      <li
        :class="{ active: category === 'all' }"
        @click.prevent="setCategory('all')"
      >
        All
      </li>
      <li
        :class="{ active: category === 'sale' }"
        @click.prevent="setCategory('sale')"
      >
        Sale
      </li>
      <li
        v-for="cat of categories"
        :key="cat.id"
        :class="{ active: category === cat.name }"
        @click.prevent="setCategory(cat.name)"
      >
        {{ toTitle(cat.name) }}
      </li>
    </ul>
  `,
};

export default CategoryFilter;
