import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { getAutocomplete } from '../services/apiRequests'

import '../styles/Autocomplete.css';

const mapStateToProps = (state) => {
  return {
    state
  }
}
function findCityIndex(obj,val) {
  return Object.keys(obj).find(element => obj[element] === val);
}
function createArrayOfDest(array){
    let newArray = [];
    let newArray2 = {};
    array && array.forEach(element => {
        element.LocalizedName && newArray.push(element.LocalizedName);
        if(element.LocalizedName && element.Key){
          const key = element.Key;
          newArray2[key] = element.LocalizedName;
        }
          
    });
    return newArray2;
}

class Autocomplete extends Component {


  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: props.selected,
      userInput: "",
      suggestions:[],
      cityId:""
    };
  }
    getSuggestions(userInput){
    return getAutocomplete(userInput)
  }
  // Event fired when the input value is changed
  onChange = e => {
    const userInput = e.currentTarget.value;
    this.getSuggestions(userInput).then(res => {
      let suggestions = createArrayOfDest(res);
      this.setState({suggestions});
    
    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = Object.values(suggestions).filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: userInput,
      suggestions:suggestions
    });
    });
    
  };

  onClick = e => {
    const userInput = e.currentTarget.innerText;
    const cityId = findCityIndex(this.state.suggestions,userInput); 
    const objN = {};
    objN[cityId] = userInput;
    this.props.selectCity(objN);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: userInput,
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          placeholder="Type city..."
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Autocomplete);