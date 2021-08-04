export default class RecipeCard extends HTMLDivElement {

  constructor(data) {
    super();
    this._data = data;
    this.classList.add('recipe-card');
    this.init();
  }

  get data() {
    return this._data;
  }

  set data(_) {
    throw new Error('Can\'t set data');
  }

  setImage(src = '') {
    this.image = document.createElement('img');
    this.image.classList.add('recipe-card__img');
    this.image.setAttribute('src', src);
    this.appendChild(this.image);
  }

  setBody() {
    this.cardBody = document.createElement('div');
    this.cardBody.classList.add('recipe-card__body');
    this.appendChild(this.cardBody);
  }

  setName(name = '') {
    this.name = document.createElement('h3');
    this.name.classList.add('recipe-card__title');
    this.name.textContent = name;
    this.cardBody.appendChild(this.name);
  }

  setTime(time = '') {
    this.time = document.createElement('div');
    this.time.classList.add('recipe-card__time');

    this.timeIcon = document.createElement('img');
    this.timeIcon.setAttribute('src', 'assets/time.svg');
    this.timeIcon.classList.add('recipe-card__time-icon');

    this.timeText = document.createElement('span');
    this.timeText.classList.add('recipe-card__time-txt');
    this.timeText.textContent = `${time} min`;

    this.time.append(this.timeIcon, this.timeText);
    this.cardBody.appendChild(this.time);
  }

  setIngredients(ingredients = []) {
    this.ingredientsContainer = document.createElement('ul');
    this.ingredientsContainer.classList.add('recipe-card__ingredients-ctn');

    ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.classList.add('recipe-card__ingredient');
      li.innerHTML = `
        <strong>${ingredient.ingredient} </strong>
        ${ingredient.quantity ? `: ${ingredient.quantity}`: ''} 
        ${ingredient.unit || ''}
      `;
      this.ingredientsContainer.appendChild(li);
    });
    this.cardBody.appendChild(this.ingredientsContainer);
  }

  setDescription(description = '') {
    this.descriptionContainer = document.createElement('div');
    this.descriptionContainer.classList.add('ellipsis', 'recipe-card__instructions');
    this.description = document.createElement('p');
    this.description.textContent = description;
    this.descriptionContainer.appendChild(this.description);
    this.cardBody.appendChild(this.descriptionContainer);
  }

  init() {
    this.setImage();
    this.setBody();
    this.setName(this.data.name);
    this.setTime(this.data.time);
    this.setIngredients(this.data.ingredients);
    this.setDescription(this.data.description);
  }

}
