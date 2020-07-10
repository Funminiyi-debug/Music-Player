import React from 'react'
import {NavLink} from 'react-router-dom'

const Footer = () => {
    
    return (
        <div className="footer">
            <div >
                <NavLink 
                    to="/" 
                    activeClassName="active" 
                    className="fas fa-music" 
                    exact 
                >
                </NavLink>
            </div>
            <div><NavLink 
                to="/User" 
                className="fas fa-user" 
                exact 
              >
            </NavLink></div>
            <div><NavLink 
                to="/List" 
                className="fas fa-list-ul" 
                exact
              >
            </NavLink></div>
            <div><NavLink 
                to="/Search" 
                className="fas fa-search" 
                exact
                >
            </NavLink></div>
        </div>
    )
}               

export default Footer