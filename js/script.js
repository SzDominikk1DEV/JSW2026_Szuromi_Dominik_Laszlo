"use strict";

const kategoriak = document.querySelectorAll('.kategoria');
const katBlokkок = document.querySelectorAll('.katblokk');

kategoriak.forEach(function(kat) {
    kat.addEventListener('click', function() {
        kategoriak.forEach(function(k) { k.classList.remove('aktiv'); });
        kat.classList.add('aktiv');

        const kivalasztott = kat.getAttribute('data-kategoria');

        katBlokkок.forEach(function(blokk) {
            if (kivalasztott === 'osszes') {
                blokk.style.display = '';
            } else {
                if (blokk.getAttribute('data-blokk') === kivalasztott) {
                    blokk.style.display = '';
                } else {
                    blokk.style.display = 'none';
                }
            }
        });
    });
});

const urlap = document.getElementById('szamolo-urlap');
const dialogOverlay = document.getElementById('dialog-overlay');
const eredmenyDialog = document.getElementById('eredmeny-dialog');
const eredmenySzoveg = document.getElementById('eredmeny-szoveg');
const bezarasGomb = document.getElementById('bezaras-gomb');

urlap.addEventListener('submit', function(e) {
    e.preventDefault();

    const hosszusagInput = document.getElementById('hosszusag');
    const szelessegInput = document.getElementById('szelesseg');
    const magassagInput = document.getElementById('magassag');

    const hosszusag = parseFloat(hosszusagInput.value);
    const szelesseg = parseFloat(szelessegInput.value);
    const magassag = parseFloat(magassagInput.value);

    if (
        hosszusagInput.value === '' ||
        szelessegInput.value === '' ||
        magassagInput.value === ''
    ) {
        alert('Minden mező kitöltése kötelező!');
        return;
    }

    if (isNaN(hosszusag) || isNaN(szelesseg) || isNaN(magassag)) {
        alert('Az adatok csak számok lehetnek!');
        return;
    }

    if (hosszusag <= 0 || szelesseg <= 0 || magassag <= 0) {
        alert('A számok nem lehetnek negatívak és nem lehetnek 0!');
        return;
    }

    const terfogat = hosszusag * szelesseg * magassag;

    eredmenySzoveg.innerHTML = 'Maximum ' + terfogat + 'cm<sup>3</sup> térkitöltőre lenne szükséged.';

    hosszusagInput.value = '';
    szelessegInput.value = '';
    magassagInput.value = '';

    dialogOverlay.classList.add('aktiv');
    eredmenyDialog.setAttribute('open', '');
});

bezarasGomb.addEventListener('click', function() {
    dialogOverlay.classList.remove('aktiv');
    eredmenyDialog.removeAttribute('open');
});

dialogOverlay.addEventListener('click', function(e) {
    if (e.target === dialogOverlay) {
        dialogOverlay.classList.remove('aktiv');
        eredmenyDialog.removeAttribute('open');
    }
});
