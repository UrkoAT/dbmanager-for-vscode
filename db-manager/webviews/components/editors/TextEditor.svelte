<script lang="ts">
  import { bind } from "svelte/internal";

  export let value: any;
  export let visible: Boolean;
</script>

<div class="input-card">
  <textarea name="" id="textarea" cols="30" rows="10" />
  <div class="buttons">
    <input type="button" class="cancel" value="Cancel" />
    <input type="button" class="apply" value="Apply" />
  </div>
</div>

<style>
  .input-card {
    display: none;
    background-color: white;
    position: relative;
    z-index: 1;
    border: 1px solid #dedede;
    border-radius: 4px;
  }

  .input-card textarea {
    border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  .input-card .buttons {
    display: flex;
    justify-content: flex-end;
  }

  .input-card .buttons input {
    border: none;
    background-color: white;
    outline: none;
    cursor: pointer;
  }

  .input-card .buttons .apply {
    background-color: #0078d4;
    color: white;
  }

  .input-card .buttons .cancel {
    color: #a19f9d;
  }

  .visible {
    display: block;
  }
</style>
