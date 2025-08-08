import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  outExtension({ format }) {
    return format === "esm" ? { js: ".mjs" } : { js: ".cjs" };
  },
});
