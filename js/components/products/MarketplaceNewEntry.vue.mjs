// Import composables...
import { toTitle } from '../../composables/useFormatting.mjs';

// Define the component...
const MarketplaceNewEntry = {
  props: {
    categories: { type: Array, default: () => [], required: true },
  },
  emit: ['submit'],

  setup(_, { emit }) {
    // Get a template reference to the dialog.
    // eslint-disable-next-line no-undef
    const dialogEl = Vue.ref(null);

    // Define the 'SALE' state (whether or not price and discount are disabled)
    // eslint-disable-next-line no-undef
    const isForSale = Vue.ref(false);

    // Define the form state.
    // eslint-disable-next-line no-undef
    const state = Vue.ref({
      name: '',
      category: '',
      location: 'machakos',
      pricing: {
        amount: null,
        discount: {
          type: 'fixed',
          amount: null,
        },
        currency: 'KES',
      },
      url: 'https://heartofkenya.com/machakos',
      // Two days from now.
      // eslint-disable-next-line no-undef
      listed_until: moment().format('YYYY-MM-DDThh:mm'),
    });

    // Get the minimum date (currently) for the 'listed_until' field.
    // eslint-disable-next-line no-undef
    const minListedUntil = Vue.computed(() =>
      // eslint-disable-next-line no-undef
      moment().format('YYYY-MM-DDThh:mm')
    );

    // Get the maximum date (2 days from the current date) for the 'listed_until' field.
    // eslint-disable-next-line no-undef
    const maxListedUntil = Vue.computed(() =>
      // eslint-disable-next-line no-undef
      moment().add(2, 'days').format('YYYY-MM-DDThh:mm')
    );

    /**
     * When a user submits the form, prepare the data
     * (ensure the pricing is correct relative to sale, set the timestamps)
     * and emit it.
     *
     * @returns {void}
     * @author Brian Kariki <bkariuki@hotmail.com>
     */
    const handleSubmit = () => {
      // Prepare the form data if the product is for sale.
      // (Set the price and discount amount to null).
      if (isForSale.value) {
        // eslint-disable-next-line no-undef
        const { discount, currency } = state.value.pricing;

        // eslint-disable-next-line no-undef
        state.value.pricing = {
          amount: null,
          discount: {
            type: discount.type,
            amount: null,
          },
          currency,
        };
      }

      // Set the created and updated dates.
      state.value.created_at = new Date().toISOString();
      state.value.updated_at = new Date().toISOString();

      // Emit the form data.
      emit('submit', state.value);

      // eslint-disable-next-line no-undef
      Vue.nextTick(() => {
        // Close the dialog.
        dialogEl.value.close('close');

        // Reset the form state.
        state.value = {
          name: '',
          category: '',
          location: 'machakos',
          pricing: {
            amount: null,
            discount: {
              type: 'fixed',
              amount: null,
            },
            currency: 'KES',
          },
          url: 'https://heartofkenya.com/machakos',
          // Two days from now.
          // eslint-disable-next-line no-undef
          listed_until: moment().format('YYYY-MM-DDThh:mm'),
        };
      });
    };

    return {
      dialogEl,
      isForSale,
      state,
      minListedUntil,
      maxListedUntil,
      toTitle,
      handleSubmit,
    };
  },

  template: `
    <div class="marketplace-new-entry">
      <!-- Open the dialog when the button is clicked. -->
      <button class="btn marketplace-new-entry__trigger" @click.prevent="dialogEl.showModal()">
        New Entry
      </button>

      <!-- Define the dialog. -->
      <dialog ref="dialogEl" modal-mode="mega" class="marketplace-new-entry__dialog">
        <form method="dialog">
          <header>
            <h3>Add a new entry</h3>
            <button @click.prevent="dialogEl.close('close')"></button>
          </header>

          <article>
            <!-- Name -->
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input
                type="text"
                id="name"
                v-model.trim="state.name"
                class="form-control"
                placeholder="Ex: Size 10 sport shoes"
                required
              />
            </div>

            <!-- Category -->
            <div class="mb-3">
              <label for="category" class="form-label">Category</label>
              <select id="category" v-model="state.category" class="form-select" required>
                <option value="" disabled>Choose a category</option>
                <option v-for="category in categories" :key="category.id" :value="category.name">
                  {{ toTitle(category.name) }}
                </option>
              </select>
            </div>

            <!-- Location -->
            <div class="mb-3">
              <label for="location" class="form-label">Location</label>
              <input
                type="text"
                id="location"
                v-model.trim="state.location"
                class="form-control"
                placeholder="Machakos"
                autocomplete="city"
                required
              />
            </div>

            <!-- Pricing -->
            <div class="mb-3">
              <label for="pricing-amount" class="form-label">Price</label>

              <!-- Pricing (SALE) -->
              <div class="form-check">
                <input
                  type="checkbox"
                  id="is-for-sale"
                  v-model="isForSale"
                  class="form-check-input"
                />
                <label class="form-check-label" for="is-for-sale">
                  For SALE
                </label>
              </div>

              <!-- Pricing amount -->
              <div class="input-group">
                <span class="input-group-text" id="currency-addon">KES</span>
                <input
                  type="number"
                  id="pricing-amount"
                  v-model.number="state.pricing.amount"
                  class="form-control"
                  :class="{ disabled: isForSale }"
                  placeholder="Ex: 5000"
                  min="0"
                  :disabled="isForSale"
                  aria-describedby="currency-addon"
                />
              </div>
            </div>

            <!-- Pricing discount -->
            <div class="mb-3">
              <label for="pricing-discount" class="form-label">
                Discount
              </label>
              <div class="input-group mb-3">
                <button
                  type="button"
                  class="btn btn-outline-secondary dropdown-toggle"
                  :class="{ disabled: isForSale }"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ toTitle(state.pricing.discount.type) }}
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <span class="dropdown-item" @click.prevent="state.pricing.discount.type = 'fixed'">
                      Fixed
                    </span>
                  </li>
                  <li>
                    <span class="dropdown-item" @click.prevent="state.pricing.discount.type = 'percentage'">
                      Percentage
                    </span>
                  </li>
                </ul>
                <input
                  type="number"
                  id="pricing-discount"
                  v-model.number="state.pricing.discount.amount"
                  class="form-control"
                  :class="{ disabled: isForSale }"
                  placeholder="Ex: 500"
                  min="1"
                  :max="state.pricing.discount.type === 'percentage' ? 100 : state.pricing.amount"
                  :disabled="isForSale"
                />
              </div>
            </div>

            <!-- URL -->
            <div class="mb-3">
              <label for="url" class="form-label">URL</label>
              <input
                type="url"
                id="url"
                v-model.trim="state.url"
                class="form-control"
                placeholder="Ex: https://heartofkenya.com"
                required
              />
            </div>

            <!-- List Until -->
            <div class="mb-3">
              <label for="listed_until" class="form-label">Listed Until</label>
              <input
                type="datetime-local"
                id="listed_until"
                v-model.trim="state.listed_until"
                class="form-control"
                :min="minListedUntil"
                :max="maxListedUntil"
                required
              />
            </div>
          </article>

          <footer>
            <menu>
              <button autofocus type="reset" class="btn" @click.prevent="dialogEl.close('cancel')">
                Cancel
              </button>
              <button type="submit" value="confirm" class="btn" @click.prevent="handleSubmit">
                Confirm
              </button>
            </menu>
          </footer>
        </form>
      </dialog>
    </div>
  `,
};

export default MarketplaceNewEntry;
