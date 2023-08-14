<template>
    <div class="categories">
        <div class="container" id="container">
            <div class="banner">
                <video autoplay loop muted :src="bannerVideoUrl" class="banner-video">
                    Your browser does not support the video tag.
                </video>
                <div class="banner-text">
                    <div>Videographer</div>
                    <div>Editor</div>
                    <div>Filmmaker</div>
                </div>
            </div>
            <div class="categories-grid">
                <router-link v-for="(category, index) in categories" :key="category.id" :to="`/category/${category.name}`"
                    class="category-box">
                    <div class="box-image">
                        <img :src="imageUrl[index]" alt="Image" class="category-image" />
                        <h3 class="category-name">{{ category.displayName }}</h3>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Categories',
    props: {
        categories: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            imageUrl: [],
            bannerVideoUrl: ''
        }
    },
    methods: {
        async fetchImageUrls() {
            try {
                for (const category of this.categories) {
                    const imagePath = `${category.name}/thumbnail.png`
                    const storage = getStorage()
                    const url = await getDownloadURL(ref(storage, imagePath))
                    this.imageUrl.push(url)
                }
                this.imagesLoaded = this.categories.map(() => true);
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        },
        async loadBanner() {
            try {
                const storage = getStorage();
                const videoPath = 'Banner.mp4';
                const url = await getDownloadURL(ref(storage, videoPath));
                this.bannerVideoUrl = url;
            } catch (error) {
                console.error('Error fetching banner video:', error);
            }
        }
    },
    created() {
        setTimeout(() => {
            this.fetchImageUrls();
            this.loadBanner();
        }, 500);
    },
};
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap');

.categories {
    margin-top: 5%;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 5rem;
    background-color: #333;
}

.banner {
    position: relative;
    width: 100%;
}

.banner-video {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    filter: brightness(70%);
    opacity: 0;
    /* Start with 0 opacity */
    animation: fade-in 2.5s ease-in-out forwards;
}

.banner-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Raleway', sans-serif;
    font-size: 3rem;
    text-transform: uppercase;
    color: white;
    z-index: 2;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    opacity: 0;
    /* Start with 0 opacity */
    animation: fade-in 2.5s ease-in-out forwards;
}

.box-image {
    position: relative;
    height: 100%;
}

.container {
    display: flex;
    justify-content: center;
}

#container {
    flex-direction: column;
}

.categories-grid {
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 50%;
    overflow: hidden;
    opacity: 0;
    /* Start with 0 opacity */
    animation: fade-in 2.5s ease-in-out forwards;
}

.category-box {
    cursor: pointer;
    position: relative;
    height: 40vh;
}

.category-name {
    font-family: 'Raleway', sans-serif;
    height: 20%;
    width: 100%;
    text-transform: uppercase;
    color: white;
    background-color: rgba(0, 0, 0, 0) !important;
    text-align: center;
    z-index: 1;
    font-size: 3rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.5rem 1rem;
    opacity: 0;
    /* Start with 0 opacity */
    animation: fade-in 2.5s ease-in-out forwards;
}

.category-box:hover .category-name {
    opacity: 0;
}

.category-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(30%);
    transition: filter 0.3s ease-in-out;
}

.category-box:hover .category-image {
    filter: brightness(100%);
}

@media (max-width: 1182px) {
    .categories-grid {
        grid-template-columns: 1fr;
        width: 80%;
        /* Adjust as needed */
        margin: 0 auto;
        margin-top: 10%;
    }
}

@media (max-width: 768px) {

    /* Adjust banner text */
    .banner-text {
        display: none;
    }

    /* Adjust category name font size */
    .category-name {
        font-size: 2rem;
    }

    /* Adjust category box height */
    .category-box {
        height: 30vh;
    }

    /* Hide banner video on mobile */
    .banner-video {
        display: none;
    }
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}</style>