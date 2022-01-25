export default {
  template: `
    <div class="business-searchbar row gx-3 mb-3">
      <div class="col mb-2">
        <input
          type="search"
          class="form-control business-searchbar__input"
          placeholder="Search for a business"
          :value="modelValue"
          @input.prevent="onSearch($event)"
          autocomplete="organization"
        />
      </div>

      <div class="col-3 col-md-2">
        <div class="d-grid gap-2">
          <button
            type="submit"
            class="btn business-searchbar__button"
            @click.prevent="() => onSubmit()"
          >
            <i class="fas fa-search-location"></i>
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
