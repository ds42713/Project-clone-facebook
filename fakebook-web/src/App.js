import { useContext, useEffect, useRef } from "react";
import { ErrorContext } from "./contexts/ErrorContext";
import RouteConfig from "./routes/RouteConfig";
import { Toast } from 'bootstrap';

function App() {
  const { error } = useContext(ErrorContext)



  useEffect(()=>{
	if(error) {
		const toast = new Toast(toastEl.current)
		toast.show()
	}

  },[error])

  const toastEl = useRef()
  return (
    <>
      <div class="toast-container position-absolute p-3 start-50 bottom-0 translate-middle-x" >
                  
        <div class="toast align-items-center text-white bg-danger border-0" ref={toastEl}>
            <div className='d-flex'>
                <div class="toast-body">
                    {error}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close">

                </button>
            </div>
        </div>
      </div>
      <RouteConfig/>
    </>
  );
}

export default App;
