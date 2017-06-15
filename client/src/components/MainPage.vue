<template>
  <div class="main">
    <div>
      <b-navbar toggleable type="inverse" variant="success">

        <b-nav-toggle target="nav_collapse"></b-nav-toggle>

        <b-link class="navbar-brand" to="#">
          <span>HacktivPress</span>
        </b-link>

        <b-collapse is-nav id="nav_collapse">

          <b-nav is-nav-bar class="ml-auto" right>
            <b-nav-item v-if="isLogin">Sign Out</b-nav-item>
            <b-nav-item v-if="!isLogin"  @click="$root.$emit('show::modal','modalSignIn')">Sign In</b-nav-item>
            <b-nav-item v-if="!isLogin"  @click="$root.$emit('show::modal','modalSignUp')">Sign Up</b-nav-item>
          </b-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div>
      <div>
        <b-modal id="modalSignIn" title="Sign In" @ok="submitSignIn" @shown="clearName">

          <form @submit.stop.prevent="submit">
            <b-form-input type="text" placeholder="Enter username" v-model="inusername"></b-form-input><br>
            <b-form-input type="password" placeholder="Enter password" v-model="inpassword"></b-form-input>
          </form>

        </b-modal>
      </div>
      <div>
        <b-modal id="modalSignUp" title="Sign Up" @ok="submitSignUp" @shown="clearName">

          <form @submit.stop.prevent="submit">
            <b-form-input type="text" placeholder="Enter username" v-model="outusername"></b-form-input><br>
            <b-form-input type="password" placeholder="Enter password" v-model="outpassword"></b-form-input>
          </form>

        </b-modal>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'main-page',
  data () {
    return {
      isLogin: false,
      articles: [],
      inusername: '',
      inpassword: '',
      outusername: '',
      outpassword: ''
    }
  },
  methods: {
    getArticles () {
      this.$http.get('http://localhost:3000/api/articles/')
      .then(result => {
        this.articles = result.data
      })
      .catch(err => {
        console.log(err);
      })
    },
    submitSignIn () {
      if (!this.inusername) {
        alert('Enter username')
      } else if (!this.inpassword) {
        alert('Enter password')
      } else {
        this.$http.post('http://localhost:3000/api/articles/', {
          username: this.inusername,
          password: this.inpassword
        })
        .then(result => {
          
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  },
  created () {
    this.getArticles()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
