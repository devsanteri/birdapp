const router = require('express').Router();
const Bird = require('../models/bird.models');

router.route('/getall').get((req, res) => {
  Bird.find()
    .then(birds => res.json(birds))
    .catch(err => {
      console.log(err)
      res.status(400).json({error: 'Message'})
    });
});

router.route('/add').post((req, res) => {
  console.log(req.body)
  const birdname = req.body.birdname;
  const nickname = req.body.nickname;
  const date = Date.parse(req.body.date);
  const birdlat = +req.body.birdlat;
  const birdlon = +req.body.birdlon;


  const newBird = new Bird({
    birdname,
    nickname,
    date,
    birdlat,
    birdlon,
  });

  newBird.save()
  .then((data) => {
    console.log(data)
    res.status(200).json('Bird added!')
  })
  .catch(err => {
    // console.log(err)
    res.status(400).json({error: err})
  });
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
      bird.birdname = req.body.birdname;
      bird.nickname = req.body.nickname;
      bird.date = Date.parse(req.body.date);
      bird.birdlat = req.body.birdlat;
      bird.birdlon = req.body.birdlon;

      bird.save()
        .then(() => res.json('bird updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;