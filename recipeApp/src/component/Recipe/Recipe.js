import React, { Component } from 'react';
import './Recipe.css';

import addImage from '../../assets/image.png';
import edit from '../../assets/editBlack.png';
import remove from '../../assets/cancelBlack.png';
import ok from '../../assets/ok-button.png';
import cancel from '../../assets/cancel-button.png';
import whiteHeart from '../../assets/like.png';
import redHeart from '../../assets/liked.png';
import palette from '../../assets/palette.png';
import Picture from '../Picture/Picture';

class Recipe extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editable: false,
            resources: this.props.recipe.resources,
            caption: this.props.recipe.caption,
            procedure: this.props.recipe.procedure,
            img: this.props.recipe.img,
            animHeart: false,
            liked: this.props.recipe.liked > 0,
            painting: false,
            animLike: this.props.recipe.liked > 0,
            likesCount: this.props.recipe.likesCount
        }
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickAddReview = this.handleClickAddReview.bind(this);
        this.handleClickPainting = this.handleClickPainting.bind(this);
        this.savePicture = this.savePicture.bind(this);
        this.heartDuringAnime = this.heartDuringAnime.bind(this);
    }
    

    componentWillReceiveProps(nextProps){
        if ((nextProps.recipe.liked > 0) !== this.state.liked){
            setTimeout(function() { this.setState({liked: nextProps.recipe.liked > 0, likesCount: nextProps.recipe.likesCount}); }.bind(this), 1000)
        }
    }
    
    render () {
        const {resources, procedure, img, caption} = this.props.recipe;
        const listResources = resources.replace(/\n/g, ",").split(",").map((item) =>
            <li key={item}>{item}</li>
        );
        return (
                <div className="recipe-container">
                    <div className="recipe-top" >
                        <div className="item recipe-image">
                            <div className="lunch-image">
                                <img  onDoubleClick={this.handleClickAddReview} className="launchImg" alt="Lunch" src={this.state.img} height='100%' width= '100%' />
                            </div>
                            {this.state.editable ?
                            <div className="change-image">
                                <div className="image add">
                                    <label htmlFor="file-input">
                                        <img  className="changeImage" alt="Add" src={addImage} height='100%' width= '100%' />
                                    </label>
                                    <input id="file-input" type="file" onChange={this.handleChangeImage}/>
                                </div>
                                <div className="image paint" onClick={this.handleClickPainting}>
                                    <img  className="changeImage" alt="Add" src={palette} height='100%' width= '100%' />
                                </div>
                            </div> : false}
                        </div>
                        <div className="recipe-caption">
                            {this.state.editable ? <textarea  onChange={this.handleChange.bind(this,"caption")} placeholder="Nadpis" value={this.state.caption} className="caption-area" rows="2" /> : <p>{caption}</p>}
                        </div>
                        <div className="options">
                            <div className="remove-edit">
                            <div className="remove" onClick={this.handleClickRemove}>
                                <img alt="Remove" src={remove} width={30} height={30}/>
                            </div>
                            {!this.state.editable ?
                                <div className="edit" onClick={this.handleClickEdit}>
                                    <img alt="Edit" src={edit} width={30} height={30}/>
                                </div>
                            : false}
                            </div>
                            <div className="heart" onClick={this.handleClickAddReview}>
                                <img  className="heartsImg" alt="Likes" src={this.heartDuringAnime()} height='45px' width= '45px' />
                                <div className={this.state.liked ?"like red" : "like white"}>{this.state.likesCount }</div>
                            </div>
                        </div>
                        {this.state.animHeart ?
                        <div className={"animHeart" + (!this.state.animLike ? " unlike" : " like")}><img  className="heartsImg" alt="Likes" src={redHeart} height='100%' width= '100%' /><span>{!this.state.animLike ? "-1": "+1"} </span></div>
                        : false}
                    </div>
                    <div className="recipe-text">
                        <div className="item recipe-resources">
                            <h2>SUROVINY</h2>
                            {this.state.editable ?
                                    <textarea  onChange={this.handleChange.bind(this,"resources")} value={this.state.resources} className="resources-area" rows="10" />
                            : <p>{listResources}</p>
                            }
                        </div>
                        <div className="item recipe-procedure">
                            <h2>POSTUP</h2>
                            {this.state.editable ? <textarea  onChange={this.handleChange.bind(this,"procedure")}  value={this.state.procedure} className="text-area" rows="10" /> : <p>{procedure}</p>}
                        </div>
                    </div>
                    {this.state.editable ?     
                        <dvi className="recipe-edit">       
                            <div className="recipe-save">
                                <img onClick={this.handleClickSave} alt="Save" src={ok} width={45} height={45} />
                            </div>
                            <div className="recipe-cancel">
                                <img onClick={this.handleClickCancel} alt="Cancel" src={cancel} width={45} height={45} />
                            </div>
                        </dvi> 
                    : false}
                     {this.state.painting ? <Picture closePainting={this.handleClickPainting} savePicture={this.savePicture}/> : false}
                </div>
            )
        }

        heartDuringAnime(){
            if(this.state.animHeart){
                if(this.state.liked)
                    return redHeart;
                else
                    return whiteHeart;
            }
            else{
                if(this.state.liked)
                    return redHeart;
                else
                    return whiteHeart
            }
        }

        handleClickAddReview(){
        if(this.state.liked){
             this.setState({
                animHeart : true,
                liked: !this.state.liked,
                animLike: !this.state.animLike,
                likesCount: this.state.likesCount - 1
            });
            setTimeout(function() { 
                this.setState({animHeart: false});
                this.props.thumbDown(this.props.recipe.id);
            }.bind(this), 1500)
        }
        else{
            this.setState({
                animHeart: true,
                animLike: !this.state.animLike
            })
            setTimeout(function() { 
                this.setState({animHeart: false,liked: !this.state.liked, likesCount: this.state.likesCount +1});
                this.props.thumbUp(this.props.recipe.id);
            }.bind(this), 1500)
        }
    }

    handleClickPainting(){
        this.setState({
            painting: !this.state.painting
        })
    }

    savePicture(url){
        this.setState({
            img: url,
            painting: !this.state.painting
        })
    }

    componentDidMount () {
        if(this.props.new){
            this.bottomRecipe.scrollIntoView();
        }
    }

    handleClickRemove(){
        this.props.removeRecipe(this.props.recipe.id);
    }

    handleChangeImage(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                img: reader.result
            })
        }
        reader.readAsDataURL(file)
    }

    handleClickSave(){
        let recipe = {
            id: this.props.recipe.id,
            caption: this.state.caption,
            procedure: this.state.procedure,
            img: this.state.img,
            resources: this.state.resources,
            likesCount: this.state.likesCount,
            liked: this.state.liked
        };
        this.props.save(recipe);
        this.setState({
            editable: !this.state.editable
        })
    }

    handleClickCancel(){
        this.setState({
             id: this.props.recipe.id,
            caption:  this.props.recipe.caption,
            procedure:  this.props.recipe.procedure,
            img:  this.props.recipe.img,
            resources:  this.props.recipe.resources,
            editable: !this.state.editable
        })
    }

    handleChange(atr,e){
        var pattern=/^[a-zA-Z0-9\s,.-:()]*$/;
        var matches = pattern.exec(e.target.value);
        var matchStatus = Boolean(matches);
        if(matchStatus) this.setState({[atr] : e.target.value})
    }

    handleClickEdit(){
        this.setState({
            editable: !this.state.editable,
        })
    }

    closePaiting(){
        this.setState({
            painting: !this.state.painting
        })
    }
}

export default Recipe