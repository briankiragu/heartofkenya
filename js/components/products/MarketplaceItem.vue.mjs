// Import composables...
import { toCurrency, toTitle } from "../../composables/useFormatting.mjs";

// Define the component...
const MarketplaceItem = {
	props: {
		product: { type: Object, default: () => {}, required: true },
	},

	setup() {
		return { toCurrency, toTitle };
	},

	template: `
    <div class="marketplace-item">
      <!-- Product image -->
      <div class="marketplace-item__image">
        <img
          :src="'https://picsum.photos/id/' + product.id + '/640.webp'"
          :alt="product.name + 'image'"
          class="img-fluid"
        />
      </div>

      <!-- Product details -->
      <article class="marketplace-item__description">
        <h3 class="marketplace-item__description__title">
          {{ product.name }}
        </h3>
        <p class="marketplace-item__description__price">
          {{ toCurrency(product.price) }}
        </p>
        <p class="marketplace-item__description__category">
          {{ toTitle(product.category) }}
        </p>
        <!-- <p class="marketplace-item__description__date">
          {{ product.updated_at }}
        </p> -->
      </article>
    </div>
  `,
};

// Export the module.
export default MarketplaceItem;
