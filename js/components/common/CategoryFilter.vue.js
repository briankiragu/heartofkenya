// Define the component.
const CategoryFilter = {
	props: {
		categories: { type: Array, default: () => [] },
	},

	template: `
    <ul class="category-slider">
      <li
        v-for="category of categories"
        :key="category.id"
        :class="{ active: category.id === 1 }"
      >
        {{ category.name }}
      </li>
    </ul>
  `,
};

export default CategoryFilter;
