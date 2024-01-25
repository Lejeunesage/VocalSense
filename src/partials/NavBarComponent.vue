<script setup>

import LogoComponent from "@/components/LogoComponent.vue"
// import ConfigComponent from "@/components/ConfigComponent.vue"
// import { RouterLink } from "vue-router";

</script>

<template>
    <nav class=" flex items-center justify-between gap-10 bg-white  fixed top-0 h-20 z-20 shadow-md px-10 w-full">
        <LogoComponent />

        <div class="flex items-center gap-5">
            <ul class="py-2 flex">
               
                <li>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Paramêtre</a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">Déconnexion</a>
                </li>
            </ul>
            <div>
                <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo">
            </div>
        </div>

    </nav>
</template>
