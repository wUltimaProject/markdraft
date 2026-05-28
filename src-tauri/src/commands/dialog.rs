use tauri::AppHandle;
use tauri_plugin_dialog::{DialogExt, FileDialogBuilder};

#[tauri::command]
pub async fn open_file_dialog(app: AppHandle) -> Option<String> {
    FileDialogBuilder::new(app.dialog().clone())
        .add_filter("Markdown", &["md", "markdown", "txt"])
        .blocking_pick_file()
        .map(|p| p.to_string())
}

#[tauri::command]
pub async fn save_file_dialog(app: AppHandle, suggested_name: Option<String>) -> Option<String> {
    let mut builder = FileDialogBuilder::new(app.dialog().clone())
        .add_filter("Markdown", &["md", "markdown"]);
    if let Some(name) = suggested_name {
        builder = builder.set_file_name(&name);
    }
    builder
        .blocking_save_file()
        .map(|p| p.to_string())
}
