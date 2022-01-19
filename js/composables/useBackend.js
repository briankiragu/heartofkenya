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
  const categories = Vue.ref([
    {
      param: 'automotive',
      title: 'Automotive',
      status: 'Active',
    },
    {
      param: 'beauty',
      title: 'Beauty and Health',
      status: 'Active',
    },
    {
      param: 'bookstores',
      title: 'Book Stores',
      status: 'Active',
    },
    {
      param: 'Butchery',
      title: 'Butchery',
      status: 'Active',
    },
    {
      param: 'clothing',
      title: 'Clothing Store',
      status: 'Active',
    },
    {
      param: 'electronics',
      title: 'Electronics',
      status: 'Active',
    },
    {
      param: 'general',
      title: 'General Store',
      status: 'Active',
    },
    {
      param: 'hotels',
      title: 'Hotels',
      status: 'Active',
    },
    {
      param: 'restaurant',
      title: 'Restaurant',
      status: 'Active',
    },
    {
      param: 'shoes',
      title: 'Shoes',
      status: 'Active',
    },
  ]);
  // eslint-disable-next-line no-undef
  const businesses = Vue.ref([
    {
      phone: '0733855700',
      email: 'Jndukumwendwa@gmail.com',
      streetaddress: '',
      directions: 'Around machakos bus station',
      FlagRequestedWebsite: 'Yes',
      _json: null,
      directoryIdx: 25,
      category: 'Baby shop',
      title: 'Joy baby shop ',
      city: 'MACHAKOS ',
      owner: 'Joyce N. Mwendwa',
      website: 'https://heartofkenya.com/machakos/joybabyshop',
    },
    {
      _json: null,
      directoryIdx: 4,
      category: 'Beauty',
      title: 'Ruth Beauty Parlour',
      city: 'Machakos',
      owner: 'Bernard',
      website: 'https://heartofkenya.com/machakos/ruth_beauty_parlour',
    },
    {
      phone: '0768389711',
      email: 'Benwekesa78@gmail.com',
      streetaddress: 'Kamba building.',
      directions: 'Opposite roof garden first floor. ',
      FlagRequestedWebsite: '',
      _json: null,
      directoryIdx: 26,
      category: 'Beauty parlour ',
      title: 'MTR Ben Beauty and Dreadlock centre ',
      city: 'Machakos town ',
      owner: 'Benard ',
      website: 'Deutz',
    },
    {
      phone: '0722763696/0720721522',
      email: 'Henivcollege@gmail.com',
      streetaddress: 'Mbolu malu',
      directions: 'First floor mbooni house next to cathedral ',
      FlagRequestedWebsite: '',
      directoryIdx: 23,
      category: 'BEAUTY PARLOUR AND COLLEGE',
      title: 'Heniv salon &Beauty college',
      city: 'Machakos ',
      owner: 'Niverce mueni',
      website: '',
    },
    {
      phone: '',
      email: 'Thitukamunya254@gmail.com',
      streetaddress: '',
      directions: '',
      FlagRequestedWebsite: 'Yes',
      directoryIdx: 33,
      category: 'Blogging ',
      title: 'Blogging web',
      city: 'MACHAKOS ',
      owner: 'Yes',
      website: '',
    },
    {
      phone: '254.072.842.2886',
      email: 'sifunarichard2017@gmail.com',
      streetaddress: 'Machakos-Wote Road, Machakos, Kenya',
      directions: 'We are located 1km from Machakos along Machakos-Wote Road.',
      _json: null,
      directoryIdx: 1,
      category: 'bookstores',
      title: 'Chap Chap Enterprise',
      city: 'Machakos',
      owner: 'Richard Wasike',
      website: 'https://heartofkenya.com/machakos/chapchap',
    },
    {
      phone: '0727697369',
      email: 'Kennedywanjiru23.kw@gmail.com',
      streetaddress: '',
      directions: ' Along side Ngei road',
      FlagRequestedWebsite: 'Yes',
      directoryIdx: 28,
      category: 'Cereals ',
      title: 'Tenja cereal enterprise ',
      city: 'Machakos ',
      owner: 'Murithi wanjiru ',
      website: '',
    },
    {
      phone: '0737379111',
      email: 'Nelvioventuresltd@yahoo ',
      streetaddress: 'Mbolu malu road',
      directions: 'Machakos town  Along mbolu malu road',
      FlagRequestedWebsite: 'Yes',
      directoryIdx: 30,
      category: 'Cyber cafe',
      title: 'Nelvio ventures',
      city: 'Machakos ',
      owner: 'Nelson nzauli',
      website: '',
    },
    {
      phone: '0728023696',
      email: '',
      streetaddress: '',
      directions: 'Miditex house ',
      FlagRequestedWebsite: 'Yes',
      directoryIdx: 34,
      category: 'Deadlocks ',
      title: 'Mwikali deadlocks salon',
      city: 'Machakos ',
      owner: 'Stella mwikali',
      website: '',
    },
    {
      phone: '0700139073',
      email: '',
      streetaddress: '',
      directions: 'Opposite wizard restaurant',
      FlagRequestedWebsite: 'Yes',
      directoryIdx: 35,
      category: 'Electricals',
      title: 'CN electronics',
      city: 'MACHAKOS ',
      owner: 'Carleb musyoka',
      website: '',
    },
  ]);

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
