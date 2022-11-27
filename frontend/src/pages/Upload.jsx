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
    filename: '',
    name: '',
    inst: '',
    inst2: '',
  })
  const [fileUpload, setFileUpload] = useState()

  const { filename, name, inst, inst2 } = formData

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

  const handleFileUpload = (e) => {
    setFileUpload(e.currentTarget.files[0])

  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const imageData = new FormData()
    imageData.append('file', fileUpload)
    console.log(imageData)
    
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
     }

    await axios.post('/api/uploads', imageData, config).then(async(multerRes) => {
     
      if(multerRes.data.filename) {


        const scoreData = {
          filename: multerRes.data.filename,
          name: name,
          inst: inst,
          inst2: inst2,
        }

        console.log(scoreData)
   
        await axios.post('api/instruments', scoreData, config).then((response) => {
          console.log(response.data)
          
          if(response.data){
            toast.success("Upload successful")
            navigate('/sheet/'+response.data._id)
          }
        })
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
            <input 
              type='file'
              className='form-control'
              id='file'
              name='file'
              onChange={(e)=>{handleFileUpload(e)}}
            />
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
              id='inst'
              name='inst'
              value={inst}
              placeholder='Please specify instrumentation'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='inst2'
              name='inst2'
              value={inst2}
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