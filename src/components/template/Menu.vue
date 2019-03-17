<template>
    <aside id="slider" class="main-sidebar">
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li><a href="#" @click.prevent="home"><i class="fa fa-home"></i> <span>Home</span></a></li>
            <li><a href="#" @click.prevent="user"><i class="fa fa-user"></i> <span>Usuários</span></a></li>
        </ul>
    </section>
  </aside>
</template>

<script>
export default {
    name: 'Menu',
    methods: {
        home() {
            this.$router.push({ path: '/' })
        },
        user() {
            this.$router.push({ path: '/user' })
        }
    }
}
</script>

<style></style>
