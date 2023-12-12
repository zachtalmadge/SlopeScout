import ModelMasthead from "../../components/ModelMasthead/ModelMasthead";
import { useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ResortCard from '../../components/ResortCard/ResortCard';
import { Grid, Container } from 'semantic-ui-react';
import { useTheme } from '../../contexts/ThemeProvider';


const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const { data } = useFetch(`http://127.0.0.1:5555/resorts`);

    const resorts = data.filter(resort => 
        resort.name.toLowerCase().includes(query.toLowerCase()) ||
        resort.city.toLowerCase().includes(query.toLowerCase()) ||
        resort.state.toLowerCase().includes(query.toLowerCase())
    )

    const { theme } = useTheme();

    const containerStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D', // Dark mode background
        color: theme === 'light' ? 'black' : 'white', // Dark mode text color
        paddingTop: "50px",
        paddingBottom: "50px",
      };
      
    

    return (
        <>
        <ModelMasthead text="Search Results" />
        <Container fluid style={containerStyle}>
            <Container>
                <Grid>
                    {resorts.map(resort => (
                        <Grid.Column key={resort.id} width={4}>
                            <ResortCard resort={resort} />
                        </Grid.Column>
                    ))}
            </Grid>
            </Container>
        </Container>
        </>
    )
}

export default SearchPage