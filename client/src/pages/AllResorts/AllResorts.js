import React, { useState, useEffect } from 'react';
import { Grid, Input, Button, Segment, Container } from 'semantic-ui-react';
import ModelMasthead from '../../components/ModelMasthead';
import ResortCard from '../../components/ResortCard';
import useFetch from '../../hooks/useFetch';

const URL = 'http://127.0.0.1:5555/resorts';

const AllResorts = () => {
  const { data } = useFetch(URL);
  const [filteredData, setFilteredData] = useState(data);
  const [nameFilter, setNameFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    applyFilters(); // Apply filters when component first loads
  }, [data]);

  const applyFilters = () => {
    // Apply filters when called
    if (data) {
      const filteredResorts = data.filter(
        (resort) =>
          resort.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
          resort.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
      setFilteredData(filteredResorts);
    }
  };

  return (
    <>
      <ModelMasthead text="All Resorts" />
      <Segment vertical textAlign="center" className="filter-segment">
        <Container>
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
          />
          <Button primary onClick={applyFilters}>
            Apply Filters
          </Button>
        </Container>
      </Segment>
      <Grid container columns={4}>
        {filteredData ? (
          filteredData.map((resort) => (
            <Grid.Column key={resort.id}>
              <ResortCard resort={resort} />
            </Grid.Column>
          ))
        ) : (
          ''
        )}
      </Grid>
    </>
  );
};

export default AllResorts;

