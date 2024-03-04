<script lang="ts">
  export let lastUpdated: Date;
</script>

<header>
  <nav>
    <div class="left">
      <span class="title">Bingo Stats</span>
      <span class="subtitle">by prettybigjoe</span>
    </div>
    <div class="right">
      <span class="subtitle"> last updated: </span>
      <span class="subtitle">
        {lastUpdated.toLocaleString()}
      </span>
    </div>
  </nav>
</header>

<style lang="scss">
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
    justify-content: space-between;
    max-width: 1200px;
    align-items: baseline;

    @media (max-width: 600px) {
      padding: 8px 4px;
      left: 0;
      right: 0;
      width: unset;
    }
  }

  .title {
    font-size: 20px;
    font-family: Montserrat;
    color: #f7e279;
  }

  .left {
    display: flex;
    gap: 32px;
    align-items: baseline;
    @media (max-width: 500px) {
      flex-direction: column;
      gap: 4px;
    }
  }

  .right {
    display: flex;
    gap: 4px;
    @media (max-width: 500px) {
      flex-direction: column;
    }
  }

  .subtitle {
    color: #ffffff66;
  }
</style>
