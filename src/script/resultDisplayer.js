import * as Promise from 'bluebird';
import RecipeCard from '../components/recipeCard';

export default class ResultDisplayer {

  constructor() {
    this.resultsContainer = document.getElementById('results-container');
    this.init();
  }

  async createCards(results) {
    return Promise.map(
      results,
      recipe => {
        return new RecipeCard(recipe);
      },
    );
  }

  async displayResults(results) {
    this.resultsContainer.innerHTML = '';
    if (results.length) {
      const cards = await this.createCards(results);
      this.resultsContainer.append(...cards);
    } else {
      const notFoundMessage = document.createElement('p');
      notFoundMessage.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';
      this.resultsContainer.appendChild(notFoundMessage);
    }
  }

  init() {
    document.addEventListener(
      'newResults',
      (e) => this.displayResults(e.detail),
    );

    document.addEventListener('clearSearch', () => {
      this.resultsContainer.innerHTML = '';
    });
  }

}
