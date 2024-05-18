import React, { useRef } from "react";

function BusquedaBoxClientes({ onSearch }) {
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    const value = inputRef.current.value;
    //console.log(value);
    onSearch(value);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        ref={inputRef}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-secondary" type="button" onClick={handleButtonClick}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default BusquedaBoxClientes;
