#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager};

#[tauri::command]
fn open_external(url: String) -> Result<(), String> {
  tauri::api::shell::open("" /* use system default */, url, None)
    .map_err(|e| format!("failed to open url: {}", e))
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![open_external])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
