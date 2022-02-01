import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])

  const [ sortBy, setSortBy] = useState('')
  const [ filterBy, setFilterBy] = useState('')

  useEffect(()=> {
    fetch('http://localhost:3001/stocks')
    .then(res => res.json())
    .then(data => setStocks(data))
  }, [])

  useEffect(()=> {
    if(sortBy === 'Alphabetically') {
      const sortedStocks = sortByName()
      setStocks(sortedStocks)
    } else {
      const sortedStocks = sortByPrice()
      setStocks(sortedStocks)
    }
  }, [sortBy])

  // useEffect(()=> {

  // }, [filterBy])

  const sortStock = (e) => {
    setSortBy(e.target.value)
  }

  const sortByName = () => {
    return [...stocks].sort(function(a, b) {
      var nameA = a.name.toUpperCase()
      var nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      //names must be equal
      return 0
    })
  }

  const sortByPrice = () => {
    return [...stocks].sort(function (a, b) {
      return a.price -b.price
    })
  }

  const buyStock = (stock)=>{
    if (!myStocks.includes(stock)){
      const updatedMyStocks = [...myStocks, stock]
      setMyStocks(updatedMyStocks)
    } else {
      alert('you already have it!')
    }
  }

  const sellStock = (stock) => {
    const updatedMyStocks = [...myStocks].filter(myStock => myStock.id !== stock.id)
    setMyStocks(updatedMyStocks)
  }

  return (
    <div>
      <SearchBar sortStock={sortStock} sortBy={sortBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleClick={buyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={myStocks} handleClick={sellStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
