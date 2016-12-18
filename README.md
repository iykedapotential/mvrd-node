# mvrd-node
A library for getting the data of Nigerian vehicle  using the registration plate number. 

## Installation

[NODE](https://nodejs.org/en/download) and [NPM]( https://www.npmjs.com) are required.

```
npm install mvrd-node  --save
```

## Usage

The basic usage of this library is:
```js

/**
 * Get Vehicle Data
 * @param {String} platenumber 
 * @return {Promise} Object 
 */

 var mvrd = require('mvrd-node');

 var client = new mvrd();
 client.getData().then(function(resp){
     console.log(resp);
 })
 // Sample Output would look like:
`{ plateNumber: 'FST918EH',
  ownerName: ' AKINJO A STELLA',
  color: 'Custom',
  model: 'Honda Accord',
  chasisNumber: '1HGCM56303A039882',
  vehicleStatus: 'Default',
  isssueDate: '2016-09-08T12:50:46.493',
  expiryDate: '2017-09-07T12:50:46.493' }
  `
```

## Unit Test
```
npm test
```


## Contributing

Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or HackerNews? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/iykedapotential)!

Thanks!
Ikedieze Onyeforo.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
