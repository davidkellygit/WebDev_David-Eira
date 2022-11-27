import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { Document, Page, pdfjs } from "react-pdf"
import PDF from '../components/PDF'
//import './pdf.css'


export default function ViewSheet(){
    const {id} = useParams()
    const [sheet, setSheet] = useState()
    const navigate = useNavigate()

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
    `https://cors-anywhere.herokuapp.com/http://localhost:5000/api/uploads/${sheet && sheet.filename}`
 
    // const url =
    // `http://localhost:5000/api/uploads/${sheet && sheet.filename}`
 


    return(
        <>
        <div className="container">
            <div className="row align-items-center">
                <h1>
                {sheet && sheet.name}
                </h1>
            </div>
            <br/>
            <div className="row">
                <div className="col-sm-7">
                <Document
		            file={url}
		            onLoadSuccess={onDocumentLoadSuccess}
	            >
		            <Page pageNumber={pageNumber} />
	            </Document>
                {/* <Document
                    file={`localhost:5000/api/uploads/${sheet && sheet.filename}`}>       
                </Document> */}
                {/* <embed src={`localhost:5000/api/uploads/${sheet && sheet.filename}`} width="1000px" /> */}
                {/* <object data={`localhost:5000/api/uploads/${sheet && sheet.filename}`} type="application/pdf" width="100%" height="100%"></object> */}
                {/* <img src='https://musescore.com/static/musescore/scoredata/g/8fbceb3e46eb0cf31b7f20922556d3f5ebcfa43d/score_0.png@280x390?no-cache=1621346013&bgclr=ffffff&fmt=webp' width="800px" height="2100px" /> */}
                </div>
                <div className="col-sm-5">
                    <p>Arranged for: {sheet && sheet.inst}</p>
                </div>
            </div>

            
        </div>
        </>
    )
} 