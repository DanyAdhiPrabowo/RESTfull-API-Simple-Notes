'use strict'

const response 	= require('./response');
const connection= require('./connect');

exports.getNotes = function(req, res){

	let title 	= req.query.search || '';
	let sort 	= req.query.sort || 'ASC';

	if(title || sort){
		var query 	=  `Select note.idNote, note.title, note.note, note.time, category.category  From note left join category on note.category=category.id WHERE note.title LIKE '%${title}%' ORDER BY note.time ${sort}`
	}else{
		var query 	= `Select note.idNote, note.title, note.note, note.time, category.category  From note left join category on note.category=category.id`
	}

	connection.query(
		query,
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows!=''){
					return res.send({
						data:rows,
					})
				}else{
					return res.send({
						message:'Data not found',
					})
				}
			}
		}
	)
}



exports.createNotes = function(req, res){

	let title 		= req.body.title;
	let note 		= req.body.note;
	let category	= req.body.category;

	if(!title){
		res.status(400).send('Name is require');
	}else if(!note){
		res.status(400).send('Note is require');
	}else if(!category){
		res.status(400).send('Category is require');
	}else{
		connection.query(
			`Insert into note set title=?, note=?, category=?`,
			[title, note, category],
			function(error, rows, field){
				if(error){
					throw error;
				}else{
					return res.send({
						error:false,
						data: rows,
						message: "Data has been saved"
					})
				}
			}
		)
	}
}



exports.updateNotes = function(req, res, next){

	let title 		= req.body.title;
	let note 		= req.body.note;
	let category	= req.body.category;
	let id 			= req.params.id;

	connection.query(
		`select * from note where idNote=?`,[id],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows != ""){
					if(!title){
						res.status(400).send({message:'Title is require'});
					}else if(!note){
						res.status(400).send({message:'Note is require'});
					}else if(!category){
						res.status(400).send({message:'Category is require'});
					}else{
						connection.query(
							`Update note set title=?, note=?, category=? where idNote=?`,
							[title, note, category, id],
							function(error, rowss, field){
								if(error){
									throw error;
								}else{
									return res.send({
										message: 'Data has been updated'
									})
								}
							}
						)
					}
				}else{
					res.status(400).send({message:'Id not valid.'})
				}
			}
		}
	)
}



exports.deleteNotes = function(req, res, next){

	let id = req.params.id;

	connection.query(
		`Delete from note where idNote=?`,
		[id],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows.affectedRows != ""){
					return res.send({
						message:'Data has been delete'
					})
				}else{
					return res.status(400).send({message:"Id not valid."})
				}
			}
		}
	)
}



exports.notesById = function(req, res) {
	
	let id = req.params.id;

	connection.query(
		`Select note.idNote, note.title, note.note, note.time, category.category  From note left join category on note.category=category.id where note.idNote=?`,
		[id],
		function(error, rows, field) {
			if(error) {
				throw error;
			} else {
				if (rows != "") {
					return res.send ({
						data:rows,
					})	
				} else {
					return res.send ({
						message:"Data not found."
					})
				}
			}
		}
	)
}



exports.searchByTitle = function(req, res, next){
	
	let title = req.query.search;
	
	connection.query(
		`Select note.idNote, note.title, note.note, note.time, category.category  From note left join category on note.category=category.id WHERE note.title LIKE ?`,
		[title],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows != ""){
					return res.send({
						data:rows,
					})	
				}else{
					return res.send({
						message:"Data not found."
					})
				}
			}
		}
	)
}







// CATRGORY
exports.getCategory = function(req, res){
	connection.query(
		`Select *  From category`,
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				return res.send({
					error:false,
					data:rows,
				})
			}
		}
	)
}



exports.createCategory 	= function(req, res){

	let category		= req.body.category;

	if(!category){
		res.status(400).send('Category is require');
	}else{
		connection.query(
			`Insert into category set category=?`,
			[title, note, category],
			function(error, rows, field){
				if(error){
					throw error;
				}else{
					return res.send({
						error:false,
						data: rows,
						message: "Data has been saved"
					})
				}
			}
		)
	}
}



exports.updateCategory 	= function(req, res, next){

	let category		= req.body.category;
	let id 				= req.params.id;


	connection.query(
		`select * from category where id=?`,[id],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows != ""){
					if(!category){
						res.status(400).send({message:'Category is require'});
					}else{
						connection.query(
							`Update category set category=? where id=?`,
							[title, note, category, id],
							function(error, rowss, field){
								if(error){
									throw error;
								}else{
									return res.send({
										message: 'Data has been change'
									})
								}
							}
						)
					}
				}else{
					res.status(400).send({message:'Id not valid.'})
				}
			}
		}
	)
}



exports.deleteCategory = function(req, res, next){

	let id = req.params.id;

	connection.query(
		`Delete from category where id=?`,
		[id],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows.affectedRows != ""){
					return res.send({
						data:rows,
						message:'Data has been delete'
					})
				}else{
					return res.status(400).send({message:"Id not valid."})
				}
			}
		}
	)
}



exports.findCategory = function(req, res, next){

	let id = req.params.id;

	connection.query(
		`Select *  From category where id=?`,
		[id],
		function(error, rows, field){
			if(error){
				throw error;
			}else{
				if(rows != ""){
					return res.send({
						data:rows,
					})	
				}else{
					return res.send({
						message:"Data not found."
					})
				}
			}
		}
	)
}