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
    const cards = await this.createCards(results);
    this.resultsContainer.append(...cards);
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
