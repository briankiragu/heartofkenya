// Define the component.
const CategoryFilter = {
	props: {
		categories: { type: Array, default: () => [] },
	},

	template: `
    <ul class="category-slider">
      <li class="active">All</li>
      <li v-for="category of categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
  `,
};

export default CategoryFilter;
