module.exports.getCurrentTime = () => {

    var date = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    date = new Date(date);
  
    Date.prototype.YYYYMMDDHHMMSS = function () {
      var yyyy = this.getFullYear().toString();
      var MM = pad(this.getMonth() + 1, 2);
      var dd = pad(this.getDate(), 2);
      var hh = pad(this.getHours(), 2);
      var mm = pad(this.getMinutes(), 2)
      var ss = pad(this.getSeconds(), 2)
    
      return yyyy+"-" + MM+"-" + dd+" "+  hh +":"+ mm +":"+ ss;
    };

    function pad(number, length) {
      var str = '' + number;
      while (str.length < length) {
          str = '0' + str;
      }
      return str;
    }
    
    return date.YYYYMMDDHHMMSS();
  }