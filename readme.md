# Adonis Ramenbox

### Installation

Adonis Ramenbox requires [Adonisjs](https://adonisjs.com/) v4 to run.

Install the dependencies

```sh
$ npm i adonis-bumblebee adonis-lucid-filter --save
$ adonis install @adonisjs/validator
$ adonis install @adonisjs/drive
```

add provider to `start/app.js`

```javascript
const providers = [
  ...
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/drive/providers/DriveProvider',
  'adonis-bumblebee/providers/BumblebeeProvider',
  'adonis-lucid-filter/providers/LucidFilterProvider',
  ...
]
```

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
