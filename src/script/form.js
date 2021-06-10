const MIN_LENGTH_SEARCH = 3;

export default class FormHandler {

  constructor() {
    this.searchForm = document.forms.search;
    this.searchInput = this.searchForm.elements.searchInput;
    this.init();
  }

  init() {
    this.searchInput.addEventListener('input', () => {
      if (this.searchInput.value.length >= MIN_LENGTH_SEARCH) {
        document.dispatchEvent(
          new CustomEvent(
            'newSearch',
            { detail: this.searchInput.value },
          ),
        );
      }
    });
  }

}
