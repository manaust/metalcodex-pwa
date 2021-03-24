<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
@font-face {
  font-family: 'Inter';
  src: local('Inter'), url(~assets/fonts/Inter-Regular.ttf) format('truetype');
}

@font-face {
  font-family: 'Inter Bold';
  src: local('Inter Bold'), url(~assets/fonts/Inter-Bold.ttf) format('truetype');
}

:root {
  font-family: 'Inter', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  color: var(--charcoal);
  
  --container-width: 1040px;
  --red: #E50914;
  --charcoal: #333;
  --dust: #666;
  --background: #FAFAFC;
  --border: #E2E2E2;
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
</style>
