@echo off
setlocal ENABLEDELAYEDEXPANSION

echo ===== Faraway Admin Panel: Full Rebuild & Package =====

:: 1) Prepare caches on D: to save C: space
if not exist "D:\dev-cache\npm-cache" mkdir "D:\dev-cache\npm-cache"
if not exist "D:\dev-cache\electron-cache" mkdir "D:\dev-cache\electron-cache"
if not exist "D:\dev-cache\electron-builder" mkdir "D:\dev-cache\electron-builder"
if not exist "D:\dev-cache\temp" mkdir "D:\dev-cache\temp"

set npm_config_cache=D:\dev-cache\npm-cache
set npm_config_tmp=D:\dev-cache\temp
set ELECTRON_CACHE=D:\dev-cache\electron-cache
set ELECTRON_BUILDER_CACHE=D:\dev-cache\electron-builder
set TEMP=D:\dev-cache\temp
set TMP=D:\dev-cache\temp
set TAILWIND_DISABLE_OXIDE=1

echo.
echo Step 1: Cleaning npm cache...
call npm cache clean --force
if errorlevel 1 goto :error

echo.
echo Step 2: Stopping lingering processes (node/electron/npm)...
taskkill /IM electron.exe /F >NUL 2>&1
taskkill /IM node.exe /F >NUL 2>&1
taskkill /IM npm.exe /F >NUL 2>&1

echo.
echo Step 2.1: Clearing known locked file (Tailwind oxide) if present...
set LOCKED_DIR=node_modules\@tailwindcss\oxide-win32-x64-msvc
set LOCKED_FILE=%LOCKED_DIR%\tailwindcss-oxide.win32-x64-msvc.node
set LOCKED_FILE_BAK=%LOCKED_FILE%.bak

if exist "%LOCKED_FILE%" (
  echo  - Removing attributes on %LOCKED_FILE%
  attrib -r -s -h "%LOCKED_FILE%" >NUL 2>&1
  echo  - Taking ownership on %LOCKED_FILE%
  takeown /f "%LOCKED_FILE%" >NUL 2>&1
  icacls "%LOCKED_FILE%" /grant *S-1-5-32-544:F /T /C >NUL 2>&1
  echo  - Forcing delete %LOCKED_FILE%
  del /f /q "%LOCKED_FILE%" >NUL 2>&1
)

if exist "%LOCKED_FILE_BAK%" (
  echo  - Removing attributes on %LOCKED_FILE_BAK%
  attrib -r -s -h "%LOCKED_FILE_BAK%" >NUL 2>&1
  echo  - Taking ownership on %LOCKED_FILE_BAK%
  takeown /f "%LOCKED_FILE_BAK%" >NUL 2>&1
  icacls "%LOCKED_FILE_BAK%" /grant *S-1-5-32-544:F /T /C >NUL 2>&1
  echo  - Forcing delete %LOCKED_FILE_BAK%
  del /f /q "%LOCKED_FILE_BAK%" >NUL 2>&1
)

echo.
echo Step 2.2: Removing node_modules (if present)...
if exist node_modules (
  echo  - Reset attributes under node_modules (this may take a moment)...
  attrib -r -s -h /s /d node_modules\* >NUL 2>&1
  echo  - Taking ownership of node_modules...
  takeown /f node_modules /r /d y >NUL 2>&1
  icacls node_modules /grant *S-1-5-32-544:F /T /C >NUL 2>&1
  echo  - Removing node_modules...
  rmdir /s /q node_modules
)

:: Also remove Next.js and dist caches if present
if exist .next rmdir /s /q .next
if exist dist rmdir /s /q dist


echo.
echo Step 3: Installing dependencies with npm ci...
call npm ci
if errorlevel 1 goto :error


echo.
echo Step 4: Building Next.js (standalone)...
call npm run build
if errorlevel 1 goto :error


echo.
echo Step 5: Packaging Electron (NSIS installer)...
call npx electron-builder --win nsis
if errorlevel 1 goto :error


echo.
echo Success! Installer and unpacked build are in the dist\ folder.
echo  - Unpacked app: dist\win-unpacked\electron.exe

echo  - Installer:   dist\Faraway Admin Panel-*.exe (NSIS)

goto :end

:error
echo.
echo ERROR: A step failed. Please scroll up for details.
pause
exit /b 1

:end
pause
exit /b 0
