<template>
  <nav>
        <a href="/"><img src="/img/logo.svg" alt="Home" id="logo"></a>
        <div class="nav_right">

            <div class="lang_block">
                <span class="lang_first">DE</span> / <span class="lang_second">EN</span>
            </div>
            <button class="search_block block">
                <i class=" icon-ic_fluent_search_24_regular" id="search"></i>
                <div>suche</div>
            </button>
            <button class="settings_block block">
                <i class=" icon-ic_fluent_settings_24_regular" id="setting"></i>
                <div>Settings</div>
            </button>
        </div>
    </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-grow: 0;
    padding: 0 80px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, .4);
    z-index: 100;
}

.nav_right button {
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  color: #2c3e50;
}

.nav_right button:active, .nav_right button:checked {
  border: none;
}

.nav_right {
    display: flex;
    justify-content: center;
    align-items: center;
}

#search, #setting {
    font-size: 24px;
}

.block:hover {
  font-size: 10px;
}

.search_block {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 9px;
    color: rgba(0, 0, 0, .64);
    text-transform: uppercase;
}

.lang_block {
    width: 80px;
    font-size: 13px;
    text-align: center;
    vertical-align: bottom;
}

.lang_block:hover {
  font-size: 14px;
}

.lang_first {
    color: rgba(0, 0, 0, 1);
}

.lang_first:hover, .lang_second:hover {
    color: #76b82a;
}

.lang_second {
    color: rgba(0, 0, 0, .56);
}

.settings_block {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    font-size: 9px;
    color: rgba(0, 0, 0, .64);
    text-transform: uppercase;
}

nav a {
    width: 134px;
}

#logo {
    height: 34px;
}

#nav img {
  height: 90%;
  width: auto;
}


#nav a:hover {
  background: black;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
