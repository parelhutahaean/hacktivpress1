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
        <b-modal id="modalSignIn" title="Sign In" @ok="submit" @shown="clearName">

          <form @submit.stop.prevent="submit">
            <b-form-input type="text" placeholder="Enter username" v-model="inusername"></b-form-input><br>
            <b-form-input type="password" placeholder="Enter password" v-model="inpassword"></b-form-input>
          </form>

        </b-modal>
      </div>
      <div>
        <b-modal id="modalSignUp" title="Sign Up" @ok="submit" @shown="clearName">

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
    }
  },
  methods: {
    getArticles () {
      var self = this;
      console.log('Hello');
      // this.$http.get('http://localhost:3000/api/articles/')
      // .then(result => {
      //   console.log(result);
      //   self.articles = result.body
      // })
      axios.get('http://localhost:3000/api/articles/')
      .then(result => {
        console.log(result);
        self.articles = result.data
      })
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
