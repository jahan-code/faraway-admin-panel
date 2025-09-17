param(
    [Parameter(Mandatory=$false)] [string]$Text,
    [Parameter(Mandatory=$false)] [string]$VoiceName,
    [Parameter(Mandatory=$false)] [int]$Rate = 0,   # -10 to 10
    [Parameter(Mandatory=$false)] [int]$Volume = 100 # 0 to 100
)

Add-Type -AssemblyName System.Speech

$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Defaults from environment if not explicitly passed
if (-not $PSBoundParameters.ContainsKey('VoiceName') -and $env:JARVIS_VOICE_NAME) {
    $VoiceName = $env:JARVIS_VOICE_NAME
}
if (-not $PSBoundParameters.ContainsKey('Rate') -and $env:JARVIS_VOICE_RATE) {
    try { $Rate = [int]$env:JARVIS_VOICE_RATE } catch {}
}

if ($PSBoundParameters.ContainsKey('VoiceName') -and $VoiceName) {
    try {
        $synth.SelectVoice($VoiceName)
    } catch {
        Write-Warning "Voice '$VoiceName' not found. Using default voice."
    }
}

if ($Rate -lt -10) { $Rate = -10 }
if ($Rate -gt 10)  { $Rate = 10 }
if ($Volume -lt 0) { $Volume = 0 }
if ($Volume -gt 100) { $Volume = 100 }

$synth.Rate = $Rate
$synth.Volume = $Volume

if (-not $Text) {
    # If no text provided, read from pipeline or clipboard
    $pipeline = @()
    if ($Input) { $pipeline = $Input }
    if ($pipeline.Count -gt 0) {
        $Text = ($pipeline -join " `n")
    } else {
        try { $Text = Get-Clipboard } catch { $Text = $null }
    }
}

if ([string]::IsNullOrWhiteSpace($Text)) {
    Write-Host "No text provided or clipboard empty."
    exit 0
}

# Ensure only one speech runs at a time using a named Mutex
# Use a simple name to avoid session/global prefix issues; fallback if needed
$mutexNames = @('JarvisSpeakMutex', 'Local\\JarvisSpeakMutex')
$mtx = $null
$acquired = $false
foreach ($name in $mutexNames) {
    try {
        $createdNew = $false
        $mtx = New-Object System.Threading.Mutex($true, $name, [ref]$createdNew)
        if (-not $createdNew) {
            # Another speech is active; wait up to 10 seconds
            $acquired = $mtx.WaitOne(10000)
        } else {
            $acquired = $true
        }
        break
    } catch {
        # try next name
        $mtx = $null
        continue
    }
}

if (-not $acquired) {
    Write-Host "Another speech operation is in progress; skipping."
    try { $synth.Dispose() } catch {}
    return
}

try {
    $synth.Speak($Text)
} finally {
    try { $synth.Dispose() } catch {}
    if ($mtx) {
        try { $mtx.ReleaseMutex() } catch {}
        try { $mtx.Dispose() } catch {}
    }
}

