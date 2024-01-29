<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import ViewLayout from "../layouts/ViewLayout.vue";


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

// const jsonData = ref(null);
const jsonData = {
    "nom_teleconseiller": "Martin RIVIERA",
    "nom_client": "Colombe DUCASH",
    "nom_superviseur": "SUP_",
    "client_numero_telephone": "+3300588445536",
    "qualification_appel": "ACCORD VENTE",
    "date_conversation": "2024-01-12",
    "messages": [
        {
            "expediteur": "Client",
            "contenu": "Allô allô ! J'ai un souci avec ma connexion fibre, êtes-vous là ?? C'est très urgent !",
            "heure_message": "08:00:00"
        },
        {
            "expediteur": "Teleconseiller",
            "contenu": "Bonjour Mme Durand ! Oui je suis là, ne vous inquiétez pas. Dites-moi ce qui se passe avec votre connexion ?",
            "heure_message": "08:05:00"
        },
        {
            "expediteur": "Client",
            "contenu": "Ouf vous êtes là ! Eh bien figurez-vous que plus rien ne fonctionne depuis ce matin : ni internet, ni la télévision ! Au secours, que dois-je faire ??",
            "heure_message": "08:10:00"
        },
        {
            "expediteur": "Teleconseiller",
            "contenu": "Calmez-vous Madame, respirez ! On va trouver une solution, pas de panique. Avez-vous vérifié les branchements et le courant de votre box ? Un voyant est-il allumé ?",
            "heure_message": "08:15:00"
        },
        {
            "expediteur": "Client",
            "contenu": "Oui oui j'ai tout vérifié, la box est bien allumée mais clignote en orange. J'y comprends rien, snif ! Ça ne m'est jamais arrivé...",
            "heure_message": "08:20:00"
        },
        {
            "expediteur": "Teleconseiller",
            "contenu": "Ne vous en faites pas, ce n'est peut-être qu'une panne temporaire. Nous allons lancer un diagnostic complet de votre ligne fibre pour voir d'où ça vient.",
            "heure_message": "08:25:00"
        },
        {
            "expediteur": "Client",
            "contenu": "D'accord, j'espère que vous allez trouver ce qui ne va pas ! J'ai vraiment besoin d'internet, je m'ennuie toute seule sinon, hou hou !",
            "heure_message": "08:30:00"
        },
        {
            "expediteur": "Teleconseiller",
            "contenu": "Je comprends bien Mme Durand ! Nous faisons le nécessaire pour que votre connexion soit rétablie au plus vite. Pour patienter, écoutez de la musique sur votre téléphone, lisez ou faites des mots croisés ! ;)",
            "heure_message": "08:35:00"
        },
        {
            "expediteur": "Client",
            "contenu": "Oui c'est une bonne idée ça ! Vous êtes bien gentil de me tenir compagnie. J'attends vos nouvelles alors ! Bisous 😘",
            "heure_message": "08:40:00"
        },
        {
            "expediteur": "Teleconseiller",
            "contenu": "Je vous en prie Mme Durand ! Je reviens vers vous dès que j'ai du nouveau. A bientôt ! 😊",
            "heure_message": "08:45:00"
        }
    ]
}

