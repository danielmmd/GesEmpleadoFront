import { Link as RouterLink } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { useState } from 'react'


export const LoginPage = () => {

const navigate = useNavigate()

const [correo, setCorreo] = useState();
const [password, setPassword] = useState();


const handleSubmit = () => {
  // Aquí puedes hacer algo con los valores recuperados, como enviarlos a una API o mostrarlos en la consola
  console.log('correo:', correo);
  console.log('password:', password);

 
  const data2 = {
    username: correo,
    password: password

  }

const config = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data2) // Pasar el objeto data aquí
};

fetch('http://127.0.0.1:8000/api/token/', config)
    .then(response => {
        if (!response.ok) {
          throw new Error('Credenciales inválidas');
           
        }
        console.log("Se agregó el empleado correctamente.");
        return response.json()
        
    }).then(data => {
      const { access } = data; // Obtener el token del objeto JSON
      console.log('el token es:', access);
      // Almacenar el token en el sessionStorage
      sessionStorage.setItem('token',access);
      navigate("/empleados");
  })
    .catch(error => {
        console.error('Error al agregar el empleado:', error);  
        alert(error.message);
    });

  
};

  return (
    <>
      <Grid
        container
        spacing={0}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
      >

        <Grid
          item
          className='box-shadow'
          xs={3}
          sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
        >
          <Typography variant='h5' sx={{ mb: 1 }}>Login</Typography>

          <form onSubmit={handleSubmit}>
            <Grid container >
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Correo"
                  type="text"
                  placeholder="correo@gmail.com"
                  fullWidth
                  value={correo}
                  onChange={(event) => {
                    setCorreo(event.target.value);
                  }}
                >
                </TextField>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Password"
                  type="password"
                  placeholder="Password"
                  fullWidth
                  value={password }
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                >
                </TextField>
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{ mb: 2, pt: 2 }}
              >
                <Grid item xs={12}>
                  <Button variant='contained' fullWidth onClick={handleSubmit}>
                    Login
                  </Button>
                </Grid>

                <Grid container direction='row' justifyContent='end' sx={{ pt: 2 }}>
                  <Link component={RouterLink} color='inherit' to='/registrar/empleados'>
                    Crear Cuenta
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>

    </>

  )
}
