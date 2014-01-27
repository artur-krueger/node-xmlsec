var xmlsec = require("node-xmlsec")();

xmlsec.privkeyPem("/tmp/my.key")
      .pubkeyCertPem("/tmp/my.crt")
      .to("/tmp/my.signed.xml")
      .sign("/tmp/my.xml");

xmlsec.on("error",function(){
  console.log("error");
  console.log(arguments);
});
xmlsec.on("data",function(d){
  console.log("data");
  console.log(d.toString());
});



