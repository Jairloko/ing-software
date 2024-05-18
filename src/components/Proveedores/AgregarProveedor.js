import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";

function BtnAgregarProveedor({onUpdateTable}) {
  const [showModal, setShowModal] = useState(false);

   // Form input state
   const [name, setName] = useState("");
   const [address, setAddress] = useState("");
   const [phone, setPhone] = useState("");

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., updating profile
    const payload ={
      name:name,
      address:address,
      phone:phone,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const r = await fetch("http://localhost:3001/api/v1/proveedor/", config).then(
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
        Agregar proveedor
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar proveedor</Modal.Title>
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
                  <Form.Label>Telefono</Form.Label>
                  <Form.Control type="text"  placeholder="(000) 000-0000" onChange={(e) => setPhone(e.target.value)}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="py-2">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Direccion</Form.Label>
                  <Form.Control type="text" placeholder="Avenida..." onChange={(e) => setAddress(e.target.value)}/>
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

export default BtnAgregarProveedor;
