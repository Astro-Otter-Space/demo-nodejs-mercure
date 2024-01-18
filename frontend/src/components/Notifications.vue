<template>
  <VSonner expand position="bottom-left" :duration="5000" />
</template>

<script setup>
import { VSonner } from 'vuetify-sonner'
import 'vuetify-sonner/style.css'
</script>

<style scoped lang="scss">
.Message {
  display: table;
  position: relative;
  margin: 1em auto 0;
  width: 350px;
  border-radius: 5px;
  background-color: #3E8ED0;
  color: #F3FDFB;
  transition: all 0.2s ease;

  &.is-hidden {
   opacity: 0;
   height: 0;
   font-size: 0;
   padding: 0;
   margin: 0 auto;
   display: block;
 }
}

.Message-body {
  display: table-cell;
  vertical-align: middle;
  padding: 1em 20px;
  color: #fff;
}

.Message-close {
  padding: 0.25px;
  border-radius: 50%;
  position: absolute;
  background-color: rgba(black, 0.3);
  color: #fff;
  border: none;
  outline: none;
  font-size: 12px;
  right: 5px;
  top: 5px;
  cursor: pointer;
  &:hover {
   background-color: rgba(black, 0.5);
 }
}
</style>
