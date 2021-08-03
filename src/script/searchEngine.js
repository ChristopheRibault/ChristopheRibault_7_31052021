import * as Promise from 'bluebird';

export default class SearchEngine {

  constructor(data, queries = null) {
    this._data = data;
    this._queries = queries;
    if (this._queries) {
      this._queries.ingredients = JSON.parse(this._queries.ingredients);
      this._queries.appliance = JSON.parse(this._queries.appliance);
      this._queries.ustensils = JSON.parse(this._queries.ustensils);
    }
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

  filterByQuery(recipe) {
    return recipe.name.includes(this.queries.q) || 
    recipe.description.includes(this.queries.q) ||
    recipe.ingredients.some(ingredient => {
      return ingredient.ingredient.includes(this.queries.q);
    });
  }

  filterByApplianceTag(recipe) {
    return this.queries.appliance.length === 0 ||
      recipe.appliance.toLowerCase() === this.queries.appliance[0].name.toLowerCase();
  }

  filterByUstensilTags(recipe) {
    return this.queries.ustensils.length === 0 ||
    this.queries.ustensils.every(ustensil => {
      return recipe.ustensils.map(ust => ust.toLowerCase()).includes(ustensil.name.toLowerCase());
    });
  }

  filterByIngredientTags(recipe) {
    return this.queries.ingredients.length === 0 ||
    this.queries.ingredients.every(tagIngredient => {
      return recipe.ingredients.some(recipeIngredient => {
        return recipeIngredient.ingredient.toLowerCase() === tagIngredient.name.toLowerCase();
      });
    });
  }

  async searchQuery() {
    return this.data
      .filter((recipe) => this.filterByQuery(recipe))
      .filter((recipe) => this.filterByIngredientTags(recipe))
      .filter((recipe) => this.filterByApplianceTag(recipe))
      .filter((recipe) => this.filterByUstensilTags(recipe));
  }

  getIngredients() {
    const ingredients = [];
    this.data.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredients.push(ingredient.ingredient);
      });
    });

    return new Set(ingredients);
  }

  getAppliances() {
    return new Set(this.data.map(recipe => recipe.appliance));
  }

  getUstensils() {
    const ustensils = [];
    this.data.forEach(recipe => {
      ustensils.push(...recipe.ustensils);
    });

    return new Set(ustensils);
  }

  async searchTags() {
    return Promise.props({
      ingredients: this.getIngredients(),
      appliances: this.getAppliances(),
      ustensils: this.getUstensils(),
    });
  }
}
