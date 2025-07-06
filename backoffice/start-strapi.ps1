# PowerShell script to start Strapi with special path handling
Write-Host "Starting Strapi with special path handling..." -ForegroundColor Green
Write-Host ""

# Set environment variables to handle special characters in paths
$env:CHOKIDAR_USEPOLLING = "true"
$env:CHOKIDAR_INTERVAL = "1000"
$env:NODE_OPTIONS = "--max-old-space-size=8192"

Write-Host "Environment variables set:" -ForegroundColor Yellow
Write-Host "CHOKIDAR_USEPOLLING = $env:CHOKIDAR_USEPOLLING" -ForegroundColor Cyan
Write-Host "CHOKIDAR_INTERVAL = $env:CHOKIDAR_INTERVAL" -ForegroundColor Cyan
Write-Host "NODE_OPTIONS = $env:NODE_OPTIONS" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Strapi development server..." -ForegroundColor Blue

try {
    npm run develop:safe
}
catch {
    Write-Host ""
    Write-Host "Error occurred. Trying alternative approach..." -ForegroundColor Yellow
    Write-Host ""
    
    # Try with different polling settings
    $env:CHOKIDAR_USEPOLLING = "false"
    npm run develop
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
