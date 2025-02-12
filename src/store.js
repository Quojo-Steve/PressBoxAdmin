import { defineStore, createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export const store = createPinia();

export const useStore = defineStore('pressbox', {
    persist: true,
    state: () => {
        return {
            theme: 'auto',
            fontSize: 'font-default',
            user: {},
            source: {},
            token: null,
            isAuth: false,
            userId: null,
            sourceId: null,
            showTopBar: true,
        }
    },
    actions: {
        setTheme(theme) {
            this.theme = theme;
        },
        setFontSize(fontSize) {
            this.fontSize = fontSize;
        },
        setAuth(auth) {
            this.isAuth = auth;
        },
        setUser(user) {
            this.user = user;
        },
        setUserId(userId) {
            this.userId = userId;
        },
        setSource(source) {
            this.source = source;
        },
        setSourceId(sourceId) {
            this.sourceId = sourceId;
        },
        setToken(token) {
            this.token = token;
        },
        setAuthenticate(payload) {
            const { user_id, source_id, user, source, token } = payload;
            this.setAuth(true);
            this.setUser(user);
            this.setSource(source);
            this.setUserId(user_id);
            this.setSourceId(source_id);
            this.setToken(token);
        },
        setLogout() {
            this.setAuth(false);
            this.setUser({});
            this.setSource({});
            this.setUserId(null);
            this.setSourceId(null);
            this.setToken(null);
        },
        setUserPhoto(photo) {
            this.user.photo = photo;
        },
        setSourceLogo(logo) {
            this.source.logo = logo;
        },
        setShowTopBar(show) {
            // this.showTopBar = show;
        },
    },
    getters: {
        getTheme() {
            return this.theme;
        },
        getFontSize() {
            return this.fontSize;
        },
        getAuth() {
            return this.isAuth;
        },
        getTopBar() { 
            return this.showTopBar;
        },



        getUser() {
            return this.user;
        },
        getUserId() {
            return this.userId;
        },
        getUserPhoto() {
            return this.user.photo;
        },
        getUserName() { 
            const { first_name, last_name } = this.user;
            return `${first_name} ${last_name}`;
        },
        getUserEmail() {
            return this.user.email;
        },
        getUserPhone() {
            return this.user.phone;
        },




        getSource() {
            return this.source;
        },
        getSourceId() {
            return this.sourceId;
        },
        getToken() {
            return this.token;
        },
        getAuthenticate() {
            return {
                user: this.user,
                source: this.source,
                token: this.token,
                user_id: this.userId,
                source_id: this.sourceId,
            }
        },
        
        getSourceLogo() {
            return this.source.logo;
        },
        
    }
});

store.use(piniaPluginPersistedstate);
