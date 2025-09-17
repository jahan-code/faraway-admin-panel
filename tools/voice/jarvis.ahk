; AutoHotkey v1 script for quick Jarvis-like control on Windows
; Hotkeys:
;  F9  - Start dictation (PowerShell)
;  F10 - Speak clipboard (PowerShell)
;  Ctrl+Shift+J - Copy selection and speak
;  Ctrl+Alt+S - Toggle Auto-Speak on clipboard change

#NoEnv
#SingleInstance, Force
SendMode, Input
SetWorkingDir, %A_ScriptDir%

; Adjust paths if your repo path changes
repo := "d:\\farway admin\\faraway-admin-panel"
voiceDir := repo . "\\tools\\voice"

; Helper: run PowerShell script with proper execution policy bypass
RunPs(script, params:="") {
    Run, powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File `"%script%`" %params%,, Hide
}

F9::
; Start dictation to caret (en-US)
script := voiceDir . "\\dictate-to-caret.ps1"
RunPs(script, "-Culture en-US")
return

F10::
; Speak clipboard
script := voiceDir . "\\speak-clipboard.ps1"
RunPs(script)
return

^+j::
; Copy selection and speak it
ClipSaved := ClipboardAll
Send, ^c
ClipWait, 0.5
if (ErrorLevel) {
    ; nothing copied
} else {
    script := voiceDir . "\\speak-text.ps1"
    ; PowerShell will read text from pipeline
    tmp := Clipboard
    FileDelete, %A_Temp%\\_jarvis_say.txt
    FileAppend, %tmp%, %A_Temp%\\_jarvis_say.txt, UTF-8
    Run, powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "Get-Content -Raw -Encoding UTF8 `"%A_Temp%\_jarvis_say.txt`" | `"%script%`"",, Hide
}
Clipboard := ClipSaved
VarSetCapacity(ClipSaved, 0)
return

; ================================
; Auto-Speak on Clipboard Change
; ================================
AutoSpeak := false
PrevClip := ""

^!s::
; Toggle auto-speak mode
AutoSpeak := !AutoSpeak
TrayTip, Jarvis, Auto-Speak is now % (AutoSpeak ? "ON" : "OFF"), 2, 1
if (AutoSpeak) {
    SetTimer, CheckClipboard, 500
} else {
    SetTimer, CheckClipboard, Off
}
return

CheckClipboard:
    curr := Clipboard
    if (curr = "")
        return
    if (curr != PrevClip) {
        PrevClip := curr
        ; Speak new clipboard text
        script := voiceDir . "\\speak-text.ps1"
        FileDelete, %A_Temp%\\_jarvis_auto_say.txt
        FileAppend, %curr%, %A_Temp%\\_jarvis_auto_say.txt, UTF-8
        Run, powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "Get-Content -Raw -Encoding UTF8 `"%A_Temp%\_jarvis_auto_say.txt`" | `"%script%`"",, Hide
    }
return
