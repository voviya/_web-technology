var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
  var path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received');
 
  var query = url.parse(req.url).query;
  console.log(query);
  var params = querystring.parse(query);
  var username = params["username"];
  var id = params["id"];
  var branch = params["branch"];
  var mobileNo = params["phno"];
  var gender = params["gender"];
  var branchadd = params["branchadd"];
  var htmlResponse = `
    <html>
    <head>
    <title>User Details</title>
    <style>
      table td,th{
      padding:10px;
      background-color:pink;
      border:1px solid black;
    }
    table
	{

        font-family: Arial, sans-serif;
        width: 50%;
        margin: 20px auto;
	padding: 12px;        
        border-radius: 10px solid black ;
        font-size: 16px;

    }
    h2{
	padding-top:20px;
      text-align: center;
    }


    </style>
    </head>
    <body>
    <h2>User Details</h2>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${username}</td>
      </tr>
      <tr>
        <td>Roll No</td>
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
        <td>Gender</td>
        <td>${gender}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td>${branchadd}</td>
      </tr>
    </table>
    </body>
    </html>
  `;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(htmlResponse);
  res.end();
}

http.createServer(onRequest).listen(8000);
console.log('Server is running...');