import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Modal, Button, Form, Row, Col } from "react-bootstrap";

const EditarPedidoBtn = ({
  onEditClick,
  item,
  onUpdateTable,
  onUpdateTableGasto,
  clientes,
  proveedores,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showModalGasto, setShowModalGasto] = useState(false);

  // Form input state
  const [marca, setMarca] = useState(item.marca || "");
  const [cliente, setCliente] = useState(item.cliente || "");
  const [modelo, setModelo] = useState(item.modelo || "");
  const [anio, setAnio] = useState(item.anio || "");
  const [pieza, setPieza] = useState(item.pieza || "");
  const [precio, setPrecio] = useState(item.precio || "");
  const [proveedor, setProveedor] = useState(item.proveedor || "Select...");
  const [compra, setCompra] = useState(item.compra || "");

  const [concepto, setConcepto] = useState("");
  const [gasto, setGasto] = useState(0);


  const handleButtonClick = () => {
    console.log(item);
    setShowModal(true);
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleGastoClick = () => {
    console.log(item);
    setShowModalGasto(true);
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalGasto = () => {
    setShowModalGasto(false);
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  //Aqui cancelamos el pedido
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
      "http://localhost:3001/api/v1/pedido/" + item.idPedido,
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

  //Editar
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., updating profile
    const payload = {
      cliente: cliente,
      marca: marca,
      modelo: modelo,
      anio: anio,
      pieza: pieza,
      precio: precio,
      compra: compra,
      proveedor: proveedor,
    };

    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const r = await fetch(
      "http://localhost:3001/api/v1/pedido/" + item.idPedido,
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

  //Agregar Gasto
  const handleSubmitGasto = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., updating profile
    const payload = {
      pedido: item.idPedido,
      concepto: concepto,
      gasto: gasto,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const r = await fetch(
      "http://localhost:3001/api/v1/gastoExtra/",
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
        handleCloseModalGasto();
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
          <Dropdown.Item onClick={handleGastoClick}>
            Agregar Gasto
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteConfirmation}>
            Eliminar
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Main Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Cliente</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setCliente(e.target.value)}
                    defaultValue={item.cliente}
                  >
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
                  <Form.Control
                    type="text"
                    onChange={(e) => setPieza(e.target.value)}
                    defaultValue={item.pieza}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Precio venta</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => setPrecio(e.target.value)}
                    defaultValue={item.precio}
                  />
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
                    onChange={(e) => setAnio(e.target.value)}
                    defaultValue={item.anio}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setMarca(e.target.value)}
                    defaultValue={item.marca}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setModelo(e.target.value)}
                    defaultValue={item.modelo}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Precio Compra</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setCompra(e.target.value)}
                    defaultValue={item.compra}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Proveedor</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => setProveedor(e.target.value)}
                    defaultValue={proveedor}
                  >
                    <option value="">Select...</option>
                    {proveedores.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                    {/* Add more options as needed */}
                  </Form.Control>
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
        <Modal.Body>¿Está seguro de que desea eliminar este pedido?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
          <Button variant="secondary" onClick={handleCloseDeleteConfirmation}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Gastos Modal */}
      <Modal show={showModalGasto} onHide={handleCloseModalGasto} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitGasto}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Pedido</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={"#" + item.idPedido + " / " + item.pieza + " / " + item.modelo}
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
                    placeholder="Paqueteria PMM"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Precio venta</Form.Label>
                  <Form.Control
                    type="number"
                    onChange={(e) => setGasto(e.target.value)}
                    placeholder="800"  
                  />
                </Form.Group>
              </Col>
            </Row>

            <br></br>
            <Row>
              <Col>
                <Button variant="primary" type="submit" className="mr-3">
                  Agregar
                </Button>

                <Button variant="secondary" onClick={handleCloseModalGasto}>
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarPedidoBtn;
