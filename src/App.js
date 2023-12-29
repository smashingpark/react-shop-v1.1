import logo from './logo.svg';
import './App.css';
import data from './data.js'
import Detail from './route/Detail.js'
import bgimg from './img/bg.png';
import { Button, Navbar, Container, Nav, Row, Col, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'

function App() {
  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate(); //page 이동을 도와주는 함수
  let importdata = ['https://codingapple1.github.io/shop/data2.json', 'https://codingapple1.github.io/shop/data3.json']
  let [count, setCount] = useState(0)
  let [hide, setHide] = useState(true)
  let [fadeIn, setFadeIn] = useState()

  function more(){
    setHide(false)
    axios.get(importdata[count])
    .then((result)=>{
      let copy = [...shoes, ...result.data]
      setFadeIn('fade-in-s')
      setTimeout(()=>{
        setFadeIn('fade-in-e')
      }, 30)
      setShoes(copy)
      setCount(count+1)
      setHide(true)
    })
    .catch(()=>{
      setHide(true)
      alert('더 이상 상품이 없습니다')
    })
  }

  useEffect(()=>{
    setTimeout(()=>{
      setFadeIn('fade-in-e')
    }, 30)
    return()=>{
      setFadeIn('fade-in-s')
    }
  },[])

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to="/">Home</Link>
            <Link to="/detail">Detail</Link> */}
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about/member') }}>member</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about/location') }}>location</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{backgroundImage : `url(${bgimg})`}}></div>
            <h1 style={{fontSize : '15px', fontWeight : 'bold', padding: '10px', backgroundColor : 'rgb(33, 37, 41)', color : 'white'}}>상품 목록</h1>
            <Container>
              <Row className={fadeIn}>
                {shoes.map(function(a, i){
                  return(
                    <Product key={i} i={i} shoes={shoes} data={data} navigate={navigate} />
                  )
                })}
              </Row>
            </Container>
            {
              hide ? null : <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            }
            <button onClick={ more }>more</button>
          </>
        } />
        <Route path="/detail/:id" element={ <Detail shoes={shoes} /> } />
        <Route path="/about" element={ <About /> }>
          <Route path="member" element={ <div>member page</div> } />
          <Route path="location" element={ <div>location page</div> } />
        </Route>
        <Route path="*" element={ <div>없는 페이지입니다!</div> } />
      </Routes>
    </div>
  );
}

function About() {
  return(
    <>
      <h1>회사정보</h1>
      <Outlet></Outlet>
    </>
  )
}

function Product(props) {
  return(
    <Col style={{flex : '1 0 30%', cursor : 'pointer'}} onClick={()=>{ props.navigate(`/detail/${props.i}`) }}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.i+1}.jpg`} width="80%" />
      <h2>{props.shoes[props.i].title}</h2>
      <p>{props.shoes[props.i].content}</p>
      <p>{props.shoes[props.i].price}</p>
    </Col>
  )
}

export default App;
