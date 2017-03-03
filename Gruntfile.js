module.exports = function(grunt) {

  grunt.initConfig({
	
	concat: {
	  js: {
      	src: [
      		'node_modules/jquery/dist/jquery.min.js',
      		'node_modules/bootstrap/dist/js/bootstrap.min.js',
      		'node_modules/responsive-toolkit/dist/bootstrap-toolkit.min.js',
      		'node_modules/jquery-validation/dist/jquery.validate.min.js',
      		'node_modules/jquery-validation/dist/localization/messages_tr.js',
      		'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
      		'node_modules/jquery-smooth-scroll/jquery.smooth-scroll.min.js',
      		'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
      		'node_modules/slider-pro/dist/js/jquery.sliderPro.min.js'
      	],
		dest: 'assets/js/libs.js',
		seperator : ';'
	  },
	  css: {
		src: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/font-awesome/css/font-awesome.min.css',
			'node_modules/hamburgers/dist/hamburgers.min.css',
			'node_modules/hover.css/css/hover-min.css',
			'node_modules/magnific-popup/dist/magnific-popup.css',
			'node_modules/slider-pro/dist/css/slider-pro.min.css'
		],
		dest: 'assets/css/libs.css'
	  }
	},
	uglify: {
		options: {

		},
		my_target: {
			files: {
				'assets/js/libs.min.js': ['assets/js/libs.js'] // destination : src
			}
		}
	},
	cssmin: {
		options: {
		   shorthandCompacting: false,
		   roundingPrecision: -1
		},
		target: {
		   files: {
		   		'assets/css/libs.min.css': ['assets/css/libs.css'] // destination : src
		   }
		}
	},
	sass: {                              
		dist: {                           
		  options: { 
			style: 'expanded',
			noCache: true
		  },
		  files: { 
			'assets/css/style.css': 'assets/scss/style.scss' // 'destination': 'source' 
		  }
		}
	},
	watch: {
	  files: ['assets/js/custom.js','assets/scss/*.scss','assets/css/responsive.css'],
	  tasks: ['concat','uglify','cssmin','sass']
	} 
  });
	
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat','uglify','cssmin','sass','watch']);

};