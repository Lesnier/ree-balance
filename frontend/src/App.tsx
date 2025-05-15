import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/client';
import {EnergyData} from "./components/EnergyData";
import { GET_ENERGY_BY_DATE_RANGE } from './graphql/queries';
import EnergyChart from "./components/EnergyChart";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';


function App() {
    const { loading, error, data } = useQuery(GET_ENERGY_BY_DATE_RANGE, {
        variables: {
                startDate: '2019-01-01T00:00:00Z',
                endDate: '2019-01-25T23:59:59Z'
        }
    });

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home"><strong>Ree.es</strong> challenge by Lesnier Gonzalez</Navbar.Brand>
            </Container>
        </Navbar>
        <Container className="mt-5"   >
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <Card>
                        <Card.Body>
                            <h1>Balance Energético - REE</h1>
                            <EnergyChart data={data.getEnergyByDateRange} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
  );
}

export default App;
