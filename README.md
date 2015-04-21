# csslintloader for [webpack](http://webpack.github.io/)

## Install

```console
$ npm install csslint-loader
```

## Usage

In your webpack configuration

```javascript
module.exports = {
  // ...
  module: {
    loaders: [
      {
        css: /\.css$/,
        loader: "style?css!csslint")
      },
      {
        scss: /\.scsss$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!csslint!sass")
      }
    ]
  }
  // ...
}
```

### Options

You can pass the following options as a query string  

- configFile (default: looks for `.csslintrc` in your root directory.)  
Pass in the location/name of file if different  

```
loader: "style?css?csslint?configFile=./config/cs"
```

- failWarning (default: true)  
If you don't pass in any config file, csslint's default setting sets all rules to 1 (warning)  
Forcing an error by default on warnings. Can disable by passing false as value

```
loader:"style?css?csslint?failOnWarning=false"
```

- failOnError (default: true)  
Passing this as true will fail the build and give the correct exit status
