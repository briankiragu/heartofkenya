// Import composables...
import {
  toNumber,
  toPrice,
  toReadableTime,
  toTitle,
} from '../../composables/useFormatting.mjs';

// Define components...
// eslint-disable-next-line no-undef
const SearchBar = Vue.defineAsyncComponent(() =>
  import('../common/SearchBar.vue.mjs')
);

// eslint-disable-next-line no-undef
const CategoryFilter = Vue.defineAsyncComponent(() =>
  import('../common/CategoryFilter.vue.mjs')
);

// eslint-disable-next-line no-undef
const MarketplaceNewEntry = Vue.defineAsyncComponent(() =>
  import('./MarketplaceNewEntry.vue.mjs')
);

// eslint-disable-next-line no-undef
const MarketplaceItem = Vue.defineAsyncComponent(() =>
  import('./MarketplaceItem.vue.mjs')
);

// Define the component.
const Marketplace = {
  name: 'Marketplace',
  components: {
    SearchBar,
    CategoryFilter,
    MarketplaceNewEntry,
    MarketplaceItem,
  },

  // Initial setup of the component.
  setup() {
    // Define the state of the products view (gallery or list)
    // eslint-disable-next-line no-undef
    const state = Vue.ref({
      search: '',
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
        url: 'https://heartofkenya.com/machakos',
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
        url: 'https://heartofkenya.com/machakos',
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
          discount: {
            amount: null,
            type: 'fixed',
          },
          currency: 'KES',
        },
        url: 'https://heartofkenya.com/machakos',
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
          discount: {
            amount: null,
            type: 'fixed',
          },
          currency: 'KES',
        },
        url: 'https://heartofkenya.com/machakos',
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
          discount: {
            amount: null,
            type: 'fixed',
          },
          currency: 'KES',
        },
        url: 'https://heartofkenya.com/machakos',
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
        url: 'https://heartofkenya.com/machakos',
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
          discount: {
            amount: null,
            type: 'fixed',
          },
          currency: 'KES',
        },
        url: 'https://heartofkenya.com/machakos',
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
      // Create a FuseJS instance to search the products based on the search query.
      // eslint-disable-next-line no-undef
      const fuse = new Fuse(products.value, {
        keys: ['name', 'category', 'location'],
      });

      // Determine whether or not to run the search based on the search string. If it is empty, do not run the search.
      const data = state.value.search
        ? fuse.search(state.value.search).map((result) => result.item)
        : products.value;

      // Make the search.
      let sorted = data.filter((product) => {
        // If the category is "all", return all products.
        if (state.value.category === 'all') {
          return true;
        }

        // If the cateory is 'sale', return only products that have no amount.
        if (state.value.category === 'sale') {
          return product.pricing.amount === null;
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
      toNumber,
      toPrice,
      toReadableTime,
      toTitle,
    };
  },

  template: `
    <div id="marketplace" class="container-fluid">
      <!-- Search bar -->
      <SearchBar v-model:search="state.search" class="p-3 px-2" />

      <!-- Categories -->
      <section class="category-filter p-2">
        <div class="category-filter__heading">
          <h2 class="mb-0">Categories</h2>
        </div>
        <CategoryFilter
          v-model:category="state.category"
          :categories="categories"
        />
      </section>

      <!-- Products -->
      <section class="p-2">
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

        <!-- New Entry -->
        <div class="my-3 d-flex justify-content-end">
          <MarketplaceNewEntry :categories="categories" />
        </div>

        <!-- Results -->
        <div class="py-3">
          <!-- Count -->
          <span class="marketplace-results__count">
            {{ toNumber(sortedProducts.length) }} results
          </span>

          <!-- Products -->
          <TransitionGroup
            name="marketplace-items"
            tag="div"
            class="row g-3 g-md-5"
          >
            <MarketplaceItem
              v-for="product in sortedProducts"
              :key="product.id"
              :product="product"
              class="col-md-4 col-lg-3"
              :class="[state.view === 'gallery' ? 'col-6' : 'col-12']"
            />
          </TransitionGroup>
        </div>
      </section>
    </div>
  `,
};

export default Marketplace;
