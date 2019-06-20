'use strict'

const response 	= require('../response');
const connection= require('../connect');


exports.getCategories = function(req, res){
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



exports.categoryById = function(req, res, next){

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