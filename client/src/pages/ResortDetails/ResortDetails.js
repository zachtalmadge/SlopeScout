import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom";
import ResortDetailsView from "../../components/ResortDetailsView";


const URL = 'http://127.0.0.1:5555/resorts';


const ResortDetails =  () => {

    const { id } = useParams()

    const { data } = useFetch(`${URL}/${id}`)

    console.log(data)

    return <ResortDetailsView resort={data} />
}

export default ResortDetails