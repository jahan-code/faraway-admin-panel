@echo off
echo Building Faraway Admin Panel Installer...

echo Step 1: Building Next.js application...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Next.js build failed
    pause
    exit /b 1
)

echo Step 2: Building Electron installer...
call npx electron-builder --win nsis
if %errorlevel% neq 0 (
    echo Error: Electron builder failed
    pause
    exit /b 1
)

echo Build completed successfully!
echo Installer should be in the dist folder
pause
