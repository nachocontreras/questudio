import React, { Component } from 'react'

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 2,
          marginTop: 20,
          marginBottom: 0
      }}
  />
);

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
        abcAsc: false,
        attributeFilterName: "",
        attributeAsc: false
      }

      this.loadQuestions = this.loadQuestions.bind(this);
      this.showError = this.showError.bind(this);
      this.onSelectUniversity = this.onSelectUniversity.bind(this);
      this.filterBar = this.filterBar.bind(this);
      this.filterAttribute = this.filterAttribute.bind(this);
      this.onAttributeSelect = this.onAttributeSelect.bind(this);

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
      })
      this.setState({
        results: filteredResults
      })
    }

    filterAttribute() {
      let value = !this.state.attributeAsc;
      this.setState({
        attributeAsc: value,
      })
      this.attributeFilter(this.state.attributeFilterName, value);
    }

    onAttributeSelect(e) {
      let _attributeFilterName = e.target.value;
      this.setState({
        attributeFilterName: _attributeFilterName
      })
      this.attributeFilter(_attributeFilterName, this.state.attributeAsc);
    }

    attributeFilter(attributeFilterName, attributeAsc) {
      let orderResults = this.state.results;
      if (attributeFilterName == "none") {
        orderResults["all"].forEach(obj => {
          obj.show = true;
        });
        // this.abcFilter();
      } else if (attributeFilterName == "vacante") {
        orderResults["all"].forEach(obj => {
          if (obj.data.vacancies != undefined && obj.data.vacancies != -1000000) {
            obj.show = true;
          } else {
            obj.vacancies = -1000000;
            obj.show = false;
          }
        })
        orderResults["all"].sort((a, b) => {
          if (attributeAsc) {
            return a.data.vacancies > b.data.vacancies;
          } else {
            return a.data.vacancies < b.data.vacancies;
          }
        })
      } else if (attributeFilterName == "corte") {
        orderResults["all"].forEach(obj => {
          if (obj.data.minScore != undefined && obj.data.minScore != -1000000) {
            obj.show = true;
          } else {
            obj.minScore = -1000000;
            obj.show = false;
          }
        })
        orderResults["all"].sort((a, b) => {
          if (attributeAsc) {
            return a.data.minScore > b.data.minScore;
          } else {
            return a.data.minScore < b.data.minScore;
          }
        })
      } else if (attributeFilterName == "precio") {
        orderResults["all"].forEach(obj => {
          if (obj.data.price != undefined && obj.data.price != -1000000) {
            obj.show = true;
          } else {
            obj.price = 0;
            obj.show = false;
          }
        })
        orderResults["all"].sort((a, b) => {
          if (attributeAsc) {
            return a.data.price > b.data.price;
          } else {
            return a.data.price < b.data.price;
          }
        })
      }
      this.setState({
        results: orderResults
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
            <span>Seleccionar universidades </span>
            <select onChange={this.onSelectUniversity}>
              <option key="all-universities" value="all">Todas</option>
              {Object.values(this.state.results["universitiesNames"]).map((un) => {
                return <option key={`select-university-${un.id}`} value={`${un.id}`}>{`${un.name}`}</option>
              })}
            </select>
          </div>
          &nbsp;
          &nbsp;
          <div>
            <span>Ordenar por </span>
            <select onChange={this.onAttributeSelect}>
              <option key="none-attribute" value="none">-</option>
              <option key="vacante-attribute" value="vacante">Vacantes</option>
              <option key="corte-attribute" value="corte">Puntaje de corte</option>
              <option key="precio-attribute" value="precio">Precio anual</option>
            </select>
            <span> de </span>
            <button onClick={() => this.filterAttribute()}>
              {(this.state.attributeAsc) ? "Menor a mayor": "Mayor a menor"}
            </button>
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
          <div className='search-element columns'>
            <div className="column is-11">
              {obj.data.name}
              &nbsp;
              {obj.data.vacancies}
              &nbsp;
              {obj.data.minScore}
              &nbsp;
              {obj.data.university.name}
              &nbsp;
              {obj.data.price}
            </div>
            <div className="column is-1">
              <p className="hero is-warning">
                Carrera
              </p>
            </div>
          </div>
          </a>
          )
        } else if (obj.type == 'university' && obj.show){
          return (<a key={`universities-${obj.data.id}`} href={`/universities/${obj.data.id}`}>
          <div className='search-element columns'>
            <div className="column is-11">
              {obj.data.name}
            </div>
            <div className="column is-1">
              <p className="hero is-primary">
                Universidad
              </p>
            </div>
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
          <br />
          {this.filterBar()}
          <ColoredLine color="grey" />
          <br />
          <div>{resultsDiv}</div>
          <br />
        </div>
      )
    }
  }
  