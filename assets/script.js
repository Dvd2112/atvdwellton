const form = document.getElementById('artworkForm');
const successAlert = document.getElementById('successAlert');
const artworkList = document.getElementById('artworkList');
const emptyState = document.getElementById('emptyState');
const storageKey = 'artworks-catalog';

function loadEntries() {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
}

function saveEntries(entries) {
    localStorage.setItem(storageKey, JSON.stringify(entries));
}

function renderEntries() {
    const entries = loadEntries();
    artworkList.innerHTML = '';
    emptyState.classList.toggle('d-none', entries.length > 0);

    entries.slice().reverse().forEach((entry) => {
        const item = document.createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <strong>${entry.nome}</strong>
            <small>Ano: ${entry.ano}</small>
            <small>Autor: ${entry.autor}</small>
            <small>Museu: ${entry.museu}</small>
            <small>Arquivo: ${entry.arquivo || 'Sem arquivo'}</small>
        `;
        artworkList.appendChild(item);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const arquivoInput = document.getElementById('arquivo');
    const entry = {
        nome: document.getElementById('nome').value,
        ano: document.getElementById('ano').value,
        autor: document.getElementById('autor').value,
        museu: document.getElementById('museu').value,
        arquivo: arquivoInput.files[0] ? arquivoInput.files[0].name : ''
    };

    loadEntries().push(entry);
    saveEntries(loadEntries());
    renderEntries();

    successAlert.classList.remove('d-none');
    window.clearTimeout(successAlert.timeout);
    successAlert.timeout = window.setTimeout(() => {
        successAlert.classList.add('d-none');
    }, 2000);

    form.reset();
    form.classList.remove('was-validated');
});

form.addEventListener('reset', () => {
    window.setTimeout(() => {
        form.classList.remove('was-validated');
    }, 0);
});

renderEntries();