import React, { useEffect, useState } from "react";
import BusquedaBox from "components/ComponentesSimples/Busqueda";
import BtnAgregarPedido from "components/Pedidos/AgregarPedidoBtn";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import ToggleButtonExample from "components/Pedidos/AgregarPedidoBtn";
import BusquedaBoxClientes from "components/ComponentesSimples/BusquedaClientes";

function TableList() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCE, setCurrentPageCE] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryGE, setSearchQueryGE] = useState("");

  const [pedidos, setPedidos] = useState([]);
  const [prevState, setUpdateTable] = useState(0);

  //Aqui obtenemos los pedidos
  useEffect(() => {
    const getPedidoData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/pedido/dashboard"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setPedidos(data.pedidoList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPedidoData();
  }, [prevState]);

  //Actualizamos las tablas Pedidos
  const updateTable = () => {
    // Cambia el estado para actualizar la tabla
    setUpdateTable(Math.random());
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChangeCostoExtra = (pageNumber) => {
    setCurrentPageCE(pageNumber);
  };

  //Pedidos
  const getCurrentItems = () => {
    const filteredData = pedidos.filter(
      (item) =>
        (item.idPedido &&
          item.idPedido.toString().includes(searchQuery.toString())) ||
        (item.cliente &&
          item.cliente.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.marca &&
          item.marca.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.anio && item.anio.toString().includes(searchQuery.toString())) ||
        (item.modelo &&
          item.modelo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.pieza &&
          item.pieza.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.proveedor &&
          item.proveedor.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <Col md="5">
            <Card className="strpied-tabled-with-hover">
              <BusquedaBoxClientes onSearch={handleSearchChange} />
            </Card>
          </Col>

          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Pedidos pendientes</Card.Title>
                <p className="card-category">
                  Lista de los pedidos pendientes en el sistema
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Año</th>
                      <th>Nombre de la pieza</th>
                      <th>Precio de la venta</th>
                      <th>Estatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.idPedido}>
                        <td>{item.idPedido}</td>
                        <td>
                          {new Date(item.createdAt).toLocaleDateString("es-MX")}
                        </td>
                        <td>{item.cliente}</td>
                        <td>{item.marca}</td>
                        <td>{item.modelo}</td>
                        <td>{item.anio}</td>
                        <td>{item.pieza}</td>
                        <td>$ {item.precio}</td>
                        <td>Pendiente</td>

                        {/* <td>
                          <EditarPedidoBtn
                            onEditClick={handleEditClick}
                            item={item}
                            onUpdateTable={updateTable}
                          />
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="px-2">
                  {[
                    ...Array(Math.ceil(pedidos.length / itemsPerPage)).keys(),
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
