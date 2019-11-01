


require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)


Vue.component('message', require('./components/message.vue'));

const app = new Vue({
    el: '#app',
    data:{
    	message:'',
    	chat:{
    		message:[],
        user:[],
        color:[]
    	}
    },
    methods:{
    	send(){
    		if(this.message.length != 0){

                this.chat.message.push(this.message);
                //if i sent message then color for me 
                this.chat.color.push('success');
                //if you sent message then (You)
                this.chat.user.push('you');
                axios.post('/send', {
                    message : this.message
                  })
                  .then(response =>  {
                    console.log(response);
                    this.message = '';

                  })
                  .catch(error => {
                    console.log(error);
                  });
    		}
    	}
    },
    mounted(){


        Echo.private('chat')
        .listen('ChatEvent', (e) => {

            //Here if you recive a message then The name of user is Appear
           this.chat.message.push(e.message);

           this.chat.color.push('warning');

           this.chat.user.push(e.user);

         //  console.log(e);
       
    });
    }
});
