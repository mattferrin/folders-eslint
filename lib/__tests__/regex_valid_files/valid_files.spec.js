const addon = require("../../../native");

describe("regex valid files", () => {
  it("satisfy child of parent", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/regex_valid_files/satisfy_child_of_parent/.folderslintrc.json"
      );
    }).not.toThrow();
  });
});
