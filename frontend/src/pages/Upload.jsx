import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser, FaFileUpload } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import axios from 'axios'

function Upload() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    type2: '',
  })

  const { name, type, type2 } = formData

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
    

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()


    const scoreData = {
       name,
       type,
       type2,
     }

     const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
     }

      
    await axios.post('/api/instruments',scoreData, config).then((response) => { 
      console.log(response.data)

      if(response.data){
        toast.success("Upload successful")
      } 
      
    })

      
    
    }
  

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaFileUpload /> Upload
        </h1>
        <p>Please add your music score</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input type='file'/>
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your score name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='type'
              name='type'
              value={type}
              placeholder='Please specify instrumentation'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='type2'
              name='type2'
              value={type2}
              placeholder='(Optional) Please specify any additional instrumentation'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Upload