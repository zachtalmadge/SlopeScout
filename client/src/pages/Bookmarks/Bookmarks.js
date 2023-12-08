import React, { useState, useEffect } from 'react';
import ModelMasthead from "../../components/ModelMasthead/ModelMasthead";
import ResortCard from "../../components/ResortCard";
import { Button } from 'semantic-ui-react';

const URL = "http://127.0.0.1:5555/user/1/bookmark/1";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [reload, setReload] = useState(false); // State to trigger re-fetch

    console.log(bookmarks)

    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setBookmarks(data))
            .catch(error => console.error('Error fetching bookmarks:', error));
    }, [reload]); // Depend on reload state to trigger re-fetch

    const handleRemoveBookmark = async (resortId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/user/1/bookmark/${resortId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                // Trigger a re-fetch by toggling the reload state
                setReload(prev => !prev);
            } else {
                console.error('Failed to delete the bookmark');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <ModelMasthead text="Bookmarks" />
            {bookmarks.map(({resort}) => (
                <div key={resort.id}>
                    <ResortCard resort={resort} />
                    <Button color='red' onClick={() => handleRemoveBookmark(resort.id)}>
                        Remove Bookmark
                    </Button>
                </div>
            ))}
        </>
    );
};

export default Bookmarks;