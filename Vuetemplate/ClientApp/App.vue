<template>
    <div id="wrap">
        <div class="main">
            <nav-bar></nav-bar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import 'scss/site.scss';
</style>