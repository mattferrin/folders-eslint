#!/usr/bin/env node

var addon = require("../native");
var argv = require("minimist")(process.argv.slice(2));

if (typeof argv.config === "string") {
  // TODO: test as of yet untested CLI and it's `--config="root/path"` arg
  addon.enforceConfig(argv.config);
} else {
  addon.enforceConfig();
}
