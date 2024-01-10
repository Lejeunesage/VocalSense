<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

onMounted(() => {
    getActivityList()
})

let response = ref('')
let activities = ref([])
// Fonction permettant de recupérer toutes les campagnes disponibles
const getActivityList = async () => {
    try {
        response.value = await axios.get('http://localhost:8000/api/activities-list')
        activities.value = response.value.data;

    } catch (error) {
        console.error(error)
    }
}

const jsonData = ref(null);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (e) => {
            jsonData.value = JSON.parse(e.target.result);
        };
        reader.readAsText(file);
    } else {
        alert('Veuillez sélectionner un fichier JSON valide.');
    }
};




const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const activity_id = ref(null);

const save = async () => {
    openModal()
}


const saveConversation = async () => {
    openModal()
    try {
        if (activity_id.value != null) {
            // Vérifiez que jsonData a des données à envoyer
            if (jsonData.value) {
                const body = {
                    activity_id: activity_id.value,
                    conversation: jsonData.value
                }

                const response = await axios.post('http://localhost:8000/api/store-conversation', body);
                console.log('Réponse du backend :', response.data);
                // Ajoutez ici le traitement de la réponse si nécessaire

                isModalOpen.value = false
                jsonData.value = null
            } else {
                console.error('Aucune donnée JSON à envoyer vers le backend.');
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données vers le backend :', error);
        // Ajoutez ici le traitement des erreurs si nécessaire
    }
};
// http://localhost:8000/api/store-conversation

</script>
<template>
    <div class="m-8">
        <h1>CHAT CONVERSATION</h1>

        <div id="app" class="mt-5">
            <div class="flex flex-col justify-start gap-2">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Choisir un
                    fichier JSON :</label>
                <input type="file" id="jsonFile" accept=".json" @change="handleFileChange"
                    class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">


            </div>

            <div v-if="jsonData" class="mt-10 ">
                <h2 class="font-bold text-2xl mb-5">Visualisation du contenu du fichier JSON :</h2>
                <div class="grid grid-cols-2 gap-5 mb-10">

                    <div>
                        <p>Téléconseillée : {{ jsonData.nom_teleconseiller }}</p>
                        <p>Client : {{ jsonData.nom_client }}</p>
                        <p>Tél : {{ jsonData.client_numero_telephone }}</p>
                    </div>
                    <div>
                        <p>Supervieur : {{ jsonData.nom_superviseur }}</p>
                        <p> Qualification : {{ jsonData.qualification_appel }}</p>
                        <p>Date : {{ jsonData.date_conversation }}</p>
                    </div>
                </div>

                <div class="h-[500px] border p-5 overflow-y-scroll">
                    <div v-for="(message, index) in jsonData.messages" :key="index"
                        :class="{ 'flex items-start': message.expediteur === 'Client', ' flex items-end': message.expediteur === 'Teleconseiller' }">

                        <div
                            :class="{ 'text-left bg-gray rounded-xl my-2 p-4 max-x-96': message.expediteur === 'Client', ' bg-primary text-white rounded-xl my-2 p-4 max-w-96': message.expediteur === 'Teleconseiller' }">
                            <p class="max-x-96">{{ message.contenu }}</p>
                            <small>{{ message.heure_message }}</small>
                        </div>
                    </div>
                </div>



                <div>
                    <span @click="save" class="mt-5 bg-primary  text-white px-4 py-2 rounded-xl cursor-pointer">Sauvegarder
                        la conversation</span>
                </div>

            </div>
        </div>

    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content relative">
            <span @click="closeModal" class="cursor-pointer absolute top-5 right-5">BoOmBooM</span>
            <h2 class="mt-5">Sélectionnez l'activité à laquelle la conversation sera affectée!</h2>
            <select v-model="activity_id"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.nom_activite }}
                </option>
            </select>
            <div @click="saveConversation" class="mt-5 text-black">Envoyer</div>
        </div>
    </div>
</template>
  
  
<style scoped>
/* Styles pour le modal et le fond gris en arrière-plan */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    /* height: 500px; */
}
</style>
  