const router = require('express').Router();
const { Op } = require("sequelize");
const { Cars } = require('../../models');

// router.get('/:id', async (req, res) => {
//   try {
//     const carData = await Cars.findAll({
//       where: {
//         id: req.params.id
//       },
//     })

//     // Serialize data so the template can read it
//     const cars = carData.map((cars) => cars.get({ plain: true }));

//     res.status(200).json(cars);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/search', async (req, res) => {
  console.log(req.body)
  try {
    const carData = await Cars.findAll({
      where: {
        Year: {
          [Op.gte]: req.body.year
        },
        passengerCapacity: {
          [Op.gte]: req.body.passengerCapacity
        },
        MSRP: {
          [Op.gte]: req.body.MSRP
        },
      },
    })

    // Serialize data so the template can read it
    const cars = carData.map((cars) => cars.get({ plain: true }));
    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json(err);
  }

});
router.get('/', async (req, res) => {
  try {
    const carData = await Cars.findAll();

    // Serialize data so the template can read it
    const cars = carData.map((cars) => cars.get({ plain: true }));

    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const projectData = await Cars.findAll();

//     // Serialize data so the template can read it
//     const projects = projectData.map((project) => project.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       projects, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
