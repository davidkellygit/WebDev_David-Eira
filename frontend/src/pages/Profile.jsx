import React, { useEffect, useState, useParams } from 'react'
import InstrumentItem from '../components/InstrumentItem'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import {FaFileUpload, FaUserEdit} from 'react-icons/fa'


function Profile() {
    // get all instruments
    const [instruments, setInstruments] = useState();
    // if(!instruments){
    //     getData()
    // }
    // // 
    // const getData = async() => {
    //     await axios.get('/api/instruments')
   
    // }

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      /*    
      if (isSuccess || user) {
        navigate('/')
      }
      */
      const getData = async() => {
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            }
           }

        await axios.get('/api/instruments/', config).then((res) => {
            setInstruments(res.data)
            console.log(res.data)
        })
    }
    getData()

  
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])


    return (
        <>
        <div className='bg-light'> 
          <div className='container'>
              <div className='row'>
                  <div className='col'>
                      <br/>
                      <h2>My Scores</h2>
                      <nav>
                      <Link to='/upload'>
                          <FaFileUpload /> Upload
                      </Link> |
                      <Link to={`/manage/${user._id}`}>
                          <FaUserEdit /> Manage Profile
                      </Link>
                      </nav>
                  </div>
  
              </div>
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

export default Profile