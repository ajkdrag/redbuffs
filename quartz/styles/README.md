# Quartz Styles Organization

This directory contains all the styles for the Quartz application. The styles are organized in a modular way to make them easier to maintain and update.

## Directory Structure

```
quartz/styles/
├── abstracts/           # Variables, mixins, functions
│   ├── _variables.scss  # All variables in one place
│   ├── _mixins.scss     # All mixins
│   ├── _breakpoints.scss
│   └── _functions.scss
├── base/                # Base styles
│   ├── _reset.scss      # CSS reset/normalize
│   ├── _typography.scss # Typography rules
│   └── _base.scss       # Base element styles
├── components/          # All component styles in one place
│   ├── _buttons.scss
│   ├── _links.scss
│   ├── _graph.scss
│   ├── _explorer.scss
│   └── ...
├── layout/              # Layout styles
│   ├── _grid.scss
│   ├── _header.scss
│   ├── _footer.scss
│   └── _content.scss
├── themes/              # Theme styles
│   ├── _light.scss
│   └── _dark.scss
├── utilities/           # Utility classes
│   └── _utilities.scss
└── main.scss            # Main file that imports all others
```

## Usage Guidelines

### Importing Styles

When importing styles in SCSS files, use the following pattern:

```scss
@use "../abstracts/variables" as vars;
@use "../abstracts/mixins";
```

### Variables

All variables are defined in `abstracts/_variables.scss`. This includes:

- Colors
- Spacing
- Breakpoints
- Typography
- Transitions
- Shadows

### Themes

Theme-specific variables are defined in `themes/_base.scss`. This includes:

- Light mode variables
- Dark mode variables

### Components

Component-specific styles should be placed in the `components/` directory. Each component should have its own file named with a leading underscore, e.g., `_graph.scss`.

### Adding New Styles

1. Determine the appropriate category for your styles
2. Create or modify the appropriate file
3. Import the file in `main.scss` if it's a new file

## Best Practices

1. Use variables for colors, spacing, and other repeated values
2. Use mixins for repeated patterns
3. Keep component styles isolated to their own files
4. Use BEM naming convention for classes
5. Use nesting sparingly to avoid specificity issues
