<template>
    <div class="header">
        <div class="header__logo">
            <img src="../public/logo.png">
        </div>
        <nav class="header__navigate">
            <NuxtLink to="/">Options</NuxtLink>
            <NuxtLink to="/stockOrder">Order Book</NuxtLink>
        </nav>
    </div>
    <NuxtPage />
</template>

<script>

export default {
    name: 'LayoutComponent',
};

</script>

<style>
</style>