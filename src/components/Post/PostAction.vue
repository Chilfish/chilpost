<script setup lang="ts">

</script>

<template>
  <div class="post-action">
    <button class="chat">
      <span class="box">
        <span class="icon i-tabler-message-circle" />
      </span>
      <span class="count">23</span>
    </button>

    <button class="repost">
      <span class="box">
        <span class="icon i-tabler-repeat" />
      </span>
      <span class="count">23</span>
    </button>

    <button class="like">
      <span class="box">
        <span class="icon i-tabler-heart" />
      </span>
      <span class="count">23</span>
    </button>

    <button class="share">
      <span class="box">
        <span class="icon i-tabler-share" />
      </span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "~/styles/variables";

.post-action {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  color: #666;

  .count {
    margin-left: 5px;
  }
}

@media (min-width: $smd) {
  .post-action {
    padding-right: 25rem;
  }
}
</style>
