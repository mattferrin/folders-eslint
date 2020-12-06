const addon = require("../../../native");

describe("invalid files", () => {
  it("violate child of parent", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_files/violate_child_of_parent/.folderslintrc.json"
      );
    }).toThrowError(
      /The following file path does not satisfy any rules `lib\/__tests__\/invalid_files\/violate_child_of_parent\/root\/nested\/package\.json`/
    );
  });

  it("violate parent of child", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_files/violate_parent_of_child/.folderslintrc.json"
      );
    }).toThrowError(
      /The following file path does not satisfy any rules `lib\/__tests__\/invalid_files\/violate_parent_of_child\/root\/package\.json`/
    );
  });

  it("violate a of b and c rules", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_files/violate_a_of_bc/.folderslintrc.json"
      );
    }).toThrowError(
      /The following file path does not satisfy any rules `lib\/__tests__\/invalid_files\/violate_a_of_bc\/root\/a\.rs`/
    );
  });

  it("violate c of a and b rules", () => {
    expect(function () {
      addon.enforceConfig(
        "lib/__tests__/invalid_files/violate_c_of_ab/.folderslintrc.json"
      );
    }).toThrowError(
      /The following file path does not satisfy any rules `lib\/__tests__\/invalid_files\/violate_c_of_ab\/root\/c\.rs`/
    );
  });
});
