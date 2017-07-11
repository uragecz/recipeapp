import React, { Component } from 'react';
import './RecipeList.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRecipes, addRecipe, updateRecipe, thumbDown, thumbUp, removeRecipe  } from '../../actions/recipesActions';
import Recipe from '../Recipe/Recipe';
import NewRecipe from '../Recipe/NewRecipe';
import './RecipeList.css';

class RecipeList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            addNew: false
    }
    this.removeRecipe = this.removeRecipe.bind(this);
    this.saveRecipes = this.saveRecipes.bind(this);
    this.thumbDown = this.thumbDown.bind(this);
    this.thumbUp = this.thumbUp.bind(this);
    this.handleClickAddNewRecipe = this.handleClickAddNewRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.cancelNew = this.cancelNew.bind(this);
    this.thumbDown = this.thumbDown.bind(this);
  }
  
    render() {
        const {recipes } = this.props;
        return (
            <div id="recipeList-container">
                {Object.keys(recipes).map((item) => {
                    let model = recipes[item];
                    return(
                        <Recipe save={this.saveRecipes} removeRecipe={this.removeRecipe}  thumbUp={this.thumbUp} thumbDown={this.thumbDown} key={item} recipe={model}/>
                    )
                })}
                {!this.state.addNew ?
                    <div id="addRecipe" onClick={this.handleClickAddNewRecipe}>
                    +
                    </div>
                : <NewRecipe addNew={this.addRecipe} cancel={this.cancelNew}/>}
            </div>
        );
    }

    removeRecipe(id){
        this.props.removeRecipe(id);
    }

    thumbUp(id){
        this.props.thumbUp(id).catch(() =>{
            this.forceUpdate();
        })
    }

    thumbDown(id){
        this.props.thumbDown(id).catch(() =>{
            this.forceUpdate();
        })
    }

    handleClickAddNewRecipe(){
        this.setState({
            addNew: !this.state.addNew
        })
    }

    cancelNew(){
        this.setState({
            addNew: false
        })
    }

    saveRecipes(recipe){
        this.props.updateRecipe(recipe);
    }

    addRecipe(recipe){
        this.setState({
            addNew: !this.state.addNew
        })
        this.props.addRecipe(recipe);
    }
  
    componentWillMount(){
        this.props.fetchRecipes();
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fetchRecipes : fetchRecipes,
        addRecipe : addRecipe, 
        updateRecipe : updateRecipe,
        thumbUp : thumbUp, 
        thumbDown : thumbDown, 
        removeRecipe : removeRecipe
    }, dispatch)
}

function mapStateToProps(state){
    return {
        recipes: state.recipes.recipes
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(RecipeList);
