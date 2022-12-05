/**
 * Convert a number into a currency format.
 *
 * @param {number} amount The amount to convert.
 * @param {string} locale The default locale to use. (Defaults to en-GB)
 * @param {string} currency The default currency to use. (Defaults to KES)
 *
 * @return {string} The human-readable currency format.
 * @author Brian K. Kiragu <bkariuki@hotmail.com>
 */
const toCurrency = (value = 0, locale = "en-GB", currency = "KES") => {
	// Default price of 'FREE'.
	let price = "FREE";

	// Get the correct currency based on the value...
	switch (value) {
		case null: {
			price = "SALE";
			break;
		}

		case 0: {
			price = "FREE";
			break;
		}

		default:
			price = Intl.NumberFormat(locale, {
				style: "currency",
				currency,
			}).format(value);
			break;
	}

	// Return the price.
	return price;
};

/**
 * Convert a date/time into a human-readable relative time.
 *
 * @param {string} value The date/time to convert.
 * @param {string} locale The default locale to use. (Defaults to en-GB)
 *
 * @returns {string} The human-readable relative time.
 * @author Brian K. Kiragu <bkariuki@hotmail.com>
 */
const toReadableTime = (value, locale = "en-GB") =>
	new Intl.DateTimeFormat(locale).format(value);

/**
 * Convert a word/phrase to 'Title Case'.
 *
 * @param {string} value
 * @returns {string}
 *
 * @author Brian Kariuki Kiragu <bkariuki@hotmail.com>
 */
const toTitle = (value = "") => {
	// List of possible string delimiters.
	const separators = [" ", "\\+", "-", "\\(", "\\)", "\\*", "/", ":", "\\?"];

	return value
		.split(new RegExp(separators.join("|"), "g"))
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export { toCurrency, toReadableTime, toTitle };
