import './APIMock';

export default class EventsHandler {
  
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('newSearch', (e) => {
      fetch(`/api/recipes?q=${e.detail.query}`)
        .then(res => {
          return res.json();
        })
        .then(res => document.dispatchEvent(
          new CustomEvent(
            'newResults',
            { detail: res },
          ),
        ));
    });
  }

}
