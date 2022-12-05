/**
 * Get the price of a product based on its discount (percentage or amount).
 *
 * @param {Object} pricing The pricing object of the product.
 *
 * @returns {Number} The price of the product.
 * @author Brian Kariuki <bkariuki@hotmail.com>
 */
const getPrice = (pricing) => {
	// Get the price.
	let price = pricing.amount;

	// Check if there is a discount.
	if (pricing.discount) {
		// Get the discount amount.
		const discountAmount = pricing.discount.amount;

		// Check if the discount is a percentage.
		if (pricing.discount.type === "percentage") {
			// Calculate the discount amount.
			price -= price * (discountAmount / 100);
		} else {
			// Calculate the discount amount.
			price -= discountAmount;
		}
	}

	// Return the price.
	return price;
};

// Export the functions.
export { getPrice };
