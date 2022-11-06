import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Popconfirm, notification } from 'antd';
import React, {useState, useEffect } from 'react';
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {api} from '../../api/api'
import {WarningOutlined, SmileOutlined} from '@ant-design/icons';


export const Languages = (props) => {
    
    const {t, i18n} = useTranslation('footer');

    const {placement} = props;

    const changeLan = (lan) => {
        i18n.changeLanguage(lan);
        localStorage.setItem('locale', lan);
    }

    const locale = localStorage.getItem('locale').toUpperCase();
    
    const langueageButtons = (
      <Menu
        items={[
          {
            key: '1',
            label: (
                <button onClick={() => { changeLan('az') }} className="btn btn-warning mt-2 mb-2">AZ</button>
            ),
          },
          {
            key: '2',
            label: (
                <button onClick={() => { changeLan('de') }} className="btn btn-warning mb-2">DE</button>
            ),
          },
          {
            key: '3',
            label: (
                <button onClick={() => { changeLan('en') }} className="btn btn-warning">EN</button>
            ),
          },
        ]}
      />
    );


    return (
        <>   
            <Dropdown
                overlay={langueageButtons}
                placement={placement}
                arrow={{
                    pointAtCenter: true,
                }}
            >
                <Button className="btn-4">{locale}</Button>
            </Dropdown>   
        </>
    ) 

}

export const Cart = (props) => {

    const {t, i18n} = useTranslation('common');

    const {placement, products} = props;

    const lan = i18next.language;

    const [cart, setCart] = useState([]);

    const [cartLength, setCartLength] = useState(0);

    const [subtotal, setSubtotal] = useState(0);

    
    const getCart = async () => {
        await api.get('cart').then((res)=>{
          createCart(res.data)
        }).finally(()=>{ })    
    }

    let productsInCart = [];
    let productKeys = [];
    let price = 0;

    const createCart = (data) => {

      for (let i = 0, x = 0; i < data.length; i++) {
        
        const info = findKey(data[i].productId);

        if (info.has) {
          productsInCart[info.key].push({...data[i]})
        } else {
          productKeys.push({key: x, id: data[i].productId})
           productsInCart[x] = [];
           productsInCart[x].push(data[i])
           x++;
        }
        price += Number(data[i].price);
        data.length < 1 ? setSubtotal(0) : setSubtotal(price);
        setCartLength(i + 1);
          
      }
     
      setCart(productsInCart)

    }

    const findKey = (index) => {

      let key = {};
      key.has = false;

      for (let i = 0; i < productKeys.length; i++) {
       
        if (productKeys[i].id == index) {
          key.id = productKeys[i].id;
          key.key = productKeys[i].key;
          key.has = true;
          break;
        }    
        
      }

      return key;

    }

    const deleteFromCart = async (id) => {
      
      await api.delete(`/cart/${id}`).then((res)=>{
          notification.open({
            message: t('texts.successfullyDeleted'),
            icon: <WarningOutlined style={{ color: '#108ee9' }} />,
          });
      }).catch(()=>{
          notification.open({
            message: t('texts.errorOccured'),
            icon: <WarningOutlined style={{ color: '#108ee9' }} />,
          });
      }).finally(()=>{
        setSubtotal(0)
        setTimeout(() => { window.location.reload() }, 1000)
      })

    } 

    useEffect(() => {
      getCart();
    }, [subtotal]);


    const cartContent = (
      <Menu
        items={[
          {
            key: '1',
            label: (<div className="items-container scroll-height">

            <h3 className="grey-title w-100 mt-2 mb-2 normal-font">{ cart.length < 1 ? t('texts.cartIsEmpty') : t('texts.productLength') + ": " + cartLength }</h3>

                { cart?.map((c , i)=>(
                   
                <div key={i} className="cart-item border-bottom-lightgrey-2 py-3 normal-min-width d-flex justify-content-start align-items-center">
                  
                    <Link to="/">
                        <img src={c[0].img} alt="Product Img" className="cart-img small-img me-3" />
                    </Link>

                    <div className="cart-container">

                        <Link to="/" className="d-block cart-title black-btn">
                          {c[0][`name_${lan}`]}
                        </Link>

                        <p className="cart-price grey-text">
                            {c.length} × {products[0].money + c.length * c[0].price}
                        </p>

                    </div>

                    <Popconfirm 
                      title={t('texts.areYouSure')} 
                      okText={t('texts.yes')} 
                      cancelText={t('texts.no')}
                      onConfirm={ ()=>{deleteFromCart(c[c.length - 1].id)} }
                      >
                        <button className="ms-auto smaller-font white-iconic-btn">
                          <i className="fa fa-times red-color"></i>
                        </button>
                    </Popconfirm>
                    
                </div>

              ))}

              </div>  
            ),
          },
          {
            key: '4',
            label: (
                <div className="cart-item mt-4 normal-min-width">
                  { cart.length > 0 &&
                    <p className="cart-subtotal grey-text">
                        <span className="fw-bold black-color">{t('titles.subtotal')}: </span>
                        $ {subtotal}
                    </p>
                  }
                </div>
            ),
          },
          {
            key: '5',
            label: (
                <div className="cart-item mt-4 row gx-0 mx-auto w-100 align-items-center justify-content-between normal-min-width">

                    <Link to="/cart" className="yellow-btn px-0 col me-2">
                      {t('buttons.viewCart')}
                    </Link>

                    <Link to="/checkout" className="yellow-btn px-0 col ms-2">
                      {t('buttons.checkout')}
                    </Link>

                </div>
            ),
          }
        ]}
      />
    );

    return (
        <div className="cart-container me-3 me-lg-0 ms-auto ms-lg-0">

          <Dropdown
                overlay={cartContent}
                placement={placement}
                arrow={{
                    pointAtCenter: true,
                }}
                className="p-6"
            >
                <Button className="white-iconic-btn yellow-color-on-hover bigger-font ms-3 btn-rotate">
                    <i className="fa fa-shopping-cart"></i>
                    <span className="yellow-length-circle">{cart.length > 0 ? cartLength : '0'}</span>
                </Button>
          </Dropdown> 
           
        </div>     
    );

}



