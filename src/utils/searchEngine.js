import ArrayUtils from './array';

export default class SearchEngine {

  /**
   * filters a recipe list
   * @static
   * @param {Array} [recipeList=[]] 
   * @param {Object} [filters={}]
   * @param {String[]} filters.ingredients
   * @param {String} filters.appliance
   * @param {String[]} filters.ustensils
   * @returns {Array}
   */
  static filterRecipeList(recipeList = [], filters = {}) {
    const filteredList = recipeList;

    for (const key in filters) {
      if (Array.isArray(filters[key])) {
        filteredList.forEach((recipe, i) => {
          filters[key].forEach(item => {
            if (!recipe[key].includes(item)) {
              filteredList.splice(i, 1);
            }
          });
        });
      } else {
        filteredList.forEach((recipe, i) => {
          if (recipe[key] !== filters[key]) {
            filteredList.splice(i, 1);
          }
        });
      }
    }

    return filteredList;
  }

  /**
   * Get a list of an element from a recipe list
   * @static
   * @param {String} element type of recipe element to extract
   * @param {Array} recipeList list of recipes
   * @returns {Array} list of elements in recipeList
   */
  static getRecipeElementList(element, recipeList) {
    const elementList = [];

    if (element === 'ingredients') {
      return ArrayUtils.removeDuplicates(
        SearchEngine.getIngredientsFromRecipeList(recipeList),
      );
    }

    recipeList.forEach(recipe => {
      if(Array.isArray(recipe[element])){
        recipe[element].forEach(el => elementList.push(el));
      } else {
        elementList.push(recipe[element]);
      }
    });

    return ArrayUtils.removeDuplicates(elementList);
  }

  /**
   * Get list of ingredients in a list of recipes
   * @static
   * @param {Array} recipes list of recipes
   * @returns {Array} list of ingredients
   */
  static getIngredientsFromRecipeList(recipes) {
    const ingredientList = [];

    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredientList.push(ingredient.ingredient);
      });
    });

    return ingredientList;
  }

}
