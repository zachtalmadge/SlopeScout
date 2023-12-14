import { useState, useEffect } from 'react'
import { Grid, Input, Button, Segment, Container, Pagination } from 'semantic-ui-react';
import ModelMasthead from '../../components/ModelMasthead';
import ResortCard from '../../components/ResortCard';
import useFetch from '../../hooks/useFetch';
import { useTheme } from '../../contexts/ThemeProvider';

const URL = 'http://127.0.0.1:5555/resorts';

const AllResorts = () => {
    // State to store the fetched data
    const { data } = useFetch(URL);

    const { theme } = useTheme();

    const segmentStyle = {
        backgroundColor: theme === 'light' ? 'white' : '#1B1C1D',
        color: theme === 'light' ? 'black' : 'white',
    };


    // State to store the filtered data
    const [filteredData, setFilteredData] = useState([]);

    // States for filter inputs
    const [nameFilter, setNameFilter] = useState('');
    const [cityFilter, setCityFilter] = useState('');

    // State for current page in pagination
    const [currentPage, setCurrentPage] = useState(1);

    // Number of items per page in pagination
    const itemsPerPage = 8;

    // Effect to apply filters whenever the data or filters change
    useEffect(() => {
        applyFilters();
    }, [data]);

    // Function to apply name and city filters
    const applyFilters = () => {
        if (!data) {
            setFilteredData([]); // Set filteredData to an empty array when data is null
            setCurrentPage(1); // Reset to first page when data is null
            return;
        }

        const filtered = data.filter(
            (resort) =>
                resort.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
                resort.city.toLowerCase().includes(cityFilter.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page after applying filters
    };

    // Calculate the slice of data to display based on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentResorts = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change in pagination
    const handlePaginationChange = (e, { activePage }) => {
        setCurrentPage(activePage);
    };

    return (
        <>
            <ModelMasthead text="All Resorts" />
            <Segment vertical textAlign="center" className="filter-segment" style={segmentStyle}>
                <Container style={{paddingBottom:"50px"}}>
                    {/* Input fields for filters */}
                    <Input
                        icon="search"
                        iconPosition="left"
                        placeholder="Search by name..."
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <Input
                        icon="search"
                        iconPosition="left"
                        placeholder="Search by city..."
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        style={{marginLeft: "25px", marginRight:"25px"}}
                    />
                    <Button primary onClick={applyFilters} inverted={theme === 'dark'}>
                        Apply Filters
                    </Button>
                </Container>
            </Segment>
            <Container fluid style={segmentStyle}>
                <Grid container columns={4}>
                    {/* Map over the current slice of resorts to display */}
                    {currentResorts.map((resort) => (
                        <Grid.Column key={resort.id}>
                            <ResortCard resort={resort} />
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
            <Container fluid style={segmentStyle}>

                <Container textAlign="center" style={{paddingTop:"50px", paddingBottom: "50px"}}>
                    {/* Pagination component */}
                    <Pagination
                        activePage={currentPage}
                        onPageChange={handlePaginationChange}
                        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                    />
                </Container>
            </Container>
        </>
    );
};

export default AllResorts;
