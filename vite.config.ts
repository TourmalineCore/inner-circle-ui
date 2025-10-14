/* eslint-disable @typescript-eslint/quotes */
import { defineConfig } from 'vite'
// correct version of federation https://github.com/originjs/vite-plugin-federation/issues/670
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'  
import svgr from 'vite-plugin-svgr' 

// description about how to set up remote app configuration you can see in 
// https://github.com/TourmalineCore/inner-circle-layout-ui/blob/master/vite.config.ts

const LOCAL_ENV_PORT = 30090
// Set the port for the layout based on the environment
const EMPLOYEES_PORT = process.env.NODE_ENV === `production` ? LOCAL_ENV_PORT : 4001

// if (VITE_BASE_URL === undefined) set default local docker url
// const LAYOUT_URL = process.env.VITE_BASE_URL ?? `http://localhost:4455`

// for run in local docker use `/`, and for others use `/books` path
// const BOOKS_PATH = LAYOUT_URL === `http://localhost:4455` ? `/` : `/books`

// for run in local docker use `http://localhost:4455/assets..`, and for others use `../layout/assets..` path
// const LAYOUT_PATH = LAYOUT_URL === `http://localhost:4455` ? `` : `/layout`

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  // Set the port on which the development server runs
  // Documentation: https://vitejs.dev/config/server-options.html#server-port
  server: {
    port: EMPLOYEES_PORT,
  },
  // Base public path that is added to beginnings of static assets and routes in the generated HTML.
  // This affects how files like scripts, styles, and images are referenced in the final build.
  // Example: If an image is imported as `/assets/logo.png`, it will be resolved as `/layout/assets/logo.png`.
  // Documentation: https://vitejs.dev/config/shared-options.html#base
  // `/` for local docker
  // `/` for local-env and prod
  base: `/`,
  plugins: [
    // Enable React support
    react(),
    // Enable SVG imports as React components
    svgr(),
    federation({
      // Unique name for the application
      name: "inner_circle_ui",
      // The path where the remote application file can be found and its name
      remotes: {
        // `http://localhost:4455/assets/inner_circle_layout_ui.js` for local docker
        // `http://localhost:30090/layout/assets/inner_circle_layout_ui.js` for local-env
        inner_circle_layout_ui: `${process.env.VITE_BASE_URL}/layout/assets/inner_circle_layout_ui.js`,
      },
      // Shared dependencies to avoid duplication
      shared: [
        "react",
      ],
    }),
  ],
  define: {
    // Set a global variable to handle different base paths in various environments
    // This variable is used in HTML files to dynamically adjust script paths
    // In production, it will be `/books`, while in development it will be an empty string.
    // Example usage in HTML: <script src="%VITE_BASE_PATH%/env-config.js"></script>
    'import.meta.env.VITE_BASE_PATH': JSON.stringify(
      process.env.NODE_ENV === `production` ? '/employees' : ``,
    ),
  },
  // Build configuration
  build: {
    // For successful docker build 
    // https://stackoverflow.com/questions/76616620/vite-refuses-to-use-the-correct-build-target-in-my-svelte-ts-project 
    // https://github.com/Lenni009/vite-build-target-issue
    target: `esnext`,
  },
})