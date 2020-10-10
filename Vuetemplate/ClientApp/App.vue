<template>
    <div id="app">
        <div id="wrap">
            <div class="main">
                <nav-bar></nav-bar>
                <router-view></router-view>
            </div>
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