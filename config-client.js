const env_name = process.env.NODE_ENV||"development";
console.log("loading [client] config for  ..... " + env_name);

if(typeof global.__clientconfig_loaded === "undefined") {
    global.__clientconfig_loaded = require("./config-client/" + env_name + ".config.js");
}

export default global.__clientconfig_loaded.config;
