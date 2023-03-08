import axios from "axios"

export default {
    async createReconocimiento(obj) {
        let data = []
        await axios.post('/api/Reconocimiento',obj).then(res => {
            data = res.data
        })

        return data
    }
}