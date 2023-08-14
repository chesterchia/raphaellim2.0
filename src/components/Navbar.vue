<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <div class="nameContainer"><span class="nameLine">R A P H A E L</span>
          <span class="nameLine">L I M</span>
        </div>

      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Navbar'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');

/* Add your custom CSS styles for the navbar here */
.navbar {
  z-index: 1;
  background-color: #4F5564;
  position: absolute;
  top: 0;
  left: 0;
  height: 10%;
  width: 100%;
}

.navbar-brand {
  display: flex;
  align-items: center;
  background-color: #2C2C2B;
  height: 95%;
  width: 10%;
  padding-left: 1rem;
  margin-left: 10%;
}

.nameContainer {
  display: flex;
  flex-direction: column;
}

.nameLine {
  font-family: 'Raleway', sans-serif;
  font-size: 1.5rem;
}

/* Customize the styles for navbar items, active links, etc. */
.navbar-item {
  color: white;
  text-decoration: none;
  /* Remove underline from links */
}

@media (max-width: 1485px) {
  .navbar-brand {
    width: 15%;
  }
}

@media (max-width: 1150px) {
  .navbar-brand {
    width: 20%;
  }
}

@media (max-width: 835px) {
  .nameLine {
    font-size: 1rem;
  }
}

@media (max-width: 590px) {
  .nameLine {
    font-size: 0.8rem;
  }
}

@media (max-width: 530px) {
  .nameLine {
    font-size: 0.6rem;
  }
  .navbar-brand {
    width: 20%;
  }
}

.navbar-item {
  color: white;
  text-decoration: none;
}

/* Add more styles as needed */
</style>
