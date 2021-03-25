<template>
  <div class="container-fluid shadow-lg p-0 bg-white rounded mb-3">
    <Nav/>
    <div class="row justify-content-between container-fluid">
      <div class="col-md-5 m-4" v-for="image in images" :key="image.id">
        <div class="card shadow-lg">
          <img :src="image.url" class="card-img-top" alt="...">
          <div class="card-img-overlay">
            <button class="btn btn-secondary p-2" data-bs-toggle="modal" data-bs-target="#share">
              <i class="bi bi-share-fill"></i>
            </button>
            <Share :image-id="image.id"/>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ image.name || 'untitled' }}</h5>
            <button type="button" class="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Редактировать
            </button>
            <button class="btn btn-primary m-1" @click="getOne(image.id)" data-bs-toggle="modal"
                    data-bs-target="#exampleModal2">
              Посмотреть
            </button>
          </div>
        </div>
        <Modal :image="image" :image-one="imageOne"/>
      </div>
    </div>
  </div>
</template>

<script>

import Nav from '@/components/Nav.vue'
import Modal from '@/components/Modal.vue'
import Share from '@/components/Share.vue'

export default {
  name: 'Get',
  components: {
    Nav,
    Modal,
    Share
  },
  data () {
    return {
      images: [],
      imageOne: '',
      users: []
    }
  },
  created () {
    const requestOptions = {
      method: 'GET',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.token}`
      }
    }
    fetch(localStorage.url + 'photo', requestOptions)
      .then(async response => {
        const data = await response.json()
        this.images = data
      })
  },
  methods: {
    async getOne (id) {
      const requestOptions = {
        method: 'GET',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.token}`
        }
      }
      fetch(localStorage.url + 'photo/' + id, requestOptions)
        .then(async response => {
          const data = await response.json()
          this.imageOne = data.url
        })
    }
  }
}
</script>

<style scoped>

</style>
