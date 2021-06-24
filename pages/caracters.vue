<template>
  <section class="columns is-multiline caracters">
    <div
      v-for="caracter in caracters"
      :key="caracter.id"
      class="
        card
        column
        is-full-mobile is-three-quarters-mobile is-one-quarter-desktop
      "
      aria-id="contentIdForA11y3"
    >
      <div class="card-header" role="button" aria-controls="contentIdForA11y3">
        <p class="card-header-title">
          <template>{{ caracter.name }}</template>
        </p>
        <img
          :src="caracter.thumbnail"
          :alt="caracter.name"
          class="caracterPicture"
        />
      </div>
      <div class="card-content">
        <div class="content">
          <template>
            {{ caracter.description || 'no description' }}
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { caracters } from '~/apollo/queries/caracters.graphql';

export default {
  apollo: {
    caracters: {
      query: caracters,
      prefetch: true,
      fetchPolicy: 'cache-only',
    },
  },
};
</script>

<style scoped>
.caracterPicture {
  max-width: 100%;
  overflow: hidden;
}
</style>
