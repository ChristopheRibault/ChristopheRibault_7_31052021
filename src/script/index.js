import FormHandler from './formHandler';
import EventsHandler from './eventsHandler';
import ResultDisplayer from './resultDisplayer';
import { RecipeCard, Dropdown } from '../components';

customElements.define('recipe-card', RecipeCard, { extends: 'div' });
customElements.define('custom-dropdown', Dropdown, { extends: 'div' });

new FormHandler();
new EventsHandler();
new ResultDisplayer();
