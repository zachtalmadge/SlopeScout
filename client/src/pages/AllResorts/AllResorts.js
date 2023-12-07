import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
import ModelMasthead from "../../components/ModelMasthead";
import ResortCard from '../../components/ResortCard';
import useFetch from '../../hooks/useFetch';

const URL = 'http://127.0.0.1:5555/resorts';

const AllResorts = () => {
  const { data } = useFetch(URL);

  return (
    <>
      <ModelMasthead text="All Resorts" />
      <Grid container columns={4}>
        <Card.Group centered equal width>
          {data ? (
            data.map((resort) => (
              <Card key={resort.id}>
                <ResortCard resort={resort} />
              </Card>
            ))
          ) : (
            ''
          )}
        </Card.Group>
      </Grid>
    </>
  );
};

export default AllResorts;
