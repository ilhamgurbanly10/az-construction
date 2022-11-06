import MyCarousel from '../sliders/MyCarousel'
import Images from '../files/Images'
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import {api} from '../../api/api';

const HeadSlider = (props) => {

    const {t, i18n} = useTranslation('common');

    const lan = i18next.language;

    const [data, setData] = useState([]);

    const getData = async () => {
        await api.get('main-slider?status=on').then((res)=>{
            setData(res.data)
        }).finally(()=>{ })    
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <section className="head-slider-section overflow-hidden">
            
            <div className="head-slider-section-container position-relative">

                <MyCarousel className="head-slider position-relative layer-2">

                    { data?.map((post , i)=>(

                        <div key={i} className="head-slide position-relative layer-2 pattern-2">
                                        
                            <div className="vh-100 p-5 d-flex flex-column justify-content-center align-items-center align-content-center head-slide-container full-bg-img" style={{backgroundImage: `url(${post.img})`}}>

                                <h1 className="head-slide-title white-bigger-title position-relative layer-2 max-width-2 text-center">
                                    {post[`name_${lan}`]}
                                </h1>

                                <p className="head-slide-text white-bigger-text position-relative layer-2 mt-2 max-width-1 text-center">
                                    {post[`text_${lan}`]}
                                </p>

                                <Link to="/" className="head-slide-btn yellow-btn rounded py-6 px-4 position-relative layer-2 d-inline-block mt-4">
                                    {t('buttons.learnMore')}
                                </Link>

                            </div>
                        
                        </div>

                    ))}
                    
                </MyCarousel>

                <div className="slider-progress-line show"></div>

                <a href="#mainServices" className="white-iconic-btn yellow-color-on-hover down-animation">
                    <i className="fa fa-chevron-down"></i>
                </a>

            </div>   

            <div className="head-slider-bottom bigger-container py-4 bg-yellow d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between">

                <p className="head-slide-bottom-text white-bigger-text max-width-1 my-lg-2 text-center">
                    {t('titles.title01')}
                </p>

                <Link to="/" className="head-slide-btn yellow-btn yellow-btn-white-style rounded py-6 px-5 d-inline-block mt-4 my-lg-2">
                    {t('buttons.getQuote')}
                </Link>

            </div> 

        </section>
    )

}
  
export default HeadSlider;