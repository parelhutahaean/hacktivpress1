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
            <b-nav-item v-if="isLogin" >Sign Out</b-nav-item>
            <b-nav-item v-if="!isLogin" >Sign In</b-nav-item>
            <b-nav-item v-if="!isLogin" >Sign Up</b-nav-item>
          </b-nav>
        </b-collapse>
      </b-navbar>
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
