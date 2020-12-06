use glob::Pattern;
use neon::prelude::*;
use serde::Deserialize;
use std::fs::File;
use std::io::BufReader;
use std::path::Path;
use walkdir::WalkDir;

#[derive(Debug, Deserialize)]
struct ConfigFile {
    root: String,
    rules: Vec<String>,
}

fn enforce_config(mut cx: FunctionContext) -> JsResult<JsString> {
    let config_file = match cx.argument_opt(0) {
        None => ".folderslintrc.json".to_owned(),
        Some(arg) => arg.downcast::<JsString>().or_throw(&mut cx)?.value(),
    };
    let config_file_display = config_file.clone();

    let file = File::open(config_file).expect(&format!(
        "Could not open the config file `{}`",
        config_file_display
    ));
    
    let reader = BufReader::new(file);
    let config_values: ConfigFile = serde_json::from_reader(reader).expect(&format!(
        "Could not parse the `{}` file",
        config_file_display
    ));

    if !Path::new(&config_values.root).exists() {
        panic!(format!(
            "The `root` path is invalid in the config file `{}`",
            config_file_display
        ));
    }
    if config_values.rules.len() < 1 {
        panic!(format!(
            "The `rules` array is empty in the config file `{}`",
            config_file_display
        ));
    }

    for entry in WalkDir::new(config_values.root)
        .follow_links(true)
        .into_iter()
        .filter_map(move |e| e.ok())
        .filter(|e| !e.file_type().is_dir())
    {
        let entry_1 = entry.clone();
        let satisfies_rule = config_values.rules.clone().into_iter().any(move |rule| {
            let path = format!("{}", entry.path().display());
            Pattern::new(&rule).unwrap().matches(&path)
        });
        if !satisfies_rule {
            panic!(format!(
                "The following file path does not satisfy any rules `{}`",
                entry_1.path().display()
            ));
        }
    }
    Ok(cx.string("No rule violations detected"))
}

register_module!(mut cx, { cx.export_function("enforceConfig", enforce_config) });
