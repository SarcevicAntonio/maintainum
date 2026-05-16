/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3277857102")

  // remove field
  collection.fields.removeById("relation1653163849")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3277857102")

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_2602490748",
    "help": "",
    "hidden": false,
    "id": "relation1653163849",
    "maxSelect": 9007199254740991,
    "minSelect": 0,
    "name": "tasks",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
