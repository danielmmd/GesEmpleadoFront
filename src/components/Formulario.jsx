
import { TextField, Grid, Typography, FormControl,  Select, MenuItem, InputLabel, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { useState } from "react"

export const Formulario = () => {

    const navigate = useNavigate()

    const [nombre, setNombre] = useState()
    const [apellido, setApedellidos] = useState()
    const [fechaingreso, setFechaingreso] = useState()
    const [cargo, setCargo] = useState()
    const [departamento, setDepartamento] = useState()
    const [salarioMensual, setSalariomensual] = useState()
    const [telefono, setTelefono] = useState()
    const [identificacion, setIdentificacion] = useState()
    const [correo, setCorreo] = useState()
    const [indicativo, setIndicativo] = useState()
    const [tipoidentificacion, setTipodentificacion] = useState()
    const [tipotelefono, setTipotelefono] = useState()
    
    

    const handleSubmit = () =>{
        console.log("nombre", nombre)
        console.log("apellidos", apellido)
        console.log("fecha", fechaingreso)
        console.log("cargo", cargo)
        console.log("departamento", departamento)
        console.log("salario", salarioMensual)
        console.log("telefono", telefono)
        console.log("correo", correo)
        console.log("indicativo", indicativo)
        console.log("indentificacion", identificacion)
        console.log("Tipo de indentificacion", tipoidentificacion)

        console.log(typeof(nombre))
        console.log(typeof(apellido))
        console.log(typeof(fechaingreso))
        console.log(typeof(departamento))
        console.log(typeof(salarioMensual))
        console.log(typeof(cargo))
        console.log(typeof(tipoidentificacion))
        console.log(typeof(identificacion))

         const data = {
            "nombre": nombre,
            "apellido": apellido,
            "tipo_identificacion": tipoidentificacion,
            "identificacion": identificacion,
            "fechaingreso": fechaingreso,
            "salarioMensual": salarioMensual,
            "cargo": cargo,
            "departamento": departamento,
            "telefonos": [
                {
                  "tipo": tipotelefono,
                  "numero": telefono,
                  "indicativo": indicativo  
                }
              ],
              "emails": [
                {
                  "email": correo
                }
              ]
        }; 

       /*  const data = {
            "nombre": "Casta",
            "apellido": "Perez",
            "tipo_identificacion": "nit",
            "identificacion": "123456789",
            "fechaingreso": "2024-04-09",
            "salarioMensual": "5000.00",
            "cargo": "Desarrollador",
            "departamento": "Tecnología"
          } */
          
        const token = sessionStorage.getItem('token');

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data) // Pasar el objeto data aquí
        };
        
        console.log('aun viene el token?', token)

        fetch('http://127.0.0.1:8000/apiRest/v1empleados/', config)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un problema al agregar el empleado.');
                }
                
                else if(response.ok){
                    console.log("Se agregó el empleado correctamente.");
                    navigate("/empleados")

                }       
                
            })
            .catch(error => {
                console.error('Error al agregar el empleado:', error);
            });
    }



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

                    <Typography variant="h4" >Registrar Empleado</Typography >
                    <form >
                        <Grid container >
                            <Grid item xs={6} sx={{ mt: 2, pr: 2 }}>
                                <TextField
                                    label="Nombre"
                                    type="text"
                                    placeholder="Ingresar el nombre"
                                    fullWidth
                                    value={nombre}
                                    onChange={(event)=>{
                                        setNombre(event.target.value)
                                    }}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <TextField
                                    label="Apellidos"
                                    type="Ingresar Apellidos"
                                    placeholder=""
                                    fullWidth
                                    value={apellido}
                                    onChange={(event)=>{
                                        setApedellidos(event.target.value)
                                    }}

                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl sx={{ width: '100%', mt: 2, pr: 2 }}>
                                    <InputLabel id="simple-select">Tipo de Documento</InputLabel>
                                    <Select
                                        name="Tipo de Documento"
                                        placeholder="Tipo de Documento"
                                        label="Tipo de documento"
                                        fullWidth 
                                        onChange={(event)=>{
                                        setTipodentificacion(event.target.value)
                                        }}
                                        >
                                        <MenuItem>Seleccione</MenuItem>
                                        <MenuItem value="cc">Cedula de Ciudadania</MenuItem>
                                        <MenuItem value="nit">NIT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{ mt: 2, pr: 2 }}>
                                <TextField
                                    label="Numero de identificacion"
                                    type="number"
                                    placeholder="Numero de identificacion"
                                    fullWidth
                                    value={identificacion}
                                    onChange={(event)=>{
                                        setIdentificacion(event.target.value)
                                    }}

                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <TextField
                                    label="Fecha de ingreso"
                                    InputLabelProps={{ shrink: true }}
                                    type="date"
                                    placeholder=""
                                    fullWidth
                                    value={fechaingreso}
                                    onChange={(event)=>{
                                        setFechaingreso(event.target.value)
                                    }}

                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2, pr: 2 }}>
                                <TextField
                                    label="Salario Mensual"
                                    type="number"
                                    placeholder="Salario Mensual"
                                    fullWidth
                                    value={salarioMensual}
                                    onChange={(event)=>{
                                        setSalariomensual(event.target.value)
                                    }}

                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <TextField
                                    label="Cargo"
                                    type="text"
                                    placeholder="ingresar cargo"
                                    fullWidth
                                    value={cargo}
                                    onChange={(event)=>{
                                        setCargo(event.target.value)
                                    }}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2, pr: 2 }}>
                                <TextField
                                    label="Departamento"
                                    type="text"
                                    placeholder="Departamento"
                                    fullWidth
                                    value={departamento}
                                    onChange={(event)=>{
                                        setDepartamento(event.target.value)
                                    }}
                                >
                                </TextField>
                            </Grid>
                           <Grid item xs={6} sx={{ mt: 2 }}>
                                <TextField
                                    label="Correo Electronico"
                                    type="email"
                                    placeholder="correo@gmail.com"
                                    fullWidth
                                    value={correo}
                                    onChange={(event)=>{
                                        setCorreo(event.target.value)
                                    }}
                                >
                                </TextField>
                            </Grid> 
                            <Grid item xs={3}>
                                <FormControl sx={{ width: '100%', mt: 2, pr: 2 }}>
                                    <InputLabel id="simple-select-telefono">Tipo de Telefono</InputLabel>
                                    <Select
                                        name="Tipo de Telefono"
                                        placeholder="Tipo de Telefono"
                                        label="Tipo de Telefono"
                                        fullWidth 
                                        onChange={(event)=>{
                                            setTipotelefono(event.target.value)
                                        }}>
                                        <MenuItem>Seleccione</MenuItem>
                                        <MenuItem value="cell">Celular</MenuItem>
                                        <MenuItem value="tel">Telefono</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{ mt: 2, pr: 2 }}>
                                <TextField
                                    label="Indicativo"
                                    type="number"
                                    placeholder="57"
                                    fullWidth
                                    value={indicativo}
                                    onChange={(event)=>{
                                        setIndicativo(event.target.value)
                                    }}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <TextField
                                    label="Numero de telefono"
                                    type="number"
                                    placeholder="3147989894"
                                    fullWidth
                                    value={telefono}
                                    onChange={(event)=>{
                                        setTelefono(event.target.value)
                                    }}

                                    
                                >
                                </TextField>
                            </Grid>
                            <Grid
                                container
                                spacing={2}
                                sx={{ mb: 2, pt: 2 }}
                            >
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant='contained' sx={{ width: '50%', mt: 2 }} onClick={handleSubmit}>
                                        Registrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>

    )


}
