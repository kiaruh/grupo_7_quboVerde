import React from 'react';
import ListItem from './ListItem';
// import ListItem from './ListItem';



function Users(props){


    const [usuario, usuarios] = React.useState([])

    React.useEffect(()=> {
        obtenerData()
        
    },[])


    const obtenerData = async() => {
       const data = await fetch('http://localhost:3001/api/users')
       const datajson = await data.json()
       console.log(datajson);
       usuarios(datajson.users)
    }


    return (

		<div className="col-lg-6 mb-4">						
		<div className="card shadow mb-4">
			<div className="card-header py-3">
				<h5 className="m-0 font-weight-bold text-gray-800">Lista de Usuarios registrados</h5>
			</div>
			<div className="card-body">
				<div className="row">
                    <ul>
                        {
                            usuario.map(item=> (
                                <li key={item.id}>User: {item.user} - Email:  {item.email}</li>
                            ))
                        }
                    </ul>

				</div>
			</div>
		</div>
	</div>
    
    )


}
export default Users