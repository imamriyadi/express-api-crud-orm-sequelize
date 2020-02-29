var express = require('express');
var router = express.Router();
const model = require('../models/index')
/* GET users listing. */
router.get('/', async function (req, res, next) {
    try {
        const users = await model.users.findAll({});
        if (users.length !== 0) {
            res.json({
                'status': 'Success',
                'message': '',
                'data': users
            })
        } else {
            res.json({
                'status': 'error',
                'message': 'Empty',
                'data': {}
            })
        }
    } catch (e) {
        res.json({
            'status': 'error',
            'message': e.message,
            'data': {}
        })
    }
});

router.post('/', async function (req, res, mext) {
    try {
        const {name, email, gender, phone_number} = req.body;
        const users = await model.users.create({
            name,
            email,
            gender,
            phone_number: phone_number
        });
        if (users) {
            res.status(201).json({
                'status': 'success',
                'message': 'Insert Success',
                'data': users
            })
        }
    } catch (e) {
        res.status(400).json({
            'status': 'error',
            'message': e.message,
            'data': {}
        })
    }
})

router.put('/:id', async function (req, res, next) {
    try {
        const userId = req.params.id;
        const {
            name,
            email,
            gender,
            phoneNumber
        } = req.body;
        const users = await model.users.update({
            name,
            email,
            gender,
            phone_number: phoneNumber
        }, {
            where: {
                id: userId
            }
        });
        if (users) {
            res.json({
                'status': 'success',
                'massage': 'Update Success',
                'data': users
            })
        }

    } catch (e) {
        res.status(400).json({
            'status': 'error',
            'message': res.body,
            'data': {}
        })
    }
})

router.delete('/:id', async function (req, res, next) {

    try{
      const userId = req.params.id;
      const users = model.users.destroy({
        where: {
          id:userId
        }
      })

      if(users){
        res.json({
          'status':'success',
          'message':'Success Delete Data',
          'data':users
        })
      }

    }catch (e) {
      req.status(400).json({
        'status':'error',
        'message':'Delete Data Gagal',
        'data':{}
      })
    }
})

module.exports = router;
