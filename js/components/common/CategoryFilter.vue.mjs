// Import the composables...
import { toTitle } from '../../composables/useFormatting.mjs';

// Define the component.
const CategoryFilter = {
  props: {
    category: { type: String, required: true },
    categories: { type: Array, default: () => [], required: true },
  },
  emits: ['update:category'],

  setup(_, { emit }) {
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
        <span v-show="category === 'all'" class="business-filter-item__icon">
          <i class="fas fa-fingerprint"></i>
        </span>
        All
      </li>
      <li
        :class="{ active: category === 'sale' }"
        @click.prevent="setCategory('sale')"
      >
        <span v-show="category === 'sale'" class="business-filter-item__icon">
          <i class="fas fa-fingerprint"></i>
        </span>
        SALE
      </li>
      <li
        v-for="cat of categories"
        :key="cat.id"
        :class="{ active: category === cat.name }"
        @click.prevent="setCategory(cat.name)"
      >
        <span v-show="category === cat.name" class="business-filter-item__icon">
          <i class="fas fa-fingerprint"></i>
        </span>
        {{ toTitle(cat.name) }}
      </li>
    </ul>
  `,
};

export default CategoryFilter;
