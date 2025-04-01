import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import mitt from "mitt"

const app = createApp(App)
app.config.globalProperties.$mybus = mitt()

// app.use(createPinia())
// app.use(router)
app.use(ViewUIPlus)

app.mount('#app')

// https://www.iviewui.com/components/menu
