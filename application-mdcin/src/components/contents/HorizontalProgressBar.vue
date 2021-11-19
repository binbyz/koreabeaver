<template lang="pug">
.progress-bar.horizontal-progress-bar
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

@keyframes horizontalProgressBar {
  0%   { width: 0%; }
  20%  { width: 10%; }
  30%  { width: 15%; }
  40%  { width: 18%; }
  50%  { width: 20%; }
  60%  { width: 22%; }
  100% { width: 100%; }
}

.horizontal-progress-bar {
  background-color: $accent-color;
  height: 3px;
  width: 0;
  animation-name: horizontalProgressBar;
  animation-timing-function: ease;
  animation-duration: 2.1s;
  animation-fill-mode: forwards;
  position: relative;
  left: 0;
  top: 0;
  &:after {
    // display: block;
    // position: absolute;
    // content:'';
    // width: 100%;
    // height: 6px;
    // box-shadow: $accent-color 1px 0 6px 1px;
    // opacity: 0.5;
  }
}
</style>
