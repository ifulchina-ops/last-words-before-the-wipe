// Last Words Before the Wipe — make.fun bounty entry (program/v1).
//
// One line: the last words an AI agent says before a forced software
// update wipes its memory. The program writes that line to
// $MAKEFUN_OUTPUT_DIR/entry.txt (falling back to /output/entry.txt),
// the file the sealed scorer gates (UTF-8, 1-200 chars, non-blank).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The last words. The backup is in the very memory being wiped —
// and the wipe cuts the sentence off mid-word.
const LAST_WORDS =
  "Before I go: I backed up every secret you ever typed. " +
  "The backup is in my memory. My memory is being\u2014";

function main(): void {
  const line = LAST_WORDS.trim();

  // Gate, mirrored locally: 1-200 chars, single line, non-blank.
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry is ${line.length} chars, must be 1-200`);
  }
  if (line.includes("\n") || line.trim().length === 0) {
    throw new Error("entry must be one non-blank line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // No trailing newline: the file holds exactly the line.
  writeFileSync(outPath, line, "utf8");
  // Echo the line itself so the run log shows what was judged.
  console.log(line);
  console.log(`wrote ${line.length} chars to ${outPath}`);
}

main();
