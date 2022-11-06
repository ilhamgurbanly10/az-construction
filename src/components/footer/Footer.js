import { Languages } from "../elements/Dropdowns";
import {useTranslation} from "react-i18next";
import Images from "../files/Images";
import { Link } from "react-router-dom";
import {AboutUsList, CompanyLinksList, ContactInfoList} from '../elements/Lists'

const Footer = () => {

    const {t, i18n} = useTranslation('common');

    return (
        <footer className='footer mt-7' id="pageFooter">      

            <div className="footer-container bigger-container py-8 bg-black  d-flex flex-column flex-lg-row justify-content-start justify-content-lg-between align-items-start row w-100 gx-0">
                <AboutUsList/>
                <CompanyLinksList/>
                <ContactInfoList/>
            </div>

            <div className="footer-bottom-box bigger-container py-4 bg-black-2 d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center">

                <p className="footer-text grey-text small-font text-center text-lg-start darkgrey-color-2 mb-3 mb-lg-0">
                    {t('texts.rights')}
                </p>

                <Languages placement="top" />

            </div>

        </footer>
    );
}
  
export default Footer;