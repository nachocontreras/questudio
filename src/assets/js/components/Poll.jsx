import React, { Component } from 'react'
import Question from '../components/Question'

export default class Poll extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pollAnswers: {},
        questionsList: [],
        sendUrl: this.props.sendUrl,
        questionsUrl: this.props.questionsUrl,
        currentUser: JSON.parse(this.props.currentUser),
        results: null
      }

      this.handleVote = this.handleVote.bind(this);
      this.loadQuestions = this.loadQuestions.bind(this);
      this.send = this.send.bind(this);
      this.saveButton = this.saveButton.bind(this);
      this.processResults = this.processResults.bind(this);
      this.reloadPoll = this.reloadPoll.bind(this);

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
      this.setState({
        questionsList: [
          {
            id: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: "¿Aceptarías trabajar escribiendo artículos en la sección económica de un diario?",
            vocationalTestId: 1,
            allowMultiple: false,
            questionType: "true-false"
          },
          {
            id: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: "¿Te ofrecerías para organizar la despedida de soltero de uno de tus amigos?",
            vocationalTestId: 1,
            allowMultiple: false,
            questionType: "true-false"
          },
          {
            id: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: "¿Te gustaría dirigir un proyecto de urbanización en tu provincia?",
            vocationalTestId: 1,
            allowMultiple: false,
            questionType: "true-false"
          },
          {
            id: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: "¿A una frustración siempre opones un pensamiento positivo?",
            vocationalTestId: 1,
            allowMultiple: false,
            questionType: "true-false"
          },
          {
            id: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: "¿Te dedicarías a socorrer a personas accidentadas o atacadas por asaltantes?",
            vocationalTestId: 1,
            allowMultiple: false,
            questionType: "true-false"
          }
        ]
      });
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
          pollId: this.state.pollId,
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
      return (
        <button onClick={() => this.send()}>Enviar</button>
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
        return <Question key={question.id} question={{...question}} onVote={voteAnswer => this.handleVote(voteAnswer, question.id)} />
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
        </div>
      )
    }
  }
  