import React, { useEffect, useState } from 'react'
import InstrumentItem from '../components/InstrumentItem'
import axios from 'axios'
import {useSelector} from 'react-redux'


function Dashboard() {
    // get all instruments
    const [instruments, setInstruments] = useState();
    const [filteredInstrument, setFilteredInstrument] = useState()
    const [query, setQuery] = useState("");
    const {user} = useSelector((state) => state.auth)  

    // if(!instruments){
    //     getData()
    // }
    // // 
    // const getData = async() => {
    //     await axios.get('/api/instruments')
   
    // }

    useEffect(()=> {
        const getData = async() => {
            await axios.get('/api/instruments/all').then((res) => {
                setInstruments(res.data)
                console.log(res.data)
            })
        }
        getData()

    }, [])

    const handleQueryChange = (event) => {
        setQuery(event.target.value)
        setFilteredInstrument(instruments.filter(item => item.name.includes(query)))
        console.log(filteredInstrument)
    }

    // console.log(instruments.filter(instruments.name.toLowerCase().includes))

    // <embed src={`localhost:5000/api/uploads/${item.filename}`} width="800px" height="2100px" />

    return (
        <>
        {/*Makes Light Gray Background (Bootstrap)*/}
        <div className='bg-light'> 
            <br/>
            {user ? (
              <>
              <h3>Welcome back {user.name}!</h3>
              <div><p>What score are you looking for today?</p></div>

              </>
              ) : (
              <>
                 <h3>Welcome!</h3>   
                 <div><p>What score are you looking for?</p></div>
              </>)}
                
            <br/>
            <div>
                <input type="text" placeholder="Search..." className="search" onChange={(event) => handleQueryChange(event)}/>
                <ul className="list">
                {filteredInstrument && filteredInstrument.map((item) => {
                    return(
                        <><p><a href={`/sheet/${item._id}`}>{item.name}</a></p></>
                    )
                })}
                </ul>
            </div>

            <div className='container'> 
                <div className="row">
                    {instruments && instruments.map((item) => {
                        return(
                            <InstrumentItem key={item._id} item = {item}/>
                            )
                        })}
                </div>
            </div>
        </div>
        

        </>
        
    )
}

export default Dashboard