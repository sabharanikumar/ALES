const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
var Regex = require("regex");
//var pathtest = require('jsonpath');
const throttle = require("./Throttle.json")
const lock = require("./LockDevice.json");


//const json = require('./ExpectedResult.json');
const json = require('./Platforms/Web_Max.json');
const fs = require('fs'); 
const csv = require('csv-parser');
const JSONStream = require('JSONStream');
//const { keys } = require('wd/lib/commands');
let myMap = new Map();
let myMap1 = new Map();
let login=0,search=0,videoPlayback=0,adVidePlayback=0,createProfile=0;

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
    const custom = { ...options};
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
async function replaceThrottleRequest(up, down,deviceId) {
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
    console.log(JSON.stringify(payload1)+" :::Response  1");
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
            console.log(finalArray[counter]);
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
async function getDeviceAddress(deviceID)
{
    var responsebody;
    let deviceAddress;
    try {
        await httpsInvoke({
            method: 'GET',
            url: 'https://ff60cdf18dc841559ada504885bc6118@api-dev.headspin.io/v0/devices',
            headers: {"content-type": "application/json" }
        }).then(res => {
            responsebody = res.data;
        });
    }
    catch(err)
    {
        console.log(err);
    }
    for(let i = 0; i<responsebody.devices.length;i++)
    {
        if(await responsebody.devices[i].device_id == deviceID)
        {
            deviceAddress = await responsebody.devices[i].device_address;
        }
    }
    console.log(deviceAddress +"  +++++++ Device ID");
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

async function profilerSwitch(input,deviceId) {
    let finalResponse;

    if (input === "GSM") {
        //GSM first Generation
        finalResponse = await replaceThrottleRequest("0.0096", "0.0096",deviceId);
    }
    else if (input === "2G") {
        //2G GPRS
        finalResponse = replaceThrottleRequest("0.035", "0.115",deviceId);
    }
    else if (input === "3GBasic") {
        //3G basic
        finalResponse = replaceThrottleRequest("2", "1",deviceId);
    }
    else if (input === "3GHSPA") {
        //HSPA
        finalResponse = replaceThrottleRequest("7.2", "1.5",deviceId);
    }
    else if (input === "3GHSPA+") {
        //HSPA+
        finalResponse = replaceThrottleRequest("48", "7",deviceId);
    }
    else if (input === "4G") {
        //lte basic
        finalResponse = replaceThrottleRequest("150", "15",deviceId);
    }
    else if (input === "4G+") {
        //lte advance cat9+
        finalResponse = replaceThrottleRequest("450", "45",deviceId);
    }
    else if (input === "5G") {
        finalResponse = replaceThrottleRequest("1000", "150",deviceId);
    }
    else {
        console.error("Add Valid data");
    }
   
    console.log(JSON.stringify(finalResponse)+" : RESPONSE +++++++++");
    
    return finalResponse;
}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function replaceLockDeviceRequest(deviceId) {
    try
    {
    lock.device_id = await deviceId;
    }
    catch(err)
    {
        console.error(err);
        throw err;
    }
    console.log(JSON.stringify(lock)+" :::::::::::::::::");
    return lock;
}

async function analyticsBuilder()
{
    console.log("****** API RESPONSE LATENCY STARTS HERE ********")
    myMap.forEach((v1, k) => {
        const v2 = myMap1.has(k) ? myMap1.get(k) : null;
        console.log(`${k}: ${v1}, ${v2}`);
      });
    console.log("****** API RESPONSE LATENCY ENDS HERE ********")

   /* let htmlSkelton = "<html>"
                         +"<head>"+
                         "<meta name= 'viewport'  content='width=device-width, initial-scale=1.0></meta>"+
                         "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' integrity='sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65' crossorigin='anonymous'>"+
                         "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css' integrity='sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO' crossorigin='anonymous'>"+
                         "<link href='https://fonts.googleapis.com/css?family=Muli:400' rel='stylesheet'/>"+
                         "<link href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap' rel='stylesheet' />"+
                         "<style>"+
                         "#chart_wrap {"+
                         "position: relative;"+
                         "padding-bottom: 100%;"+
                         "height:0;"+
                         "overflow:hidden; }"+
                         "@font-face {"+
                         "font-family: 'FAMILY_NAME';"+
                         "font-style: NORMAL_OR_ITALIC;"+
                         "font-weight: NUMERIC_WEIGHT_VALUE;"+
                         "src: url(FONT_FILE_NAME.woff2) format('woff2'); }"+
                         "#piechart .divider{"+
                            "background: white;"+
                            "height: 50%;"+
                            "left: 50%;"+
                            "margin-left: -1px;"+
                            "position: absolute;"+
                            "top: 0;"+
                            "transform-origin: 0 100%;"+
                            "transform: rotate(calc(1turn * (var(--precent) / 100)));"+
                            "width: 2px;}"+
                            "div"+
                            "{ margin: 0 auto; }"+
                         "</style>"+
                         "<script type="+"text/javascript"+" src="+"https://www.gstatic.com/charts/loader.js></script>"+
                         "<script type='text/javascript'>"+
                         "google.charts.load('current', {'packages':['corechart']});"+
                         "google.charts.setOnLoadCallback(drawChart);"+
                         "function drawChart() {"+
                         "var data = google.visualization.arrayToDataTable("+
                         "["+
                         "['NETWORK API', 'LATENCY (MilleSeconds)'],"+
                         "['LOGIN',"+`${login}`+"],"+
                         "['SEARCH',"+`${search}`+"],"+
                         "['VIDEO PLAYBACK',"+`${videoPlayback}`+"],"+
                         "['AD VIDEO PLAYBACK',"+`${adVidePlayback}`+"],"+
                         "['CREATE PROFILE',"+`${createProfile}`+"]"+
                         "]);"+
                         "var options = {"+
                         "title: 'BEAM - Network Latency',"+
                         "is3D:true"+
                         "};"+
                         "var chart = new google.visualization.PieChart(document.getElementById('piechart'));"+
                         " chart.draw(data, options);"+
                         "}"+
                         "</script>"+
                         "</head>"+
                         " <body>"+
                         "<h2 style='text-align: center;'> Beam Network Sniffing Report </h2>"+
                         "<div id=piechart style='width: 900px; height: 500px;'>"+
                         "<div class='divider' style='--precent: 45;'></div>"+
                         "<div class='divider' style='--precent: 65;'></div>"+
                         "<div class='divider' style='--precent: 75;'></div>"+
                         "<div class='divider' style='--precent: 100;'></div>"+
                         "</div>"+
                         "<table class='table table-hover'>"+
                         "<thead>"+
                         "<tr>"+
                         "<th scope='col'>#</th>"+
                         "<th scope='col'> CUJ </th>"+
                         "<th scope='col'>Network Call</th>"+
                         "<th scope='col'>Duration</th>"+
                         "</tr>"+
                         "</thead>"+
                         "<tbody>";

                         myMap.forEach (function(value, key) {
                            let array = key.split(":::");
                            htmlSkelton += 
                            "<tr>"+
                            "<th scope='row'>"+(counter++) +"</th>"+
                            "<td>"+array[1]+"</td>"+
                            "<td>"+array[0]+"</td>"+
                            "<td>"+value+"</td>"+
                            "</tr>"
                          })

                          htmlSkelton += "</tbody>"+
                                         "</table>"+
                                         "<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script>"+
                                         "<script src='https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js' integrity='sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49' crossorigin='anonymous'></script>"+
                                         "<script src='https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js' integrity='sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy' crossorigin='anonymous'></script>"+
                                         "<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js' integrity='sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V' crossorigin='anonymous'></script>"+
                                         "<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' integrity='sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4' crossorigin='anonymous'></script>"+
                                         "</body>"+
                                         "</html>"
                        

            const writableStream = fs.createWriteStream('./output.html');
            writableStream.write(htmlSkelton, () => {
                console.log('HTML file created successfully' + htmlSkelton);
              });*/
              await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);

           //   return htmlSkelton;

}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function footer()
{
    const footer = "</body>"+
                   "</html>"

                   return footer;
}


/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */

async function tableBody()
{
    let tableHeader= "<table class='table table-hover'>"+
                   "<thead>"+
                   "<tr>"+
                   "<th scope='col'>#</th>"+
                   "<th scope='col'> CUJ </th>"
                   "<th scope='col'>Network Call</th>"+
                   "<th scope='col'>Duration</th>"+
                   "</tr>"+
                   "<thead>"

     let tableBody=  "<tbody>"+
                     "<tr>"
                    // "<th scope='row'>"+i+"</th>"+
                    // "<td>"++"</td>"+
                    // "<td>"++"</td>"
}

/**
 * @author: sasikumar bharanikumar
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function generateHTML(sessionTag,sessionTag1)
{

    console.log(" SESSION:::::::::::::: "+ sessionTag );

    console.log(" SESSION:::::::::::::: "+ sessionTag1 );

    let url = "https://ff60cdf18dc841559ada504885bc6118@api-dev.headspin.io/v0/sessions/"+`${sessionTag}`+".csv";

    let url1 = "https://ff60cdf18dc841559ada504885bc6118@api-dev.headspin.io/v0/sessions/"+`${sessionTag1}`+".csv";

    console.log(" SESSION URL Stage:::::::::::::: "+ url );
    console.log(" SESSION URL Prod :::::::::::::: "+ url1 );

    let response;
    let response1;

    await httpsInvoke({
      method: 'GET',
      url: url,
      headers: {"Content-Type": "application/json"},
      data: ""
   }).then(res => {
      response = res.data;
   });

   await httpsInvoke({
    method: 'GET',
    url: url1,
    headers: {"Content-Type": "application/json"},
    data: ""
 }).then(res => {
    response1 = res.data;
 });

   await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);
   const writableStream = fs.createWriteStream('./output.csv');

              writableStream.write(response, () => {
                console.log('CSV file created successfully');
              });

              await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);
                const writableStream1 = fs.createWriteStream('./output1.csv');

                 writableStream1.write(response1, () => {
                   console.log('CSV file created successfully');
              });

        for(let i =0;i<json.CUJ.length;i++)
              {
                console.log(json.CUJ[i].Expectedapi+" TEST************");

                const temp = json.CUJ[i].Expectedapi.valueOf().trim();
               await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);
              // console.log(response+" RESPONSE +++++++++++");

              fs.createReadStream('./output.csv').pipe(csv()).on('data', function(data){
              try {
                const temp2 = data.URL;

                    if(temp2.includes(temp))
                    {
                      console.log("Entered into IF...");
                      console.log(data.URL);
                      console.log(data.Duration);

                      if (myMap.has(temp+":::"+json.CUJ[i].category.valueOf().trim())) {
                        // Key already exists, check value
                        if ( myMap.get(temp+":::"+json.CUJ[i].category.valueOf().trim()) < parseInt(data.Duration)) {
                          // Override key with new value
                           myMap.set(temp+":::"+json.CUJ[i].category.valueOf().trim(), parseInt(data.Duration));
                        }
                        else
                        {
                          console.log(myMap.get(temp+":::"+json.CUJ[i].category.valueOf().trim()) +" HIGHER NUMBER")
                        }
                      } else {
                        // Key doesn't exist, add it to the map
                         myMap.set(temp+":::"+json.CUJ[i].category.valueOf().trim(), parseInt(data.Duration));
                        
                      }
                    }
                }
             catch(err) {
                      console.error("ERROR");
                      throw err;
               }
            }) 
            }


            for(let i =0;i<json.CUJ.length;i++)
            {
              console.log(json.CUJ[i].Expectedapi+" TEST************");

              const temp = json.CUJ[i].Expectedapi.valueOf().trim();
             await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);
            // console.log(response+" RESPONSE +++++++++++");

            fs.createReadStream('./output1.csv').pipe(csv()).on('data', function(data){
            try {
               const temp2 = data.URL;
                  if(temp2.includes(temp))
                  {
                    console.log("Entered into IF...");
                    console.log(data.URL);
                    console.log(data.Duration);

                    if (myMap1.has(temp+":::"+json.CUJ[i].category.valueOf().trim())) {
                      // Key already exists, check value
                      if ( myMap1.get(temp+":::"+json.CUJ[i].category.valueOf().trim()) < parseInt(data.Duration)) {
                        // Override key with new value
                         myMap1.set(temp+":::"+json.CUJ[i].category.valueOf().trim(), parseInt(data.Duration));
                      }
                      else
                      {
                        console.log(myMap1.get(temp+":::"+json.CUJ[i].category.valueOf().trim()) +" HIGHER NUMBER")
                      }
                    } else {
                      // Key doesn't exist, add it to the map
                       myMap1.set(temp+":::"+json.CUJ[i].category.valueOf().trim(), parseInt(data.Duration));
                      
                    }
                  }
              }
           catch(err) {
                    console.error("ERROR");
                    throw err;
             }
          }) 
          }


        /*    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](5000);
            console.log([...myMap]+" MMMMMAAAAPPPP");

            myMap.forEach((values,keys)=>{
                if(keys.includes('login'))
                {
                    login = login+ values;

                    let array = keys.split(":::");

                    console.log(array[0]+" : "+array[1]);
                    console.log(login+" for EACH loop");
                }
                else if(keys.includes('search'))
                {
                    search = search+values;

                    let array = keys.split(":::");

                    console.log(array[0]+" : "+array[1]);
                    console.log(search+" for EACH loop");
                }
                else if(keys.includes('videoPlayback'))
                {
                    videoPlayback = videoPlayback+values;

                    let array = keys.split(":::");

                    console.log(array[0]+" : "+array[1]);
                    console.log(videoPlayback+" for EACH loop");
                }
                else if(keys.includes('adVideoPlayback'))
                {
                    adVidePlayback = adVidePlayback+values;

                    let array = keys.split(":::");

                    console.log(array[0]+" : "+array[1]);
                    console.log(adVidePlayback+" for EACH loop");
                }
                else if(keys.includes('createProfile'))
                {
                    createProfile = createProfile+values;

                    let array = keys.split(":::");

                    console.log(array[0]+" : "+array[1]);
                    console.log(createProfile+" for EACH loop");
                }
            })*/
            await analyticsBuilder();


            
            return myMap;
}


module.exports = { invokeAgentPostCall, replaceThrottleRequest,httpsInvoke, replaceLockDeviceRequest, profilerSwitch, jsonValidator, traversal, generateHTML, myMap}
