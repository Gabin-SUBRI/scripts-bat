@echo off
title Sauvegarde PC Grand-Pere

echo.
echo ============================================================
echo    SCRIPT DE SAUVEGARDE AUTOMATIQUE WINDOWS 7
echo ============================================================
echo.

:: Detection du lecteur du script
set "SCRIPT_DRIVE=%~d0"
echo Script lance depuis: %SCRIPT_DRIVE%
echo.

:: Creation du dossier de sauvegarde simple
set "BACKUP_FOLDER=%SCRIPT_DRIVE%\Sauvegarde_PC_%date:~6,4%_%date:~3,2%_%date:~0,2%"
mkdir "%BACKUP_FOLDER%" 2>nul

echo Dossier de sauvegarde: %BACKUP_FOLDER%
echo.

:: Detection de l'utilisateur
set "USER_NAME=%USERNAME%"
set "USER_PATH=C:\Users\%USER_NAME%"

echo Utilisateur: %USER_NAME%
echo.

echo Demarrage de la sauvegarde...
echo.

:: SAUVEGARDE DOCUMENTS
echo [1/8] Sauvegarde Documents...
if exist "%USER_PATH%\Documents" (
    echo Copie en cours...
    xcopy "%USER_PATH%\Documents" "%BACKUP_FOLDER%\Documents\" /E /I /H /Y
    echo OK - Documents sauvegardes
) else (
    echo SKIP - Dossier Documents introuvable
)
echo.

:: SAUVEGARDE BUREAU
echo [2/8] Sauvegarde Bureau...
if exist "%USER_PATH%\Desktop" (
    echo Copie en cours...
    xcopy "%USER_PATH%\Desktop" "%BACKUP_FOLDER%\Bureau\" /E /I /H /Y
    echo OK - Bureau sauvegarde
) else (
    echo SKIP - Dossier Bureau introuvable
)
echo.

:: SAUVEGARDE IMAGES
echo [3/8] Sauvegarde Images...
if exist "%USER_PATH%\Pictures" (
    echo Copie en cours...
    xcopy "%USER_PATH%\Pictures" "%BACKUP_FOLDER%\Images\" /E /I /H /Y
    echo OK - Images sauvegardees
) else (
    echo SKIP - Dossier Images introuvable
)

:: Mes Images (Windows 7)
if exist "%USER_PATH%\My Pictures" (
    echo Copie Mes Images...
    xcopy "%USER_PATH%\My Pictures" "%BACKUP_FOLDER%\Mes_Images\" /E /I /H /Y
    echo OK - Mes Images sauvegardees
)
echo.

:: SAUVEGARDE MUSIQUE
echo [4/8] Sauvegarde Musique...
if exist "%USER_PATH%\Music" (
    echo Copie en cours...
    xcopy "%USER_PATH%\Music" "%BACKUP_FOLDER%\Musique\" /E /I /H /Y
    echo OK - Musique sauvegardee
) else (
    echo SKIP - Dossier Musique introuvable
)

:: Ma Musique (Windows 7)
if exist "%USER_PATH%\My Music" (
    echo Copie Ma Musique...
    xcopy "%USER_PATH%\My Music" "%BACKUP_FOLDER%\Ma_Musique\" /E /I /H /Y
    echo OK - Ma Musique sauvegardee
)
echo.

:: SAUVEGARDE VIDEOS
echo [5/8] Sauvegarde Videos...
if exist "%USER_PATH%\Videos" (
    echo Copie en cours...
    xcopy "%USER_PATH%\Videos" "%BACKUP_FOLDER%\Videos\" /E /I /H /Y
    echo OK - Videos sauvegardees
) else (
    echo SKIP - Dossier Videos introuvable
)

:: Mes Videos (Windows 7)
if exist "%USER_PATH%\My Videos" (
    echo Copie Mes Videos...
    xcopy "%USER_PATH%\My Videos" "%BACKUP_FOLDER%\Mes_Videos\" /E /I /H /Y
    echo OK - Mes Videos sauvegardees
)
echo.

