import React from 'react';
import ListItem from './ListItem';


function ContenedorHalf(props){
    return (
		<div className="col-lg-6 mb-4">						
		<div className="card shadow mb-4">
			<div className="card-header py-3">
				<h5 className="m-0 font-weight-bold text-gray-800">Listado de productos</h5>
			</div>
			<div className="card-body">
				<div className="row">
					<ListItem title="Rojo Congo"/>
					<ListItem title="Umbrella"/>
					<ListItem title="Philodendron"/>
					<ListItem title="Cornstalk"/>
					<ListItem title="Calathea R"/>
					<ListItem title="Pink Dragon"/>
					<ListItem title="Staghorn Fern"/>
					<ListItem title="Velvet Calathea"/>
					<ListItem title="Red Anthurium"/>
					<ListItem title="Pilea"/>
					<ListItem title="Gomero"/>


				</div>
			</div>
		</div>
	</div>
    )


}
export default ContenedorHalf;