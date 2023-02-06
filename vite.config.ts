import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {fileURLToPath} from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      vue: "vue/dist/vue.esm-bundler.js",
      "balm-ui-plus": "balm-ui/dist/balm-ui-plus.esm.js",
      "balm-ui-css": "balm-ui/dist/balm-ui.css",
      'balm-ui-source': 'balm-ui/src/scripts/balm-ui.js',
      'balm-ui-plus-source': 'balm-ui/src/scripts/balm-ui-plus.js'
    },
  },
});
