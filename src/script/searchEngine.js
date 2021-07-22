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

  hasIngredients(recipeIngredients) {
    let hasAllIngredients = true;

    if (this.queries.ingredients.length) {
      this.queries.ingredients.forEach(ingredient => {
        if (
          !recipeIngredients.includes(ingredient.name.toLowerCase())
        ) {
          hasAllIngredients = false;
        }
      });
    }

    return hasAllIngredients;
  }

  hasappliances(recipeAppliance) {
    if (
      this.queries.appliance.length &&
      !this.queries.appliance
        .map(app => app.name.toLowerCase())
        .includes(recipeAppliance)
    ) {
      return false;
    }

    return true;
  }

  hasUstensils(recipeUstensils) {
    let hasAllUstensils = true;
    if (this.queries.ustensils.length) {
      this.queries.ustensils
        .map(ust => ust.name.toLowerCase())
        .forEach(ust => {
          if (!recipeUstensils.includes(ust)) {
            hasAllUstensils = false;
          }
        });
    }

    return hasAllUstensils;
  }

  isSelected(recipe) {
    return (this.isInTitle(recipe.name) ||
    this.isInIngredients(recipe.ingredients) ||
    this.isInDescription(recipe.description)) &&
    this.hasIngredients(
      recipe.ingredients.map(ing => ing.ingredient.toLowerCase()),
    ) &&
    this.hasappliances(recipe.appliance.toLowerCase()) &&
    this.hasUstensils(recipe.ustensils.map(ust => ust.toLowerCase()));

  }

  async searchQuery() {
    return Promise.filter(
      this.data,
      (recipe => this.isSelected(recipe)),
    );
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
    console.log('OK');
    return Promise.props({
      ingredients: this.getIngredients(),
      appliances: this.getAppliances(),
      ustensils: this.getUstensils(),
    });
  }
}
