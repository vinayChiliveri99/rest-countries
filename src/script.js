document.addEventListener('DOMContentLoaded', function () {
  fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) => createElementsFromData(data))
    .catch((err) => console.error('Error while fetching data ', err));

  function createElementsFromData(data) {
    let container = document.getElementById('main-data');

    data.forEach((country) => {
      // extracting the required data.
      let imgUrl = country.flags.png;
      let countryName = country.name.common;
      let population = country.population;
      let region = country.region;
      let capital = country.capital;

      let countryContainer = document.createElement('div');
      countryContainer.classList.add('country-card');

      let flagElement = document.createElement('img');
      flagElement.src = imgUrl;
      flagElement.alt = countryName;

      let secondHalf = document.createElement('div');
      secondHalf.classList.add('country-description');

      // country name
      let countryNameElement = document.createElement('h4');
      countryNameElement.className = 'country-name';
      countryNameElement.innerText = countryName;

      // population
      let populationElement = document.createElement('p');
      populationElement.className = 'population-count';
      let populationSpan = document.createElement('span');
      populationSpan.innerText = 'Population: ';
      populationElement.appendChild(populationSpan);
      let populationText = document.createTextNode(population);
      populationElement.appendChild(populationText);

      // region
      let regionElement = document.createElement('p');
      regionElement.className = 'region-name';
      let regionSpan = document.createElement('span');
      regionSpan.innerText = 'Region: ';
      regionElement.appendChild(regionSpan);
      let regionText = document.createTextNode(region);
      regionElement.appendChild(regionText);

      // capital
      let capitalElement = document.createElement('p');
      capitalElement.className = 'capital-name';
      let capitalSpan = document.createElement('span');
      capitalSpan.innerText = 'Capital: ';
      capitalElement.appendChild(capitalSpan);
      let capitalText = document.createTextNode(capital);
      capitalElement.appendChild(capitalText);

      // adding all elements to the div.
      countryContainer.appendChild(flagElement);
      secondHalf.appendChild(countryNameElement);
      secondHalf.appendChild(populationElement);
      secondHalf.appendChild(regionElement);
      secondHalf.appendChild(capitalElement);

      countryContainer.appendChild(secondHalf);

      // adding the final div to the container.
      container.appendChild(countryContainer);
    });
  }
});

function searchAndFilter() {
  let searchedCountry = document.getElementById('search');
  let enteredCountry = searchedCountry.value.toLowerCase();
  let countries = document.getElementsByClassName('country-card');

  let selectedRegion = document
    .getElementById('regionSelect')
    .value.toLowerCase();

  for (let i = 0; i < countries.length; i++) {
    let countryName = countries[i]
      .querySelector('.country-name')
      .innerText.toLowerCase();
    let regionText = countries[i]
      .querySelector('.region-name')
      .innerText.split(':')[1]
      .trim()
      .toLowerCase();

    // Check if the country name contains the entered search text
    // and the region matches the selected region (or no region is selected)
    if (
      countryName.includes(enteredCountry) &&
      (selectedRegion == '' || selectedRegion === regionText)
    ) {
      countries[i].style.display = 'block';
    } else {
      countries[i].style.display = 'none';
    }
  }
}

function searchCountry() {
  searchAndFilter();
}

function regionSelection(selectedElement) {
  searchAndFilter();
}

// the darkmode function

function darkMode() {
  document.body.classList.toggle('dark-mode-background');

  document.querySelector('header').classList.toggle('dark-mode');

  document
    .querySelector('.search-container')
    .classList.toggle('dark-mode');
  document.querySelector('.dropdown').classList.toggle('dark-mode');

  document.querySelector('#search').classList.toggle('dark-mode');
  document
    .querySelector('#regionSelect')
    .classList.toggle('dark-mode');
  document
    .querySelector('.search-filter')
    .classList.toggle('dark-mode');

  let countryCards = document.querySelectorAll('.country-card');
  for (let i = 0; i < countryCards.length; i++) {
    countryCards[i].classList.toggle('dark-mode');
  }

  document.querySelector('#search-img').classList.toggle('dark-mode');
  document.querySelector('#search-img').src = document
    .querySelector('#search-img')
    .classList.contains('dark-mode')
    ? './icons/search-dark.svg'
    : './icons/search-outline.svg';

  document
    .querySelector('#dark-mode-img')
    .classList.toggle('dark-mode');
  document.querySelector('#dark-mode-img').src = document
    .querySelector('#dark-mode-img')
    .classList.contains('dark-mode')
    ? './icons/moon-dark.svg'
    : './icons/moon-outline.svg';
}
