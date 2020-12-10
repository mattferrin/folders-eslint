const addon = require("../../../native");

describe("invalid files", () => {
  it("violate child of parent", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/regex_invalid_files/violate_child_of_parent/.folderslintrc.json"
      );
    }).toThrowError(
      /The following file path does not satisfy any rules `lib\/__tests__\/regex_invalid_files\/violate_child_of_parent\/root\/nested\/package\.json`/
    );
  });
});
