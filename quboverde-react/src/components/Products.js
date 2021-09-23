import React from 'react';


function Products(props){


    const [producto, productos] = React.useState([])

    React.useEffect(()=> {
        obtenerData()
        
    },[])


    const obtenerData = async() => {
       const data = await fetch('http://localhost:3001/api/products')
       const datajson = await data.json()
       console.log(datajson);
       productos(datajson.products)
    }


    return (

		<div className="col-lg-6 mb-4">						
		<div className="card shadow mb-4">
			<div className="card-header py-3">
				<h5 className="m-0 font-weight-bold text-gray-800">Plantas por dificultad</h5>
			</div>
			<div className="card-body">
				<div className="row">
                    <ul>
                        {
                            producto.map(item=> (
                                <li key={item.id}>Nombre: {item.name} - Dificultad: {item.diff}</li>
                            ))
                        }
                    </ul>

				</div>
			</div>
		</div>
	</div>
    
    )


}
export default Products