/# Adonis Ramenbox

### Installation

Adonis Ramenbox requires [Adonisjs](https://adonisjs.com/) v4 to run.

Install the PeerDependencies in your host application

````js
    "@adonisjs/bodyparser": "^2.0.5",
    "@adonisjs/cors": "^1.0.7",
    "@adonisjs/drive": "^1.0.4",
    "@adonisjs/fold": "^4.0.9",
    "@adonisjs/generic-exceptions": "^3.0.1",
    "@adonisjs/validator": "^5.0.6",
    "adonis-bumblebee": "^2.1.0",
    "adonis-lucid-filter": "^1.0.5",
    "@ordentco/adonis-drive": "^1.0.2",
    "@slynova/flydrive": "^1.0.3",
    "@slynova/flydrive-gcs": "^1.0.3"
````

set your `config/drive.js`
```javascript
'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk is used when you interact with the file system without
  | defining a disk name
  |
  */
  default: 'local',

  disks: {
    /*
    |--------------------------------------------------------------------------
    | Local
    |--------------------------------------------------------------------------
    |
    | Local disk interacts with the a local folder inside your application
    |
    */
    local: {
      driver: 'local',
      config: {
        root: Helpers.tmpPath()
      }
    },

    /*
    |--------------------------------------------------------------------------
    | S3
    |--------------------------------------------------------------------------
    |
    | S3 disk interacts with a bucket on aws s3
    |
    */
    s3: {
      driver: 's3',
      config: {
        key: Env.get('S3_KEY'),
        secret: Env.get('S3_SECRET'),
        bucket: Env.get('S3_BUCKET'),
        region: Env.get('S3_REGION')
      }
    },

    gcs: {
      driver: 'gcs',
      config: {
        keyFilename: Env.get('GCS_KEY_FILE_NAME'), // path to json file
        bucket: Env.get('GCS_BUCKET')
      }
    }
  }
}
```

add provider to `start/app.js`

```javascript
const providers = [
  ...
  '@adonisjs/validator/providers/ValidatorProvider',
  '@ordentco/adonis-drive/providers/DriveProvider',
  'adonis-bumblebee/providers/BumblebeeProvider',
  'adonis-lucid-filter/providers/LucidFilterProvider',
  ...
]
```

<!-- if use gcs for drive
```sh
$ npm install googleapis
```

add provider to `start/app.js`
```javascript
const providers = [
    ...
    '@ordentco/ramenbox/src/Providers/Google/GoogleServiceProvider.js',
    ...
]
```

and add env keys
`GOOGLE_API_KEY`
`GOOGLE_APP_KEY_PATH`
`GOOGLE_PROJECT_ID`
`GOOGLE_BUCKET_NAME` -->

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
