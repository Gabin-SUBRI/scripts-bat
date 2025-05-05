@echo off
chcp 65001 >nul
set "basePath=C:\Users\gab74\OneDrive\Bureau\dev"
set /p foldername="Entrez le nom du projet : "
set "projectPath=%basePath%\%foldername%"

mkdir "%projectPath%"
cd /d "%projectPath%"

echo ^<html^>^<head^>^<title^>Nouveau Projet^</title^>^<link rel="stylesheet" href="styles.css"^>^</head^>^<body^>^<script src="script.js"^>^</script^>^</body^>^</html^> > "%projectPath%\index.html"
echo /* Styles du projet */ > "%projectPath%\styles.css"
echo // Script du projet > "%projectPath%\script.js"

echo Projet "%foldername%" créé avec succès dans "%projectPath%" !

REM Ouvre le dossier dans Visual Studio Code
code "%projectPath%"

pause
