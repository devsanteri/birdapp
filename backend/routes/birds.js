const router = require('express').Router();
let Bird = require('../models/bird.model');

router.route('/').get((req, res) => {
  Bird.find()
    .then(birds => res.json(birds))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const birdname = req.body.birdName;
  const nickname = req.body.nickname;
  const date = Date.parse(req.body.date);
  const birdlat = +req.body.birdLat;
  const birdlon = +req.body.birdLon;


  const newBird = new Bird({
    birdname,
    nickname,
    date,
    birdlat,
    birdlon,
  });

  newBird.save()
  .then(() => res.json('Bird added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Bird.findById(req.params.id)
    .then(bird => res.json(bird))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Bird.findByIdAndDelete(req.params.id)
    .then(() => res.json('Bird deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Bird.findById(req.params.id)
    .then(bird => {
      bird.username = req.body.username;
      bird.description = req.body.description;
      bird.duration = Number(req.body.duration);
      bird.date = Date.parse(req.body.date);

      bird.save()
        .then(() => res.json('bird updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;