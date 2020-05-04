// const fs = require('fs');

const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 }
      }
    }, //each stage is object, match is the name of the stage
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    // {
    //   $match: {
    //     _id: { $ne: 'EASY' }
    //   }
    // }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: {
        numTourStarts: -1
      }
    },
    {
      $limit: 12
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan
    }
  });
});

// const path = `${__dirname}/../dev-data/data/tours-simple.json`;

// Parse the json into javascript object
// const tours = JSON.parse(fs.readFileSync(path));

//RoutHandlers

// exports.checkId = (req, res, next, val) => {
//   if (val * 1 > tours.length)
//     return res.status(404).json({ message: 'Invalid id' });
//   next();
// };

// exports.checkReqBody = (req, res, next) => {
//   if (!(req.body.name && req.body.price)) {
//     return res.status(400).json({
//       status: 'failed',
//       message: 'Invalid Data price or name is missing'
//     });
//   }
//   next();
// };

// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'OK',
//     data: {
//       results: tours.length,
//       tours
//     }
//   });
// };
// exports.getTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find(e => e.id === id);

//   res.status(200).json({
//     status: 'OK',
//     requestTime: req.requestTime,
//     data: {
//       tour
//     }
//   });
// };
// exports.createTour = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   console.log(req.body);
//   const newTour = Object.assign({ id: newId }, req.body);
//   console.log('tour' + newTour);

//   tours.push(newTour);
//   fs.writeFile(path, JSON.stringify(tours), err => {
//     res.status(201).json({
//       status: 'OK',
//       data: {
//         tour: newTour
//       }
//     });
//   });
// };

// exports.updateTour = (req, res) => {
//   res.status(201).json({
//     status: 'OK',
//     data: {
//       tour: '<Tour information>'
//     }
//   });
// }
// exports.deleteTour = (req, res) => {
//   res.status(204).json({
//     status: 'OK',
//     data: null
//   });
// };
