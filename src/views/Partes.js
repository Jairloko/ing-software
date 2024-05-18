import React, { useEffect, useState } from "react";
import { Pagination, Modal, Button, Dropdown } from "react-bootstrap";
import BusquedaBoxClientes from "components/ComponentesSimples/BusquedaClientes";
import BtnAgregarCliente from "components/Clientes/AgregarClienteBtn";
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import EditarClienteBtn from "components/Clientes/EditarClienteBtn";
import BtnAgregarParte from "components/Partes/AgregarParteBtn";
import EditarParteBtn from "components/Partes/EditarParteBtn";

function TableList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inventario, setInventario] = useState([]);
  const itemsPerPage = 5;

  const [prevState, setUpdateTable] = useState(0);

  //Aqui obtenemos las piezas del inventario
  useEffect(() => {
    const getInventarioData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/inventario/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setInventario(data.inventarioList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getInventarioData();
  }, [prevState]);

  const updateTable = () => {
    // Cambia el estado para actualizar la tabla
    setUpdateTable(Math.random());
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentItems = () => {
    const filteredData = inventario.filter((item) =>
      item.marca && item.marca.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    console.log(value)
    setCurrentPage(1); // Reset to the first page when searching
  };


  const currentItems = getCurrentItems();

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="2">
            <Card className="strpied-tabled-with-hover">
              <BtnAgregarParte
                className="py-5"
                onUpdateTable={updateTable}
              ></BtnAgregarParte>
            </Card>
          </Col>

          <Col md="5">
            <Card className="strpied-tabled-with-hover">
              <BusquedaBoxClientes onSearch={handleSearchChange} />
            </Card>
          </Col>

          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Partes</Card.Title>
                <p className="card-category">
                  Lista de las partes en el sistema
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Año</th>
                      <th>Nombre de la pieza</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.idInventario}>
                        <td>{item.idInventario}</td>
                        <td>{item.marca}</td>
                        <td>{item.modelo}</td>
                        <td>{item.anio}</td>
                        <td>{item.pieza}</td>
                        <td>
                          <EditarParteBtn
                            onEditClick={handleEditClick}
                            item={item}
                            onUpdateTable={updateTable}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="px-2">
                  {[
                    ...Array(Math.ceil(inventario.length / itemsPerPage)).keys(),
                  ].map((number) => (
                    <Pagination.Item
                      key={number + 1}
                      onClick={() => handlePageChange(number + 1)}
                      className="custom-pagination-item"
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TableList;
