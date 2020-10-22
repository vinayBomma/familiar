import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import googleIcon from '../components/googleIcon.vue'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            google: {
                component: googleIcon
            }
        }
    }
});
