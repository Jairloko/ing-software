import React, { useEffect,useState } from "react";
import { Button, Modal, Form, Row, Col, Alert} from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";

function BtnAgregarCliente({ onUpdateTable }) {
  const [showModal, setShowModal] = useState(false);


  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  // Form input state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., updating profile
    const payload ={
      name:name,
      email:email,
      phone:phone,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const r = await fetch("http://localhost:3000/api/v1/cliente/", config).then(
      (res) => res.json()
    );

    console.log(r);
    switch (r.status) {
      case 400:
        alert(r.message);
        break;
      case 401:
        alert(r.message);
        break;
      case 201:
        onUpdateTable();
        alert(r.message);
        handleCloseModal();
        break;
    }
 
  };

  return (
    <>
      <Button
        className="btn-fill pull-right"
        variant="info"
        onClick={handleShowModal}
      >
        Agregar cliente
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Jose..." onChange={(e) => setName(e.target.value)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" placeholder="correo@correo.com" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="py-2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Numero de telefono</Form.Label>
                  <Form.Control type="text" placeholder="(000) 000-0000" onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <Button variant="primary" type="submit" className="mr-3">
                  Agregar
                </Button>

                <Button variant="secondary" onClick={handleCloseModal}>
                  Cerrar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default BtnAgregarCliente;
