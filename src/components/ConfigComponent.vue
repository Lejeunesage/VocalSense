<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios';
import ViewLayout from "../layouts/ViewLayout.vue";

onMounted(() => {
    getCampagneList(),
        getActivityList(),
        motsCles.value

})

// Variable permettant d'afficher le modal de creation de campagne
let showAddCampaignModal = ref(false);

// Variable permettant d'afficher le modal de modification d'une campagne
let showModifCampaignModal = ref(false);


// Fonction permattant d'afficher le modal de création de campagne
function showCreateCampagneModal() {
    showAddCampaignModal.value = true;
}

// Fonction permattant d'afficher le modal de modification d'une campagne
function showModifCampagneModal() {
    showModifCampaignModal.value = true;
}


// Fonction permattant de fermer le modal de création de campagne
function closeCreateCampagneModal() {
    showAddCampaignModal.value = !showAddCampaignModal.value
}

// Fonction permattant de fermer le modal de modification d'une campagne
function closeModifCampagneModal() {
    showModifCampaignModal.value = !showModifCampaignModal.value
}


let nom_campagne = ref('');
const response = ref(null)
let campagnes = ref([]);

// Fonction permettant de recupérer toutes les campagnes disponibles
const getCampagneList = async () => {
    try {
        response.value = await axios.get('http://localhost:8000/api/campaigns-list')

        console.log(response.value);
        campagnes.value = response.value.data;

    } catch (error) {
        console.error(error)
    }
}

// Fonction permettant de creer une nouvelle campagne
const creerCampagne = async () => {
    const body = {
        nom_campagne: nom_campagne.value
    }

    try {
        response.value = await axios.post('http://localhost:8000/api/store-campaign', body)

        console.log(response.value);
        campagnes.value = response.value.data.campaign_list
        showAddCampaignModal.value = false
        nom_campagne.value = ""

    } catch (error) {
        console.error(error)
    }
}

// Variables récupérant le nom de la campagne
let campagneDonnes = ref('')
// Variables récupérant l'id de la campagne sélectionné
let campagneSelectId = ref(null)
// Fonction permettant de récupérer les informations de la campagne a modifié
const getCampagneById = async (id) => {
    try {
        campagneSelectId = id
        response.value = await axios.get(`http://localhost:8000/api/${id}/get-campaign`)

        campagneDonnes.value = response.value.data.nom_campagne;

    } catch (error) {
        console.error(error)
    }
}


// Fonction permettant de mettre a jour une campagne
const updateCampagne = async () => {
    const body = {
        id: campagneSelectId,
        nom_campagne: campagneDonnes.value
    }

    try {
        response.value = await axios.put('http://localhost:8000/api/update-campaign', body)
        console.log(response.value);
        campagnes.value = response.value.data.campaign_list
        showModifCampaignModal.value = false;
        campagneSelectId = null
        campagneDonnes.value = ''
    } catch (error) {
        console.error(error)
    }
}

// Fonction permettant de supprimer une campagne
const deleteCampagne = async (id) => {
    try {
        window.alert('Êtes-vous sur de vouloir faire cette suppression ?')
        response.value = await axios.delete(`http://localhost:8000/api/${id}/delete-campaign`)
        console.log(response);
        campagnes.value = response.value.data.campaign_list
    } catch (error) {
        console.error(error)
    }
}


//   Activité
let nom_activite = ref('')
let activites = ref([]);
let campagneActivitySelect = ref(null);

// Variable permettant d'afficher le modal de création d'une activitée
let showAddActivityModal = ref(false);

// Fonction permattant d'afficher le modal de création d'une activitée
function showCreateActivityModal() {
    showAddActivityModal.value = true;
}

// Fonction permattant de fermer le modal de création d'une activitée
function closeCreateActivityModal() {
    showAddActivityModal.value = !showAddActivityModal.value
}

// Fonction permettant de recupérer toutes les activités disponibles
const getActivityList = async () => {
    try {
        response.value = await axios.get('http://localhost:8000/api/activities-list')
        console.log(response.value);
        activites.value = response.value.data;
        console.log(activites.value);

    } catch (error) {
        console.error(error)
    }
}

// Fonction permettant de creer une nouvelle activité
const creerActivite = async () => {
    const body = {
        nom_activite: nom_activite.value,
        campaign_id: campagneActivitySelect.value
    }

    try {
        response.value = await axios.post('http://localhost:8000/api/store-activity', body)
        console.log(response.value);
        activites.value = response.value.data.activity_list
        showAddActivityModal.value = false
        campagneActivitySelect.value = null

    } catch (error) {
        console.error(error)
    }
}

