import path from "node:path";
import { waitForPageReady, type TestRunnerConfig } from "@storybook/test-runner";
import { toMatchImageSnapshot } from "jest-image-snapshot";

const CUSTOM_SNAPSHOTS_DIR = path.resolve("./tests/__image_snapshots__");

const FAILURE_THRESHOLD = 1;
const FAILURE_THRESHOLD_TYPE = "pixel";

const DEFAULT_VIEWPORT_SIZE = { width: 800, height: 600 };

export function resetAnimationsCSS() {
  return `
    *, *::after, *::before {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -ms-transition: none !important;
      -o-transition: none !important;
      transition: none !important;

      -webkit-animation: none !important;
      -moz-animation: none !important;
      -ms-animation: none !important;
      -o-animation: none !important;
      animation: none !important;
    }

    input, textarea {
      caret-color: transparent !important;
    }
  `;
}

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
    page.setViewportSize(DEFAULT_VIEWPORT_SIZE);

    await waitForPageReady(page);
  },
  async postVisit(page) {
    await page.addStyleTag({
      content: resetAnimationsCSS(),
    });

    await page.waitForSelector("#storybook-root");

    await waitForPageReady(page);

    await page.waitForTimeout(500);

    const image = await page.screenshot();

    (expect(image) as unknown as { toMatchImageSnapshot: <T>(t: T) => void }).toMatchImageSnapshot({
      customSnapshotsDir: CUSTOM_SNAPSHOTS_DIR,
      failureThreshold: FAILURE_THRESHOLD,
      failureThresholdType: FAILURE_THRESHOLD_TYPE,
    });
  },
  tags: {
    skip: ["skip-visual-test"],
  },
};

export default config;
