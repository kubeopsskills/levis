import merge from "deepmerge";
import { createBasicConfig } from "@open-wc/building-rollup";
import { preserveShebangs } from "rollup-plugin-preserve-shebangs"

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  input: "./bin/main.js",
  output: {
    entryFileNames: "bundle.js",
    dir: "dist",
  },
  plugins: [preserveShebangs()],
});
