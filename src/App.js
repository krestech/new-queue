import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';
import Slider from "react-slick";
import posed, { PoseGroup } from 'react-pose';
import queryString from 'query-string'

let innerHeight = window.innerHeight;

const OrderPose = posed.div({
  enter: { opacity: 1},
  exit: { opacity: 0}
});

function App() {
  
  const [setting, setSetting] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  })

  const [order, setOrder] = useState([])
  const [orderManaged, setOrderManaged] = useState([])

  const getOrderData = (id) => {
    axios.get('https://api.dailybox.id/api/orders/latest-dine-in-by-outlet-id/' + id, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "x-access-token": "uO40t2uyPCUuFIAo",
        "x-key": "api@dailybox.id"
      }
    })
    .then(function (response) {
      let rebuild = response.data.result.orders.filter((x, i) => {
        let date = moment();
        let date_completed = moment(x.date_completed)
        let duration = moment.duration(date.diff(date_completed));
        let minutes = duration.asMinutes();
        console.log(minutes)
        if(minutes <= 6){
          return true;
        } else {
          return false;
        }
      })


      setOrderManaged(rebuild)
      console.log(rebuild);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
  }

  const addOrderDummy = async (data) => {
    try {
      setOrderManaged([...orderManaged, data]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setInterval(() => {
      const parsed = queryString.parse(window.location.search);
      console.log(parsed);
      let outlet = (parsed.outlet_id ? parsed.outlet_id : "5cde8c85a8f16c176722793c");
      getOrderData(outlet);   
      console.log(outlet)    
    }, 5000);
  }, [])



  // order_number: "O12197320086"
  // user_id: "5a5f3cd6f6ad222d467e8ad1"
  // order_status_id: "59a67dfdb5aab42dfcc4c295"
  // payment_method_id: 2
  // delivery_address_id: ""
  // delivery_time_id: ""
  // delivery_fee: 0
  // total_product_count: 1
  // total_item_count: 1
  // total_order: 53000
  // total_discount: 0
  // total_tax: 0
  // grand_total: 53000
  // grand_total_rounded: 53000
  // flag_paid: true
  // payment_datetime: "2019-12-27T22:14:20.650Z"
  // outlet_id: "5cde8c85a8f16c176722793c"
  // date_added: "2019-12-27T22:14:20.447Z"
  // date_updated: "2019-12-27T22:14:20.763Z"
  // id: "5e06823c717cbd3d058585f0"
  // update_user_id: "5a5f3cd6f6ad222d467e8ad1"
  // total_order_point: 53
  // grand_total_point: 53
  // grand_total_rounded_point: 53
  // total_discount_point: 0
  // total_tax_point: 0
  // service_type: "DINE-IN"
  // payment_channel_code: "0"
  // payment_channel_name: "Dailycoins"
  // flag_dine_in: true
  // pickup_type: 0
  // delivery_fee_point: 0
  // exchange_rate: 1000

  // user:
  //   email: "didi@krestech.id"
  //   first_name: "Ahmad"
  //   last_name: "Awdiyanto"
  //   mobile_phone: "08568885051"
  //   flag_active: true
  //   date_added: "2018-01-17T12:08:53.931Z"
  //   date_updated: "2019-12-27T22:14:20.645Z"
  //   id: "5a5f3cd6f6ad222d467e8ad1"
  //   user_type_id: 1
  //   register_origin_id: 1
  //   db_point: 834
  //   static_va_number_suffix: "281993"
  //   gender: "1"
  //   birth_date: "2018-06-10"
  
  // orderStatus:
  //   order_status_name: "On Process"
  //   order_status_number: 2
  //   flag_active: true
  //   date_added: "2017-08-30T08:57:33.662Z"
  //   date_updated: "2017-08-30T09:10:33.116Z"
  //   id: "59a67dfdb5aab42dfcc4c295"
  
  // outlet:
  //   city_id: "597f3332cc4c6c28889cb11d"
  //   outlet_name: "Green Lake"
  //   latitude: "6.1858935"
  //   longitude: "106.701285"
  //   flag_active: true
  //   date_added: "2019-05-17T10:27:17.132Z"
  //   date_updated: "2019-05-17T10:27:17.132Z"
  //   id: "5cde8c85a8f16c176722793c"
  //   address: "Rukan Cordoba, Jl. Green Lake City Boulevard, RT.007/RW.009, Petir, Kec. Cipondoh, Banten 15147"
  //   outlet_code: "GLC"
  
  // orderDetails: Array(1)
  // 0:
  //   order_id: "5e06823c717cbd3d058585f0"
  //   menu_id: "5b650ac12ddaa2380c5839d0"
  //   qty_ordered: 1
  //   qty_in_stock: 1
  //   menu_price: 53000
  //   menu_point: 53
  //   discount_price: 0
  //   discount_point: 0
  //   note: ""
  //   date_added: "2019-12-27T22:14:20.573Z"
  //   date_updated: "2019-12-27T22:14:20.573Z"
  //   id: "5e06823c717cbd3d058585f1"
  //   category_id: "59897f9d67150a1aa044974b"
  //   options: Array(3)
  //   0: {field: "Nasi", value: "White Rice", price: "0"}
  //   1: {field: "Telur", value: "Sunny Side Up", price: "0"}
  //   2: {field: "Level Pedas", value: "Mild", price: "0"}
  //   length: 3
  //   __proto__: Array(0)
  //   menu:
  //   menu_name: "Wagyu Basil"
  //   menu_desc: "Nasi Putih dengan Wagyu Kemangi (Wagyu Basil) dan Telur Mata Sapi (Sunny Side Up)"
  //   category_id: "59897f9d67150a1aa044974b"
  //   price: 53000
  //   db_point: 53
  //   flag_active: true
  //   flag_delivery: true
  //   flag_dine_in: false
  //   flag_on_stock: true
  //   date_added: "2018-08-04T02:09:05.250Z"
  //   date_updated: "2019-12-26T08:12:11.957Z"
  //   id: "5b650ac12ddaa2380c5839d0"
  //   menu_long_desc: "Nasi dengan wagyu berbumbu sedap dan wangi khas daun kemangi dan telur mata sapi."
  //   menu_desc_detail: [{…}]
  //   options: (3) [{…}, {…}, {…}]
  //   outlets: (4) [{…}, {…}, {…}, {…}]
  //   price_old: 58000
  //   db_point_old: 48
  //   menuImages: [{…}]


  return (
    <div style={{display: "flex", flexDirection: "row", backgroundColor: "#000"}}>
      <div style={{width: (innerHeight * 1.3), height: innerHeight, backgroundColor:"red"}}>
        <Slider {...setting}>
          <div>
            <img style={{width: (innerHeight * 1.3), height: innerHeight}} src={require('./assets/tv_1.jpg')} />
          </div>
          <div>
            <img style={{width: (innerHeight * 1.3), height: innerHeight}} src={require('./assets/tv_2.jpg')} />
          </div>
          <div>
            <img style={{width: (innerHeight * 1.3), height: innerHeight}} src={require('./assets/tv_3.jpg')} />
          </div>
        </Slider>
      </div>
      <div style={{padding: 20, width: "100%", overflow: "hidden"}}>
        <div style={{color: "#fff", fontSize: 30, fontWeight: "bold", borderBottom: "1px solid #fff", marginBottom: 10, paddingBottom: 10}}>Order Lists</div>
        <PoseGroup>
        { orderManaged.map((x, d) => {
          return (
            <OrderPose key={d} style={{padding: 10, backgroundColor: (x.order_status_id === "5a055f4e8f46003610d9659b"  ? '#49b665' : '#fff'), borderRadius: 5, marginBottom: 5, display: "flex", flexDirection: "crow"}}>
              <div style={{fontSize: 20, marginRight: 20, lineHeight: "30px"}}>#{x.order_number}</div>
              <div style={{fontSize: 30, fontWeight: "bold", lineHeight: "30px"}}>{x.user.first_name} {x.user.last_name}</div>
            </OrderPose>
          )
        })}
        </PoseGroup>
        
      </div>
    </div>
  );
}

export default App;