// Variables récupérant le nom de l'activité sélectionné
let activityDonnes = ref('')
// Variables récupérant l'id de l'activité sélectionné
let activitySelectId = ref(null)

// Variable permettant d'afficher le modal de mise a jour d'une activitée
let showModifActivityModal = ref(false);

// Fonction permettant d'afficher le modal de mise a jour d'une activitée
function showUpdateActivityModal() {
    showModifActivityModal.value = true;
}

// Fonction permettant de fermer le modal de mise a jour d'une activitée
function closeUpdateActivityModal() {
    showModifActivityModal.value = !showAddActivityModal.value
}

// Fonction permettant de récupérer les informations de l'activité a modifié
const getActivityById = async (id) => {
    try {
        activitySelectId = id
        response.value = await axios.get(`http://localhost:8000/api/${id}/get-activity`)
        console.log(response.value);
        activityDonnes.value = response.value.data.nom_activite;
        console.log(activityDonnes.value);
        console.log(activitySelectId);

    } catch (error) {
        console.error(error)
    }
}

// Fonction permettant de mettre a jour une activité
const updateActivity = async () => {
    const body = {
        id: activitySelectId,
        nom_activite: activityDonnes.value
    }

    try {
        response.value = await axios.put('http://localhost:8000/api/update-activity', body)
        console.log(response.value);
        showModifActivityModal.value = false;
        activitySelectId = null
        activites.value = response.value.data.activity_list
    } catch (error) {
        console.error(error)
    }
}

// Fonction permettant de supprimer une activité
const deleteActivity = async (id) => {
    try {
        window.alert('Êtes-vous sur de vouloir faire cette suppression ?')
        response.value = await axios.delete(`http://localhost:8000/api/${id}/delete-activity`)
        console.log(response);
        activites.value = response.value.data.activity_list
    } catch (error) {
        console.error(error)
    }
}

// ==============MOTS CLés=========================
// Variable pour stocker les mots clés
let motsCles = ref([]);

// Variable pour stocker temporairement le mot clé en cours
let motCleTemp = ref('');

// Variable permettant d'afficher le modal de création des mots clés
let showAddMotclesModal = ref(false);

// Fonction permettant d'afficher le modal de création des mots clés
function showCreateMotclesModal() {
    showAddMotclesModal.value = true;
}

// Fonction permettant de fermer le modal de création des mots clés
function closeCreateMotclesModal() {
    showAddMotclesModal.value = !showAddMotclesModal.value
}

// Fonction permettant d'ajouter le mot clé temporaire à la liste
// const addKeyword = async () => {
//     const body = {

//     }
// }
function addKeyword() {
    if (motCleTemp.value.trim() !== "") {
        motsCles.value.push(motCleTemp.value);
        motCleTemp.value = "";
    }
}

function createKeyword() {
    console.log("Mtc :", motsCles.value);
    motsCles.value;
    closeCreateMotclesModal();
}

</script>

