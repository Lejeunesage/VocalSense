<template>
    <h1 class="text-center text-2xl font-semibold">Configuration</h1>
    <div class="py-6 flex justify-evenly">
        <div class="bg-gray relative w-60 ">
            <button type="button"
                class="absolute bottom-0 left-0 text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Créer une campagne </button>
        </div>

        <div class="bg-primary relative ">
            <button type="button"
            class="absolute bottom-0 left-0 text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            Créer une activité </button>
        </div>

        <div class="bg-primary relative ">
            <button type="button"
            class="absolute bottom-0 left-0 text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg 
            text-sm px-5 py-2.5 me-2 mb-2">
            Créer mots clé </button>
        </div>
        
        
    </div>

    <!-- <form action="" class=" px-20">
        <div class="space-y-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div>
                    <label for="campagne"> Nom campagne</label>
                    <div>
                        <input type="text" id="campagne" name="campagne"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div class="place-self-center ">
                    <button type="submit"  class="w-20 h-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Créer</button>
                </div>
            </div>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div>
                    <label for="activité"> Nom activité</label>
                    <div>
                        <input type="text" id="activité" name="activité"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div class="place-self-center">
                    <button type="submit"  class="w-20 h-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Créer</button>
                </div>
            </div>
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div>
                    <label for="keywords"> Keywords</label>
                    <div>
                        <input v-model="keyword" placeholder="Entrez un mot-clé" type="text" id="keywords" name="keywords"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>
                <div class="place-self-center">
                    <button @click="addKeyword" type="button" class="w-20 h-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Plus</button>
                </div>
                <div class="place-self-center">
                    <button @click="submitKeywords" type="button"  class="w-20 h-10 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Créer</button>
                </div>
            </div>
        </div>
    </form> -->
</template>

<script setup>
// import {  defineProps } from "vue";

// let props = defineProps({
//     keywords: {
//         type: Array,
//         default: () => ({}),
//     }

// })

// addKeyword() {
//     if(this.keywords.trim())
// }


// const submitKeywords = () => {
//     console.log('Keywords:', props.keywords);
// }

</script>