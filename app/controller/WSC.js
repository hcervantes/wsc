/*
 * File: app/controller/WSC.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.controller.WSC', {
    extend: 'Ext.Base',
    alias: 'controller.WSCalc',

    requires: [
        'MyApp.controller.Screen'
    ],

    getCenterHeightFF: function() {
        return((this.vsize.value / 2) + this.VHFF);
    },

    getPixPerInch: function() {
        return (this.getSpyHNatPixRate() / (this.hsize * 12));
    },

    getAspectRatio: function() {
        return this.hsize / this.vsize;
    },

    getProjAspectRatio: function() {
        return (this.HNatPixRate / this.VNatPixRate);
    },

    getStackWidth: function() {
        return ((this.vsize * this.getProjAspectRatio()));
    },

    RoundNum: function(num, x) {
        return Ext.Number.toFixed(num, x);

    },

    getSpyHNatPixRate: function() {
        return (this.VNatPixRate * this.getAspectRatio());
    },

    getSpyVNatPixRate: function() {
        return this.VNatPixRate;
    },

    getSpyAspectRatio: function() {
        return this.getSpyHNatPixRate() / this.getSpyVNatPixRate();
    },

    getSpyScreenTotalPix: function() {
        return this.getSpyVNatPixRate() * this.getSpyHNatPixRate();
    },

    getSpyOpMonTotalPix: function() {
        return this.spyOpMonH * this.getSpyVNatPixRate();
    },

    getSpyTotalPix: function() {
        return this.getSpyScreenTotalPix() + this.getSpyOpMonTotalPix();
    },

    getScreenWidth: function() {
        var ret = this.vsize * (this.HNatPixRate / this.VNatPixRate);
        return ret;
    },

    getOverLapPix: function() {
        var ret = ((this.HNatPixRate * this.numprojectors) - this.getSpyHNatPixRate()) / (this.numprojectors - 1);
        return ret;
    },

    getOverlapSize: function() {
        var nonRoundedOLSize = this.getNonRoundedOLSize();
        var overLapPix = this.getOverLapPix();

        return (this.getNonRoundedOLSize() * (this.getOverLapPix() / this.HNatPixRate));

    },

    getNumberOuts: function() {
        var outs = 0;
        var i = 0;
        while (outs === 0){
            var spec = ((this.HNatPixRate*i) - this.getSpyHNatPixRate()) / i-1;
            if(spec >= 200 & spec <= 512)
            outs = i;
            // Safety: prevent loop for ever
            if(i > 100) continue;
            i++;
        }
        return outs;
    },

    getNonRoundedOLSize: function() {
        return this.vsize * this.getProjAspectRatio();

    },

    getSpyOverlap: function() {
        var spyHNat = this.getSpyHNatPixRate();
        return (((this.HNatPixRate * this.numprojectors) - this.getSpyHNatPixRate())/2);
    },

    getScreens: function() {

        var screens = new Array();
        var x = 0, p = 0, o = 0;
        // x = left calculations, c = center calculations
        var c = (wsCalc.hsize / 2) - wsCalc.hsize;
        for ( i = 0; i < this.numprojectors; i++) {
            var scrn = new MyApp.controller.Screen();
            // left calcs
            scrn.leftLeft = x;
            scrn.leftCenter = wsCalc.getScreenWidth() / 2 + x;
            scrn.leftRight = wsCalc.getScreenWidth() + x;
            x = scrn.leftRight;
            // center calcs
            scrn.centerLeft = c;
            scrn.centerCenter = wsCalc.getScreenWidth() / 2 + c;
            scrn.centerRight = wsCalc.getScreenWidth() + c;
            c = scrn.centerRight;

            // pixel output calcs
            scrn.startPixelOutput = p;
            scrn.endPixelOutput = p + wsCalc.HNatPixRate;
            p = scrn.endPixelOutput;

            // pixel overlap calcs
            scrn.startPixelOverlap = wsCalc.HNatPixRate - wsCalc.getOverLapPix() + o;
            scrn.endPixelOverlap = scrn.startPixelOverlap + wsCalc.getOverLapPix();
            o = scrn.startPixelOverlap;

            screens.push(scrn);
        }
        return screens;
    }

});