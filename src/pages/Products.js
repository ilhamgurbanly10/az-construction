import React, { useState, useEffect, useRef } from "react";
import { Input, Radio, notification  } from 'antd';
import { Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import ReactDOM from "react-dom";
import {api} from '../api/api'
import {ProductsList} from '../components/elements/Lists'
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import { DeleteFilled , EditFilled  , LikeOutlined , LoadingOutlined ,
    PlusOutlined , SmileOutlined , WarningOutlined} from '@ant-design/icons';
import HeadSlider from '../components/sections/HeadSlider';

const Products = (props) => {

  const {t, i18n} = useTranslation('common');

  const lan = i18next.language;

  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);

  const [spinning, setSpinning] = useState();

  const [categories, setCategories] = useState([]);

  const producstCon = useRef();

  let nameFromGet = searchParams.get(`name_${lan}_like`);

  const [productName, setProductName] = useState(nameFromGet);

  let category = searchParams.get('category');

  const [categoryRadio, setCategoryRadio] = useState(category);
  
  let url;

  if (productName !== "" && productName !== null && category !== "all") {
      url = `products?category=${category}&name_${lan}_like=${productName}&status=on`;    
  }
  else if (productName !== "" && productName !== null && category === "all") {
      url = `products?name_${lan}_like=${productName}&status=on`;
  }
  else if ((productName === "" || productName === null) && category === "all") {
      url = "products?status=on";
  } else {
      url = `products?category=${category}&status=on`;
  }

  // adding
  const addToCart = async (values) => {

    await  api.post('/cart' , {
      productId: values.id,
      category: values.category,
      name_az: values.name_az,
      name_en: values.name_en,
      name_de: values.name_de,
      img: values.img,
      price: values.price,
      year: values.year,
      username: "Ilham Gurbanly"
    }).then((res)=>{
        notification.open({
            message: t('texts.successfullyAdded'),
            description: `${t('texts.productName')}: ${res.data.name_az}`,
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      }).finally(()=>{
       
      })

  }
  
  // getting-from-db
  const getCategories = async () => {

      await api.get('categories?status=on').then((res)=>{
          setCategories(res.data)
      }).finally(()=>{ })
      
  }

  const getProducts = async () => {

    await getCategories();
    setSpinning(true)
    
    await api.get(url).then(async (res) => {
      let myData;
      if (category == "all") {
        myData = await res.data.filter((d) => { return categories.some((c) => { return c.category == d.category}) } )
      } else {
        myData = await res.data;
      }
      
      console.log(categories)
      setProducts(myData)
    }).finally((res)=>{ 
        setSpinning(false); 
    })

  }

  const changeCategory = (e) => {

    const val = e.target.value;
    if (productName === "" || productName === null) setSearchParams(`category=${val}&status=on`);
    else setSearchParams(`category=${val}&name_${lan}_like=${productName}&status=on`);
    setCategoryRadio(val);
    category = val;

  };

  const setName = (e) => {

    const val = e.target.value;
    
    if (val === "") setSearchParams(`category=${category}&status=on`) 
    else setSearchParams(`category=${category}&name_${lan}_like=${val}&status=on`)  
    setProductName(val)

  }

  useEffect(() => {
    
    getProducts();
    setCategoryRadio(category);
   
  }, [category, productName]);

  return (
    <React.Fragment>

      <HeadSlider/>
    
      <section className="products-section mt-7 bigger-container row gx-0 mx-auto" id="productsList">
        
        <div className="products-sider col-12 col-lg-4 pe-lg-5 mt-5">
              
          <h3 className="products-title yellow-underline underline-left border-bottom-lightgrey-3 grey-title">
              {t('titles.filters')}
          </h3>

          <Input placeholder={t('search.placeholder')} value={productName} onChange={(e) => setName(e) } className="mt-5 ant-input-style" />
          
          <Radio.Group onChange={changeCategory} value={categoryRadio} className="d-flex flex-column ant-radio-style mt-4">

            <Radio value="all" className="mb-3">{t('buttons.all')}</Radio>

            { categories.map((c , i)=>(
            
              <Radio key={i} value={c.category} className="mb-3">{c[`name_${lan}`]}</Radio>

            ))}

          </Radio.Group>

          <Link to="/checkout" className="yellow-btn mt-4 rounded d-inline-block">
            {t('buttons.checkout')}
          </Link>

        </div>

        <div className="products-container col-12 col-lg-8 mt-5" ref={producstCon}>

          <ProductsList products={products} addToCart={addToCart} spinning={spinning}/>
          
        </div>

      
      </section>

    </React.Fragment>  
  );
}

export default Products;

