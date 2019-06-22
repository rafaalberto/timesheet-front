<template>
    <aside id="slider" class="main-sidebar">
    <section class="sidebar">
        <ul class="sidebar-menu">
            <li><a href="#" @click.prevent="home"><i class="fa fa-home"></i> <span>Home</span></a></li>
            <li><a href="#" @click.prevent="user"><i class="fa fa-user"></i> <span>Usuários</span></a></li>
            <li><a href="#" @click.prevent="company"><i class="fa fa-building"></i> <span>Empresas</span></a></li>
            <li><a href="#" @click.prevent="position"><i class="fa fa-suitcase"></i> <span>Cargos</span></a></li>
            <li><a href="#" @click.prevent="employee"><i class="fa fa-users"></i> <span>Colaboradores</span></a></li>
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
        position() {
            this.$router.push({ path: '/position' })
        },
        employee() {
            this.$router.push({ path: '/employee' })
        },
        timesheet() {
            this.$router.push({ path: '/employeeSearch' })
        }
    }
}
</script>

<style></style>
