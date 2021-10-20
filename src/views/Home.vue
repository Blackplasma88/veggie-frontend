<template>
    <div >
        <head-bar></head-bar>
        <section class="main">
            <div class="container py-5">
                <div class="row py-4">
                    <div class="col-lg-12 pt-5 text-center">
                        <h1>Vegetables Marget Online</h1>
                        <button class="btn1 mt-3" @click="to()">Get Start</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="product">
            <div class="container py-5">
                <div class="row py-5">
                    <div class="col-lg-5 m-auto text-center">.
                        <h1>Vegetables</h1>
                        <h6>Be popular</h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-3 text-center">
                        <div class="card border-0 bg-light">
                            <div class="card-body">
                                <img :src="items[0].image_path" alt="" class="img-fluid" width="300" height="300">
                            </div>    
                        </div>
                        <h5>Name: {{ items[0].name }}</h5>
                        <h6>Price: {{ items[0].price }} บาท</h6>
                    </div>
                    <div class="col-lg-3 text-center">
                        <div class="card border-0 bg-light">
                            <div class="card-body">
                                <img :src="items[1].image_path" alt="" class="img-fluid" width="300" height="300">
                            </div>    
                        </div>
                        <h5>Name: {{ items[1].name }}</h5>
                        <h6>Price: {{ items[1].price }} บาท</h6>
                    </div>
                    <div class="col-lg-3 text-center">
                        <div class="card border-0 bg-light">
                            <div class="card-body">
                                <img :src="items[2].image_path" alt="" class="img-fluid" width="300" height="300">
                            </div>    
                        </div>
                        <h5>Name: {{ items[2].name }}</h5>
                        <h6>Price: {{ items[2].price }} บาท</h6>
                    </div>
                    <div class="col-lg-3 text-center">
                        <div class="card border-0 bg-light">
                            <div class="card-body">
                                <img :src="items[3].image_path" alt="" class="img-fluid" width="300" height="300">
                            </div>    
                        </div>
                        <h5>Name: {{ items[3].name }}</h5>
                        <h6>Price: {{ items[3].price }} บาท</h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 text-center m-auto">
                        <button>For Start</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
import ItemApi from "@/store/ItemApi";
    export default {
        components: {
            HeadBar,
        },
        data(){
            return{ 
                items:[]
            }
        },
        async created(){
        await ItemApi.dispatch("fetchDataInHome");
        this.items = ItemApi.getters.data.data;
        this.items.sort(function(a, b){return b.total_sales - a.total_sales});
        let tmp = []
        for(var i=0;i<4;i++){
            tmp.push(this.items[i])
        }
        this.items = tmp;
        },
        methods:{
            to(){
                this.$router.push('/list-veg')
            }
        }
    }
</script>

<style lang="scss" scoped>
.main{
    background: url(../assets/images/bg-2.png)no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    background-position: 50% 50%;
}
.main h1{
    color: black;
    font-size: 4rem;
    font-weight: 700;
}
.btn1{
    height: 45px;
    width: 35%;
    border: none;
    outline: none;
    background-color: red;
    color: white;
    font-weight: 700;
    border-radius: 60px;
}
h1{
    font-weight: 700;
}
</style>