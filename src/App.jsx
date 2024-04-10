
import { Formulario } from './components/Formulario'
import {Container} from '@mui/material'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme/AppTheme'
import { ListEmpleadosPage } from './gestionempleados/pages/ListEmpleadosPage'
function App() {
  

  return (
    <>
    <AppTheme>
      <AppRouter/>  
    </AppTheme>
    </>
  )
}

export default App
