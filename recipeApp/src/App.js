import React, { Component } from 'react';
import './App.css';
import RecipeList from './component/RecipeList/RecipeList.js';
import Toaster from './component/Toaster/Toaster.js';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <Toaster />
        <RecipeList />
      </div>
    );
  }
}

export default App;
