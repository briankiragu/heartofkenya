// Import composables...
import { toPrice, toTitle } from '../../composables/useFormatting.mjs';
import { getPrice } from '../../composables/usePricing.mjs';

// Define the component...
const MarketplaceItem = {
  props: {
    product: { type: Object, default: () => {}, required: true },
  },

  setup() {
    return { getPrice, toPrice, toTitle };
  },

  template: `
    <a :href="product.url" target="_blank" class="marketplace-item">
      <!-- Product image -->
      <div class="marketplace-item__image">
        <img
          :src="'https://picsum.photos/id/' + product.id * 10 + '/640.webp'"
          :alt="product.name + 'image'"
          class="img-fluid"
        />
        <span class="marketplace-item__image__location">
          {{ toTitle(product.location) }}
        </span>
      </div>

      <!-- Product details -->
      <article class="marketplace-item__description">
        <h3 class="marketplace-item__description__title">
          {{ product.name }}
        </h3>
        <p class="marketplace-item__description__price">
          <s v-if="product.pricing.discount.amount">
            {{ toPrice(product.pricing.amount) }}
          </s>
          <span>{{ toPrice(getPrice(product.pricing)) }}</span>
        </p>
      </article>
    </a>
  `,
};

// Export the module.
export default MarketplaceItem;
