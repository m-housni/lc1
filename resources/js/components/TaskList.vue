<template>
    <div class="container">
        <ul>
            <li v-for="task in tasks" v-text="task" :key="task.id"></li>
        </ul>  
        <input type="text" v-model="newTask" v-on:keyup.enter="addTask">
        <span v-if="tasks" v-html="audio"></span>
        
    </div>
</template>

<script>
    
    export default {

        data(){
            return{
                tasks:[], 
                newTask:'',
                audio:'<audio id="audio" src="relentless.mp3">'
            };
            
        },
        created(){

            axios.get('/tasks').then(response => (this.tasks = response.data));

            window.Echo.channel('tasks').listen('TaskCreated', e => {
                    this.tasks.push(e.task.body);
                    document.getElementById("audio").play();
                 });    
                   

        },


        methods: {
            addTask(){
                axios.post('/tasks',{ body: this.newTask });
                this.tasks.push(this.newTask);
                this.newTask='';  
            }
        }
    }
</script>
