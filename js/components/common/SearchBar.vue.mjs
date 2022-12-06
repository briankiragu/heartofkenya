const SearchBar = {
  props: {
    search: { type: String, default: '', required: true },
  },
  emit: ['update:search'],

  setup(props, { emit }) {
    /**
     * Handle when a user searches for a product.
     *
     * @param {HTMLInputEvent} e The input event from the search bar.
     *
     * @returns {void}
     * @author Brian Kariuki <bkariuki@hotmail.com>
     */
    const handleSearch = (e) => {
      // Get and trim search value from the input.
      const search = e.target.value.trim();

      // Emit the event.
      emit('update:search', search);
    };

    return { handleSearch };
  },

  template: `
    <div class="search-bar">
      <input
        type="search"
        :value="search"
        placeholder="Search for products..."
        class="form-control"
        @keyup.prevent="handleSearch"
      />
    </div>
  `,
};

export default SearchBar;
