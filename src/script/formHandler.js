import { Dropdown } from '../components';
import FilterExtractor from './filterExtractor';
const MIN_LENGTH_SEARCH = 3;

export default class FormHandler {

  constructor() {
    this.searchForm = document.forms.search;
    this.searchInput = this.searchForm.elements.searchInput;
    this.ingredientsDD = new Dropdown('ingredients', 'Ingrédients');
    this.appliancesDD = new Dropdown('appliance', 'Appareil');
    this.ustensilsDD = new Dropdown('ustensils', 'Ustensiles');
    this.ingredientsInput = this.searchForm.elements.ingredientsInput;
    this.ustensilsInput = this.searchForm.elements.ustensilsInput;
    this.applianceInput = this.searchForm.elements.applianceInput;
    this.filters = [];
    this.init();
  }

  updateLists(data) {
    this.filters = new FilterExtractor().extract(data);
    this.ingredientsDD.updateList(this.filters.ingredients);
    this.appliancesDD.updateList(this.filters.appliances);
    this.ustensilsDD.updateList(this.filters.ustensils);
  }

  clearSearch() {
    this.ingredientsDD.updateList([]);
    this.appliancesDD.updateList([]);
    this.ustensilsDD.updateList([]);
  }

  searchRecipes() {
    if (this.searchInput.value.length >= MIN_LENGTH_SEARCH) {
      document.dispatchEvent(
        new CustomEvent(
          'newSearch',
          { detail: this.searchInput.value },
        ),
      );
    } else {
      document.dispatchEvent(
        new Event('clearSearch'),
      );
    }
  }

  searchKeywords(type) {
    const types = {
      ingredients: {
        input: this.ingredientsInput,
        dropdown: this.ingredientsDD,
      },
      appliances: {
        input: this.applianceInput,
        dropdown: this.appliancesDD,
      },
      ustensils: {
        input: this.ustensilsInput,
        dropdown: this.ustensilsDD,
      },
    };

    types[type].dropdown.updateList(
      this.filters[type].filter(item => {
        return item
          .toLowerCase()
          .search(types[type].input.value.toLowerCase())
        !== -1;
      }),
    );
  }

  init() {
    this.searchInput.addEventListener('input', () => this.searchRecipes());

    this.ingredientsInput.addEventListener('input', () => this.searchKeywords('ingredients'));
    this.applianceInput.addEventListener('input', () => this.searchKeywords('appliances'));
    this.ustensilsInput.addEventListener('input', () => this.searchKeywords('ustensils'));

    document.addEventListener('newResults', (e) => this.updateLists(e.detail));
    document.addEventListener('clearSearch', () => this.clearSearch());
  }

}
