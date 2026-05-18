/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_3277857102",
    "help": "",
    "hidden": false,
    "id": "relation1154021400",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "list",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3277857102",
    "help": "",
    "hidden": false,
    "id": "relation1154021400",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "list",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
