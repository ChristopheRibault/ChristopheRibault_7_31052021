export default class Tag extends HTMLDivElement {

  constructor(id, category, name) {
    super();
    this.id = id;
    this.category = category;
    this.name = name;
    this.classList.add('tag', `tag--${this.category.toLowerCase()}`);
    this.id = `activeTag-${this.category.toLowerCase()}-${name.toLowerCase().replaceAll(' ', '_')}`;

    this.init();
  }

  setText() {
    this.p = document.createElement('p');
    this.p.textContent = this.name;
    this.appendChild(this.p);
  }

  setDeleteBtn() {
    this.button = document.createElement('button');
    const cross = document.createElement('img');
    cross.src = 'assets/close.svg';
    this.button.appendChild(cross);
    this.button.classList.add('tag__xBtn');
    this.appendChild(this.button);
  }

  removeTag() {
    this.remove();
    document.dispatchEvent(
      new CustomEvent(
        'removeTag',
        { detail: {
          id: this.id,
          category: this.category,
        }},
      ),
    );
  }

  init() {
    this.setText();
    this.setDeleteBtn();
    this.button.addEventListener('click', () => this.removeTag());
  }

}
