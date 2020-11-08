<template>
    <div class="container-fluid sitepage row">
        <div class="col-2 pl-0">
            <teleport to="#target" :disabled="!state.showDrawer">
                <drawer v-show="state.showDrawer"
                        @close-drawer="handleClose($event)"
                        key="drawer"
                        title="Navigation Drawer">
                    <div class="col-12">
                        A drawer!
                    </div>

                </drawer>
            </teleport>
                
            
            
            <transition name="leftSlide" mode="in-out">
                <div class="overlay" key="overlay" v-show="state.showDrawer"></div>
            </transition>
        </div>
        <div class="col-md-8 col-12 text-center">
            <p @click="state.showDrawer = true">Hello World!</p>

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

<script>

    import { reactive, provide, ref } from 'vue';

    export default {
        setup() {

            const showModal = ref(false);

            const state = reactive({
                showDrawer: false,
            });

            function doShowModal(e) {                
                showModal.value = !showModal.value;
                e.stopPropagation();
            };

            function handleClose(e) {
                state.showDrawer = !state.showDrawer;
                e.stopPropagation();
            };

            provide('modalOpen', showModal);

            return { state, doShowModal, handleClose, showModal };
        }
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
