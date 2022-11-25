import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function ViewSheet(){
    const {id} = useParams()
    const [sheet, setSheet] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if(id){
            axios.get('/api/instruments/sheet/'+id).then((response)=> {
                console.log(response)
                if(response.data.message){
                    toast.error("Cannot find sheet music.")
                    navigate('/')
                    return
                }
                setSheet(response.data)
            })
        }
    },[])
 

    return(
        <>
        <div>
            <p>
            {sheet && sheet.name}
            </p>
        </div>
        </>
    )
} 