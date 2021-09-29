export default {
  template: `
    <div class="business-searchbar form-row mb-3">
      <div class="col mb-2">
        <input
          type="search"
          class="form-control"
          placeholder="Search for a business"
          autocomplete="organization"
          :value="modelValue"
          @input.prevent="onSearch($event)"
        />
      </div>
      <div class="col-md-2">
        <button
          type="submit"
          class="btn btn-block btn-primary"
          @click.prevent="() => onSubmit()"
        >
          Search
        </button>
      </div>
    </div>
  `,

  name: 'BusinessSearchbar',

  props: {
    modelValue: { type: String, default: '' },
    onSubmit: { type: Function, default: () => { } },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const onSearch = _.debounce((e) => {
      emit('update:modelValue', e.target.value);
    }, 275);

    return { onSearch };
  },
};
