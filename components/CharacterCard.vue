<template>
  <div>
    <div class="card-header" role="button" aria-controls="contentIdForA11y3">
      <p class="card-header-title">
        <span>{{ name }}</span>
      </p>
      <img :src="thumbnail" :alt="name" class="characterPicture" />
    </div>
    <div class="card-content">
      <div class="content">
        <p>
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: 'no description',
    },
    thumbnail: {
      type: String,
      required: false,
      default: 'https://semantic-ui.com/images/wireframe/image.png',
    },
  },
};
</script>

<style scoped>
.characterPicture {
  max-width: 100%;
  overflow: hidden;
}
</style>
