import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleSubmit = () => {
    let url;
    if (this.state.filters.type==='all'){
      url='/api/pets'
    } else {
      url='/api/pets?type=' + this.state.filters.type
    }
    fetch(url).then(res=>res.json()).then(json=>this.setState({pets:json}))
  }

  handleFilterChange = (filter) => {
    this.setState({
      filters: {
        type: filter
      }
    })
  }

  handleAdopt = (id) => {
    let adoptedPets = this.state.adoptedPets
    this.setState({
      adoptedPets: [...adoptedPets, id]
    })
  }

  componentDidMount(){
    fetch('/api/pets').then(res=>res.json()).then(json=>this.setState({pets:json}))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters handleSubmit={this.handleSubmit} handleFilterChange={this.handleFilterChange}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser adoptedPets={this.state.adoptedPets} onAdopt={this.handleAdopt} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
