@echo off
echo Starting Strapi with special path handling...
echo.

REM Set environment variables to handle special characters in paths
set CHOKIDAR_USEPOLLING=true
set CHOKIDAR_INTERVAL=1000

REM Start Strapi with error handling
echo Starting Strapi development server...
npm run develop:safe

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error occurred. Trying alternative approach...
    echo.
    
    REM Try with different polling settings
    set CHOKIDAR_USEPOLLING=false
    npm run develop
)

pause


 
  