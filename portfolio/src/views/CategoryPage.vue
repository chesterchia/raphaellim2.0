<template>
    <div class="category-page">
        <div class="category-banner">
            <h2 class="category-name2">{{ categoryName }}</h2>
            <img :src="thumbnailUrl" alt="Category Thumbnail" class="category-thumbnail" />
        </div>
        <div class="container">
            <div class="media-list">
                <div v-for="media in filteredMediaItems" :key="media.id" class="media-item">
                    <template v-if="isImage(media.id)">
                        <img :src="media.url" alt="Media" class="media-image" />
                    </template>
                    <template v-else-if="isVideo(media.id)">
                        <div class="media-video-container">
                            <video controls :src="media.url" class="media-video">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </template>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

export default {
    props: ['categoryName'],
    data() {
        return {
            mediaItems: [],
            thumbnailUrl: ''
        };
    },
    methods: {
        isImage(filename) {
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            const extension = filename.toLowerCase().slice(-4);
            return imageExtensions.includes(extension);
        },
        isVideo(filename) {
            const videoExtensions = ['.mp4', '.webm', '.ogg'];
            const extension = filename.toLowerCase().slice(-4);
            return videoExtensions.includes(extension);
        },
    },
    computed: {
        filteredMediaItems() {
            return this.mediaItems.filter(media => !media.id.includes('thumbnail'));
        },
    },
    async created() {
        try {
            const categoryFolder = this.categoryName
            const storage = getStorage();
            const thumbnailPath = `${categoryFolder}/thumbnail.png`
            const url = await getDownloadURL(ref(storage, thumbnailPath))
            this.thumbnailUrl = url
            const folderRef = ref(storage, categoryFolder)
            const files = await listAll(folderRef)

            for (const file of files.items) {
                const url = await getDownloadURL(file);
                this.mediaItems.push({ id: file.name, url });
            }
        } catch (error) {
            console.error('Error fetching media:', error);
        }
    },
};
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100&display=swap');

.category-page {
    margin-top: 5%;
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 5rem;
    background-color: #333;
    text-align: center;
}

.category-banner {
    position: relative;
    width: 60%;
    height: 50vh;
    margin: 0 auto;
    opacity: 0;
    /* Start with 0 opacity */
    animation: fade-in 2.5s ease-in-out forwards;
}

.category-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.category-name2 {
    font-family: 'Josefin Sans', sans-serif;
    position: absolute;
    width: fit-content;
    padding: 1.5rem 4rem 1rem 4rem;
    font-size: 3rem;
    text-transform: uppercase;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
}

.media-list {
    display: grid;
    margin-top: 5vh;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    width: 50%;
    opacity: 0;
    /* Start with 0 opacity */
    animation: fade-in 2.5s ease-in-out forwards;
}

.media-item {
    position: relative;
}

.media-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.media-video-container {
    width: 100%;
    /* Set a consistent width */
    padding-bottom: 56.25%;
    /* 16:9 aspect ratio (9 / 16 * 100) */
    position: relative;
}

.media-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (max-width: 1000px) {
    .category-name2 {
        font-size: 2rem;
        padding: 1rem;
    }

    .media-list {
        margin-top: 10vh !important;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        width: 80%;
        margin: auto;
    }

    .category-banner {
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
}
</style>