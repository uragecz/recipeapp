import React, { Component } from 'react'
import { connect } from 'react-redux';
import './Toaster.css';
import { bindActionCreators } from 'redux';
import { printError, hideError  } from '../../actions/toasterActions';

class Toaster extends Component {
    render () {
        const {message, error} = this.props;
        console.log('message : ',this.props.message)
        if (error){
            return(
                <div className="toaster">
                    {message}
                </div>
            )
        }
        else return(false);
      }

    componentDidUpdate () {
        if(this.props.error) setTimeout(function() {this.props.hideError() }.bind(this), 3000);
     }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({printError : printError, hideError : hideError}, dispatch)
}

function mapStateToProps(state){
  return {
    message: state.toaster.message,
    error: state.toaster.error
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Toaster);

