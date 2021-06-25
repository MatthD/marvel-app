<template>
  <div v-infinite-scroll="showMore" infinite-scroll-distance="30">
    <section
      class="columns is-multiline caracters"
      :check-infinite-scroll="true"
    >
      <div
        v-for="caracter in caracters"
        :key="caracter.id"
        class="card column is-full-mobile is-one-quarter-desktop"
        aria-id="contentIdForA11y3"
      >
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3"
        >
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
    <button v-if="showMoreEnabled" @click="showMore">Show more</button>
  </div>
</template>

<script>
import { caracters } from '~/apollo/queries/caracters.graphql';

const limit = 10;

export default {
  data() {
    return {
      start: 0,
      limit: 10,
      showMoreEnabled: true,
    };
  },
  apollo: {
    caracters: {
      query: caracters,
      prefetch: true,
      fetchPolicy: 'cache-first',
      variables: {
        limit,
        start: 0,
      },
    },
  },
  methods: {
    // Here we will get more caracters on infinite scroll
    showMore() {
      // if (!caracters.lenght) return;
      this.start += 10;
      this.$apollo.queries.caracters.fetchMore({
        variables: {
          start: this.start,
          limit: this.limit,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newCaracters = fetchMoreResult.caracters;
          return {
            caracters: [...previousResult.caracters, ...newCaracters],
          };
        },
      });
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
