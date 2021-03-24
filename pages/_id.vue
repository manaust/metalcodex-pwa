<template>
  <div v-if="song">
    <header
      :style="{
        backgroundImage: `linear-gradient(
      to bottom,
      rgba(0,0,0,0.2),
      rgba(0,0,0,0.4)
    ), url(${song.thumbnail_large})`
      }"
    >
      <div class="container meta">
        <h2>{{ song.name }}</h2>
        <p>{{ song.artist }}</p>
        <p class="album">{{ song.album }}</p>
      </div>
    </header>
    <main class="container lyrics">
      <p v-html="formattedLyrics" />
    </main>
  </div>
  <div v-else>
    <!-- TODO: Skeleton -->
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    song: null,
    lyrics: ""
  }),
  computed: {
    formattedLyrics: function() {
      console.log(this.lyrics);
      return this.lyrics.replace(/(\\r)*\\n/g, "<br>");
    }
  },
  async fetch() {
    const id = this.$route.params.id;
    this.song = await fetch("https://satanica.be/api/songs.json")
      .then(res => res.json())
      .then(data => data.find(song => song.id === id));

    this.lyrics = await fetch(`https://satanica.be/api/${id}.txt`).then(res => {
      return res.text();
    });
  }
};
</script>

<style scoped>
header {
  border-radius: 0;
  color: white;
  padding: 6rem 2rem;
  background-size: cover;
  background-position: center;
}

header h2 {
  margin: 0;
  margin-bottom: 0.5rem;
  font-family: "Inter Bold";
  font-weight: 700;
}

header p {
  margin: 0;
}

header .album {
  margin-top: 2rem;
}

main {
  margin-top: -2rem;
  border-radius: 2rem 2rem 0 0;
  padding: 4rem;
  background-color: white;
}

.lyrics {
  line-height: 1.5rem;
  white-space: pre;
}
</style>
