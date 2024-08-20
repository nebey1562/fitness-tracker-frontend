import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
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
                    <ListGroup variant="flush" className="mb-4">
                        {muscleGroups.length > 0 ? (
                            muscleGroups.map(group => (
                                <ListGroup.Item key={group} className="exercise-item">
                                    <Button variant="primary" onClick={() => handleViewExercises(group)} className="w-100">
                                        {group}
                                    </Button>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item className="exercise-item">
                                Loading muscle groups...
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    <Button variant="dark" onClick={handleViewWorkouts} className="w-100 btn-view-workouts">
                        View Workouts
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Exercises;
