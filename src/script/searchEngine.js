import * as Promise from 'bluebird';

export default class SearchEngine {

  constructor(data, queries = null) {
    this._data = data;
    this._queries = queries;
  }

  get data() {
    return this._data;
  }

  set data(_) {
    throw new Error('Can\'t set data');
  }

  get queries() {
    return this._queries;
  }

  set queries(_) {
    throw new Error('Can\'t set queries');
  }

  isInTitle(title) {
    return title.search(this.queries.q) !== -1;
  }

  isInIngredients(ingredients) {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i].ingredient.search(this.queries.q) !== -1) {
        return true;
      }
    }
    return false;
  }

  isInDescription(description) {
    return description.search(this.queries.q) !== -1;
  }

  isSelected(recipe) {
    return this.isInTitle(recipe.name) ||
    this.isInIngredients(recipe.ingredients) ||
    this.isInDescription(recipe.description);
  }

  async searchQuery() {
    return Promise.filter(
      this.data,
      (recipe => this.isSelected(recipe)),
    );
  }
}
