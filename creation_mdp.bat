@echo off
chcp 65001 >nul
cls
setlocal enabledelayedexpansion

:: Définition des ensembles de caractères
set "minuscules=abcdefghijklmnopqrstuvwxyz"
set "majuscules=ABCDEFGHIJKLMNOPQRSTUVWXYZ"
set "chiffres=0123456789"
set "speciaux=!@#$%^&*()"

:: Initialisation du mot de passe
set "mdp="

:: Ajout de 2 lettres minuscules
for /L %%i in (1,1,2) do (
    set /A rand=!random! %% 26
    for %%j in (!rand!) do set "mdp=!mdp!!minuscules:~%%j,1!"
)

:: Ajout de 2 lettres majuscules
for /L %%i in (1,1,2) do (
    set /A rand=!random! %% 26
    for %%j in (!rand!) do set "mdp=!mdp!!majuscules:~%%j,1!"
)

:: Ajout de 2 chiffres
for /L %%i in (1,1,2) do (
    set /A rand=!random! %% 10
    for %%j in (!rand!) do set "mdp=!mdp!!chiffres:~%%j,1!"
)

:: Ajout de 2 caractères spéciaux
for /L %%i in (1,1,2) do (
    set /A rand=!random! %% 10
    for %%j in (!rand!) do set "mdp=!mdp!!speciaux:~%%j,1!"
)

:: Ajout de caractères aléatoires pour atteindre 15
set "all=%minuscules%%majuscules%%chiffres%%speciaux%"
for /L %%i in (1,1,15) do (
    set /A rand=!random! %% 72
    for %%j in (!rand!) do set "mdp=!mdp!!all:~%%j,1!"
)

:: Affichage du mot de passe
powershell -Command "Set-Clipboard -Value '%mdp%'"
timeout /t 0 >nul



exit

