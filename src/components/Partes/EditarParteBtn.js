import React, { useState } from "react";
import { Dropdown, Nav, Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditarParteBtn = ({ onEditClick, item, onUpdateTable }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Form input state
  const [marca, setMarca] = useState(item.marca || "");
  const [modelo, setModelo] = useState(item.modelo || "");
  const [anio, setAnio] = useState(item.anio || "");
  const [pieza, setPieza] = useState(item.pieza || "");

  const handleButtonClick = () => {
    console.log(item);
    setShowModal(true);
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  //Aqui eliminamos la pieza
  const handleConfirmDelete = async () => {
    // Add logic to handle delete confirmation
    setShowDeleteConfirmation(false);

    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const r = await fetch(
      "http://localhost:3000/api/v1/inventario/" + item.idInventario,
      config
    ).then((res) => res.json());

    console.log(r);
    switch (r.status) {
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

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  //Aqui editamos la pieza
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., updating profile
    const payload ={
      marca:marca,
      modelo:modelo,
      anio:anio,
      pieza:pieza,
    };

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const r = await fetch("http://localhost:3000/api/v1/inventario/"+item.idInventario, config).then(
      (res) => res.json()
    );

    console.log(r);
    switch (r.status) {
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

  const EditarClienteBtn = ({ onEditClick, item }) => {
    // Use the item information here
  };

  return (
    <>
      <Dropdown as={Nav.Item}>
        <Dropdown.Toggle
          as={Nav.Link}
          data-toggle="dropdown"
          id="dropdown-67443507"
          variant="default"
          className="m-0"
        >
          <i className="nc-icon nc-settings-gear-64"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleButtonClick}>Editar</Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteConfirmation}>
            Eliminar
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Main Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar parte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" onChange={(e) => setMarca(e.target.value)} defaultValue={item.marca} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control type="text" onChange={(e) => setModelo(e.target.value)} defaultValue={item.modelo}  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="py-2">
                <Form.Group controlId="formBasicName">
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    type="number"
                    min="1900"
                    max="2100"
                    step="1"
                    onChange={(e) => setAnio(e.target.value)} defaultValue={item.anio} 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Nombre de la pieza</Form.Label>
                  <Form.Control type="text" onChange={(e) => setPieza(e.target.value)} defaultValue={item.pieza}  />
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                <Button variant="primary" type="submit" className="mr-3">
                  Editar
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
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirmation}
        onHide={handleCloseDeleteConfirmation}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que desea eliminar esta parte?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
          <Button variant="secondary" onClick={handleCloseDeleteConfirmation}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarParteBtn;
