/* globals Wsh: false */
/* globals process: false */

/* globals describe: false */
/* globals test: false */
/* globals expect: false */

// Shorthand
var util = Wsh.Util;
var path = Wsh.Path;
var os = Wsh.OS;
var fs = Wsh.FileSystem;
var fse = Wsh.FileSystemExtra;
var child_process = Wsh.ChildProcess;
var cli = Wsh.Commander;
var ConfigStore = Wsh.ConfigStore;
var dotenv = Wsh.DotEnv;

var isError = util.isError;

var _cb = function (fn/* , args */) {
  var args = Array.from(arguments).slice(1);
  return function () { fn.apply(null, args); };
};

describe('BasicPackage', function () {
  var testName;
  var noneStrVals = [true, false, undefined, null, 0, 1, NaN, Infinity, [], {}];

  testName = 'Commander';
  test(testName, function () {
    var headArgs = [process.argv0, process.argv[1]];
    var processArgv;

    var schema = {
      command: 'unZip <zipPath> [destDir]',
      options: [
        ['-N, --no-makes-dir', 'None create a new directory'],
        ['-P, --pwd <password>', 'unzip password']
      ],
      action: function (zipPath, destDir, options) {
        if (options.pwd) {
          return 'Unzip "' + zipPath + '". The encrypting password is "' + options.pwd + '"';
        }
        if (!options.makesDir) {
          return 'Unzip "' + zipPath + '" without making new directory.';
        }
        if (destDir) {
          return 'Unzip "' + zipPath + '" to "' + destDir + '".';
        }
        return 'Unzip "' + zipPath + '".';
      }
    };

    var zipPath = 'D:\\mydata.zip';
    var destDir = 'D:\\tmp';

    cli.clearPrograms();
    cli.addPrograms([schema]);
    processArgv = headArgs.concat([]);
    expect(_cb(cli.parse, processArgv)).toThrowError();

    cli.clearPrograms();
    cli.addProgram(schema);
    processArgv = headArgs.concat(['unZip', zipPath]);
    expect(cli.parse(processArgv)).toBe('Unzip "' + zipPath + '".');

    cli.clearPrograms();
    cli.addProgram(schema);
    processArgv = headArgs.concat(['unZip', zipPath, destDir]);
    expect(cli.parse(processArgv)).toBe('Unzip "' + zipPath + '" to "' + destDir + '".');

    cli.clearPrograms();
    cli.addProgram(schema);
    processArgv = headArgs.concat(['unZip', zipPath, '-N']);
    expect(cli.parse(processArgv)).toBe('Unzip "' + zipPath + '" without making new directory.');

    cli.clearPrograms();
    cli.addProgram(schema);
    processArgv = headArgs.concat(['unZip', zipPath, '-P', 'p@ssWD']);
    expect(cli.parse(processArgv)).toBe('Unzip "' + zipPath + '". The encrypting password is "p@ssWD"');
  });

  testName = 'ConfigStore';
  test(testName, function () {
    var DEF_DIRNAME = '.wsh';
    var DEF_NAME = 'settings.json';
    var defaultDir = path.resolve(process.cwd(), DEF_DIRNAME);
    var defConfPath = path.join(defaultDir, DEF_NAME);

    fse.removeSync(defConfPath);
    expect(fs.existsSync(defConfPath)).toBe(false);

    var conf = new ConfigStore();

    expect(conf.store).toEqual({});

    // Sets multiple items at once
    var obj = { a: [{ b: { c: 3 } }], d: 'D' };
    expect(conf.set(obj)).toEqual(undefined);
    expect(fs.existsSync(defConfPath)).toBe(true);
    // Gets all the config
    expect(conf.store).toEqual(obj);

    // Checks if an item exists.
    expect(conf.has('d')).toBe(true);
    // Gets an item
    expect(conf.get('d')).toBe('D');

    expect(conf.has('a.0.b')).toBe(true);
    expect(conf.get(['a', 0, 'b', 'c'])).toBe(3);

    expect(conf.has('n')).toBe(false);
    expect(conf.get('n')).toBe(undefined);
    expect(conf.get('n', 'Def Val')).toBe('Def Val');
    expect(conf.has('n')).toBe(false);

    // Sets an item
    expect(conf.set('n', 'New Value')).toBe(undefined);
    expect(conf.has('n')).toBe(true);
    expect(conf.get('n')).toBe('New Value');
    expect(conf.get('n', 'Def Val')).toBe('New Value');
    // Deletes an item
    expect(conf.del('n')).toBe(true);
    expect(conf.has('n')).toBe(false);

    // Deletes all items
    expect(conf.clear()).toBe(undefined);
    expect(conf.store).toEqual({});

    // Cleans
    fse.removeSync(defaultDir);
    expect(fs.existsSync(defaultDir)).toBe(false);
  });

  testName = 'DotEnv';
  test(testName, function () {
    process.env = os.getEnvVars(); // Resets env values

    var envPath = dotenv.envPathDefault;
    var envSets = [
      '# Lines beginning with # are threated as comments',
      'EMPTY=', // EMPTY: ''
      'JSON={ foo: "bar" }', // JSON: '{ foo: "bar" }'
      'WHITE_SPACE=  some value ', // WHITE_SPACE: 'some value'
      'SINGLE_QUOTE=\'  some value \'', // SINGLE_QUOTE: '  some value '
      'DOUBLE_QUOTE="  Some Value "', // DOUBLE_QUOTE: '  Some Value '
      'MULTILINE="new\\nline"' // MULTILINE: 'new\nline'
    ];

    fs.writeFileSync(envPath, envSets.join('\n'), { encoding: 'utf8' });

    expect(process.env.EMPTY).toBeUndefined();
    expect(process.env.JSON).toBeUndefined();
    expect(process.env.WHITE_SPACE).toBeUndefined();
    expect(process.env.SINGLE_QUOTE).toBeUndefined();
    expect(process.env.DOUBLE_QUOTE).toBeUndefined();
    expect(process.env.MULTILINE).toBeUndefined();

    var result = dotenv.config();
    expect(isError(result.error)).toBe(false);

    expect(process.env.EMPTY).toBe('');
    expect(process.env.JSON).toBe('{ foo: "bar" }');
    expect(process.env.WHITE_SPACE).toBe('some value');
    expect(process.env.SINGLE_QUOTE).toBe('  some value ');
    expect(process.env.DOUBLE_QUOTE).toBe('  Some Value ');
    expect(process.env.MULTILINE).toBe('new\nline');

    // Cleans
    fse.removeSync(envPath);
    expect(fs.existsSync(envPath)).toBe(false);
  });
});
