const scripts = [
  {
    nom: "Création de fichier BAT",
    type: "Générateur",
    fichier: "scripts/creation_bat.bat",
    description:
      "Demande un nom et crée un fichier batch prérempli pour commencer un script.",
    color: "#00ff9f",
    code: `@echo off
set /p filename="Entrez le nom du fichier (sans extension) : "
echo @echo off > "%filename%.bat"
code "%filename%.bat"`,
  },
  {
    nom: "Création de projet web",
    type: "Développement",
    fichier: "scripts/creation_dev.bat",
    description:
      "Génère un projet HTML/CSS/JS dans un dossier spécifique avec ouverture automatique dans VS Code.",
    color: "#ff6b6b",
    code: `@echo off
chcp 65001 >nul
set "basePath=C:\\Users\\gab74\\OneDrive\\Bureau\\dev"
set /p foldername="Entrez le nom du projet : "
set "projectPath=%basePath%\\%foldername%"

mkdir "%projectPath%"
cd /d "%projectPath%"

echo ^<html^>^<head^>^<title^>Nouveau Projet^</title^>^<link rel="stylesheet" href="styles.css"^>^</head^>^<body^>^<script src="script.js"^>^</script^>^</body^>^</html^> > "%projectPath%\\index.html"
echo /* Styles du projet */ > "%projectPath%\\styles.css"
echo // Script du projet > "%projectPath%\\script.js"

echo Projet "%foldername%" créé avec succès dans "%projectPath%" !

REM Ouvre le dossier dans Visual Studio Code
code "%projectPath%"

pause`,
  },
  {
    nom: "Générateur de mot de passe",
    type: "Sécurité",
    fichier: "scripts/creation_mdp.bat",
    description:
      "Crée un mot de passe aléatoire complexe et le copie dans le presse-papiers.",
    color: "#4ecdc4",
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

:: Ajout de caractères aléatoires pour atteindre 15
set "all=%minuscules%%majuscules%%chiffres%%speciaux%"
for /L %%i in (1,1,15) do (
    set /A rand=!random! %% 72
    for %%j in (!rand!) do set "mdp=!mdp!!all:~%%j,1!"
)

:: Copie dans le presse-papiers
powershell -Command "Set-Clipboard -Value '%mdp%'"
echo Mot de passe généré et copié !
pause`,
  },
  {
    nom: "Création de QR Code",
    type: "Utilitaire",
    fichier: "scripts/creation_qr_code.bat",
    description:
      "Génère un QR code d'après un mot de passe saisi, et l'ouvre dans le navigateur.",
    color: "#ffd93d",
    code: `@echo off 
chcp 65001 >nul 
setlocal 
set /p "mdp=Quel est le mot de passe ?" 
:: Générer l'URL du QR Code avec un service en ligne
powershell -Command "$url='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=%mdp%'; Start-Process $url" 
echo QR Code généré et affiché dans le navigateur. 
pause`,
  },
  {
    nom: "Nettoyage de fichiers temporaires",
    type: "Maintenance",
    fichier: "scripts/nettoyage_temp.bat",
    description:
      "Supprime les fichiers temporaires de Windows pour libérer de l'espace disque.",
    color: "#ff9f43",
    code: `@echo off
chcp 65001 >nul
cls
echo Nettoyage en cours...
del /s /q C:\\Windows\\Temp\\* >nul 2>nul
del /s /q C:\\Users\\%username%\\AppData\\Local\\Temp\\* >nul 2>nul
echo Nettoyage terminé !
pause`,
  },
  {
    nom: "Test de vitesse Internet",
    type: "Réseau",
    fichier: "scripts/speedtest.bat",
    description:
      "Lance Ookla Speedtest pour tester la vitesse de votre connexion Internet.",
    color: "#6c5ce7",
    code: `@echo off
chcp 65001 >nul
cls
echo Lancement de Speedtest...
"C:\\Users\\gab74\\Downloads\\ookla-speedtest-1.2.0-win64\\speedtest.exe"
pause`,
  },
  {
    nom: "Sauvegarde complète PC",
    type: "Sauvegarde",
    fichier: "scripts/sauvegarde_pc.bat",
    description:
      "Script automatique de sauvegarde des dossiers utilisateur (Documents, Bureau, Images, Musique, Vidéos, Favoris) sur disque externe. Idéal avant réinitialisation, vente ou don d'un PC.",
    color: "#ff6b6b",
    code: `@echo off
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
set "BACKUP_FOLDER=%SCRIPT_DRIVE%\\Sauvegarde_PC_%date:~6,4%_%date:~3,2%_%date:~0,2%"
mkdir "%BACKUP_FOLDER%" 2>nul

echo Dossier de sauvegarde: %BACKUP_FOLDER%
echo.

:: Detection de l'utilisateur
set "USER_NAME=%USERNAME%"
set "USER_PATH=C:\\Users\\%USER_NAME%"

echo Utilisateur: %USER_NAME%
echo.

echo Demarrage de la sauvegarde...
echo.

:: SAUVEGARDE DOCUMENTS
echo [1/8] Sauvegarde Documents...
if exist "%USER_PATH%\\Documents" (
    echo Copie en cours...
    xcopy "%USER_PATH%\\Documents" "%BACKUP_FOLDER%\\Documents\\" /E /I /H /Y
    echo OK - Documents sauvegardes
) else (
    echo SKIP - Dossier Documents introuvable
)
echo.

:: SAUVEGARDE BUREAU
echo [2/8] Sauvegarde Bureau...
if exist "%USER_PATH%\\Desktop" (
    echo Copie en cours...
    xcopy "%USER_PATH%\\Desktop" "%BACKUP_FOLDER%\\Bureau\\" /E /I /H /Y
    echo OK - Bureau sauvegarde
) else (
    echo SKIP - Dossier Bureau introuvable
)
echo.

:: SAUVEGARDE IMAGES
echo [3/8] Sauvegarde Images...
if exist "%USER_PATH%\\Pictures" (
    echo Copie en cours...
    xcopy "%USER_PATH%\\Pictures" "%BACKUP_FOLDER%\\Images\\" /E /I /H /Y
    echo OK - Images sauvegardees
) else (
    echo SKIP - Dossier Images introuvable
)

:: Mes Images (Windows 7)
if exist "%USER_PATH%\\My Pictures" (
    echo Copie Mes Images...
    xcopy "%USER_PATH%\\My Pictures" "%BACKUP_FOLDER%\\Mes_Images\\" /E /I /H /Y
    echo OK - Mes Images sauvegardees
)
echo.

:: SAUVEGARDE MUSIQUE
echo [4/8] Sauvegarde Musique...
if exist "%USER_PATH%\\Music" (
    echo Copie en cours...
    xcopy "%USER_PATH%\\Music" "%BACKUP_FOLDER%\\Musique\\" /E /I /H /Y
    echo OK - Musique sauvegardee
) else (
    echo SKIP - Dossier Musique introuvable
)

:: Ma Musique (Windows 7)
if exist "%USER_PATH%\\My Music" (
    echo Copie Ma Musique...
    xcopy "%USER_PATH%\\My Music" "%BACKUP_FOLDER%\\Ma_Musique\\" /E /I /H /Y
    echo OK - Ma Musique sauvegardee
)
echo.

:: SAUVEGARDE VIDEOS
echo [5/8] Sauvegarde Videos...
if exist "%USER_PATH%\\Videos" (
    echo Copie en cours...
    xcopy "%USER_PATH%\\Videos" "%BACKUP_FOLDER%\\Videos\\" /E /I /H /Y
    echo OK - Videos sauvegardees
) else (
    echo SKIP - Dossier Videos introuvable
)

:: Mes Videos (Windows 7)
if exist "%USER_PATH%\\My Videos" (
    echo Copie Mes Videos...
    xcopy "%USER_PATH%\\My Videos" "%BACKUP_FOLDER%\\Mes_Videos\\" /E /I /H /Y
    echo OK - Mes Videos sauvegardees
)
echo.

:: SAUVEGARDE TELECHARGEMENTS
echo [6/8] Sauvegarde Telechargements...
if exist "%USER_PATH%\\Downloads" (
    echo Copie en cours...
    xcopy "%USER_PATH%\\Downloads" "%BACKUP_FOLDER%\\Telechargements\\" /E /I /H /Y
    echo OK - Telechargements sauvegardes
) else (
    echo SKIP - Dossier Telechargements introuvable
)
echo.

:: SAUVEGARDE FAVORIS
echo [7/8] Sauvegarde Favoris Internet...
if exist "%USER_PATH%\\Favorites" (
    echo Copie en cours...
    xcopy "%USER_PATH%\\Favorites" "%BACKUP_FOLDER%\\Favoris\\" /E /I /H /Y
    echo OK - Favoris sauvegardes
) else (
    echo SKIP - Favoris introuvables
)
echo.

:: SAUVEGARDE NAVIGATEURS
echo [8/8] Sauvegarde Navigateurs...

:: Firefox
if exist "%USER_PATH%\\AppData\\Roaming\\Mozilla\\Firefox" (
    echo Copie Firefox...
    xcopy "%USER_PATH%\\AppData\\Roaming\\Mozilla\\Firefox" "%BACKUP_FOLDER%\\Firefox\\" /E /I /H /Y
    echo OK - Firefox sauvegarde
) else (
    echo SKIP - Firefox non trouve
)

:: Chrome
if exist "%USER_PATH%\\AppData\\Local\\Google\\Chrome\\User Data" (
    echo Copie Chrome...
    xcopy "%USER_PATH%\\AppData\\Local\\Google\\Chrome\\User Data" "%BACKUP_FOLDER%\\Chrome\\" /E /I /H /Y
    echo OK - Chrome sauvegarde
) else (
    echo SKIP - Chrome non trouve
)
echo.

:: CREATION DU RAPPORT
echo Creation du rapport...
set "REPORT_FILE=%BACKUP_FOLDER%\\RAPPORT.txt"

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
pause >nul`,
  },
];

const container = document.getElementById("scripts-container");

scripts.forEach((script, index) => {
  const card = document.createElement("div");
  card.className = "script-card fade-in";
  card.style.animationDelay = `${index * 0.1}s`;

  const codeId = `code-${script.nom.replace(/\s+/g, "-").toLowerCase()}`;

  card.innerHTML = `
                <div class="script-header">
                    <h3 class="script-title">${script.nom}</h3>
                    <span class="script-type" style="background: linear-gradient(135deg, ${script.color}, ${script.color}88)">${script.type}</span>
                </div>
                <p class="script-description">${script.description}</p>
                <div class="script-actions">
                    <a href="${script.fichier}" download class="btn btn-primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Télécharger
                    </a>
                    <button class="btn btn-secondary" onclick="toggleCode('${codeId}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <polyline points="16 18 22 12 16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="8 6 2 12 8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Voir le code
                    </button>
                </div>
                <div id="${codeId}" class="code-block">
                    <div class="code-header">
                        <span class="code-title">${script.fichier}</span>
                        <button class="copy-btn" onclick="copyCode('${codeId}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                                <path d="m5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </button>
                    </div>
                    <pre class="code-content"><code class="language-batch">${script.code}</code></pre>
                </div>
            `;

  container.appendChild(card);
});

// Theme management
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Add animation class to theme toggle
  const toggleBtn = document.querySelector(".theme-toggle");
  toggleBtn.style.animation = "spin 0.6s ease-in-out";
  setTimeout(() => {
    toggleBtn.style.animation = "";
  }, 600);
}

// Initialize theme from localStorage or system preference
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPreference = window.matchMedia("(prefers-color-scheme: light)")
    .matches
    ? "light"
    : "dark";
  const theme = savedTheme || systemPreference;

  document.documentElement.setAttribute("data-theme", theme);
}

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      const theme = e.matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
    }
  });

// Initialize theme on page load
initTheme();

// Functions
function toggleCode(id) {
  const block = document.getElementById(id);
  const isVisible = block.style.display === "block";

  if (isVisible) {
    block.style.display = "none";
  } else {
    block.style.display = "block";
    // Re-highlight the code
    Prism.highlightAllUnder(block);
  }
}

function copyCode(id) {
  const codeBlock = document.querySelector(`#${id} .code-content code`);
  const text = codeBlock.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(`#${id} .copy-btn`);
    const originalContent = btn.innerHTML;
    btn.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    setTimeout(() => (btn.innerHTML = originalContent), 2000);
  });
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Highlight code after page load
document.addEventListener("DOMContentLoaded", () => {
  Prism.highlightAll();
});
