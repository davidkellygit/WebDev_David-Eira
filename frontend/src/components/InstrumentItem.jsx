import { Navigate, useNavigate } from "react-router-dom"

export default function InstrumentItem({item}){
    const routeChange = () => {
        let path = `/sheet/${item._id}`;
        Navigate(path);
    }


    return (
        <>
        <div className="col-sm-3">
            <div className="card">

                <br/>
                <p>{item.name}</p>
                <p>{item.inst}</p>
                <hr/>
                <><p><a href={`/sheet/${item._id}`}>View</a></p></>
                                    
            </div>
        </div>
        
        </>
    )
}