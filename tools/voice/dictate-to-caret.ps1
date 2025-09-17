param(
  [Parameter(Mandatory=$false)] [string]$Culture = 'en-US',
  [Parameter(Mandatory=$false)] [switch]$NoSpaces
)

# Basic speech-to-text dictation that types at the caret.
# Stop with Ctrl+C in the PowerShell window.

Add-Type -AssemblyName System.Speech
Add-Type -AssemblyName System.Windows.Forms

$culture = New-Object System.Globalization.CultureInfo($Culture)
$rec = New-Object System.Speech.Recognition.SpeechRecognitionEngine($culture)

# Use free dictation grammar
$rec.LoadGrammar([System.Speech.Recognition.DictationGrammar]::new())
$rec.SetInputToDefaultAudioDevice()

Register-ObjectEvent -InputObject $rec -EventName SpeechRecognized -Action {
    $t = $EventArgs.Result.Text
    if ($t) {
        if ($NoSpaces) {
            [System.Windows.Forms.SendKeys]::SendWait($t)
        } else {
            [System.Windows.Forms.SendKeys]::SendWait($t + ' ')
        }
    }
} | Out-Null

Register-ObjectEvent -InputObject $rec -EventName SpeechRecognitionRejected -Action {
    # ignored
} | Out-Null

$rec.RecognizeAsync([System.Speech.Recognition.RecognizeMode]::Multiple)

Write-Host "Jarvis dictation active for culture '$Culture'. Focus the chat input and speak. Press Ctrl+C to stop."

try {
  while ($true) { Start-Sleep -Milliseconds 250 }
} finally {
  $rec.RecognizeAsyncStop()
  $rec.Dispose()
}
