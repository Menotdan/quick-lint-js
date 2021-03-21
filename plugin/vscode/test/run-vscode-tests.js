// Copyright (C) 2020  Matthew Glazar
// See end of file for extended copyright information.

"use strict";

let fs = require("fs");
let os = require("os");
let path = require("path");
let vscodeTest = require("vscode-test");
let { testFilterEnvironmentVariable } = require("./test-support.js");

async function mainAsync() {
  // To make tests consistent across machines, and to allow changing
  // workspace-wide settings, use an empty workspace. (vscode-test doesn't do
  // this for us.)
  let workspacePath = path.resolve(__dirname, "empty_test_workspace");

  await vscodeTest.runTests({
    extensionDevelopmentPath: path.resolve(__dirname, ".."),
    extensionTestsPath: path.resolve(__dirname, "vscode-tests.js"),
    version: "1.49.0",
    launchArgs: [workspacePath],
    extensionTestsEnv: {
      [testFilterEnvironmentVariable]: process.argv[2],
      // HACK(strager): Silence lots of log noise generated by VS Code.
      NODE_NO_WARNINGS: "1",
    },
  });
}
exports.mainAsync = mainAsync;

if (require.main === module) {
  mainAsync().catch((error) => {
    console.log(error.stack);
    process.exit(1);
  });
}

// quick-lint-js finds bugs in JavaScript programs.
// Copyright (C) 2020  Matthew Glazar
//
// quick-lint-js is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// quick-lint-js is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with quick-lint-js.  If not, see <https://www.gnu.org/licenses/>.
