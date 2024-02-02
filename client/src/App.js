import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AddReview from "./Component/AddReview";
import Review from "./Component/Review";
import EditReview from "./Component/EditReview";
import socket from "./Socket";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
<>
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Review />} />
        <Route path="/new" element={<AddReview />} />
        <Route path="/edit-review/:id" element={<EditReview />} />

        
          {/* <Route path="/review" element={<Review />} />
          <Route path="/edit-review/:id" element={<EditReview />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer
     
      />
    </div>
</>
  );
}

export default App;
