'use strict';

const knex = require('../knex');

let searchTerm = 'gaga';
knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => { 
    console.error(err);
  });
let id = '14';

knex 

  .first('notes.id', 'title', 'content')
  .from('notes')
  .where('id', id)
  .then(results => {
    console.log(JSON.stringify(results));
  }
  );
  
let updateObj = {'title': 'my test title', 'content': 'test content'};
  
  
knex('notes')
  .update(updateObj)
  .where('id', id)
  .then(results => {
    console.log(JSON.stringify(results));
  });

const noteObject = {
  'title': 'creating a whole new thing',
  'content': 'golley gee i sure hope this works'
};

// knex
//   .insert(noteObject)
//   .into('notes')
//   .returning(['id', 'title', 'content'])
//   .then(console.log);

knex  
  .from('notes')
  .del()
  .where('id', '14')
  .then(console.log);


