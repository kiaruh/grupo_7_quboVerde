import React from 'react';
import imagenFondo from '../assets/images/planta.jpg'
import Card from './Card';
import ContenedorHalf from './ContenedorHalf';
import Products from './Products';
import Users from './Users';

function ContentRowTop(){

	const [producto, productos] = React.useState([])
	const [producto2, productos2] = React.useState([])

    React.useEffect(()=> {
        obtenerData()
        
    },[])


    const obtenerData = async() => {
       const data = await fetch('http://localhost:3001/api/products')
       const datajson = await data.json()
       console.log(datajson);
       productos(datajson.countByCategory)
	   productos2(datajson.count)
    }

	const [usuario, usuarios] = React.useState([])

    React.useEffect(()=> {
        obtenerDato()
        
    },[])


    const obtenerDato = async() => {
       const data = await fetch('http://localhost:3001/api/users')
       const datajson = await data.json()
       console.log(datajson);
       usuarios(datajson)
    }



    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Tus métricas</h1>
					</div>
				
					{/*<!-- Content Row -->*/}
					<div className="row">

						<Card title="Total productos" total={producto2}/>
						<Card title="Productos Pet Friendly " total={producto.petFriendly}/>
						<Card title="Productos Easymode" total={producto.easymode}/>
						<Card title="Usuarios totales" total={usuario.count}/>
						<Card title="Ventas del mes" total="120"/>
						<Card title="Saldo total" total="$180.000,-"/>
						
					</div>
					{/*<!-- End movies in Data Base -->*/}
					
	
					{/*<!-- Content Row Last Movie in Data Base -->*/}
					<div className="row">
						
						{/*<!-- Last Movie in DB -->*/}
						<div className="col-lg-6 mb-4">
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800">Producto estrella</h5>
								</div>
								<div className="card-body">
									<div className="text-center">
										<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 40 +'rem'}} src={imagenFondo} alt=" planta "/>
									</div>
									<h4>Cornstalk</h4>
									<p>Tener esta exuberante belleza tropical en tu living es lo más parecido a estar de vacaciones. Tip: Mantenerla en clima cálido y húmedo que tanto le gusta.</p>
									<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">Ver detalle de producto</a>
								</div>
							</div>
						</div>
						{/*<!-- End content row last movie in Data Base -->*/}

						{/*<!-- Genres in DB -->*/}
						<ContenedorHalf/>
						<Users/>
						<Products/>

						
					</div>
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default ContentRowTop;