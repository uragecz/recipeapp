import React, { Component } from 'react'
import './Picture.css';
import ok from '../../assets/ok-button.png';
import cancel from '../../assets/cancel-button.png';

class Picture extends Component {
    constructor (props) {
        super(props)
        this.state = {
            canvas: null,
            context: null,
            listContainer: null,
            height: 0,
            color: "Black",
            lineWidth: 1
        }
        this.drawPatch = this.drawPatch.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.drawPatch = this.drawPatch.bind(this);
        this.closeClickOut = this.closeClickOut.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeLineWidth = this.handleChangeLineWidth.bind(this);
    }
    
    render () {
        return (
            <div id="picture-modal">
                <div className="modal-content">
                    <canvas id="myCanvas" onMouseUp={this.endPatch.bind(this)} onMouseDown={this.beginNewPatch.bind(this)}></canvas>
                    <div id="picture-options">
                        <div className="picture-option color">
                            <div className="option-caption">Barva</div>
                            <select value={this.state.color} onChange={this.handleChangeColor}>>
                                <option value="Black">Černá</option>
                                <option value="Red">Červená</option>
                                <option selected value="Green">Zelená</option>
                                <option value="Blue">Modrá</option>
                            </select>
                        </div>
                        <div className="picture-option lineWidth">
                            <div className="option-caption">Tloušťka</div>
                            <div className="input-range">
                                <div className="range-value">{this.state.lineWidth}</div>
                                <input defaultValue={this.state.lineWidth} type="range" min="1" max="30" value={this.props.lineWidth} step="1" onChange={this.handleChangeLineWidth}/>
                            </div>
                        </div>
                    </div>
                    <div className="picture-edit">       
                        <div className="picture-button save">
                            <img onClick={this.handleClickSave} alt="Save" src={ok} width={45} height={45} />
                        </div>
                        <div className="picture-button cancel">
                            <img onClick={this.handleClickCancel} alt="Cancel" src={cancel} width={45} height={45} />
                        </div>
                    </div> 
                </div>
            </div>
        )
    }

    componentDidMount () {
        let canvas = document.getElementById('myCanvas');
        let context = canvas.getContext('2d');
        let container = document.getElementById("recipeList-container");
        this.setState({
            canvas: canvas,
            context : context,
            listContainer: container
        })
        context.canvas.height = window.innerHeight - 255;
        context.canvas.width = window.innerWidth - 117;
        document.addEventListener('click',this.closeClickOut, false);
    }

   componentWillUnmount () {
      document.removeEventListener("click",this.closeClickOut, false);
   }
   

    closeClickOut(e){
        console.log(e.target.id);
        if(e.target.id === "picture-modal"){
            this.props.closePainting();
            document.removeEventListener("click",this.closeClickOut, false);
        }
    }
    
    beginNewPatch(e){
        let x = e.pageX - this.state.canvas.offsetLeft;
        let y = e.clientY - 120;
        this.state.context.beginPath();
        this.state.context.moveTo(x, y);
        this.state.context.lineWidth = this.state.lineWidth;
        this.state.context.strokeStyle = this.state.color;
        this.state.context.stroke();
        this.state.canvas.addEventListener("mousemove",this.drawPatch, false);
     }

    drawPatch(e){
        let x = e.pageX - this.state.canvas.offsetLeft;
        let y = e.clientY - 120;
        console.log(x,y)
        this.state.context.lineTo(x, y);
        this.state.context.stroke();
     }

    endPatch(e){
        this.state.canvas.removeEventListener("mousemove",this.drawPatch, false);
    }

    handleClickCancel(){
        this.props.closePainting();
    }
    handleClickSave(){
        let canvas = document.getElementById('myCanvas');
        var imgUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        this.props.savePicture(imgUrl);
    }
    handleChangeColor(event) {
        this.setState({color: event.target.value});
    }
    handleChangeLineWidth(event){
        var pattern=/^[0-9]*$/;
        var matches = pattern.exec(event.target.value);
        var matchStatus = Boolean(matches);
        if(matchStatus)
            this.setState({lineWidth: event.target.value});
    }
}


export default Picture