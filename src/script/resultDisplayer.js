import * as Promise from 'bluebird';
import RecipeCard from '../components/recipeCard';

export default class ResultDisplayer {

  constructor() {
    this.resultsContainer = document.getElementById('results-container');
    this.init();
  }

  async createCards(results) {
    if (customElements.get('recipe-card') === undefined) {
      customElements.define('recipe-card', RecipeCard, { extends: 'div' });
    }
    return Promise.map(
      results,
      recipe => {
        return new RecipeCard(recipe);
      },
    );
  }

  async displayResults(results) {
    console.log('DISPLAY', results);
    const cards = await this.createCards(results);
    this.resultsContainer.append(...cards);
  }

  init() {
    document.addEventListener(
      'newResults',
      (e) => this.displayResults(e.detail),
    );
  }

}
