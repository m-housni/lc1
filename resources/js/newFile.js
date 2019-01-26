window.Echo.channel('tasks').listen('TaskCreated', e => {
    console.log('Task Created);, console.log(e));
});
