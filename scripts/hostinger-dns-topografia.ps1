# Configura DNS do subdomínio topografia.giovaniohira.com → Vercel
# Requer: token em $env:HOSTINGER_API_TOKEN ou ~/.hostinger.yaml

$ErrorActionPreference = "Stop"
$Hostinger = "$env:LOCALAPPDATA\hostinger-cli\hostinger.exe"
$Domain = "giovaniohira.com"
$VercelIp = "76.76.21.21"

if (-not (Test-Path $Hostinger)) {
    Write-Error "CLI não encontrado em $Hostinger. Reinstale via release do hostinger/api-cli."
}

if (-not $env:HOSTINGER_API_TOKEN -and -not (Test-Path "$env:USERPROFILE\.hostinger.yaml")) {
    Write-Error @"
Token não configurado. Gere em https://hpanel.hostinger.com/profile/api e depois:

  `$env:HOSTINGER_API_TOKEN = 'seu-token'
  .\scripts\hostinger-dns-topografia.ps1

Ou crie $env:USERPROFILE\.hostinger.yaml com:
  api_token: seu-token
"@
}

Write-Host "Registros DNS atuais de $Domain`n"
& $Hostinger dns records list $Domain --format json

$zone = @{
    zone = @(
        @{
            name    = "topografia"
            type    = "A"
            ttl     = 14400
            records = @(@{ content = $VercelIp })
        }
    )
    overwrite = $false
} | ConvertTo-Json -Depth 5 -Compress

Write-Host "`nAdicionando A topografia -> $VercelIp (merge, sem apagar registros existentes)`n"
& $Hostinger dns records update $Domain --overwrite false --zone $zone

Write-Host "`nRegistros após atualização:`n"
& $Hostinger dns records list $Domain --format table
