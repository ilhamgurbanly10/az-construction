import { logo } from '../files/Images';
import {useEffect, useRef} from 'react';
import { NavLink, Link  } from "react-router-dom";
import closeNavbarNav from '../navbar/Navbar';
import {useTranslation} from "react-i18next";
import NavbarNav from './NavbarNav';
import SearchForm from '../forms/SearchForm';
import {Cart} from '../elements/Dropdowns';
import {connect} from 'react-redux';


const Navbar = (props) => {

    const {t, i18n} = useTranslation('header');

    const {cartProducts} = props;

    useEffect(() => {
      const toggler = document.querySelector('.navbar-toggler');
      let buttons = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
      const dropdownButtons = document.querySelectorAll('.nav-item .dropdown-item');
      buttons = [...buttons,...dropdownButtons];
      closeNavbarNav(toggler, buttons);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg flex-wrap m-0 py-1 py-lg-3 position-relative bigger-container">

          <div className="navbar-container d-flex flex-wrap justify-content-between align-items-center align-content-center w-100">

            <NavLink className="navbar-brand d-block" to="/#pageFooter">
              <img src={logo} alt="Navbar Brand" className="brand-img-2" />
            </NavLink>
            
            <div className="collapse navbar-collapse mobile-navbar-collapse flex-grow-0 ms-auto"  id="navbarSupportedContent">
              <NavbarNav/>     
            </div>

            <SearchForm/>

            <Cart placement="bottomRight" products={cartProducts}/>

            <button className="navbar-toggler ms-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-line"></span>
            </button>

           

          </div>

        </nav>
    )
}

const mapStateToProps = ({cartProducts}) => {
  return {
      cartProducts
  }
}


export default connect(mapStateToProps , null)(Navbar)