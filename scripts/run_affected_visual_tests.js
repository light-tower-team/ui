import path from "node:path";
import { spawn } from "node:child_process";
import fg from "fast-glob";

const SOURCE_PATH_REGEX = /^src\/.+/;

const MESSAGE_RUNNING_FULL_SUITE = "Running full test suite as changes to the following file might far-reaching:\n";

const MESSAGE_RUNNING_AFFECTED_SUITE = "The following stories seem to be affected by the changes:\n";

const MESSAGE_NOT_RUNNING = "Skipping visual tests as no story seems to be affected.";

const MESSAGE_VISUAL_TESTS_PASSED = "Visual test(s) passed.";

const MESSAGE_VISUAL_TESTS_FAILED = "Visual test(s) failed.";

function getChangedFiles() {
  return new Promise((res) => {
    const paths = new Set();

    const child = spawn("git", ["diff", "--name-only", "--diff-filter=d", "origin/master...HEAD"], {
      encoding: "utf-8",
    });

    child.stdout.on("data", (chunk) =>
      chunk
        .toString("utf-8")
        .split("\n")
        .filter(Boolean)
        .map((p) => paths.add(p)),
    );
    child.stdout.on("close", () => res([...paths]));
  });
}

function getSiblingStories(file) {
  const dirname = path.dirname(file);

  return fg.sync(`${dirname}/*.stories.ts`);
}

function printFileList(paths) {
  paths.forEach((p) => console.log("-", path.basename(p), "\n"));
}

function runVisualTests(stories) {
  return new Promise((res, rej) => {
    const child = spawn("pnpm", ["test:visual"], {
      env: {
        ...process.env,
        ...(stories?.size
          ? {
              STORIES: [...stories].map((story) => path.join("..", story)).join(","),
            }
          : {}),
      },
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on("exit", (code) => {
      if (code === 0) {
        res(MESSAGE_VISUAL_TESTS_PASSED);
      } else {
        const error = new Error(MESSAGE_VISUAL_TESTS_FAILED);

        error.status = code;

        rej(error);
      }
    });
  });
}

async function main() {
  const affectedStories = new Set();
  const changedFiles = await getChangedFiles();

  let farReachingFile;

  for (const file of changedFiles) {
    if (!SOURCE_PATH_REGEX.test(file)) {
      continue;
    }

    const siblingStories = getSiblingStories(file);

    if (!siblingStories.length) {
      farReachingFile = file;
      break;
    }

    siblingStories.forEach((siblingStory) => affectedStories.add(siblingStory));
  }

  if (farReachingFile) {
    console.log(MESSAGE_RUNNING_FULL_SUITE, "-", farReachingFile, "\n");

    return runVisualTests();
  }

  if (affectedStories.size) {
    console.log(MESSAGE_RUNNING_AFFECTED_SUITE);

    printFileList(affectedStories);

    return runVisualTests(affectedStories);
  }

  return MESSAGE_NOT_RUNNING;
}

main()
  .then((message) => console.log(message))
  .catch((error) => {
    console.error(error.message);

    process.exit(1);
  });
