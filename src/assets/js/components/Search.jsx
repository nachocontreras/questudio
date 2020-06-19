import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
      super(props);
      const search = this.props.location.search; // could be '?foo=bar'
      const params = new URLSearchParams(search);
      this.state = {
        errorMessage: "No se pudo procesar la búsqueda",
        showErrorMessage: false,
        emptyResult: "No hay resultados",
        searchUrl: "/search",
        params: params,
        searchText: params.get('text'),
        results: {
            "universities": [],
            "careers": [],
            "all" : [],
            "universitiesNames": {}
        },
        removeFilterButton: true,
        abcAsc: false
      }

      this.loadQuestions = this.loadQuestions.bind(this);
      this.showError = this.showError.bind(this);
      this.onSelectUniversity = this.onSelectUniversity.bind(this);
      this.filterBar = this.filterBar.bind(this);

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
        let resu = {
          "universities": universidades,
          "careers": carreras,
          "all": [],
          "universitiesNames": {}
        }
        universidades.forEach(un => {
          resu["all"].push({
            type: "university",
            data: un,
            show: true
          })
          resu["universitiesNames"][un.id] = {
            "name": un.name,
            "id": un.id
          };
        })
        carreras.forEach(ca => {
          resu["all"].push({
            type: "career",
            data: ca,
            show: true
          })
          resu["universitiesNames"][ca.university.id] = {
            "name": ca.university.name,
            "id": ca.university.id
          };
        })
        console.log(resu);
        this.setState({
          results: resu
        });
      })
      .catch(error => console.log(error));
      return;
    }
  
    componentDidMount() {
      this.loadQuestions();
    }

    abcFilter() {
      let orderResults = this.state.results;
      if (!this.state.abcAsc) {
        orderResults["all"] = orderResults["all"].sort((a, b) => a.data.name > b.data.name);
      } else {
        orderResults["all"] = orderResults["all"].sort((a, b) => a.data.name < b.data.name);
      }
      this.setState({
        abcAsc: !this.state.abcAsc,
        results: orderResults
      })
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

    removeFilters() {
      this.setState({
        removeFilterButton: false
      });
    } 

    onSelectUniversity(e) {
      let universityId = e.target.value;
      let filteredResults = this.state.results;
      filteredResults["all"].forEach(obj => {
        if (universityId == "all") {
          obj.show = true;
        } else if (obj.type == "career") {
          if (obj.data.university.id == parseInt(universityId)) {
            obj.show = true;
          } else {
            obj.show = false;
          }
        } else {
          if (obj.data.id == parseInt(universityId)) {
            obj.show = true;
          } else {
            obj.show = false;
          }
        }
        console.log(obj)
      })
      this.setState({
        results: filteredResults
      })
    }

    filterBar() {
      return (
        <div className="filter-bar">
          <div>
            <span>Ordenar por </span>
            <button onClick={() => this.abcFilter()}>
              {(this.state.abcAsc) ? "A-Z": "Z-A"}
            </button>
          </div>
          &nbsp;
          &nbsp;
          <div>
            <span>Seleccionar universidades</span>
            <select onChange={this.onSelectUniversity}>
              <option key="all-universities" value="all">Todas</option>
              {Object.values(this.state.results["universitiesNames"]).map((un) => {
                return <option key={`select-university-${un.id}`} value={`${un.id}`}>{`${un.name}`}</option>
              })}
            </select>
          </div>
        </div>
      )
    }

    render () {
      const { results } = this.state;
      let resultsDiv = <div>
      {results["all"].map((obj) => {
        if (obj.type == 'career' && obj.show) {
          return (<a key={`careers-${obj.data.id}`} href={`/careers/${obj.data.id}`}>
          <div className='search-element'>
              {obj.data.name}
          </div>
          </a>
          )
        } else if (obj.type == 'university' && obj.show){
          return (<a key={`universities-${obj.data.id}`} href={`/universities/${obj.data.id}`}>
          <div className='search-element'>
              {obj.data.name}
          </div>
          </a>
          )
        }
      })}
      </div>
  
      return (
        <div className='app'>
          <br />
          {this.showError()}
          <section className="hero is-primary">
            <div className="hero-body">
                 <div className='title is-2'>Resultados de búsqueda</div>
             </div>
         </section>
          {this.filterBar()}
          <br />
          <div>{resultsDiv}</div>
          <br />
        </div>
      )
    }
  }
  