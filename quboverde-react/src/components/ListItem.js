import React from 'react';
import Proptypes from 'prop-types';

function ListItem(props){
    return (
		<div className="col-lg-6 mb-4">
			<div className="card bg-dark text-white shadow">
				<div className="card-body">
					{props.title}
				</div>
			</div>
		</div>
    )

	ListItem.propTypes = {
		title: Proptypes.string,
	}
	
	ListItem.defaultProps = {
		title: "Producto sin título",
	}

}
export default ListItem;