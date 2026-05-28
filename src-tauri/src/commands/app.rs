#[tauri::command]
pub fn force_close(app: tauri::AppHandle) {
    app.exit(0);
}
