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
      throw err;
    }
    handleInput(data, (err) => {
      if (err) {
        throw err;
      }
    });
  });
});
