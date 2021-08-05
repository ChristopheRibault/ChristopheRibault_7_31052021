function filterByQuery(recipe, queries) {
  return recipe.name.includes(queries.q) || 
  recipe.description.includes(queries.q) ||
  recipe.ingredients.some(ingredient => {
    return ingredient.ingredient.includes(queries.q);
  });
}

function filterByApplianceTag(recipe, queries) {
  return queries.appliance.length === 0 ||
    recipe.appliance.toLowerCase() === queries.appliance[0].name.toLowerCase();
}

function filterByUstensilTags(recipe, queries) {
  return queries.ustensils.length === 0 ||
  queries.ustensils.every(ustensil => {
    return recipe.ustensils.map(ust => ust.toLowerCase()).includes(ustensil.name.toLowerCase());
  });
}

function filterByIngredientTags(recipe, queries) {
  return queries.ingredients.length === 0 ||
  queries.ingredients.every(tagIngredient => {
    return recipe.ingredients.some(recipeIngredient => {
      return recipeIngredient.ingredient.toLowerCase() === tagIngredient.name.toLowerCase();
    });
  });
}

function searchQuery(data, queries) {
  return data
    .filter((recipe) => filterByQuery(recipe, queries))
    .filter((recipe) => filterByIngredientTags(recipe, queries))
    .filter((recipe) => filterByApplianceTag(recipe, queries))
    .filter((recipe) => filterByUstensilTags(recipe, queries));
}

searchQuery(data, queries);
