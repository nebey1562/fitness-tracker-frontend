import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './WorkoutList.css'; // Import your custom CSS file

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        // Fetch all workouts from the backend
        axios.get('https://fitness-tracker-backend-five.vercel.app/api/v1/fitness/viewWorkouts')
            .then(response => {
                setWorkouts(response.data);
            })
    }, []);

    return (
        <Container fluid className="bg-dark text-white min-vh-100 py-4">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <h1 className="text-center mb-4">All Workouts</h1>
                    <Row>
                        {workouts.map(workout => (
                            <Col md={6} lg={4} key={workout._id} className="mb-4">
                                <Card className="workout-card">
                                    <Card.Body>
                                        <Card.Title>Exercise: {workout.exercise}</Card.Title>
                                        <Card.Text>
                                            <strong>Weight:</strong> {workout.weight} kg
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Reps:</strong> {workout.reps}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Muscle Group:</strong> {workout.muscleGroup}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Date:</strong> {new Date(workout.date).toLocaleString()}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default WorkoutList;
