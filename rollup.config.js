import merge from "deepmerge";
import { createBasicConfig } from "@open-wc/building-rollup";

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  input: "./bin/main.js",
  output: {
    entryFileNames: "bundle.js",
    dir: "dist",
  },
});
