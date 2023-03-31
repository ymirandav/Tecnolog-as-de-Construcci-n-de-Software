//npm init
//npm install express express-graphql graphql --save

//dependencias
var express = require('express');
const { graphqlHTTP } = require('express-graphql'); 
var { buildSchema } = require('graphql');

// Construimos el schema
var schema = buildSchema(`

  type Cliente {
	id: Int
	nombre: String
        telefono: String
			DNI: String
	}

  type Query {
    	clientes: [Cliente]
    	cliente(id: Int): Cliente
  	}

  type Mutation { 
    	addCliente(nombre: String, telefono: String, DNI: String): Cliente
		updateCliente(id: Int, nombre: String, telefono: String, DNI: String): Cliente
		deleteCliente(id: Int): Boolean
  	}

`);

var clientes = [];
var counter=1;

// Función para resolver las peticiones
var root = {
  clientes: () => { return clientes; },

  cliente: ( data ) => { 
	for ( var i=0; i<clientes.length; i++ ) 
		if ( clientes[i].id==data.id ) 
			return clientes[i]; 

	return null; 
	},

  	addCliente: ( data ) => { 
		var c={ 'id': counter, 'nombre':data.nombre, 'telefono':data.telefono , "DNI":data.DNI}; 
		clientes.push( c ); 
		counter++; 
		return c; 
	},
	updateCliente: ( data ) => { 
		for ( var i=0; i<clientes.length; i++ ) 
			if ( clientes[i].id==data.id ) { 
				clientes[i].nombre = data.nombre; 
				clientes[i].telefono = data.telefono; 
				clientes[i].DNI = data.DNI; 
				return clientes[i]; 
			} 
		return null; 
	},
	deleteCliente: ( data ) => { 
		for ( var i=0; i<clientes.length; i++ ) 
			if ( clientes[i].id==data.id ) { 
				clientes.splice(i, 1); 
				return true; 
			} 
		return false; 
	}
};

// Arrancamos el servidor web
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, //interfaz para interactuar con la API
}));
app.listen(4000);
console.log('GraphQL API en http://localhost:4000/graphql');