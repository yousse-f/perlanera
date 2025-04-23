/**
 * Perla Nera - Portfolio JavaScript
 * Script per gestire il filtro dinamico dei progetti nella pagina lavori.html
 * Aprile 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementi DOM
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const baContainers = document.querySelectorAll('.ba-container');
    
    // 1. SISTEMA DI FILTRAGGIO PROGETTI
    filterBtns.forEach(btn => {
        btn.addEventListener('click', filterProjects);
    });
    
    function filterProjects(e) {
        e.preventDefault();
        
        if(!e.target.classList.contains('filter-btn')) return;
        
        // Gestione stato attivo dei pulsanti
        filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.getAttribute('data-filter');
        
        // Filtraggio progetti con animazione
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if(filter === 'all' || category === filter) {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // 2. FUNZIONALITÀ BEFORE/AFTER
    /**
     * Implementazione del componente Before/After con effetto slide
     * Questo componente permette di confrontare due immagini (prima/dopo) trascinando un divisore
     * - Supporta sia mouse che touch (mobile)
     * - Implementa effetti visivi durante il trascinamento
     * - Ottimizzato per prestazioni fluide
     */
    baContainers.forEach(container => {
        // Elementi del componente
        const beforeImg = container.querySelector('.img-before');
        const afterImg = container.querySelector('.img-after');
        const sliderHandle = container.querySelector('.slider-handle');
        
        // Verifica che tutti gli elementi necessari esistano
        if (!beforeImg || !afterImg || !sliderHandle) {
            console.warn('Before/After container missing required elements', container);
            return;
        }
        
        // Precarica le immagini per garantire che siano disponibili quando necessario
        [beforeImg, afterImg].forEach(img => {
            // Crea un riferimento all'URL dell'immagine per precaricarla
            if (img.src) {
                const preload = new Image();
                preload.src = img.src;
            }
        });
        
        // Imposta la posizione iniziale a 50%
        setPosition(50);
        
        /**
         * Imposta la posizione del divisore e modifica i clip-path delle immagini
         * @param {number} percentage - Percentuale della posizione (0-100)
         */
        function setPosition(percentage) {
            // Assicura che la percentuale sia nel range 0-100
            percentage = Math.max(0, Math.min(100, percentage));
            
            // Applica i clip-path con prefissi per massima compatibilità
            const beforeClip = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
            const afterClip = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
            
            beforeImg.style.clipPath = beforeClip;
            beforeImg.style.webkitClipPath = beforeClip; // Supporto Safari
            
            afterImg.style.clipPath = afterClip;
            afterImg.style.webkitClipPath = afterClip; // Supporto Safari
            
            // Posiziona il divisore
            sliderHandle.style.left = `${percentage}%`;
        }
        
        /**
         * Gestisce il movimento del divisore durante trascinamento o click
         * @param {Event} e - Evento mouse o touch
         */
        function handleSlider(e) {
            e.preventDefault(); // Previene eventi indesiderati durante il trascinamento
            
            let clientX;
            
            // Supporto per eventi touch e mouse
            if (e.type.includes('touch')) {
                clientX = e.touches ? e.touches[0].clientX : e.changedTouches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            // Calcola la posizione relativa all'elemento
            const rect = container.getBoundingClientRect();
            const position = clientX - rect.left;
            
            // Calcola e imposta la percentuale
            const percentage = (position / rect.width) * 100;
            setPosition(percentage);
        }
        
        /**
         * Inizia l'operazione di trascinamento
         * @param {Event} e - Evento mouse o touch
         */
        function startDrag(e) {
            e.preventDefault();
            
            // Aggiunge classe per effetti visivi durante trascinamento
            container.classList.add('active');
            
            // Aggiungi eventi appropriati in base al tipo di dispositivo
            if (e.type === 'touchstart') {
                document.addEventListener('touchmove', handleSlider, { passive: false });
                document.addEventListener('touchend', stopDrag);
                document.addEventListener('touchcancel', stopDrag);
            } else {
                document.addEventListener('mousemove', handleSlider);
                document.addEventListener('mouseup', stopDrag);
                document.addEventListener('mouseleave', stopDrag);
            }
            
            // Esegui immediatamente per posizionare il divisore alla posizione del click/touch
            handleSlider(e);
        }
        
        /**
         * Termina l'operazione di trascinamento
         */
        function stopDrag() {
            // Rimuovi tutti gli event listener per evitare memory leak
            document.removeEventListener('mousemove', handleSlider);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('mouseleave', stopDrag);
            document.removeEventListener('touchmove', handleSlider);
            document.removeEventListener('touchend', stopDrag);
            document.removeEventListener('touchcancel', stopDrag);
            
            // Rimuovi classe active
            container.classList.remove('active');
        }
        
        // Aggiungi event listener per iniziare il trascinamento
        container.addEventListener('mousedown', startDrag);
        container.addEventListener('touchstart', startDrag, { passive: false });
        
        // Gestione click diretto (senza trascinamento)
        container.addEventListener('click', function(e) {
            // Evita doppia esecuzione con mousedown/up
            if (e.detail === 1) { // Solo click singoli, non doppi click
                handleSlider(e);
            }
        });
        
        // Migliora accessibilità aggiungendo supporto tastiera
        sliderHandle.setAttribute('tabindex', '0'); // Rendi focalizzabile
        sliderHandle.setAttribute('role', 'slider');
        sliderHandle.setAttribute('aria-valuemin', '0');
        sliderHandle.setAttribute('aria-valuemax', '100');
        sliderHandle.setAttribute('aria-valuenow', '50'); // Valore iniziale
        
        sliderHandle.addEventListener('keydown', function(e) {
            let newPosition = parseInt(sliderHandle.getAttribute('aria-valuenow'));
            
            // Gestisce i tasti freccia per spostare il divisore
            switch(e.key) {
                case 'ArrowLeft':
                    newPosition = Math.max(0, newPosition - 5);
                    break;
                case 'ArrowRight':
                    newPosition = Math.min(100, newPosition + 5);
                    break;
            }
            
            setPosition(newPosition);
            sliderHandle.setAttribute('aria-valuenow', newPosition.toString());
        });
    });
    
    // 3. ANIMAZIONE INIZIALE
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});
