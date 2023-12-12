import React, { useState, useEffect } from 'react';
import ModelMasthead from '../../components/ModelMasthead/ModelMasthead';
import ResortCard from '../../components/ResortCard';
import { Button, Grid, Container } from 'semantic-ui-react';
import { useTheme } from '../../contexts/ThemeProvider';


const URL = 'http://127.0.0.1:5555/user/1/bookmark/1';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [reload, setReload] = useState(false); // State to trigger re-fetch

    const { theme } = useTheme();

    const containerStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Dark mode background
        color: theme === 'light' ? 'black' : 'white', // Dark mode text color
        paddingTop: "50px",
        paddingBottom: "50px"
      };


    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => setBookmarks(data))
            .catch(error => console.error('Error fetching bookmarks:', error));
    }, [reload]); // Depend on reload state to trigger re-fetch

    const handleRemoveBookmark = async resortId => {
        try {
            const response = await fetch(
                `http://127.0.0.1:5555/user/1/bookmark/${resortId}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

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
            <Container fluid style={containerStyle}>
                <Container>
                <Grid columns={4}>
                    {bookmarks.map(({ resort }) => (
                        <Grid.Column key={resort.id}>
                            <ResortCard resort={resort} />
                            <Button
                                color="red"
                                onClick={() => handleRemoveBookmark(resort.id)}
                                inverted={theme === 'dark'}
                            >
                                Remove Bookmark
                            </Button>
                        </Grid.Column>
                    ))}
                </Grid>
                </Container>
            </Container>
        </>
    );
};

export default Bookmarks;
