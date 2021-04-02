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
        <img
          :class="{ shown: search }"
          class="cancel"
          src="~assets/icons/cancel.svg"
          alt="Cancel"
          @click="cancelSearch()"
        />
      </div>
    </header>

    <main class="container">
      <section class="tabs">
        <div :class="{ active: tab === 'all' }" @click="setTab(`all`)">
          All songs
        </div>
        <div
          :class="{ active: tab === 'bookmarks' }"
          @click="setTab(`bookmarks`)"
        >
          Bookmarks
        </div>
      </section>
      <div class="all" v-if="tab === `all`">
        <section class="songs-list" v-if="filteredSongs.length">
          <NuxtLink
            class="song"
            :to="'/' + song.id"
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
      </div>

      <div class="bookmarks" v-if="tab === `bookmarks`">
        <section class="songs-list" v-if="bookmarkedSongs.length">
          <NuxtLink
            class="song"
            :to="'/' + song.id"
            v-for="song in bookmarkedSongs"
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
          <p class="light">No bookmarks yet!</p>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data: () => ({
    tab: "all",
    search: "",
    songs: []
  }),
  computed: {
    bookmarkedSongs: function() {
      return this.songs.filter(song => {
        return Object.values(localStorage).includes(song.id);
      });
    },
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
  methods: {
    setTab: function(tab) {
      this.tab = tab;
    },
    cancelSearch: function() {
      this.search = "";
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
  padding-right: 0;
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

.search .cancel {
  opacity: 0;
}

.search .cancel.shown {
  opacity: 0.3;
  height: 1.5rem;
  cursor: pointer;
}

main {
  margin-top: 4rem;
}

.tabs {
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.tabs div {
  cursor: pointer;
  padding: 0.5rem 0;
  margin-right: 2rem;
  margin-bottom: 2rem;
  color: var(--red);
  font-family: "Inter Bold";
  font-weight: 700;
  letter-spacing: 0.025rem;
  border-bottom: solid 0.25rem transparent;
}

.tabs .active {
  border-bottom-color: var(--red);
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
