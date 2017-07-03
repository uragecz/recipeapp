import React, { Component } from 'react';
import ok from '../../assets/ok-button.png';
import cancel from '../../assets/cancel-button.png';
import addImage from '../../assets/image.png';
import palette from '../../assets/palette.png';
import Picture from '../Picture/Picture';

class NewRecipe extends Component {
    constructor (props) {
        super(props)
        this.state = {
            resources: "",
            caption: "",
            procedure: "",
            img: "",
            painting: false
        }
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleClickPainting = this.handleClickPainting.bind(this);
        this.savePicture = this.savePicture.bind(this);
    }
    
    render () {
        return (
                <div className="recipe-container" ref={(el) => { this.bottomRecipe = el; }}>
                    <div className="recipe-top" >
                        <div className="item recipe-image">
                            {this.state.img ? 
                            <div className="lunch-image">
                                <img  className="addImage" alt="Lunch" src={this.state.img} height='100%' width= '100%' />
                            </div> : false}
                            <div className={this.state.img ? "change-image" : "change-image new"}>
                                <div className="image add">
                                    <label htmlFor="file-input">
                                        <img  className="changeImage" alt="Add" src={addImage} height='100%' width= '100%' />
                                    </label>
                                    <input id="file-input" type="file" onChange={this.handleChangeImage}/>
                                </div>
                                <div className="image paint" onClick={this.handleClickPainting}>
                                    <img  className="changeImage" alt="Paint" src={palette} height='100%' width= '100%' />
                                </div>
                            </div>
                        </div>
                        <div className={"recipe-caption" + (this.state.img ? "" : " new")}>
                            <textarea  onChange={this.handleChange.bind(this,'caption')} placeholder="Nadpis" value={this.state.caption} className={"caption-area" + (this.state.img ? "" : " new")} rows="3" />   
                        </div>
                    </div>
                    <div className="recipe-text">
                        <div className="item recipe-resources">
                                <textarea  onChange={this.handleChange.bind(this,'resources')} placeholder="Suroviny" value={this.state.resources} className="resources-area" rows="10" />
                            </div>
                        <div className="item recipe-procedure">
                            <textarea  onChange={this.handleChange.bind(this,'procedure')} placeholder="Postup" value={this.state.procedure} className="text-area" rows="10" />
                        </div>
                        </div>
                   <dvi className="recipe-edit">       
                            <div className="recipe-save">
                                <img onClick={this.handleClickSave} alt="Save" src={ok} width={45} height={45} />
                            </div>
                            <div className="recipe-cancel">
                                <img onClick={this.handleClickCancel} alt="Cancel" src={cancel} width={45} height={45} />
                            </div>
                    </dvi> 
                    {this.state.painting ? <Picture closePainting={this.handleClickPainting} savePicture={this.savePicture}/> : false}
            </div>
        )
    }

    savePicture(url){
        this.setState({
            img: url,
            painting: !this.state.painting
        })
    }

    handleClickSave(){
        let recipe = {
            caption: this.state.caption,
            procedure: this.state.procedure,
            img: this.state.img,
            resources: this.state.resources
        };
        this.props.addNew(recipe);
    }

    handleClickCancel(){
        this.props.cancel();
    }

     handleChangeImage(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(reader,file);
        reader.onloadend = () => {
            var image = new Image();
            image.src = reader.result;
            image.onload = function() {
                console.log(image.width);
            };
            this.setState({
                img: reader.result
            })
        }
        reader.readAsDataURL(file)
    }

   handleChange(atr,e){
        var pattern=/^[a-zA-Z0-9\s,\.\-\:\(\)]*$/;
        var matches = pattern.exec(e.target.value);
        var matchStatus = Boolean(matches);
        if(matchStatus){
             this.setState({
                [atr] : e.target.value
            })
        }
    }

    componentDidMount () {
        this.bottomRecipe.scrollIntoView();
    }

    handleClickPainting(){
        this.setState({
            painting: !this.state.painting
        })
    }
    
}

export default NewRecipe