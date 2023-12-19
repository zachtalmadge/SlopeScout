import { useEffect } from 'react'
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom";
import ResortDetailsView from "../../components/ResortDetailsView";
import { useNavigate } from "react-router-dom";

const URL = 'http://127.0.0.1:5555/resorts';


const ResortDetails =  () => {

    const { id } = useParams()

    const { data } = useFetch(`${URL}/${id}`)

    console.log(data)

    const navigate = useNavigate()

    // the response body will only include a message if the resort is not found
    useEffect(() => {
        if (data.message){
            navigate('/error')
        }
    })

    return <ResortDetailsView resort={data} />
}

export default ResortDetails