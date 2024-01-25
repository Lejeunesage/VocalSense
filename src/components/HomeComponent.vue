<template>
    <ViewLayout>

        <!-- Barre de navigation -->
        <nav class="p-4">
            <div class="container mx-auto px-32">
                <h1 class=" text-4xl font-bold">VocalSence - Analyse conversationnelle</h1>
            </div>
        </nav>

        <!-- Contenu principal -->
        <div class="container mx-auto py-8">

            <section class="mb-12">
                <div class="container flex justify-around gap-8">
                    <!-- Contenu texte -->
                    <div class="flex flex-col justify-center w-[500px]">
                        <h2 class="text-3xl font-semibold text-gray-800 mb-4">L'analyse conversationnelle au service de
                            l'expérience client</h2>
                        <p class="text-lg text-gray-700 mb-8">VocalSence retranscrit et analyse automatiquement 100% de vos
                            conversations - appels, sms, emails, chats - pour vous permettre d’améliorer en continu la
                            conformité du discours, les taux de conversion et la satisfaction client.</p>
                        <a href="#demander-demo" class="w-48 btn btn-blue">Commencer</a>
                       
                    </div>
                    <!-- Image -->
                    <div class="flex justify-center items-center w-[500px]">
                        <img src="../assets/anabelle.png" alt="Image de démonstration"
                            class="w-full ">
                    </div>
                </div>
            </section>

            <!-- Avantages -->
            <section class="mb-12 container mx-auto px-32 p-10">
                <div class="container">
                    <h2 class="text-3xl font-semibold text-gray-800 mb-4 text-center">Pourquoi choisir VocalSence ?</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Avantage 1 -->
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">Exploitez chaque information</h3>
                            <p class="text-gray-700 mb-4">Grâce à la retranscription automatique des appels, combinée à une
                                finesse d’analyse unique en langue française des émotions et des verbatims clients,
                                VocalSence vous permet de mesurer en temps réel ce qui impacte positivement ou négativement
                                votre performance pour choisir les meilleurs plans d’action</p>
                        </div>
                        <!-- Avantage 2 -->
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">Fluidifiez votre coaching</h3>
                            <p class="text-gray-700 mb-4">Fini les réécoutes interminables, VocalSence vous aide à
                                identifier quels appels ou quelles sections réécouter en priorité et vous notifie si un
                                évènement important se produit.</p>
                        </div>
                        <!-- Avantage 3 -->
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">Onboardez plus vite</h3>
                            <p class="text-gray-700 mb-4">Formez les nouveaux venus plus rapidement en repliquant les
                                pratiques de vos meilleurs commerciaux.</p>
                        </div>
                        <!-- Avantage 4 -->
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-xl font-semibold text-gray-800 mb-2">Optez pour le sur-mesure</h3>
                            <p class="text-gray-700 mb-4">Avec ses interfaces simples et intuitives, et des fonctionnalités
                                d’automatisation et de suivi très avancées, VocalSence fournit aux centres de relation
                                client des outils robustes sur lesquels s’appuyer pour maximiser leur efficacité et leur
                                impact.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Témoignages -->
            <section class="mb-12 container mx-auto px-32 py-10">
                <div class="container">
                    <h2 class="text-3xl font-semibold text-gray-800 mb-4 text-center">Ils nous recommandent</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <!-- Témoignage 1 -->
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold mb-2">Centre Européen de Formation</h3>
                            <p class="text-gray-700 mb-4">"VocalSence est une solution qui répond au millimètre à nos
                                besoins. C'est un plaisir pour un DSI lorsqu'un projet suscite un tel enthousiasme et se met
                                facilement en production tout en garantissant un ROI"</p>
                            <p class="text-sm">- Dimitri CHEVTCHENKO, CIO @ SkillAndYou</p>
                        </div>
                        <!-- Témoignage 2 -->
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold mb-2">Marketshot - Choisir.com</h3>
                            <p class="text-gray-700 mb-4">"Grâce à VocalSence on est passé d'un feedback par semaine à des
                                feedback en continu. On s'améliore 10x plus vite !"</p>
                            <p class="text-sm">- Rémy ROUSSET, Co-fondateur & CEO @ Lite</p>
                        </div>
                        <!-- Témoignage 3 -->
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold mb-2">Cogeco Promotion</h3>
                            <p class="text-gray-700 mb-4">"La bibliothèque VocalSence nous fait gagner des dizaines d'heures
                                à chaque onboarding"</p>
                            <p class="text-sm">- Mathilde GOUTILLE, COO @ Cogeco Immobilier</p>
                        </div>
                        <!-- Témoignage 4 -->
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h3 class="text-lg font-semibold mb-2">Comme J'aime</h3>
                            <p class="text-gray-700 mb-4">"VocalSence […] est une solution qui répond au millimètre à nos
                                besoins. C'est un plaisir pour un DSI lorsqu'un projet suscite un tel enthousiasme et se met
                                facilement en production tout en garantissant un ROI"</p>
                            <p class="text-sm">- Jeanne DURAND, Responsable des Opérations</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>




    </ViewLayout>
</template>

<script setup>
import ViewLayout from "../layouts/ViewLayout.vue";

</script>

<style scoped>
.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: white;
  background-image: linear-gradient(to right, rgba(221, 193, 160, 0.342), #123e67);
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-image 1s ease; /* Ajout de la transition */
}

.btn:hover {
  background-image: linear-gradient(to right, #123e67, rgba(221, 193, 160, 0.342));
  transition: background-image 1s ease;
}




</style>