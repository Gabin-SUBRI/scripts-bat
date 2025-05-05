@echo off
set /p filename="Entrez le nom du fichier (sans extension) : "
echo @echo off > "%filename%.bat"
code "%filename%.bat"
