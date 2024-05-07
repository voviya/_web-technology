var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
  var path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received');
 
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      var qs = querystring.parse(body);
      var username = qs["username"];
      var id = qs["id"];
      var branch = qs["branch"];
      var mobileNo = qs["phno"];
      var gender = qs["gender"];
      var branchadd = qs["branchadd"];
     
      var htmlResponse = `
        <html>
        <head>
        <title><center><b>User Details</b></center></title>
        <style>
          table {
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 50%;
            margin: 20px auto;
          }
          td, th {
            border: 1px solid red;
            text-align: left;
            padding: 8px;
          }
          th {
            background-color:pink;
          }
	        h2{
	          text-align:center;
            color:teal;
          }
    
        </style>
        </head>
        <body>
        <h2>USER INFORMATION</h2>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Username</td>
            <td>${username}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>${id}</td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>${branch}</td>
          </tr>
          <tr>
            <td>Mobile No</td>
            <td>${mobileNo}</td>
          </tr>
          <tr>
            <td>gender</td>
            <td>${gender}</td>
          </tr>
          <tr>
            <td>branch address</td>
            <td>${branchadd}</td>
          </tr>
        </table>
        </body>
        </html>
      `;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(htmlResponse);
      res.end();
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Method Not Allowed');
  }
}

http.createServer(onRequest).listen(7000);
console.log('Server is running...');
