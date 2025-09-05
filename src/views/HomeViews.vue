<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[color:var(--secondary)]">
    <div class="card-glass w-full max-w-md p-8 flex flex-col items-center">
      <img src="/images/logo.png" alt="Logo" class="w-20 h-20 mb-4" />
      <h1 class="register-title text-center">Je cours pour la forme</h1>
      <p class="text-base text-[color:var(--secondary)] mb-4 text-center">
        Suis ton programme, progresse, exporte tes données !
      </p>
      <div class="flex gap-3 w-full mb-4">
        <router-link to="/login" class="flex-1">
          <button class="btn-primary w-full">Se connecter</button>
        </router-link>
        <router-link to="/register" class="flex-1">
          <button
            class="btn-primary w-full"
            style="background-color: var(--accent); color: var(--primary)"
          >
            S'inscrire
          </button>
        </router-link>
      </div>
      <ul class="text-sm text-[color:var(--secondary)] mb-2 list-disc pl-5 text-left w-full">
        <li>Suivi du programme d’entraînement</li>
        <li>Progression et historique</li>
        <li>Export de vos données</li>
      </ul>
      <div class="mt-2 text-xs text-[color:var(--primary)] text-center">
        Commence dès aujourd’hui, progresse à ton rythme !
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Utilisation des classes globales, rien à surcharger ici */
</style>
