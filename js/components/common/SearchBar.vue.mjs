const SearchBar = {
  props: {
    search: { type: String, default: '', required: true },
  },
  emit: ['update:search'],

  setup(_, { emit }) {
    /**
     * Function to debounce (delay) execution of a function.
     *
     * @param {fn} callback Callback function to debounce.
     * @param {number} delay Delay in milliseconds.
     *
     * @returns {fn} Debounced function.
     * @author Brian Kariuki <bkariuki@hotmail.com>
     */
    const debounce = (callback, delay = 250) => {
      let timeout;

      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          callback(...args);
        }, delay);
      };
    };

    /**
     * Handle when a user searches for a product.
     *
     * @param {HTMLInputEvent} e The input event from the search bar.
     *
     * @returns {void}
     * @author Brian Kariuki <bkariuki@hotmail.com>
     */
    const handleSearch = debounce((e) => {
      // Get and trim search value from the input.
      const search = e.target.value.trim();

      // Emit the event.
      emit('update:search', search);
    }, 1000);

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
