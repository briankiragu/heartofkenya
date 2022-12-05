// Import composables...
import {
	toCurrency,
	toReadableTime,
	toTitle,
} from "../../composables/useFormatting.mjs";

// Define components...
// eslint-disable-next-line no-undef
const CategoryFilter = Vue.defineAsyncComponent(
	() => import("../common/CategoryFilter.vue.js"),
);

// eslint-disable-next-line no-undef
const MarketplaceItem = Vue.defineAsyncComponent(
	() => import("./MarketplaceItem.vue.mjs"),
);

// Define the component.
const Marketplace = {
	name: "Marketplace",
	components: {
		CategoryFilter,
		MarketplaceItem,
	},

	// Initial setup of the component.
	setup() {
		// Define the state of the products view (gallery or list)
		// eslint-disable-next-line no-undef
		const state = Vue.ref({
			sort: "newest",
			view: "gallery",
		});

		// Get the categories to filter the products by.
		// eslint-disable-next-line no-undef
		const categories = Vue.ref([
			{ id: 1, name: "Clothing" },
			{ id: 2, name: "Electronics" },
			{ id: 3, name: "Furniture" },
		]);

		// Get the products to display.
		// eslint-disable-next-line no-undef
		const products = Vue.ref([
			{
				id: 1,
				name: "T-Shirt",
				category: "clothing",
				location: "Machakos",
				pricing: {
					amount: 1000,
					discount: {
						amount: 10,
						type: "percentage",
					},
					currency: "KES",
				},
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				listed_until: "30-11-2022",
			},
			{
				id: 2,
				name: "Jeans",
				category: "clothing",
				location: "Machakos",
				pricing: {
					amount: 2500,
					discount: {
						amount: 300,
						type: "fixed",
					},
					currency: "KES",
				},
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				listed_until: "30-11-2022",
			},
			{
				id: 3,
				name: "Sweater",
				category: "clothing",
				location: "Machakos",
				pricing: {
					amount: 0,
					discount: null,
					currency: "KES",
				},
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				listed_until: "30-11-2022",
			},
			{
				id: 4,
				name: "Jacket",
				category: "clothing",
				location: "Machakos",
				pricing: {
					amount: null,
					discount: null,
					currency: "KES",
				},
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				listed_until: "30-11-2022",
			},
		]);

		return {
			state,
			categories,
			products,
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
        <CategoryFilter :categories="categories" />
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
            <option value="title_asc">Name (A-Z)</option>
            <option value="title_desc">Name (Z-A)</option>
          </select>

          <!-- View Filter -->
          <select class="marketplace-filters__view d-md-none" v-model="state.view">
            <option value="gallery">Gallery</option>
            <option value="list">List</option>
          </select>
        </div>

        <!-- Products -->
        <MarketplaceItem
          v-for="product in products"
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
