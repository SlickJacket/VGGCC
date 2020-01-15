import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state= {
    events: [],
    arrayOfLocations: [],
    toggle: false,
    filteredEvents: []
  }

  // Fetching data from github page and saving the array of events in state
  componentDidMount() {
    fetch('https://gist.githubusercontent.com/SlickJacket/3165d3e2605e4f4f29557afaf30a1cc7/raw/ca7ee6f07a4d0ef1cf9b3bbf32b8cc058bc675fe/eventlist.js') 
    .then(res => res.json())
    .then(data => this.setState({events: data.Items}))

}

// Depending on if the toggle has been flipped to true or false, the renderEvents function will render out the User's 
// Filtered events
  renderEvents = () => {
    if (this.state.toggle === true) {
      return this.state.filteredEvents.map(function(item) {
        return <div id="card">
                      <h2>{item.VenueName}</h2>
                      <h3><span style={{color: "#0e1111", textShadow: "none" }}>from  </span>{item.MinPrice}</h3>
                      <p>{item.Date}, {item.Time}</p>
                  </div>
    })
    } else {
      return this.state.events.map(function(item) {
        return <div id="card">
                      <h2>{item.VenueName}</h2>
                      <h3><span style={{color: "#0e1111", textShadow: "none" }}>from  </span>{item.MinPrice}</h3>
                      <p>{item.Date}, {item.Time}</p>
                  </div>
    })
    }
    
      
  }

  // Helper method. This method's purpose is simply to add all of the venue cities to the arrayOfLocations state. 
  locationOptions = () => {
    const arrayOfLocations =this.state.arrayOfLocations
    return this.state.events.map(function(item) {
      arrayOfLocations.push(item.VenueCity);
    })
  }

// Calling the locationOptions method to populate the arrayOfLocations Array
// Then, converting that to a Set in order to filter out the duplicates
// Finally, converting the Set back into an Array to be iterated through for displaying 
// the locations in the dropdown menu
  renderLocations = () => {
    this.locationOptions()
    const uniqueSet = new Set(this.state.arrayOfLocations)
    const backToArray = [...uniqueSet]
        return backToArray.map(function(loc) {
            return <option>{loc}</option>
    })
  }

// Handling the User's click in the dropdown menu. 
// The first conditional is simply checking if the User has selected "All" or not.
// Depending on their choice, then the toggle state will be changed accordingly
// Finally, adding the events of the location the User has chosen to the filteredEvents state to
// be used in the renderEvents method
  handleClick = (e) => {
    e.preventDefault();
    const filteredEvents = this.state.filteredEvents
    this.state.filteredEvents.length = 0
    if (e.target.value != "All") {
      this.setState({toggle: true})
    }else {
      this.setState({toggle: false});
    }
    return this.state.events.map(function(item) {
      if (item.VenueCity === e.target.value) {
        filteredEvents.push(item)
        
      } 
      })
  }



  render() { 
    return ( 

        <div>
          <h1>Elton John</h1>

            <div class="dropdown">
              <button class="dropbtn"  style={{fontWeight: "900"}}>Locations</button>
              <div class="dropdown-content" onClick={this.handleClick}>
                <option>All</option>
                {this.renderLocations()}
              </div>
            </div>

            <div id="cardFlex">
              {this.renderEvents()}
            </div>
        </div>);
  }
}

export default App;
