import { resolve } from 'path';
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
//
import {context} from "./src/common/context";
import eachWithPartial from "./src/layouts/eachWithPartial/eachWithPartial";

export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [handlebars({
    partialDirectory: resolve(__dirname, 'src/partials'),
    context,
    helpers: {
      eachWithPartial,
    },
  })],
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/pages/login/login.html'),
        registration: resolve(__dirname, 'src/pages/registration/registration.html'),
        chat: resolve(__dirname, 'src/pages/chat/chat.html'),
        userProfile: resolve(__dirname, 'src/pages/userProfile/userProfile.html'),
        '5XX': resolve(__dirname, 'src/pages/5XX/5XX.html'),
        404: resolve(__dirname, 'src/pages/404/404.html'),
        uiLib: resolve(__dirname, 'src/pages/uiLib/uiLib.html'),
      }
    }
  },
  server: {
    open: '/index.html'
  }
})
