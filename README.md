# My Chat

## Description

My Chat is a chat application with various features and pages. You can explore the live version of the application through the following links:

- [Start Page](https://unique-sprite-357797.netlify.app/) - Entry point
- [Login Page](https://unique-sprite-357797.netlify.app/pages/login/login) - Access the login form
- [Registration Page](https://unique-sprite-357797.netlify.app/pages/registration/registration) - Sign up for a new account
- [Chat Page](https://unique-sprite-357797.netlify.app/pages/chat/chat) - Engage in chat
- [5XX Error Page](https://unique-sprite-357797.netlify.app/pages/5xx/5xx) - View the page for 5xx errors
- [404 Error Page](https://unique-sprite-357797.netlify.app/pages/404/404) - View the page for 404 errors
- [UI Library](https://unique-sprite-357797.netlify.app/pages/uilib/uilib) - Explore all UI components

The `deploy` branch of this project is configured for continuous deployment on [Netlify](https://www.netlify.com), enabling seamless updates and delivery of the latest version of the application.

## Live Demo

The application is hosted on Netlify and is accessible [here](https://unique-sprite-357797.netlify.app/).

## Design

The design mockups for this project are available on Figma. You can view them [here](https://www.figma.com/file/HXZ2xzTHtiTplJZF9RQbGu/Chat_external_link-(Copy)?type=design&node-id=0%3A1&mode=design&t=8AW5ByDVISVcHlg2-1).


## Version

0.0.1

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

# Dependencies

## Development Dependencies

- `@types/node`
- `autoprefixer`
- `express`
- `sass`
- `typescript`
- `vite`
- `vite-plugin-handlebars`

# Production Dependencies

- `normalize.css`

# Author

https://github.com/EvgeniyGrokholskiy