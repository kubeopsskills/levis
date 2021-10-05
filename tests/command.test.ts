import * as Fs from 'fs'
import { exec, execSync } from "child_process";

describe("Command CLI", () => {
  beforeAll(() => {
    execSync("rm -rf bin");
    execSync("yarn build");
  })

  it("should can export k8s yaml with levis create with more than 2 level directory", (done) => {
    const expectFile = "./tests/command/output/levis-k8s.yaml";

    const command = exec(
      `node bin/main.js create -f ./examples/levis-config.yaml -o ${expectFile}`
    );

    // Test expect
    command.stdout?.on("data", (_) => {
      const actual = Fs.readFileSync(expectFile);
      expect(actual).toBeTruthy();

      if (actual) {
        Fs.unlinkSync(expectFile);
      }

      done();
    });

    command.stderr?.on("data", (_) => {
      done.fail(new Error("Cannot use cli to generate yaml"));
    });
  });

  it("should can export k8s yaml with levis create with less than 2 level directory", (done) => {
    const expectFile = "../../../tests/command/output/levis-k8s.yaml";

    const command = exec(
      `node bin/main.js create -f ./examples/levis-config.yaml -o ${expectFile}`
    );

    // Test expect
    command.stdout?.on("data", (_) => {
      const actual = Fs.readFileSync(expectFile);
      expect(actual).toBeTruthy();

      if (actual) {
        Fs.unlinkSync(expectFile);
      }

      done();
    });

    command.stderr?.on("data", (_) => {
      done.fail(new Error("Cannot use cli to generate yaml"));
    });
  });
});