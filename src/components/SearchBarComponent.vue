<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Busca un instrumento"
      class="search-input"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBarComponent',
};
</script>

<style scoped>
.search-bar {
  width: calc(100% - 40px); 
  margin: 10px 20px 0 10px; 

}

.search-input {
  width: 100%; 
  height: 50px; 
  background-color: #222222; 
  border: 1px solid rgba(255, 255, 255, 0.6); 
  color: #fff; 
  font-size: 16px; 
  padding: 0 16px; 
  outline: none; 
  border-radius: 0; 
  box-sizing: border-box; 
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6); 
}
</style>
