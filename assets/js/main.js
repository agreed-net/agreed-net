/*======== custom dropdown design-1 ===============*/
document.querySelectorAll('.custom-dropdown[data-style="design1"]').forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-button');
    const menu = dropdown.querySelector('.dropdown-menu');
    const selectedOption = dropdown.querySelector('.selected-option');
    const items = dropdown.querySelectorAll('.dropdown-item');
    const arrow = dropdown.querySelector('.dropdown-arrow');

    // Toggle dropdown
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            menu.classList.add('hidden');
            arrow.classList.remove('rotate-180'); // ✅ remove not toggle
        }
    });

    // Select option
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();

            // Remove active from all
            items.forEach(i => i.classList.remove('active'));

            // Add active to selected
            item.classList.add('active');

            // Update button text
            const text = item.querySelector('span')
                ? item.querySelector('span').textContent.trim()
                : item.textContent.trim();
            selectedOption.textContent = text;

            // Fire custom event
            button.dispatchEvent(new CustomEvent('optionSelected', { detail: text }));

            // Close menu
            menu.classList.add('hidden');
            arrow.classList.remove('rotate-180'); // ✅ remove not toggle
        });
    });
});

/*==================Modal=====================*/
const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modalTrigger");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const CloseButtons = document.querySelectorAll(".close-btn");
const overlay = document.querySelector(".overlay-modal");

modalTriggerButtons.forEach(elem => {
    elem.addEventListener("click", event => {
        const targetModalId = event.currentTarget.getAttribute("data-modal-target");

        // Close all modals before opening the target modal
        modals.forEach(modal => {
            if (modal.id !== targetModalId) {
                closeModal(modal.id, false); // Close without hiding the overlay
            }
        });

        toggleModal(targetModalId);

        // Show the overlay
        overlay.style.opacity = "1";
        overlay.style.zIndex = "1000";
        overlay.style.visibility = "visible";
        overlay.style.transition = "opacity 0.3s ease"; // Optional transition
    });
});

modalCloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals(); // Close all modals and hide overlay
    });
});

CloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals(); // Close all modals and hide overlay
    });
});

modals.forEach(elem => {
    elem.addEventListener("click", event => {
        if (event.currentTarget === event.target) closeModal(event.currentTarget.id, true);
    });
});

// Close Modal with "Esc" key
document.addEventListener("keydown", event => {
    if (event.key === "Escape" || event.keyCode === 27) {
        closeAllModals(); // Close all modals and hide overlay
    }
});

// Helper Functions

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);

    if (getComputedStyle(modal).display === "flex") {
        closeModal(modalId, true);
    } else {
        modal.style.display = "flex";
        modal.classList.add("modal-show");
    }
}

function closeModal(modalId, hideOverlay = true) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.add("modal-hide");
        setTimeout(() => {
            modal.classList.remove("modal-show", "modal-hide");
            modal.style.display = "none";
        }, 200);
    }

    // Hide overlay if specified
    if (hideOverlay) {
        overlay.style.opacity = "0";
        overlay.style.zIndex = "-1";
        overlay.style.visibility = "hidden";
        overlay.style.transition = "opacity 0.3s ease"; // Optional transition
    }
}

function closeAllModals() {
    modals.forEach(modal => closeModal(modal.id, true));
}

