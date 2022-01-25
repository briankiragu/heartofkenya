/* eslint-disable import/extensions */

// eslint-disable-next-line import/extensions
import useFormatting from '../composables/useFormatting.js';

// eslint-disable-next-line no-undef
const BusinessForm = Vue.defineAsyncComponent(() =>
  import('./BusinessForm.vue.js')
);

export default {
  template: `
    <div class="business-list-item card border-0">
      <div class="card-body p-0 d-flex flex-column">
        <div class="business-list-item__body px-4 py-3">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="business-list-item__body-category">
              <i class="fas fa-bullseye me-1"></i>
              {{ toTitle(business.category) }}
            </h6>

            <!-- Link to website. -->
            <a
              v-if="hasWebsite"
              :href="business.website"
              target="_blank"
              class="business-list-item__body-website rounded-circle"
            >
              <i class="fas fa-external-link-alt me-1"></i>
            </a>
          </div>
          <h5 class="business-list-item__body-title mb-1">
            {{ toTitle(business.title) }}
          </h5>
          <h6 class="business-list-item__body-address mb-1">
            {{ business.streetaddress }}
            {{ business.directions }}
          </h6>
        </div>

        <div v-if="hasOwner" class="business-list-item__footer p-4">
          <h6 class="business-list-item__footer-title mb-2">OWNED BY</h6>
          <div class="d-flex flex-column">
            <a
              :href="'mailto:' + business.email"
              class="business-list-item__footer-owner text-decoration-none"
            >
              {{ toTitle(business.owner) }}
            </a>
            <a
              v-if="hasPhone"
              :href="'tel:' + business.phone"
              class="business-list-item__footer-phone text-decoration-none d-flex align-items-center"
            >
              <!-- <i class="fas fa-mobile-alt"></i> -->
              <i class="fas fa-phone-square-alt me-2"></i>
              {{ business.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  `,

  name: 'BusinessListItem',
  components: { BusinessForm },
  props: {
    business: { type: Object, default: () => {} },
  },

  setup(props) {
    // Get formatting methods.
    const { toTitle } = useFormatting();

    // Check if the business has an owner.
    // eslint-disable-next-line no-undef
    const hasOwner = Vue.computed(() => !!props.business.owner);

    // Check if the business has a phone number.
    // eslint-disable-next-line no-undef
    const hasPhone = Vue.computed(() => !!props.business.phone);

    // Check if the business has an website.
    // eslint-disable-next-line no-undef
    const hasWebsite = Vue.computed(() => !!props.business.website);

    return {
      hasOwner,
      hasPhone,
      hasWebsite,
      toTitle,
    };
  },
};
