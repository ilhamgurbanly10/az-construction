import {useTranslation} from "react-i18next";
import i18next from "i18next";
import { Spin } from 'antd';
import Card01 from '../cards/Card01'

const ProductsList = (props) => {

    const {className, products, myFunction, subtotal, spinning, totalLength} = props;
    
    const {t, i18n} = useTranslation('common');

    const lan = i18next.language;
                     
    return (
        <div className={`products ${className}`}>

            <h3 className="products-title yellow-underline underline-left border-bottom-lightgrey-3 grey-title">
                {t('titles.productsInCart')}
            </h3>

            <h3 className="grey-title w-100 mt-5">{ products.length < 1 ? t('texts.cartIsEmpty') : t('texts.productLength') + ": " + totalLength }</h3>

            <div className="spin-container yellow-spin">
                <Spin spinning={spinning}/>
            </div>

            <div className="products-list list-3 mt-5 ant-img-style">

                {products?.map((post, i) => (
                    <Card01
                        key={i}
                        className="products-item"
                        imgClassName="" 
                        name={post[0][`name_${lan}`]}
                        img={post[0].img}
                        year={post[0].year}
                        price={post[0].price}
                        category={post[0].category}
                        productId={post[0].id}
                        values={post[0]}
                        length={post.length}

                    />
                ))}

            </div>

            { products.length > 0 && <h3 className="grey-title w-100 mt-5">{ `${t('titles.subtotal')}: $${subtotal}`  }</h3> }

        </div>
    )

}

export default ProductsList;