import React,{useEffect,useState} from 'react';
import './Header.css';

function Header() {
    const[dateValue,setdateValue] = useState('');
    const[currencyValue,setcurrencyValue] = useState([]);
  

    useEffect(() =>{
        fetch('https://api.exchangerate.host/latest?base=UAH&symbols=USD,EUR')
        .then(data =>{
          return data.json();
        },[])
        .then(data =>{
          setdateValue(data.date);
          let currObj = data.rates;
          setcurrencyValue([...Object.keys(currObj),...Object.values(currObj)]); 
        })
    },[])

  return (
    <header className="Header">
        <div className='HeaderComponent'>
           <h1 className='title'>ITOP1000 task</h1>
             <h2 className='subtitle'>Актуальный курс валют на :{dateValue} </h2>
             <div>{currencyValue[0]} : {currencyValue[2]} *</div>
             <div>{currencyValue[1]} : {currencyValue[3]} *</div>
             <span> Можно купить за 1 гривну *</span>
        </div>
    </header>
  );
}

export default Header;
