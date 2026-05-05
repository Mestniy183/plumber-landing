export function showLoader(container) {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.innerHTML = `
    <div class="loader__spinner"></div
    `;
    container.appendChild(loader);
    return loader;
}

export function hideLoader(loader) {
    if (loader && loader.parentElement) {
        loader.remove();
    }
}