// API Base URI.
const baseUrl = 'https://heartofkenya.com';

/**
 * Get form data from the input object.
 *
 * @param input User input from form
 * @returns {FormData} data
 *
 * @author Brian K. Kiragu <bkariuki@hotmail.com>
 */
const getFormData = (input, formId = 'BusinessDirectory') => {
  const data = new FormData();
  Object.keys(input).forEach((key) => data.append(key, input[key]));
  data.append('formid', formId);
  return data;
};

export default () => {
  // eslint-disable-next-line no-undef
  const searchTerm = Vue.ref('');
  // eslint-disable-next-line no-undef
  const filterTerm = Vue.ref('');

  // eslint-disable-next-line no-undef
  const categories = Vue.ref([]);
  // eslint-disable-next-line no-undef
  const businesses = Vue.ref([]);

  // eslint-disable-next-line no-undef
  const hasCategories = Vue.computed(() => categories.value.length > 0);
  // eslint-disable-next-line no-undef
  const hasBusinesses = Vue.computed(() => businesses.value.length > 0);

  /**
   * Function to query endpoint.
   *
   * @param page {number} The page number.
   * @param filter {null | string} The filter term
   * @param Search {null | string} The Search term
   * @returns Promise<IBusiness[]>
   * @author Brian K. Kiragu <bkariuki@hotmail.com>
   */
  const getBusinesses = async (page = 1, filter = null, search = null) => {
    // Set the request endpoint.
    let endpoint = `${baseUrl}/TableSearchJson?config=directoryMachakosJson&page=${page}`;

    // Append a filter term if it was provided.
    endpoint = filter ? `${endpoint}&categories=${filter}` : endpoint;

    // Append a search term if it was provided.
    endpoint = search
      ? `${endpoint}&${new URLSearchParams({ search }).toString()}`
      : endpoint;

    // Launch the request.
    const response = await fetch(endpoint);

    // Check for errors.
    if (!response.ok) {
      throw new Error(`There was an error ${response.statusText}`);
    }

    // Get the data from the request.
    return response.json();
  };

  /**
   * Function to query categories.
   *
   * @param page {number} The page number.
   * @param term {null | string} The search term
   * @returns Promise</ICategory[]>
   * @author Brian K. Kiragu <bkariuki@hotmail.com>
   */
  const getCategories = async (page = 1, term = null) => {
    // Set the request endpoint.
    let endpoint = `${baseUrl}/TableSearchJson?config=businessCategories&page=${page}`;

    // Check if a search term was provided.
    endpoint = term ? `${endpoint}&search=${term}` : endpoint;

    // Launch the request.
    const response = await fetch(endpoint);

    // Check for errors.
    if (!response.ok) {
      throw new Error(`There was an error ${response.statusText}`);
    }

    // Get the data from the request.
    return response.json();
  };

  /**
   * Update a business
   *
   * @param data {IBusinessForm} User input data
   * @author Brian K. Kiragu <bkariuki@hotmail.com>
   */
  const storeBusiness = async (data) => {
    // Get the query params.
    const urlParams = new URLSearchParams({
      cmd: 'custom',
      subcmd: 'saveRecord',
      config: 'directoryMachakosJson',
    }).toString();

    // Set the request endpoint.
    const endpoint = `${baseUrl}/jcmd?${urlParams}`;

    // Launch the request.
    const response = await fetch(endpoint, {
      method: 'POST',
      body: getFormData(
        // Add the 'library' from the global variables.
        // eslint-disable-next-line no-undef
        { library, ...data },
        'BusinessDirectory'
      ),
    });

    // Check for errors.
    if (!response.ok) {
      throw new Error(`There was an error ${response.statusText}`);
    }

    // Get the data from the request.
    return response.json();
  };

  /**
   * Function to add a new business.
   *
   * @author Brian K. Kiragu <bkariuki@hotmail.com>
   */
  const updateBusiness = async (directoryIdx, data) => {
    // Get the query params.
    const urlParams = new URLSearchParams({
      cmd: 'custom',
      subcmd: 'saveRecord',
      config: 'directoryMachakosJson',
    }).toString();

    // Set the request endpoint.
    const endpoint = `${baseUrl}/jcmd?${urlParams}`;

    // Launch the request.
    const response = await fetch(endpoint, {
      method: 'POST',
      body: getFormData({ ...data, ...{ directoryIdx } }, 'BusinessDirectory'),
    });

    // Check for errors.
    if (!response.ok) {
      throw new Error(`There was an error ${response.statusText}`);
    }

    // Get the data from the request.
    return response.json();
  };

  // Return the function results.
  return {
    searchTerm,
    filterTerm,
    categories,
    businesses,
    hasCategories,
    hasBusinesses,
    getCategories,
    getBusinesses,
    storeBusiness,
    updateBusiness,
  };
};
