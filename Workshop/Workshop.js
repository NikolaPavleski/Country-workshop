const searchCountry = async () => {
    const searchInput = document.getElementById('searchInput').value;
    const resultContainer = document.getElementById('resultContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');
    if (searchInput === '') {
        return;
    }
    resultContainer.innerHTML = '';
    noResultsMessage.style.display = 'none';
};