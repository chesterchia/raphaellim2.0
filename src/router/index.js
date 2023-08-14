import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CategoryPage from '../views/CategoryPage.vue'; // Import the CategoryPage component

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Add dynamic routes for category pages
    {
      path: '/category/:categoryName', // Dynamic route parameter
      name: 'category',
      component: CategoryPage, // Use the CategoryPage component
      props: true, // Pass route parameters as props
    },
    // ... other routes
  ],
});

export default router;
