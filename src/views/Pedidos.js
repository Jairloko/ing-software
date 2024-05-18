import React, { useEffect, useState } from "react";
import { Pagination, Modal, Button, Dropdown } from "react-bootstrap";
import BusquedaBoxClientes from "components/ComponentesSimples/BusquedaClientes";
import BtnAgregarCliente from "components/Clientes/AgregarClienteBtn";
import BtnAgregarPedido from "components/Pedidos/AgregarPedidoBtn";
import EditarPedidoBtn from "components/Pedidos/EditarPedidoBtn";
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
import BtnAgregarCostoExtra from "components/Pedidos/AgregarCostoExtra";
import EditarCostoExtra from "components/Pedidos/EditarCostoExtra";

function TableList() {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCE, setCurrentPageCE] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryGE, setSearchQueryGE] = useState("");

  const [pedidos, setPedidos] = useState([]);
  const [prevState, setUpdateTable] = useState(0);
  const [gasto, setGasto] = useState([]);
  const [prevStateGasto, setUpdateTableGasto] = useState(0);

  const [clientes, setClientes] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  //Aqui obtenemos los clientes
  useEffect(() => {
    const getClienteData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/cliente/");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setClientes(data.clientesList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getClienteData();
  }, []);

  //Aqui obtenemos los proveedores
  useEffect(() => {
    const getProveedorData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/proveedor/");
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
  }, []);

  //Aqui obtenemos los pedidos
  useEffect(() => {
    const getPedidoData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/v1/pedido/");
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

  //Aqui obtenemos los gastos
  useEffect(() => {
    const getGastoData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/gastoExtra/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setGasto(data.gastoExtraList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getGastoData();
  }, [prevStateGasto]);

  //Actualizamos las tablas Pedidos
  const updateTable = () => {
    // Cambia el estado para actualizar la tabla
    setUpdateTable(Math.random());
  };

  //Actualizamos las tablas Gastos
  const updateTableGasto = () => {
    // Cambia el estado para actualizar la tabla
    setUpdateTableGasto(Math.random());
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

  //Gastos
  const getCurrentItemsCE = () => {
    const filteredData = gasto.filter(
      (item) =>
        (item.concepto &&
          item.concepto.toLowerCase().includes(searchQueryGE.toLowerCase())) ||
        (item.pedido &&
          item.pedido.toString().includes(searchQueryGE.toLowerCase()))
    );
    const startIndex = (currentPageCE - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    console.log(value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleSearchChangeGE = (value) => {
    setSearchQueryGE(value);
    console.log(value);
    setCurrentPageCE(1); // Reset to the first page when searching
  };

  const currentItems = getCurrentItems();

  const currentItemsGastoExtra = getCurrentItemsCE();

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const getActivoStatus = (activo) => {
    switch (activo) {
      case 0:
        return "Cancelado";
      case 1:
        return "Pendiente";
      case 2:
        return "Completo";
    }
  };

  
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="2">
            <Card className="strpied-tabled-with-hover">
              <BtnAgregarPedido
                className="py-5"
                onUpdateTable={updateTable}
                clientes={clientes}
              ></BtnAgregarPedido>
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
                <Card.Title as="h4">Pedidos</Card.Title>
                <p className="card-category">
                  Lista de los pedidos en el sistema
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
                      <th>Precio de compra</th>
                      <th>Proveedor</th>
                      <th>Estatus</th>
                      <th>Opciones</th>
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
                        {item.compra != 0 ? (
                          <td>$ {item.compra}</td>
                        ) : (
                          <td>---</td>
                        )}
                        {item.proveedor != "" ? (
                          <td>{item.proveedor}</td>
                        ) : (
                          <td>---</td>
                        )}
                        <td>{getActivoStatus(item.activo)}</td>
                        <td>
                          <EditarPedidoBtn
                            onEditClick={handleEditClick}
                            item={item}
                            onUpdateTable={updateTable}
                            onUpdateTableGasto={updateTableGasto}
                            clientes={clientes}
                            proveedores={proveedores}
                          />
                        </td>
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

        {/* Gastos */}
        <Row>
          <Col md="5">
            <Card className="strpied-tabled-with-hover">
              <BusquedaBoxClientes onSearch={handleSearchChangeGE} />
            </Card>
          </Col>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Gastos extra</Card.Title>
                <p className="card-category">
                  Lista de los gastos extra en el sistema
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>#Pedido</th>
                      <th>Concepto</th>
                      <th>Gasto</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItemsGastoExtra.map((item) => (
                      <tr key={item.idGastoExtra}>
                        <td>{item.idGastoExtra}</td>
                        <td>{item.pedido}</td>
                        <td>{item.concepto}</td>
                        <td>$ {item.gasto}</td>
                        <td>
                          <EditarCostoExtra
                            onEditClick={handleEditClick}
                            item={item}
                            onUpdateTableGasto={updateTableGasto}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination className="px-2">
                  {[
                    ...Array(Math.ceil(gasto.length / itemsPerPage)).keys(),
                  ].map((number) => (
                    <Pagination.Item
                      key={number + 1}
                      onClick={() => handlePageChangeCostoExtra(number + 1)}
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
