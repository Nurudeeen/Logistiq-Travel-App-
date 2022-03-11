const express = require('express')
const router = express.Router()
var distance = require('google-distance-matrix');

const jwt = require("jsonwebtoken");
const User = require('../models/LogistiqSchema');

distance.key(process.env.API_KEY);




distance.units('metric');

router.post('/', async (req, res) => {
    const token = req.headers['x-access-token']
    
    const origins = []
    origins[0] = req.body.origin

    const destinations = []
    destinations[0] = req.body.destination
    distance.mode('driving')

   try{ 
    const decoded = jwt.verify(token, process.env.SECRET)
    const email = decoded.email
    
    distance.matrix(origins, destinations, async  (err, distances) =>  {
        if (err) {
            return console.log(err);
        }
        if(!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distance = distances.rows[i].elements[j].distance.text;
                        var time = distances.rows[i].elements[j].duration.text;
                        console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                        console.log('Time of travel from ' + origin + ' to ' + destination + ' is ' + time);
                        await User.updateOne(
                            { email: email },
                            { $set: { distance: distance,
                                      time: time
                             } }
                        )
                
                        return res.json({ status: 'ok',
                                          distance: distance,
                                          time: time
                    })
                    } else {
                        console.log(destination + ' is not reachable by land from ' + origin);
                    }
                }
            }
        }
    })
}catch(error){
     return res.json({ status: 'error', error: 'invalid token' });
};
  })
router.get('/', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, process.env.SECRET)
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', distance: user.distance, time: user.time })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})
module.exports = router