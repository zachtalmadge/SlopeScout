import { useEffect, useState } from 'react'


function useFetch(uri) {

    // this is a custom hook to encapsulate fetch and useEffect functionality
    // it returns an object containing 3 states for conditional rendering and a setData function

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!uri) return
        fetch(uri)
            .then(data => data.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, [uri])

    return { loading, data, error, setData }
}

export default useFetch