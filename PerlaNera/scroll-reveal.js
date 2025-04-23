/**
 * Perla Nera - Scroll Reveal Effects
 * Aprile 2025
 * 
 * Implementazione elegante dell'Intersection Observer API
 * per animazioni di reveal al momento dello scroll
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configurazione dell'observer
    const revealOptions = {
        threshold: 0.15, // L'elemento diventa visibile quando il 15% è nel viewport
        rootMargin: '0px 0px -50px 0px' // Attiva leggermente prima che sia completamente visibile
    };
    
    // Selezioniamo tutti gli elementi con la classe 'reveal-element' o 'reveal-title'
    const elementsToReveal = document.querySelectorAll('.reveal-element, .reveal-title');
    
    // Callback per l'observer - applicata quando gli elementi entrano o escono dal viewport
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Quando l'elemento entra nel viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Opzionale: una volta rivelato, non serve più osservarlo (per performance)
                observer.unobserve(entry.target);
            } 
            // Se vogliamo nascondere nuovamente gli elementi quando escono dal viewport
            // else {
            //     entry.target.classList.remove('revealed');
            // }
        });
    };
    
    // Creazione dell'Intersection Observer
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    // Osserva ogni elemento
    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });
    
    /**
     * Funzione helper per inizializzare le animazioni su elementi dinamici
     * Utile se vengono aggiunti nuovi elementi al DOM dopo il caricamento
     */
    window.initializeRevealForElement = function(element) {
        // Aggiungere la classe appropriata
        if (!element.classList.contains('reveal-element') && 
            !element.classList.contains('reveal-title')) {
            element.classList.add('reveal-element');
        }
        
        // Avviare l'osservazione
        revealObserver.observe(element);
    };
    
    /**
     * Applicazione di classi di reveal agli elementi della pagina
     * Aggiungiamo le classi 'reveal-element' ai componenti da animare
     */
    
    // Titoli delle sezioni
    document.querySelectorAll('.section-title').forEach(title => {
        if (!title.classList.contains('reveal-title')) {
            title.classList.add('reveal-title');
            revealObserver.observe(title);
        }
    });
    
    // Box servizi
    document.querySelectorAll('.service-box').forEach((box, index) => {
        if (!box.classList.contains('reveal-element')) {
            box.classList.add('reveal-element');
            // Aggiungiamo un ritardo progressivo
            box.classList.add(`reveal-delay-${index % 4 + 1}`);
            revealObserver.observe(box);
        }
    });
    
    // Testimonianze
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        if (!card.classList.contains('reveal-element')) {
            card.classList.add('reveal-element');
            // Aggiungiamo un ritardo progressivo
            card.classList.add(`reveal-delay-${index % 4 + 1}`);
            revealObserver.observe(card);
        }
    });
    
    // Divider dorati (animazione sottile)
    document.querySelectorAll('.gold-divider').forEach(divider => {
        if (!divider.classList.contains('reveal-element')) {
            divider.classList.add('reveal-element');
            revealObserver.observe(divider);
        }
    });
    
    // CTA Sections (se presenti)
    document.querySelectorAll('.page-section .btn').forEach(button => {
        if (!button.parentElement.classList.contains('hero-content') && 
            !button.classList.contains('reveal-element')) {
            button.classList.add('reveal-element');
            button.classList.add('reveal-delay-2');
            revealObserver.observe(button);
        }
    });
});
