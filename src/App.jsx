import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
const App = () => {
  const [amount,setAmount]=useState(1);
  const [fromcur,setFromcur]=useState("USD");
  const [tocur,setTocur]=useState("INR");
  const[res,setRes]=useState(null);
  const[exr,setExr]=useState(null);

  useEffect(()=>{
    const getExrate=async()=>{
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromcur}`;
        const resp=await axios.get(url);
        console.log(resp);
        setExr(resp.data.rates[tocur])
        

      }
      catch(error){
        console.log("Error fetching data",error);
      }
    }
    getExrate();
  },[fromcur,tocur])

  useEffect(()=>{
    if(exr!==null){
      setRes((amount*exr).toFixed(2))
    }

  },[amount,exr])

  const handleAmt=(e)=>{
    const value=parseFloat(e.target.value);
    setAmount(isNaN(value)?0:value)
  }

  const handlefc=(e)=>{
    setFromcur(e.target.value)
  }
  
  const handletc=(e)=>{
    setTocur(e.target.value)
  }

  return (
    <>
    <div className="curcon">
      <div className="box">

      </div>
      <div className="data">
        <h1>CURRENCY CONVERTOR</h1>
        <div className="input-cont">
          <label>Amount:</label>
          <input type='number' id='amt' value={amount} onChange={handleAmt}></input>
        </div>
        <div className="input-cont">
          <label htmlFor='fromcurren'>From currency:</label>
          <select id="fromcurre" value={fromcur} onChange={handlefc}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>

        <div className="input-cont">
          <label htmlFor='tocurren'>To currency:</label>
          <select id="tocurre" value={tocur} onChange={handletc}>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound Sterling</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="CNY">CNY - Chinese Yuan</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="BRL">BRL - Brazilian Real</option>
            <option value="ZAR">ZAR - South African Rand</option>
          </select>
        </div>

      </div>
      <div className="result">
          <p>
            {amount} {fromcur} is equal to {res} {tocur}
          </p>
        </div>
    </div>
    
    
    </>
  )
}

export default App