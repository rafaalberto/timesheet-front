<template>
    <div class="content-wrapper">
        <section class="content">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Content',
    computed: mapState(['user'])
}
</script>

<style>
    .wrapper {
        width: 100%;
        min-height: 100%;
        height: auto !important;
        position: absolute;
    }
    .content-wrapper, .right-side {
        background-color: #FAFAFA !important;
    }
</style>