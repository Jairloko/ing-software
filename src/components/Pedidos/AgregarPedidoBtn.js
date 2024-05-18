import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";

function BtnAgregarPedido({ onUpdateTable, clientes }) {
  const [showModal, setShowModal] = useState(false);


 // Form input state
 const [marca, setMarca] = useState("");
 const [cliente, setCliente] = useState("");
 const [modelo, setModelo] = useState("");
 const [anio, setAnio] = useState("");
 const [pieza, setPieza] = useState("");
 const [precio, setPrecio] = useState("");
 


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
      marca:marca,
      modelo:modelo,
      cliente:cliente,
      anio:anio,
      pieza:pieza,
      precio:precio,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const r = await fetch("http://localhost:3000/api/v1/pedido/", config).then(
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
        Agregar pedido
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control as="select" onChange={(e) => setCliente(e.target.value)}>
                  <option value="">Select...</option>
                  {clientes.map((item) => (
                   <option value={item.name}>{item.name}</option>
                  ))}
                    {/* Add more options as needed */}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Nombre de pieza</Form.Label>
                  <Form.Control type="text" placeholder="Pieza..." onChange={(e) => setPieza(e.target.value)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Precio de venta</Form.Label>
                  <Form.Control type="number" placeholder="$0.00" onChange={(e) => setPrecio(e.target.value)}/>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    type="number"
                    min="1900"
                    max="2100"
                    step="1"
                    placeholder="2024"
                    onChange={(e) => setAnio(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" placeholder="Chvr..." onChange={(e) => setMarca(e.target.value)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control type="text" placeholder="AXZ..." onChange={(e) => setModelo(e.target.value)}/>
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

export default BtnAgregarPedido;
