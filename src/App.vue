<script setup>
import NavbarComponent from "@/components/ConversationComponent.vue"

</script>
<template>
  <main>
    <NavbarComponent />
    <router-view />
    <!-- <div class="text-slate-400 text-2xl font-semibold">
      Bienvenue sur <span class="text-slate-600 font-extrabold ">VocalSense Analytics</span>, l'assistant conversationnel
      intelligent qui donne un sens à vos échanges vocaux.
    </div> -->

  </main>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
</style>
