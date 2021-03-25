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
    <main class="container">
      <a
        :href="`https://open.spotify.com/track/${id}`"
        class="spotify"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="~assets/icons/spotify.svg" alt="Spotify" />
        Listen on Spotify
      </a>
      <p class="lyrics" v-html="formattedLyrics" />
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
    id: null,
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
    this.id = this.$route.params.id;
    this.song = await fetch("https://satanica.be/api/songs.json")
      .then(res => res.json())
      .then(data => data.find(song => song.id === this.id));

    this.lyrics = await fetch(`https://satanica.be/api/${this.id}.txt`).then(
      res => {
        return res.text();
      }
    );
  }
};
</script>

<style scoped>
header {
  background-size: cover;
  background-position: center;
}

header .meta {
  border-radius: 0;
  color: white;
  padding: 6rem 4rem;
  box-sizing: border-box;
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

.spotify {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: var(--red);
  text-transform: uppercase;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: "Inter Bold";
  margin-bottom: 2rem;
}

.spotify img {
  height: 1rem;
  margin-right: 0.5rem;
}

.lyrics {
  margin: 0;
  line-height: 1.5rem;
  white-space: pre-line;
}

@media only screen and (max-width: 960px) {
  header .meta,
  main {
    padding: 2.5rem;
  }

  header {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }
}
</style>