// const handleFileChange = (event) => {
// const file = event.target.files[0];
// if (file && file.type === 'application/json') {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//         jsonData.value = JSON.parse(e.target.result);
//     };
//     reader.readAsText(file);
// } else {
//     alert('Veuillez sélectionner un fichier JSON valide.');
// }
// };


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
    <ViewLayout>


        <div class="mx-8">
            <h1 class="text-2xl font-bold">CHAT CONVERSATION</h1>

            <div id="app" class="mt-2">
                <div class="flex flex-col justify-start gap-2">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="large_size">Choisir un
                        fichier JSON :</label>
                    <input type="file" id="jsonFile" accept=".json" @change="handleFileChange"
                        class="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400">
                </div>

                <div v-if="jsonData" class="mt-5 ">
                    <h2 class="font-bold text-2xl mb-5">Visualisation du contenu du fichier JSON :</h2>
                    <div class="grid grid-cols-2 gap-5 mb-10">

                        <div>
                            <p>Téléconseillé(e) : {{ jsonData.nom_teleconseiller }}</p>
                            <p>Client : {{ jsonData.nom_client }}</p>
                            <p>Tél : {{ jsonData.client_numero_telephone }}</p>
                        </div>
                        <div>
                            <p>Supervieur : {{ jsonData.nom_superviseur }}</p>
                            <p> Qualification : {{ jsonData.qualification_appel }}</p>
                            <p>Date : {{ jsonData.date_conversation }}</p>
                        </div>
                    </div>

                    <div class="h-[500px] shadow-2xl rounded-xl p-5 overflow-y-scroll container mx-auto xl:px-60 ">

                        <div v-for="(message, index) in jsonData.messages" :key="index"
                            :class="{ 'flex flex-row items-center': message.expediteur === 'Client', 'flex items-center justify-start flex-row-reverse': message.expediteur === 'Teleconseiller' }">

                            <!-- :class="{ 'flex flex-row items-center flex-end': message.expediteur === 'Client', 'flex items-center justify-start flex-row-reverse  flex-end': message.expediteur === 'Teleconseiller' }" -->
                            <div :class="{ 'flex flex-row flex-end': message.expediteur === 'Client', 'flex justify-start flex-row-reverse  flex-end': message.expediteur === 'Teleconseiller' }" 
                               >
                                <!-- Affichage des initiales et du nom de l'expéditeur -->



                                <div class="font-bold text-sm flex flex-end"
                                    :class="{ 'rounded-full w-8 h-8 bg-gray flex items-center justify-center mr-2': message.expediteur === 'Client', 'rounded-full w-8 h-8 bg-primary flex items-center justify-center ml-2': message.expediteur === 'Teleconseiller' }">
                                    <span class="text-white font-bold">{{
                message.expediteur === 'Client'
                ? (
                    jsonData.nom_client
                        ? (jsonData.nom_client.substring(0, 1) + (jsonData.nom_client.split(' ')[1] ? jsonData.nom_client.split(' ')[1].substring(0, 1) : ''))
                        : ''
                )
                : (
                    jsonData.nom_teleconseiller
                        ? (jsonData.nom_teleconseiller.substring(0, 1) + (jsonData.nom_teleconseiller.split(' ')[1] ? jsonData.nom_teleconseiller.split(' ')[1].substring(0, 1) : ''))
                        : ''
                )
            }}
</span>

                                </div>



                                <div>
                                    <div class="font-bold text-[10px]"
                                        :class="{ 'text-left': message.expediteur === 'Client', 'text-right': message.expediteur === 'Teleconseiller' }">
                                        <span> {{ message.expediteur === 'Client' ? jsonData.nom_client : jsonData.nom_teleconseiller }}</span>

                                    </div>
                                    <div
                                        :class="{ 'text-left bg-gray  my-2 p-4 xl:max-w-[550px] max-w-[400px] rounded-bl-xl rounded-r-xl': message.expediteur === 'Client', ' bg-primary text-white my-2 p-4 xl:max-w-[550px] max-w-[400px] rounded-l-xl rounded-br-xl': message.expediteur === 'Teleconseiller' }">


                                        <div>
                                            <p class="">{{ message.contenu }}</p>
                                            <small class="text-[10px]">{{ message.heure_message }}</small>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div>
                        <span @click="save"
                            class="mt-5 bg-primary  text-white px-4 py-2 rounded-xl cursor-pointer">Sauvegarder
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
                    <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.nom_activite
                    }}
                    </option>
                </select>
                <div @click="saveConversation" class="mt-5 text-black">Envoyer</div>
            </div>
        </div>
    </ViewLayout>
</template>
  
  
<style scoped>
/* / Styles pour le modal et le fond gris en arrière-plan / */
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
    /* / height: 500px; / */
}
</style>
  