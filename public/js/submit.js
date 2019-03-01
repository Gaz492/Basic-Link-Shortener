Vue.prototype.$http = axios;
new Vue({
    el: '#app',
    delimiters: ['${', '}'],
    data: {
        url: '',
        baseUrl: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`,
        showShortenedURL: false,
        shortenData: {}
    },
    methods: {
        processForm: function () {
            const self = this;
            console.log(`${this.url} submitted`);
            this.$http.post('/api/shorten', {
                originalURL: this.url
            }).then(function (res) {
                console.log(res.data);
                self.shortenData = res.data;
                self.showShortenedURL = true;
            })
        }
    }
});