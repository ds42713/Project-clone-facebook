function Spinner() {
    return (
      <div
        className="d-flex justify-content-center align-items-center offcanvas-backdrop show"
        style={{ zIndex: 1100 }} >
        <div
          className="spinner-border text-warning"
          style={{ width: '3rem', height: '3rem' }} >

          </div>
        
      </div>
    );
  }
  
  export default Spinner;