export default {
  template: `
    <h1>This is the Business Searchbar</h1>
  `,

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
