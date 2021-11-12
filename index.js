//create simple api using express
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('listening on port 3000');
});


//create json object called event that contains a name, date, location, frequency, description, and cost
var testEvent1 = {
    name: '$3 Beer Special',
    place: 'Drakes',
    location: '123 Main Street, Clarksville TN',
    frequency: 'Weekly',
    weekday: 'Monday',
    time: '5:00 PM',
    description: '$3 Beer Specials on select Draft Beers',
    cost: '$3',
    id: 1
};
var testEvent2 = {
    name: 'Trivia',
    place: 'Oak Grove Casino',
    location: '456 Corner Streen, Clarksville TN',
    frequency: 'Weekly',
    weekday: 'Wednesday',
    time: '8:00pm',
    description: 'Trivia Night at the Casino',
    cost: 'Free',
    id: 2
};

var events = [];
//pusing test events into main events array
events.push(testEvent1, testEvent2);

//returns slim details about all events
app.get("/api/events", (req,res) => {
    var eventsObject = {}
    for(var i = 0; i < events.length; i++){
        eventsObject[i] = {
            name: events[i].name,
            place: events[i].place,
            location: events[i].location,
            frequency: events[i].frequency,
            weekday: events[i].weekday,
            time: events[i].time,
            description: events[i].description,
            cost: events[i].cost,
            id: events[i].id
        }
    }
    res.json(eventsObject);
});

//create endpoint that accepts a post request containing event details and returns the event
app.post("/api/createEvent", urlencodedParser, (req,res) => {
    var newEvent = req.body;
    console.log(req.body.name)
    console.log(newEvent);
    var id = {
        id: events.length + 1
    }
    console.log(id);
    var finalEvent = Object.assign(newEvent, id);
    events.push(finalEvent);
    res.json(finalEvent);
});

//Hosting index page
app.use(express.static("landing-page"));
app.get('/', (req,res) =>{
 res.sendFile('index.html', {root: __dirname + '/landing-pages'});
});
