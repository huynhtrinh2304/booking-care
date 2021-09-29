import React, { Component } from 'react';
import { connect } from 'react-redux';

// Component
import HomeHeader from './HomeHeader';
import Speciality from './Section/Speciality/Speciality.js';
import MedicalFacility from './Section/MedicalFacility/MedicalFacility.js';
import OutstandingDoctor from './Section/OutstandingDoctor/OutstandingDoctor.js';
import HandBook from './Section/HandBook/HandBook.js';
import About from './Section/About/About';
import Footer from './Footer/Footer';






// Carousel
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";

// Scss
import './HomePage.scss';



class HomePage extends Component {

    render() {

        let settings = {

            infinite: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            // autoplay: true,

        };

        return (
            <div>

                <HomeHeader />

                <Speciality settings={settings} />

                <MedicalFacility settings={settings} />

                <OutstandingDoctor settings={settings} />

                <HandBook />

                <About />

                <Footer />




            </div>
        );
    }

}





const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
