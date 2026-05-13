import type { ColorUtilService } from './color-util.service';

export class BpcaService {
  constructor(private cus: ColorUtilService) {}

  bridgeRatio(contrastLc = 0, txtY: number, bgY: number, ratioStr = ' to 1', places = 1) {
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
    const trimThresh = 0.506;

    let addTrim = loTrim + hiTrim;

    if (maxY > trimThresh) {
      let adjFact = (1.0 - maxY) / (1.0 - trimThresh);
      addTrim = loTrim * adjFact + hiTrim;
    }

    contrastLc = Math.max(0, Math.abs(contrastLc * 0.01));

    let wcagContrast =
      (Math.pow(contrastLc + preScale, powerShift) + offsetA) * mainFactor * contrastLc +
      addTrim;

    wcagContrast =
      wcagContrast > loThresh
        ? 10.0 * wcagContrast
        : contrastLc < 0.06
          ? 0
          : 10.0 * wcagContrast - (Math.pow(loThresh - wcagContrast + preEmph, loExp) - postDe);

    return wcagContrast.toFixed(places) + ratioStr;
  }

  BPCAcontrast(txtY: number, bgY: number, places = -1) {
    const icp = [0.0, 1.1];

    if (
      isNaN(txtY) ||
      isNaN(bgY) ||
      Math.min(txtY, bgY) < icp[0] ||
      Math.max(txtY, bgY) > icp[1]
    ) {
      return 0;
    }

    const normBG = 0.56,
      normTXT = 0.57,
      revTXT = 0.62,
      revBG = 0.65;

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

    let SAPC = 0.0;
    let outputContrast = 0.0;
    let polCat = 'BoW';

    txtY = txtY > blkThrs ? txtY : txtY + Math.pow(blkThrs - txtY, blkClmp);
    bgY = bgY > blkThrs ? bgY : bgY + Math.pow(blkThrs - bgY, blkClmp);

    if (Math.abs(bgY - txtY) < deltaYmin) {
      return 0.0;
    }

    if (bgY > txtY) {
      SAPC = (Math.pow(bgY, normBG) - Math.pow(txtY, normTXT)) * scaleBoW;
      outputContrast = SAPC < loClip ? 0.0 : SAPC - loBoWoffset;
    } else {
      polCat = 'WoB';
      SAPC = (Math.pow(bgY, revBG) - Math.pow(txtY, revTXT)) * scaleWoB;
      let bridge = Math.max(0, txtY / bridgeWoBpivot - 1.0) * bridgeWoBfact;
      outputContrast = SAPC > -loClip ? 0.0 : SAPC + loWoBoffset + bridge;
    }

    if (places < 0) {
      return outputContrast * 100.0;
    } else if (places == 0) {
      return (
        Math.round(Math.abs(outputContrast) * 100.0) + '<sub>' + polCat + '</sub>'
      );
    } else if (Number.isInteger(places)) {
      return (outputContrast * 100.0).toFixed(places);
    } else {
      throw 'Err-3';
    }
  }

  sRGBtoY(rgba = [0, 0, 0]) {
    const mainTRC = 2.4;
    const sRco = 0.212647813391364,
      sGco = 0.715179147533615,
      sBco = 0.0721730390750208;

    function simpleExp(chan: number) {
      return Math.pow(chan / 255.0, mainTRC);
    }

    return sRco * simpleExp(rgba[0]) + sGco * simpleExp(rgba[1]) + sBco * simpleExp(rgba[2]);
  }

  alphaBlend(rgbaFG = [0, 0, 0, 1.0], rgbBG = [0, 0, 0], isInt = true) {
    if (rgbaFG[3]) {
      rgbaFG[3] = Math.max(Math.min(rgbaFG[3], 1.0), 0.0);
      let compBlend = 1.0 - rgbaFG[3];
      let rgbOut = [0, 0, 0];

      for (let i = 0; i < 3; i++) {
        rgbOut[i] = rgbBG[i] * compBlend + rgbaFG[i] * rgbaFG[3];
        if (isInt) rgbOut[i] = Math.min(Math.round(rgbOut[i]), 255);
      }

      return rgbOut;
    } else {
      return rgbaFG;
    }
  }

  calcBPCA(textColor: string, bgColor: string, places = -1) {
    let bpca: string | number = NaN;

    let txClr = this.cus.getRgb255Array(textColor);
    let bgClr = this.cus.getRgb255Array(bgColor);

    if (txClr && bgClr) {
      bpca = this.BPCAcontrast(this.sRGBtoY(txClr), this.sRGBtoY(bgClr), places);
    } else {
      console.warn('issue calculating BPCA');
    }

    return bpca;
  }
}
