import './App.css';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import CollapsibleExample from "./bootstrap/CollapsibleExample.jsx";
import ResponsiveAutoExample from "./bootstrap/ResponsiveAutoExample.jsx"
import { Routes, Route, Outlet } from "react-router-dom"
import DetailPage from './detail/DetailPage.jsx';
import data from './db/yejidata.js';
import { useState } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import Whiteboard from './live/Whiteboard';
import TestOverlay from './live/TestOverlay';
import { useNavigate } from "react-router-dom"

styled.button`
  background : yellow;
`


function App() {
  let [yeji, setYeji] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">
      <CollapsibleExample/>
      
      <Routes> 
        {/* 404 Error케이스 */}
        <Route path="*" element={
          <>
            <img alt='404' style={{width: '50%'}} src='https://nalab.kr/files/attach/images/643/430/033/2010-09-01%2021;10;01.jpg'></img> 
          </>
        } />

        {/* 메인 라우팅 */}
        <Route path="/" element={
          <>
            {/* 메인 베너  */}
            <div className='back-bg'>
              <div className='main-bg'></div>
            </div>
            
            <Button variant="dark" onClick={ ()=>{
              let yeji_copy = [...yeji];
              yeji_copy.sort((a, b)=>{
                return a.title < b.title ? -1 : a.title > b.title ? 1:0;
              });
              setYeji(yeji_copy);
            } }>이름정렬</Button>
            <Button onClick={ () => {navigate("/live")} }>
              라이브페이지 바로가기
            </Button>
            
            {/* 메인 상품 이미지 */}
            <ResponsiveAutoExample yeji = {yeji}/>

            {/* 더보기 버튼 */}
            <div className='listPush'>
              <Button variant="danger" onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{
                  let yeji_copy = [...yeji, ...result.data];
                  setYeji(yeji_copy);
                })
                .catch(()=>{
                  console.log('실패염');
                })

                axios.post('/create')
              }}>더보기</Button>
            </div>
          </>
        } />

        {/* 상세페이지 라우팅 */}
        <Route path="/detail/:id" element={
          <>
          <DetailPage yeji={ yeji }/>  

          </>
        } />

        {/* 영상 라우팅 */}
        <Route path="/live" element={
          <>
            <Whiteboard/>
            <TestOverlay/>  

          </>
        } />
        
        {/* About 라우팅 */}
        <Route path="/about" element={ <About/> }>
          <Route path="member" element={ <h2>member</h2> }></Route>
          <Route path="map" element={ <h2>map</h2> }></Route>
        </Route>
        {/* <Route path="/cart" element={ <Cart></Cart> }>

        </Route> */}
      </Routes>

      
      
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
      <Outlet/>
    </div>
  )
}

export default App;
