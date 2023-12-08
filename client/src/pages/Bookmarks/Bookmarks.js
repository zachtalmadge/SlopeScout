import ModelMasthead from "../../components/ModelMasthead/ModelMasthead";
import ResortCard from "../../components/ResortCard";
import useFetch from "../../hooks/useFetch";

const URL = "http://127.0.0.1:5555/user/1/bookmark/1"

const Bookmarks = () => {

    const { data } = useFetch(`${URL}`)

    return (
        <ModelMasthead text="Bookmarks" />
    )
}

export default Bookmarks