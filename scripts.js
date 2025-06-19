const scripts = [
  {
    nom: "Création de fichier BAT",
    fichier: "scripts/creation_bat.bat",
    description:
      "Demande un nom et crée un fichier batch prérempli pour commencer un script.",
    code: `@echo off
set /p filename="Entrez le nom du fichier (sans extension) : "
echo @echo off > "%filename%.bat"
code "%filename%.bat"`,
  },
  {
    nom: "Création de projet web",
    fichier: "scripts/creation_dev.bat",
    description:
      "Génère un projet HTML/CSS/JS dans un dossier spécifique avec ouverture automatique dans VS Code.",
    code: `@echo off
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
`,
  },
  {
    nom: "Générateur de mot de passe",
    fichier: "scripts/creation_mdp.bat",
    description:
      "Crée un mot de passe aléatoire complexe et le copie dans le presse-papiers.",
    code: `@echo off
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

`,
  },
  {
    nom: "Création de QR Code",
    fichier: "scripts/creation_qr_code.bat",
    description:
      "Génère un QR code d’après un mot de passe saisi, et l’ouvre dans le navigateur.",
    code: `@echo off 
chcp 65001 >nul 
setlocal 
set /p "mdp=quel est le mot de passe ?" 
:: Générer l'URL du QR Code avec un service en ligne (api.qrserver.com) 
powershell -Command "$url='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=%mdp%'; Start-Process $url" 
echo QR Code généré et affiché dans le navigateur. 
pause`,
  },
  {
    nom: "Nettoyage de fichiers temporaires",
    fichier: "scripts/nettoyage_temp.bat",
    description:
      "Supprime les fichiers temporaires de Windows pour libérer de l’espace disque.",
    code: `@echo off
chcp 65001 >nul
cls
echo Nettoyage en cours...
del /s /q C:\Windows\Temp\* >nul 2>nul
del /s /q C:\Users\%username%\AppData\Local\Temp\* >nul 2>nul
echo Nettoyage terminé !
pause
`,
  },
  {
    nom: "Test de vitesse Internet",
    fichier: "scripts/speedtest.bat",
    description:
      "Lance Ookla Speedtest pour tester la vitesse de ta connexion Internet.",
    code: `@echo off
chcp 65001 >nul
cls
echo Lancement de Speedtest...
"C:\Users\gab74\Downloads\ookla-speedtest-1.2.0-win64\speedtest.exe"
pause
`,
  },
];

const container = document.getElementById("script-list");

scripts.forEach((script) => {
  const card = document.createElement("div");
  card.className = "script-card";

  const codeId = `code-${script.nom.replace(/\s+/g, "-")}`;

  card.innerHTML = `
    <h2>
        ${script.nom}
        <button class="toggle-code" onclick="toggleCode('${codeId}')">Voir le code</button>
    </h2>
    <p>${script.description}</p>
    <a href="${script.fichier}" download><button>Télécharger</button></a>
    <pre id="${codeId}" class="code-block language-batch"><code class="language-batch">${script.code}</code></pre>
`;

  container.appendChild(card);
});
Prism.highlightAll();

function toggleCode(id) {
  const block = document.getElementById(id);
  block.style.display = block.style.display === "block" ? "none" : "block";
}
