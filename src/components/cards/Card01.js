import {useTranslation} from "react-i18next";
import { Image } from 'antd';

const Card01 = (props) => {

    const {t, i18n} = useTranslation('common');

    const { img, name, year, className, price, length, category, imgClassName, productId, btnFunction, values, btnContent, useBtn } = props;

    return (
        <div key={productId} className={`post d-flex flex-column align-items-start justify-content-start ${className}`}>
            
            <Image
                className={`post-img cover-img-4 small-on-hover ${imgClassName}`}
                alt="Post Image"
                src={img}
            />

            <h3 className="post-title grey-title bigger-font mt-4 mb-0">
                {name}
            </h3>

            <p className="post-text grey-text mt-2">
               <strong className="me-2">{t('titles.price')}:</strong> {length} × ${price * length}
            </p>

            <p className="post-text grey-text mt-2">
                <strong className="me-2">{t('titles.year')}:</strong> {year}
            </p>

            { useBtn &&
                <button type="button" onClick={() => btnFunction({...values, category})} className="post-btn yellow-btn mt-3 rounded">
                    {btnContent}
                </button>
            }
            
        </div>
    )

}

export default Card01;