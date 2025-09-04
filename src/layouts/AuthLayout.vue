<template>
  <div class="min-h-screen flex flex-col register-container">
    <header class="w-full px-4 py-3 flex items-center justify-between bg-white shadow-md">
      <router-link to="/" class="flex items-center gap-2">
        <span class="font-bold text-lg text-[color:var(--secondary)]">Je cours pour la forme</span>
      </router-link>
      <nav class="flex gap-4">
        <router-link
          to="/login"
          class="nav-link text-[color:var(--secondary)]"
          active-class="font-semibold"
          >Connexion</router-link
        >
        <router-link
          to="/register"
          class="nav-link text-[color:var(--secondary)]"
          active-class="font-semibold"
          >Inscription</router-link
        >
      </nav>
    </header>
    <main class="flex-1 flex items-center justify-center">
      <slot />
    </main>
  </div>
</template>

<script setup></script>

<!-- Styles centralisés dans main.css -->
