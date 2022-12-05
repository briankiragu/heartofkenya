// Import composables...
import { toCurrency, toTitle } from "../../composables/useFormatting.mjs";
import { getPrice } from "../../composables/usePricing.mjs";

// Define the component...
const MarketplaceItem = {
	props: {
		product: { type: Object, default: () => {}, required: true },
	},

	setup() {
		return { getPrice, toCurrency, toTitle };
	},

	template: `
    <div class="marketplace-item">
      <!-- Product image -->
      <div class="marketplace-item__image">
        <img
          :src="'https://picsum.photos/id/' + product.id * 10 + '/640.webp'"
          :alt="product.name + 'image'"
          class="img-fluid"
        />
        <span class="marketplace-item__image__category">
          {{ toTitle(product.category) }}
        </span>
      </div>

      <!-- Product details -->
      <article class="marketplace-item__description">
        <h3 class="marketplace-item__description__title">
          {{ product.name }}
        </h3>
        <p class="marketplace-item__description__price">
          <s v-if="product.pricing.discount">{{ toCurrency(product.pricing.amount) }}</s>
          <span>{{ toCurrency(getPrice(product.pricing)) }}</span>
        </p>
      </article>
    </div>
  `,
};

// Export the module.
export default MarketplaceItem;
