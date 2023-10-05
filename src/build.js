import { resolve } from "node:path";
import { platform as PLATFORM } from "node:process";
import {
  cp,
  copyFile,
  rename,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";

import compressing from "compressing";
import rcedit from "rcedit";
import plist from "plist";

import { log } from "./log.js";

/**
 * References:
 * https://specifications.freedesktop.org/desktop-entry-spec/desktop-entry-spec-latest.html
 *
 * @typedef  {object}   LinuxRc               Linux configuration options
 * @property {string}   name                  Name of the application
 * @property {string}   genericName           Generic name of the application
 * @property {boolean}  noDisplay             If true the application is not displayed
 * @property {string}   comment               Tooltip for the entry, for example "View sites on the Internet".
 * @property {string}   icon                  Icon to display in file manager, menus, etc.
 * @property {boolean}  hidden                TBD
 * @property {string[]} onlyShowIn            A list of strings identifying the desktop environments that should (/not) display a given desktop entry
 * @property {string[]} notShowIn             A list of strings identifying the desktop environments that should (/not) display a given desktop entry
 * @property {boolean}  dBusActivatable       A boolean value specifying if D-Bus activation is supported for this application
 * @property {string}   tryExec               Path to an executable file on disk used to determine if the program is actually installed
 * @property {string}   exec                  Program to execute, possibly with arguments.
 * @property {string}   path                  If entry is of type Application, the working directory to run the program in.
 * @property {boolean}  terminal              Whether the program runs in a terminal window.
 * @property {string[]} actions               Identifiers for application actions.
 * @property {string[]} mimeType              The MIME type(s) supported by this application.
 * @property {string[]} categories            Categories in which the entry should be shown in a menu
 * @property {string[]} implements            A list of interfaces that this application implements.
 * @property {string[]} keywords              A list of strings which may be used in addition to other metadata to describe this entry.
 * @property {boolean}  startupNotify         If true, it is KNOWN that the application will send a "remove" message when started with the DESKTOP_STARTUP_ID environment variable set. If false, it is KNOWN that the application does not work with startup notification at all.
 * @property {string}   startupWMClass        If specified, it is known that the application will map at least one window with the given string as its WM class or WM name hin
 * @property {boolean}  prefersNonDefaultGPU  If true, the application prefers to be run on a more powerful discrete GPU if available.
 * @property {string}   singleMainWindow      If true, the application has a single main window, and does not support having an additional one opened.
 */

/**
 * References:
 * https://developer.apple.com/documentation/bundleresources/information_property_list
 *
 * @typedef  {object} OsxRc                       OSX resource configuration options
 * @property {string} name                        The name of the application
 * @property {string} icon                        The path to the icon file. It should be a .icns file.
 * @property {string} LSApplicationCategoryType   The category that best describes your app for the App Store.
 * @property {string} CFBundleIdentifier          A unique identifier for a bundle usually in reverse DNS format.
 * @property {string} CFBundleName                A user-visible short name for the bundle.
 * @property {string} CFBundleDisplayName         The user-visible name for the bundle.
 * @property {string} CFBundleSpokenName          A replacement for the app name in text-to-speech operations.
 * @property {string} CFBundleVersion             The version of the build that identifies an iteration of the bundle.
 * @property {string} CFBundleShortVersionString  The release or version number of the bundle.
 * @property {string} NSHumanReadableCopyright    A human-readable copyright notice for the bundle.
 */

/**
 * References:
 * https://learn.microsoft.com/en-us/windows/win32/msi/version
 * https://learn.microsoft.com/en-gb/windows/win32/sbscs/application-manifests
 * https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-studio-2015/deployment/trustinfo-element-clickonce-application?view=vs-2015#requestedexecutionlevel
 * https://learn.microsoft.com/en-gb/windows/win32/menurc/versioninfo-resource
 *
 * @typedef {object} WinRc              Windows configuration options. More info
 * @property {string} name              The name of the application
 * @property {string} version           The version of the application
 * @property {string} comments          Additional information that should be displayed for diagnostic purposes.
 * @property {string} company           Company that produced the file—for example, Microsoft Corporation or Standard Microsystems Corporation, Inc. This string is required.
 * @property {string} fileDescription   File description to be presented to users. This string may be displayed in a list box when the user is choosing files to install. For example, Keyboard Driver for AT-Style Keyboards. This string is required.
 * @property {string} fileVersion       Version number of the file. For example, 3.10 or 5.00.RC2. This string is required.
 * @property {string} icon              The path to the icon file. It should be a .ico file.
 * @property {string} internalName      Internal name of the file, if one exists—for example, a module name if the file is a dynamic-link library. If the file has no internal name, this string should be the original filename, without extension. This string is required.
 * @property {string} legalCopyright    Copyright notices that apply to the file. This should include the full text of all notices, legal symbols, copyright dates, and so on. This string is optional.
 * @property {string} legalTrademark    Trademarks and registered trademarks that apply to the file. This should include the full text of all notices, legal symbols, trademark numbers, and so on. This string is optional.
 * @property {string} originalFilename  Original name of the file, not including a path. This information enables an application to determine whether a file has been renamed by a user. The format of the name depends on the file system for which the file was created. This string is required.
 * @property {string} privateBuild      Information about a private version of the file—for example, Built by TESTER1 on \\TESTBED. This string should be present only if VS_FF_PRIVATEBUILD is specified in the fileflags parameter of the root block.
 * @property {string} productName       Name of the product with which the file is distributed. This string is required.
 * @property {string} productVersion    Version of the product with which the file is distributed—for example, 3.10 or 5.00.RC2. This string is required.
 * @property {string} specialBuild      Text that specifies how this version of the file differs from the standard version—for example, Private build for TESTER1 solving mouse problems on M250 and M250E computers. This string should be present only if VS_FF_SPECIALBUILD is specified in the fileflags parameter of the root block.
 */

/**
 * Generate NW build artifacts
 *
 * Note: File permissions are incorrectly set for Linux or MacOS apps built on Windows platform. For more info: https://www.geeksforgeeks.org/node-js-fs-chmod-method
 *
 * Note: To edit Windows executable resources, we use [`rcedit`](https://github.com/electron/node-rcedit). To use rcedit on non-Windows platforms, you will have to install [Wine](https://www.winehq.org/).
 *
 * Note: We recursively glob the file patterns given by the user. The first `package.json` parsed is taken to be the NW.js manifest file. If you have multiple manifest files, the first glob pattern should be the path to the NW.js manifest. Choosing a Node manifest at `./package.json` is the most convenient option.
 *
 * Note: If you are using the MacOS ARM unofficial builds, you will need to [remove the `com.apple.qurantine` flag](https://github.com/corwin-of-amber/nw.js/releases/tag/nw-v0.75.0):
 *
 * `sudo xattr -r -d com.apple.quarantine nwjs.app`
 *
 * @example
 * // Minimal Usage (uses default values)
 * nwbuild({
 *   mode: "build",
 * });
 *
 * @param  {string | string[]}       files     Array of NW app files
 * @param  {string}                  nwDir     Directory to hold NW binaries
 * @param  {string}                  outDir    Directory to store build artifacts
 * @param  {"linux" | "osx" | "win"} platform  Platform is the operating system type
 * @param  {"zip" | boolean}         zip       Specify if the build artifacts are to be zipped
 * @param  {LinuxRc | OsxRc | WinRc} app       Multi platform configuration options
 * @return {Promise<undefined>}
 */
export async function build(files, nwDir, outDir, platform, zip, app) {
  log.debug(`Remove any files at ${outDir} directory`);
  await rm(outDir, { force: true, recursive: true });
  log.debug(`Copy ${nwDir} files to ${outDir} directory`);
  await cp(nwDir, outDir, { recursive: true, verbatimSymlinks: true });

  log.debug(`Copy files in srcDir to ${outDir} directory`);

  if (typeof files === "string") {
    await cp(
      files,
      resolve(
        outDir,
        platform !== "osx"
          ? "package.nw"
          : "nwjs.app/Contents/Resources/app.nw",
      ),
      { recursive: true, verbatimSymlinks: true },
    );
  } else {
    for (let file of files) {
      log.debug(`Copy ${file} file to ${outDir} directory`);
      await cp(
        file,
        resolve(
          outDir,
          platform !== "osx"
            ? "package.nw"
            : "nwjs.app/Contents/Resources/app.nw",
          file,
        ),
        { recursive: true, verbatimSymlinks: true },
      );
    }
  }

  log.debug(`Starting platform specific config steps for ${platform}`);

  if (platform === "linux") {
    if (PLATFORM === "win32") {
      log.warn(
        "Linux apps built on Windows platform do not preserve all file permissions. See #716",
      );
    }
    let desktopEntryFile = {
      Type: "Application",
      Version: "1.5",
      Name: app.name,
      GenericName: app.genericName,
      NoDisplay: app.noDisplay,
      Comment: app.comment,
      Icon: app.icon,
      Hidden: app.hidden,
      OnlyShowIn: app.onlyShowIn,
      NotShowIn: app.notShowIn,
      DBusActivatable: app.dBusActivatable,
      TryExec: app.tryExec,
      Exec: app.name,
      Path: app.path,
      Terminal: app.terminal,
      Actions: app.actions,
      MimeType: app.mimeType,
      Categories: app.categories,
      Implements: app.implements,
      Keywords: app.keywords,
      StartupNotify: app.startupNotify,
      StartupWMClass: app.startupWMClass,
      PrefersNonDefaultGPU: app.prefersNonDefaultGPU,
      SingleMainWindow: app.singleMainWindow,
    };

    await rename(`${outDir}/nw`, `${outDir}/${app.name}`);

    let fileContent = `[Desktop Entry]\n`;
    Object.keys(desktopEntryFile).forEach((key) => {
      if (desktopEntryFile[key] !== undefined) {
        fileContent += `${key}=${desktopEntryFile[key]}\n`;
        log.debug(`Add ${key}=${desktopEntryFile[key]} to Desktop Entry File`);
      }
    });
    let filePath = `${outDir}/${app.name}.desktop`;
    await writeFile(filePath, fileContent);
    log.debug("Desktop Entry file generated");
  } else if (platform === "win") {
    let versionString = {
      Comments: app.comments,
      CompanyName: app.author,
      FileDescription: app.fileDescription,
      FileVersion: app.fileVersion,
      InternalName: app.name,
      LegalCopyright: app.legalCopyright,
      LegalTrademarks: app.legalTrademark,
      OriginalFilename: app.name,
      PrivateBuild: app.name,
      ProductName: app.name,
      ProductVersion: app.version,
      SpecialBuild: app.name,
    };

    Object.keys(versionString).forEach((option) => {
      if (versionString[option] === undefined) {
        delete versionString[option];
      }
    });

    // TODO: Add support for more options as specified in rcedit v4 docs.
    const rcEditOptions = {
      "file-version": app.version,
      "product-version": app.version,
      "version-string": versionString,
    };

    if (app.icon) {
      rcEditOptions.icon = app.icon;
    }

    try {
      const outDirAppExe = resolve(outDir, `${app.name}.exe`);
      await rename(resolve(outDir, "nw.exe"), outDirAppExe);
      await rcedit(outDirAppExe, rcEditOptions);
    } catch (error) {
      log.warn(
        "Renaming EXE failed or unable to modify EXE. If it's the latter, ensure WINE is installed or build your application Windows platform",
      );
      log.error(error);
    }
  } else if (platform === "osx") {
    if (PLATFORM === "win32") {
      log.warn(
        "MacOS apps built on Windows platform do not preserve all file permissions. See #716",
      );
    }

    // TODO: do not rely on symlinks - use actual file paths.

    try {
      // Rename nwjs.app executable to ${options.app.name}.app
      await rename(
        resolve(outDir, "nwjs.app"),
        resolve(outDir, `${app.name}.app`),
      );

      // Rename Contents/MacOS/nwjs to Contents/MacOS/${options.app.name}
      await rename(
        resolve(outDir, `${app.name}.app`, "Contents", "MacOS", "nwjs"),
        resolve(outDir, `${app.name}.app`, "Contents", "MacOS", app.name),
      );

      // Rename main Helper app
      await rename(
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper.app",
          "Contents",
          "MacOS",
          "nwjs Helper",
        ),
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper.app",
          "Contents",
          "MacOS",
          `${app.name} Helper`,
        ),
      );

      // Rename Alerts Helper app
      await rename(
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper (Alerts).app",
          "Contents",
          "MacOS",
          "nwjs Helper (Alerts)",
        ),
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper (Alerts).app",
          "Contents",
          "MacOS",
          `${app.name} Helper (Alerts)`,
        ),
      );

      // Rename GPU Helper app
      await rename(
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper (GPU).app",
          "Contents",
          "MacOS",
          "nwjs Helper (GPU)",
        ),
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper (GPU).app",
          "Contents",
          "MacOS",
          `${app.name} Helper (GPU)`,
        ),
      );

      // Rename Plugin Helper app
      await rename(
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper (Plugin).app",
          "Contents",
          "MacOS",
          "nwjs Helper (Plugin)",
        ),
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper (Plugin).app",
          "Contents",
          "MacOS",
          `${app.name} Helper (Plugin)`,
        ),
      );

      // Rename Renderer Helper app
      await rename(
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper (Renderer).app",
          "Contents",
          "MacOS",
          "nwjs Helper (Renderer)",
        ),
        resolve(
          outDir,
          `${app.name}.app`,
          "Contents",
          "Frameworks",
          "nwjs Framework.framework",
          "Helpers",
          "nwjs Helper (Renderer).app",
          "Contents",
          "MacOS",
          `${app.name} Helper (Renderer)`,
        ),
      );

      // Overwrite's nwjs default icon with user specified icon
      if (app.icon !== undefined) {
        await copyFile(
          resolve(app.icon),
          resolve(
            outDir,
            `${app.name}.app`,
            "Contents",
            "Resources",
            "app.icns",
          ),
        );
      }

      let infoPlist = {
        main: {
          path: "",
          json: {},
        },
        // TODO: update localised string values based on language requirements
        strings: {
          path: "",
          list: [],
        },
        helper_main: {
          path: "",
          json: {},
        },
        helper_Alerts: {
          path: "",
          json: {},
        },
        helper_GPU: {
          path: "",
          json: {},
        },
        helper_Plugin: {
          path: "",
          json: {},
        },
        helper_Renderer: {
          path: "",
          json: {},
        },
      };

      // Main Info.plist: read plist data into memory
      infoPlist.main.path = resolve(
        outDir,
        `${app.name}.app`,
        "Contents",
        "Info.plist",
      );
      infoPlist.main.json = plist.parse(
        await readFile(infoPlist.main.path, "utf-8"),
      );

      // Main Info.plist: update plist data
      infoPlist.main.json.LSApplicationCategoryType =
        app.LSApplicationCategoryType;
      infoPlist.main.json.CFBundleIdentifier = app.CFBundleIdentifier;
      infoPlist.main.json.CFBundleName = app.CFBundleName;
      infoPlist.main.json.CFBundleDisplayName = app.CFBundleDisplayName;
      infoPlist.main.json.CFBundleSpokenName = app.CFBundleSpokenName;
      infoPlist.main.json.CFBundleVersion = app.CFBundleVersion;
      infoPlist.main.json.CFBundleShortVersionString =
        app.CFBundleShortVersionString;
      infoPlist.main.json.CFBundleExecutable = app.name;

      // Main Info.plist: write updated plist data back to file
      await writeFile(infoPlist.main.path, plist.build(infoPlist.main.json));

      // InfoPlist.strings: read file into memory
      infoPlist.strings.path = resolve(
        outDir,
        `${app.name}.app`,
        "Contents",
        "Resources",
        "en.lproj",
        "InfoPlist.strings",
      );
      infoPlist.strings.list = (
        await readFile(infoPlist.strings.path, "utf-8")
      ).split("\n");

      // InfoPlist.strings: update localised InfoPlist.strings
      infoPlist.strings.list.forEach((line, idx, arr) => {
        if (line.includes("NSHumanReadableCopyright")) {
          arr[
            idx
          ] = `NSHumanReadableCopyright = "${app.NSHumanReadableCopyright}";`;
        }
      });

      // InfoPlist.strings: write updated localised InfoPlist.strings back to file
      await writeFile(
        infoPlist.strings.path,
        infoPlist.strings.list.toString().replace(/,/g, "\n"),
      );

      // Main Helper app: read file into memory
      infoPlist.helper_main.path = resolve(
        outDir,
        `${app.name}.app`,
        "Contents",
        "Frameworks",
        "nwjs Framework.framework",
        "Helpers",
        "nwjs Helper.app",
        "Contents",
        "Info.plist",
      );
      infoPlist.helper_main.json = plist.parse(
        await readFile(infoPlist.helper_main.path, "utf-8"),
      );

      // Main Helper app: update plist data
      infoPlist.helper_main.json.CFBundleDisplayName = `${app.CFBundleDisplayName} Helper`;
      infoPlist.helper_main.json.CFBundleExecutable = `${app.name} Helper`;
      infoPlist.helper_main.json.CFBundleIdentifier = `${app.CFBundleIdentifier}.helper`;
      infoPlist.helper_main.json.CFBundleName = `${app.name} Helper`;
      infoPlist.helper_main.json.CFBundleShortVersionString =
        app.CFBundleShortVersionString;

      // Main Helper app: write updated plist data back to file
      await writeFile(
        infoPlist.helper_main.path,
        plist.build(infoPlist.helper_main.json),
      );

      // Alerts Helper app: read file into memory
      infoPlist.helper_Alerts.path = resolve(
        outDir,
        `${app.name}.app`,
        "Contents",
        "Frameworks",
        "nwjs Framework.framework",
        "Helpers",
        "nwjs Helper (Alerts).app",
        "Contents",
        "Info.plist",
      );
      infoPlist.helper_Alerts.json = plist.parse(
        await readFile(infoPlist.helper_Alerts.path, "utf-8"),
      );

      // Alerts Helper app: update plist data
      infoPlist.helper_Alerts.json.CFBundleDisplayName = `${app.CFBundleDisplayName} Helper (Alerts)`;
      infoPlist.helper_Alerts.json.CFBundleExecutable = `${app.name} Helper (Alerts)`;
      infoPlist.helper_Alerts.json.CFBundleIdentifier = `${app.CFBundleIdentifier}.helper.Alerts`;
      infoPlist.helper_Alerts.json.CFBundleName = `${app.name} Helper (Alerts)`;
      infoPlist.helper_Alerts.json.CFBundleShortVersionString =
        app.CFBundleShortVersionString;

      // Alerts Helper app: write updated plist data back to file
      await writeFile(
        infoPlist.helper_Alerts.path,
        plist.build(infoPlist.helper_Alerts.json),
      );

      // GPU Helper app: read file into memory
      infoPlist.helper_GPU.path = resolve(
        outDir,
        `${app.name}.app`,
        "Contents",
        "Frameworks",
        "nwjs Framework.framework",
        "Helpers",
        "nwjs Helper (GPU).app",
        "Contents",
        "Info.plist",
      );
      infoPlist.helper_GPU.json = plist.parse(
        await readFile(infoPlist.helper_GPU.path, "utf-8"),
      );

      // GPU Helper app: update plist data
      infoPlist.helper_GPU.json.CFBundleDisplayName = `${app.CFBundleDisplayName} Helper (GPU)`;
      infoPlist.helper_GPU.json.CFBundleExecutable = `${app.name} Helper (GPU)`;
      infoPlist.helper_GPU.json.CFBundleIdentifier = `${app.CFBundleIdentifier}.helper.GPU`;
      infoPlist.helper_GPU.json.CFBundleName = `${app.name} Helper (GPU)`;
      infoPlist.helper_GPU.json.CFBundleShortVersionString =
        app.CFBundleShortVersionString;

      // GPU Helper app: write updated plist data back to file
      await writeFile(
        infoPlist.helper_GPU.path,
        plist.build(infoPlist.helper_GPU.json),
      );

      // Plugin Helper app: read file into memory
      infoPlist.helper_Plugin.path = resolve(
        outDir,
        `${app.name}.app`,
        "Contents",
        "Frameworks",
        "nwjs Framework.framework",
        "Helpers",
        "nwjs Helper (Plugin).app",
        "Contents",
        "Info.plist",
      );
      infoPlist.helper_Plugin.json = plist.parse(
        await readFile(infoPlist.helper_Plugin.path, "utf-8"),
      );

      // Plugin Helper app: update plist data
      infoPlist.helper_Plugin.json.CFBundleDisplayName = `${app.CFBundleDisplayName} Helper (Plugin)`;
      infoPlist.helper_Plugin.json.CFBundleExecutable = `${app.name} Helper (Plugin)`;
      infoPlist.helper_Plugin.json.CFBundleIdentifier = `${app.CFBundleIdentifier}.helper.Plugin`;
      infoPlist.helper_Plugin.json.CFBundleName = `${app.name} Helper (Plugin)`;
      infoPlist.helper_Plugin.json.CFBundleShortVersionString =
        app.CFBundleShortVersionString;

      // Plugin Helper app: write updated plist data back to file
      await writeFile(
        infoPlist.helper_Plugin.path,
        plist.build(infoPlist.helper_Plugin.json),
      );

      // Renderer Helper app: read file into memory
      infoPlist.helper_Renderer.path = resolve(
        outDir,
        `${app.name}.app`,
        "Contents",
        "Frameworks",
        "nwjs Framework.framework",
        "Helpers",
        "nwjs Helper (Renderer).app",
        "Contents",
        "Info.plist",
      );
      infoPlist.helper_Renderer.json = plist.parse(
        await readFile(infoPlist.helper_Renderer.path, "utf-8"),
      );

      // Renderer Helper app: update plist data
      infoPlist.helper_Renderer.json.CFBundleDisplayName = `${app.CFBundleDisplayName} Helper (Renderer)`;
      infoPlist.helper_Renderer.json.CFBundleExecutable = `${app.name} Helper (Renderer)`;
      infoPlist.helper_Renderer.json.CFBundleIdentifier = `${app.CFBundleIdentifier}.helper.Renderer`;
      infoPlist.helper_Renderer.json.CFBundleName = `${app.name} Helper (Renderer)`;
      infoPlist.helper_Renderer.json.CFBundleShortVersionString =
        app.CFBundleShortVersionString;

      // Renderer Helper app: write updated plist data back to file
      await writeFile(
        infoPlist.helper_Renderer.path,
        plist.build(infoPlist.helper_Renderer.json),
      );
    } catch (error) {
      log.error(error);
    }
  }

  if (zip !== false) {
    if (zip === true || zip === "zip") {
      await compressing.zip.compressDir(outDir, `${outDir}.zip`);
    } else if (zip === "tar") {
      await compressing.tar.compressDir(outDir, `${outDir}.tar`);
    } else if (zip === "tgz") {
      await compressing.tgz.compressDir(outDir, `${outDir}.tgz`);
    }

    await rm(outDir, { recursive: true, force: true });
  }
}
