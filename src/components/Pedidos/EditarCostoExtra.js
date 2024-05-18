import React, { useState } from "react";
import { Dropdown, Nav, Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditarCostoExtra = ({ onEditClick, item, onUpdateTableGasto }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


  const [concepto, setConcepto] = useState(item.concepto || "");
  const [gasto, setGasto] = useState(item.gasto || "");

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

  //Eliminar Gasto
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
      "http://localhost:3000/api/v1/gastoExtra/" + item.pedido,
      config
    ).then((res) => res.json());

    console.log(r);
    switch (r.status) {
      case 401:
        alert(r.message);
        break;
      case 201:
        onUpdateTableGasto();
        alert(r.message);
        handleCloseModal();
        break;
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  //Editar Gasto
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., updating profile
    const payload = {
      concepto: concepto,
      gasto: gasto,
    };

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const r = await fetch(
      "http://localhost:3000/api/v1/gastoExtra/" + item.pedido,
      config
    ).then((res) => res.json());

    console.log(r);
    switch (r.status) {
      case 401:
        alert(r.message);
        break;
      case 201:
        onUpdateTableGasto();
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
          <Modal.Title>Editar gasto extra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Pedido</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={
                      "#" +
                      item.pedido 
                    }
                    disabled={true}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Concepto</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setConcepto(e.target.value)}
                    defaultValue={item.concepto}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Precio venta</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => setGasto(e.target.value)}
                    defaultValue={item.gasto}
                  />
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
        <Modal.Body>¿Está seguro de que desea eliminar este gasto?</Modal.Body>
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

export default EditarCostoExtra;
