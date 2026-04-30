/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = new Collection({
			createRule: '@request.auth.id != "" && members.id ?= @request.auth.id',
			deleteRule: '@request.auth.id != "" && members.id ?= @request.auth.id',
			fields: [
				{
					autogeneratePattern: '[a-z0-9]{15}',
					help: '',
					hidden: false,
					id: 'text3208210256',
					max: 15,
					min: 15,
					name: 'id',
					pattern: '^[a-z0-9]+$',
					presentable: false,
					primaryKey: true,
					required: true,
					system: true,
					type: 'text',
				},
				{
					autogeneratePattern: '',
					help: '',
					hidden: false,
					id: 'text245846248',
					max: 0,
					min: 0,
					name: 'label',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text',
				},
				{
					cascadeDelete: false,
					collectionId: '_pb_users_auth_',
					help: '',
					hidden: false,
					id: 'relation1168167679',
					maxSelect: 10,
					minSelect: 0,
					name: 'members',
					presentable: false,
					required: false,
					system: false,
					type: 'relation',
				},
				{
					autogeneratePattern: '.{15}',
					help: '',
					hidden: false,
					id: 'text2324736937',
					max: 0,
					min: 15,
					name: 'key',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: true,
					system: false,
					type: 'text',
				},
			],
			id: 'pbc_3277857102',
			indexes: [],
			listRule: '@request.auth.id != "" && members.id ?= @request.auth.id',
			name: 'lists',
			system: false,
			type: 'base',
			updateRule:
				'@request.auth.id != "" && @request.body.key = key && @request.body.key:changed = false',
			viewRule: '@request.auth.id != "" && members.id ?= @request.auth.id',
		})

		return app.save(collection)
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3277857102')

		return app.delete(collection)
	}
)
