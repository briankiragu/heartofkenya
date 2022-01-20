export default () => {
  /**
   * Convert a word/phrase to 'Title Case'.
   *
   * @param {string} value
   * @returns {string}
   *
   * @author Brian Kariuki Kiragu <bkariuki@hotmail.com>
   */
  const toTitle = (value = '') => {
    // List of possible string delimiters.
    const separators = [' ', '\\+', '-', '\\(', '\\)', '\\*', '/', ':', '\\?'];

    return value
      .split(new RegExp(separators.join('|'), 'g'))
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return { toTitle };
};
