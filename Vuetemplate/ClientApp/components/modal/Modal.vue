<template>
    <transition name="modalanim">
        <div id="modal-mask">
            <div class="modal-wrapper mt-2 mt-md-5 mb-2 mb-md-5">
                <div class="modal-container col-12 offset-md-3 col-md-8 col-lg-7 col-xl-5"
                     ref="modal">

                    <div id="modal-header">
                        <slot name="header"></slot>
                        <a v-if="closeInHeader"
                           class="exit"
                           @click="$emit('close')"
                           tabindex="0">
                            <font-awesome-icon :icon="['far', 'times']" fixed-width>
                            </font-awesome-icon>
                        </a>
                    </div>

                    <div id="modal-body" class="fluid-container">
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
export default {
  name: 'modal',
  props: {
    closeInHeader: { type: Boolean, default: true },
    closeInFooter: { type: Boolean, default: false },
    dismissOnClick: { type: Boolean, default: false },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    if (this.dismissOnClick) {
      const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
      window.addEventListener(touchEvent, this.handleGlobalClick);
    }
  },
  destroyed() {
    const touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    window.removeEventListener(touchEvent, this.handleGlobalClick);
  },
  methods: {
    show() {
      this.isVisible = true;
      if (!document.body.classList.contains('modal-open')) {
        document.body.classList.add('modal-open');
      }
    },
    hide() {
      this.isVisible = false;
      if (document.body.classList.contains('modal-open')) {
        document.body.classList.remove('modal-open');
      }
    },
    handleGlobalClick(event) {
      if (this.isVisible
          && this.$refs
          && this.$refs.modal
          && !this.$refs.modal.contains(event.target)) {
        this.close();
        this.$emit('close');
      }
    },
  },
  computed: {
    hasFooterContent() {
      return (this.$slots.footer !== null
          && this.$slots.footer !== undefined)
          || this.closeInFooter;
    },
  },
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
