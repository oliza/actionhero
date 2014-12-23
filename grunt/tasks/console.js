var repl = require('coffee-script/repl');

module.exports = function(grunt) {

  grunt.registerTask('console', 'Get a REPL/console into your application', function(){
    var done = this.async();
    grunt.startActionhero(function(api, actionhero){

      prompt = '[ AH::' + api.env + ' ] >> '
      // note this REPL will not run _start commands, only the intilizers
      var r = repl.start({
        prompt: prompt,
        useGlobal: false
      });

      r.on('exit', function(){
        actionhero.stop(function(){
          done();
        });
      });

      r.outputStream.write('*** STARTING ACTIONHERO REPL ***\r\n\r\n');

      // r.prompt = '[ AH::' + api.env + ' ] >> ';

      // for(var i in api.config.servers){
      //   api.config.servers[i].enabled = false;
      // }

      // api.config.tasks.scheduler = false;
      // api.config.tasks.queues    = [];

      r.context.api = api;

      actionhero.start(function(){
        r.outputStream.write('\r\n\r\n');
        r.outputStream.write('*** REPL READY ***\r\n\r\n');
        r.outputStream.write(prompt);
      });

    }, true);
  });

};