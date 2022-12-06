// Import composables...
import {
  toCurrency,
  toReadableTime,
  toTitle,
} from '../../composables/useFormatting.mjs';

// Define components...
// eslint-disable-next-line no-undef
const CategoryFilter = Vue.defineAsyncComponent(() =>
  import('../common/CategoryFilter.vue.js')
);

// eslint-disable-next-line no-undef
const MarketplaceItem = Vue.defineAsyncComponent(() =>
  import('./MarketplaceItem.vue.mjs')
);

// Define the component.
const Marketplace = {
  name: 'Marketplace',
  components: {
    CategoryFilter,
    MarketplaceItem,
  },

  // Initial setup of the component.
  setup() {
    // Define the state of the products view (gallery or list)
    // eslint-disable-next-line no-undef
    const state = Vue.ref({
      category: 'all',
      sort: 'newest',
      view: 'gallery',
    });

    // Get the categories to filter the products by.
    // eslint-disable-next-line no-undef
    const categories = Vue.ref([
      { id: 1, name: 'clothing' },
      { id: 2, name: 'electronics' },
      { id: 3, name: 'furniture' },
      { id: 4, name: 'utensils' },
    ]);

    // Get the products to display.
    // eslint-disable-next-line no-undef
    const products = Vue.ref([
      {
        id: 1,
        name: 'Old T-Shirt',
        category: 'clothing',
        location: 'Machakos',
        pricing: {
          amount: 1000,
          discount: {
            amount: 10,
            type: 'percentage',
          },
          currency: 'KES',
        },
        created_at: '2022-11-29',
        updated_at: '2022-11-29',
        listed_until: '2022-11-29',
      },
      {
        id: 2,
        name: 'Sofa',
        category: 'furniture',
        location: 'Machakos',
        pricing: {
          amount: 2500,
          discount: {
            amount: 300,
            type: 'fixed',
          },
          currency: 'KES',
        },
        created_at: '2022-11-29',
        updated_at: '2022-11-29',
        listed_until: '2022-11-30',
      },
      {
        id: 3,
        name: 'Electric kettle',
        category: 'electronics',
        location: 'Machakos',
        pricing: {
          amount: 0,
          discount: null,
          currency: 'KES',
        },
        created_at: '2022-11-29',
        updated_at: '2022-11-29',
        listed_until: '2022-11-30',
      },
      {
        id: 4,
        name: 'Jacket',
        category: 'clothing',
        location: 'Machakos',
        pricing: {
          amount: null,
          discount: null,
          currency: 'KES',
        },
        created_at: '2022-11-29',
        updated_at: '2022-11-29',
        listed_until: '2022-11-30',
      },
      {
        id: 5,
        name: 'Cooking Pan Set',
        category: 'utensils',
        location: 'Machakos',
        pricing: {
          amount: 3200,
          discount: null,
          currency: 'KES',
        },
        created_at: '2022-11-29',
        updated_at: '2022-11-29',
        listed_until: '2022-11-30',
      },
      {
        id: 6,
        name: 'Mattress',
        category: 'furtniture',
        location: 'Machakos',
        pricing: {
          amount: 500,
          discount: {
            amount: 50,
            type: 'percentage',
          },
          currency: 'KES',
        },
        created_at: '2022-11-29',
        updated_at: '2022-11-29',
        listed_until: '2022-11-30',
      },
      {
        id: 7,
        name: 'Old Sneakers',
        category: 'clothing',
        location: 'Machakos',
        pricing: {
          amount: null,
          discount: null,
          currency: 'KES',
        },
        created_at: '2022-11-29',
        updated_at: '2022-11-29',
        listed_until: '2022-11-29',
      },
    ]);
    /**
     * Sort the products by the given criteria (newness, price,... etc).
     *
     * @returns {Record<string, any>[]} The sorted products.
     * @author Brian Kariuki <bkariuki@hotmail.com>
     */
    // eslint-disable-next-line no-undef
    const sortedProducts = Vue.computed(() => {
      // Variable to hold the sorted products in the selected category.
      let sorted = products.value.filter((product) => {
        // If the category is "all", return all products.
        if (state.value.category === 'all') {
          return true;
        }

        // Return the products in the selected category.
        return product.category === state.value.category;
      });

      // Sort the products by the selected sort method.
      switch (state.value.sort) {
        case 'price_asc': {
          sorted = sorted.sort((a, b) => {
            if (a.pricing.amount === null) {
              return 1;
            }
            if (b.pricing.amount === null) {
              return -1;
            }
            return a.pricing.amount - b.pricing.amount;
          });
          break;
        }

        case 'price_desc': {
          sorted = sorted.sort((a, b) => {
            if (a.pricing.amount === null) {
              return -1;
            }
            if (b.pricing.amount === null) {
              return 1;
            }
            return b.pricing.amount - a.pricing.amount;
          });
          break;
        }

        default:
          sorted = sorted.sort(
            (a, b) => new Date(b.listed_until) - new Date(a.listed_until)
          );
          break;
      }

      // Return the sorted products.
      return sorted;
    });

    return {
      state,
      categories,
      sortedProducts,
      toCurrency,
      toReadableTime,
      toTitle,
    };
  },

  template: `
    <div id="marketplace" class="container-fluid">
      <!-- Categories -->
      <section class="category-filter" style="padding: 0.85rem 0.45rem;">
        <div class="category-filter__heading">
          <h2 class="mb-0">Categories</h2>
          <span>View all</span>
        </div>
        <CategoryFilter
          v-model:category="state.category"
          :categories="categories"
        />
      </section>

      <!-- Products -->
      <section class="p-2 row g-3 g-md-5">
        <!-- Filters -->
        <div class="marketplace-filters">
          <!-- Sort Filter -->
          <select class="marketplace-filters__sort" v-model="state.sort">
            <option value="newest">Newest</option>
            <option value="price_asc">Price (Lowest)</option>
            <option value="price_desc">Price (Highest)</option>
          </select>

          <!-- View Filter -->
          <select class="marketplace-filters__view d-md-none" v-model="state.view">
            <option value="gallery">Gallery</option>
            <option value="list">List</option>
          </select>
        </div>

        <!-- Products -->
        <MarketplaceItem
          v-for="product in sortedProducts"
          :key="product.id"
          :product="product"
          class="col-md-4 col-lg-3"
          :class="[state.view === 'gallery' ? 'col-6' : 'col-12']"
        />
      </section>
    </div>
  `,
};

export default Marketplace;
