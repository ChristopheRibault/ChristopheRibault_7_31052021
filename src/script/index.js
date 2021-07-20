import FormHandler from './formHandler';
import EventsHandler from './eventsHandler';
import ResultDisplayer from './resultDisplayer';
import { RecipeCard, Dropdown, Tag } from '../components';

customElements.define('recipe-card', RecipeCard, { extends: 'div' });
customElements.define('custom-dropdown', Dropdown, { extends: 'div' });
customElements.define('custom-tag', Tag, { extends: 'div' });

new FormHandler();
new EventsHandler();
new ResultDisplayer();
