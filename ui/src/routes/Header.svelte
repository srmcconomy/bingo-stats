<script lang="ts">
  export let lastUpdated: Date;
</script>

<header>
  <nav>
    <div>
      <span class="title">Bingo Stats</span>
      <span class="subtitle">by prettybigjoe</span>
    </div>
    <span class="subtitle">
      last updated: {lastUpdated.toLocaleString()}
    </span>
  </nav>
</header>

<style>
  header {
    height: 40px;
  }
  nav {
    display: flex;
    padding: 8px 0;
    position: fixed;
    top: 0;
    background: #222222;
    z-index: 50;
    width: 100%;
    align-items: baseline;
    justify-content: space-between;
    max-width: 1200px;
  }

  .title {
    font-size: 20px;
    font-family: Montserrat;
    color: #f7e279;
    margin-right: 32px;
  }

  .subtitle {
    color: #ffffff66;
  }
</style>
