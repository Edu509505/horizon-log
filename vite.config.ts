import { defineConfig, loadEnv } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // Carrega as variáveis do ambiente (incluindo as injetadas pelo Docker ENV/ARG)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      devtools(),
      tsconfigPaths({ projects: ["./tsconfig.json"] }),
      tailwindcss(),
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      viteReact(),
    ],
    define: {
      // Garante a substituição no código compilado mesmo no ambiente Alpine/Linux
      "import.meta.env.VITE_API_URL": JSON.stringify(
        env.VITE_API_URL || process.env.VITE_API_URL
      ),
    },
  };
});