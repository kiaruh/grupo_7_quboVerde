import React from 'react';
import image from '../assets/images/logo-qv.png';
import SideMenu from './SideMenu';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href='http://localhost:3001/'>
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="quboverde"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <a className="nav-link" href="http://localhost:3001/admin/panel">
                        <span>Volver a panel de admin</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Acciones</div>

                {/*<!-- Nav Item -->*/}
                <SideMenu title="Productos" link="http://localhost:3001/products/mod/"/>
                <SideMenu title="Lista de precios"link="http://localhost:3001/products/price/"/>
                <SideMenu title="Customización"/>
                <SideMenu title="Métricas"/>
                <SideMenu title="Permisos" link="http://localhost:3001/products/admin/"/>

                

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}
            
        </React.Fragment>
    )
}
export default SideBar;