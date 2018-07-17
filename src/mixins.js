export default {
  stats: {
    mounted () {
      this.$store.dispatch('calc_stats')
    },
    computed: {
      stats () {
        return this.$store.state.stats
      },
      progress () {
        if (!this.stats || !this.stats.ids) {
          return null
        }
        return 100 * this.stats.loaded / this.stats.ids.length
      }
    }
  }
}
