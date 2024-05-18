import React, { useEffect, useState } from "react";
import { Pagination, Modal, Button, Dropdown } from "react-bootstrap";
import BusquedaBoxClientes from "components/ComponentesSimples/BusquedaClientes";
import BtnAgregarProveedor from "components/Proveedores/AgregarProveedor";
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
import EditarProveedorBtn from "components/Proveedores/EditarProveedor";

function TableList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [proveedores, setProveedores] = useState([]);

  const itemsPerPage = 5;

  const [prevState, setUpdateTable] = useState(0);

  //Aqui obtenemos los proveedores
  useEffect(() => {
    const getProveedorData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/proveedor/");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setProveedores(data.proveedorList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getProveedorData();
  }, [prevState]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentItems = () => {
    const filteredData = proveedores.filter(
      (item) =>
        (item.name &&
          item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.phone &&
          item.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.address &&
          item.address.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    console.log(value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const updateTable = () => {
    // Cambia el estado para actualizar la tabla
    setUpdateTable(Math.random());
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
              <BtnAgregarProveedor
                className="py-5"
                onUpdateTable={updateTable}
              ></BtnAgregarProveedor>
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
                <Card.Title as="h4">Proveedores</Card.Title>
                <p className="card-category">
                  Lista de los proveedores en el sistema
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Telefono</th>
                      <th>Direccion</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.idProveedor}>
                        <td>{item.idProveedor}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>
                          <EditarProveedorBtn
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
                    ...Array(
                      Math.ceil(proveedores.length / itemsPerPage)
                    ).keys(),
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
