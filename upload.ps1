# SFTP Settings
$sftpHost = "ssh.smit.dk"
$port = "22"
$user = "smit.dk"
$file = "alison2.html"

Write-Host "Starting SFTP upload..."
Write-Host "When prompted for password, enter: poiwer234"

# Simple SFTP command
sftp -P $port "$user@$sftpHost" 