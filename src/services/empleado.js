import axios from 'axios'

export default {
    async obtenerEmpleado(totalRegistros) {
        let data = []

        await axios.get(`/api/Empleado?registroPorPagina=${totalRegistros}`).then(res => {
            data = res.data
        })

        return data
    }
}