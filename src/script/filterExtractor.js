import { ArrayUtils } from '../utils';

export default class FilterExtractor {

  constructor() {
    this._ingredients = [];
    this._appliances = [];
    this._ustensils = [];
  }

  get ingredients() {
    return this._ingredients;
  }

  get ustensils() {
    return this._ustensils;
  }

  get appliances() {
    return this._appliances;
  }

  set ingredients(data) {
    this.ingredients.push(...data.map(
      ingredient => ingredient.ingredient,
    ));
  }

  set appliances(data) {
    this._appliances.push(data);
  }

  set ustensils(data) {
    this._ustensils.push(...data);
  }

  removeDuplicates() {
    this._ingredients = ArrayUtils.removeDuplicates(this.ingredients);
    this._ustensils = ArrayUtils.removeDuplicates(this.ustensils);
    this._appliances = ArrayUtils.removeDuplicates(this.appliances);
  }

  extract(data) {
    data.forEach(recipe => {
      this.ingredients = recipe.ingredients;
      this.ustensils = recipe.ustensils;
      this.appliances = recipe.appliance;
    });

    this.removeDuplicates();

    return {
      ingredients: this.ingredients,
      appliances: this.appliances,
      ustensils: this.ustensils,
    };
  }

}
