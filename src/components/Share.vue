<template>
  <div>
    <div class="modal fade" id="share" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Поделиться</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table table-striped">
              <tr v-for="user in users" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>
                  {{ user.first_name }}
                </td>
                <td class="text-right">
                  <button class="btn btn-success" @click="sharing(user.id)">Поделиться</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Share',
  props: {
    imageId: Number
  },
  data () {
    return {
      users: [],
      myLogin: localStorage.log
    }
  },
  created () {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
    fetch(localStorage.url + 'user?search=', requestOptions)
      .then(async response => {
        const data = await response.json()
        this.users = data
      })
  },
  methods: {
    sharing (id) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: {
          photos: [this.imageId]
        }
      }
      fetch(localStorage.url + 'user/' + id + '/share', requestOptions)
        .then(async response => {
          const data = await response.json()
          console.log(data, response)
        })
    }
  }
}
</script>

<style scoped>

</style>
