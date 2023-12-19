import { Container, Image, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ErrorComponent = () => {
    return (
        <Container text textAlign="center" style={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image src="./assets/page_not_found.png" centered size="large" className="img-fluid rounded" />
            <Header as="h1" style={{ fontSize: '10rem', fontWeight: 'bold' }}>404</Header>
            <p>We can't seem to find the page you're looking for.</p>
            <Link to="/">
                <Button primary>Go Home</Button>
            </Link>
        </Container>
    );
};

export default ErrorComponent;