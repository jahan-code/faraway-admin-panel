Add-Type -AssemblyName System.Speech

$s = New-Object System.Speech.Synthesis.SpeechSynthesizer

Write-Host "Installed Voices:" -ForegroundColor Cyan
foreach ($v in $s.GetInstalledVoices()) {
  $info = $v.VoiceInfo
  Write-Output ([pscustomobject]@{
    Name = $info.Name
    Culture = $info.Culture
    Gender = $info.Gender
    Age = $info.Age
    Description = $info.Description
  })
}
