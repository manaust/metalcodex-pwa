<template>
  <div>
    <header>
      <div class="container">
        <img class="icon" src="~assets/icons/menu.svg" alt="Menu" />
        <img
          class="brand"
          src="~assets/images/metalcodex.png"
          alt="Satanica's Metalcodex"
        />
      </div>

      <div class="container search">
        <img src="~assets/icons/search.png" alt="Search" />
        <input v-model="search" type="text" placeholder="Search the codex..." />
      </div>
    </header>
    <main class="container">
      <section class="songs-list" v-if="filteredSongs.length">
        <NuxtLink
          :to="'/' + song.id"
          class="song"
          v-for="song in filteredSongs"
          :key="song.id"
        >
          <img :src="song.thumbnail_small" :alt="song.name" />
          <div class="meta">
            <h2>{{ song.name }}</h2>
            <p>{{ song.artist }}</p>
          </div>
        </NuxtLink>
      </section>
      <section class="no-results" v-else>
        <p class="light">No results!</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
    songs: []
  }),
  computed: {
    filteredSongs: function() {
      return this.songs.filter(song => {
        // Compare lowercase and remove spaces
        const search = this.search.toLowerCase().replace(/\s+/g, "");
        const name = song.name.toLowerCase().replace(/\s+/g, "");
        const artist = song.artist.toLowerCase().replace(/\s+/g, "");

        return name.indexOf(search) !== -1 || artist.indexOf(search) !== -1;
      });
    }
  },
  async fetch() {
    this.songs = await fetch("https://satanica.be/api/songs.json").then(res =>
      res.json()
    );
  }
};
</script>

<style scoped>
header {
  box-sizing: border-box;
  padding: 1rem 0 6rem 0;
  background-color: var(--red);
  border-radius: 0 0 2rem 2rem;
  position: relative;
}

header img {
  user-select: none;
}

header .icon {
  display: block;
  width: 1.5rem;
  margin-bottom: 3rem;
}

header .brand {
  max-height: 5rem;
  max-width: 100%;
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}

a {
  color: var(--charcoal);
  text-decoration: none;
}

.search {
  position: absolute;
  left: 2rem;
  right: 2rem;
  bottom: -1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  border: solid 1px var(--border);
  border-radius: 2rem;
  padding-left: 0;
}

.search input {
  width: 100%;
  padding: 1rem 0;
  border: none;
  outline: none;
}

.search img {
  height: 2rem;
  width: 2rem;
  margin: 0 1rem;
  opacity: 0.6;
}

.songs-list,
.no-results {
  margin-top: 5rem;
}

.song {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
}

.song img {
  height: 4rem;
  width: 4rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
}

.song h2 {
  margin: 0;
  font-family: "Inter Bold";
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.song p {
  margin: 0;
}
</style>
