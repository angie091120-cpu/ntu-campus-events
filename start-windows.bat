@echo off
title Campus Events - Local Server
cd /d "%~dp0"

echo.
echo ============================================
echo  Campus Events - Starting local server...
echo ============================================
echo.

python --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python found
    echo.
    echo URL: http://localhost:8000
    echo Browser will open automatically.
    echo.
    echo ============================================
    echo  Close this window to stop the server
    echo ============================================
    echo.
    timeout /t 2 /nobreak >nul
    start http://localhost:8000
    python -m http.server 8000
    pause
    exit /b
)

py --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Python ^(py^) found
    echo.
    echo URL: http://localhost:8000
    timeout /t 2 /nobreak >nul
    start http://localhost:8000
    py -m http.server 8000
    pause
    exit /b
)

node --version >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Node.js found
    echo.
    echo URL: http://localhost:8000
    timeout /t 2 /nobreak >nul
    start http://localhost:8000
    npx --yes http-server -p 8000
    pause
    exit /b
)

echo.
echo [X] Python or Node.js not found
echo.
echo Please install Python:
echo   Option 1: Download from https://www.python.org/downloads/
echo            ^(check "Add Python to PATH" when installing^)
echo   Option 2: Microsoft Store, search "Python"
echo.
echo After install, double-click this file again.
echo.
pause
