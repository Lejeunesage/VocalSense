<script setup>
import { ref } from "vue";
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

// let props = defineProps({
//     keywords: Array,
//     campagnes: Array,

// })
let campagnes = [];
let ajoutCampagne = ref(false);
let campagne = ref("");
// let activité = ref("");

function createCampagne() {
    this.ajoutCampagne = true;
}

function closeModal() {
      this.ajoutCampagne = !this.ajoutCampagne
}

function creerCampagne() {
    this.ajoutCampagne = !this.ajoutCampagne
    console.log(campagne);
    campagnes.push(campagne);
}


</script>

<template>
    <h1 class="text-center text-2xl font-semibold">Configuration</h1>
    <div class="py-6 flex justify-evenly">
        <div class="bg-gray relative w-60 bg-opacity-25 h-40 overflow-y-auto rounded-xl flex-row">
            <button type="button" @click="createCampagne()"
                class="fixed text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Créer une campagne
            </button>
            <div class="flex flex-col px-2" v-for="camp in campagnes" :key="camp">
                <span class="font-medium">{{camp}}</span>
            </div>

        </div>
        <div class="bg-gray relative w-60 bg-opacity-25 h-40 overflow-y-auto rounded-xl flex-row">
            <button type="button"
                class="fixed text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Créer une activité
            </button>
            <div class="flex flex-col px-2">
                <span class="font-medium">ff</span>
                <span class="font-medium">sfss</span>
                <span class="font-medium">stst</span>
                <span class="font-medium">tyy</span>
                <span class="font-medium">ssst</span>
                <span class="font-medium">urr</span>
                <span class="font-medium">ute</span>
            </div>

        </div>
        <div class="bg-gray relative w-60 bg-opacity-25 h-40 overflow-y-auto rounded-xl flex-row">
            <button type="button"
                class="fixed text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                Créer mots clé
            </button>
            <div class="flex flex-col px-2">
                <span class="font-medium">ff</span>
                <span class="font-medium">sfss</span>
                <span class="font-medium">stst</span>
                <span class="font-medium">tyy</span>
                <span class="font-medium">ssst</span>
                <span class="font-medium">urr</span>
                <span class="font-medium">ute</span>
            </div>
        </div>

        <!-- Formulaire pour la création d'une campagne -->
        <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray bg-opacity-80"
            v-if="ajoutCampagne">
            <div
                class="bg-gray border relative border-primary md:max-w-3xl m-auto pt-6 shadow-lg text-primary placeholder-primary placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pr-8 dark:bg-gray animation">
                <span @click="closeModal()" class="absolute top-5 right-5 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                            clip-rule="evenodd" />
                    </svg>

                </span>

                <form @submit.prevent="">
                    <div class="m-4 w-full tailleChang">
                        <div class="flex items-center">
                            <label class="px-4 flex items-center text-primary text-xl font-bold" for="campagne">
                                Nom campagne:
                            </label>
                            <input
                                class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 text-primary placeholder-slate-400 rounded-md pl-6 ring-1 ring-slate-200 shadow-sm w-[70%] py-2"
                                type="text" id="campagne" v-model="campagne" />
                        </div>
                        <div>
                        </div>
                    </div>
                </form>
                <div class="flex items-center justify-end">
                    <button
                        class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8"
                        @click="creerCampagne()">
                        Créer
                    </button>
                </div>
            </div>
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
