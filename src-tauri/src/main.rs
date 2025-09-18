#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::net::TcpStream;
use std::process::Command;
use std::thread;
use std::time::{Duration, Instant};
use tauri::Manager;

#[tauri::command]
fn open_external(url: String) -> Result<(), String> {
  tauri::api::shell::open("" /* use system default */, url, None)
    .map_err(|e| format!("failed to open url: {}", e))
}

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      #[cfg(not(debug_assertions))]
      {
        // In production, launch the bundled Next.js standalone server as a sidecar
        let resolver = app.path_resolver();
        if let Some(mut server_dir) = resolver.resource_dir() {
          server_dir.push("server");

          // Prefer embedded Node runtime if present, else fallback to system 'node'
          let mut embedded_node = server_dir.clone();
          embedded_node.push("node");
          embedded_node.push("node.exe");
          let node_cmd = if embedded_node.exists() {
            embedded_node.as_os_str().to_owned()
          } else {
            std::ffi::OsStr::new("node").to_owned()
          };

          // We'll run: node server.js with PORT=5173
          let mut cmd = Command::new(node_cmd);
          cmd.current_dir(&server_dir)
            .env("PORT", "5173")
            .env("HOSTNAME", "127.0.0.1")
            .env("NODE_ENV", "production")
            .arg("server.js");

          // Spawn detached; if this fails, the window will still try to load the URL and error visibly
          let _child = cmd.spawn();

          // Wait for the port to be ready (max 20s)
          let start = Instant::now();
          let target = "127.0.0.1:5173";
          while start.elapsed() < Duration::from_secs(20) {
            if TcpStream::connect(target).is_ok() {
              break;
            }
            thread::sleep(Duration::from_millis(300));
          }

          // Redirect window to the local server URL
          if let Some(win) = app.get_window("main") {
            let _ = win.eval("window.location.replace('http://127.0.0.1:5173');");
          }
        }
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![open_external])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
