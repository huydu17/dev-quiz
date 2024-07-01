import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elemets.css";
import "./stylesheets/layout.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/login";
import Register from "./pages/common/register";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/common/home";
import Exam from "./pages/admin/Exams";
import AddEditExam from "./pages/admin/Exams/AddEditExam";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import WriteExam from "./pages/user/WriteExam/index";
import Report from "./pages/admin/Report/Report";
import ReportUser from "./pages/user/Report/ReportUser";
function App() {
  const { loading } = useSelector((state) => state.loader);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>

          {/*Route report by admin */}
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          ></Route>

          {/*Route exam */}
          <Route
            path="/admin/exams"
            element={
              <ProtectedRoute>
                <Exam />
              </ProtectedRoute>
            }
          ></Route>
          {/*Route add exam */}
          <Route
            path="/admin/exams/add"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          ></Route>
          {/*Route add exam */}
          <Route
            path="/admin/exams/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/user/write-exam/:id"
            element={
              <ProtectedRoute>
                <WriteExam />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/user/reports"
            element={
              <ProtectedRoute>
                <ReportUser />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
