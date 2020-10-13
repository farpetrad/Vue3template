# Vuetemplate a .NET Core 3.1 Application framework for Vue.js 3

## Features
 * Content compression using gzip or brotli 
 * Static content caching with custom scheme for assets while not caching html content for passing http://webpagetest.org/ 
 * Response caching
 * webpack4
 * babel7
 * bootstrap via cdn


## Building
To build the solution you must build the C# solution and the vue client.  
* C# can be built through visual studio or from the command line with dotnet build --configuration Release
* Vue client can be built with npm run dev/build from the command line

* C# Build tested in Visual Studio 2019 16.7.5
* Vue build tested with node.js 10.16.3 and 13.12.0
