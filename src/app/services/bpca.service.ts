import { Injectable } from '@angular/core';
import { ColorUtilService } from './color-util.service';

@Injectable({
  providedIn: 'root',
})
export class BpcaService {
  // Following Code is copied with some modification from [Bridge-PCA algo](https://github.com/Myndex/bridge-pca/blob/master/src/bridge-pca.js)
  // Attempts to use bpca module as-is has failed because of some issue with colorparsely dependency

  bridgeRatio(
    contrastLc = 0,
    txtY: number,
    bgY: number,
    ratioStr = ' to 1',
    places = 1
  ) {
    // Takes the output of APCA (either a string or number)
    // and makes it a WCAG2 ratio, returning a string '4.5 to 1'
    // Jan 16 2022 constants

    let maxY = Math.max(txtY, bgY);

    const offsetA = 0.2693;
    const preScale = -0.0561;
    const powerShift = 4.537;

    const mainFactor = 1.113946;

    const loThresh = 0.3;
    const loExp = 0.48;
    const preEmph = 0.42;
    const postDe = 0.6594;

    const hiTrim = 0.0785;
    const loTrim = 0.0815;
    const trimThresh = 0.506; // #c0c0c0

    let addTrim = loTrim + hiTrim;

    if (maxY > trimThresh) {
      let adjFact = (1.0 - maxY) / (1.0 - trimThresh);
      addTrim = loTrim * adjFact + hiTrim;
    }

    contrastLc = Math.max(0, Math.abs(contrastLc * 0.01));
    // contrastLc = Math.max(0, Math.abs(parseFloat(contrastLc) * 0.01));

    // convert Lc into a WCAG ratio
    let wcagContrast =
      (Math.pow(contrastLc + preScale, powerShift) + offsetA) *
        mainFactor *
        contrastLc +
      addTrim;

    // adjust WCAG ratios that are under  3 : 1, clean up near 0.
    wcagContrast =
      wcagContrast > loThresh
        ? 10.0 * wcagContrast
        : contrastLc < 0.06
        ? 0
        : 10.0 * wcagContrast -
          (Math.pow(loThresh - wcagContrast + preEmph, loExp) - postDe);

    return wcagContrast.toFixed(places) + ratioStr; // + '<br>trim:' + addTrim;
  }

  BPCAcontrast(txtY: number, bgY: number, places = -1) {
    // send linear Y (luminance) for text and background.
    // txtY and bgY must be between 0.0-1.0
    // IMPORTANT: Do not swap, polarity is important.

    const icp = [0.0, 1.1]; // input range clamp / input error check

    if (
      isNaN(txtY) ||
      isNaN(bgY) ||
      Math.min(txtY, bgY) < icp[0] ||
      Math.max(txtY, bgY) > icp[1]
    ) {
      return 0; // return zero on error
      // return 'error'; // optional string return for error
    }

    //////////   BPCA 0.1.6 G - 4g Constants   ///////////////////////

    const normBG = 0.56,
      normTXT = 0.57,
      revTXT = 0.62,
      revBG = 0.65; // G-4g constants for use with 2.4 exponent

    const blkThrs = 0.022,
      blkClmp = 1.414,
      scaleBoW = 1.14,
      scaleWoB = 1.14,
      loBoWoffset = 0.027,
      loWoBoffset = 0.027,
      bridgeWoBfact = 0.1414,
      bridgeWoBpivot = 0.84,
      loClip = 0.1,
      deltaYmin = 0.0005;

    //////////   SAPC LOCAL VARS   /////////////////////////////////////////

    let SAPC = 0.0; // For raw SAPC values
    let outputContrast = 0.0; // For weighted final values
    let polCat = 'BoW'; // Polarity Indicator. N normal R reverse

    // TUTORIAL

    // Use Y for text and BG, and soft clamp black,
    // return 0 for very close luminances, determine
    // polarity, and calculate SAPC raw contrast
    // Then scale for easy to remember levels.

    // Note that reverse contrast (white text on black)
    // intentionally returns a negative number
    // Proper polarity is important!

    //////////   BLACK SOFT CLAMP   ////////////////////////////////////////

    // Soft clamps Y for either color if it is near black.
    txtY = txtY > blkThrs ? txtY : txtY + Math.pow(blkThrs - txtY, blkClmp);
    bgY = bgY > blkThrs ? bgY : bgY + Math.pow(blkThrs - bgY, blkClmp);

    ///// Return 0 Early for extremely low ∆Y
    if (Math.abs(bgY - txtY) < deltaYmin) {
      return 0.0;
    }

    //////////   Bridge-PCA/SAPC CONTRAST - LOW CLIP (W3 LICENSE)  ///////////////

    if (bgY > txtY) {
      // For normal polarity, black text on white (BoW)

      // Calculate the SAPC contrast value and scale

      SAPC = (Math.pow(bgY, normBG) - Math.pow(txtY, normTXT)) * scaleBoW;

      // Low Clip to prevent polarity reversal
      outputContrast = SAPC < loClip ? 0.0 : SAPC - loBoWoffset;
    } else {
      // For reverse polarity, light text on dark (WoB)
      // WoB should always return either negative value.
      // OR the output will have R appended as string '23R'
      // OR WoB '23 BoW' toolmaker choice so long as explained
      polCat = 'WoB';

      SAPC = (Math.pow(bgY, revBG) - Math.pow(txtY, revTXT)) * scaleWoB;

      // this is a special offset to align with incorrect WCAG_2 math.
      let bridge = Math.max(0, txtY / bridgeWoBpivot - 1.0) * bridgeWoBfact;

      // console.log(bridge + ' txtY ' + txtY + ' SAPC ' + SAPC);

      outputContrast = SAPC > -loClip ? 0.0 : SAPC + loWoBoffset + bridge;
    }

    // return Lc (lightness contrast) as a signed numeric value
    // Round to the nearest whole number is optional.
    // Rounded can be a signed INT as output will be within ± 127
    // places = -1 returns signed float, 0 returns rounded as string

    if (places < 0) {
      return outputContrast * 100.0;
    } else if (places == 0) {
      return (
        Math.round(Math.abs(outputContrast) * 100.0) +
        '<sub>' +
        polCat +
        '</sub>'
      );
    } else if (Number.isInteger(places)) {
      return (outputContrast * 100.0).toFixed(places);
    } else {
      throw 'Err-3';
    }
  } // End BPCAcontrast()

