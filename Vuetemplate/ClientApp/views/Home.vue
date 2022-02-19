<template>
    <div class="container-fluid sitepage row">
        <div class="col-2 pl-0">
            <teleport to="#target" :disabled="!showDrawer">
                <drawer v-show="showDrawer"
                        @close-drawer="handleClose"
                        key="drawer"
                        title="Navigation Drawer">
                    <div class="col-12">
                        A drawer!
                    </div>

                </drawer>
            </teleport>
                
            
            
            <transition name="leftSlide" mode="in-out">
                <div class="overlay" key="overlay" v-show="showDrawer"></div>
            </transition>
        </div>
        <div class="col-md-8 col-12 text-center">
            <p @click="showDrawer = true">Hello World!</p>

            <teleport to="#target" :disabled="!showModal">
                <modal v-show="showModal" @close="showModal=false" :dismissOnClick="true" class="text-center">
                    <template v-slot:header>
                        Header
                    </template>
                    <template v-slot:body>
                        <div>
                            This is a body
                            <img src="../assets/500px-Vue.js_Logo_2.svg.png"
                                 class="img-fluid"
                                 alt="vue logo" />
                        </div>
                    </template>

                </modal>
            </teleport>
            
            <img src="../assets/500px-Vue.js_Logo_2.svg.png"
                 class="img-fluid"
                 alt="vue logo"
                 @click="doShowModal($event)" />
        </div>
    </div>
</template>

<script setup>
    import { provide, readonly, ref } from 'vue';

    // use ref instead of state as this will be reactive when used by inject('modalOpen')
    const showModal = ref(false);
    const showDrawer = ref(false);
    provide('modalOpen', readonly(showModal));
    provide('drawerOpen', readonly(showDrawer));
    

    function doShowModal(e) {                
        showModal.value = !showModal.value;
        e.stopPropagation();
    };

    function handleClose() {
        showDrawer.value = !showDrawer.value;
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
