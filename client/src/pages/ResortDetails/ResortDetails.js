import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom";
import ResortDetailsView from "../../components/ResortDetailsView";


const URL = 'http://127.0.0.1:5555/resorts';


const ResortDetails =  () => {

    const { id } = useParams()

    const { data } = useFetch(`${URL}/${id}`)

    // resort data along with all reviews stored on data
    // would need to make fetch call to submit the review to persist in server
    // can either then refresh the page(not cool)
    // or add the added review in state here

    return <ResortDetailsView resort={data} />
}

export default ResortDetails