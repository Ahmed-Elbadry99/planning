// Voting Innovations Drag and Drop System

class VotingInnovations {
    constructor() {
        this.cards = [];
        this.draggedElement = null;
        this.orderList = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeOrderList();
        this.updateOrderList();
    }

    setupEventListeners() {
        const grid = document.getElementById('innovationsGrid');
        const confirmBtn = document.getElementById('confirmOrder');

        if (grid) {
            // Drag start
            grid.addEventListener('dragstart', (e) => {
                if (e.target.classList.contains('innovation-card')) {
                    this.draggedElement = e.target;
                    e.target.classList.add('dragging');
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/html', e.target.outerHTML);
                }
            });

            // Drag end
            grid.addEventListener('dragend', (e) => {
                if (e.target.classList.contains('innovation-card')) {
                    e.target.classList.remove('dragging');
                    this.draggedElement = null;
                }
            });

            // Drag over
            grid.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                const card = e.target.closest('.innovation-card');
                if (card && card !== this.draggedElement) {
                    card.classList.add('drag-over');
                }
            });

            // Drag leave
            grid.addEventListener('dragleave', (e) => {
                const card = e.target.closest('.innovation-card');
                if (card) {
                    card.classList.remove('drag-over');
                }
            });

            // Drop
            grid.addEventListener('drop', (e) => {
                e.preventDefault();
                
                const card = e.target.closest('.innovation-card');
                if (card && this.draggedElement && card !== this.draggedElement) {
                    this.reorderCards(this.draggedElement, card);
                }
                
                // Remove drag-over class from all cards
                document.querySelectorAll('.innovation-card').forEach(c => {
                    c.classList.remove('drag-over');
                });
            });

            // Touch events for mobile
            this.setupTouchEvents();
        }

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.confirmOrder();
            });
        }
    }

    setupTouchEvents() {
        const cards = document.querySelectorAll('.innovation-card');
        
        cards.forEach(card => {
            let startY = 0;
            let startX = 0;
            let isDragging = false;
            let originalIndex = 0;

            card.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
                startX = e.touches[0].clientX;
                isDragging = false;
                originalIndex = Array.from(cards).indexOf(card);
            });

            card.addEventListener('touchmove', (e) => {
                if (!isDragging) {
                    const deltaY = Math.abs(e.touches[0].clientY - startY);
                    const deltaX = Math.abs(e.touches[0].clientX - startX);
                    
                    if (deltaY > 10 || deltaX > 10) {
                        isDragging = true;
                        card.classList.add('dragging');
                    }
                }
                
                if (isDragging) {
                    e.preventDefault();
                }
            });

            card.addEventListener('touchend', (e) => {
                if (isDragging) {
                    card.classList.remove('dragging');
                    isDragging = false;
                    
                    const currentIndex = Array.from(cards).indexOf(card);
                    if (currentIndex !== originalIndex) {
                        this.updateOrderList();
                    }
                }
            });
        });
    }

    reorderCards(draggedCard, targetCard) {
        const grid = document.getElementById('innovationsGrid');
        const cards = Array.from(grid.querySelectorAll('.innovation-card'));
        
        const draggedIndex = cards.indexOf(draggedCard);
        const targetIndex = cards.indexOf(targetCard);
        
        if (draggedIndex < targetIndex) {
            targetCard.parentNode.insertBefore(draggedCard, targetCard.nextSibling);
        } else {
            targetCard.parentNode.insertBefore(draggedCard, targetCard);
        }
        
        // Update card numbers
        this.updateCardNumbers();
        
        // Update order list
        this.updateOrderList();
        
        // Add animation
        draggedCard.classList.add('card-moved');
        setTimeout(() => {
            draggedCard.classList.remove('card-moved');
        }, 300);
    }

    updateCardNumbers() {
        const cards = document.querySelectorAll('.innovation-card');
        cards.forEach((card, index) => {
            const numberElement = card.querySelector('.card-number');
            if (numberElement) {
                numberElement.textContent = `(${index + 1})`;
            }
        });
    }

    initializeOrderList() {
        const cards = document.querySelectorAll('.innovation-card');
        this.orderList = Array.from(cards).map((card, index) => ({
            id: card.getAttribute('data-id'),
            title: card.querySelector('h3').textContent,
            order: index + 1
        }));
    }

    updateOrderList() {
        const orderListContainer = document.getElementById('orderList');
        const cards = document.querySelectorAll('.innovation-card');
        
        if (!orderListContainer) return;
        
        // Clear current list
        orderListContainer.innerHTML = '';
        
        // Update order list data
        this.orderList = Array.from(cards).map((card, index) => ({
            id: card.getAttribute('data-id'),
            title: card.querySelector('h3').textContent,
            order: index + 1
        }));
        
        // Create order list items
        this.orderList.forEach((item, index) => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="order-number">${index + 1}</div>
                <div class="order-title">${item.title}</div>
            `;
            orderListContainer.appendChild(orderItem);
        });
    }

    getCurrentOrder() {
        const cards = document.querySelectorAll('.innovation-card');
        return Array.from(cards).map((card, index) => ({
            id: card.getAttribute('data-id'),
            title: card.querySelector('h3').textContent,
            order: index + 1
        }));
    }

    confirmOrder() {
        const confirmBtn = document.getElementById('confirmOrder');
        const currentOrder = this.getCurrentOrder();
        
        // Add loading state
        confirmBtn.classList.add('loading');
        confirmBtn.textContent = 'جاري الحفظ...';
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // Remove loading state
            confirmBtn.classList.remove('loading');
            confirmBtn.textContent = 'تأكيد الترتيب';
            
            // Show success message
            this.showSuccessMessage();
            
            // Log the order (replace with actual submission)
            console.log('Confirmed Order:', currentOrder);
            
            // You can send this data to your backend
            this.submitOrder(currentOrder);
            
        }, 1500);
    }

    showSuccessMessage() {
        const container = document.querySelector('.container');
        const existingMessage = document.querySelector('.success-message');
        
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = 'تم حفظ الترتيب بنجاح! شكراً لمساهمتك في اختيار أفضل الابتكارات.';
        
        container.insertBefore(successMessage, container.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    submitOrder(orderData) {
        // This is where you would send the data to your backend
        // Example using fetch:
        /*
        fetch('/api/submit-vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                order: orderData,
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order submitted successfully:', data);
        })
        .catch(error => {
            console.error('Error submitting order:', error);
        });
        */
        
        // For now, just log the data
        console.log('Order data to submit:', orderData);
    }

    // Utility method to reset order
    resetOrder() {
        const grid = document.getElementById('innovationsGrid');
        const cards = Array.from(grid.querySelectorAll('.innovation-card'));
        
        // Sort by original data-id
        cards.sort((a, b) => {
            return parseInt(a.getAttribute('data-id')) - parseInt(b.getAttribute('data-id'));
        });
        
        // Re-append in correct order
        cards.forEach(card => {
            grid.appendChild(card);
        });
        
        this.updateCardNumbers();
        this.updateOrderList();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VotingInnovations();
});

// Export for potential use in other scripts
window.VotingInnovations = VotingInnovations; 