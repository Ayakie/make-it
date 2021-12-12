import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// global styles
import './assets/main.css'

import { projectAuth } from './firebase/config'
import { SetupCalendar } from 'v-calendar';
import Markdown from 'vue3-markdown-it'

let app

projectAuth.onAuthStateChanged(() => {
    if(!app) {
        app = createApp(App)
        .use(router)
        .use(SetupCalendar, {screens: {
            "sm": "640px",  // (min-width: 640px)
            "md": "768px",  // (min-width: 768px)
            "lg": "1024px", // (min-width: 1024px)
            "xl": "1280px"  // (min-width: 1280px)
        }})
        .use(Markdown)
        .mount('#app')
    }
})
