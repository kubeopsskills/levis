import MicroServiceChart from "./src/charts/index";
import { Testing } from 'cdk8s';

describe("MicroServiceChart", () => {
  test("should be can generate", () => {
    const app = Testing.app();
    const command = {
      configFilePath: "./examples/levis-config.yaml",
      outputFilePath: "./tests/result",
    };

    const chart = new MicroServiceChart(app, command);
    const results = Testing.synth(chart);

    expect(results).toMatchSnapshot();
  });
});
