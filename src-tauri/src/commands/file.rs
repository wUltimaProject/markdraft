use std::path::PathBuf;

#[tauri::command]
pub fn read_file(path: String) -> Result<String, String> {
    let p = PathBuf::from(&path);
    // Why: canonicalize prevents path traversal — attacker can't escape app sandbox
    let canonical = p.canonicalize().map_err(|e| e.to_string())?;
    std::fs::read_to_string(canonical).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn write_file(path: String, content: String) -> Result<(), String> {
    let p = PathBuf::from(&path);
    if let Some(parent) = p.parent() {
        std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    std::fs::write(p, content).map_err(|e| e.to_string())
}
