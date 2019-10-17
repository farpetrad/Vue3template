<template>
    <div class="row">
        <div class="col-2">
            <drawer v-show="showDrawer"
                    @close-drawer="showDrawer = false"
                    key="drawer"
                    title="Navigation Drawer">
                A drawer!
            </drawer>
            <transition name="leftSlide" mode="in-out">
                <div class="overlay" key="overlay" v-show="showDrawer"></div>
            </transition>
        </div>
        <div class="col-md-8 col-12 text-center">
            <p @click="showDrawer = true">Hello World!</p>

            <modal v-show="showModal" @close="showModal=false">
                <template v-slot:header>
                    Header
                </template>
                <template v-slot:body>
                    <div>
                        This is a body
                        <img src="../assets/500px-Vue.js_Logo_2.svg.png"
                             alt="vue logo"
                             @click="showModal=true" />
                    </div>
                </template>

            </modal>
            <img src="../assets/500px-Vue.js_Logo_2.svg.png"
                 alt="vue logo"
                 @click="showModal=true" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      showModal: false,
      showDrawer: false,
    };
  },
};
</script>

<style lang="scss">
    .overlay{
        display:block;
        position:fixed;
        top:0;
        width:100vw;
        height:100vh;

        background: rgba(0,0,0,0.7);
        z-index:1100;
        opacity:1;
    }
</style>
