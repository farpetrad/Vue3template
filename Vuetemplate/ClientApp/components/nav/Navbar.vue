<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">{{siteName}}</a>
            </div>

            <button class="navbar-toggler ml-auto collapsed"
                    type="button"
                    id="navbar-toggler"
                    ref="navbarToggler"
                    @click="toggleMenu">
                <span class="navbar-toggler-icon" />
            </button>

            <div class="collapse navbar-collapse" ref="navbarContent">
                <div class="navbar-nav ml-auto">
                    <template v-for="(route,index) in $router.options.routes">
                        <a class="nav-item nav-link"
                           v-if="route.path !== $route.path"
                           v-bind:class="{'active' : routeActive(route)}"
                           :key="index"
                           :href="route.path">{{route.name}}</a>
                    </template>
                    
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
      name: 'nav-bar',
      computed: {
          ...mapGetters(['siteName']),
      },
      methods: {
        toggleMenu() {
          if (!this.$refs || !this.$refs.navbarToggler || !this.$refs.navbarContent) {
            return;
          }
          this.$refs.navbarToggler.classList.toggle('collapsed');
          this.$refs.navbarContent.classList.toggle('show');
        },
        routeActive(route){
          return route.path === this.$route.path;
        }
      },
    };
</script>
