import { Dropdown } from '../components';
import FilterExtractor from './filterExtractor';
const MIN_LENGTH_SEARCH = 3;

export default class FormHandler {

  constructor() {
    this.searchForm = document.forms.search;
    this.dropdowns = {
      ingredients: new Dropdown('ingredients', 'Ingrédients'),
      appliances: new Dropdown('appliance', 'Appareil'),
      ustensils: new Dropdown('ustensils', 'Ustensiles'),
    };

    this.searchInput = this.searchForm.elements.searchInput;
    this.tagContainer = this.searchForm.elements['tag-ctn'];

    this.inputs = {
      ingredients: this.searchForm.elements.ingredientsInput,
      ustensils: this.searchForm.elements.ustensilsInput,
      appliances: this.searchForm.elements.applianceInput,
    };
    this._queries = {
      query: '',
      ingredients: [],
      applaince: '',
      ustensils: [],
    };
    this.filters = {};
    this.init();
  }

  get queries() {
    return this._queries;
  }

  set queries(data) {
    this._queries = data;
    if (data.query.length >= MIN_LENGTH_SEARCH) {
      this.submitSearch();
    } else {
      this.clearSearch();
    }
  }

  updateLists(data) {
    this.filters = new FilterExtractor().extract(data);
    for (const key in this.dropdowns) {
      this.dropdowns[key].updateList(this.filters[key]);
    }
  }

  submitSearch() {
    document.dispatchEvent(
      new CustomEvent(
        'newSearch',
        { detail: this.queries },
      ),
    );
  }

  clearSearch() {
    document.dispatchEvent(
      new Event('clearSearch'),
    );
    for (const key in this.dropdowns) {
      this.dropdowns[key].updateList([]);
    }
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
        input: this.inputs.ingredients,
        dropdown: this.dropdowns.ingredients,
      },
      appliances: {
        input: this.inputs.appliances,
        dropdown: this.dropdowns.appliances,
      },
      ustensils: {
        input: this.inputs.ustensils,
        dropdown: this.dropdowns.ustensils,
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
    this.searchInput.addEventListener('input', () => this.queries = { query: this.searchInput.value });

    for (const key in this.inputs) {
      this.inputs[key].addEventListener('input', () => this.searchKeywords(key));
    }

    document.addEventListener('newResults', (e) => this.updateLists(e.detail));
  }

}
