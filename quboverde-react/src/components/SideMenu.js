import React from 'react';
import Proptypes from 'prop-types';

function SideMenu(props) {

  return (
    <React.Fragment>
      <li className="nav-item">
          <a className="nav-link collapsed" href={props.link}>
              <i className="fas fa-fw fa-folder"></i>
              <span>{props.title}</span>
          </a>
      </li>
    </React.Fragment>
  );

  SideMenu.propTypes = {
		title: Proptypes.string
	}
	
	SideMenu.defaultProps = {
		title: "Item menú",
	}
}

export default SideMenu;
