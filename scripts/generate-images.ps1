<#
PowerShell script to generate responsive image variants (JPG + WebP)
Requirements:
 - ImageMagick (magick) installed and in PATH
 - Optional: cwebp (if you prefer using cwebp)

What it does:
 - Looks for image files in ./images (png/jpg/jpeg)
 - Creates ./images/optimized directory (preserves original folder)
 - For each image, creates variants: 480, 800, 1200, 1600 (JPEG) and WebP
 - Forces a 16:9 crop (center) by using -resize '^' and -extent

Usage (PowerShell):
  cd c:\Users\gabriel\Desktop\Portafolio
  .\scripts\generate-images.ps1

NOTE: Verify ImageMagick is installed by running: magick -version
#>

Set-StrictMode -Version Latest

$root = Split-Path -Parent $MyInvocation.MyCommand.Definition
$imagesDir = Join-Path $root "..\images"
$optimizedDir = Join-Path $imagesDir "optimized"

# Create optimized folder
if (-not (Test-Path $optimizedDir)) {
    New-Item -ItemType Directory -Path $optimizedDir | Out-Null
}

# Extensions to process
$exts = @('*.png', '*.jpg', '*.jpeg', '*.PNG', '*.JPG', '*.JPEG')

# Sizes to generate (width x height) - 16:9
$sizes = @(
    @{w=480; h=270},
    @{w=800; h=450},
    @{w=1200; h=675},
    @{w=1600; h=900}
)

# Process files
foreach ($ext in $exts) {
    $files = Get-ChildItem -Path $imagesDir -Filter $ext -File -ErrorAction SilentlyContinue
    foreach ($file in $files) {
        # Skip optimized folder files
        if ($file.DirectoryName -eq $optimizedDir) { continue }

        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        $safeBase = $baseName -replace '\\s+', '-' -replace '[^A-Za-z0-9\-_.]',''

        foreach ($size in $sizes) {
            $w = $size.w
            $h = $size.h
            $jpgOut = Join-Path $optimizedDir ("{0}-{1}w.jpg" -f $safeBase, $w)
            $webpOut = Join-Path $optimizedDir ("{0}-{1}w.webp" -f $safeBase, $w)

            # Create JPG (center crop to 16:9 and strip metadata)
            $resizeArg = "${w}x${h}^"
            $extentArg = "${w}x${h}"
            Write-Host "Generating $jpgOut from $($file.Name) -> ${w}x${h}"
            magick `"$($file.FullName)`" -resize $resizeArg -gravity center -extent $extentArg -strip -interlace Plane -quality 80 `"$jpgOut`"

            # Create WebP using ImageMagick (if supported)
            Write-Host "Generating $webpOut (WebP)"
            magick `"$jpgOut`" -quality 78 `"$webpOut`" | Out-Null
        }

        # Also create a small thumbnail (320x180)
        $thumbJpg = Join-Path $optimizedDir ("{0}-320w.jpg" -f $safeBase)
        $thumbWebp = Join-Path $optimizedDir ("{0}-320w.webp" -f $safeBase)
        magick `"$($file.FullName)`" -resize '320x180^' -gravity center -extent 320x180 -strip -quality 75 `"$thumbJpg`"
        magick `"$thumbJpg`" -quality 72 `"$thumbWebp`" | Out-Null
    }
}

Write-Host "\nAll variants generated in: $optimizedDir"
Write-Host "Tip: update your <img> tags to use the new files with srcset/sizes or use <picture> for WebP + fallback." -ForegroundColor Yellow
