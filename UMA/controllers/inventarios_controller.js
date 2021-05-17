const Planta = require('../models/planta');
const Especie = require('../models/especie');
const Zona = require('../models/zona');

exports.getSemillas=(request, response, next) => {

	response.render('inventario',{titulo:'Inventario Semilla'});


}

exports.getPlantasMadre=(request, response, next) => {

	response.render('inventario',{titulo:'Inventario Plantas Madre'});

}


exports.getAgregar=(request, response, next) => {

	Especie.fetchAll()
          .then(([especies, fieldData]) => {
			  Zona.fetchAll()
				.then(([zonas, fieldData]) => {
					response.render('registrarPlanta', {
						zonas: zonas,
						especies: especies
					});
				}).catch(err => {
					console.log(err);
				});
          })
          .catch(err => {
                 console.log(err);
          });

}


exports.postAgregar=(request, response, next) => {
	const planta = new Planta(request.body.razon, request.body.zona, request.body.cantidad,request.body.etapa, request.body.especie);

	planta.save()
		.then( () => {
			response.redirect('/inventarios/semillas');
		}).catch( (err) => {
			console.log(err);
			response.redirect('/');
		});
}

exports.getPlantas=(request, response, next) => {

	response.render('plantasBaja');
}

