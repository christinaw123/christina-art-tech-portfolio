document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .info-card, .skill-category, .experience-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Project link tracking (for analytics)
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            const linkType = this.textContent.trim();
            
            // Analytics tracking would go here
            console.log(`Project link clicked: ${projectName} - ${linkType}`);
            
            // Prevent default for placeholder links
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert(`${linkType} for "${projectName}" coming soon! Links will be updated with actual demos and repositories.`);
            }
        });
    });

    // Email link tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Email contact initiated');
            // Analytics tracking would go here
        });
    });

    // External link handling
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const destination = this.href;
            console.log(`External link clicked: ${destination}`);
            // Analytics tracking would go here
        });
    });

    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Enable keyboard navigation for hamburger menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Page load performance tracking
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });

    // Text switcher function
    const textSwitchers = document.querySelectorAll('.text-switcher');
    textSwitchers.forEach(switcher => {
        const options = switcher.dataset.options.split(',');
        let currentIndex = 0;
        
        switcher.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % options.length;
            this.textContent = options[currentIndex];
            
            // Add animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add visual feedback for form interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Initialize tooltips for skill tags (optional enhancement)
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Could add skill level or description tooltips here
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ===== DESIGN ITEMS MODAL FUNCTIONALITY =====
    
    // Image collections for different design items
    const imageCollections = {
        'aadt-featured': [
            { src: 'images/poster2.png', title: 'AADT Horizon Fall Poster - Design 1' },
            { src: 'images/ebposter25.png', title: 'AADT Eastbound Spring Poster - Design 2'}
        ],
        'aadt-social': [
            { src: 'images/social1.png', title: 'Instagram Post' },
            { src: 'images/social2.png', title: 'Instagram Post' },
            { src: 'images/social3.png', title: 'Event Announcement' }
        ],
        'aadt-merch': [
            { src: 'images/ebtshirtmockup.png', title: 'T-shirt Design' },
            { src: 'images/aadtsticker.png', title: 'Sticker Design' },
            { src: 'images/aadtsticker2.png', title: 'Sticker Design' },
            {src: 'images/aadtsticker3.png', title: 'Sticker Design'}
        ],
        'aadt-workshop': [
            { src: 'images/workshop.png', title: 'Workshop Post' }
        ],
        'cs124-stickers': [
            { src: 'images/stickerdesign.png', title: 'CS1240 Sticker' },
            { src: 'images/cs124.png', title: 'CS1240 printed sticker'}
        ],
        'cs124-tshirt': [
            { src: 'images/tshirtback.png', title: 'CS124 T-shirt Back Design' }
            // { src: 'images/mockup.png', title: 'CS124 T-shirt Mockup' }
        ],
        'web-ui': [
            { src: 'images/wics-figma.png', title: 'WICS Web Design'}
        ]
    };

    // PDF Modal functionality
    const pdfModal = document.getElementById('pdfModal');
    const pdfViewer = document.getElementById('pdfViewer');
    const pdfTriggers = document.querySelectorAll('.pdf-popup-trigger');

    if (pdfModal && pdfViewer && pdfTriggers.length > 0) {
        const closeBtn = pdfModal.querySelector('.close');
        
        // Open PDF modal
        pdfTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('PDF trigger clicked'); // Debug log
                const pdfPath = this.getAttribute('data-pdf');
                console.log('PDF path:', pdfPath); // Debug log
                pdfViewer.src = pdfPath;
                pdfModal.style.display = 'flex';
            });
        });
        
        // Close PDF modal
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                console.log('PDF modal close clicked'); // Debug log
                pdfModal.style.display = 'none';
                pdfViewer.src = ''; // Clear the iframe
            });
        }
        
        // Close on outside click
        pdfModal.addEventListener('click', function(e) {
            if (e.target === pdfModal) {
                console.log('PDF modal outside click'); // Debug log
                pdfModal.style.display = 'none';
                pdfViewer.src = '';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && pdfModal.style.display === 'flex') {
                console.log('PDF modal escape key'); // Debug log
                pdfModal.style.display = 'none';
                pdfViewer.src = '';
            }
        });
    } else {
        console.error('PDF modal elements not found:', {
            pdfModal: !!pdfModal,
            pdfViewer: !!pdfViewer,
            pdfTriggers: pdfTriggers.length
        });
    }

    // Google Doc toggle functionality
    // Google Doc toggle functionality
    const toggleBtn = document.getElementById('toggleDocBtn');
    const docSection = document.getElementById('docSection');
    const docFrame = document.getElementById('googleDocFrame');
    let isDocLoaded = false;

    console.log('Elements found:', {
        toggleBtn: !!toggleBtn,
        docSection: !!docSection,
        docFrame: !!docFrame
    });

    if (toggleBtn && docSection) {
        toggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Toggle clicked!');
            console.log('Current classes:', docSection.className);
            
            if (docSection.classList.contains('show')) {
                // Hide the document
                docSection.classList.remove('show');
                toggleBtn.innerHTML = '<i class="fas fa-file-alt"></i>view project report';
                console.log('Hiding document');
            } else {
                // Show the document
                docSection.classList.add('show');
                toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>hide project report';
                console.log('Showing document');
                
                // Load iframe content only when first shown (for performance)
                if (!isDocLoaded && docFrame) {
                    const docSrc = docFrame.getAttribute('data-src');
                    console.log('Loading iframe with src:', docSrc);
                    if (docSrc) {
                        docFrame.src = docSrc;
                        isDocLoaded = true;
                    }
                }
            }
        });
    }



    // Current modal state
    let currentCollection = [];
    let currentImageIndex = 0;

    // Create the universal modal for design items
    function createDesignModal() {
        const modalHTML = `
            <div id="designModal" class="modal">
                <div class="modal-content">
                    <div class="modal-nav" id="designModalNav" style="display: none;">
                        <button class="modal-btn prev" id="prevDesignImage">&#8249;</button>
                        <button class="modal-btn next" id="nextDesignImage">&#8250;</button>
                    </div>
                    <div class="modal-image-container">
                        <span class="close" id="closeDesignModal">&times;</span>
                        <img id="designModalImage" src="" alt="">
                    </div>
                    <div class="modal-info">
                        <span class="modal-counter" id="designModalCounter" style="display: none;"></span>
                        <p class="modal-description" id="designModalTitle"></p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners
        const modal = document.getElementById('designModal');
        const closeBtn = document.getElementById('closeDesignModal');
        const prevBtn = document.getElementById('prevDesignImage');
        const nextBtn = document.getElementById('nextDesignImage');
        
        // Close modal events
        closeBtn.addEventListener('click', closeDesignModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDesignModal();
            }
        });
        
        // Navigation events
        prevBtn.addEventListener('click', () => navigateDesignImage(-1));
        nextBtn.addEventListener('click', () => navigateDesignImage(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal.style.display === 'flex') {
                if (e.key === 'Escape') {
                    closeDesignModal();
                } else if (e.key === 'ArrowLeft') {
                    navigateDesignImage(-1);
                } else if (e.key === 'ArrowRight') {
                    navigateDesignImage(1);
                }
            }
        });
    }

    // Open design modal with specific collection
    function openDesignModal(collectionKey) {
        const collection = imageCollections[collectionKey];
        if (!collection || collection.length === 0) {
            // Fallback to single image from the design item
            const designItem = document.querySelector(`[data-collection="${collectionKey}"]`);
            const img = designItem?.querySelector('img');
            if (img) {
                currentCollection = [{ src: img.src, title: img.alt || 'Design Item' }];
            } else {
                console.error('No images found for collection:', collectionKey);
                return;
            }
        } else {
            currentCollection = collection;
        }
        
        currentImageIndex = 0;
        
        const modal = document.getElementById('designModal');
        if (!modal) {
            createDesignModal();
        }
        
        updateDesignModalContent();
        document.getElementById('designModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Close design modal
    function closeDesignModal() {
        const modal = document.getElementById('designModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Navigate between images in collection
    function navigateDesignImage(direction) {
        if (currentCollection.length <= 1) return;
        
        currentImageIndex = (currentImageIndex + direction + currentCollection.length) % currentCollection.length;
        updateDesignModalContent();
    }

    // Update modal content
    function updateDesignModalContent() {
        const currentImage = currentCollection[currentImageIndex];
        const modalImageContainer = document.querySelector('#designModal .modal-image-container');
        const modalTitle = document.getElementById('designModalTitle');
        const modalCounter = document.getElementById('designModalCounter');
        const modalNav = document.getElementById('designModalNav');
        
        if (modalImageContainer && currentImage) {
            // Remove the old image completely
            const oldImage = modalImageContainer.querySelector('img');
            if (oldImage) {
                oldImage.remove();
            }
            
            // Create a completely new image element
            const newImage = document.createElement('img');
            newImage.id = 'designModalImage';
            newImage.src = currentImage.src;
            newImage.alt = currentImage.title;
            newImage.style.cssText = `
                max-width: 90vw !important;
                max-height: 85vh !important;
                width: auto !important;
                height: auto !important;
                object-fit: contain !important;
                border-radius: 0 !important;
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
            `;
            
            modalImageContainer.appendChild(newImage);
        }
        
        if (modalTitle) {
            modalTitle.textContent = currentImage.title;
        }
        
        // Show/hide navigation based on collection size
        if (currentCollection.length > 1) {
            modalNav.style.display = 'flex';
            modalCounter.style.display = 'block';
            modalCounter.textContent = `${currentImageIndex + 1} / ${currentCollection.length}`;
        } else {
            modalNav.style.display = 'none';
            modalCounter.style.display = 'none';
        }
    }

    // Add click listeners to all design items
    function initializeDesignItemClicks() {
        const designItems = document.querySelectorAll('.design-item');
        
        designItems.forEach((item, index) => {
            // Determine collection key based on item content and position
            let collectionKey = '';
            
            // Check if it has a data-collection attribute first
            if (item.hasAttribute('data-collection')) {
                collectionKey = item.dataset.collection;
            } else {
                // Fallback: determine by content and section
                const isInAADT = item.closest('.design-section h2')?.textContent.includes('Asian American Dance Troupe');
                const isInCS124 = item.closest('.design-section h2')?.textContent.includes('CS124');
                
                if (isInAADT || item.closest('.design-section').querySelector('h2')?.textContent.includes('Asian American Dance Troupe')) {
                    if (item.classList.contains('featured')) {
                        collectionKey = 'aadt-featured';
                    } else if (item.querySelector('img[src*="social"]')) {
                        collectionKey = 'aadt-social';
                    } else if (item.querySelector('img[src*="shirt"], img[src*="merch"]')) {
                        collectionKey = 'aadt-merch';
                    } else if (item.querySelector('img[src*="workshop"]')) {
                        collectionKey = 'aadt-workshop';
                    }
                } else if (isInCS124 || item.closest('.design-section').querySelector('h2')?.textContent.includes('CS124')) {
                    if (item.querySelector('img[src*="sticker"]')) {
                        collectionKey = 'cs124-stickers';
                    } else if (item.querySelector('img[src*="shirt"]')) {
                        collectionKey = 'cs124-tshirt';
                    }
                }
            }
            
            // Add click listener
            item.addEventListener('click', function(e) {
                // Prevent click if user is trying to interact with links inside
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                
                console.log('Design item clicked:', collectionKey);
                
                if (collectionKey) {
                    openDesignModal(collectionKey);
                } else {
                    // Fallback to single image
                    const img = item.querySelector('img');
                    if (img) {
                        const fallbackKey = `fallback-${index}`;
                        imageCollections[fallbackKey] = [{ 
                            src: img.src, 
                            title: img.alt || item.querySelector('h3')?.textContent || 'Design Item' 
                        }];
                        openDesignModal(fallbackKey);
                    }
                }
            });
            
            // Add visual feedback
            item.style.cursor = 'pointer';
        });
    }

    // Initialize when DOM is ready
    initializeDesignItemClicks();

    // Global functions for legacy poster functionality (keep for backwards compatibility)
    window.openPosterModal = function() {
        openDesignModal('aadt-featured');
    };

    window.closePosterModal = function() {
        closeDesignModal();
    };

    window.switchPoster = function(direction) {
        navigateDesignImage(direction);
    };

    console.log('Enhanced portfolio navigation with clickable design items loaded successfully!');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you create a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
});

// Handle offline status
window.addEventListener('online', function() {
    console.log('Connection restored');
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
});