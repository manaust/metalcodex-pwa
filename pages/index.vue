<template>
<div>
  <header>
    <div class="container">
      <img class="brand" src="~assets/images/metalcodex.png" alt="Satanica's Metalcodex">
    </div>

    <div class="container search">
      <img src="~assets/icons/search.png" alt="Search">
      <input v-model="search" type="text" placeholder="Search the codex...">
    </div>
  </header>
  <main class="container">
    <section class="songs-list" v-if="filteredSongs.length">
      <article class="song" v-for="song in filteredSongs" :key="song.id">
        <img :src="song.thumbnail_small" :alt="song.name">
        <div class="meta">
          <h2>{{song.name}}</h2>
          <p>{{song.artist}}</p>
        </div>
      </article>
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
    search: '',
    songs: [],
    filteredSongs: []
  }),
  watch: {
    search: function(newSearch) {
      if (newSearch) {
        return this.filteredSongs = this.songs.filter(song => {
          const search = newSearch.toLowerCase()
          const name = song.name.toLowerCase()
          const artist = song.artist.toLowerCase()

          return name.indexOf(search) !== -1 || artist.indexOf(search) !== -1
        })
      }
      else this.filteredSongs = this.songs
    }
  },
  mounted: function() {
    this.filteredSongs = this.songs
  },
  async fetch() {
    this.songs = await fetch(
      'https://satanica.be/api/songs.json'
    ).then(res => res.json())
  }
}
</script>

<style>
header {
  box-sizing: border-box;
  padding: 5rem 2rem;
  background-color: var(--red);
  border-radius: 0 0 2rem 2rem;
  position: relative;
}

header img {
  user-select: none;
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
  opacity: .6;
}

.songs-list, .no-results {
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
  font-family: 'Inter Bold';
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: .5rem;
}

.song p {
  margin: 0;
}

.light {
  font-size: .8rem;
  color: var(--dust);
}
</style>
