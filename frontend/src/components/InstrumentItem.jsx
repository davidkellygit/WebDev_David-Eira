import { Navigate, useNavigate, useLocation } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'



export default function InstrumentItem({item}){
    const {user} = useSelector((state) => state.auth)  
    const path = useLocation().pathname

    // const routeChange = () => {
    //     let path = `/sheet/${item._id}`;
    //     Navigate(path);
    // }


    return (
        <>
        <div className="col-sm-3">
            <div className="card">

                <br/>
                <p>{item.name}</p>
                <p>{item.inst}</p>
                <hr/>
                
                {user && ["/profile"].includes(path) ? (
                <>  
                <nav>
                    <a href={`/sheet/${item._id}`}>View</a> | 
                    <a href={`/edit/${item._id}`}> Edit</a> 
                </nav>

                </>
                ) : (
                <>        
                <a href={`/sheet/${item._id}`}>View</a>
                </>)}             
                
            </div>
        </div>
        
        </>
    )
}