$(document).ready(function() {
  addToViewCounter();
});

const addToViewCounter = () => {
  if (sessionStorage) {
    if (!sessionStorage.getItem('view-counter')) {
      const url =
        'https://mn7724hpl4.execute-api.ca-central-1.amazonaws.com/Prod/new-view';

      const timestamp = Date.now(); // in millis
      const randomId = Math.floor(Math.random() * 99);
      const id = `${timestamp}-${randomId}`;
      const hostname = window.location.hostname || 'unknown';

      const postBody = { id, hostname };
      const postFormData = Object.keys(postBody)
        .map(key => {
          return (
            encodeURIComponent(key) + '=' + encodeURIComponent(postBody[key])
          );
        })
        .join('&');

      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postFormData,
      })
        .then(response => {
          if (response.status === 200 || response.status === '200') {
            console.log('Success adding to view-counter');
            sessionStorage.setItem('view-counter', 'true');
          }
        })
        .catch(error => {
          console.log('Error adding view-counter', error);
        });
    }
  }
};

const getTotalViewCount = () => {
  const url =
    'https://mn7724hpl4.execute-api.ca-central-1.amazonaws.com/Prod/views';

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain',
    },
  })
    .then(response => {
      if (response.status === 200 || response.status === '200') {
        if (response.text) {
          return response.text();
        }
      }
    })
    .then(responseText => {
      const totalViewCountString = `${responseText} page views`;
      console.log(totalViewCountString);
      $('#view-count').html(totalViewCountString);
    })
    .catch(error => {
      console.log('Error reading total view count', error);
    });
};
getTotalViewCount();
