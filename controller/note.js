'use strict'

const response 	= require('../response');
const connection= require('../connect');


exports.getNotes = function(req, res){

	let title 		= req.query.search || '';
	let sort 		= req.query.sort || 'DESC';
	let page 		= req.query.page || 1;
	let limit 		= req.query.limit || 10;
	let offset 		= ((page - 1)*limit ) || 0;

	var query 	=  `SELECT note.title, note.note, note.time, category.category  FROM note LEFT JOIN category ON note.category=category.id WHERE note.title LIKE '%${title}%' ORDER BY note.time ${sort} LIMIT ${
			limit} OFFSET ${offset}`;
	
	connection.query(
		`SELECT count(*) as total from note where title  LIKE '%${title}%' `,function(error, rows){
			if(error){
				throw error;
			}else{

				let total 		= rows[0].total;
				let totalPage 	= Math.ceil(total/limit);
				
				connection.query(
					query,
					function(error, rows, field){
						if(error){
							throw error;
						}else{
							if(rows!=''){
								return res.send({
									data:rows,
									total:total,
									page:page,
									totalPage:totalPage,
									limit:limit,
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

		}
	)
}



exports.createNote = function(req, res){

	let title 		= req.body.title;
	let note 		= req.body.note;
	let category	= req.body.category;

	if(!title){
		res.status(400).send('Title is require');
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



exports.updateNote = function(req, res, next){

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



exports.deleteNote = function(req, res, next){

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



exports.noteById = function(req, res) {
	
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
