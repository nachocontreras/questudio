import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
      super(props);
      const search = this.props.location.search; // could be '?foo=bar'
      const params = new URLSearchParams(search);
      this.state = {
        showErrorMessage: "No se pudo procesar la búsqueda",
        emptyResult: "No hay resultados",
        searchUrl: "/search",
        params: params,
        searchText: params.get('text'),
        results: {
            "universities": [],
            "careers": []
        }
      }

      this.loadQuestions = this.loadQuestions.bind(this);
      this.showError = this.showError.bind(this);

    }

    loadQuestions() {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      fetch(this.state.searchUrl + "?text=" + this.state.searchText, requestOptions)
      .then(response => response.json())
      .then((data) => {
        let universidades = data.data["Universidades"] || [];
        let carreras = data.data["Carreras"] || [];
        this.setState({
          results: {
            "universities": universidades,
            "careers": carreras,
          }
        });
      })
      .catch(error => console.log(error));
      return;
    }
  
    componentDidMount() {
      this.loadQuestions();
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
      const { results } = this.state;
      let universityDiv = <div>
        <section className="hero is-primary">
            <div className="hero-body">
                <div className='title is-2'>Universidades</div>
            </div>
        </section>
        {results["universities"].map((university) => {
        return (<a key={`universities-${university.id}`} href={`/universities/${university.id}`}>
            <div className='search-element'>
                {university.name}
            </div>
            </a>
            )
        })}
      </div>;
      let careersDiv = <div>
      <section className="hero is-warning">
          <div className="hero-body">
              <div className='title is-2'>Carreras</div>
          </div>
      </section>
      {results["careers"].map((career) => {
        return (<a key={`careers-${career.id}`} href={`/careers/${career.id}`}>
        <div className='search-element'>
            {career.name}
        </div>
        </a>
        )
        })}
    </div>
  
      return (
        <div className='app'>
          <br />
          <header className='header'>
            <h1 className='title is-1'>Resultados de búsqueda</h1>
          </header>
          <br />
          <div>{universityDiv}</div>
          <br/>
          <div>{careersDiv}</div>
          <br />
          <div>
            {this.showError()}
          </div>
        </div>
      )
    }
  }
  