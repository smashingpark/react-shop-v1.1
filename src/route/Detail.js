import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";

function Detail(props) {
  let {id} = useParams();
  let findshoes = props.shoes.find((x) => x.id == id)

  let [count, setCount] = useState(0)
  let [hide, setHide] = useState(true)
  let [input, setInput] = useState(0)
  const [key, setKey] = useState('home')

  useEffect(()=>{
    setTimeout(()=>{
      setHide(false)
    }, 2000)
  }, [])

  useEffect(()=>{
    if(isNaN(input) == true) {
      alert('숫자만 입력하세요')
    }
  }, [input])

  return(
    <>
      <div className="container">
        {
          hide == true ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null
        }
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${Number(findshoes.id)+1}.jpg`} width="100%" />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{findshoes.title}</h4>
            <p>{findshoes.content}</p>
            <p>{findshoes.price}원</p>
            <div>
              <input type="text" onChange={(e)=>{ setInput(e.target.value) }} /> <button className="btn btn-danger">주문하기</button>
            </div>
          </div>
        </div>
        {/* tab 넣기 하다 중단됐음 */}
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="home" title="Home">
            Tab content for Home
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Tab content for Profile
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Tab content for Contact
          </Tab>
        </Tabs>
      </div> 
    </>
  )
}

export default Detail;