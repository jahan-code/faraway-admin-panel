Add-Type -AssemblyName System.Speech

$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.Rate = 0
$s.Volume = 100

try { $text = Get-Clipboard } catch { $text = $null }

if ([string]::IsNullOrWhiteSpace($text)) {
  Write-Host "Clipboard is empty."
  exit 0
}

$s.Speak($text)
