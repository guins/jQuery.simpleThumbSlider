# jQuery Plugin Grunt Template

Clone this repo to quickly start a new jQuery Plugin development using Grunt


## Set up

### Git

Change the remote url

	git remote set-url origin https://github.com/yourUserID/yourPluginRepoName.git

### Grunt Init

Install all dependencies

	npm install

### Your project

1. Edit the package.json file and change all your information

	<code><pre>vim package.json</pre></code>

2. Rename both files src/jQuery.myPluginName.js and src/jQuery.myPluginName.less with the exact same 'name' defined into package.json (for example: 'jq-myFirstPlugin').

	<code><pre>git mv src/less/jQuery.myPluginName.less src/less/jq-myFirstPlugin.less
	git mv src/js/jQuery.myPluginName.js src/js/jq-myFirstPlugin.js</pre></code>

It's a key point in the set up process because Grunt is actually using this 'name' to get these files and do all tasks such as compile, minify, etc.

3. Open your JS plugin file (old src/jQuery.myPluginName.js) and change the 'pluginName' variable with the name you want. (The one that you are gonna use to call your plugin in your application js code)


## Code your plugin

### Grunt using Less

If you want to use less, run grunt watch to auto compile your less file into css file

	grunt watch

### Grunt Clean

Before starting coding, or whenever you want, remove all grunt generated files

	grunt clean

### Do whatever you want

* Extend grunt tasks to do crazy things
* Add several examples
* use vendor libraries
* Etc.


## Release your plugin

Just run

	grunt release

This previous Grunt task actually execute several sub-tasks

	grunt less // compile src/less/*.less files into src/css/ folder
	grunt clean // remove all generated files in the build/ folder

	// Copy js and css files into the build folder
	// Generate one develpment version and one minified version of each file
	// Add them a banner with name, copyright, licence, version, and more
	grunt copy
	grunt uglify
	grunt usebanner

