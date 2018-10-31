'use strict'



const loopback = require('loopback')
const promisify = require('util').promisify
const fs = require('fs')
const writeFile = promisify(fs.writeFile)
const mkdirp = promisify(require('mkdirp'))



const app = loopback()
const db = app.dataSource('ds_indisuper', {

  connector: 'postgresql',
  hostname: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'db_indisuper'
})



discover().then(

  success => process.exit(),

  error => { console.error('UNHANDLED ERROR:\n', error); process.exit(1)
}

)



async function discover () {

  const schema = await db.discoverSchema(

    'eventos', // the table name on database

    {

      schema: 'public' // the database/schema name

    }

  )

  await writeFile(

    'common/models/Eventos.json',

    JSON.stringify(schema, null, 2)

  )

}
