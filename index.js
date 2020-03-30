"use strict";

const settings = require("drone-env-parser").parseEnvs({
  splitOnComma: true,
});

process.env.COVERALLS_REPO_TOKEN = settings.token;
const { handleInput } = require("coveralls");
const fs = require("fs");

settings.files.forEach((file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(`Could not read coverage file ${file}`);
      process.exit(1);
    }
    handleInput(data, (err) => {
      if (err) {
        console.error(`Could not submit coverage file ${file}`);
        process.exit(1);
      }
    });
  });
});
