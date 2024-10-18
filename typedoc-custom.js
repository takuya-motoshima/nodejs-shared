/**
 * Sets the theme to 'dark' in a select element if the current selected option is not 'dark'.
 * Handles potential errors related to DOM manipulation.
 */
function setDarkThemeIfNone() {
  try {
    const themeSelectEl = document.getElementById('tsd-theme');

    // Check if the select element exists
    if (themeSelectEl) {
      const currentTheme = themeSelectEl.value; // Get the currently selected theme

      // If the current theme is not 'dark'
      if (currentTheme !== 'dark') {
        const darkOptionEl = themeSelectEl.querySelector('option[value="dark"]');

        // Check if the dark option exists
        if (darkOptionEl) {
          darkOptionEl.selected = true;
          // Dispatch the 'change' event (optional, assumes a listener exists)
          themeSelectEl.dispatchEvent(new Event('change'));
        } else {
          console.warn('Option with value "dark" not found in select element.');
        }
      }
    } else {
      console.warn('Select element with ID "tsd-theme" not found.');
    }
  } catch (error) {
    console.error('Error manipulating DOM:', error);
  }
}

setDarkThemeIfNone();