<template>
    <transition name="leftSlide" mode="out-in">
        <nav id="drawer" class="fluid-container pb-5 pb-md-0" key="nav-drawer">
            <div class="row pb-3">
                <div class="col-8 offset-1 mb-3 pb-3 pt-3 pl-1 mobile-indicator"
                     @click="$emit('close-drawer')">
                    <h3>{{title}}</h3>
                </div>
                <div class="col-2 mb-3 pb-3 pt-3 pr-0 mobile-indicator text-center"
                     @click="$emit('close-drawer')">
                    <h3>
                        <font-awesome-icon :icon="['far', 'times']" fixed-width />
                        <font-awesome-icon :icon="['far', 'ellipsis-v-alt']" fixed-width />
                    </h3>
                </div>
                <div class="col-12">
                    <slot></slot>
                </div>
            </div>
        </nav>
    </transition>
</template>

<script>
export default {
  name: 'drawer',
  props: {
    title: { type: String, default: '' },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  updated() {
    this.isVisible = !this.isVisible;
  },
};
</script>

<style lang="scss">
    .leftSlide-leave-active,
    .leftSlide-enter-active {
        transition: 0.75s;
    }

    .leftSlide-enter {
        transform: translate(-100%,0);
    }

    .leftSlide-leave-to{
        transform: translate(-100%,0);
    }

    #drawer{
        min-width:325px;
        max-width:325px;
        height:100vh;
        position:fixed;
        z-index:1300;
        background-color:#e7e7e7;
        overflow:auto;

        h3{
              color:#075a77;
              margin-bottom:0px;
              padding-top:2px;
          }
    }
</style>
