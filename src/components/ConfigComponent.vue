<script setup>
import { onMounted, ref } from "vue";
import Swal from 'sweetalert2';

import axios from 'axios';
import ViewLayout from "../layouts/ViewLayout.vue";

onMounted(() => {
    getCampagneList(),
        getActivityList(),
        getMotsclesList()
})
// ================================== Campagne =========================
let nom_campagne = ref('');
const response = ref(null)
let campagnes = ref([]);

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
    nom_campagne.value = ''
}

// Fonction permettant de fermer le modal de modification d'une campagne
function closeModifCampagneModal() {
    campagneDonnes.value = ''
    showModifCampaignModal.value = !showModifCampaignModal.value;
}


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

        if (response.value) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Campagne créée avec succès",
                showConfirmButton: true,
            });
        }

    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
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
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
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

        if (response.value) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Campagne mise à jour avec succès",
                showConfirmButton: true,
            });
        }

    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
        console.error(error)
    }
}

// Fonction permettant de supprimer une campagne
const deleteCampagne = async (id, nom) => {
    try {
        Swal.fire({
            title: "Êtes-vous sur ?",
            text: `de vouloir faire cette suppression de la campagne ${nom} !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annuler",
            confirmButtonText: "Oui, supprimer!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                response.value = await axios.delete(`http://localhost:8000/api/${id}/delete-campaign`)
                console.log(response);
                campagnes.value = response.value.data.campaign_list

                Swal.fire({
                    title: "Supprimé!",
                    text: "Campagne supprimée avec succès !.",
                    icon: "success"
                });
            }
        });

    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
        console.error(error)
    }
}


//   ========================Activité===========================
let nom_activite = ref('');
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
    nom_activite.value = ''
    campagneActivitySelect.value = null
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

        if (response.value) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Activité créée avec succès",
                showConfirmButton: true,
            });
        }

    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
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
    activityDonnes.value = ''
    showModifActivityModal.value = !showModifActivityModal.value
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
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
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

        if (response.value) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Activité mise à jour avec succès",
                showConfirmButton: true,
            });
        }

    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
        console.error(error)
    }
}

// Fonction permettant de supprimer une activité
const deleteActivity = async (id, nom) => {
    try {

        Swal.fire({
            title: "Êtes-vous sur ?",
            text: `de vouloir faire cette suppression de l'activité ${nom} !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annuler",
            confirmButtonText: "Oui, supprimer!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                response.value = await axios.delete(`http://localhost:8000/api/${id}/delete-activity`)
                console.log(response);
                activites.value = response.value.data.activity_list

                Swal.fire({
                    title: "Supprimé!",
                    text: "Activité supprimée avec succès !.",
                    icon: "success"
                });
            }
        });
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
        console.error(error)
    }
}

// ==============MOTS CLés=========================

// =création mot clés=
// Variable pour stocker les mots clés
let motCleTemp = ref('')
let listMotcle = ref([])
let nom_motcles = ref([])
let motclesActivitySelect = ref(null);

// Variable permettant d'afficher le modal de création des mots clés
let showAddMotclesModal = ref(false);

// Fonction permettant d'afficher le modal de création des mots clés
function showCreateMotclesModal() {
    showAddMotclesModal.value = true;
}

// Fonction permettant de fermer le modal de création des mots clés
function closeCreateMotclesModal() {
    motclesActivitySelect.value = null
    motCleTemp.value = ''
    listMotcle.value = []
    showAddMotclesModal.value = !showAddMotclesModal.value
}

// Fonction permettant de recupérer tous les mots clés disponibles
const getMotsclesList = async () => {
    try {
        response.value = await axios.get('http://localhost:8000/api/keywords-list')
        console.log(response.value);
        nom_motcles.value = response.value.data;
        console.log(nom_motcles.value);

    } catch (error) {
        console.error(error)
    }
}

// Fonction permettant d'ajouter le mot clé temporaire à la liste
function ajoutMotcleTemporaire() {
    if (motCleTemp.value.trim() !== "") {
        listMotcle.value.push(motCleTemp.value);
        motCleTemp.value = "";
    }
}

// Fonction permettant de supprimer le mot clé temporaire à la liste
function supprimerMotCle(index) {
    listMotcle.value.splice(index, 1);
}

// Fonction permettant de créer les mots clés
const creerMotsCles = async () => {
    const body = {
        nom_motcles: listMotcle.value,
        activity_id: motclesActivitySelect.value
    }

    try {
        response.value = await axios.post('http://localhost:8000/api/store-keyword', body)
        console.log(response.value);
        nom_motcles.value = response.value.data.keyword_list;
        showAddMotclesModal.value = false;
        motCleTemp.value = "";
        motclesActivitySelect.value = null;
        listMotcle.value = [];


        if (response.value) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Mots clés ajoutés avec succès",
                showConfirmButton: true,
            });
        }
    } catch (error) {
        console.error(error)
    }
}

