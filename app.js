const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuButton = $('#menu-button');
const mobileNav = $('#mobile-nav');
const mobileClose = $('#mobile-close');

function setMenu(open) {
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  document.body.style.overflow = open ? 'hidden' : '';
}

menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
mobileClose.addEventListener('click', () => setMenu(false));
$$('a', mobileNav).forEach(link => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) setMenu(false);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

$$('.reveal').forEach(element => observer.observe(element));

const legal = {
  imprint: `
    <h2>Impressum</h2>
    <p><strong>Medieninhaber und Diensteanbieter</strong><br>
    Dr. Romana Wass, PhD und Dr. Clemens Wass, MBL, MBA<br>
    <span class="legal-placeholder">Vollständige geografische Anschrift vor Veröffentlichung ergänzen</span><br>
    Österreich</p>
    <p><strong>Kontakt</strong><br>
    romana@wass.at<br>clemens@wass.at</p>
    <p><strong>Offenlegung nach § 25 MedienG</strong><br>
    Blattlinie: Persönliche berufliche und wissenschaftliche Profile sowie Darstellung von Tätigkeitsfeldern, Erfahrungen, Publikationen und Projekten aus Medizin, Wissenschaft, Recht und Technologie.</p>
    <p>Berufsrechtliche Pflichtangaben und die Betreiberstruktur sind vor Veröffentlichung anhand der tatsächlichen Situation zu ergänzen und rechtlich zu prüfen.</p>`,
  privacy: `
    <h2>Datenschutzerklärung</h2>
    <p><strong>Verantwortliche</strong><br>
    Dr. Romana Wass, PhD und Dr. Clemens Wass, MBL, MBA<br>
    Kontakt: romana@wass.at und clemens@wass.at</p>
    <p><strong>Hosting</strong><br>
    Diese Website wird über GitHub Pages bereitgestellt. Beim Aufruf können technisch erforderliche Verbindungsdaten durch den Hostinganbieter verarbeitet werden, um die Website sicher und funktionsfähig bereitzustellen.</p>
    <p><strong>Keine Analyse- oder Werbedienste</strong><br>
    Diese Fassung verwendet keine Analyse-, Werbe- oder Trackingdienste und setzt keine nicht erforderlichen Cookies.</p>
    <p><strong>Kontaktaufnahme</strong><br>
    Bei einer Kontaktaufnahme per E-Mail werden die übermittelten Daten zur Bearbeitung der Anfrage verarbeitet. Bitte keine Gesundheitsdaten oder vertraulichen rechtlichen Informationen per unverschlüsselter E-Mail übermitteln.</p>
    <p><strong>Betroffenenrechte</strong><br>
    Betroffene Personen haben nach Maßgabe der DSGVO insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.</p>
    <p><strong>Stand</strong><br>Oktober 2026. Der Text ist vor Veröffentlichung an Hosting, Domain, technische Dienste und tatsächliche Verantwortlichkeiten anzupassen und rechtlich zu prüfen.</p>`,
  copyright: `
    <h2>Urheberrecht</h2>
    <p>Die Inhalte, Texte, Gestaltung und Grafiken dieser Website sind urheberrechtlich geschützt, soweit nicht anders gekennzeichnet.</p>
    <p>© 2026 Dr. Romana Wass, PhD und Dr. Clemens Wass, MBL, MBA. Alle Rechte vorbehalten.</p>
    <p>Rechte an zitierten Publikationstiteln, Marken, Logos und verlinkten Inhalten verbleiben bei den jeweiligen Rechteinhabern.</p>`
};

const dialog = $('#legal-dialog');
const legalContent = $('#legal-content');
$$('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    legalContent.innerHTML = legal[button.dataset.dialog];
    dialog.showModal();
  });
});
$('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
