<template>
  <div>
    <header :style="headerStyle">
      <div class="container">
        <NuxtLink to="/">
          <img class="icon" src="~assets/icons/back.svg" alt="Menu" />
        </NuxtLink>
        <div class="meta" v-if="song">
          <h2>{{ song.name }}</h2>
          <p>{{ song.artist }}</p>
          <p class="album">{{ song.album }}</p>
        </div>
        <div v-else>
          <div class="skeleton title" />
          <div class="skeleton" />
          <div class="skeleton album" />
        </div>
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
      <p class="lyrics" v-html="lyrics" />
    </main>
  </div>
</template>

<script>
export default {
  data: () => ({
    id: null,
    song: null,
    lyrics: null
  }),
  computed: {
    title: function() {
      return this.song
        ? `${this.song.name} | ${this.song.artist}`
        : "Satanica's Metalcodex";
    },
    headerStyle: function() {
      if (this.song) {
        return {
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.2),
            rgba(0,0,0,0.4)
          ), url(${this.song.thumbnail_large})`
        };
      } else {
        return {
          backgroundColor: "black"
        };
      }
    }
  },
  head: function() {
    return {
      title: this.title
    };
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
  padding: 0;
  background-size: cover;
  background-position: center;
}

header .icon {
  user-select: none;
  display: block;
  width: 1.5rem;
  margin-bottom: 3rem;
}

header .container {
  border-radius: 0;
  color: white;
  padding-top: 1rem;
  padding-bottom: 5rem;
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
  box-shadow: 0 0 4rem 0 rgba(0, 0, 0, 0.1);
}

.spotify {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: var(--red);
  text-transform: uppercase;
  font-size: 0.65rem;
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

.skeleton {
  height: 1rem;
  width: 10rem;
  margin-bottom: 0.5rem;
  background-color: var(--dust);
  -webkit-animation: flicker 1.5s infinite ease-in-out;
  -moz-animation: flicker 1.5s infinite ease-in-out;
  -o-animation: flicker 1.5s infinite ease-in-out;
  animation: flicker 1.5s infinite ease-in-out;
}

.skeleton.title {
  width: 12rem;
  height: 1.7rem;
}

@keyframes flicker {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.6;
  }
}
@-o-keyframes flicker {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.6;
  }
}
@-moz-keyframes flicker {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.6;
  }
}
@-webkit-keyframes flicker {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.6;
  }
}

@media only screen and (max-width: 960px) {
  main {
    padding: 2.25rem;
  }
}
</style>
