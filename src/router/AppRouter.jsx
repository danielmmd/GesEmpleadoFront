import {Routes, Route} from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ListEmpleadosPage } from "../gestionempleados/pages/ListEmpleadosPage"
import { Formulario } from "../components/Formulario"
import { LoginPage } from "../auth/pages/LoginPage"
import { UpdateForm } from "../components/UdateForm"



export const AppRouter = () => {
  return (
    <Routes>

       {/*  {Login} */}

       <Route path="/auth/*" element={<AuthRoutes/>}/>
       {/* Gestion usuario */}
       <Route path="/*" element={<LoginPage/>}/>
       <Route path="/formulario" element={<Formulario />} />
       <Route path="/empleados" element={<ListEmpleadosPage />} />
       <Route path="/editar/empleado/:id" element={<UpdateForm/>} />
      

    </Routes>
  )
}
