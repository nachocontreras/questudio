import React, { Component } from 'react'
import Question from '../components/Question'
import { Redirect } from 'react-router-dom'

export default class Poll extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pollAnswers: {},
        questionsList: [],
        sendUrl: this.props.sendUrl,
        questionsUrl: this.props.questionsUrl,
        currentUser: JSON.parse(this.props.currentUser),
        results: null,
        myResultsUrl: this.props.myResultsUrl,
        redirect: false
      }

      this.handleVote = this.handleVote.bind(this);
      this.loadQuestions = this.loadQuestions.bind(this);
      this.send = this.send.bind(this);
      this.saveButton = this.saveButton.bind(this);
      this.myResultsButton = this.myResultsButton.bind(this);
      this.processResults = this.processResults.bind(this);
      this.reloadPoll = this.reloadPoll.bind(this);
      this.redirectTo = this.redirectTo.bind(this);
      this.completeTest = this.completeTest.bind(this);

    }

    loadQuestions() {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      fetch(this.props.questionsUrl, requestOptions)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          questionsList: data.questionsList
        });
      })
      .catch(error => console.log(error));
      return;
    }
  
    handleVote(voteAnswer, pollNumber) {
      let newPollAnswers = this.state.pollAnswers;
      newPollAnswers[pollNumber] = voteAnswer;
      this.setState({
      // this.state.pollAnswers = newPollAnswers;
      pollAnswers: newPollAnswers,
      });
    }
  
    componentDidMount() {
      this.loadQuestions();
    }

    send() {
      if (!this.state.currentUser) {
        console.log("Inicia sesion");
        return;
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pollId: this.props.pollId,
          answers: this.state.pollAnswers,
          user: this.state.currentUser
        })
      };
      fetch(this.props.sendUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({
          results: data.results
        })        
      })
      .catch(error => console.log(error));
    }

    processResults() {
      if (this.state.results != null) {
        return (
          <div>
            <p>Se han obtenido los siguientes resultados:</p>
            {this.state.results.map(result => {
              return <p key={Math.floor(Math.random() * 10)}>{result}</p>
            })}
          </div>
        )
      }
    }

    reloadPoll() {
      this.setState({
        pollAnswers: {},
        results: null,
      })
    }

    saveButton() {
      if (Object.keys(this.state.pollAnswers).length != this.state.questionsList.length) {
        return (
          <button disabled>Enviar test</button>
        )
      }
      return (
        <button onClick={() => this.send()}>Enviar test</button>
      )
    }

    redirectTo(url) {
      this.setState({
        redirect: true
      })
      window.location.href = url;
    }

    myResultsButton() {
      return (
        <button onClick={() => this.redirectTo(this.state.myResultsUrl)}>Mis resultados anteriores</button>
      )
    }

    completeTest() {
      let newPollAnswers = {};
      this.state.questionsList.forEach(question => {
        let i = Math.random();
        if (i < 0.5) {
          newPollAnswers[question.position] = false;
        } else {
          newPollAnswers[question.position] = true;
        }
      });
      this.setState({
        pollAnswers: newPollAnswers,
      });
    }

    completeTestButton() {
      return (
        <button onClick={() => this.completeTest()}>Completar test aleatorio</button>
      )
    }

    render () {
      const { pollAnswers, questionsList, results } = this.state;

      if (results) {
        return (
          <div>
            {this.processResults()}
            <button onClick={this.reloadPoll}>Hacer de nuevo</button>
          </div>
        )
      }

      let questionsDiv = <div>
      {questionsList.map(question => {
        return <Question defaultValue={pollAnswers[question.position]} key={question.id} question={{...question}} onVote={voteAnswer => this.handleVote(voteAnswer, question.position)} />
      })}
      </div>;
  
      return (
        <div className='app'>
          <header className='header'>
            <h1 className='name'>{this.props.pollName}</h1>
          </header>
          <main className='main'>
            <div>{questionsDiv}</div>
          </main>
          {this.saveButton()}
          {this.myResultsButton()}
          {this.completeTestButton()}
        </div>
      )
    }
  }
  