// =édition mot clés=
// Variable permettant d'afficher le modal de mise a jour d'un mot clé
let showModifKeyword = ref(false);

// function permettant de montrer le modal d'édition de mot clé
function showModifKeywordModal() {
    showModifKeyword.value = true
}

// function permettant de fermer le modal d'édition de mot clé
function closeModifKeywordModal() {
    showModifKeyword.value = !showModifKeyword.value
}

// Variables récupérant le mot clé sélectionné
let keywordSelected = ref('')

// Variables récupérant l'id de l'activité sélectionné
let keywordSelectedId = ref(null)


// Fonction permettant de récupérer les informations d'un mot clé à modifier
const getKeywordById = async (id) => {
    try {
        keywordSelectedId = id
        response.value = await axios.get(`http://localhost:8000/api/${id}/get-keyword`)
        console.log(response.value);
        keywordSelected.value = response.value.data.nom_motcle;
        console.log(keywordSelected.value);
        console.log(keywordSelectedId);

    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
        console.error(error)
    }
}

// Fonction permettant de mettre a jour un mot clé
const updateKeyword = async () => {
    const body = {
        id: keywordSelectedId,
        nom_motcle: keywordSelected.value
    }

    try {
        response.value = await axios.put('http://localhost:8000/api/update-keyword', body)
        console.log(response.value);
        showModifKeyword.value = false;
        keywordSelectedId = null
        nom_motcles.value = response.value.data.keyword_list;

        if (response.value) {

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Mot clé mise à jour avec succès",
                showConfirmButton: true,
            });
        }
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
        console.error(error)
    }
}

// Fonction permettant de supprimer un mot clé
const deleteKeyword = async (id, nom) => {
    try {

        Swal.fire({
            title: "Êtes-vous sur ?",
            text: `de vouloir faire cette suppression du mot clé ${nom} !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Annuler",
            confirmButtonText: "Oui, supprimer!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                response.value = await axios.delete(`http://localhost:8000/api/${id}/delete-keyword`);
                console.log(response);
                nom_motcles.value = response.value.data.keyword_list


                Swal.fire({
                    title: "Supprimé!",
                    text: "Activité supprimée avec succès !.",
                    icon: "success"
                });
            }
        });
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: error,
            showConfirmButton: true,
        });
        console.error(error)
    }
}

</script>

