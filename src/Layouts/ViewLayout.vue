<script setup>
import AsideBarComponentVue from "@/components/AsideBarComponent.vue";


</script>

<template>

    <AsideBarComponentVue />
   
    <div class="p-4 sm:ml-64">
        <div class="p-4">
            <slot />
        </div>
    </div>
</template>
