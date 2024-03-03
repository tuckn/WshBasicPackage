# WshBasicPackage

The package to accelerate development on WSH (Windows Script Host). Works in a pure Windows environment.

[Presentation PDF](https://tuckn.net/assets/20240302T131713JST_promoteWshModeJs-en_pub.pdf)

## Operating environment

Works on JScript in Windows.

## Installation

(1) Create a directory of your WSH project.

```console
D:\> mkdir MyWshProject
D:\> cd MyWshProject
```

(2) Download this ZIP and unzip or Use the following `git` command.

```console
> git clone https://github.com/tuckn/WshBasicPackage.git ./WshModules/WshBasicPackage
or
> git submodule add https://github.com/tuckn/WshBasicPackage.git ./WshModules/WshBasicPackage
```

(3) Create your JScript (.js) file. For Example,

```console
D:\MyWshProject\
├─ MyScript.js <- Your JScript code will be written in this.
└─ WshModules\
    └─ WshBasicPackage\
        └─ dist\
          └─ bundle.js
```

I recommend JScript (.js) file encoding to be UTF-8 [BOM, CRLF].

(4) Create your WSF packaging scripts file (.wsf).

```console
D:\MyWshProject\
├─ Run.wsf <- WSH entry file
├─ MyScript.js
└─ WshModules\
    └─ WshBasicPackage\
        └─ dist\
          └─ bundle.js
```

And you should include _.../dist/bundle.js_ into the WSF file.
For Example, The content of the above _Run.wsf_ is

```xml
<package>
  <job id = "run">
    <script language="JScript" src="./WshModules/WshBasicPackage/dist/bundle.js"></script>
    <script language="JScript" src="./MyScript.js"></script>
  </job>
</package>
```

I recommend this WSH file (.wsf) encoding to be UTF-8 [BOM, CRLF].

Awesome! This WSH configuration allows you to use the following functions in JScript (_.\\MyScript.js_).

## Usage

Now,  your JScript can use many helper functions that are defined in the following modules.

### Core Modules

- [tuckn/WshPolyfill](https://github.com/tuckn/WshPolyfill/)
- [tuckn/WshUtil](https://github.com/tuckn/WshUtil/)
- [tuckn/WshPath](https://github.com/tuckn/WshPath/)
- [tuckn/WshOS](https://github.com/tuckn/WshOS/)
- [tuckn/WshFileSystem](https://github.com/tuckn/WshFileSystem/)
- [tuckn/WshProcess](https://github.com/tuckn/WshProcess/)
- [tuckn/WshChildProcess](https://github.com/tuckn/WshChildProcess/)
- [tuckn/WshNet](https://github.com/tuckn/WshNet/)
- [tuckn/WshModeJs](https://github.com/tuckn/WshModeJs/)

### Basic Apps

- [tuckn/WshCommander](https://github.com/tuckn/WshCommander/)
- [tuckn/WshConfigStore](https://github.com/tuckn/WshConfigStore/)
- [tuckn/WshDotEnv](https://github.com/tuckn/WshDotEnv/)
- [tuckn/WshLogger](https://github.com/tuckn/WshLogger/)

## Documentation

See all specifications [here](https://tuckn.net/docs/WshBasicPackage/) and also below.

- [WshPolyfill](https://tuckn.net/docs/WshPolyfill/)
- [WshUtil](https://tuckn.net/docs/WshUtil/)
- [WshPath](https://tuckn.net/docs/WshPath/)
- [WshOS](https://tuckn.net/docs/WshOS/)
- [WshFileSystem](https://tuckn.net/docs/WshFileSystem/)
- [WshProcess](https://tuckn.net/docs/WshProcess/)
- [WshChildProcess](https://tuckn.net/docs/WshChildProcess/)
- [WshNet](https://tuckn.net/docs/WshNet/)
- [WshModeJs](https://tuckn.net/docs/WshModeJs/)
- [WshCommander](https://tuckn.net/docs/WshCommander/)
- [WshConfigStore](https://tuckn.net/docs/WshConfigStore/)
- [WshDotEnv](https://tuckn.net/docs/WshDotEnv/)
- [WshLogger](https://tuckn.net/docs/WshLogger/)

## License

MIT

Copyright (c) 2020 [Tuckn](https://github.com/tuckn)
