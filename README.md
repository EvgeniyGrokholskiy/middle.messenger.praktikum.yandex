# My Chat

## Description

My Chat is a chat application with various features and pages. You can explore the live version of the application through the following links:

[comment]: <> (- [Start Page]&#40;https://unique-sprite-357797.netlify.app/&#41; - Entry point)

[comment]: <> (- [Login Page]&#40;https://unique-sprite-357797.netlify.app/pages/login/login&#41; - Access the login form)

[comment]: <> (- [Registration Page]&#40;https://unique-sprite-357797.netlify.app/pages/registration/registration&#41; - Sign up for a new account)

[comment]: <> (- [Chat Page]&#40;https://unique-sprite-357797.netlify.app/pages/chat/chat&#41; - Engage in chat)

[comment]: <> (- [5XX Error Page]&#40;https://unique-sprite-357797.netlify.app/pages/5xx/5xx&#41; - View the page for 5xx errors)

[comment]: <> (- [404 Error Page]&#40;https://unique-sprite-357797.netlify.app/pages/404/404&#41; - View the page for 404 errors)

[comment]: <> (- [UI Library]&#40;https://unique-sprite-357797.netlify.app/pages/uilib/uilib&#41; - Explore all UI components)

The `deploy` branch of this project is configured for continuous deployment on [Netlify](https://www.netlify.com), enabling seamless updates and delivery of the latest version of the application.

## Live Demo

The application is hosted on Netlify and is accessible [here](https://unique-sprite-357797.netlify.app/).

## Design

The design mockups for this project are available on Figma. You can view them [here](https://www.figma.com/file/HXZ2xzTHtiTplJZF9RQbGu/Chat_external_link-(Copy)?type=design&node-id=0%3A1&mode=design&t=8AW5ByDVISVcHlg2-1).


## Version

0.0.2

##Implemented in version 0.2:
 - Added component approach,
 - Implemented validation of form fields
 - Added output of form data to the console when submitting
 - Implemented precompile rendering
 - Added HTTP Transport
 - Embedded characters (ESLint, Stylelint)

## Installation

You can install the required dependencies using:

```bash
npm install
```

# Build Configuration

This project uses Vite for building and the configuration includes:

### - Root Directory: `src`
### - Output Directory: `dist`
### - Entry Points: Various entry points such as index, login, registration, chat, user profile, error pages, and a UI library.
### - Plugins: Utilizes the Handlebars' plugin with specific helpers and partials.

# Server Configuration

This project uses Express to serve the application. The server is configured to:

- Serve static files from the ./dist directory
- You can start the server using:
```bash
npm run start
- ```

# Continuous Deployment on Netlify

This project is set up for continuous deployment through the `deploy` branch on Netlify. Any changes pushed to this branch will be automatically built and deployed to the live site.

# Scripts

You can run the following scripts defined in `package.json`:

- `npm run dev`: Starts the Vite development server
- `npm run build`: Builds the application using Vite
- `npm run start`: Builds the application and then starts the Express server
- `npm run preview`: Starts the Vite preview server
- `npm run lint:eslint`: Starts the ESLint, to analyze and report any code style or syntax errors in project
- `npm run lint:stylelint`: Starts the Stylelint, to analyze and report any CSS code style errors in project
- `npm run lint:fix`: Starts the linters (ESLint and Stylelint), to automatically fixes any fixable errors or warnings in your code

# Dependencies

## Development Dependencies

- `@types/node`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `autoprefixer`
- `eslint`
- `eslint-config-airbnb`
- `eslint-config-prettier`
- `eslint-plugin-import`
- `eslint-plugin-prettier`
- `express`
- `prettier`
- `sass`
- `stylelint`
- `stylelint-config-standard`
- `stylelint-config-standard-scss`
- `stylelint-scss`
- `typescript`
- `vite-plugin-handlebars`

# Production Dependencies

- `handlebars`
- `normalize.css`
- `vite`

# Author

https://github.com/EvgeniyGrokholskiy
