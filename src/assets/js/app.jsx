import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import Poll from './components/Poll';
import Search from './components/Search';

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
    myResultsUrl: testContainer.dataset.myResults,
    currentUser: testContainer.dataset.currentUser
  }}/>, testContainer);
}

const searchContainer = document.getElementById('search-component');
if (searchContainer) {
  ReactDOM.render(<BrowserRouter> <Route path="/search" component={Search} /> </BrowserRouter>, searchContainer);
}