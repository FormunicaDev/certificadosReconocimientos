import axios from 'axios'

export default {
    async obtenervalores(valor) {
        let data = []

        await axios.get(`/api/Valores?valor=${valor}`).then(res => {
            data = res.data
        })

        return data
    }
}