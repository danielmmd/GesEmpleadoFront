import {Routes, Route, Navigate} from "react-router-dom"
import { Formulario } from "../../components/Formulario"
import { ListEmpleadosPage } from "../pages/ListEmpleadosPage"
import { LoginPage } from "../../auth/pages/LoginPage"



export const GestionEmpleadosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/registrar/empleados" element={<Formulario />} />
      <Route path="/listar/empleados" element={<ListEmpleadosPage />} />
      <Route path="/editar/empleado/:id" element={<Formulario />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}