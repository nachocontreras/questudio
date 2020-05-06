import React, { Component } from 'react'
import Question from '../components/Question'

export default class Poll extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pollAnswers: {},
        questionsList: [],
      }

      this.handleVote = this.handleVote.bind(this);
      this.loadQuestions = this.loadQuestions.bind(this);

    }

    loadQuestions() {
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
  
    handleVote(voteAnswer, pollAnswers, pollNumber) {
      let newPollAnswers = pollAnswers;
      newPollAnswers[pollNumber] = voteAnswer;
      this.setState({
        pollAnswers: newPollAnswers,
      });
    }
  
    componentDidMount() {
      this.loadQuestions();
    }

    render () {
      const { pollAnswers, questionsList } = this.state

      let questionsDiv = <div>
      {questionsList.map(question => {
        return <Question key={question.id} question={{...question}} onVote={voteAnswer => this.handleVote(voteAnswer, pollAnswers, question.id)} />
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
        </div>
      )
    }
  }
  