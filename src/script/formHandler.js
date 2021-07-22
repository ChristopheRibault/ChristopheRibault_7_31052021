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
    this._query = '';
    this.tags = {
      ingredients: [],
      appliance: [],
      ustensils: [],
    };
    this.filters = {};
    this.init();
  }

  get query() {
    return this._query;
  }

  set query(data) {
    if (data.length >= MIN_LENGTH_SEARCH) {
      this._query = data;
      this.submitSearch();
    } else {
      this.clearSearch();
    }
  }

  handleNewTag(tag) {
    this.tags[tag.category].push(tag);
    this.submitSearch();
  }

  handleRemoveTag(tag) {
    const index = this
      .tags[tag.category]
      .findIndex(el => el.id === tag.id);
    this.tags[tag.category].splice(index, 1);
    this.submitSearch();
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
        { detail: {
          query: this.query,
          tags: this.tags,
        }},
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

  async searchKeywords(type) {
    let tags = this.filters;
    if (!tags || !tags.length) {
      tags = await fetch('/api/tags')
        .then(res => {
          return res.json();
        });
    }

    this.dropdowns[type].updateList(
      tags[type].filter(item => {
        return item
          .toLowerCase()
          .search(this.inputs[type].value.toLowerCase())
        !== -1;
      }),
    );
  }

  init() {
    this.searchInput.addEventListener('input', () => this.query = this.searchInput.value);

    for (const key in this.inputs) {
      this.inputs[key].addEventListener('input', () => this.searchKeywords(key));
    }

    document.addEventListener('newTag', (e) => this.handleNewTag(e.detail));
    document.addEventListener('removeTag', (e) => this.handleRemoveTag(e.detail));

    document.addEventListener('newResults', (e) => this.updateLists(e.detail));
  }

}
