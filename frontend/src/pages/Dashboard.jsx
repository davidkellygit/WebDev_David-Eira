import React, { useEffect, useState } from 'react'
import InstrumentItem from '../components/InstrumentItem'
import axios from 'axios'

function Dashboard() {
    // get all instruments
    const [instruments, setInstruments] = useState()
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

    return (
        <>
            <div>Dashboard</div>
            {instruments && instruments.map((item) => {
            return(
                <InstrumentItem key={item._id} item = {item}/>
            )
        })}
        </>
        
    )
}

export default Dashboard