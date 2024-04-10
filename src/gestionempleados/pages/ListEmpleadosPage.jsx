import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

import { Grid, Table, TableHead, TableRow, TableCell,TableBody, TableContainer, Paper, Button, Typography} from '@mui/material';

    
export const ListEmpleadosPage = () => {

        const navigate = useNavigate()

        const onChangeButton = () => {
            navigate("/formulario")

            console.log("ejecuta la accion")
        }

        const [empleados, setEmpleados] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [editingEmployeeId, setEditingEmployeeId] = useState(null);
        



        useEffect(() => {
        const token = sessionStorage.getItem('token');

          fetch('http://127.0.0.1:8000/apiRest/v1empleados/', {
            method:'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }}).then(response => response.json())
            .then(data => {
              setEmpleados(data);
              setIsLoading(false);
            })  
            .catch(error => {
              console.error('Error fetching data:', error);
              setIsLoading(false);
            });
        }, []);
      
        if (isLoading) {
          return <div>Cargando...</div>;
        }
  
  const handleDelete = (id) =>{

    const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar al empleado del registro de base de datos?');

    if(isConfirmed){

    const token = sessionStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/apiRest/v1empleados/${id}/`,  {
        headers: {
            'Authorization': `Bearer ${token}`
          },
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            // Actualizar la lista de empleados después de la eliminación
            setEmpleados(empleados.filter(empleado => empleado.id !== id));
          } else {
            console.error('Error deleting employee');
          }
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
        });
    }
    
  }

  const handleUpdate = (id) => {
    // Almacena el ID del empleado seleccionado en el estado y navega a la página de edición
    console.log('quiero saber si entra aqui')
    console.log('cual es el valor de id', id)
    setEditingEmployeeId(id);
    navigate(`/editar/empleado/${id}`);
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
        container
        pacing={2}
        sx={{ mb: 2, pt: 2 }}
                            >
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ width: '30%', mt: 2 }} color='success' onClick={onChangeButton}>
                Registrar Nuevo Empleado
            </Button>
        </Grid>
    </Grid>
    <TableContainer component={Paper}>
    <Typography variant='h5' sx={{ mb: 2, padding:1 }}>Lista de Empleados </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
            <TableCell align="center">Tipo de ID</TableCell>
            <TableCell align="center">Identificacion</TableCell>
            <TableCell align="center">Cargo</TableCell>
            <TableCell align="center">Departamento</TableCell>
            <TableCell align="center">Fecha de ingreso</TableCell>
            <TableCell align="center">Salario</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map((empleado) => (
            <TableRow
              key={empleados.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{empleado.id}</TableCell>
              <TableCell align="center">{empleado.nombre}</TableCell>
              <TableCell align="center">{empleado.apellido}</TableCell>
              <TableCell align="center">{empleado.tipo_identificacion}</TableCell>
              <TableCell align="center">{empleado.identificacion}</TableCell>   
              <TableCell align="center">{empleado.cargo}</TableCell>
              <TableCell align="center">{empleado.departamento}</TableCell>
              <TableCell align="center">{empleado.fechaingreso}</TableCell>
              <TableCell align="center">{empleado.salarioMensual}</TableCell>
              <TableCell align="center" ><Button variant='contained' onClick={() => handleUpdate(empleado.id)} >Editar</Button>
              <Button variant='contained' color='error'  onClick={() => handleDelete(empleado.id)}>Eliminar</Button ></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </Grid>
    </>
  )
  
}
