import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './WorkoutList.css';

const ExerciseList = () => {
    const { groupName } = useParams();
    const [exercises, setExercises] = useState([]);
    const [exercise, setExercise] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    useEffect(() => {
        if (groupName) {
            axios.get(`https://fitness-tracker-backend-ebens-projects-2cb58533.vercel.app/api/v1/fitness/GetExcercise/${groupName}`)
                .then(response => {
                    setExercises(response.data);
                })
        }
    }, [groupName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workoutData = {
            exercise,
            weight: parseFloat(weight),
            reps: parseInt(reps),
            muscleGroup: groupName
        };
            await axios.post('https://fitness-tracker-backend-five.vercel.app/api/v1/fitness/LogExcercise/', workoutData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setExercise('');
            setWeight('');
            setReps('');
    };

    return (
        <Container fluid className="bg-dark text-light min-vh-100 py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="text-center mb-4">{groupName} exercises</h1>
                    <Row>
                        {exercises.map((exerciseItem, index) => (
                            <Col md={6} key={index} className="mb-4">
                                <Card 
                                    className="exercise-card bg-secondary text-light"
                                    onClick={() => setExercise(exerciseItem)}
                                >
                                    <Card.Body>
                                        <Card.Title>{exerciseItem}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <h2 className="text-center mb-4">Log Workout</h2>
                    <Form onSubmit={handleSubmit} className="bg-secondary p-4 rounded">
                        <Form.Group controlId="formExercise">
                            <Form.Label>Exercise</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter exercise"
                                required
                                className="bg-dark text-light"
                                value={exercise}
                                onChange={(e) => setExercise(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter weight"
                                required
                                className="bg-dark text-light"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReps">
                            <Form.Label>Reps</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter reps"
                                required
                                className="bg-dark text-light"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
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
                        <br />
                        <Button variant="primary" type="submit" className="buttonsil">
                            Log Workout
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ExerciseList;
