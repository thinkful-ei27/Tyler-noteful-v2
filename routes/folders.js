'use strict';

const express = require('express');

const router = express.Router();

const knex = require('../knex');

module.exports = router;


// get all
router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});


// Get single folder by id 
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  knex
    .first()
    .from('folders')
    .where('id', id)
    .then(folder => {
      if (folder) {
        res.json(folder);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

router.put(':/id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  knex('folders')
    .update(updateObj)
    .where('id', id)
    .returning('*')
    .then(results => {
      if(results) {
        res.json(results);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

// create a folder 

router.post('/', (res, req, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  } 
  knex
    .insert(newItem, ['id', 'name'])
    .into('folders')
    .then(results => {
      res.json(results[0]);
    })
    .catch(err => {
      next(err);
    });
});

// delete a folder 

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex('folders')
    .del()
    .where('id', id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});








