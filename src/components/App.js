import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = type => {
    this.setState({ filters: { type } })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type !== "all") {
      this.fetchPets(`?type=${this.state.filters.type}`)
      console.log(this.state.pets)
    }
    else {
      this.fetchPets()
    }
  }

  fetchPets = (type="") => {
    fetch('/api/pets' + type)
    .then(res => res.json())
    .then(pets => this.setState({ pets }))
  }

  onAdoptPet = id => {
    const pets = this.state.pets.map(p => {
      if (p.id === id) {
      return {...p, isAdopted: true}
      };
      return p
    })
    console.log(this.state.pets)
      this.setState({ pets })
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
              <Filters onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
