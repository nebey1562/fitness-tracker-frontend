import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Exercise.css'; // Import your CSS file

const Exercises = () => {
    const [muscleGroups, setMuscleGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fitness-tracker-backend-five.vercel.app/api/v1/fitness/muscleGroups')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setMuscleGroups(response.data);
                } 
            })
    }, []);

    const handleViewExercises = (muscleGroup) => {
        navigate(`/exercises/${muscleGroup}`);
    };

    const handleViewWorkouts = () => {
        navigate('/workoutList');
    };

    return (
        <Container fluid className="bg-dark text-white min-vh-100 py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6} className="bg-black p-4 rounded">
                    <h1 className="text-center mb-4">Muscle Groups</h1>
                    <Row>
                        {muscleGroups.length > 0 ? (
                            muscleGroups.map(group => (
                                <Col md={6} key={group} className="mb-4">
                                    <Card 
                                        className="workout-card"
                                        onClick={() => handleViewExercises(group)}
                                    >
                                        <Card.Body>
                                            <Card.Title className="card-title">{group}</Card.Title>
                                            <Card.Text className="card-text">
                                                View exercises for {group}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <Card className="workout-card">
                                    <Card.Body>
                                        <Card.Text className="card-text">
                                            Loading muscle groups...
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                    <Button variant="dark" onClick={handleViewWorkouts} className="w-100 btn-view-workouts mt-4">
                        View Workouts
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Exercises;
