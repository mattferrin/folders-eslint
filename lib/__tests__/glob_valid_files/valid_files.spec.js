const addon = require("../../../native");

describe("valid files", () => {
  it("satisfy child of parent", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/glob_valid_files/satisfy_child_of_parent/.folderslintrc.json"
      );
    }).not.toThrow();
  });

  it("satisfy parent of child", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/glob_valid_files/satisfy_parent_of_child/.folderslintrc.json"
      );
    }).not.toThrow();
  });

  it("satisfy a and b rules", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/glob_valid_files/satisfy_ab/.folderslintrc.json"
      );
    }).not.toThrow();
  });

  it("satisfy b and a rules", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/glob_valid_files/satisfy_ba/.folderslintrc.json"
      );
    }).not.toThrow();
  });

  it("one above root", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/glob_valid_files/one_above_root/.folderslintrc.json"
      );
    }).not.toThrow();
  });
});
