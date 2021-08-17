<template>
    <div>77777777777777777777</div>
</template>
<script>
import { fetchList } from '../../api/user'
export default {
    name:'dashboard',
    data(){
        return {

        }
    },
    created(){
        fetchList().then(res => {
            console.log(res.data)
        })
        console.log(process.env)
    },
    mounted(){
        console.log(process.env.VUE_APP_BASE_API)
    }
}
</script>