  sRGBtoY(rgba = [0, 0, 0]) {
    // send sRGB 8bpc (0xFFFFFF) or string

    /////   Bridge-PCA 0.1.6 G - 4g - W3 Constants   ////////////////////////

    const mainTRC = 2.4; // 2.4 exponent emulates actual monitor perception

    const sRco = 0.212647813391364,
      sGco = 0.715179147533615,
      sBco = 0.0721730390750208; // sRGB coefficients

    // Derived from:
    // xW	yW	K	xR	yR	xG	yG	xB	yB
    // 0.312720	0.329030	6504	0.640	0.330	0.300	0.600	0.150	0.060

    // linearize r, g, or b then apply coefficients
    // and sum then return the resulting luminance

    function simpleExp(chan: number) {
      return Math.pow(chan / 255.0, mainTRC);
    }

    return (
      sRco * simpleExp(rgba[0]) +
      sGco * simpleExp(rgba[1]) +
      sBco * simpleExp(rgba[2])
    );
  } // End sRGBtoY()

  alphaBlend(rgbaFG = [0, 0, 0, 1.0], rgbBG = [0, 0, 0], isInt = true) {
    if (rgbaFG[3]) {
      rgbaFG[3] = Math.max(Math.min(rgbaFG[3], 1.0), 0.0); // clamp alpha
      let compBlend = 1.0 - rgbaFG[3];
      let rgbOut = [0, 0, 0]; // or just use rgbBG to retain other elements?

      for (let i = 0; i < 3; i++) {
        rgbOut[i] = rgbBG[i] * compBlend + rgbaFG[i] * rgbaFG[3];
        if (isInt) rgbOut[i] = Math.min(Math.round(rgbOut[i]), 255);
      }

      return rgbOut;
    } else {
      return rgbaFG;
    }
  } // End alphaBlend()

  calcBPCA(textColor: string, bgColor: string, places = -1, isInt = true) {
    // Note that this function required colorParsley !!
    // let txClr = colorParsley(textColor);
    // let bgClr = colorParsley(bgColor);
    let txClr = this.cus.getRgb255Array(textColor) as number[];
    let bgClr = this.cus.getRgb255Array(bgColor) as number[];

    // let hasAlpha = txClr[3] != '' && txClr[3] < 1 ? true : false;

    // if (hasAlpha) {
    // txClr = this.alphaBlend(txClr, bgClr, isInt);
    // }

    return this.BPCAcontrast(this.sRGBtoY(txClr), this.sRGBtoY(bgClr), places);
  } // End calcBPCA()

  constructor(private cus: ColorUtilService) {}
}
