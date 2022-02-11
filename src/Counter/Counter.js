import React,{useEffect,useState} from 'react';
import './Counter.css';

function Counter() {
 const[CurrencyOptions, setCurrencyOptions] = useState([]);
 const[fromCurrency, setFromCurrency] = useState();
 const[toCurrency ,setToCurrency] = useState();
 const[exchangeRate, setExchangeRate] = useState();
 const[amount ,setAmout] = useState(1);
 const [amountInFromCurrency, setAmoutInFromCurrency] = useState(true);

let toAmount,fromAmount
if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
} else {
toAmount =  amount
fromAmount = amount / exchangeRate
}

function handleFromAmountChange(e){
    setAmout(e.target.value)
    setAmoutInFromCurrency(true)

}
function handleToAmountChange(e){
    setAmout(e.target.value)
    setAmoutInFromCurrency(false)
}
useEffect(() =>{
    if(fromCurrency != null && toCurrency != null){
    fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res => res.json())
    .then(data => setExchangeRate(data.rates[toCurrency]))
    }
},[fromCurrency,toCurrency])

    useEffect(() =>{
        fetch('https://api.exchangerate.host/latest?base=UAH&symbols=USD,EUR')
        .then(data =>{
          return data.json();
        },[])
        .then(data =>{
            const firstCurrency = Object.keys(data.rates)[0];
            setCurrencyOptions([data.base, ...Object.keys(data.rates)])
            setFromCurrency(data.base);
            setToCurrency(firstCurrency);
            setExchangeRate(data.rates[firstCurrency])

        })
    },[])
return(
    <div className="main">
    <div className='mainComponent'>
       <h1 className='title'>Счетчик валют</h1>
       <div className='countElement'>
       <input type="number" className='input' value={fromAmount} onChange = {handleFromAmountChange}/>
       <select value={fromCurrency} onChange ={e => setFromCurrency(e.target.value)}>
           {CurrencyOptions.map(option =>(
            <option key={option} value={option}>{option}</option>
   
           ))}

       </select>
       </div>

       <div className='countElement'>
       <input type="number" className='input' value={toAmount} onChange = {handleToAmountChange}/>
       <select value = {toCurrency} onChange ={e => setToCurrency(e.target.value)}>
           {CurrencyOptions.map(option =>(
            <option key={option} value={option}>{option}</option>
   
           ))}

       </select>
       </div>
    </div>
</div>
)
}

export default Counter;