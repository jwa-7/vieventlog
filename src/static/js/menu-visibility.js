(() => {
    const storageKey = 'vieventlog_menu_visibility';
    const originalDisplayByLink = new WeakMap();

    function applyMenuVisibilitySettings() {
        try {
            const savedSettings = JSON.parse(localStorage.getItem(storageKey) || '{}');
            const settings = savedSettings && typeof savedSettings === 'object' && !Array.isArray(savedSettings)
                ? savedSettings
                : {};

            document.querySelectorAll('[data-menu-item]').forEach((link) => {
                if (!originalDisplayByLink.has(link)) {
                    originalDisplayByLink.set(link, link.style.display);
                }

                const hidden = settings[link.dataset.menuItem] === false;
                link.hidden = hidden;
                link.style.display = hidden ? 'none' : originalDisplayByLink.get(link);
            });
        } catch (error) {
            console.error('Failed to apply menu visibility settings:', error);
        }
    }

    applyMenuVisibilitySettings();

    window.addEventListener('storage', (event) => {
        if (event.key === storageKey || event.key === null) {
            applyMenuVisibilitySettings();
        }
    });
})();