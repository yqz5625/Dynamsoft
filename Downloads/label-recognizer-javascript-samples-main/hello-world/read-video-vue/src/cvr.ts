import "dynamsoft-license";
import "dynamsoft-capture-vision-router";
import "dynamsoft-label-recognizer";

import { CoreModule } from "dynamsoft-core";
import { LicenseManager } from "dynamsoft-license";

/** LICENSE ALERT - README
 * To use the library, you need to first specify a license key using the API "initLicense()" as shown below.
 */

LicenseManager.initLicense("DLS2eyJoYW5kc2hha2VDb2RlIjoiMzIyOTAxLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21kbHMuZHluYW1zb2Z0b25saW5lLmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMzIyOTAxIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2Rscy5keW5hbXNvZnRvbmxpbmUuY29tIiwiY2hlY2tDb2RlIjo0NzgzMDgxOH0=");

/**
 * You can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dbr&package=js to get your own trial license good for 30 days.
 * Note that if you downloaded this sample from Dynamsoft while logged in, the above license key may already be your own 30-day trial license.
 * For more information, see https://www.dynamsoft.com/barcode-reader/programming/javascript/user-guide/?ver=9.6.20&utm_source=github#specify-the-license or contact support@dynamsoft.com.
 * LICENSE ALERT - THE END
 */

CoreModule.engineResourcePaths = {
  std: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-std@1.0.0/dist/",
  dip: "https://cdn.jsdelivr.net/npm/dynamsoft-image-processing@2.0.30/dist/",
  core: "https://cdn.jsdelivr.net/npm/dynamsoft-core@3.0.32/dist/",
  license: "https://cdn.jsdelivr.net/npm/dynamsoft-license@3.2.10/dist/",
  cvr: "https://cdn.jsdelivr.net/npm/dynamsoft-capture-vision-router@2.0.32/dist/",
  dlr: "https://cdn.jsdelivr.net/npm/dynamsoft-label-recognizer@3.0.30/dist/",
  dce: "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@4.0.1/dist/",
  dcm: "https://cdn.jsdelivr.net/npm/dynamsoft-label-recognizer-data@1.0.0/dist/"
};

// Preload "LabelRecogznier" module for recognizing text. It will save time on the initial recognizing by skipping the module loading.
CoreModule.loadWasm(["DLR"]).catch((ex) => {
  let errMsg = ex.message || ex;
  console.error(errMsg);
  alert(errMsg);
});
