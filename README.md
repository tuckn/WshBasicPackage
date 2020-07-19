# WshBasicPackage

The package to accelerate development on WSH (Windows Script Host). Works in a pure Windows environment.

## Operating environment

Works on JScript in Windows.

## Installation

(1) Create a directory of your WSH project.

```console
D:\> mkdir MyWshProject
D:\> cd MyWshProject
```

(2) Download this ZIP and unzipping or Use following `git` command.

```console
> git clone https://github.com/tuckn/WshBasicPackage.git ./WshModules/WshBasicPackage
or
> git submodule add https://github.com/tuckn/WshBasicPackage.git ./WshModules/WshBasicPackage
```

(3) Include _.\\WshBasicPackage\\dist\\bundle.js_ into your .wsf file.
For Example, if your file structure is

```console
D:\MyWshProject\
├─ Run.wsf
├─ MyScript.js
└─ WshModules\
    └─ WshBasicPackage\
        └─ dist\
          └─ bundle.js
```

The content of above _Run.wsf_ is

```xml
<package>
  <job id = "run">
    <script language="JScript" src="./WshModules/WshBasicPackage/dist/bundle.js"></script>
    <script language="JScript" src="./MyScript.js"></script>
  </job>
</package>
```

I recommend this .wsf file encoding to be UTF-8 [BOM, CRLF].

## Usage

Now you can use the following useful functions in _.\\MyScript.js_ (JScript).

### Core Modules

- [tuckn/WshPolyfill](https://github.com/tuckn/WshPolyfill)
- [tuckn/WshUtil](https://github.com/tuckn/WshUtil)
- [tuckn/WshPath](https://github.com/tuckn/WshPath)
- [tuckn/WshOS](https://github.com/tuckn/WshOS)
- [tuckn/WshFileSystem](https://github.com/tuckn/WshFileSystem)
- [tuckn/WshProcess](https://github.com/tuckn/WshProcess)
- [tuckn/WshChildProcess](https://github.com/tuckn/WshChildProcess)
- [tuckn/WshNet](https://github.com/tuckn/WshNet)
- [tuckn/WshModeJs](https://github.com/tuckn/WshModeJs)

### Basic Apps

- [tuckn/WshCommander](https://github.com/tuckn/WshCommander)
- [tuckn/WshConfigStore](https://github.com/tuckn/WshConfigStore)
- [tuckn/WshDotEnv](https://github.com/tuckn/WshDotEnv)
- [tuckn/WshLogger](https://github.com/tuckn/WshLogger)

## Documentation

See all specifications [here](https://docs.tuckn.net/WshBasicPackage) and also below.

- [WshPolyfill](https://docs.tuckn.net/WshPolyfill)
- [WshUtil](https://docs.tuckn.net/WshUtil)
- [WshPath](https://docs.tuckn.net/WshPath)
- [WshOS](https://docs.tuckn.net/WshOS)
- [WshFileSystem](https://docs.tuckn.net/WshFileSystem)
- [WshProcess](https://docs.tuckn.net/WshProcess)
- [WshChildProcess](https://docs.tuckn.net/WshChildProcess)
- [WshNet](https://docs.tuckn.net/WshNet)
- [WshModeJs](https://docs.tuckn.net/WshModeJs)
- [WshCommander](https://docs.tuckn.net/WshCommander)
- [WshConfigStore](https://docs.tuckn.net/WshConfigStore)
- [WshDotEnv](https://docs.tuckn.net/WshDotEnv)
- [WshLogger](https://docs.tuckn.net/WshLogger)

## License

MIT

Copyright (c) 2020 [Tuckn](https://github.com/tuckn)
