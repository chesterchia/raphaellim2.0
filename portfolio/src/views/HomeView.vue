<template>
  <div>
    <Navbar /> <!-- Assuming you have a Navbar component like we created earlier -->
    <Categories :categories="categoriesData" /> <!-- Use the Categories component here -->
  </div>

  <!-- Your home content goes here -->
</template>

<script>
import Navbar from '@/components/Navbar.vue'; // Import the Navbar component
import Categories from '@/components/Categories.vue'; // Import the Categories component
import { db } from '@/firebase'
import { ref, onMounted } from 'vue'
import { getDocs, query, collection } from "firebase/firestore"

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    Navbar, // Register the Navbar component locally in this view
    Categories, // Register the Categories component locally in this view
  },
  setup() {
    const categoriesData = ref([]);

    onMounted(async () => {
      try {
        const querySnap = await getDocs(query(collection(db, "categories")));
        querySnap.forEach((doc) => {
          categoriesData.value.push(doc.data())
        })
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    });

    return {
      categoriesData,
    };
  }
};
</script>

<style></style>
