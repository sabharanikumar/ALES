const axios = require('axios');
const https = require('https');
const fs1 = require('fs');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
var Regex = require("regex");
const list = [];
const MapWithOrderedKeys = require("./DataCentric");
const throttle = require("./Throttle.json")
const lock = require("./LockDevice.json");
const json = require('./Platforms/IOS_Max.json');
const fs = require('fs');
const csv = require('csv-parser');
const JSONStream = require('JSONStream');
const session = require('express-session');
const { type } = require('express/lib/response');
const { Console } = require('console');
let myMap = new Map();
let myMap1 = new Map();
let login = 0, search = 0, videoPlayback = 0, adVidePlayback = 0, createProfile = 0;

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function invokeAgentPostCall(url, body) {
  let axiosResponse;
  try {
    axiosResponse = await axios.post(url, body, {
      httpsAgent: httpsAgent,
      headers: {
        "force_route_to_lta": true,
        "Access-Control-Allow-Origin": true
      }
    });
  }
  catch (err) {
    console.error(err);
    throw err;
  }
  return axiosResponse;
}


function calculatePercentage(value, maxValue) {
  return (value / maxValue) * 100;
}

async function generateHTML1(rData1, label) {
  // Your Map data

  const test = JSON.stringify(label);

  // Your maximum progress value
  const maxValue = 500;

  // Start building the HTML content
  let htmlContent = `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dynamic Table</title>
      <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }

        table {
          width: 100%;
          max-width: 100%;
        }

        .table-container {
max-width: 100%;
overflow-x: auto;
margin: 50px auto;
background-color: white;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
overflow: hidden;
}
        
        
        table { 
          margin-left: auto; 
          margin-right: auto; 
          font-size: 20px; 
          height: 100%; 
          table-layout: fixed; 
      } 

      td { 
          border: 1px solid black; 
          text-align: center; 
          padding: 10px; 
      } 
        
        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          word-wrap: break-word;
        }
        
        th {
          background-color: #f2f2f2;
        }
        
        tbody tr:hover {
          background-color: #f5f5f5;
        }
        
        @media only screen and (max-width: 600px) {
          /* Add styles for smaller screens */
          th, td {
            padding: 10px;
          }
        }
        
        .progress-bar-container {
          position: relative;
          width: 100%;
          height: 20px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: #4caf50;
          transition: width 0.3s ease;
        }
        
        .tooltip {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: #fff;
          padding: 5px;
          border-radius: 4px;
          display: none;
        }
        
        .progress-bar-container:hover .tooltip {
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="table-container">
        <table id="dynamic-table">
          <thead>
            <tr>
              <th>Flow</th>
              <th>End Point</th>
              <th>Latency `+ { test } + `</th>
            </tr>
          </thead>
          <tbody>
    `;

  // Iterate over the keys of the map and add rows to the HTML content

  const data1 = new Map(rData1);

  for (let i = 1; i < data1.size; i++) {

    let valueMap1;
    let flow;
    let url;
    let latency;

    if (typeof data1.get(i) !== 'undefined') {
      valueMap1 = data1.get(i);
    }

    if (typeof valueMap1.split(":::")[1] !== 'undefined') {
      flow = valueMap1.split(":::")[1];
    }

    if (typeof valueMap1.split(":::")[2] !== 'undefined') {
      url = valueMap1.split(":::")[2]
    }


    if (typeof valueMap1.split(":::")[3] !== 'undefined') {
      latency = valueMap1.split(":::")[3]
    }

    htmlContent += `
        <tr>
          <td>${flow}</td>
          <td>${url}</td>
          <td>${latency}</td>
        </tr>
      `;
  }

  // Complete the HTML content
  htmlContent += `
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;
  return htmlContent;
}


async function generateHTML2(rData, label) {
  // Your Map data
  let test = JSON.stringify(label);

  // Your maximum progress value
  const maxValue = 500;

  // Start building the HTML content
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dynamic Table</title>
      <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }

        table {
          width: 100%;
          max-width: 100%;
        }

        .table-container {
max-width: 100%;
overflow-x: auto;
margin: 50px auto;
background-color: white;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
overflow: hidden;
}
        
        
        table { 
          margin-left: auto; 
          margin-right: auto; 
          font-size: 20px; 
          height: 100%; 
          table-layout: fixed; 
      } 

      td { 
          border: 1px solid black; 
          text-align: center; 
          padding: 10px; 
      } 
        
        th, td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          word-wrap: break-word;
        }
        
        th {
          background-color: #f2f2f2;
        }
        
        tbody tr:hover {
          background-color: #f5f5f5;
        }
        
        @media only screen and (max-width: 600px) {
          /* Add styles for smaller screens */
          th, td {
            padding: 10px;
          }
        }
        
        .progress-bar-container {
          position: relative;
          width: 100%;
          height: 20px;
          background-color: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: #4caf50;
          transition: width 0.3s ease;
        }
        
        .tooltip {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: #333;
          color: #fff;
          padding: 5px;
          border-radius: 4px;
          display: none;
        }
        
        .progress-bar-container:hover .tooltip {
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="table-container">
        <table id="dynamic-table">
          <thead>
            <tr>
              <th>Flow</th>
              <th>End Point</th>
              <th>Latency `+ { test } + `</th>
            </tr>
          </thead>
          <tbody>
    `;

  // Iterate over the keys of the map and add rows to the HTML content

  const data = new Map(rData);
  for (let i = 1; i < data.size; i++) {
    let valueMap1;
    let flow;
    let url;
    let latency;

    if (typeof data.get(i) !== 'undefined') {
      valueMap1 = data.get(i);
    }

    if (typeof valueMap1.split(":::")[1] !== 'undefined') {
      flow = valueMap1.split(":::")[1];
    }

    if (typeof valueMap1.split(":::")[2] !== 'undefined') {
      url = valueMap1.split(":::")[2]
    }


    if (typeof valueMap1.split(":::")[3] !== 'undefined') {
      latency = valueMap1.split(":::")[3]
    }

    htmlContent += `
        <tr>
          <td>${flow}</td>
          <td>${url}</td>
          <td>${latency}</td>
        </tr>
      `;
  }
  // Complete the HTML content
  htmlContent += `
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;

  return htmlContent;

}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */

async function httpsInvoke(options = {}) {
  const {
    method,
    url,
    headers = {},
    data = {},
  } = options;
  const custom = { ...options };
  try {
    const response = await axios(
      custom,
      {
        httpsAgent: https.globalAgent.options.rejectUnauthorized = false
      });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function replaceThrottleRequest(up, down, deviceId) {
  let payload1 = throttle;
  try {
    await Object.keys(payload1).forEach(function (key) {
      if (typeof payload1[key].down != 'undefined' && typeof payload1[key].up != 'undefined') {
        payload1[key].down = down;
        payload1[key].up = up;
      }
    });
  }
  catch (err) {
    console.error(err);
    throw err;
  }
  payload1.device_address = await getDeviceAddress(deviceId);
  return payload1;
}

/**Depth first search 0(V) time completixty to traversal nested JSON array.
 * 
 * @author: sasikumar Bharanikumar
 * @argument: json input file.
 * @type: Depth First Search and O(v) complexity
 * */
function traversal(arr, node) {
  arr.push(node.text);
  try {
    if (node.hasOwnProperty("nodes") && Array.isArray(node.nodes) && node.nodes.length != 0) {

      node.nodes.forEach(function (nodeChild) {
        test(arr, nodeChild);
      });
    } else {
      finalArray[counter] = arr.slice();
      counter++;
    }
  }
  catch (err) {
    console.error(err);
    throw err;
  }
  arr = arr.slice(0, -1);
}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function getDeviceAddress(deviceID) {
  var responsebody;
  let deviceAddress;
  try {
    await httpsInvoke({
      method: 'GET',
      url: 'https://ff60cdf18dc841559ada504885bc6118@api-dev.headspin.io/v0/devices',
      headers: { "content-type": "application/json" }
    }).then(res => {
      responsebody = res.data;
    });
  }
  catch (err) {
    console.log(err);
  }
  for (let i = 0; i < responsebody.devices.length; i++) {
    if (await responsebody.devices[i].device_id == deviceID) {
      deviceAddress = await responsebody.devices[i].device_address;
    }
  }
  return deviceAddress;
}


/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function jsonValidator(jsonBody) {
  return JSON.parse(jsonBody.replace(/["]+/g, '').replace(/[']+/g, "\""));
}

async function profilerSwitch(input, deviceId) {
  let finalResponse;

  if (input === "GSM") {
    //GSM first Generation
    finalResponse = await replaceThrottleRequest("0.0096", "0.0096", deviceId);
  }
  else if (input === "2G") {
    //2G GPRS
    finalResponse = replaceThrottleRequest("0.035", "0.115", deviceId);
  }
  else if (input === "3GBasic") {
    //3G basic
    finalResponse = replaceThrottleRequest("2", "1", deviceId);
  }
  else if (input === "3GHSPA") {
    //HSPA
    finalResponse = replaceThrottleRequest("7.2", "1.5", deviceId);
  }
  else if (input === "3GHSPA+") {
    //HSPA+
    finalResponse = replaceThrottleRequest("48", "7", deviceId);
  }
  else if (input === "4G") {
    //lte basic
    finalResponse = replaceThrottleRequest("150", "15", deviceId);
  }
  else if (input === "4G+") {
    //lte advance cat9+
    finalResponse = replaceThrottleRequest("450", "45", deviceId);
  }
  else if (input === "5G") {
    finalResponse = replaceThrottleRequest("1000", "150", deviceId);
  }
  else {
    console.error("Add Valid data");
  }

  console.log(JSON.stringify(finalResponse) + " : RESPONSE +++++++++");

  return finalResponse;
}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function replaceLockDeviceRequest(deviceId) {
  try {
    lock.device_id = await deviceId;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
  return lock;
}

async function analyticsBuilder() {
  myMap.forEach((v1, k) => {
    const v2 = myMap1.has(k) ? myMap1.get(k) : null;
  });

  let htmlSkelton = "<html>"
    + "<head>" +
    "<meta name= 'viewport'  content='width=device-width, initial-scale=1.0></meta>" +
    "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' integrity='sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65' crossorigin='anonymous'>" +
    "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css' integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' crossorigin='anonymous'>" +
    "<link href='https://fonts.googleapis.com/css?family=Muli:400' rel='stylesheet'/>" +
    "<link href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap' rel='stylesheet' />" +
    "<style>" +
    "#chart_wrap {" +
    "position: relative;" +
    "padding-bottom: 100%;" +
    "height:0;" +
    "overflow:hidden; }" +
    "@font-face {" +
    "font-family: 'FAMILY_NAME';" +
    "font-style: NORMAL_OR_ITALIC;" +
    "font-weight: NUMERIC_WEIGHT_VALUE;" +
    "src: url(FONT_FILE_NAME.woff2) format('woff2'); }" +
    "#piechart .divider{" +
    "background: white;" +
    "height: 50%;" +
    "left: 50%;" +
    "margin-left: -1px;" +
    "position: absolute;" +
    "top: 0;" +
    "transform-origin: 0 100%;" +
    "transform: rotate(calc(1turn * (var(--precent) / 100)));" +
    "width: 2px;}" +
    "div" +
    "{ margin: 0 auto; }" +
    "</style>" +
    "<script type=" + "text/javascript" + " src=" + "https://www.gstatic.com/charts/loader.js></script>" +
    "<script type='text/javascript'>" +
    "google.charts.load('current', {'packages':['corechart']});" +
    "google.charts.setOnLoadCallback(drawChart);" +
    "function drawChart() {" +
    "var data = google.visualization.arrayToDataTable(" +
    "[" +
    "['NETWORK API', 'LATENCY (MilleSeconds)']," +
    "['LOGIN'," + `${login}` + "]," +
    "['SEARCH'," + `${search}` + "]," +
    "['VIDEO PLAYBACK'," + `${videoPlayback}` + "]," +
    "['AD VIDEO PLAYBACK'," + `${adVidePlayback}` + "]," +
    "['CREATE PROFILE'," + `${createProfile}` + "]" +
    "]);" +
    "var options = {" +
    "title: 'BEAM - Network Latency'," +
    "is3D:true" +
    "};" +
    "var chart = new google.visualization.PieChart(document.getElementById('piechart'));" +
    " chart.draw(data, options);" +
    "}" +
    "</script>" +
    "</head>" +
    " <body>" +
    "<h2 style='text-align: center;'> Beam Network Sniffing Report </h2>" +
    "<div id=piechart style='width: 900px; height: 500px;'>" +
    "<div class='divider' style='--precent: 45;'></div>" +
    "<div class='divider' style='--precent: 65;'></div>" +
    "<div class='divider' style='--precent: 75;'></div>" +
    "<div class='divider' style='--precent: 100;'></div>" +
    "</div>" +
    "<table class='table table-hover'>" +
    "<thead>" +
    "<tr>" +
    "<th scope='col'>#</th>" +
    "<th scope='col'> CUJ </th>" +
    "<th scope='col'>Network Call</th>" +
    "<th scope='col'>Duration</th>" +
    "</tr>" +
    "</thead>" +
    "<tbody>";

  myMap.forEach(function (value, key) {
    let array = key.split(":::");
    htmlSkelton +=
      "<tr>" +
      "<th scope='row'>" + (counter++) + "</th>" +
      "<td>" + array[1] + "</td>" +
      "<td>" + array[0] + "</td>" +
      "<td>" + value + "</td>" +
      "</tr>"
  })

  htmlSkelton += "</tbody>" +
    "</table>" +
    "<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script>" +
    "<script src='https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js' integrity='sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49' crossorigin='anonymous'></script>" +
    "<script src='https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js' integrity='sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy' crossorigin='anonymous'></script>" +
    "<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js' integrity='sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V' crossorigin='anonymous'></script>" +
    "<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' integrity='sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4' crossorigin='anonymous'></script>" +
    "</body>" +
    "</html>"


  const writableStream = fs.createWriteStream('./output.html');
  writableStream.write(htmlSkelton, () => {
    console.log('HTML file created successfully' + htmlSkelton);
  });
  await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);

  //   return htmlSkelton;

}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function footer() {
  const footer = "</body>" +
    "</html>"

  return footer;
}


/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */

async function tableBody() {
  let tableHeader = "<table class='table table-hover'>" +
    "<thead>" +
    "<tr>" +
    "<th scope='col'>#</th>" +
    "<th scope='col'> CUJ </th>"
  "<th scope='col'>Network Call</th>" +
    "<th scope='col'>Duration</th>" +
    "</tr>" +
    "<thead>"

  let tableBody = "<tbody>" +
    "<tr>"
  // "<th scope='row'>"+i+"</th>"+
  // "<td>"++"</td>"+
  // "<td>"++"</td>"
}

async function getCUJDetails(sessionId) {
  const url = "https://ff60cdf18dc841559ada504885bc6118@api-dev.headspin.io/v0/sessions/analysis/pageloadtime/" + sessionId;
  try {
    const response = await httpsInvoke({
      method: 'GET',
      url: url,
      headers: { "Content-Type": "application/json" },
      data: ""
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

async function extractData(json) {
  const dataMap = new MapWithOrderedKeys();
  for (let i = 0; i < json.page_load_regions.length; i++) {
    const region = json.page_load_regions[i];
    const key = region.request_name.trim();
    const value = `start_Time:${region.request_start_time}:end_time:${region.request_end_time}`;
    dataMap.set(key, value);
  }
  return dataMap;
}

async function processCSV() {
  const mapi1 = new MapWithOrderedKeys();
  try {
    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](15000);
    const stream = fs.createReadStream('./output.csv').pipe(csv());

    for await (const data of stream) {
      mapi1.set(data.Start, data.End + ":::" + data.URL + ":::" + data.Duration);
    }
    return mapi1;
  } catch (error) {
    console.error("Error processing CSV:", error);
  }
}

async function processCSVD() {
  const mapi1 = new MapWithOrderedKeys();
  try {
    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](15000);
    const stream = fs.createReadStream('./output1.csv').pipe(csv());

    for await (const data of stream) {
      mapi1.set(data.Start, data.End + ":::" + data.URL + ":::" + data.Duration);
    }
    return mapi1;
  } catch (error) {
    console.error("Error processing CSV:", error);
  }
}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function generateHTML(sessionTag, sessionTag1) {
  const session1 = await getCUJDetails(sessionTag);
  const session2 = await getCUJDetails(sessionTag1);

  const map = await extractData(session1);
  const map2 = await extractData(session2);


  //const session2 = await getCUJDetails(sessionTag1);


  let url = "https://ff60cdf18dc841559ada504885bc6118@api-dev.headspin.io/v0/sessions/" + `${sessionTag}` + ".csv";

  let url1 = "https://ff60cdf18dc841559ada504885bc6118@api-dev.headspin.io/v0/sessions/" + `${sessionTag1}` + ".csv";

  console.log(" SESSION URL Stage:::::::::::::: " + url);
  console.log(" SESSION URL Prod :::::::::::::: " + url1);

  let response;
  let response1;

  await httpsInvoke({
    method: 'GET',
    url: url,
    headers: { "Content-Type": "application/json" },
    data: ""
  }).then(res => {
    response = res.data;
  });

  await httpsInvoke({
    method: 'GET',
    url: url1,
    headers: { "Content-Type": "application/json" },
    data: ""
  }).then(res => {
    response1 = res.data;
  });

  await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);
  const writableStream = fs.createWriteStream('./output.csv');

  await writableStream.write(response, () => {
    console.log('CSV file created successfully');
  });

  await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);
  const writableStream1 = fs.createWriteStream('./output1.csv');

  await writableStream1.write(response1, () => {
    console.log('CSV file created successfully');
  });

  const mp = await processCSV();
  const mp1 = await processCSVD();

  const rData1 = new MapWithOrderedKeys();
  const rData2 = new MapWithOrderedKeys();

  const tmap = new Map(mp);
  const tmap1 = new Map(mp1);
  let count = 0;

  for (let [key, value] of map) {
    let array = value.split(':');
    let start = parseInt(array[1]);
    let end = parseInt(array[3]);
    let flow = key;
    for (const [key, value] of tmap) {
      let endTime = parseInt(value.split(":::")[0]);
      let url = value.split(":::")[1];
      let duration = value.split(":::")[2];
      if (parseInt(key) > start && endTime < end) {
        if (url.includes('discomax') || url.includes('hbomaxcdn') || url.includes('cdn') || url.includes('CDN')) {
          count++;
          rData1.set(count, "Flow ::: " + flow + " ::: " + url + " endpoint ::: Latency " + duration);
        }
      }
    }
  }

  await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](15000);
  let count2 = 0;
  for (let [key, value] of map2) {
    let array = value.split(':');
    let start = parseInt(array[1]);
    let end = parseInt(array[3]);
    let flow = key;
    for (const [key, value] of tmap1) {
      let endTime = parseInt(value.split(":::")[0]);
      let url = value.split(":::")[1];
      let duration = value.split(":::")[2];
      if (parseInt(key) > start && endTime < end) {
        if (url.includes('discomax') || url.includes('hbomaxcdn') || url.includes('cdn') || url.includes('CDN')) {
          count2++;
          rData2.set(count2, "Flow ::: " + flow + " ::: " + url + " endpoint ::: Latency " + duration);
        }
      }
    }
  }

  fs.writeFileSync('output1.html', await generateHTML1(rData1, sessionTag), 'utf-8');
  fs.writeFileSync('output2.html', await generateHTML2(rData2, sessionTag1), 'utf-8');
  //await analyticsBuilder();
  return myMap;
}


module.exports = { invokeAgentPostCall, replaceThrottleRequest, httpsInvoke, replaceLockDeviceRequest, profilerSwitch, jsonValidator, traversal, generateHTML }
