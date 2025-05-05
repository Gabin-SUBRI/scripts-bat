@echo off 
chcp 65001 >nul 
setlocal 
set /p "mdp=quel est le mot de passe ?" 
:: Générer l'URL du QR Code avec un service en ligne (api.qrserver.com) 
powershell -Command "$url='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=%mdp%'; Start-Process $url" 
echo QR Code généré et affiché dans le navigateur. 
pause