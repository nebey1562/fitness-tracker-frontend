import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import './WorkoutList.css'; 

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    useEffect(() => {
        axios.get('https://fitness-tracker-backend-five.vercel.app/api/v1/fitness/viewWorkouts')
            .then(response => {
                setWorkouts(response.data);
            })
    }, []);

    const handleCardClick = (workout) => {
        setSelectedWorkout(workout);
        setWeight(workout.weight);
        setReps(workout.reps);
        setShowModal(true);
    };

    const handleUpdate = async () => {

            await axios.put('https://fitness-tracker-backend-five.vercel.app/api/v1/fitness/updateLog', {
                date: selectedWorkout.date,
                weight: weight,
                reps: reps
            });
            setWorkouts(workouts.map(w => 
                w._id === selectedWorkout._id ? { ...w, weight, reps } : w
            ));
            setShowModal(false);
    };

    return (
        <Container fluid className="bg-dark text-white min-vh-100 py-4">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <h1 className="text-center mb-4">All Workouts</h1>
                    <Row>
                        {workouts.map(workout => (
                            <Col md={6} lg={4} key={workout._id} className="mb-4">
                                <Card className="workout-card" onClick={() => handleCardClick(workout)}>
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
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className='Modal-head'>
                    <Modal.Title>Update Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body className='Modal'>
                    <Form>
                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight (kg)</Form.Label>
                            <Form.Control
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formReps" className="mt-3">
                            <Form.Label>Reps</Form.Label>
                            <Form.Control
                                type="number"
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} className='buttonsil'>
                        Update Workout
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default WorkoutList;
