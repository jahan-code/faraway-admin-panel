# Monitors the clipboard and automatically speaks new text using speak-text.ps1.
# Stop with Ctrl+C in this window.

param(
  [Parameter(Mandatory=$false)] [int]$IntervalMs = 500,
  [Parameter(Mandatory=$false)] [string]$VoiceName,
  [Parameter(Mandatory=$false)] [int]$Rate = 0,
  [Parameter(Mandatory=$false)] [int]$Volume = 100
)

Add-Type -AssemblyName System.Windows.Forms

$prev = $null
Write-Host "Auto-Speak clipboard watcher started. Interval: ${IntervalMs}ms. Press Ctrl+C to stop."

while ($true) {
  try {
    $curr = [System.Windows.Forms.Clipboard]::GetText()
  } catch {
    $curr = $null
  }
  if ($curr -and $curr -ne $prev) {
    $prev = $curr
    # Prepare speak command
    $speak = Join-Path $PSScriptRoot 'speak-text.ps1'
    if (Test-Path $speak) {
      $args = @()
      if ($VoiceName) { $args += @('-VoiceName', $VoiceName) }
      $args += @('-Rate', $Rate, '-Volume', $Volume)
      # Use pipeline to pass text safely
      $psi = "Get-Content -Raw -Encoding UTF8 `"$env:TEMP\_jarvis_auto_clip.txt`" | `"$speak`" " + ($args -join ' ')
      Set-Content -Path "$env:TEMP\_jarvis_auto_clip.txt" -Value $curr -Encoding UTF8
      Start-Process powershell -ArgumentList "-NoLogo","-NoProfile","-ExecutionPolicy","Bypass","-Command", $psi -WindowStyle Hidden
    }
  }
  Start-Sleep -Milliseconds $IntervalMs
}
