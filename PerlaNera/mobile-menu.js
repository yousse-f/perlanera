/**
 * Perla Nera - Gestione Menu Mobile Ottimizzato
 * Aprile 2025
 * 
 * Questo script gestisce il comportamento del menu hamburger su dispositivi mobili,
 * migliorando l'interazione dell'utente con:
 * - Animazione dell'icona hamburger durante apertura/chiusura
 * - Blocco dello scroll quando il menu è aperto
 * - Chiusura automatica quando si seleziona un link o si clicca fuori
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleziona elementi necessari
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle) {
        // Miglioramento toggle menu con classe active sull'icona hamburger
        menuToggle.addEventListener('click', function() {
            // Toggle classe active sull'icona hamburger
            menuToggle.classList.toggle('active');
            
            // Toggle classe active su menu
            navLinks.classList.toggle('active');
            
            // Previene lo scrolling quando il menu è aperto
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Chiudi menu quando si clicca un link
        const menuLinks = document.querySelectorAll('.nav-links a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Chiudi menu quando si clicca fuori
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});
