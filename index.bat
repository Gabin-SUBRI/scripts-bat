@echo off
chcp 65001 > nul
echo ----- LISTE DES SCRIPTS DISPONIBLES -----
echo 1. creation_bat.bat
echo 2. creation_dev.bat
echo 3. creation_mdp.bat
echo 4. creation_qrcode.bat
echo 5. Nettoyage_temp.bat
echo 6. speedtest.bat
echo 7. Quitter

choice /c 1234567 /m "Sélectionne un script à exécuter :"

if %errorlevel%==1 start "" "C:\Users\gab74\OneDrive\Bureau\script bat\creation_bat.bat"
if %errorlevel%==2 start "" "C:\Users\gab74\OneDrive\Bureau\script bat\creation_dev.bat"
if %errorlevel%==3 start "" "C:\Users\gab74\OneDrive\Bureau\script bat\creation_mdp.bat"
if %errorlevel%==4 start "" "C:\Users\gab74\OneDrive\Bureau\script bat\creation_qrcode.bat"
if %errorlevel%==5 start "" "C:\Users\gab74\OneDrive\Bureau\script bat\Nettoyage_temp.bat"
if %errorlevel%==6 start "" "C:\Users\gab74\OneDrive\Bureau\script bat\speedtest.bat"
if %errorlevel%==7 exit
