import { Server } from 'miragejs';
import data from '../../assets/data/sample';
import SearchEngine from './searchEngine';

export default new Server({
  routes() {
    this.namespace = 'api';

    this.get('/recipes', (_, request) => {
      return new SearchEngine(
        data, 
        request.queryParams,
      ).searchQuery(); 
    });
  },
});
