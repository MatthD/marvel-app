<template>
  <div v-infinite-scroll="showMore" infinite-scroll-distance="30">
    <section
      class="columns is-multiline characters"
      :check-infinite-scroll="true"
    >
      <div
        v-for="character in characters"
        :key="character.id"
        class="card column is-full-mobile is-one-quarter-desktop"
        aria-id="contentIdForA11y3"
      >
        <character-card
          :name="character.name"
          :description="character.description"
          :thumbnail="character.thumbnail"
        />
      </div>
    </section>
    <button v-if="showMoreEnabled" @click="showMore">Show more</button>
  </div>
</template>

<script>
import { characters } from '~/apollo/queries/characters.graphql';
import CharacterCard from '~/components/CharacterCard.vue';
const limit = 10;

export default {
  components: {
    CharacterCard,
  },
  data() {
    return {
      start: 0,
      limit: 10,
      showMoreEnabled: true,
      characters: [],
    };
  },
  apollo: {
    characters: {
      query: characters,
      fetchPolicy: 'cache-first',
      debounce: 800,
      variables: {
        limit,
        start: 0,
      },
    },
  },
  methods: {
    // Here we will get more characters on infinite scroll
    showMore() {
      // if (!characters.lenght) return;
      this.start += 10;
      this.$apollo.queries.characters.fetchMore({
        variables: {
          start: this.start,
          limit: this.limit,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newcharacters = fetchMoreResult.characters;
          return {
            characters: [...previousResult.characters, ...newcharacters],
          };
        },
      });
    },
  },
};
</script>
