<template>
    <aside id="slider" class="main-sidebar">
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li><a href="#" @click.prevent="home"><i class="fa fa-home"></i> <span>Home</span></a></li>
            <li><a href="#" @click.prevent="user"><i class="fa fa-user"></i> <span>Usuários</span></a></li>
            <li><a href="#" @click.prevent="company"><i class="fa fa-building"></i> <span>Empresas</span></a></li>
            <li><a href="#" @click.prevent="timesheet"><i class="fa fa-table"></i> <span>Lançamentos</span></a></li>
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
        },
        company() {
            this.$router.push({ path: '/company' })
        },
        timesheet() {
            this.$router.push({ path: '/timesheet' })
        }
    }
}
</script>

<style></style>