:: SAUVEGARDE TELECHARGEMENTS
echo [6/8] Sauvegarde Telechargements...
if exist "%USER_PATH%\Downloads" (
    echo Copie en cours...
    xcopy "%USER_PATH%\Downloads" "%BACKUP_FOLDER%\Telechargements\" /E /I /H /Y
    echo OK - Telechargements sauvegardes
) else (
    echo SKIP - Dossier Telechargements introuvable
)
echo.

:: SAUVEGARDE FAVORIS
echo [7/8] Sauvegarde Favoris Internet...
if exist "%USER_PATH%\Favorites" (
    echo Copie en cours...
    xcopy "%USER_PATH%\Favorites" "%BACKUP_FOLDER%\Favoris\" /E /I /H /Y
    echo OK - Favoris sauvegardes
) else (
    echo SKIP - Favoris introuvables
)
echo.

:: SAUVEGARDE NAVIGATEURS
echo [8/8] Sauvegarde Navigateurs...

:: Firefox
if exist "%USER_PATH%\AppData\Roaming\Mozilla\Firefox" (
    echo Copie Firefox...
    xcopy "%USER_PATH%\AppData\Roaming\Mozilla\Firefox" "%BACKUP_FOLDER%\Firefox\" /E /I /H /Y
    echo OK - Firefox sauvegarde
) else (
    echo SKIP - Firefox non trouve
)

:: Chrome
if exist "%USER_PATH%\AppData\Local\Google\Chrome\User Data" (
    echo Copie Chrome...
    xcopy "%USER_PATH%\AppData\Local\Google\Chrome\User Data" "%BACKUP_FOLDER%\Chrome\" /E /I /H /Y
    echo OK - Chrome sauvegarde
) else (
    echo SKIP - Chrome non trouve
)
echo.

:: CREATION DU RAPPORT
echo Creation du rapport...
set "REPORT_FILE=%BACKUP_FOLDER%\RAPPORT.txt"

echo RAPPORT DE SAUVEGARDE > "%REPORT_FILE%"
echo ===================== >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"
echo Date: %date% %time% >> "%REPORT_FILE%"
echo Ordinateur: %COMPUTERNAME% >> "%REPORT_FILE%"
echo Utilisateur: %USER_NAME% >> "%REPORT_FILE%"
echo Sauvegarde sur: %SCRIPT_DRIVE% >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"
echo DOSSIERS SAUVEGARDES: >> "%REPORT_FILE%"
echo - Documents >> "%REPORT_FILE%"
echo - Bureau >> "%REPORT_FILE%"
echo - Images/Photos >> "%REPORT_FILE%"
echo - Musique >> "%REPORT_FILE%"
echo - Videos >> "%REPORT_FILE%"
echo - Telechargements >> "%REPORT_FILE%"
echo - Favoris Internet >> "%REPORT_FILE%"
echo - Firefox >> "%REPORT_FILE%"
echo - Chrome >> "%REPORT_FILE%"
echo. >> "%REPORT_FILE%"
echo IMPORTANT: Verifiez le contenu avant de reinitialiser ! >> "%REPORT_FILE%"

echo.
echo ============================================================
echo SAUVEGARDE TERMINEE !
echo ============================================================
echo.
echo Tous vos fichiers sont dans:
echo %BACKUP_FOLDER%
echo.
echo Un rapport a ete cree: RAPPORT.txt
echo.
echo CONSEIL: Ouvrez le dossier pour verifier que tout est la
echo avant de reinitialiser le PC.
echo.
echo Le dossier va s'ouvrir automatiquement...

:: Ouvrir le dossier
start "" "%BACKUP_FOLDER%"

echo.
echo Appuyez sur une touche pour fermer...
pause >nul