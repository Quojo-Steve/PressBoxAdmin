<template>
    
    <!-- route the app here -->
    <router-view />
    
    
    <!-- back-top-show -->
    <div class="back-top" @click="onScrolToTop">
        <i class="bi bi-arrow-up-short"></i>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from './store';


const { getTheme, getFontSize } = useStore();
const html = document.getElementsByTagName('html')[0];
html.classList.remove(...html.classList);
html.classList.add(getFontSize);
html.setAttribute('data-bs-theme', getTheme);

// show back to top button if user scroll down 20px
window.onscroll = () => {
    const backTop = document.querySelector('.back-top');
    if (backTop) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backTop.classList.add('back-top-show');
        } else {
            backTop.classList.remove('back-top-show');
        }
    }
};

// on click back to top button
const onScrolToTop = () => {
    // smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};


onMounted(() => {
    // show back to top button if user scroll down 20px
    const backTop = document.querySelector('.back-top');
    if (backTop) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backTop.classList.add('back-top-show');
        } else {
            backTop.classList.remove('back-top-show');
        }
    }

    // on click back to top button
    // backTop.addEventListener('click', onScrolToTop);
});


// window.onscroll = () => {
//     const backTop = document.querySelector('.back-top');
//     const publicHeader = document.getElementById('public-header');
//     const sendReleaseButton = document.getElementById('send-release-button');
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         if (backTop) {
//             backTop.classList.add('back-top-show');
//         }
//         if (publicHeader) {
//             publicHeader.classList.add('navbar-sticky-on');
//         }
//         if (sendReleaseButton) {
//             sendReleaseButton.classList.add('mt-2');
//         }
//         if (sendReleaseButton) {
//             sendReleaseButton.classList.remove('nav-btn');
//         }
//     } else {
//         if (publicHeader) {
//             publicHeader.classList.remove('navbar-sticky-on');
//         }
//         if (sendReleaseButton) {
//             sendReleaseButton.classList.remove('mt-2');
//         }
//         if (sendReleaseButton) {
//             sendReleaseButton.classList.add('nav-btn');
//         }
//         if (backTop) {
//             backTop.classList.remove('back-top-show');
//         }
//     }
// };

</script>