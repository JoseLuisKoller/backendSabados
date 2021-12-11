const MySQL = {
    client: "mysql",
    connection: "mysql://root:@localhost:3306/knex",
  };
const SQLite = {
    client: "sqlite3",
    connection: { filename: "./src/ecommerce/productos.sqlite" },
    useNullAsDefault: true,
};
class BaseDeDatos{
    constructor(type){
        this.client = `${type}`
    }
    createTableProducts(){
        if(this.client == "mysql"){
            const knex = require('knex')(MySQL);
            knex.schema.hasTable('products').then(function(exists) {
                if (!exists) {
                    knex.schema.createTable("products", (table) =>{
                        table.increments("id");
                        table.string("imgURL")
                        table.string("name");
                        table.string("description");
                        table.integer("price");
                        table.integer("stock");
                        table.integer("code");
                        table.timestamp('created_at').defaultTo(knex.fn.now());
                        table.uuid('id').primary();
                }
                )
            }}).then(() => console.log("Tabla creada"))
            .catch((error) => {
              console.log(error);
              throw error;
            })
            .finally(() => {
              knex.destroy();
            });
        }else{
            if(this.client=="sqlite3"){
                const knex = require('knex')(SQLite);
                knex.schema.hasTable('products').then(function(exists) {
                    if (!exists) {
                        knex.schema.createTable("products", (table) =>{
                            table.increments("id");
                            table.string("imgURL")
                            table.string("name");
                            table.string("description");
                            table.integer("price");
                            table.integer("stock");
                            table.integer("code");
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                            table.uuid('id').primary();
                    }
                    )
                }}).then(() => console.log("Tabla creada"))
                .catch((error) => {
                console.log(error);
                throw error;
                })
                .finally(() => {
                knex.destroy();
                });
            }else{
                console.log("Base de datos NO soportada.")
            }
        }
        
    }
    insertProduct(product){
        if(this.client=="mysql"){
            const knex = require('knex')(MySQL);
            knex("products").insert(product).then(() => console.log("Se inserto la informacion"))
            .catch((err) => {
            console.log(err);
            throw err;
            })
            .finally(() => {
            knex.destroy();
        });
        }else{
            if(this.client="sqlite3"){
                const knex = require('knex')(SQLite);
                knex("products").insert(product).then(() => console.log("Se inserto la informacion"))
                .catch((err) => {
                console.log(err);
                throw err;
                })
                .finally(() => {
                knex.destroy();
                });
            }else{
                console.log("Base de datos NO soportada.")
            }
        }
        
    }
    getProducts(){
        if(this.client=="mysql"){
            const knex = require('knex')(MySQL);
            return knex("products").then((rows) => {
                
            const productos = []
                for (const row of rows) {
                  productos.push({name: row["name"], img: row["imgURL"], descript: row["description"], price: row["price"], stock: row["stock"]});
                }
                return productos;
              })
              .catch((error) => {
                console.log(error);
                throw error;
              })
              .finally(() => {
                knex.destroy();
              });
        }else{
            if(this.client="sqlite3"){
                const knex = require('knex')(SQLite);
                return knex("products").then((rows) => {
                    const productos = []
                    for (const row of rows) {
                    productos.push({name: row["name"], img: row["imgURL"], descript: row["description"], price: row["price"], stock: row["stock"]});
                    }
                    return productos;
                })
                .catch((error) => {
                    console.log(error);
                    throw error;
                })
                .finally(() => {
                    knex.destroy();
                });
            }else{
                console.log("Base de datos NO soportada.")
            }
        }
    }
    createTableMessages(){
        if(this.client=="mysql"){
            const knex = require('knex')(MySQL);
            knex.schema.hasTable('chat').then(function(exists) {
                if (!exists) {
                    knex.schema.createTable("products", (table) =>{
                        knex.schema.createTable("chat", (table) =>{
                            table.string("email")
                            table.string("mensaje");
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                }
                )
            })}})
            .then(() => console.log("Tabla creada"))
            .catch((error) => {
              console.log(error);
              throw error;
            })
            .finally(() => {
              knex.destroy();
            });
        
        }else{
            if(this.client="sqlite3"){
                const knex = require('knex')(SQLite);
                knex.schema.hasTable('chat').then(function(exists) {
                    if (!exists) {
                        knex.schema.createTable("products", (table) =>{
                            knex.schema.createTable("chat", (table) =>{
                                table.string("email")
                                table.string("mensaje");
                                table.timestamp('created_at').defaultTo(knex.fn.now());
                    }
                    )
                })}}).then(() => console.log("Tabla creada"))
                .catch((error) => {
                console.log(error);
                throw error;
                })
                .finally(() => {
                knex.destroy();
                })
            }else{
                console.log("Base de datos NO soportada.")
            }
        }
        
    }
    insertMessages(message){
        if(this.client=="mysql"){
            const knex = require('knex')(MySQL);
                knex("chat").insert(message).then(() => console.log("Se inserto la informacion"))
                .catch((err) => {
                console.log(err);
                throw err;
                })
                .finally(() => {
                knex.destroy();
                });
        }else{
            if(this.client="sqlite3"){
                const knex = require('knex')(SQLite);
                knex("chat").insert(message).then(() => console.log("Se inserto la informacion"))
                .catch((err) => {
                console.log(err);
                throw err;
                })
                .finally(() => {
                knex.destroy();
                });
            }else{
                console.log("Base de datos NO soportada.")
            }
        }
        
    }
    getMessages(){
        if(this.client=="mysql"){
            const knex = require('knex')(MySQL);
            const mensajes = []
            knex("chat").then((rows) => {
                for (const row of rows) {
                  mensajes.push({email: row["email"], timestamp: row["hora"], mensaje: row["mensaje"]});
                }
                return mensajes;
              })
              .catch((error) => {
                console.log(error);
                throw error;
              })
              .finally(() => {
                knex.destroy();
              });
              
        }else{
            if(this.client="sqlite3"){
                const knex = require('knex')(SQLite);
                const promise =  knex("chat").then((rows) => {
                    const mensajes = []
                    for (const row of rows) {
                    mensajes.push({email: row["email"], timestamp: row["hora"], mensaje: row["mensaje"]});
                    }
                    return mensajes 
                })
                .catch((error) => {
                    console.log(error);
                    throw error;
                })
                .finally(() => {
                    knex.destroy();
                });
                return promise
            }else{
                console.log("Base de datos NO soportada.")
            }
        }
    }
    deleteTable(name){
        if(this.type=="mysql"){
            const knex = require('knex')(MySQL);
            knex.schema.dropTable(name)
        }else{
            if(this.type="sqlite3"){
                const knex = require('knex')(SQLite);
                knex.schema.dropTable(name)
            }else{
                console.log("Base de datos NO soportada.")
            }
        }
    }
}
module.exports = BaseDeDatos;