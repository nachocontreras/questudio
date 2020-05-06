import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Poll from './components/Poll';

const reactAppContainer = document.getElementById('react-app');
if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}

const testContainer = document.getElementById('test-container');
if (testContainer) {
  ReactDOM.render(<Poll {...{
    pollName: testContainer.dataset.pollName,
    pollId: testContainer.dataset.pollId,
    pollDescription: testContainer.dataset.pollDescription,
    sendUrl: testContainer.dataset.sendUrl,
    questionsUrl: testContainer.dataset.questionsUrl,
    currentUser: testContainer.dataset.currentUser
  }}/>, testContainer);
}
