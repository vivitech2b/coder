// Ton alphabet est maintenant stocké sous forme de chaîne encodée (Base64 simple ici)
const _0x5a2 = "QToxLEI6MTUsQzoxOCxEOjIxLEU6MyxGOjIyLEc6NDcsSDoyMyxJOjgsSjoyNCxLOjM2LEw6NDIsTTo1MyxOOjU4LE86NjEsUDo2NyxROjc0LFI6NzksUzo4MSxUOjkyLFU6NSxWOjEyLFc6Njk2OSxYOjEwMixZOjEwNSxaOjEwOA==";

let alphabet = {};
let inverseAlphabet = {};

// Initialisation silencieuse de la logique de base
function init() {
    const raw = atob(_0x5a2).split(',');
    raw.forEach(pair => {
        const [l, c] = pair.split(':');
        alphabet[l] = c;
        inverseAlphabet[c] = l;
    });
}
init();

function lancerTraitement(mode) {
    const loader = document.getElementById('loader');
    const progress = document.getElementById('progress');
    document.getElementById('output').innerText = "_";
    loader.style.display = "block";
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.display = "none";
                exécuterCalcul(mode);
            }, 300);
        } else {
            width += 1.5;
            progress.style.width = width + "%";
        }
    }, 30);
}

function exécuterCalcul(mode) {
    const input = document.getElementById('input').value.toUpperCase().trim();
    if(!input) return;
    let result = "";
    if (mode === 'coder') {
        result = input.split('').map(char => (char === ' ' ? '/' : (alphabet[char] || char))).join('-');
        result = result.replace(/-?\/-?/g, '/');
    } else {
        result = input.split('/').map(m => m.split('-').map(c => inverseAlphabet[c] || c).join('')).join(' ');
    }
    document.getElementById('output').innerText = result;
}

function toggleLogin() {
    const zone = document.getElementById('login-zone');
    zone.style.display = zone.style.display === "none" ? "block" : "none";
}

function verifierMotDePasse() {
    const p1 = document.getElementById('pass1').value;
    const p2 = document.getElementById('pass2').value;
    const p3 = document.getElementById('pass3').value;
    
    // On utilise un calcul mathématique pour vérifier le code sans l'écrire en clair
    // (47 * 3 * 12) = 1692
    const check = parseInt(p1) * parseInt(p2) * parseInt(p3);
    const sum = parseInt(p1) + parseInt(p2) + parseInt(p3); // 47+3+12 = 62

    if (check === 1692 && sum === 62 && p2 === "3") {
        document.getElementById('lock-icon').innerText = "🔓";
        document.getElementById('secret-key-area').style.display = "block";
        const grid = document.getElementById('key-display');
        if (grid.innerHTML === "") {
            grid.innerHTML = Object.entries(alphabet).map(([l, c]) => `<div>${l}:${c}</div>`).join('');
        }
        alert("ACCÈS AUTORISÉ.");
    } else {
        alert("ACCÈS REFUSÉ.");
    }
}

function copier() {
    navigator.clipboard.writeText(document.getElementById('output').innerText);
    alert("COPIÉ.");
}