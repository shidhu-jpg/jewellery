# Builds android\build\SethiJewellers.apk straight from the Android SDK tools (no Gradle).
# Bundles the storefront pages, css, js and images plus android\www\app.html (the app home screen).
# Usage:  powershell -ExecutionPolicy Bypass -File android\build.ps1
$ErrorActionPreference = "Stop"

$here = $PSScriptRoot
$site = Split-Path $here -Parent
$sdk = if ($env:ANDROID_HOME) { $env:ANDROID_HOME } else { "$env:LOCALAPPDATA\Android\Sdk" }
$bt = Get-ChildItem "$sdk\build-tools" | Sort-Object { [version]$_.Name } | Select-Object -Last 1 -ExpandProperty FullName
$platform = Get-ChildItem "$sdk\platforms" | Sort-Object { [int]($_.Name -replace '\D', '') } | Select-Object -Last 1 -ExpandProperty FullName
$androidJar = "$platform\android.jar"
$out = "$here\build"

# Args go in as an array: splatting $args would mangle flags like -classpath
function Run([string]$exe, [string[]]$argv) {
    & $exe @argv
    if ($LASTEXITCODE) { throw "$(Split-Path $exe -Leaf) failed ($LASTEXITCODE)" }
}

Write-Host "build-tools: $bt`nplatform:    $platform"
if (Test-Path $out) { Remove-Item -Recurse -Force $out }
New-Item -ItemType Directory -Force "$out\assets\www", "$out\classes", "$out\dex" | Out-Null

# 1. Web assets
Copy-Item "$site\*.html", "$here\www\*" "$out\assets\www" -Recurse
Copy-Item "$site\css", "$site\js", "$site\images" "$out\assets\www" -Recurse

# 2. Resources + manifest
Run "$bt\aapt2.exe" @("compile", "--dir", "$here\res", "-o", "$out\res.zip")
Run "$bt\aapt2.exe" @("link", "-I", $androidJar, "--manifest", "$here\AndroidManifest.xml",
    "-o", "$out\unsigned.apk", "$out\res.zip", "--auto-add-overlay")

# 3. Java -> dex
$src = @(Get-ChildItem -Recurse "$here\src" -Filter *.java | ForEach-Object FullName)
Run javac (@("--release", "11", "-classpath", $androidJar, "-d", "$out\classes", "-nowarn") + $src)
$classFiles = @(Get-ChildItem -Recurse "$out\classes" -Filter *.class | ForEach-Object FullName)
Run "$bt\d8.bat" (@("--release", "--min-api", "24", "--lib", $androidJar, "--output", "$out\dex") + $classFiles)
# Assets are added with jar, not aapt2 -A, which writes backslash paths on Windows
Run jar @("--update", "--no-manifest", "--file", "$out\unsigned.apk", "-C", "$out\dex", "classes.dex", "-C", $out, "assets")

# 4. Align + sign (debug keystore, created if missing)
$ks = "$env:USERPROFILE\.android\debug.keystore"
if (-not (Test-Path $ks)) {
    New-Item -ItemType Directory -Force (Split-Path $ks) | Out-Null
    Run keytool @("-genkeypair", "-keystore", $ks, "-storepass", "android", "-keypass", "android", "-alias", "androiddebugkey",
        "-keyalg", "RSA", "-keysize", "2048", "-validity", "10000", "-dname", "CN=Android Debug,O=Android,C=US")
}
Run "$bt\zipalign.exe" @("-p", "-f", "4", "$out\unsigned.apk", "$out\aligned.apk")
Run "$bt\apksigner.bat" @("sign", "--ks", $ks, "--ks-pass", "pass:android", "--key-pass", "pass:android",
    "--ks-key-alias", "androiddebugkey", "--out", "$out\SethiJewellers.apk", "$out\aligned.apk")
Run "$bt\apksigner.bat" @("verify", "$out\SethiJewellers.apk")

Write-Host "`nAPK ready: $out\SethiJewellers.apk"
