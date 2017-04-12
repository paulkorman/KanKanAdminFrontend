'use strict';

module.exports = function(grunt) {
grunt.loadNpmTasks('grunt-html-build');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.initConfig({ pkg: grunt.file.readJSON('package.json'),

htmlbuild: {
    dev: {
        src: 'html_src/*.html',
        dest: '',
        options: {
            beautify: true,
            prefix: '',
            relative: true,
            basePath: false,
            sections: {
                templates: 'templates',
                layout: {
                    sidebar: 'templates/page-sidebar.html',
                    header: 'templates/header.html',
                    footer: 'templates/footer.html',
                }
            },
            data: {
                // Data to pass to templates
                //version: "0.1.0",
                //title: "test",
            },
        }
    },
},
watch: {
	less: {
		files: ['pages/LESS/**/*.less', 'assets/less/*.less'],
		tasks: 'less'
	},
    html: {
        files: 'html_src/*.html',
        tasks: 'htmlbuild'
    }
},
less: {
    default: {
        options: {
            paths: ['pages/less'],
            yuicompress: true
        },
        files: {
            'pages/css/pages.css': 'pages/less/pages.less'
        }
    },
    dev: {
        options: {
            paths: ['assets/less'],
            yuicompress: true
        },
        files: {
            'assets/css/style.css': 'assets/less/style.less'
        }
    }
},
//copy: {
//  main: {
//    src: ['**/*',  '!**/node_modules/**','!.gitgnore','!package.json','!Gruntfile.js','!gulpfile.js'],
//    expand: true,
//    cwd: '',
//    dest: 'dist',
//  }
//},
cssmin: {
  minify: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    expand: true,
    cwd: 'dist/assets/css/',
    src: ['*.css', '!*.min.css'],
    dest: 'dist/assets/css/',
    ext: '.css'
  }
},
uglify: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },
    my_target: {
      files: [{
          expand: true,
          cwd: 'dist/assets/js/',
          src: '**/*.js',
          dest: 'dist/assets/js/'
      }]
    }
}
});

grunt.registerTask(
  'build', 
  'Compiles all of the assets and copies the files to the build directory.', 
  ['copy','cssmin','uglify']
);

};
