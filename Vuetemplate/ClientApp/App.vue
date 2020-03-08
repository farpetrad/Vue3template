<template>
    <div id="app">
        <div id="wrap">
            <div class="main">
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
    html {
    height: 100%;
}

#app {
    height: 100%;

    #wrap {
        min-height: 100%;

        .main {
            overflow: auto;
            overflow-x: hidden;
        }
    }
}
</style>