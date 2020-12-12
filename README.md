# folders-lint

## About

Many aspects of this project are shamelessly borrowed form [FoldersLint](https://github.com/denisraslov/folderslint), the best equivalent I was able to find before writing this module.

### Purpose

This module aims to improve folder structure by only allowing safe-listed file paths. As a byproduct, the configuration file can be thought of as readable documentation for the folder structure.

### Built With

This is a [Node.js](https://nodejs.org/) module written in [Rust](https://www.rust-lang.org/) and created using [Neon](https://github.com/neon-bindings/neon). The underlying Glob implementation is the [glob crate](https://docs.rs/glob). The underlying Regex implementation is the [regex crate](https://docs.rs/regex).

## Getting Started

Warning: Cloning this repo and building with Neon might work better for you, but please help fix if normal installation fails.

(The first step is Windows only.)

`npm install --global windows-build-tools`

`npm install -g node-gyp`

`npm i -D mattferrin/folders-lint`

(If installation has a cargo error hiccup try [Installing Rust](https://www.rust-lang.org/tools/install).)

Create your custom `.folderslintrc.json` file:

```json
{
  "root": "src",
  "rules": [
    "App.*",
    "index.*",

    "common/hooks/use*.*",
    "common/components/Render*.*",
    "common/handlers/handle*.*",

    "features/*/index.*",
    "features/*/hooks/use*.*",
    "features/*/components/Render*.*",
    "features/*/handlers/handle*.*",

    "__tests__/*/*.test.tsx"
  ]
}
```

Add this to your `package.json`:

```json
{
  "scripts": {
    "fslint": "folders-lint"
  }
}
```

Run the linter:

`npm run fslint`

### Optionally

`npm install husky --save-dev`

And add this to your `package.json`:

```json
{
  "scripts": {
    "fslint": "folders-lint"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run fslint"
    }
  }
}
```

## Usage

### Glob

The glob rules are matched with:

```rs
case_sensitive: true,
require_literal_leading_dot: false,
require_literal_separator: true`,
```

Example `.folderslintrc.json` glob rule:

```json
{
  "root": "src",
  "rules": ["legacy/**"]
}
```

### Regex

#### Warning: Most of us mere mortals find regex unreadable. (But it's so powerful.)

Example `.folderslintrc.json` regex rule:

```json
{
  "root": "src",
  "rules": ["/index\\.tsx/"]
}
```

### Or Both

Example `.folderslintrc.json` rules:

```json
{
  "root": "src",
  "rules": ["legacy/**", "/index\\.tsx/"]
}
```

Note: Regex escape character `\` needs double escaped in JSON: `\\`
