/* eslint-disable import/extensions */
import useFuncs from '../composables/useFuncs.js';

const Hello = {
  template: `
    <h1>Hello World</h1>
    <p>Using composition API. It's value is: {{ isTrue }}</p>
  `,

  setup() {
    const { isTrue } = useFuncs();

    return { isTrue };
  },
};

export default Hello;
