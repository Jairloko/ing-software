import React, { useEffect, useState } from "react";
import { Pagination, Card, Container, Row, Col, Table } from "react-bootstrap";
import BusquedaBoxClientes from "components/ComponentesSimples/BusquedaClientes";
import BtnAgregarCliente from "components/Clientes/AgregarClienteBtn";
import EditarClienteBtn from "components/Clientes/EditarClienteBtn";

function TableList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [clientes, setClientes] = useState([]);
  const itemsPerPage = 5;

  const [prevState, setUpdateTable] = useState(0);

  //Aqui obtenemos los clientes
  useEffect(() => {
    const getClienteData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/cliente/");
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setClientes(data.clientesList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getClienteData();
  }, [prevState]);

  useEffect(() => {
    console.log(clientes); // Esto se ejecutará cada vez que clientes se actualice
  }, [clientes]);


  const updateTable = () => {
    // Cambia el estado para actualizar la tabla
    setUpdateTable(Math.random());
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentItems = () => {
    const filteredData = clientes.filter((item) =>
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) 
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleSearchChange = (value) => {
     setSearchQuery(value);
    // console.log(value)
    // setCurrentPage(1); // Reset to the first page when searching
  };

  const currentItems = getCurrentItems();

  const handleEditClick = () => {
    // Lógica para manejar clic en editar
  };

  const handleCloseEditModal = () => {
    // Lógica para cerrar modal de edición
  };

  return (
    <Container fluid>
      <Row>
        <Col md="2">
          <Card className="strpied-tabled-with-hover">
            <BtnAgregarCliente className="py-5" onUpdateTable={updateTable}></BtnAgregarCliente>
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
              <Card.Title as="h4">Clientes</Card.Title>
              <p className="card-category">
                Lista de los clientes en el sistema
              </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.idCliente}>
                      <td>{item.idCliente}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <EditarClienteBtn
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
                  ...Array(Math.ceil(clientes.length / itemsPerPage)).keys(),
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
  );
}

export default TableList;