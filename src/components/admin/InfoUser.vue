<template>
    <div>
        <br><p>ชื่อ: {{ user.name }}</p><br>
        <p>อีเมล: {{ user.email }}</p><br>
        <p>ที่อยู่: {{ user.address }}</p><br>
        <p>เบอร์โทรศัพท์: {{ user.tell }}</p>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService'
export default {
    data(){
        return {
            user: ''
        }
    },
    async created(){
        this.fetchData()
    },
    methods:{
        async fetchData(){
            let id = parseInt(this.$route.params.id)
            this.user = await AuthService.getUser(id)
        }
    }
}
</script>

<style>

</style>