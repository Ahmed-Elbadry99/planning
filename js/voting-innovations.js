
class VotingInnovations {
    constructor() {
        this.cards = [];
        this.draggedElement = null;
        this.orderList = [];
        this.init();
    }

    init() {
        this.initializeOrderList();
        this.updateOrderList();
        this.gotResult();
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
            <div class="order-controls">
                <button class="move-up" ${index === 0 ? 'disabled' : ''}>
                   <img src="./images/upArrow.svg" alt="">
                </button>
                <button class="move-down" ${index === this.orderList.length - 1 ? 'disabled' : ''}>
                    <img src="./images/dArrow.svg" alt="">
                </button>
            </div>
        `;

            // Add event listeners to move buttons
            orderItem.querySelector('.move-up')?.addEventListener('click', () => {
                this.swapCards(index, index - 1);
            });
            orderItem.querySelector('.move-down')?.addEventListener('click', () => {
                this.swapCards(index, index + 1);
            });

            orderListContainer.appendChild(orderItem);
        });
    }

    swapCards(fromIndex, toIndex) {
        const grid = document.getElementById('innovationsGrid');
        const cards = Array.from(grid.children);

        if (toIndex < 0 || toIndex >= cards.length) return;

        // Swap elements in the DOM
        if (fromIndex < toIndex) {
            grid.insertBefore(cards[toIndex], cards[fromIndex]);
        } else {
            grid.insertBefore(cards[fromIndex], cards[toIndex]);
        }

        this.updateOrderList();
    }


    gotResult() {

        document.getElementById("confirmOrder").addEventListener("click", () => {

            console.log(this.orderList);

        })
    }



}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VotingInnovations();
});

// Export for potential use in other scripts
window.VotingInnovations = VotingInnovations; 