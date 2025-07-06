@echo off
echo Cleaning Strapi cache and build files...

if exist ".strapi" (
    rmdir /s /q ".strapi"
    echo Removed .strapi directory
)

if exist "build" (
    rmdir /s /q "build"
    echo Removed build directory
)

if exist "node_modules\\.cache" (
    rmdir /s /q "node_modules\\.cache"
    echo Removed node_modules cache
)

echo Cleaning completed!
echo.
echo Running npm install to ensure dependencies are fresh...
npm install

echo.
echo Now you can run: npm run develop
pause
