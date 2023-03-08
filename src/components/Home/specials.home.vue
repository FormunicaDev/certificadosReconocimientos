<template>
  <div style="position:relative;" class=" sp-container" >

  <div class="sh-container">
    
  </div>
     <div style="margin-top:5%">
         <!-- container for the upcoming specials -->
         <p class="font-2 weight-600 text-center">Reconocimiento al valor Formunica</p>   
         <br>
        <v-card elevation="7" rounded="xl">
            <v-card-title>Información</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            v-model="reconocimientoObj.EmpleadoEnvio"
                            dense
                            outlined
                            label="¿Quien brinda este reconocimiento?"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-autocomplete
                            v-model="reconocimientoObj.EmpleadoRecibe"
                            dense
                            :items="empleadoObj"
                            item-text="nombre"
                            item-value="empleado"
                            outlined
                            label="¿A quien le brinda este reconocimiento?"
                            >
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-radio-group label="¿Que valor reconoce en esta persona?" 
                            v-model="reconocimientoObj.valor" 
                            inline 
                        >
                            <div 
                                v-for="(items, index) in valores" 
                                :key="index"
                            >
                                <v-radio 
                                    :label="items.valor" 
                                    :value="items.idValor"
                                >
                                </v-radio>
                            </div>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="8">
                        <v-textarea
                            v-model="reconocimientoObj.Razon"
                            label="¿Qué comportamientos evidencian que el colaborador vive el valor por el cuál lo está reconociendo?"
                            outlined
                            dense
                            clearable
                            rows="10"
                            counter="500"
                        >

                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="1">
                        <v-btn :prepend-icon="icons.mdiSendCircle" color="primary" @click="postReconocimiento()">Enviar</v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn :prepend-icon="icons.mdiSendCircle" color="secondary" @click="refresh()">Refrescar</v-btn>
                    </v-col>
                </v-row>
                    <v-snackbar
                        v-model="snackbar"
                        multi-line
                        >
                        {{ text }}

                        <template v-slot:actions>
                            <v-btn
                            color="primary"
                            variant="text"
                            @click="snackbar = false"
                            >
                            Cerrar
                            </v-btn>
                        </template>
                </v-snackbar>
                <v-dialog
                    v-model="dialog"
                    :scrim="false"
                    persistent
                    width="auto"
                    >
                    <v-card
                        color="primary"
                    >
                        <v-card-text>
                        Por Favor Espere...
                        <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                        ></v-progress-linear>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-card-text>
        </v-card>
     </div>
  </div>
</template>

<script>
import {mdiVuetify, mdiSendCircle } from '@mdi/js'
import valores from '@/services/valores'
import empleados from '@/services/empleado'
import reconocimiento from '@/services/reconocimiento'

export default {
    data(){
        return {
            icons: {
                mdiVuetify,
                mdiSendCircle,
            },
            tab:1,
            tabs:{
                team:1,
                couple:2,
                family:3
            },
            sw:1,
            inline:null,
            snackbar: false,
            dialog: false,
            text: '',
            valores: [],
            empleadoObj: [],
            valorParam: '',
            reconocimientoObj: {
                valor: null,
                EmpleadoRecibe: '',
                Razon: '',
                EmpleadoEnvio: ''
            },

        }
    },
    async created() {
        await this.getValores()
        await this.getEmpleados()
    },
    methods:{
        updateTab(value){
            this.tab=value;
        },
        async getValores() {
            const data = await valores.obtenervalores(this.valorParam)
            this.valores = data
        },
        async getEmpleados() {
            const data = await empleados.obtenerEmpleado(1000)
            this.empleadoObj = data.items
        },
        async postReconocimiento() {
            const valida = this.validaCampos()
            if(valida) {
                this.snackbar = true
                this.text = 'Complete todos los campos'
                return
            }
            this.dialog = true
            const data = await reconocimiento.createReconocimiento(this.reconocimientoObj)
            this.snackbar = true
            this.text =  data.statusCode === 200 ? 'Reconocimiento Enviado con Exito' : 'Error al crear reconocimiento'
            await this.refresh()
            this.dialog = false
        },
        async refresh() {
            await this.getEmpleados()
            await this.getValores()
            this.reconocimientoObj.valor = null
            this.reconocimientoObj.Razon = ''
            this.reconocimientoObj.EmpleadoEnvio = ''
            this.reconocimientoObj.EmpleadoRecibe = ''
        },
        validaCampos() {
            if(this.reconocimientoObj.valor === null) return true
            if(this.reconocimientoObj.Razon === '') return true
            if(this.reconocimientoObj.EmpleadoEnvio === '') return true
            if(this.reconocimientoObj.EmpleadoRecibe === '') return true

            return false
        }
    },
    components:{
    }

}
</script>

<style>
.sp-container{
    
    padding:4%;
}
.tab{
    margin: 0 10%;
    background:#FFFFFF;
    height: 8vh;
    border-radius: 13px;
}
.sh-container{
    position:absolute;
    top:-15%;
    width:100%;
}
@media screen and (max-width:600px) {
    .sh-container{
    position:absolute;
    top:-3em;
    width: 90% !important;
    
} 
.hide-xs{
    display: none !important;
}  
}


</style>