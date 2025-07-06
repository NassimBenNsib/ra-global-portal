# Strapi Fix Script
Write-Host "Cleaning Strapi cache and build files..." -ForegroundColor Green

$dirsToRemove = @(".strapi", "build", "node_modules\.cache")

foreach ($dir in $dirsToRemove) {
    if (Test-Path $dir) {
        Remove-Item -Recurse -Force $dir -ErrorAction SilentlyContinue
        Write-Host "Removed $dir directory" -ForegroundColor Yellow
    }
}

Write-Host "Cleaning completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Running npm install to ensure dependencies are fresh..." -ForegroundColor Blue
npm install

Write-Host ""
Write-Host "Fix completed! Now you can run: npm run develop" -ForegroundColor Green
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
