export default {
  template: `
    <div
      class="business-filter-item"
      :class="{ active }"
      @click.prevent="onSelect(item.param)"
    >
      <span v-show="active" class="business-filter-item__icon">
        <!-- <i class="fas fa-check"></i> -->
        <i class="fas fa-fingerprint"></i>
      </span>
      <span class="business-filter-item__title">
        {{ item.title }}
      </span>
    </div>
  `,

  name: 'BusinessFilterItem',
  props: {
    item: { type: Object, default: () => { } },
    active: { type: Boolean, default: () => false },
  },
  emits: ['selected'],

  setup(props, { emit }) {
    // When the item is selected.
    const onSelect = (value) => {
      emit('selected', value);
    };

    return { onSelect };
  },
};
