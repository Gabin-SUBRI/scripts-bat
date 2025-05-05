@echo off
chcp 65001 >nul
cls
echo Nettoyage en cours...
del /s /q C:\Windows\Temp\* >nul 2>nul
del /s /q C:\Users\%username%\AppData\Local\Temp\* >nul 2>nul
echo Nettoyage terminé !
pause
