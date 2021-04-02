<template>
  <Nuxt />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

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

html {
  overflow-y: scroll;
}

body {
  background-color: var(--background);
  overflow-x: hidden;
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 2rem;
}

.light {
  margin: 0;
  font-size: 0.8rem;
  color: var(--dust);
}
</style>
