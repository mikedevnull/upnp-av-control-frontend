
import Vue from 'vue'
import VueRouter from 'vue-router'
import MediaLibraryDeviceList from '@/components/MediaLibraryDeviceList'
import MediaserverBrowser from '@/components/MediaserverBrowser';

Vue.use(VueRouter);

const routes = [
  { path: '/media', name: 'media', component: MediaLibraryDeviceList },
  { path: '/media/:udn', name: 'browse', component: MediaserverBrowser }
]
const router = new VueRouter({ routes: routes })

export default router;
