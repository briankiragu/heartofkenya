// eslint-disable-next-line import/extensions
import useBackend from '../composables/useBackend.js';
// eslint-disable-next-line import/extensions
import useFormatting from '../composables/useFormatting.js';

export default {
  template: `
    <!-- Button trigger modal -->
    <button
      type="button"
      class="business-form__trigger btn"
      data-bs-toggle="modal"
      :data-bs-target="'#business' + order + 'Backdrop'"
      v-bind="$attrs"
    >
      <i class="fas fa-plus me-2"></i>
      <slot>{{ text.trigger }}</slot>
    </button>

    <!-- Modal -->
    <teleport to="#business-modals">
      <div
        :id="'business' + order + 'Backdrop'"
        class="business-form__modal modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        :aria-labelledby="'business' + order + 'BackdropLabel'"
        aria-hidden="true"
      >
        <form class="modal-dialog" @submit.prevent="onSubmit">
          <div class="modal-content">
            <div class="modal-header">
              <h5 :id="'business' + order + 'BackdropLabel'" class="modal-title">
                {{ text.title }}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <!-- Modal body. -->
            <div class="modal-body row g-3">
              <!-- Title. -->
              <div class="col-12 mb-2">
                <label
                  :for="'business-' + order + '-title'"
                  class="form-label"
                >
                  Title*
                </label>
                <input
                  :id="'business-' + order + '-title'"
                  v-model="businessForm.title"
                  type="text"
                  name="title"
                  class="form-control"
                  placeholder="What is this business called?"
                  autocomplete="organization"
                  required
                />
              </div>

              <!-- Category. -->
              <div v-if="categories" class="col-12 mb-2">
                <label class="form-label" :for="'business-' + order + '-category'">Category*</label>
                <input
                  :id="'business-' + order + '-category'"
                  v-model="businessForm.category"
                  type="text"
                  name="category"
                  class="form-control"
                  placeholder="Select a category or add a new one"
                  :list="'business-' + order + '-categories'"
                  required
                />
                <datalist :id="'business-' + order + '-categories'">
                  <option
                    v-for="category of categories"
                    :key="'category-' + category.param"
                    :value="category.param"
                  ></option>
                </datalist>
              </div>

              <!-- Divider -->
              <div class="business-form__modal-divider col mx-2"></div>

              <!-- Phone Number. -->
              <div class="col-12 mb-2">
                <label class="form-label" :for="'business-' + order + '-phone'">Phone Number</label>
                <input
                  :id="'business-' + order + '-phone'"
                  v-model.number="businessForm.phone"
                  type="number"
                  name="phone"
                  class="form-control"
                  placeholder="254 7## ### ###"
                  minLength="9"
                  maxlength="12"
                  autocomplete="tel"
                />
              </div>

              <!-- Email. -->
              <div class="col-12 mb-2">
                <label class="form-label" :for="'business-' + order + '-email'">Email Addresss</label>
                <input
                  :id="'business-' + order + '-email'"
                  v-model="businessForm.email"
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="email@example.co.ke"
                  autocomplete="email"
                />
              </div>

              <!-- Website. -->
              <div class="col-12 mb-2">
                <label class="form-label" :for="'business-' + order + '-website'">Website</label>
                <input
                  :id="'business-' + order + '-website'"
                  v-model="businessForm.website"
                  type="url"
                  name="website"
                  class="form-control"
                  placeholder="https://example.com"
                  autocomplete="url"
                />
              </div>

              <!-- Divider -->
              <div class="business-form__modal-divider col mx-2"></div>

              <!-- City. -->
              <div class="col-12 mb-2">
                <label class="form-label" :for="'business-' + order + '-city'">City*</label>
                <input
                  :id="'business-' + order + '-city'"
                  v-model="businessForm.city"
                  type="text"
                  name="city"
                  class="form-control"
                  placeholder="Which city is this in?"
                  autocomplete="address-level1"
                  required
                />
              </div>

              <!-- Street Address. -->
              <div class="col-12 mb-2">
                <label class="form-label" :for="'business-' + order + '-streetaddress'">Street Address</label>
                <input
                  :id="'business-' + order + '-streetaddress'"
                  v-model="businessForm.streetaddress"
                  type="text"
                  name="streetaddress"
                  class="form-control"
                  placeholder="Where is this business located?"
                  autocomplete="street-address"
                />
              </div>

              <!-- Directions. -->
              <div class="col-12 mb-2">
                <label class="form-label" :for="'business-' + order + '-directions'">Directions</label>
                <input
                  :id="'business-' + order + '-directions'"
                  v-model="businessForm.directions"
                  type="text"
                  name="directions"
                  class="form-control"
                  placeholder="How can I get to this business?"
                  autocomplete="address-level2"
                />
              </div>

              <!-- Divider -->
              <div class="business-form__modal-divider col mx-2"></div>

              <!-- Notes. -->
              <div class="col-12 mb-2">
                <label class="form-label" :for="'business-' + order + '-notes'">Notes</label>
                <textarea
                  :id="'business-' + order + '-notes'"
                  v-model="businessForm.notes"
                  class="form-control"
                  name="notes"
                  rows="3"
                  placeholder="Any additional information?"
                ></textarea>
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                class="business-form__modal-submit btn"
                :class="{ disabled: isLoading }"
              >
                {{ text.submit }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </teleport>
  `,

  name: 'BusinessForm',
  props: {
    order: { type: [String, Number], default: '' },
    action: { type: String, default: 'update' },
    business: { type: Object, default: () => {}, required: false },
  },

  setup(props) {
    // Get backend properties.
    const { storeBusiness, updateBusiness } = useBackend();

    // Formatting methods.
    const { toTitle } = useFormatting();

    // Get the form text content.
    const text = {
      trigger: props.action === 'update' ? 'Suggest an edit' : 'Add a business',
      title:
        props.action === 'update'
          ? `Edit ${props.business.title}`
          : 'Add a new business',
      submit:
        props.action === 'update' ? 'Edit this business' : 'Add this business',
    };

    // Set the loading state.
    // eslint-disable-next-line no-undef
    const isLoading = Vue.ref(false);

    // Retrive the categories from the parent component.
    // eslint-disable-next-line no-undef
    const categories = Vue.inject('categories');

    // Populate the form values.
    // eslint-disable-next-line no-undef
    const businessForm = Vue.ref({
      title: props.business ? props.business.title : '',
      category: props.business ? props.business.category.toLowerCase() : '',
      phone: props.business ? props.business.phone : '',
      email: props.business ? props.business.email : '',
      website: props.business
        ? props.business.website
          ? props.business.website
          : ''
        : '',
      city: props.business ? props.business.city : '',
      streetaddress: props.business ? props.business.streetaddress : '',
      directions: props.business ? props.business.directions : '',
      notes: '',
    });

    // Check if the 'other' category option was selected.
    // eslint-disable-next-line no-undef
    const isOther = Vue.computed(
      () =>
        !categories?.value
          ?.map((category) => category.param)
          .includes(businessForm.value.category)
    );

    /**
     * When a user submits their input.
     */
    const onSubmit = async () => {
      // Set the state to loading.
      isLoading.value = true;

      // Send the request.
      const response =
        props.action === 'update'
          ? await updateBusiness(
              props.business.directoryIdx,
              businessForm.value
            )
          : await storeBusiness(businessForm.value);

      // Refresh the page if it was successful.
      if (response.status === 'success') {
        window.location.reload();
      }

      // Remove the loading state.
      isLoading.value = false;
    };

    return {
      text,
      categories,
      businessForm,
      isLoading,
      isOther,
      toTitle,
      onSubmit,
    };
  },
};
