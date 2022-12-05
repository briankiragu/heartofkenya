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
				price: 999,
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				display_until: "30-11-2022",
			},
			{
				id: 2,
				name: "Jeans",
				category: "clothing",
				price: 1999,
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				display_until: "30-11-2022",
			},
			{
				id: 3,
				name: "Sofa",
				category: "furniture",
				price: 9999,
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				display_until: "30-11-2022",
			},
			{
				id: 4,
				name: "TV",
				category: "electronics",
				price: 19999,
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				display_until: "30-11-2022",
			},
			{
				id: 5,
				name: "Table",
				category: "furniture",
				price: 4999,
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				display_until: "30-11-2022",
			},
			{
				id: 6,
				name: "Chair",
				category: "furniture",
				price: 2999,
				created_at: "29-11-2022",
				updated_at: "29-11-2022",
				display_until: "30-11-2022",
			},
		]);

		return {
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
      <section id="category-filter" style="padding: 0.85rem 0.45rem;">
        <div id="category-heading" class="mb-3">
          <h2 class="mb-0">Categories</h2>
          <span>View all</span>
        </div>
        <CategoryFilter :categories="categories" />
      </section>

      <!-- Products -->
      <section class="p-2 row g-3 g-md-5">
        <MarketplaceItem
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="col-6 col-md-4 col-lg-3"
        />
      </section>
    </div>
  `,
};

export default Marketplace;
