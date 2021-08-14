import './APIMock';

export default class EventsHandler {
  
  constructor() {
    this.init();
  }

  createUrl(data) {
    let url = '/api/recipes?';
    if (data.query) url += `q=${data.query}&`;
    if (data.tags) {
      for (const key in data.tags) {
        url += `${key}=${JSON.stringify(data.tags[key])}&`;
      }
    }

    if (url.endsWith('&')) return url.slice(0, -1);

    return url;
  }

  sendRequest(data) {
    const url = encodeURI(this.createUrl(data));
    console.time('x');
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(res => document.dispatchEvent(
        new CustomEvent(
          'newResults',
          { detail: res },
        ),
      ));
    console.timeEnd('x');
  }

  init() {
    document.addEventListener('newSearch', (e) => this.sendRequest(e.detail));
  }

}
