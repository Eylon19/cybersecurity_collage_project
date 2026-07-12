@echo off
chcp 65001 >nul
echo ============================================
echo   Cyber Awareness - Windows Setup
echo ============================================
echo.

if not exist ".env" (
    echo [ERROR] .env file not found!
    echo Copy .env.example to .env and set your MySQL password.
    echo.
    pause
    exit /b 1
)

echo [1/3] Installing npm packages...
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)

echo.
echo [2/3] Importing database...
echo Enter MySQL root password when prompted:
set MYSQL="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
if not exist %MYSQL% (
    echo [WARNING] mysql.exe not found at default path.
    echo Please import db.sql manually. See README.txt
    goto start_server
)
%MYSQL% -u root -p --default-character-set=utf8mb4 < db.sql
if errorlevel 1 (
    echo [WARNING] Database import failed. Import db.sql manually.
)

:start_server
echo.
echo [3/3] Starting server...
echo Open http://localhost:3000 in your browser.
echo.
call npm start
