## Installation

### Setup
```` javascript
const providers = [
        '@adonisjs/framework/providers/AppProvider',
        '@adonisjs/auth/providers/AuthProvider',
        '@adonisjs/bodyparser/providers/BodyParserProvider',
        '@adonisjs/drive/providers/DriveProvider',
        'adonis-drive-google/providers/DriveProvider',
        '@adonisjs/cors/providers/CorsProvider',
        '@adonisjs/lucid/providers/LucidProvider',
        'adonis-bumblebee/providers/BumblebeeProvider',
        '@adonisjs/validator/providers/ValidatorProvider',
        'adonis-lucid-filter/providers/LucidFilterProvider',
        '@ordent/adonis-gcp/providers/DriveProvider'
    ]
````

### Controller
```` javascript
const RamenController = require('../../../packages/ramenbox/src/Controller/RamenController')
````
#### Model
```` javascript
const RamenController = require('../../../packages/ramenbox/src/Controller/RamenController')
````
##### Properties
```` javascript
static get properties () {
		return ['id', 'username', 'password', 'email', 'created_at', 'updated_at', 'image']
    }
````
##### Slug
```` javascript
static get slug(){
        return 'email'
    }
````
##### Rules
````javascript
    static get rules(){
        return {
            post: {
                email: 'required|email|unique:users,email',
                username: 'required'
            }
        }
    }
````
##### Relations
````javascript
    static get relations(){
        return ['profiles', 'tokens']
    }
````
##### Sanitize
```` javascript
    static get sanitize(){
        return {
            post: {
                'email': 'normalize_email'
            }
        }
    }
````
#### Transformer
```` javascript
    const RamenTransformer = require('../../../packages/ramenbox/src/Controller/RamenController')
````
