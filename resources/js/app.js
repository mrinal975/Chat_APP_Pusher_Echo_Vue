// ES6
import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

require("./bootstrap");

window.Vue = require("vue");

Vue.component("message", require("./components/message.vue"));

const app = new Vue({
    el: "#app",
    data: {
        message: "",
        chat: {
            message: [],
            user: [],
            color: [],
            time: []
        },
        tryping: ""
    },
    watch: {
        message() {
            Echo.private("chat").whisper("typing", {
                name: this.message
            });
        }
    },
    methods: {
        send() {
            if (this.message.length != 0) {
                this.chat.message.push(this.message);
                this.chat.user.push("you");
                this.chat.color.push("success");
                // this.chat.time.push(this.getTime());
                // this.message = "";
                axios
                    .post("/send", {
                        message: this.message
                    })
                    .then(response => {
                        console.log(response);
                        this.message = "";
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        getTime() {
            let Time = new Date();
            return Time.getHours() + ":" + time.getMinutes();
        }
    },
    mounted() {
        Echo.private("chat")
            .listen("ChatEvent", e => {
                //console.log(e);
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push("warning");
            })
            .listenForWhisper("typing", e => {
                if (e.name != "") {
                    this.tryping = "tryping ....";
                } else {
                    this.tryping = "";
                }
            });
    }
});
