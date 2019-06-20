'use strict'

module.exports = function(app){
	const controller = require('./controller');

	// ROUTES NOTES
	// GET
	app.get('/notes', controller.getNotes);
	app.get('/notes/:id', controller.notesById);

	// POST
	app.post('/notes', controller.createNotes);
	// PATCH
	app.patch('/notes/:id', controller.updateNotes);
	// DELETE
	app.delete('/notes/:id', controller.deleteNotes);


	// ROUTES CATEGORIES
	// GET
	app.get('/category', controller.getCategory);
	app.get('/category/:id', controller.findCategory);
	// POST
	app.post('/category', controller.createCategory);
	// PATCH
	app.patch('/category/:id', controller.updateCategory);
	// DELETE
	app.delete('/category/:id', controller.deleteCategory);

}