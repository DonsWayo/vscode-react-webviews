/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'vscode': {
          // Basic colors
          'editor-background': 'var(--vscode-editor-background)',
          'editor-foreground': 'var(--vscode-editor-foreground)',
          'foreground': 'var(--vscode-foreground)',

          // Buttons
          'button-background': 'var(--vscode-button-background)',
          'button-foreground': 'var(--vscode-button-foreground)',
          'button-hoverBackground': 'var(--vscode-button-hoverBackground)',
          'button-secondaryBackground': 'var(--vscode-button-secondaryBackground)',
          'button-secondaryForeground': 'var(--vscode-button-secondaryForeground)',
          'button-secondaryHoverBackground': 'var(--vscode-button-secondaryHoverBackground)',

          // Inputs
          'input-background': 'var(--vscode-input-background)',
          'input-foreground': 'var(--vscode-input-foreground)',
          'input-border': 'var(--vscode-input-border)',
          'input-placeholder': 'var(--vscode-input-placeholderForeground)',
          'input-activeBorder': 'var(--vscode-inputOption-activeBorder)',
          'input-activeBackground': 'var(--vscode-inputOption-activeBackground)',
          'input-activeForeground': 'var(--vscode-inputOption-activeForeground)',

          // Dropdowns
          'dropdown-background': 'var(--vscode-dropdown-background)',
          'dropdown-foreground': 'var(--vscode-dropdown-foreground)',
          'dropdown-border': 'var(--vscode-dropdown-border)',

          // Lists
          'list-activeSelectionBackground': 'var(--vscode-list-activeSelectionBackground)',
          'list-activeSelectionForeground': 'var(--vscode-list-activeSelectionForeground)',
          'list-hoverBackground': 'var(--vscode-list-hoverBackground)',
          'list-inactiveSelectionBackground': 'var(--vscode-list-inactiveSelectionBackground)',

          // Settings
          'settings-headerForeground': 'var(--vscode-settings-headerForeground)',
          'settings-modifiedItemIndicator': 'var(--vscode-settings-modifiedItemIndicator)',
          'settings-dropdownBackground': 'var(--vscode-settings-dropdownBackground)',
          'settings-dropdownBorder': 'var(--vscode-settings-dropdownBorder)',
          'settings-dropdownListBorder': 'var(--vscode-settings-dropdownListBorder)',
          'settings-checkboxBackground': 'var(--vscode-settings-checkboxBackground)',
          'settings-checkboxForeground': 'var(--vscode-settings-checkboxForeground)',
          'settings-checkboxBorder': 'var(--vscode-settings-checkboxBorder)',
          'settings-textInputBackground': 'var(--vscode-settings-textInputBackground)',
          'settings-textInputForeground': 'var(--vscode-settings-textInputForeground)',
          'settings-textInputBorder': 'var(--vscode-settings-textInputBorder)',
          'settings-numberInputBackground': 'var(--vscode-settings-numberInputBackground)',
          'settings-numberInputForeground': 'var(--vscode-settings-numberInputForeground)',
          'settings-numberInputBorder': 'var(--vscode-settings-numberInputBorder)',

          // Focus and borders
          'focusBorder': 'var(--vscode-focusBorder)',
          'contrastBorder': 'var(--vscode-contrastBorder)',
          'contrastActiveBorder': 'var(--vscode-contrastActiveBorder)',

          // Text colors
          'textLink-foreground': 'var(--vscode-textLink-foreground)',
          'textLink-activeForeground': 'var(--vscode-textLink-activeForeground)',
          'textPreformat-foreground': 'var(--vscode-textPreformat-foreground)',
          'textBlockQuote-background': 'var(--vscode-textBlockQuote-background)',
          'textBlockQuote-border': 'var(--vscode-textBlockQuote-border)',
          'textCodeBlock-background': 'var(--vscode-textCodeBlock-background)',
          'descriptionForeground': 'var(--vscode-descriptionForeground)',

          // Scrollbar
          'scrollbarSlider-background': 'var(--vscode-scrollbarSlider-background)',
          'scrollbarSlider-hoverBackground': 'var(--vscode-scrollbarSlider-hoverBackground)',
          'scrollbarSlider-activeBackground': 'var(--vscode-scrollbarSlider-activeBackground)',
        }
      },
      ringColor: {
        'vscode-focusBorder': 'var(--vscode-focusBorder)',
        'vscode-contrastBorder': 'var(--vscode-contrastBorder)',
      },
      borderColor: {
        'vscode-input-border': 'var(--vscode-input-border)',
        'vscode-input-activeBorder': 'var(--vscode-inputOption-activeBorder)',
        'vscode-dropdown-border': 'var(--vscode-dropdown-border)',
        'vscode-settings-dropdownListBorder': 'var(--vscode-settings-dropdownListBorder)',
        'vscode-settings-checkboxBorder': 'var(--vscode-settings-checkboxBorder)',
      },
      backgroundColor: {
        'vscode-editor': 'var(--vscode-editor-background)',
        'vscode-button': 'var(--vscode-button-background)',
        'vscode-button-hover': 'var(--vscode-button-hoverBackground)',
        'vscode-button-secondary': 'var(--vscode-button-secondaryBackground)',
        'vscode-button-secondary-hover': 'var(--vscode-button-secondaryHoverBackground)',
        'vscode-input': 'var(--vscode-input-background)',
        'vscode-dropdown': 'var(--vscode-dropdown-background)',
        'vscode-list-hover': 'var(--vscode-list-hoverBackground)',
        'vscode-list-activeSelection': 'var(--vscode-list-activeSelectionBackground)',
        'vscode-settings-checkbox': 'var(--vscode-settings-checkboxBackground)',
      },
      textColor: {
        'vscode-editor': 'var(--vscode-editor-foreground)',
        'vscode-button': 'var(--vscode-button-foreground)',
        'vscode-button-secondary': 'var(--vscode-button-secondaryForeground)',
        'vscode-input': 'var(--vscode-input-foreground)',
        'vscode-input-placeholder': 'var(--vscode-input-placeholderForeground)',
        'vscode-dropdown': 'var(--vscode-dropdown-foreground)',
        'vscode-list-activeSelection': 'var(--vscode-list-activeSelectionForeground)',
        'vscode-settings-header': 'var(--vscode-settings-headerForeground)',
        'vscode-description': 'var(--vscode-descriptionForeground)',
      },
    },
  },
  plugins: [],
}
