const express = require('express')
const router = express.Router()
var distance = require('google-distance-matrix');
distance.key(process.env.API_KEY);

distance.units('metric');
// distance.mode('transit');
// distance.transit_mode('bus');
// var dat = "Boston"
// var origins = ['San Francisco CA'];
// origins.push (dat)
// //console.log(origins)
// var destinations = ['New York NY'];

router.post('/', (req, res) => {

    const origins = []
    origins[0] = req.body.origin

    const destinations = []
    destinations[0] = req.body.destination

    if (req.body.transit === true) {
     distance.mode('transit');
     distance.transit_mode('bus');
    }else{
        distance.mode('driving')
        //return
    }
    
    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if(!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            res.json(distances);
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.text;
                        var time = distances.rows[i].elements[j].duration.text;
                        console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        console.log('Time of travel from ' + origin + ' to ' + destination + ' is ' + time);
                    } else {
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
        }
    });

  })


module.exports = router