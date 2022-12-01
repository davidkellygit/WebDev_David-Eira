import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify"
import { Document, Page, pdfjs } from "react-pdf"
import PDF from '../components/PDF'
//import './pdf.css'


export default function ViewSheet(){
    const {id} = useParams()
    const [sheet, setSheet] = useState()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)


    pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    /*To Prevent right click on screen*/
    document.addEventListener("contextmenu", (event) => {
	event.preventDefault();
    });
	
    /*When document gets loaded successfully*/
    function onDocumentLoadSuccess({ numPages }) {
    	setNumPages(numPages);
	    setPageNumber(1);
    }

    function changePage(offset) {
    	setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
	    changePage(-1);
    }

    function nextPage() {
    	changePage(1);
    }


    useEffect(() => {
        if(id){
            axios.get('/api/instruments/sheet/'+id, {mode: 'no-cors'}).then((response)=> {
                console.log(response)
                if(response.data.message){
                    //toast.error("Cannot find sheet music.")
                    navigate('/')
                    return
                }
                setSheet(response.data)
            })
        }
    },[])

    const url =
    `http://192.168.43.222:5000/api/uploads/${sheet && sheet.filename}`
 
    // const url =
    // `localhost:5000/api/uploads/${sheet && sheet.filename}`
 


    return(
        <>
        <div className="container">
            <div className="row align-items-center">
                <br/>
                <h1>
                {sheet && sheet.name}
                </h1>
            </div>
            <br/>
            <div className="row">
                <div className="col-sm-8">
                    <iframe src={url} height="400px"></iframe>
               
                {/* <Document
                    file={`localhost:5000/api/uploads/${sheet && sheet.filename}`}>       
                </Document> */}
                {/* <embed src={`localhost:5000/api/uploads/${sheet && sheet.filename}`} width="1000px" /> */}
                {/* <object data={`localhost:5000/api/uploads/${sheet && sheet.filename}`} type="application/pdf" width="100%" height="100%"></object> */}
                {/* <img src='https://musescore.com/static/musescore/scoredata/g/8fbceb3e46eb0cf31b7f20922556d3f5ebcfa43d/score_0.png@280x390?no-cache=1621346013&bgclr=ffffff&fmt=webp' width="800px" height="2100px" /> */}
                </div>
                <div className="col-sm-4">
                    <table>
                        <tbody>
                            <tr>
                                <th>Arranged for:</th>
                                <td>{sheet && sheet.inst}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <button className="btn btn-block" href={url}>Download</button>
                </div>
            </div>

            
        </div>
        </>
    )
} 