import React, { useState, useEffect, useRef } from "react";
import { Input, Radio, notification, Button, Checkbox, Form, Spin  } from 'antd';
import { useSearchParams } from 'react-router-dom';
import ReactDOM from "react-dom";
import {api} from '../api/api'
import ProductsList from '../components/lists/ProductsList'
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import { DeleteFilled , EditFilled  , LikeOutlined , LoadingOutlined ,
    PlusOutlined , SmileOutlined , WarningOutlined} from '@ant-design/icons';
import HeadSlider from '../components/sections/HeadSlider';

const Checkout = (props) => {

    const {t, i18n} = useTranslation('common');

    const lan = i18next.language;

    const [cart, setCart] = useState([]);

    const [spinning, setSpinning] = useState();

    const [formLoading, setFormLoading] = useState(false);

    const [cartLength, setCartLength] = useState(0);

    const [subtotal, setSubtotal] = useState(0);

    const [productsIds, setproductsIds] = useState([]);
    
    const getDate = (zeros = true) => {

      const date =  new Date();
      let day = date.getDate();
      let month = Number(date.getMonth()) + 1;
      let year = date.getFullYear();

      if (zeros) {
        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;
      } 
      
      return `${day}.${month}.${year}`;
      
    }
    
    const createOrder = async (values) => {

      setFormLoading(true);
      const data = {...values, length: cartLength, subtotal, date: getDate(), products: cart}

      await api.post('/orderedProducts' , {
        ...data
      }).then((res)=>{
          notification.open({
              message: t('texts.orderSuccessfullyCreated'),
              icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
      }).catch(()=>{
        notification.open({
          message: t('texts.errorOccured'),
          icon: <WarningOutlined style={{ color: '#108ee9' }} />,
        });
    }).finally(async () =>{
        for (let i = 0; i < productsIds.length; i++) {
          await api.delete(`cart/${productsIds[i]}`)    
        } 
        setproductsIds([]);
        setCart([]);
        setFormLoading(false);
        await setTimeout(() => { window.location.reload() }, 1000)
      })

    }

    const getCart = async () => {

        setSpinning(true)
    
        await api.get('cart').then((res)=>{
          createCart(res.data)
        }).finally(()=>{ setSpinning(false);  })    
    }

    let productsInCart = [];
    let productKeys = [];
    let price = 0;

    const createCart = (data) => {

      for (let i = 0, x = 0; i < data.length; i++) {
        
        let newIds = productsIds;
        newIds.push(data[i].id);
        setproductsIds(newIds);

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

  useEffect(() => {
    getCart(); 
  }, []);

  return (
    <React.Fragment>

      <HeadSlider/>
    
      <section className="mt-7 bigger-container row gx-0 mx-auto">

        <div className="col-12 col-lg-8 mt-5">

          <ProductsList products={cart} totalLength={cartLength} subtotal={subtotal} spinning={spinning}/>

        </div>

        { cart.length > 0 && <div className="form mt-5 pt-5">

          <Form
            className="justify-content-start"
            name="basic"
            labelCol={{
              span: 8
            }}
            wrapperCol={{
              span: 16
            }}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={createOrder}
            autoComplete="off"
          >
            <Form.Item
              label={t('titles.username')}
              name="username"
              rules={[
                {
                  required: true,
                  message: t('form.required'),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('titles.surname')}
              name="surname"
              rules={[
                {
                  required: true,
                  message: t('form.required'),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('titles.address')}
              name="address"
              rules={[
                {
                  required: true,
                  message: t('form.required'),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <div className="spin-container yellow-spin mt-5 text-start">
                <Spin spinning={formLoading}/>
            </div>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            > 

              <button htmlType="submit" className="post-btn yellow-btn mt-5 rounded">
                  {t('buttons.createOrder')}
              </button>

            </Form.Item>
          </Form>

        </div>

        }
      
      </section>

    </React.Fragment>  
  );
}

export default Checkout;

