<template>
  <v-app class="animate__animated animate__fadeIn animate__slow">
    <v-app-bar
      :color="color"
     
      class=""
      fixed
      style="padding:0 5%"
      dark
      flat
    >
      <div class="d-flex align-center">
      </div>

      <v-spacer></v-spacer>
     <v-app-bar-nav-icon class="d-flex d-sm-none"/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer class="bg-1 ">
     <v-container>
       <div class="d-sm-none d-md-flex">
          <v-row no-gutters style="" class="footer d-none d-sm-flex ">
            <p class="font-7">© 2023 FORMUNICA - Todos los derechos reservados.</p>
            <v-spacer></v-spacer>
      </v-row>
       </div>
       <v-row no-gutters style="width:100%" class="footer d-flex d-sm-none d-none d-sm-flex d-md-none">
           
            <v-spacer></v-spacer>
            <div>
              <div style="display:flex">
                <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>-</v-btn>
                <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>-</v-btn>
                <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>-</v-btn>
                <v-btn style="flex:1;text-transform:none" class="font-7 mr-2" x-small text plain>-</v-btn>
            </div>
             <p class="font-7 text-center">© 2023 FORMUNICA - Todos los derechos reservados.</p>
            </div>
            <v-spacer></v-spacer>
      </v-row>
     </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import "./css/fonts.css"
export default {
  name: 'App',

  data: () => ({
    //
    color: "transparent",
    colo: "white",
  }),
  mounted() {
    const navbar = document.getElementById("nav-bar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        this.color = "whitesmoke";
        this.colo = "grey";
        navbar.classList.add("scale-in-center");
      } else {
        this.color = "transparent";
        this.colo = "green";
        navbar.classList.remove("scale-in-center");
        navbar.classList.add("scale-out-center");
      }
    });
  },
};
</script>
<style>
.footer{
  padding:4%;
}
@media screen and (max-width:600px) {
 .footer{
  padding:10%;
} 

}
</style>
