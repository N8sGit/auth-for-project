
export function debug (){
    console.log(arguments);
    console.trace()
    debugger
}


  export function getCook(cookiename) {
  // Get name followed by anything except a semicolon
    var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
    var cookie = decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
    return cookie 
  }