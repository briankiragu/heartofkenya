export default {
  template: `
    <div class="business-searchbar row gx-3 mb-3">
      <div class="col mb-2">
        <input
          type="search"
          class="form-control"
          placeholder="Search for a business"
          :value="modelValue"
          @input.prevent="onSearch($event)"
          autocomplete="organization"
        />
      </div>

      <div class="col-md-2">
        <div class="d-grid gap-2">
          <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="() => onSubmit()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  `,

  name: 'BusinessSearchBar',
  props: {
    modelValue: { type: String, default: '' },
    onSubmit: { type: Function, default: () => {} },
  },
  emits: ['update:modelValue'],

  setup(props, { emit }) {
    // eslint-disable-next-line no-undef
    const onSearch = _.debounce((e) => {
      emit('update:modelValue', e.target.value);
    }, 275);

    return { onSearch };
  },
};
