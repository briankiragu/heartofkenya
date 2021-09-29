import useFormatting from '../composables/useFormatting.js';

// eslint-disable-next-line import/extensions
const BusinessForm = Vue.defineAsyncComponent(() => import('./BusinessForm.vue.js'));

export default {
  template: `
     <div class="business-list-item card border-bottom">
      <div :id="'business-' + business.directoryIdx + '-heading'" class="card-header">
        <button
          class="
            btn btn-link btn-block
            text-left
            d-flex
            justify-content-between
            align-items-center
          "
          type="button"
          data-toggle="collapse"
          :data-target="'#business-' + business.directoryIdx + '-collapse'"
          aria-expanded="false"
          :aria-controls="'business-' + business.directoryIdx + '-collapse'"
        >
          <div class="business-list-item__title">
            <h2 class="business-list-item__heading mb-2 mb-md-1">
              <span>{{ toTitle(business.title) }}</span>
              <a
                v-if="hasWebsite"
                title="Visit Website"
                class="business-list-item__link ml-2"
                :href="business.website"
                target="_blank"
              >
                <i class="fas fa-external-link-alt"></i>
              </a>
            </h2>
            <h5 v-if="hasOwner" class="business-list-item__locally-owned my-1">
              <i class="fas fa-star"></i> Local
            </h5>
            <h4
              class="business-list-item__subheading mb-0 d-flex align-items-start"
            >
              {{ toTitle(business.category) }} in
              <em class="ml-1">{{ toTitle(business.city) }}</em>
            </h4>
          </div>

          <div class="business-list-item__icon">
            <i class="fas fa-caret-down"></i>
          </div>
        </button>
      </div>

      <div
        :id="'business-' + business.directoryIdx + '-collapse'"
        class="collapse"
        :aria-labelledby="'business-' + business.directoryIdx + '-heading'"
        :data-parent="#business-directory-accordion"
  >
        <div class="card-body">
          <!-- Business info. -->
          <p class="mb-2">
            <span v-if="hasOwner">
              This business is locally owned by
              <strong>{{ toTitle(business.owner) }}.</strong>
            </span>
            <a
              v-if="hasWebsite"
              class="business-list-item__link ml-1"
              :href="business.website"
              target="_blank"
            >
              <i class="fas fa-external-link-alt"></i>
            </a>
          </p>

          <!--Edit button. -->
          <BusinessForm :order="business.directoryIdx" :business="business" />
        </div>
      </div>
    </div>
  `,

  name: 'BusinessListItem',

  components: { BusinessForm },

  props: {
    business: { type: Object, default: () => { } },
  },

  setup(props) {
    // Get formatting methods.
    const { toTitle } = useFormatting();

    // Check if the business has an owner.
    const hasOwner = Vue.computed(() => !!props.business.owner);

    // Check if the business has an website.
    const hasWebsite = Vue.computed(() => !!props.business.website);

    // Check if the business has any data.
    const hasData = Vue.computed(() => hasOwner.value || hasWebsite.value);

    return {
      hasOwner, hasWebsite, hasData, toTitle,
    };
  },
};
