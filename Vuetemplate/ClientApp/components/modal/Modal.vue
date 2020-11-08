<template>
    <transition name="modalanim">
        <div id="modal-mask">
            <div class="modal-wrapper mt-2 mt-md-5 mb-2 mb-md-5">
                <div class="modal-container col-12 offset-md-3 col-md-8 col-lg-7 col-xl-5" ref="modal">

                    <div id="modal-header">
                        <slot name="header"></slot>
                        <a v-if="closeInHeader"
                           class="exit"
                           @click="hide"
                           tabindex="0">
                            <font-awesome-icon :icon="['far', 'times']" fixed-width>
                            </font-awesome-icon>
                        </a>
                    </div>

                    <div id="modal-body" class="container-fluid">
                        <slot name="body"></slot>
                    </div>

                    <div id="modal-footer" v-if="hasFooterContent">
                        <slot name="footer"></slot>
                        <button @click="$emit('close')"
                                v-if="closeInFooter"
                                tabindex="0">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    import { computed, ref, inject, watch } from 'vue';

export default {  
        props: {
            closeInHeader: { type: Boolean, default: true },
            closeInFooter: { type: Boolean, default: false },
            dismissOnClick: { type: Boolean, default: false },
        },
        setup(props, context) {
            const modal = ref(null);

            const modalOpen = inject('modalOpen', false);

            watch(modalOpen, (newValue, oldValue) => {                
                if (newValue) {
                    show();
                }
                else {
                    hide();
                }
            });

            const hasFooterContent = computed(() => {
                return (context.slots.footer !== null
                    && context.slots.footer !== undefined)
                    || props.closeInFooter;
            });

            function show() {
                if (!document.body.classList.contains('modal-open')) {
                    document.body.classList.add('modal-open');
                }

                if (props.dismissOnClick) {
                    const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
                    window.addEventListener(touchEvent, handleGlobalClick);
                }
            }

            function hide() {
                if (document.body.classList.contains('modal-open')) {
                    document.body.classList.remove('modal-open');
                }
                if (props.dismissOnClick) {
                    const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
                    window.removeEventListener(touchEvent, handleGlobalClick);
                }
                context.emit('close');
            }

            function handleGlobalClick(event) {
                if (modalOpen && modal && modal.value
                    && !modal.value.contains(event.target)) {
                    hide();
                }
            }

            return { hasFooterContent, show, hide, handleGlobalClick, modalOpen, modal };
        }  
};
</script>

<style lang="scss">
    #modal-mask{
        position:fixed;
        z-index:9998;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,.5);
        transition: opacity .3s ease;

        .modal-wrapper{
            width:100%;
            height:100%;

            .modal-container {
                margin:0px auto;
                padding:20px 30px;
                background-color:#fff;
                border-radius:2px;
                box-shadow: 0 2px 8px rgba(0,0,0,.33);
                transition: all .3s ease;

                #modal-header {
                    margin-top: 0 !important;

                    a.exit{
                        position:absolute;
                        right:0;
                        top:0;
                        margin:1rem;
                        color:#018181;
                        font-size:18px;
                        font-family:Source sans-serif Pro Black;
                        text-decoration:none;
                    }
                }

                #modal-body{
                    overflow-y:auto;
                    max-height:77vh;
                }

                #modal-footer{

                }
            }
        }
    }


    .modal-enter{
        opacity:0;
    }

    .modalanim-leave-active{
        opacity:0;
    }

    .modalanim-enter .modalanim-leave-active .modalanim-leave .modal-container{
        -webkit-transform:scale(1.1);
        transform:scale(1.1);
    }
</style>
