import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const ExerciseList = () => {
    const { groupName } = useParams(); // Extract muscle group from URL
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        if (groupName) {
            axios.get(`https://fitness-tracker-backend-ebens-projects-2cb58533.vercel.app/api/v1/fitness/GetExcercise/${groupName}`)
                .then(response => {
                    setExercises(response.data);
                })
                .catch(error => {
                    console.error('Error fetching exercises:', error);
                });
        }
    }, [groupName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

    return (
        <Container fluid className="bg-dark text-light min-vh-100 py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="text-center mb-4">{groupName} exercises</h1>
                    <ListGroup variant="flush" className="mb-4">
                        {exercises.map(exerciseItem => (
                            <ListGroup.Item key={exerciseItem} className="bg-secondary text-light border-0">
                                {exerciseItem}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <h2 className="text-center mb-4">Log Workout</h2>
                    <Form onSubmit={handleSubmit} className="bg-secondary p-4 rounded">
                        <Form.Group controlId="formExercise">
                            <Form.Label>Exercise</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter exercise"
                                required
                                className="bg-dark text-light"
                            />
                        </Form.Group>
                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter weight"
                                required
                                className="bg-dark text-light"
                            />
                        </Form.Group>
                        <Form.Group controlId="formReps">
                            <Form.Label>Reps</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter reps"
                                required
                                className="bg-dark text-light"
                            />
                        </Form.Group>
                        <Form.Group controlId="formMuscleGroup">
                            <Form.Label>Muscle Group</Form.Label>
                            <Form.Control
                                type="text"
                                value={groupName}
                                readOnly
                                className="bg-dark text-light"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Log Workout
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ExerciseList;
