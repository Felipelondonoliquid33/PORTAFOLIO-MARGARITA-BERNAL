# Script para preparar el proyecto para transferir a otro PC
# Este script crea una copia del proyecto SIN node_modules y .next

Write-Host "📦 Preparando proyecto para transferir..." -ForegroundColor Cyan
Write-Host ""

# Nombre de la carpeta de destino
$destino = "ANTOHER PORTAFOLIO IDEA revamped - PARA TRANSFERIR"

# Si ya existe, eliminarla
if (Test-Path $destino) {
    Write-Host "⚠️  Eliminando carpeta anterior..." -ForegroundColor Yellow
    Remove-Item $destino -Recurse -Force
}

Write-Host "📁 Creando carpeta de destino..." -ForegroundColor Green
New-Item -ItemType Directory -Path $destino | Out-Null

Write-Host "📋 Copiando archivos (esto puede tardar unos minutos)..." -ForegroundColor Green

# Copiar todo EXCEPTO node_modules y .next
Get-ChildItem -Path "." -Exclude @('node_modules', '.next', $destino, '.git') | ForEach-Object {
    if ($_.PSIsContainer) {
        Write-Host "  📁 Copiando carpeta: $($_.Name)" -ForegroundColor Gray
        Copy-Item $_.FullName -Destination $destino -Recurse -Force
    } else {
        Write-Host "  📄 Copiando archivo: $($_.Name)" -ForegroundColor Gray
        Copy-Item $_.FullName -Destination $destino -Force
    }
}

Write-Host ""
Write-Host "✅ ¡Proyecto preparado para transferir!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Carpeta creada: $destino" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Yellow
Write-Host "   1. Copia la carpeta '$destino' a tu USB/Disco/Cloud" -ForegroundColor White
Write-Host "   2. En el nuevo PC, copia la carpeta completa" -ForegroundColor White
Write-Host "   3. Abre la carpeta y ejecuta: npm install" -ForegroundColor White
Write-Host "   4. Luego ejecuta: npm run dev" -ForegroundColor White
Write-Host ""

# Calcular tamaño
$tamaño = (Get-ChildItem $destino -Recurse -ErrorAction SilentlyContinue | 
    Measure-Object -Property Length -Sum).Sum / 1MB

Write-Host "💾 Tamaño total: $([math]::Round($tamaño, 2)) MB" -ForegroundColor Cyan
Write-Host ""

