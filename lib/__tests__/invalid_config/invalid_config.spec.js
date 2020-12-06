const addon = require("../../../native");

describe("invalid config", () => {
  it("nothing setup", () => {
    expect(addon.enforceConfig).toThrowError(
      /Could not open the config file `\.folderslintrc\.json`/
    );
  });

  it("invalid config path", () => {
    expect(function () {
      addon.enforceConfig("bogus/path");
    }).toThrowError(/Could not open the config file `bogus\/path`/);
  });

  it("empty config file", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_config/empty_config_file/.folderslintrc.json"
      );
    }).toThrowError(
      /Could not parse the `lib\/__tests__\/invalid_config\/empty_config_file\/\.folderslintrc\.json` file/
    );
  });

  it("empty config object", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_config/empty_config_object/.folderslintrc.json"
      );
    }).toThrowError(/missing field `root`/);
  });

  it("missing config root", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_config/missing_config_root/.folderslintrc.json"
      );
    }).toThrowError(/missing field `root`/);
  });

  it("missing config rules", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_config/missing_config_rules/.folderslintrc.json"
      );
    }).toThrowError(/missing field `rules`/);
  });

  it("invalid config root", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_config/invalid_config_root/.folderslintrc.json"
      );
    }).toThrowError(
      /The `root` path is invalid in the config file `lib\/__tests__\/invalid_config\/invalid_config_root\/\.folderslintrc\.json`/
    );
  });

  it("empty config rules", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_config/empty_config_rules/.folderslintrc.json"
      );
    }).toThrowError(
      /The `rules` array is empty in the config file `lib\/__tests__\/invalid_config\/empty_config_rules\/\.folderslintrc\.json`/
    );
  });
});
