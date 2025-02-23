const searchCountry = async () => {
    const searchInput = document.getElementById('searchInput').value;
    const resultContainer = document.getElementById('resultContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    if (searchInput === '') {
        return;
    }
    resultContainer.innerHTML = '';
    noResultsMessage.style.display = 'none';
    loadingSpinner.style.display = 'block';
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
        const countries = await response.json();
        console.log(countries);
        if (countries && countries.length > 0) {
            countries.forEach(country => {
                const countryCard = document.createElement('div');
                countryCard.classList.add('countryCard');
                
                let flag = '';
                if (country.flags && country.flags[0]) {
                    flag = country.flags[0]; 
                } else if (country.flags && country.flags.svg) {
                    flag = country.flags.svg;
                } else {
                    flag = 'default-flag.png';
                }

                const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
                const currencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A';

                countryCard.innerHTML = `
                    <img src="${flag}" alt="Flag of ${country.name.common}">
                    <h3>${country.name.common}</h3>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
                    <p><strong>Languages:</strong> ${languages}</p>
                    <p><strong>Currencies:</strong> ${currencies}</p>
                `;
                resultContainer.appendChild(countryCard);
            });
        } else {
            noResultsMessage.style.display = 'block';
        }
    } catch (error) {
        console.error("Error fetching country data:", error);
        noResultsMessage.style.display = 'block';
    } finally {
        loadingSpinner.style.display = 'none';
    }
};
const searchEurope = async () => {
    const resultContainer = document.getElementById('resultContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    resultContainer.innerHTML = '';
    loadingSpinner.style.display = 'block';
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe');
        const countries = await response.json();
        countries.forEach(country => displayCountryCard(country));
    } catch (error) {
        console.error("Error fetching Europe countries:", error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
};
const searchMacedoniaNeighbours = async () => {
    const resultContainer = document.getElementById('resultContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    resultContainer.innerHTML = '';
    loadingSpinner.style.display = 'block';
    try {
        const response = await fetch('https://restcountries.com/v3.1/name/macedonia');
        const countryData = await response.json();
        const borders = countryData[0].borders;
        if (borders && borders.length > 0) {
            const neighbourCountries = await fetch(`https://restcountries.com/v3.1/all`);
            const allCountries = await neighbourCountries.json();
            const neighbourCountriesData = allCountries.filter(country => borders.includes(country.cca3));
            neighbourCountriesData.forEach(country => displayCountryCard(country));
        } else {
            console.log('No neighbours found');
        }
    } catch (error) {
        console.error("Error fetching Macedonia neighbours:", error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
};
const searchMacedonia = async () => {
    const resultContainer = document.getElementById('resultContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    resultContainer.innerHTML = '';
    loadingSpinner.style.display = 'block';
    try {
        const response = await fetch('https://restcountries.com/v3.1/name/macedonia');
        const country = await response.json();
        displayCountryCard(country[0]);
    } catch (error) {
        console.error("Error fetching Macedonia data:", error);
    } finally {
        loadingSpinner.style.display = 'none';
    }
};
const displayCountryCard = (country) => {
    const resultContainer = document.getElementById('resultContainer');
    const countryCard = document.createElement('div');
    countryCard.classList.add('countryCard');
    let flag = '';
    if (country.flags && country.flags[0]) {
        flag = country.flags[0]; 
    } else if (country.flags && country.flags.svg) {
        flag = country.flags.svg;
    } else {
        flag = 'default-flag.png';
    }
    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
    const currencies = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A';
    countryCard.innerHTML = `
        <img src="${flag}" alt="Flag of ${country.name.common}">
        <h3>${country.name.common}</h3>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Currencies:</strong> ${currencies}</p>
    `;
    resultContainer.appendChild(countryCard);
};
const sortCountries = (criteria, ascending) => {
    const resultContainer = document.getElementById('resultContainer');
    let countries = Array.from(resultContainer.children);
    countries.sort((a, b) => {
        const aValue = a.querySelector(`p strong:contains(${criteria})`).nextSibling.nodeValue.trim();
        const bValue = b.querySelector(`p strong:contains(${criteria})`).nextSibling.nodeValue.trim();
        
        return ascending ? aValue - bValue : bValue - aValue;
    });
    resultContainer.innerHTML = '';
    countries.forEach(country => resultContainer.appendChild(country));
};