<template>
    <div>77777777777777777777</div>
</template>
<script>
export default {
    name:'dashboard',
    data(){
        return {

        }
    },
    created(){
        console.log(process.env)
    },
    mounted(){
        console.log(process.env.VUE_APP_BASE_API)
    }
}
</script>