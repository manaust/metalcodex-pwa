<template>
  <div class="page">
    <Nuxt />
    <footer class="container">
      <p class="light">
        2020 © Satanica - All images are property of their respective owners, no
        copyright infringement intended.
      </p>
    </footer>
  </div>
</template>

<style>
@font-face {
  font-family: "Inter";
  src: local("Inter"), url(~assets/fonts/Inter-Regular.ttf) format("truetype");
}

@font-face {
  font-family: "Inter Bold";
  src: local("Inter Bold"), url(~assets/fonts/Inter-Bold.ttf) format("truetype");
}

:root {
  font-family: "Inter", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  color: var(--charcoal);

  --container-width: 1040px;
  --red: #e50914;
  --charcoal: #333;
  --dust: #a6a6a6;
  --background: #fafafc;
  --border: #e2e2e2;
}

body {
  background-color: var(--background);
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 2rem;
}

.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 5rem;
}

footer.container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 2rem;
  box-sizing: border-box;
}

.light {
  margin: 0;
  font-size: 0.8rem;
  color: var(--dust);
}
</style>
