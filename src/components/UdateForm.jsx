import { TextField, Grid, Typography, FormControl,  Select, MenuItem, InputLabel, Button } from '@mui/material'
import { useState, useEffect } from "react"
import { useParams, useNavigate} from 'react-router-dom';

    export const UpdateForm = () => {
    
    const navigate = useNavigate()
    const { id } = useParams();

    console.log("que viene por id", id)
    

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
    const [tipotelefono, setTipotelefono] = useState()
    const [tipoidentificacion, setTipodentificacion] = useState()
    
    useEffect(() => {
       
        const token = sessionStorage.getItem('token');

          fetch(`http://127.0.0.1:8000/apiRest/v1empleados/${id}/`, {
            method:'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }}).then(response => response.json())
            .then(data => {
              setCargo(data.cargo)
              setNombre(data.nombre)
              setApedellidos(data.apellido)
              setCorreo(data.correo)
              setDepartamento(data.departamento)
              setFechaingreso((data.fechaingreso))
              setIdentificacion(data.identificacion)
              setIndicativo(data.indicativo)
              setTelefono(data.telefono)
              setTipodentificacion(data.tipo_identificacion)
              setTipotelefono(data.tipo)
              setIndicativo((data.indicativo))
              setSalariomensual(data.salarioMensual)
              console.log('que viene de data')
              console.log("quiero sasber ahora si que viene por data", data)
            })  
            .catch(error => {
              console.error('Error fetching data:', error);
              
            });
        }, [id]);

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
        
        const token = sessionStorage.getItem('token');

        const config = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data) // Pasar el objeto data aquí
        };
        
        console.log('aun viene el token?', token)

        fetch(`http://127.0.0.1:8000/apiRest/v1empleados/${id}/`, config)
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
                                    InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}

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
                                        value={tipoidentificacion} // Valor seleccionado del estado
                                        onChange={(event) => {
                                            setTipodentificacion(event.target.value); // Actualizar estado cuando se cambie la selección
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        <MenuItem value="">Tipo de Documento</MenuItem>
                                        <MenuItem value="cc">Cedula de Ciudadania</MenuItem>
                                        <MenuItem value="nit">NIT</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{ mt: 2, pr: 2 }}>
                                <TextField
                                    label="Numero de identificacion"
                                    InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}
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
                                        InputLabelProps={{ shrink: true }}
                                        placeholder="Tipo de Telefono"
                                        label="Tipo de Telefono"
                                        fullWidth 
                                        onChange={(event)=>{
                                            setTipotelefono(event.target.value)
                                        }}>
                                        <MenuItem value="">{tipotelefono}</MenuItem>
                                        <MenuItem value="cell">Celular</MenuItem>
                                        <MenuItem value="tel">Telefono</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} sx={{ mt: 2, pr: 2 }}>
                                <TextField
                                    label="Indicativo"
                                    InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}
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
                                        Actualizar
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
