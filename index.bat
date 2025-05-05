@echo off
chcp 65001 > nul
echo ----- LISTE DES SCRIPTS DISPONIBLES -----
dir /b /a:-d "C:\Users\gab74\OneDrive\Bureau\script bat\*.bat" > liste_scripts.txt
type liste_scripts.txt
echo.
set /p choix="Tape le nom du script à exécuter : "
start "" "%choix%"
