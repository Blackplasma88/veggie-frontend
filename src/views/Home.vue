<template>
    <div >
        <head-bar></head-bar>
        <section class="main">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7">
                        <h1>Vegetables Marget</h1>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import HeadBar from '@/components/headbar/HeadBar'
    export default {
        components: {
            HeadBar,
        }
    }
</script>

<style lang="scss" scoped>
.main{
    background: url(../assets/images/bg-1.jpg)no-repeat;
    
}
</style>