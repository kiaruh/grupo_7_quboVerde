import React, { Component } from 'react';
import Proptypes from 'prop-types';


class Contador extends Component {
	constructor (props) {
		super (props);
		this.state = {
			valor: props.inicial,
		}
	}

	aumentarValor(){
		this.setState({
			valor: this.state.valor + 1
		})
	}

	render(){
		return(
			<div>
				<h1> {this.state.valor} </h1>
				<button onClick={ ()=> this.aumentarValor()}>
					Agregar</button>
			</div>
		)
	}
}

export default Contador;