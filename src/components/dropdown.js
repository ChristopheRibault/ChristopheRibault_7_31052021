export default class Dropdown extends HTMLDivElement {

  constructor(category = '', displayName) {
    super();
    this.category = category;
    this.displayName = displayName;
    this.id = `dropdown-${category.toLowerCase()}`;
    this.classList.add('dropdown', `dropdown--${category.toLowerCase()}`);
    this.init();
  }

  updateList(tags = []) {
    this.tagList.innerHTML = '';
    tags.forEach(tag => {
      const li = document.createElement('li');
      li.id = `tag-${this.category.toLowerCase()}-${tag.toLowerCase().replaceAll(' ', '_')}`;
      li.classList.add('dropdown__tag');
      li.textContent = tag;
      this.tagList.appendChild(li);
    });
  }

  expand(e) {
    e.preventDefault();
    this.content.style.display = 'block';
    this.button.style.display = 'none';
  }

  collapse(e) {
    e.preventDefault();
    this.content.style.display = 'none';
    this.button.style.display = 'block';
  }

  setButton() {
    this.button = document.createElement('button');
    this.button.classList.add('dropdown__btn');
    this.button.textContent = this.displayName || this.category;
    this.button.addEventListener(
      'click',
      (e) => this.expand(e),
    );
    this.appendChild(this.button);
  }

  setBody() {
    this.content = document.createElement('div');
    this.content.classList.add('dropdown__content');
    this.appendChild(this.content);
  }

  setInput() {
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.name = `${this.category.toLowerCase()}Input`;
    this.input.classList.add('dropdown__input');
    this.input.setAttribute(
      'placeholder',
      `Rechercher un ${this.category.toLowerCase()}`,
    );
    this.content.appendChild(this.input);
  }

  setCollapseArrow() {
    this.collapseArrow = document.createElement('div');
    this.collapseArrow.classList.add('dropdown__collapse');
    this.collapseArrow.addEventListener(
      'click',
      (e) => this.collapse(e),
    );
    this.content.appendChild(this.collapseArrow);
  }

  setTagList() {
    this.tagList = document.createElement('ul');
    this.tagList.classList.add('dropdown__list');
    this.content.appendChild(this.tagList);
  }

  init() {
    this.setButton();
    this.setBody();
    this.setInput();
    this.setCollapseArrow();
    this.setTagList();
    document.getElementById('dropdown-ctn').appendChild(this);
  }

}