<template>
    <ViewLayout>

        <h1 class="text-center text-2xl font-semibold">Configuration</h1>

        <div class="grid grid-cols-3 gap-5 mt-5">
            <!-- Campagne -->
            <div class="rounded-xl flex-row">
                <button type="button" @click="showCreateCampagneModal()" class="  text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-tl-lg rounded-br-lg text-sm px-3 py-2 ">
                    Créer une campagne
                </button>
                <div class="flex flex-col bg-white h-96 shadow rounded-lg mt-2 pl-2 py-2 overflow-y-scroll">

                    <div class="relative  shadow-md sm:rounded-lg  ">
                        <table class="w-full text-sm  max-h-80 text-left rtl:text-right text-gray-500 ">
                            <thead class="sticky top-0 bg-primary  text-xs text-white uppercase bg-gray-50  ">
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
                                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 border-t border-gray-50">
                                    <th scope="row"
                                        class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-primary">
                                        {{ camp.nom_campagne }}
                                    </th>

                                    <td class="px-6 py-3 flex items-center gap-5">


                                        <a href="#" class="font-medium text-blue-600  hover:underline"
                                            @click="getCampagneById(camp.id), showModifCampagneModal()"><svg
                                                data-slot="icon" width="18" fill="none" stroke-width="1.5"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10">
                                                </path>
                                            </svg></a>

                                        <a href="#" class="font-medium text-red dark:text-red hover:underline"
                                            @click="deleteCampagne(camp.id, camp.nom_campagne)"><svg width="18"
                                                data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0">
                                                </path>
                                            </svg></a>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <!-- Activité -->
            <div class="rounded-xl flex-row">
                <button type="button" class="  text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-tl-lg rounded-br-lg text-sm px-3 py-2 " @click="showCreateActivityModal()">
                    Créer une activité
                </button>
                <div class="flex flex-col bg-white h-96 shadow rounded-lg mt-2 pl-2 py-2 overflow-y-scroll">


                    <div class="relative  shadow-md sm:rounded-lg  ">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="sticky top-0 bg-primary  text-xs text-white uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ACTIVITES
                                    </th>

                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="activity in activites" :key="activity.id"
                                    class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 border-t border-gray-50">
                                    <th scope="row"
                                        class="px-6 py-3 font-medium text-primary whitespace-nowrap dark:text-primary">
                                        {{ activity.nom_activite }}
                                    </th>

                                    <td class="px-6 py-3 flex items-center gap-5">


                                        <a href="#" class="font-medium text-primary hover:underline"
                                            @click="getActivityById(activity.id), showUpdateActivityModal()"><svg
                                                data-slot="icon" width="18" fill="none" stroke-width="1.5"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10">
                                                </path>
                                            </svg></a>

                                        <a href="#" class="font-medium text-red dark:text-red hover:underline"
                                            @click="deleteActivity(activity.id, activity.nom_activite)"><svg width="18"
                                                data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0">
                                                </path>
                                            </svg></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>

            </div>

            <!-- Mots Clés -->
            <div class="rounded-xl flex-row">
                <button type="button" class="  text-white bg-primary hover:bg-primary hover:bg-opacity-90 focus:ring-4 focus:ring-blue-300 
                font-medium rounded-tl-lg rounded-br-lg text-sm px-3 py-2 " @click="showCreateMotclesModal()">
                    Créer mots clé
                </button>
                <div class="flex flex-col bg-white h-96 shadow rounded-lg mt-2 pl-2 py-2 overflow-y-scroll">

                    <div class="relative  shadow-md sm:rounded-lg  ">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="sticky top-0 bg-primary  text-xs text-white uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        MOTS CLES
                                    </th>

                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 border-t border-gray-50 "
                                    v-for="(motCle, index) in nom_motcles" :key="index">
                                    <th scope="row"
                                        class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-primary">
                                        {{ motCle.nom_motcle }}
                                    </th>

                                    <td class="px-6 py-3 flex items-center gap-5 ">
                                        <a href="#" class="font-medium text-primary  hover:underline"
                                            @click="getKeywordById(motCle.id), showModifKeywordModal()"><svg
                                                data-slot="icon" width="18" fill="none" stroke-width="1.5"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z">
                                                </path>
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                                            </svg></a>

                                        <a href="#" class="font-medium text-blue-600  hover:underline"
                                            @click="getKeywordById(motCle.id), showModifKeywordModal()"><svg
                                                data-slot="icon" width="18" fill="none" stroke-width="1.5"
                                                stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10">
                                                </path>
                                            </svg></a>

                                        <a href="#" class="font-medium text-red dark:text-red hover:underline"
                                            @click="deleteKeyword(motCle.id, motCle.nom_motcle)"><svg width="18"
                                                data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0">
                                                </path>
                                            </svg></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour la création d'une campagne -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-[#000] bg-opacity-80"
                v-if="showAddCampaignModal">
                <div
                    class="bg-white z-50 border relative border-primary w-96 m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block  pr-8 dark:bg-gray animation">

                    <span @click="closeCreateCampagneModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clip-rule="evenodd" />
                        </svg>

                    </span>

                    <form @submit.prevent="">
                        <div class="m-4 w-full ">
                            <div class="flex flex-col">
                                <label class="text-primary text-xl font-bold" for="campagne">
                                    Nom campagne:
                                </label>
                                <input
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-2 ring-1 ring-slate-200 shadow-sm w-full py-2"
                                    type="text" id="campagne" v-model="nom_campagne" />
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    <div v-if="nom_campagne != ''" class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline   mb-8" @click="creerCampagne()">
                            Créer
                        </button>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour l'édition d'une campagne existante -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-[#000] bg-opacity-80"
                v-if="showModifCampaignModal">
                <div
                    class="bg-white z-50 border relative border-primary w-96 m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block   dark:bg-gray animation">
                    <span @click="closeModifCampagneModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clip-rule="evenodd" />
                        </svg>

                    </span>

                    <form @submit.prevent="">
                        <div class="m-4 ">
                            <div class="flex flex-col">
                                <label class=" text-primary text-xl font-bold" for="campagne">
                                    Nom campagne:
                                </label>
                                <input
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-2 ring-1 ring-slate-200 shadow-sm w-full py-2"
                                    type="text" id="campagne" v-model="campagneDonnes" />
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    <div v-if="campagneDonnes != ''" class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="updateCampagne()">
                            Modifier
                        </button>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour la création d'une activité -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-[#000] bg-opacity-80"
                v-if="showAddActivityModal">
                <div
                    class="bg-white z-50 border relative border-primary  m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-96  dark:bg-gray animation">
                    <span @click="closeCreateActivityModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                    <form @submit.prevent="">
                        <div class="m-4 ">
                            <div class="flex flex-col ">
                                <label for="campagne" class=" flex items-center text-primary text-xl font-bold">
                                    Sélectionner une campagne:
                                </label>
                                <select id="campagne"
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-2 ring-1 ring-slate-200 shadow-sm w-full py-2"
                                    v-model="campagneActivitySelect">
                                    <option selected>Selectionner une Campagne</option>
                                    <option v-for="camp in campagnes" :key="camp.id" :value="camp.id">{{ camp.nom_campagne
                                    }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex flex-col mt-3">
                                <label class=" flex items-center text-primary text-xl font-bold" for="activité">
                                    Nom activité:
                                </label>
                                <input
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-2 ring-1 ring-slate-200 shadow-sm w-full py-2"
                                    type="text" id="activité" v-model="nom_activite" />
                            </div>
                        </div>

                    </form>
                    <div v-if="nom_activite != '' && campagneActivitySelect != ''" class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="creerActivite()">
                            Créer
                        </button>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour l'édition d'une activité existante -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-[#000] bg-opacity-80"
                v-if="showModifActivityModal">
                <div
                    class="bg-white z-50 border relative border-primary m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-96 dark:bg-gray animation">
                    <span @click="closeUpdateActivityModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>

                    <form @submit.prevent="">
                        <div class="m-4 ">
                            <div class="flex flex-col">
                                <label class=" flex items-center text-primary text-xl font-bold" for="activite">
                                    Nom activité:
                                </label>
                                <input
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-2 ring-1 ring-slate-200 shadow-sm w-full py-2"
                                    type="text" id="activite" v-model="activityDonnes" />
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    <div v-if="activityDonnes != ''" class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="updateActivity()">
                            Modifier
                        </button>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour la création des mots clés -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-[#000] bg-opacity-80"
                v-if="showAddMotclesModal">
                <div
                    class="bg-white z-50 border relative border-primary md:max-w-3xl m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-[450px] pr-8 dark:bg-gray animation">
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
                            <div class="flex flex-col">
                                <label for="activite" class="flex items-center text-primary text-xl font-bold">
                                    Activité:
                                </label>
                                <select id="activite" class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
              text-primary placeholder-slate-400 rounded-md pl-2 ring-1 ring-slate-200 shadow-sm w-full py-2"
                                    v-model="motclesActivitySelect">
                                    <option selected>Selectionner une activité</option>
                                    <option v-for="activite in activites" :key="activite.id" :value="activite.id">{{
                                        activite.nom_activite
                                    }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex flex-col mt-3">
                                <label class=" flex items-center text-primary text-xl font-bold" for="motcle">
                                    Mots clés :
                                </label>
                                <div class="flex">
                                    <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
              text-primary placeholder-slate-400 rounded-md pl-2 ring-1 ring-slate-200 shadow-sm w-full py-2"
                                        type="text" id="motcle" v-model="motCleTemp" />
                                    <button @click="ajoutMotcleTemporaire" type="button"
                                        class="ml-2 bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                            <div class="mt-2 w-64">
                                <!-- Liste des mots clés -->
                                <ul class="flex flex-col gap-3">
                                    <li class="flex items-center justify-between" v-for="(motCle, index) in listMotcle"
                                        :key="index">{{
                                            motCle }}

                                        <button class="text-red font-bold" @click="supprimerMotCle(index)">x</button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </form>
                    <div v-if="listMotcle.length != 0" class="flex items-center justify-end">
                        <button @click="creerMotsCles"
                            class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2 mb-8">
                            Créer
                        </button>
                    </div>
                </div>
            </div>

            <!-- Formulaire pour l'édition d'un mot clé existant -->
            <div class="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-[#000] bg-opacity-80"
                v-if="showModifKeyword">
                <div
                    class="bg-white z-50 border relative border-primary md:max-w-3xl m-auto pt-6 shadow-lg text-primary placeholder-primary 
                placeholder-opacity-50 text-sm rounded-lg focus:ring-primary focus:border-primary block w-96 pr-8 dark:bg-gray animation">
                    <span @click="closeModifKeywordModal()" class="absolute top-5 right-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 
                            6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 
                            1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>

                    <form @submit.prevent="">
                        <div class="m-4 w-full tailleChang">
                            <div class="flex flex-col">
                                <label class=" flex items-center text-primary text-xl font-bold" for="activite">
                                    Mot clé :
                                </label>
                                <input
                                    class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none text-sm leading-6 
                                text-primary placeholder-slate-400 rounded-md pl-2 ring-1 ring-slate-200 shadow-sm w-full py-2"
                                    type="text" id="motcle" v-model="keywordSelected" />
                            </div>
                            <div>
                            </div>
                        </div>
                    </form>
                    <div v-if="keywordSelected != ''" class="flex items-center justify-end">
                        <button class="bg-primary hover:bg-primary hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none 
                        focus:shadow-outline m-2 mb-8" @click="updateKeyword()">
                            Modifier
                        </button>
                    </div>
                </div>
            </div>

    </div>
</ViewLayout></template>
