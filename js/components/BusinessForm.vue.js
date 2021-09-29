// eslint-disable-next-line import/extensions
import useBackend from '../composables/useBackend.js';
// eslint-disable-next-line import/extensions
import useFormatting from '../composables/useFormatting.js';

export default {
  template: `
    <h1>This is the Business Form</h1>
  `,

  props: {
    order: { type: [String, Number], default: '' },
    action: { type: String, default: 'update' },
    business: { type: Object, default: () => { }, required: false },
  },

  setup(props) {
    // Get backend properties.
    const { storeBusiness, updateBusiness } = useBackend();

    // Formatting methods.
    const { toTitle } = useFormatting();

    // Get the form text content.
    const text = {
      trigger: props.action === 'update' ? 'Suggest an edit' : 'Add a Business',
      title:
        props.action === 'update'
          ? `Edit ${props.business.title}`
          : 'Add a new business',
      submit:
        props.action === 'update' ? 'Edit this business' : 'Add this business',
    };

    // Set the loading state.
    const isLoading = Vue.ref(false);

    // Retrive the categories from the parent component.
    const categories = Vue.inject('categories');

    // Populate the form values.
    const businessForm = Vue.ref({
      title: props.business ? props.business.title : '',
      category: props.business ? props.business.category.toLowerCase() : '',
      city: props.business ? props.business.city : '',
      // eslint-disable-next-line no-nested-ternary
      website: props.business
        ? props.business.website
          ? props.business.website
          : ''
        : '',
      notes: '',
    });

    // Check if the 'other' category option was selected.
    const isOther = Vue.computed(
      () => !categories?.value
        ?.map((category) => category.param)
        .includes(businessForm.value.category),
    );

    /**
     * When a user submits their input.
     */
    const onSubmit = async () => {
      // Set the state to loading.
      isLoading.value = true;

      // Send the request.
      const response = props.action === 'update'
        ? await updateBusiness(
          props.business.directoryIdx,
          businessForm.value,
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
