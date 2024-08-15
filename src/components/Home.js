import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Table from './Table'

function Home() {
  return (
    <>
    <div className="HomePage">
        <div className="homecontent">
            <Link to="/Create" > <button className='button-5 ' style={{position:"sticky"}}>ADD +</button></Link>
           
            <Table/>
        </div>

    </div>
      
    </>
  )
}

export default Home
