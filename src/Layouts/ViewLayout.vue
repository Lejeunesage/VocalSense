<script setup>
import AsideBarComponentVue from "../partials/AsideBarComponent.vue";
import NavBarComponentVue from "../partials/NavBarComponent.vue";



</script>

<template>
    
    <NavBarComponentVue />
    <AsideBarComponentVue />
   
    <div class="p-4 sm:ml-64 pt-20">
        <div class="p-4 ">
            <slot />
        </div>
    </div>

</template>


