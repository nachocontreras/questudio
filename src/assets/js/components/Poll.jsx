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
        redirect: false,
        showErrorMessage: false,
        errorMessage: '',
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
      this.showError = this.showError.bind(this);

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
        this.setState({
          errorMessage: '*Debes iniciar sesión',
          showErrorMessage: true
        });
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
          <div class="container"> 
            <section class="hero is-success">
              <h1 className="title is-4">Se han obtenido los siguientes resultados:</h1>
            </section>
            
            {Object.keys(this.state.results).map(tipo => {
              console.log(tipo, this.state.results[tipo]);
              return <div class="container">
                <p><strong>{tipo}</strong></p>
                {this.state.results[tipo].map(result => {
                  console.log(result);
                  return <p key={Math.floor(Math.random() * 10)}>{result}</p>
                })}
              </div>
            })}
            <br/>
            <br />
            <p>Busca en los cuadros las Áreas con los intereses y las aptitudes más representativas de cada una, tomando en cuenta que los intereses los encuentras a la izquierda de cada cuadro y las aptitudes al lado derecho de cada grupo.</p>
            <p>Recuerda que tus resultados te entregan las dos mejores categorías. Así, por ejemplo, si tienes una S, debes revisar la tabla de 'Medicina y Cs. De la Salud'</p>
            <img src="https://4.bp.blogspot.com/-Dp3sySSoELg/Vmhni-3_0II/AAAAAAAAAZ4/uNK7CUXiTx8/s1600/Captura%2Bde%2Bpantalla%2B%25281%2529.png"></img>
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
          <button className="button is-light" disabled>Enviar test</button>
        )
      }
      return (
        <button className="button is-light" onClick={() => this.send()}>Enviar test</button>
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
        <button className="button is-light" onClick={() => this.redirectTo(this.state.myResultsUrl)}>Mis resultados anteriores</button>
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
        <button className="button is-light" onClick={() => this.completeTest()}>Completar test aleatorio</button>
      )
    }

    showError() {
      if (this.state.showErrorMessage) {
        return (
          <p>{this.state.errorMessage}</p>
        )
      } else {
        return;
      }
    }

    render () {
      const { pollAnswers, questionsList, results } = this.state;

      if (results) {
        return (
          <div>
            {this.processResults()}
            <br />
            <button className="button is-light" onClick={this.reloadPoll}>Hacer test otra vez</button>
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
            <h1 className='title'>{this.props.pollName}</h1>
          </header>
          <br />
          <div>{questionsDiv}</div>
          <br/>
          <div className="columns">
            {this.saveButton()}
            {this.myResultsButton()}
            {this.completeTestButton()}
          </div>
          <div>
            {this.showError()}
          </div>
        </div>
      )
    }
  }
  