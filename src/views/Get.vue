<template>
  <div class="row justify-content-sm-between">
    <div class="col m-4" v-for="image in images" :key="image.id">
      <div class="card" style="width: 18rem;">
        <img :src="image.url" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{image.name}}</h5>{{image.id}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Get',
  data () {
    return {
      token: localStorage.token,
      images: []
    }
  },
  created () {
    const requestOptions = {
      method: 'GET',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.token}`
      }
    }
    fetch(localStorage.url + 'photo', requestOptions)
      .then(async response => {
        const data = await response.json()
        this.images = data
        console.log(this.images)
      })
  }
}
</script>

<style scoped>

</style>