<template>
    <ViewLayout>


        <h1 class="text-center text-2xl font-semibold">Configuration</h1>
        <div class="grid grid-cols-3 gap-10">
            <div class="bg-gray relative  bg-opacity-25 h-96 overflow-y-auto rounded-xl flex-row">
                <button type="button" @click="showCreateCampagneModal()" class=" fixed text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-10">
                    Créer une campagne
                </button>
                <div class="flex flex-col px-2 mt-14">

                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Campagnes
                                </th>

                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="camp in campagnes" :key="camp.id"
                                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-primary">
                                    {{ camp.nom_campagne }}
                                </th>

                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        @click="getCampagneById(camp.id), showModifCampagneModal()">Editer</a>
                                </td>

                                <td class="px-6 py-4">
                                    <a href="#" class="font-medium text-red dark:text-red hover:underline"
                                        @click="deleteCampagne(camp.id)">Supprimer</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
            <div class="bg-gray relative  bg-opacity-25 h-96 overflow-y-auto rounded-xl flex-row">
                <button type="button" class="fixed text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-10" @click="showCreateActivityModal()">
                    Créer une activité
                </button>
                <div class="flex flex-col px-2 mt-14">


                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product name
                                    </th>

                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="activity in activites" :key="activity.id"
                                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-primary whitespace-nowrap dark:text-primary">
                                        {{ activity.nom_activite }}
                                    </th>

                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-primary dark:text-primary hover:underline"
                                            @click="getActivityById(activity.id), showUpdateActivityModal()">Editer</a>
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-red dark:text-red hover:underline"
                                            @click="deleteActivity(activity.id)">Supprimer</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>
            <div class="bg-gray relative  bg-opacity-25  overflow-y-auto rounded-xl flex-row">
                <button type="button" class="fixed text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-10" @click="showCreateMotclesModal()">
                    Créer mots clé
                </button>
                <div class="flex flex-col px-2 mt-14">


                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product name
                                    </th>

                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    v-for="(motCle, index) in motsCles" :key="index">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-primary">
                                        {{ motCle }}
                                    </th>

                                    <td class="px-6 py-4">
                                        <a href="#"
                                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <!-- Formulaire pour la création d'une campagne -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray bg-opacity-80"
                v-if="showAddCampaignModal">
                <div
                    class="bg-gray border relative border-primary md:max-w-3xl m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pr-8 dark:bg-gray animation">
                    <span @click="closeCreateCampagneModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
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
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-6 ring-1 ring-slate-200 shadow-sm w-[70%] py-2"
                                    type="text" id="campagne" v-model="nom_campagne" />
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    <div class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="creerCampagne()">
                            Créer
                        </button>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour l'édition d'une campagne existante -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray bg-opacity-80"
                v-if="showModifCampaignModal">
                <div
                    class="bg-gray border relative border-primary md:max-w-3xl m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pr-8 dark:bg-gray animation">
                    <span @click="closeModifCampagneModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
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
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-6 ring-1 ring-slate-200 shadow-sm w-[70%] py-2"
                                    type="text" id="campagne" v-model="campagneDonnes" />
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    <div class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="updateCampagne()">
                            Modifier
                        </button>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour la création d'une activité -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray bg-opacity-80"
                v-if="showAddActivityModal">
                <div
                    class="bg-gray border relative border-primary md:max-w-3xl m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pr-8 dark:bg-gray animation">
                    <span @click="closeCreateActivityModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                    <form @submit.prevent="">
                        <div class="m-4 w-full tailleChang">
                            <div class="flex items-center mb-2">
                                <label for="campagne" class="px-4 flex items-center text-primary text-xl font-bold">
                                    Campagne:
                                </label>
                                <select id="campagne"
                                    class="bg-gray-50 w-[70%] text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                block pw-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-primary dark:text-primary dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    v-model="campagneActivitySelect">
                                    <option selected>Selectionner une Campagne</option>
                                    <option v-for="camp in campagnes" :key="camp.id" :value="camp.id">{{ camp.nom_campagne
                                    }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex items-center">
                                <label class="px-4 flex items-center text-primary text-xl font-bold" for="activité">
                                    Nom activité:
                                </label>
                                <input
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-6 ring-1 ring-slate-200 shadow-sm w-[70%] py-2"
                                    type="text" id="activité" v-model="nom_activite" />
                            </div>
                        </div>

                    </form>
                    <div class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="creerActivite()">
                            Créer
                        </button>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour l'édition d'une activité existante -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray bg-opacity-80"
                v-if="showModifActivityModal">
                <div
                    class="bg-gray border relative border-primary md:max-w-3xl m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pr-8 dark:bg-gray animation">
                    <span @click="closeUpdateActivityModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>

                    <form @submit.prevent="">
                        <div class="m-4 w-full tailleChang">
                            <div class="flex items-center">
                                <label class="px-4 flex items-center text-primary text-xl font-bold" for="activite">
                                    Nom activité:
                                </label>
                                <input
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-6 ring-1 ring-slate-200 shadow-sm w-[70%] py-2"
                                    type="text" id="activite" v-model="activityDonnes" />
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    <div class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="updateActivity()">
                            Modifier
                        </button>
                    </div>
                </div>
            </div>


            <!-- Formulaire pour la création des mots clés -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray bg-opacity-80"
                v-if="showAddMotclesModal">
                <div
                    class="bg-gray border relative border-primary md:max-w-3xl m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pr-8 dark:bg-gray animation">
                    <span @click="closeCreateMotclesModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clip-rule="evenodd" />
                        </svg>

                    </span>

                    <form @submit.prevent="">
                        <div class="m-4 w-full tailleChang">
                            <div class="flex items-center">
                                <label class="px-4 flex items-center text-primary text-xl font-bold">
                                    Mots clés :
                                </label>
                                <input
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-6 ring-1 ring-slate-200 shadow-sm w-[70%] py-2"
                                    type="text" id="campagne" v-model="motCleTemp" />
                                <button @click="addKeyword" type="button"
                                    class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Ajouter </button>
                            </div>
                            <div>
                                <!-- Liste des mots clés -->
                                <ul>
                                    <li v-for="(motCle, index) in motsCles" :key="index">{{ motCle }}</li>
                                </ul>
                            </div>
                        </div>
                    </form>
                    <div class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="createKeyword">
                            Créer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </ViewLayout>
</template>
