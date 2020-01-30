/*
* autoNumeric.js
* @author: Bob Knothe
* @author: Sokolov Yura
*
* Created by Robert J. Knothe on 2010-10-25. Please report any bugs to https://github.com/BobKnothe/autoNumeric
* Created by Sokolov Yura on 2010-11-07
*
* Copyright (c) 2011 Robert J. Knothe http://www.decorplanit.com/plugin/
*
* The MIT License (http://www.opensource.org/licenses/mit-license.php)
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/
(function (f) {
    function m(b, a, c) {
        void 0 === b.selectionStart ? (b.focus(), b = b.createTextRange(), b.collapse(!0), b.moveEnd("character", c), b.moveStart("character", a), b.select()) : (b.selectionStart = a, b.selectionEnd = c)
    }

    function B(b, a) {
        f.each(a, function (c, d) {
            "function" === typeof d ? a[c] = d(b, a, c) : "function" === typeof b.autoNumeric[d] && (a[c] = b.autoNumeric[d](b, a, c))
        })
    }

    function p(b, a) {
        "string" === typeof b[a] && (b[a] *= 1)
    }

    function w(b, a) {
        B(b, a);
        a.oEvent = null;
        a.tagList = "B CAPTION CITE CODE DD DEL DIV DFN DT EM H1 H2 H3 H4 H5 H6 INS KDB LABEL LI OUTPUT P Q S SAMPLE SPAN STRONG TD TH U VAR".split(" ");
        var c = a.vMax.toString().split("."), d = a.vMin || 0 === a.vMin ? a.vMin.toString().split(".") : [];
        p(a, "vMax");
        p(a, "vMin");
        p(a, "mDec");
        a.allowLeading = !0;
        a.aNeg = 0 > a.vMin ? "-" : "";
        c[0] = c[0].replace("-", "");
        d[0] = d[0].replace("-", "");
        a.mInt = Math.max(c[0].length, d[0].length, 1);
        if (null === a.mDec) {
            var e = 0, g = 0;
            c[1] && (e = c[1].length);
            d[1] && (g = d[1].length);
            a.mDec = Math.max(e, g)
        }
        null === a.altDec && 0 < a.mDec && ("." === a.aDec && "," !== a.aSep ? a.altDec = "," : "," === a.aDec && "." !== a.aSep && (a.altDec = "."));
        c = a.aNeg ? "([-\\" + a.aNeg + "]?)" : "(-?)";
        a.aNegRegAutoStrip = c;
        a.skipFirstAutoStrip = RegExp(c + "[^-" + (a.aNeg ? "\\" + a.aNeg : "") + "\\" + a.aDec + "\\d].*?(\\d|\\" + a.aDec + "\\d)");
        a.skipLastAutoStrip = RegExp("(\\d\\" + a.aDec + "?)[^\\" + a.aDec + "\\d]\\D*$");
        a.allowedAutoStrip = RegExp("[^" + ("-" + a.aNum + "\\" + a.aDec) + "]", "gi");
        a.numRegAutoStrip = RegExp(c + "(?:\\" + a.aDec + "?(\\d+\\" + a.aDec + "\\d+)|(\\d*(?:\\" + a.aDec + "\\d*)?))");
        return a
    }

    function h(b, a, c) {
        if (a.aSign) for (; -1 < b.indexOf(a.aSign);) b = b.replace(a.aSign, "");
        b = b.replace(a.skipFirstAutoStrip, "$1$2");
        b = b.replace(a.skipLastAutoStrip,
            "$1");
        b = b.replace(a.allowedAutoStrip, "");
        a.altDec && (b = b.replace(a.altDec, a.aDec));
        b = (b = b.match(a.numRegAutoStrip)) ? [b[1], b[2], b[3]].join("") : "";
        if (("allow" === a.lZero || "keep" === a.lZero) && "strip" !== c) {
            var d = [], e = "", d = b.split(a.aDec);
            -1 !== d[0].indexOf("-") && (e = "-", d[0] = d[0].replace("-", ""));
            d[0].length > a.mInt && "0" === d[0].charAt(0) && (d[0] = d[0].slice(1));
            b = e + d.join(a.aDec)
        }
        if (c && "deny" === a.lZero || c && "allow" === a.lZero && !1 === a.allowLeading) a = "^" + a.aNegRegAutoStrip + "0*(\\d" + ("leading" === c ? ")" : "|$)"), a = RegExp(a),
            b = b.replace(a, "$1$2");
        return b
    }

    function x(b, a, c) {
        if (a && c) {
            var d = b.split(a);
            d[1] && d[1].length > c && (0 < c ? (d[1] = d[1].substring(0, c), b = d.join(a)) : b = d[0])
        }
        return b
    }

    function r(b, a, c) {
        a && "." !== a && (b = b.replace(a, "."));
        c && "-" !== c && (b = b.replace(c, "-"));
        b.match(/\d/) || (b += "0");
        return b
    }

    function y(b, a) {
        var c = b.indexOf("."), d = +b;
        -1 !== c && (1E-6 > d && -1 < d ? (b = +b, 1E-6 > b && 0 < b && (b = (b + 10).toString(), b = b.substring(1)), 0 > b && -1 < b && (b = (b - 10).toString(), b = "-" + b.substring(2)), b = b.toString()) : (c = b.split("."), void 0 !== c[1] && (0 ===
        +c[1] ? b = c[0] : (c[1] = c[1].replace(/0*$/, ""), b = c.join(".")))));
        return "keep" === a.lZero ? b : b.replace(/^0*(\d)/, "$1")
    }

    function z(b, a, c) {
        c && "-" !== c && (b = b.replace("-", c));
        a && "." !== a && (b = b.replace(".", a));
        return b
    }

    function s(b, a) {
        b = h(b, a);
        b = x(b, a.aDec, a.mDec);
        b = r(b, a.aDec, a.aNeg);
        var c = +b;
        "set" === a.oEvent && (c < a.vMin || c > a.vMax) && f.error("The value (" + c + ") from the 'set' method falls outside of the vMin / vMax range");
        return c >= a.vMin && c <= a.vMax
    }

    function q(b, a, c) {
        return "" === b || b === a.aNeg ? "zero" === a.wEmpty ? b +
            "0" : "sign" === a.wEmpty || c ? b + a.aSign : b : null
    }

    function t(b, a) {
        b = h(b, a);
        var c = b.replace(",", "."), d = q(b, a, !0);
        if (null !== d) return d;
        var d = "",
            d = 2 === a.dGroup ? /(\d)((\d)(\d{2}?)+)$/ : 4 === a.dGroup ? /(\d)((\d{4}?)+)$/ : /(\d)((\d{3}?)+)$/,
            e = b.split(a.aDec);
        a.altDec && 1 === e.length && (e = b.split(a.altDec));
        var g = e[0];
        if (a.aSep) for (; d.test(g);) g = g.replace(d, "$1" + a.aSep + "$2");
        0 !== a.mDec && 1 < e.length ? (e[1].length > a.mDec && (e[1] = e[1].substring(0, a.mDec)), b = g + a.aDec + e[1]) : b = g;
        a.aSign && (d = -1 !== b.indexOf(a.aNeg), b = b.replace(a.aNeg,
            ""), b = "p" === a.pSign ? a.aSign + b : b + a.aSign, d && (b = a.aNeg + b));
        "set" === a.oEvent && 0 > c && null !== a.nBracket && (b = negativeBracket(b, a.nBracket, a.oEvent));
        return b
    }

    function u(b, a) {
        b = "" === b ? "0" : b.toString();
        p(a, "mDec");
        var c = "", d = 0, e = "", g = "boolean" === typeof a.aPad || null === a.aPad ? a.aPad ? a.mDec : 0 : +a.aPad,
            n = function (a) {
                a = a.replace(0 === g ? /(\.[1-9]*)0*$/ : 1 === g ? /(\.\d[1-9]*)0*$/ : RegExp("(\\.\\d{" + g + "}[1-9]*)0*$"), "$1");
                0 === g && (a = a.replace(/\.$/, ""));
                return a
            };
        "-" === b.charAt(0) && (e = "-", b = b.replace("-", ""));
        b.match(/^\d/) ||
        (b = "0" + b);
        "-" === e && 0 === +b && (e = "");
        if (0 < +b && "keep" !== a.lZero || 0 < b.length && "allow" === a.lZero) b = b.replace(/^0*(\d)/, "$1");
        var d = b.lastIndexOf("."), f = b.length - 1 - (-1 === d ? b.length - 1 : d);
        if (f <= a.mDec) {
            c = b;
            if (f < g) for (-1 === d && (c += "."); f < g;) n = "000000".substring(0, g - f), c += n, f += n.length; else f > g ? c = n(c) : 0 === f && 0 === g && (c = c.replace(/\.$/, ""));
            return e + c
        }
        var c = d + a.mDec, d = +b.charAt(c + 1), f = b.substring(0, c + 1).split(""),
            h = "." === b.charAt(c) ? b.charAt(c - 1) % 2 : b.charAt(c) % 2;
        if (4 < d && "S" === a.mRound || 4 < d && "A" === a.mRound && "" ===
            e || 5 < d && "A" === a.mRound && "-" === e || 5 < d && "s" === a.mRound || 5 < d && "a" === a.mRound && "" === e || 4 < d && "a" === a.mRound && "-" === e || 5 < d && "B" === a.mRound || 5 === d && "B" === a.mRound && 1 === h || 0 < d && "C" === a.mRound && "" === e || 0 < d && "F" === a.mRound && "-" === e || 0 < d && "U" === a.mRound) for (d = f.length - 1; 0 <= d; d -= 1) if ("." !== f[d]) {
            f[d] = +f[d] + 1;
            if (10 > f[d]) break;
            0 < d && (f[d] = "0")
        }
        f = f.slice(0, c + 1);
        c = n(f.join(""));
        return 0 === +c ? c : e + c
    }

    function A(b, a) {
        this.settings = a;
        this.that = b;
        this.$that = f(b);
        this.formatted = !1;
        this.settingsClone = w(this.$that, this.settings);
        this.value = b.value
    }

    function l(b) {
        "string" === typeof b && (b = b.replace(/\[/g, "\\[").replace(/\]/g, "\\]"), b = "#" + b.replace(/(:|\.)/g, "\\$1"));
        return f(b)
    }

    function k(b, a, c) {
        var d = b.data("autoNumeric");
        d || (d = {}, b.data("autoNumeric", d));
        var e = d.holder;
        if (void 0 === e && a || c) e = new A(b.get(0), a), d.holder = e;
        return e
    }

    A.prototype = {
        init: function (b) {
            this.value = this.that.value;
            this.settingsClone = w(this.$that, this.settings);
            this.ctrlKey = b.ctrlKey;
            this.cmdKey = b.metaKey;
            this.shiftKey = b.shiftKey;
            var a = this.that, c = {};
            if (void 0 ===
                a.selectionStart) {
                a.focus();
                var d = document.selection.createRange();
                c.length = d.text.length;
                d.moveStart("character", -a.value.length);
                c.end = d.text.length;
                c.start = c.end - c.length
            } else c.start = a.selectionStart, c.end = a.selectionEnd, c.length = c.end - c.start;
            this.selection = c;
            if ("keydown" === b.type || "keyup" === b.type) this.kdCode = b.keyCode;
            this.which = b.which;
            this.formatted = this.processed = !1
        }, setSelection: function (b, a, c) {
            b = Math.max(b, 0);
            a = Math.min(a, this.that.value.length);
            this.selection = {
                start: b, end: a, length: a -
                    b
            };
            (void 0 === c || c) && m(this.that, b, a)
        }, setPosition: function (b, a) {
            this.setSelection(b, b, a)
        }, getBeforeAfter: function () {
            var b = this.value, a = b.substring(0, this.selection.start), b = b.substring(this.selection.end, b.length);
            return [a, b]
        }, getBeforeAfterStriped: function () {
            var b = this.getBeforeAfter();
            b[0] = h(b[0], this.settingsClone);
            b[1] = h(b[1], this.settingsClone);
            return b
        }, normalizeParts: function (b, a) {
            var c = this.settingsClone;
            a = h(a, c);
            var d = a.match(/^\d/) ? !0 : "leading";
            b = h(b, c, d);
            "" !== b && b !== c.aNeg || "deny" !== c.lZero ||
            "" < a && (a = a.replace(/^0*(\d)/, "$1"));
            d = b + a;
            if (c.aDec) {
                var e = d.match(RegExp("^" + c.aNegRegAutoStrip + "\\" + c.aDec));
                e && (b = b.replace(e[1], e[1] + "0"), d = b + a)
            }
            "zero" !== c.wEmpty || d !== c.aNeg && "" !== d || (b += "0");
            return [b, a]
        }, setValueParts: function (b, a) {
            var c = this.settingsClone, d = this.normalizeParts(b, a), e = d.join(""), d = d[0].length;
            return s(e, c) ? (e = x(e, c.aDec, c.mDec), d > e.length && (d = e.length), this.value = e, this.setPosition(d, !1), !0) : !1
        }, signPosition: function () {
            var b = this.settingsClone, a = b.aSign, c = this.that;
            if (a) {
                a =
                    a.length;
                if ("p" === b.pSign) return b.aNeg && c.value && c.value.charAt(0) === b.aNeg ? [1, a + 1] : [0, a];
                b = c.value.length;
                return [b - a, b]
            }
            return [1E3, -1]
        }, expandSelectionOnSign: function (b) {
            var a = this.signPosition(), c = this.selection;
            c.start < a[1] && c.end > a[0] && ((c.start < a[0] || c.end > a[1]) && this.value.substring(Math.max(c.start, a[0]), Math.min(c.end, a[1])).match(/^\s*$/) ? c.start < a[0] ? this.setSelection(c.start, a[0], b) : this.setSelection(a[1], c.end, b) : this.setSelection(Math.min(c.start, a[0]), Math.max(c.end, a[1]), b))
        }, checkPaste: function () {
            if (void 0 !==
                this.valuePartsBeforePaste) {
                var b = this.getBeforeAfter(), a = this.valuePartsBeforePaste;
                delete this.valuePartsBeforePaste;
                b[0] = b[0].substr(0, a[0].length) + h(b[0].substr(a[0].length), this.settingsClone);
                this.setValueParts(b[0], b[1]) || (this.value = a.join(""), this.setPosition(a[0].length, !1))
            }
        }, skipAllways: function (b) {
            var a = this.kdCode, c = this.which, d = this.ctrlKey, e = this.cmdKey, f = this.shiftKey;
            if ((d || e) && "keyup" === b.type && void 0 !== this.valuePartsBeforePaste || f && 45 === a) return this.checkPaste(), !1;
            if (112 <= a &&
                123 >= a || 91 <= a && 93 >= a || 9 <= a && 31 >= a || 8 > a && (0 === c || c === a) || 144 === a || 145 === a || 45 === a || (d || e) && 65 === a) return !0;
            if ((d || e) && (67 === a || 86 === a || 88 === a)) {
                "keydown" === b.type && this.expandSelectionOnSign();
                if (86 === a || 45 === a) "keydown" === b.type || "keypress" === b.type ? void 0 === this.valuePartsBeforePaste && (this.valuePartsBeforePaste = this.getBeforeAfter()) : this.checkPaste();
                return "keydown" === b.type || "keypress" === b.type || 67 === a
            }
            return d || e ? !0 : 37 === a || 39 === a ? (c = this.settingsClone.aSep, d = this.selection.start, e = this.that.value,
            "keydown" === b.type && c && !this.shiftKey && (37 === a && e.charAt(d - 2) === c ? this.setPosition(d - 1) : 39 === a && e.charAt(d + 1) === c && this.setPosition(d + 1)), !0) : 34 <= a && 40 >= a ? !0 : !1
        }, processAllways: function () {
            var b;
            return 8 === this.kdCode || 46 === this.kdCode ? (this.selection.length ? (this.expandSelectionOnSign(!1), b = this.getBeforeAfterStriped()) : (b = this.getBeforeAfterStriped(), 8 === this.kdCode ? b[0] = b[0].substring(0, b[0].length - 1) : b[1] = b[1].substring(1, b[1].length)), this.setValueParts(b[0], b[1]), !0) : !1
        }, processKeypress: function () {
            var b =
                    this.settingsClone, a = String.fromCharCode(this.which), c = this.getBeforeAfterStriped(), d = c[0],
                c = c[1];
            if (a === b.aDec || b.altDec && a === b.altDec || ("." === a || "," === a) && 110 === this.kdCode) {
                if (!b.mDec || !b.aDec || b.aNeg && -1 < c.indexOf(b.aNeg) || -1 < d.indexOf(b.aDec) || 0 < c.indexOf(b.aDec)) return !0;
                0 === c.indexOf(b.aDec) && (c = c.substr(1));
                this.setValueParts(d + b.aDec, c);
                return !0
            }
            if ("-" === a || "+" === a) {
                if (!b.aNeg) return !0;
                "" === d && -1 < c.indexOf(b.aNeg) && (d = b.aNeg, c = c.substring(1, c.length));
                d = d.charAt(0) === b.aNeg ? d.substring(1,
                    d.length) : "-" === a ? b.aNeg + d : d;
                this.setValueParts(d, c);
                return !0
            }
            "0" <= a && "9" >= a && (b.aNeg && "" === d && -1 < c.indexOf(b.aNeg) && (d = b.aNeg, c = c.substring(1, c.length)), 0 >= b.vMax && b.vMin < b.vMax && -1 === this.value.indexOf(b.aNeg) && "0" !== a && (d = b.aNeg + d), this.setValueParts(d + a, c));
            return !0
        }, formatQuick: function () {
            var b = this.settingsClone, a = this.getBeforeAfterStriped(), c = this.value;
            if (("" === b.aSep || "" !== b.aSep && -1 === c.indexOf(b.aSep)) && ("" === b.aSign || "" !== b.aSign && -1 === c.indexOf(b.aSign))) {
                var d = [], e = "", d = c.split(b.aDec);
                -1 < d[0].indexOf("-") && (e = "-", d[0] = d[0].replace("-", ""), a[0] = a[0].replace("-", ""));
                d[0].length > b.mInt && "0" === a[0].charAt(0) && (a[0] = a[0].slice(1));
                a[0] = e + a[0]
            }
            c = t(this.value, this.settingsClone);
            d = c.length;
            if (c) {
                a = a[0].split("");
                e = 0;
                for (e; e < a.length; e += 1) a[e].match("\\d") || (a[e] = "\\" + a[e]);
                a = RegExp("^.*?" + a.join(".*?"));
                (a = c.match(a)) ? (d = a[0].length, (0 === d && c.charAt(0) !== b.aNeg || 1 === d && c.charAt(0) === b.aNeg) && b.aSign && "p" === b.pSign && (d = this.settingsClone.aSign.length + ("-" === c.charAt(0) ? 1 : 0))) : b.aSign &&
                    "s" === b.pSign && (d -= b.aSign.length)
            }
            this.that.value = c;
            this.setPosition(d);
            this.formatted = !0
        }
    };
    var v = {
        init: function (b) {
            return this.each(function () {
                var a = f(this), c = a.data("autoNumeric"), d = a.data();
                if ("object" !== typeof c) {
                    c = f.extend({}, {
                        aNum: "0123456789",
                        aSep: ",",
                        dGroup: "3",
                        aDec: ".",
                        altDec: null,
                        aSign: "",
                        pSign: "p",
                        vMax: "999999999.99",
                        vMin: "0.00",
                        mDec: null,
                        mRound: "S",
                        aPad: !0,
                        nBracket: null,
                        wEmpty: "empty",
                        lZero: "allow",
                        aForm: !0,
                        onSomeEvent: function () {
                        }
                    }, d, b);
                    if (c.aDec === c.aSep) return f.error("autoNumeric will not function properly when the decimal character aDec: '" +
                        c.aDec + "' and thousand separator aSep: '" + c.aSep + "' are the same character"), this;
                    a.data("autoNumeric", c)
                } else return this;
                c.lastSetValue = "";
                c.runOnce = !1;
                var e = k(a, c);
                if (-1 === f.inArray(a.prop("tagName"), c.tagList) && "INPUT" !== a.prop("tagName")) return f.error("The <" + a.prop("tagName") + "> is not supported by autoNumeric()"), this;
                !1 === c.runOnce && c.aForm && (a.is("input[type=text], input[type=hidden], input:not([type])") && (d = !0, "" === a[0].value && "empty" === c.wEmpty && (a[0].value = "", d = !1), "" === a[0].value && "sign" ===
                c.wEmpty && (a[0].value = c.aSign, d = !1), d && a.autoNumeric("set", a.val())), -1 !== f.inArray(a.prop("tagName"), c.tagList) && "" !== a.text() && a.autoNumeric("set", a.text()));
                c.runOnce = !0;
                a.is("input[type=text], input[type=hidden], input:not([type])") && (a.on("keydown.autoNumeric", function (b) {
                    e = k(a);
                    if (e.settings.aDec === e.settings.aSep) return f.error("autoNumeric will not function properly when the decimal character aDec: '" + e.settings.aDec + "' and thousand separator aSep: '" + e.settings.aSep + "' are the same character"),
                        this;
                    if (e.that.readOnly) return e.processed = !0;
                    e.init(b);
                    e.settings.oEvent = "keydown";
                    if (e.skipAllways(b)) return e.processed = !0;
                    if (e.processAllways()) return e.processed = !0, e.formatQuick(), b.preventDefault(), !1;
                    e.formatted = !1;
                    return !0
                }), a.on("keypress.autoNumeric", function (b) {
                    var c = k(a), d = c.processed;
                    c.init(b);
                    c.settings.oEvent = "keypress";
                    if (c.skipAllways(b)) return !0;
                    if (d) return b.preventDefault(), !1;
                    if (c.processAllways() || c.processKeypress()) return c.formatQuick(), b.preventDefault(), !1;
                    c.formatted =
                        !1
                }), a.on("keyup.autoNumeric", function (b) {
                    var c = k(a);
                    c.init(b);
                    c.settings.oEvent = "keyup";
                    b = c.skipAllways(b);
                    c.kdCode = 0;
                    delete c.valuePartsBeforePaste;
                    a[0].value === c.settings.aSign && ("s" === c.settings.pSign ? m(this, 0, 0) : m(this, c.settings.aSign.length, c.settings.aSign.length));
                    if (b || "" === this.value) return !0;
                    c.formatted || c.formatQuick()
                }), a.on("focusin.autoNumeric", function () {
                    var b = k(a);
                    b.settingsClone.oEvent = "focusin";
                    if (null !== b.settingsClone.nBracket) {
                        var c = a.val();
                        a.val(negativeBracket(c, b.settingsClone.nBracket,
                            b.settingsClone.oEvent))
                    }
                    b.inVal = a.val();
                    c = q(b.inVal, b.settingsClone, !0);
                    null !== c && (a.val(c), "s" === b.settings.pSign ? m(this, 0, 0) : m(this, b.settings.aSign.length, b.settings.aSign.length))
                }), a.on("focusout.autoNumeric", function () {
                    var b = k(a), c = b.settingsClone, d = a.val(), e = d;
                    b.settingsClone.oEvent = "focusout";
                    var f = "";
                    "allow" === c.lZero && (c.allowLeading = !1, f = "leading");
                    "" !== d && (d = h(d, c, f), null === q(d, c) && s(d, c, a[0]) ? (d = r(d, c.aDec, c.aNeg), d = u(d, c), d = z(d, c.aDec, c.aNeg)) : d = "");
                    f = q(d, c, !1);
                    null === f && (f = t(d, c));
                    f !== e && a.val(f);
                    f !== b.inVal && (a.change(), delete b.inVal);
                    null !== c.nBracket && 0 > a.autoNumeric("get") && (b.settingsClone.oEvent = "focusout", a.val(negativeBracket(a.val(), c.nBracket, c.oEvent)))
                }))
            })
        }, destroy: function () {
            return f(this).each(function () {
                var b = f(this);
                b.off(".autoNumeric");
                b.removeData("autoNumeric")
            })
        }, update: function (b) {
            return f(this).each(function () {
                var a = l(f(this)), c = a.data("autoNumeric");
                if ("object" !== typeof c) return f.error("You must initialize autoNumeric('init', {options}) prior to calling the 'update' method"),
                    this;
                var d = a.autoNumeric("get"), c = f.extend(c, b);
                k(a, c, !0);
                if (c.aDec === c.aSep) return f.error("autoNumeric will not function properly when the decimal character aDec: '" + c.aDec + "' and thousand separator aSep: '" + c.aSep + "' are the same character"), this;
                a.data("autoNumeric", c);
                if ("" !== a.val() || "" !== a.text()) return a.autoNumeric("set", d)
            })
        }, set: function (b) {
            return f(this).each(function () {
                var a = l(f(this)), c = a.data("autoNumeric"), d = b.toString(), e = b.toString();
                if ("object" !== typeof c) return f.error("You must initialize autoNumeric('init', {options}) prior to calling the 'set' method"),
                    this;
                e !== a.attr("value") && e !== a.text() || !1 !== c.runOnce || (d = d.replace(",", "."));
                e !== a.attr("value") && "INPUT" === a.prop("tagName") && !1 === c.runOnce && (d = h(d, c));
                if (!f.isNumeric(+d)) return "";
                d = y(d, c);
                c.oEvent = "set";
                c.lastSetValue = d;
                d.toString();
                "" !== d && (d = u(d, c));
                d = z(d, c.aDec, c.aNeg);
                s(d, c) || (d = u("", c));
                d = t(d, c);
                if (a.is("input[type=text], input[type=hidden], input:not([type])")) return a.val(d);
                if (-1 !== f.inArray(a.prop("tagName"), c.tagList)) return a.text(d);
                f.error("The <" + a.prop("tagName") + "> is not supported by autoNumeric()");
                return !1
            })
        }, get: function () {
            var b = l(f(this)), a = b.data("autoNumeric");
            if ("object" !== typeof a) return f.error("You must initialize autoNumeric('init', {options}) prior to calling the 'get' method"), this;
            a.oEvent = "get";
            var c = "";
            if (b.is("input[type=text], input[type=hidden], input:not([type])")) c = b.eq(0).val(); else if (-1 !== f.inArray(b.prop("tagName"), a.tagList)) c = b.eq(0).text(); else return f.error("The <" + b.prop("tagName") + "> is not supported by autoNumeric()"), !1;
            if ("" === c && "empty" === a.wEmpty || c === a.aSign &&
                ("sign" === a.wEmpty || "empty" === a.wEmpty)) return "";
            null !== a.nBracket && "" !== c && (c = negativeBracket(c, a.nBracket, a.oEvent));
            if (a.runOnce || !1 === a.aForm) c = h(c, a);
            c = r(c, a.aDec, a.aNeg);
            0 === +c && "keep" !== a.lZero && (c = "0");
            return "keep" === a.lZero ? c : c = y(c, a)
        }, getString: function () {
            var b = !1, a = l(f(this)).serialize().split("&"), c = 0;
            for (c; c < a.length; c += 1) {
                var d = a[c].split("=");
                "object" === typeof f('*[name="' + decodeURIComponent(d[0]) + '"]').data("autoNumeric") && null !== d[1] && void 0 !== f('*[name="' + decodeURIComponent(d[0]) +
                    '"]').data("autoNumeric") && (d[1] = f('input[name="' + decodeURIComponent(d[0]) + '"]').autoNumeric("get"), a[c] = d.join("="), b = !0)
            }
            if (!0 === b) return a.join("&");
            f.error("You must initialize autoNumeric('init', {options}) prior to calling the 'getString' method");
            return this
        }, getArray: function () {
            var b = !1, a = l(f(this)).serializeArray();
            f.each(a, function (a, d) {
                "object" === typeof f('*[name="' + decodeURIComponent(d.name) + '"]').data("autoNumeric") && ("" !== d.value && void 0 !== f('*[name="' + decodeURIComponent(d.name) + '"]').data("autoNumeric") &&
                (d.value = f('input[name="' + decodeURIComponent(d.name) + '"]').autoNumeric("get").toString()), b = !0)
            });
            if (!0 === b) return a;
            f.error("You must initialize autoNumeric('init', {options}) prior to calling the 'getArray' method");
            return this
        }, getSettings: function () {
            return l(f(this)).eq(0).data("autoNumeric")
        }
    };
    f.fn.autoNumeric = function (b) {
        if (v[b]) return v[b].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" === typeof b || !b) return v.init.apply(this, arguments);
        f.error('Method "' + b + '" is not supported by autoNumeric()')
    }
})(jQuery);

/*
 * jQuery SelectBox Styler v1.0.1
 * http://dimox.name/styling-select-boxes-using-jquery-css/
 * Copyright 2012 Dimox (http://dimox.name/)
 * Released under the MIT license.
 * Date: 2012.10.07
 */
(function ($) {
    $.fn.selectbox = function () {
        $(this).each(function () {
            var select = $(this);
            if (select.prev('span.selectbox').length < 1) {
                function doSelect() {
                    var option = select.find('option');
                    var optionSelected = option.filter(':selected');
                    var optionText = option.filter(':first').text();
                    if (optionSelected.length) optionText = optionSelected.text();
                    var ddlist = '';
                    for (i = 0; i < option.length; i++) {
                        var selected = '';
                        var disabled = ' class="disabled"';
                        if (option.eq(i).is(':selected')) selected = ' class="selected sel"';
                        if (option.eq(i).is(':disabled')) selected = disabled;
                        ddlist += '<li' + selected + '>' + option.eq(i).text() + '</li>';
                    }
                    var selectbox = $('<span class="selectbox" style="display:inline-block;position:relative">' + '<div class="select" style="float:left;position:relative;z-index:10000"><div class="text">' + optionText + '</div>' + '<b class="trigger"><i class="arrow"></i></b>' + '</div>' + '<div class="dropdown" style="position:absolute;z-index:9999;overflow:auto;overflow-x:hidden;list-style:none">' + '<ul>' + ddlist + '</ul>' + '</div>' + '</span>');
                    select.before(selectbox).css({position: 'absolute', top: -9999});
                    var divSelect = selectbox.find('div.select');
                    var divText = selectbox.find('div.text');
                    var dropdown = selectbox.find('div.dropdown');
                    var li = dropdown.find('li');
                    var selectHeight = selectbox.outerHeight();
                    if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
                    if (dropdown.css('top') == 'auto') dropdown.css({top: selectHeight});
                    var liHeight = li.outerHeight();
                    var position = dropdown.css('top');
                    dropdown.hide();
                    divSelect.click(function () {
                        var topOffset = selectbox.offset().top;
                        var bottomOffset = $(window).height() - selectHeight - (topOffset - $(window).scrollTop());
                        if (bottomOffset < 0 || bottomOffset < liHeight * 6) {
                            dropdown.height('auto').css({top: 'auto', bottom: position});
                            if (dropdown.outerHeight() > topOffset - $(window).scrollTop() - 20) {
                                dropdown.height(Math.floor((topOffset - $(window).scrollTop() - 20) / liHeight) * liHeight);
                            }
                        } else if (bottomOffset > liHeight * 6) {
                            dropdown.height('auto').css({bottom: 'auto', top: position});
                            if (dropdown.outerHeight() > bottomOffset - 20) {
                                dropdown.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
                            }
                        }
                        $('span.selectbox').css({zIndex: 1}).removeClass('focused');
                        selectbox.css({zIndex: 2});
                        if (dropdown.is(':hidden')) {
                            $('div.dropdown:visible').hide();
                            dropdown.show();
                        } else {
                            dropdown.hide();
                        }
                        return false;
                    });
                    li.hover(function () {
                        $(this).siblings().removeClass('selected');
                    });
                    var selectedText = li.filter('.selected').text();
                    li.filter(':not(.disabled)').click(function () {
                        var liText = $(this).text();
                        if (selectedText != liText) {
                            $(this).addClass('selected sel').siblings().removeClass('selected sel');
                            option.removeAttr('selected').eq($(this).index()).attr('selected', true);
                            selectedText = liText;
                            divText.text(liText);
                            select.change();
                        }
                        dropdown.hide();
                    });
                    dropdown.mouseout(function () {
                        dropdown.find('li.sel').addClass('selected');
                    });
                    select.focus(function () {
                        $('span.selectbox').removeClass('focused');
                        selectbox.addClass('focused');
                    }).keyup(function () {
                        divText.text(option.filter(':selected').text());
                        li.removeClass('selected sel').eq(option.filter(':selected').index()).addClass('selected sel');
                    });
                    $(document).on('click', function (e) {
                        if (!$(e.target).parents().hasClass('selectbox')) {
                            dropdown.hide().find('li.sel').addClass('selected');
                            selectbox.removeClass('focused');
                        }
                    });
                }

                doSelect();
                select.on('refresh', function () {
                    select.prev().remove();
                    doSelect();
                })
            }
        });
    }
})(jQuery);

/*! $.noUiSlider - WTFPL - refreshless.com/nouislider/ */
(function (e) {
    function t(e) {
        throw new RangeError("noUiSlider: " + e)
    }

    function n(e, n, r) {
        (e[n] || e[r]) && e[n] === e[r] && t("(Link) '" + n + "' can't match '" + r + "'.'")
    }

    function r(e) {
        return "number" === typeof e && !isNaN(e) && isFinite(e)
    }

    function i(t) {
        return e.isArray(t) ? t : [t]
    }

    function s(e, t) {
        e.addClass(t);
        setTimeout(function () {
            e.removeClass(t)
        }, 300)
    }

    function o(e, t) {
        return 100 * t / (e[1] - e[0])
    }

    function u(e, t) {
        if (t >= e.d.slice(-1)[0]) return 100;
        for (var n = 1, r, i, s; t >= e.d[n];) n++;
        r = e.d[n - 1];
        i = e.d[n];
        s = e.c[n - 1];
        r = [r, i];
        return s + o(r, 0 > r[0] ? t + Math.abs(r[0]) : t - r[0]) / (100 / (e.c[n] - s))
    }

    function a(e, t) {
        for (var n = 1, r; t >= e.c[n];) n++;
        if (e.m) return r = e.c[n - 1], n = e.c[n], t - r > (n - r) / 2 ? n : r;
        e.h[n - 1] ? (r = e.h[n - 1], n = e.c[n - 1] + Math.round((t - e.c[n - 1]) / r) * r) : n = t;
        return n
    }

    function f(r) {
        void 0 === r && (r = {});
        "object" !== typeof r && t("(Format) 'format' option must be an object.");
        var i = {};
        e(H).each(function (e, n) {
            void 0 === r[n] ? i[n] = B[e] : typeof r[n] === typeof B[e] ? ("decimals" === n && (0 > r[n] || 7 < r[n]) && t("(Format) 'format.decimals' option must be between 0 and 7."), i[n] = r[n]) : t("(Format) 'format." + n + "' must be a " + typeof B[e] + ".")
        });
        n(i, "mark", "thousand");
        n(i, "prefix", "negative");
        n(i, "prefix", "negativeBefore");
        this.B = i
    }

    function l(t, n) {
        if (!(this instanceof l)) throw Error("Link: Don't use Link as a function. Use the 'new' keyword.");
        if (!t) throw new RangeError("Link: missing parameters.");
        this.g = t.format || {};
        this.update = !n;
        var r = this, i = t.target || function () {
            }, s = t.method, o = "string" === typeof i && 0 === i.indexOf("-tooltip-"),
            u = "string" === typeof i && 0 !== i.indexOf("-"), a = "function" === typeof i,
            f = i instanceof e || e.zepto && e.zepto.isZ(i), c = f && i.is("input, select, textarea"),
            h = f && "function" === typeof s, p = f && "string" === typeof s && i[s];
        if (o) this.method = s || "html", this.j = e(i.replace("-tooltip-", "") || "<div/>")[0]; else if (u) this.method = "val", this.j = document.createElement("input"), this.j.name = i, this.j.type = "hidden"; else if (a) this.target = !1, this.method = i; else {
            if (f) {
                if (s && (h || p)) {
                    this.target = i;
                    this.method = s;
                    return
                }
                if (!s && c) {
                    this.method = "val";
                    this.target = i;
                    this.target.on("change", function (t) {
                        t = e(t.target).val();
                        var n = r.q;
                        r.u.val([n ? null : t, n ? t : null], {link: r})
                    });
                    return
                }
                if (!s && !c) {
                    this.method = "html";
                    this.target = i;
                    return
                }
            }
            throw new RangeError("Link: Invalid Link.")
        }
    }

    function c(e, n) {
        r(n) || t("'step' is not numeric.");
        e.h[0] = n
    }

    function h(n, i) {
        ("object" !== typeof i || e.isArray(i)) && t("'range' is not an object.");
        e.each(i, function (i, s) {
            var o;
            "number" === typeof s && (s = [s]);
            e.isArray(s) || t("'range' contains invalid value.");
            o = "min" === i ? 0 : "max" === i ? 100 : parseFloat(i);
            r(o) && r(s[0]) || t("'range' value isn't numeric.");
            n.c.push(o);
            n.d.push(s[0]);
            o ? n.h.push(isNaN(s[1]) ? !1 : s[1]) : isNaN(s[1]) || (n.h[0] = s[1])
        });
        e.each(n.h, function (e, t) {
            if (!t) return !0;
            n.h[e] = o([n.d[e], n.d[e + 1]], t) / (100 / (n.c[e + 1] - n.c[e]))
        })
    }

    function p(n, r) {
        "number" === typeof r && (r = [r]);
        (!e.isArray(r) || !r.length || 2 < r.length) && t("'start' option is incorrect.");
        n.a = r.length;
        n.start = r
    }

    function d(e, n) {
        e.m = n;
        "boolean" !== typeof n && t("'snap' option must be a boolean.")
    }

    function v(e, n) {
        "lower" === n && 1 === e.a ? e.i = 1 : "upper" === n && 1 === e.a ? e.i = 2 : !0 === n && 2 === e.a ? e.i = 3 : !1 === n ? e.i = 0 : t("'connect' option was doesn't match handle count.")
    }

    function m(e, n) {
        switch (n) {
            case"horizontal":
                e.k = 0;
                break;
            case"vertical":
                e.k = 1;
                break;
            default:
                t("'orientation' option is invalid.")
        }
    }

    function g(e, n) {
        2 < e.c.length && t("'margin' option is only supported on linear sliders.");
        e.margin = o(e.d, n);
        r(n) || t("'margin' option must be numeric.")
    }

    function y(e, n) {
        switch (n) {
            case"ltr":
                e.dir = 0;
                break;
            case"rtl":
                e.dir = 1;
                e.i = [0, 2, 1, 3][e.i];
                break;
            default:
                t("'direction' option was not recognized.")
        }
    }

    function b(e, n) {
        "string" !== typeof n && t("'behaviour' must be a string containing options.");
        var r = 0 <= n.indexOf("snap");
        e.n = {
            p: 0 <= n.indexOf("tap") || r,
            extend: 0 <= n.indexOf("extend"),
            s: 0 <= n.indexOf("drag"),
            fixed: 0 <= n.indexOf("fixed"),
            m: r
        }
    }

    function w(n, r, i) {
        n.o = [r.lower, r.upper];
        n.g = new f(r.format);
        e.each(n.o, function (n, s) {
            e.isArray(s) || t("'serialization." + (n ? "upper" : "lower") + "' must be an array.");
            e.each(s, function () {
                this instanceof l || t("'serialization." + (n ? "upper" : "lower") + "' can only contain Link instances.");
                this.q = n;
                this.u = i;
                this.scope = this.scope || i;
                this.g = new f(e.extend({}, r.format, this.g))
            })
        });
        n.dir && 1 < n.a && n.o.reverse()
    }

    function E(n, r) {
        var i = {c: [], d: [], h: [!1], margin: 0}, s;
        s = {
            step: {e: !1, f: c},
            range: {e: !0, f: h},
            start: {e: !0, f: p},
            snap: {e: !1, f: d},
            connect: {e: !0, f: v},
            orientation: {e: !1, f: m},
            margin: {e: !1, f: g},
            direction: {e: !0, f: y},
            behaviour: {e: !0, f: b},
            serialization: {e: !0, f: w}
        };
        n = e.extend({connect: !1, direction: "ltr", behaviour: "tap", orientation: "horizontal"}, n);
        n.serialization = e.extend({lower: [], upper: [], format: {}}, n.serialization);
        e.each(s, function (e, s) {
            if (void 0 === n[e]) if (s.e) t("'" + e + "' is required."); else return !0;
            s.f(i, n[e], r)
        });
        i.style = i.k ? "top" : "left";
        return i
    }

    function S(t, n) {
        var r = e("<div><div/></div>").addClass(P[2]), i = ["-lower", "-upper"];
        t.dir && i.reverse();
        r.children().addClass(P[3] + " " + P[3] + i[n]);
        return r
    }

    function x(t, n) {
        n.j && (n = new l({target: e(n.j).clone().appendTo(t), method: n.method, format: n.g}, !0));
        return n
    }

    function T(e, t) {
        var n, r = [];
        for (n = 0; n < e.a; n++) {
            var i = r, s = n, o = e.o[n], u = t[n].children(), a = void 0, f = [];
            f.push(new l({format: e.g}, !0));
            for (a = 0; a < o.length; a++) f.push(x(u, o[a]));
            i[s] = f
        }
        return r
    }

    function N(e, t, n) {
        switch (e) {
            case 1:
                t.addClass(P[7]);
                n[0].addClass(P[6]);
                break;
            case 3:
                n[1].addClass(P[6]);
            case 2:
                n[0].addClass(P[7]);
            case 0:
                t.addClass(P[6])
        }
    }

    function C(e, t) {
        var n, r = [];
        for (n = 0; n < e.a; n++) r.push(S(e, n).appendTo(t));
        return r
    }

    function k(t, n) {
        n.addClass([P[0], P[8 + t.dir], P[4 + t.k]].join(" "));
        return e("<div/>").appendTo(n).addClass(P[1])
    }

    function L(t, n, r) {
        function i() {
            return b[["width", "height"][n.k]]()
        }

        function o(e) {
            var t, n = [g.val()];
            for (t = 0; t < e.length; t++) g.trigger(e[t], n)
        }

        function f(t, r, i) {
            var s = t[0] !== E[0][0] ? 1 : 0, o = y[0] + n.margin, u = y[1] - n.margin;
            i && 1 < E.length && (r = s ? Math.max(r, o) : Math.min(r, u));
            100 > r && (r = a(n, r));
            r = Math.max(Math.min(parseFloat(r.toFixed(7)), 100), 0);
            if (r === y[s]) return 1 === E.length ? !1 : r === o || r === u ? 0 : !1;
            t.css(n.style, r + "%");
            t.is(":first-child") && t.toggleClass(P[17], 50 < r);
            y[s] = r;
            n.dir && (r = 100 - r);
            e(w[s]).each(function () {
                this.write(n, r, t.children(), g)
            });
            return !0
        }

        function l(e, t, n) {
            n || s(g, P[14]);
            f(e, t, !1);
            o(["slide", "set", "change"])
        }

        function c(e, t, r, i) {
            e = e.replace(/\s/g, ".nui ") + ".nui";
            t.on(e, function (e) {
                var t = g.attr("disabled");
                if (g.hasClass(P[14]) || void 0 !== t && null !== t) return !1;
                e.preventDefault();
                var t = 0 === e.type.indexOf("touch"), s = 0 === e.type.indexOf("mouse"),
                    o = 0 === e.type.indexOf("pointer"), u, a, f = e;
                0 === e.type.indexOf("MSPointer") && (o = !0);
                e.originalEvent && (e = e.originalEvent);
                t && (u = e.changedTouches[0].pageX, a = e.changedTouches[0].pageY);
                if (s || o) o || void 0 !== window.pageXOffset || (window.pageXOffset = document.documentElement.scrollLeft, window.pageYOffset = document.documentElement.scrollTop), u = e.clientX + window.pageXOffset, a = e.clientY + window.pageYOffset;
                f.v = [u, a];
                f.cursor = s;
                e = f;
                e.l = e.v[n.k];
                r(e, i)
            })
        }

        function h(e, t) {
            var n = t.a || E, r, s = !1, s = 100 * (e.l - t.start) / i(), u = n[0][0] !== E[0][0] ? 1 : 0;
            var a = t.w;
            r = s + a[0];
            s += a[1];
            1 < n.length ? (0 > r && (s += Math.abs(r)), 100 < s && (r -= s - 100), r = [Math.max(Math.min(r, 100), 0), Math.max(Math.min(s, 100), 0)]) : r = [r, s];
            s = f(n[0], r[u], 1 === n.length);
            1 < n.length && (s = f(n[1], r[u ? 0 : 1], !1) || s);
            s && o(["slide"])
        }

        function p(t) {
            e("." + P[15]).removeClass(P[15]);
            t.cursor && e("body").css("cursor", "").off(".nui");
            M.off(".nui");
            g.removeClass(P[12]);
            o(["set", "change"])
        }

        function d(t, n) {
            1 === n.a.length && n.a[0].children().addClass(P[15]);
            t.stopPropagation();
            c(D.move, M, h, {start: t.l, a: n.a, w: [y[0], y[E.length - 1]]});
            c(D.end, M, p, null);
            t.cursor && (e("body").css("cursor", e(t.target).css("cursor")), 1 < E.length && g.addClass(P[12]), e("body").on("selectstart.nui", !1))
        }

        function v(t) {
            var r = t.l, s = 0;
            t.stopPropagation();
            e.each(E, function () {
                s += this.offset()[n.style]
            });
            s = r < s / 2 || 1 === E.length ? 0 : 1;
            r -= b.offset()[n.style];
            r = 100 * r / i();
            l(E[s], r, n.n.m);
            n.n.m && d(t, {a: [E[s]]})
        }

        function m(e) {
            var t = (e = e.l < b.offset()[n.style]) ? 0 : 100;
            e = e ? 0 : E.length - 1;
            l(E[e], t, !1)
        }

        var g = e(t), y = [-1, -1], b, w, E;
        b = k(n, g);
        E = C(n, b);
        w = T(n, E);
        N(n.i, g, E);
        (function (e) {
            var t;
            if (!e.fixed) for (t = 0; t < E.length; t++) c(D.start, E[t].children(), d, {a: [E[t]]});
            e.p && c(D.start, b, v, {a: E});
            e.extend && (g.addClass(P[16]), e.p && c(D.start, g, m, {a: E}));
            e.s && (t = b.find("." + P[7]).addClass(P[10]), e.fixed && (t = t.add(b.children().not(t).children())), c(D.start, t, d, {a: E}))
        })(n.n);
        t.F = function (t, r, i, a, l) {
            var c;
            n.dir && 1 < n.a && t.reverse();
            l && s(g, P[14]);
            for (c = 0; c < (1 < E.length ? 3 : 1); c++) l = i || w[c % 2][0], l = l.valueOf(t[c % 2]), !1 !== l && (l = u(n, l), n.dir && (l = 100 - l), !0 !== f(E[c % 2], l, !0) && e(w[c % 2]).each(function () {
                this.write(n, y[c % 2], E[c % 2].children(), g, a)
            }));
            !0 === r && o(["set"])
        };
        t.D = function () {
            var e, t = [];
            for (e = 0; e < n.a; e++) t[e] = w[e][0].A;
            return 1 === t.length ? t[0] : n.dir && 1 < n.a ? t.reverse() : t
        };
        t.r = function () {
            e.each(w, function () {
                e.each(this, function () {
                    this.target && this.target.off(".nui")
                })
            });
            e(this).off(".nui").removeClass(P.join(" ")).empty();
            return r
        };
        g.val(n.start)
    }

    function A(e) {
        this.length || t("Can't initialize slider on empty selection.");
        var n = E(e, this);
        return this.each(function () {
            L(this, n, e)
        })
    }

    function O(t) {
        return this.each(function () {
            var n = e(this).val(), r = this.r(), i = e.extend({}, r, t);
            e(this).noUiSlider(i);
            r.start === i.start && e(this).val(n)
        })
    }

    var M = e(document), _ = e.fn.val, D = window.navigator.G ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend"},
        P = "noUi-target noUi-base noUi-origin noUi-handle noUi-horizontal noUi-vertical noUi-background noUi-connect noUi-ltr noUi-rtl noUi-dragable  noUi-state-drag  noUi-state-tap noUi-active noUi-extended noUi-stacking".split(" "),
        H = "decimals mark thousand prefix postfix encoder decoder negative negativeBefore".split(" "),
        B = [2, ".", "", "", "", function (e) {
            return e
        }, function (e) {
            return e
        }, "-", ""];
    f.prototype.b = function (e) {
        return this.B[e]
    };
    f.prototype.C = function (e) {
        function t(e) {
            return e.split("").reverse().join("")
        }

        e = this.b("encoder")(e);
        var n = "", r = "", i = "", s = "";
        0 > e && (n = this.b("negative"), r = this.b("negativeBefore"));
        e = Math.abs(e).toFixed(this.b("decimals")).toString();
        e = e.split(".");
        0 === parseFloat(e) && (e[0] = "0");
        this.b("thousand") ? (i = t(e[0]).match(/.{1,3}/g), i = t(i.join(t(this.b("thousand"))))) : i = e[0];
        this.b("mark") && 1 < e.length && (s = this.b("mark") + e[1]);
        return r + this.b("prefix") + n + i + s + this.b("postfix")
    };
    f.prototype.t = function (e) {
        function t(e) {
            return e.replace(/[\-\/\\\^$*+?.()|\[\]{}]/g, "\\$&")
        }

        var n;
        if (null === e || void 0 === e) return !1;
        e = e.toString();
        n = e.replace(RegExp("^" + t(this.b("negativeBefore"))), "");
        e !== n ? (e = n, n = "-") : n = "";
        e = e.replace(RegExp("^" + t(this.b("prefix"))), "");
        this.b.negative && (n = "", e = e.replace(RegExp("^" + t(this.b("negative"))), "-"));
        e = e.replace(RegExp(t(this.b("postfix")) + "$"), "").replace(RegExp(t(this.b("thousand")), "g"), "").replace(this.b("mark"), ".");
        e = this.b("decoder")(parseFloat(n + e));
        return isNaN(e) ? !1 : e
    };
    l.prototype.write = function (e, t, n, r, i) {
        if (!this.update || !1 !== i) {
            if (100 <= t) t = e.d.slice(-1)[0]; else {
                i = 1;
                for (var s, o, u; t >= e.c[i];) i++;
                s = e.d[i - 1];
                o = e.d[i];
                u = e.c[i - 1];
                s = [s, o];
                t = 100 / (e.c[i] - u) * (t - u) * (s[1] - s[0]) / 100 + s[0]
            }
            this.A = t = this.format(t);
            if ("function" === typeof this.method) this.method.call(this.target[0] || r[0], t, n, r); else this.target[this.method](t, n, r)
        }
    };
    l.prototype.format = function (e) {
        return this.g.C(e)
    };
    l.prototype.valueOf = function (e) {
        return this.g.t(e)
    };
    e.noUiSlider = {Link: l};
    e.fn.noUiSlider = function (e, t) {
        return (t ? O : A).call(this, e)
    };
    e.fn.val = function () {
        var t = Array.prototype.slice.call(arguments, 0), n, r, s, o;
        if (!t.length) return this.hasClass(P[0]) ? this[0].D() : _.apply(this);
        "object" === typeof t[1] ? (n = t[1].set, r = t[1].link, s = t[1].update, o = t[1].animate) : !0 === t[1] && (n = !0);
        return this.each(function () {
            e(this).hasClass(P[0]) ? this.F(i(t[0]), n, r, s, o) : _.apply(e(this), t)
        })
    }
})(window.jQuery || window.Zepto);

/*!jQuery Knob*/
/*
 * Downward compatible, touchable dial
 *
 * Version: 1.2.8
 *
 * Copyright (c) 2012 Anthony Terrien
 * Under MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Thanks to vor, eskimoblood, spiffistan, FabrizioC
 */
(function (e) {
    "use strict";
    var t = {}, n = Math.max, r = Math.min;
    t.c = {};
    t.c.d = e(document);
    t.c.t = function (e) {
        return e.originalEvent.touches.length - 1
    };
    t.o = function () {
        var n = this;
        this.o = null;
        this.$ = null;
        this.i = null;
        this.g = null;
        this.v = null;
        this.cv = null;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.$c = null;
        this.c = null;
        this.t = 0;
        this.isInit = false;
        this.fgColor = null;
        this.pColor = null;
        this.dH = null;
        this.cH = null;
        this.eH = null;
        this.rH = null;
        this.scale = 1;
        this.relative = false;
        this.relativeWidth = false;
        this.relativeHeight = false;
        this.$div = null;
        this.run = function () {
            var t = function (e, t) {
                var r;
                for (r in t) {
                    n.o[r] = t[r]
                }
                n._carve().init();
                n._configure()._draw()
            };
            if (this.$.data("kontroled")) return;
            this.$.data("kontroled", true);
            this.extend();
            this.o = e.extend({
                min: this.$.data("min") !== undefined ? this.$.data("min") : 0,
                max: this.$.data("max") !== undefined ? this.$.data("max") : 100,
                stopper: true,
                readOnly: this.$.data("readonly") || this.$.attr("readonly") === "readonly",
                cursor: this.$.data("cursor") === true && 30 || this.$.data("cursor") || 0,
                thickness: this.$.data("thickness") && Math.max(Math.min(this.$.data("thickness"), 1), .01) || .35,
                lineCap: this.$.data("linecap") || "butt",
                width: this.$.data("width") || 200,
                height: this.$.data("height") || 200,
                displayInput: this.$.data("displayinput") == null || this.$.data("displayinput"),
                displayPrevious: this.$.data("displayprevious"),
                fgColor: this.$.data("fgcolor") || "#87CEEB",
                inputColor: this.$.data("inputcolor"),
                font: this.$.data("font") || "Arial",
                fontWeight: this.$.data("font-weight") || "bold",
                inline: false,
                step: this.$.data("step") || 1,
                rotation: this.$.data("rotation"),
                draw: null,
                change: null,
                cancel: null,
                release: null,
                format: function (e) {
                    return e
                },
                parse: function (e) {
                    return parseFloat(e)
                }
            }, this.o);
            this.o.flip = this.o.rotation === "anticlockwise" || this.o.rotation === "acw";
            if (!this.o.inputColor) {
                this.o.inputColor = this.o.fgColor
            }
            if (this.$.is("fieldset")) {
                this.v = {};
                this.i = this.$.find("input");
                this.i.each(function (t) {
                    var r = e(this);
                    n.i[t] = r;
                    n.v[t] = n.o.parse(r.val());
                    r.bind("change blur", function () {
                        var e = {};
                        e[t] = r.val();
                        n.val(e)
                    })
                });
                this.$.find("legend").remove()
            } else {
                this.i = this.$;
                this.v = this.o.parse(this.$.val());
                this.v === "" && (this.v = this.o.min);
                this.$.bind("change blur", function () {
                    n.val(n._validate(n.o.parse(n.$.val())))
                })
            }
            !this.o.displayInput && this.$.hide();
            this.$c = e(document.createElement("canvas")).attr({width: this.o.width, height: this.o.height});
            this.$div = e('<div style="' + (this.o.inline ? "display:inline;" : "") + "width:" + this.o.width + "px;height:" + this.o.height + "px;" + '"></div>');
            this.$.wrap(this.$div).before(this.$c);
            this.$div = this.$.parent();
            if (typeof G_vmlCanvasManager !== "undefined") {
                G_vmlCanvasManager.initElement(this.$c[0])
            }
            this.c = this.$c[0].getContext ? this.$c[0].getContext("2d") : null;
            if (!this.c) {
                throw{
                    name: "CanvasNotSupportedException",
                    message: "Canvas not supported. Please use excanvas on IE8.0.",
                    toString: function () {
                        return this.name + ": " + this.message
                    }
                }
            }
            this.scale = (window.devicePixelRatio || 1) / (this.c.webkitBackingStorePixelRatio || this.c.mozBackingStorePixelRatio || this.c.msBackingStorePixelRatio || this.c.oBackingStorePixelRatio || this.c.backingStorePixelRatio || 1);
            this.relativeWidth = this.o.width % 1 !== 0 && this.o.width.indexOf("%");
            this.relativeHeight = this.o.height % 1 !== 0 && this.o.height.indexOf("%");
            this.relative = this.relativeWidth || this.relativeHeight;
            this._carve();
            if (this.v instanceof Object) {
                this.cv = {};
                this.copy(this.v, this.cv)
            } else {
                this.cv = this.v
            }
            this.$.bind("configure", t).parent().bind("configure", t);
            this._listen()._configure()._xy().init();
            this.isInit = true;
            this.$.val(this.o.format(this.v));
            this._draw();
            return this
        };
        this._carve = function () {
            if (this.relative) {
                var e = this.relativeWidth ? this.$div.parent().width() * parseInt(this.o.width) / 100 : this.$div.parent().width(),
                    t = this.relativeHeight ? this.$div.parent().height() * parseInt(this.o.height) / 100 : this.$div.parent().height();
                this.w = this.h = Math.min(e, t)
            } else {
                this.w = this.o.width;
                this.h = this.o.height
            }
            this.$div.css({width: this.w + "px", height: this.h + "px"});
            this.$c.attr({width: this.w, height: this.h});
            if (this.scale !== 1) {
                this.$c[0].width = this.$c[0].width * this.scale;
                this.$c[0].height = this.$c[0].height * this.scale;
                this.$c.width(this.w);
                this.$c.height(this.h)
            }
            return this
        };
        this._draw = function () {
            var e = true;
            n.g = n.c;
            n.clear();
            n.dH && (e = n.dH());
            e !== false && n.draw()
        };
        this._touch = function (e) {
            var r = function (e) {
                var t = n.xy2val(e.originalEvent.touches[n.t].pageX, e.originalEvent.touches[n.t].pageY);
                if (t == n.cv) return;
                if (n.cH && n.cH(t) === false) return;
                n.change(n._validate(t));
                n._draw()
            };
            this.t = t.c.t(e);
            r(e);
            t.c.d.bind("touchmove.k", r).bind("touchend.k", function () {
                t.c.d.unbind("touchmove.k touchend.k");
                n.val(n.cv)
            });
            return this
        };
        this._mouse = function (e) {
            var r = function (e) {
                var t = n.xy2val(e.pageX, e.pageY);
                if (t == n.cv) return;
                if (n.cH && n.cH(t) === false) return;
                n.change(n._validate(t));
                n._draw()
            };
            r(e);
            t.c.d.bind("mousemove.k", r).bind("keyup.k", function (e) {
                if (e.keyCode === 27) {
                    t.c.d.unbind("mouseup.k mousemove.k keyup.k");
                    if (n.eH && n.eH() === false) return;
                    n.cancel()
                }
            }).bind("mouseup.k", function (e) {
                t.c.d.unbind("mousemove.k mouseup.k keyup.k");
                n.val(n.cv)
            });
            return this
        };
        this._xy = function () {
            var e = this.$c.offset();
            this.x = e.left;
            this.y = e.top;
            return this
        };
        this._listen = function () {
            if (!this.o.readOnly) {
                this.$c.bind("mousedown", function (e) {
                    e.preventDefault();
                    n._xy()._mouse(e)
                }).bind("touchstart", function (e) {
                    e.preventDefault();
                    n._xy()._touch(e)
                });
                this.listen()
            } else {
                this.$.attr("readonly", "readonly")
            }
            if (this.relative) {
                e(window).resize(function () {
                    n._carve().init();
                    n._draw()
                })
            }
            return this
        };
        this._configure = function () {
            if (this.o.draw) this.dH = this.o.draw;
            if (this.o.change) this.cH = this.o.change;
            if (this.o.cancel) this.eH = this.o.cancel;
            if (this.o.release) this.rH = this.o.release;
            if (this.o.displayPrevious) {
                this.pColor = this.h2rgba(this.o.fgColor, "0.4");
                this.fgColor = this.h2rgba(this.o.fgColor, "0.6")
            } else {
                this.fgColor = this.o.fgColor
            }
            return this
        };
        this._clear = function () {
            this.$c[0].width = this.$c[0].width
        };
        this._validate = function (e) {
            return ~~((e < 0 ? -.5 : .5) + e / this.o.step) * this.o.step
        };
        this.listen = function () {
        };
        this.extend = function () {
        };
        this.init = function () {
        };
        this.change = function (e) {
        };
        this.val = function (e) {
        };
        this.xy2val = function (e, t) {
        };
        this.draw = function () {
        };
        this.clear = function () {
            this._clear()
        };
        this.h2rgba = function (e, t) {
            var n;
            e = e.substring(1, 7);
            n = [parseInt(e.substring(0, 2), 16), parseInt(e.substring(2, 4), 16), parseInt(e.substring(4, 6), 16)];
            return "rgba(" + n[0] + "," + n[1] + "," + n[2] + "," + t + ")"
        };
        this.copy = function (e, t) {
            for (var n in e) {
                t[n] = e[n]
            }
        }
    };
    t.Dial = function () {
        t.o.call(this);
        this.startAngle = null;
        this.xy = null;
        this.radius = null;
        this.lineWidth = null;
        this.cursorExt = null;
        this.w2 = null;
        this.PI2 = 2 * Math.PI;
        this.extend = function () {
            this.o = e.extend({
                bgColor: this.$.data("bgcolor") || "#FFFFFF",
                angleOffset: this.$.data("angleoffset") || 0,
                angleArc: this.$.data("anglearc") || 360,
                inline: true
            }, this.o)
        };
        this.val = function (e, t) {
            if (null != e) {
                e = this.o.parse(e);
                if (t !== false && e != this.v && this.rH && this.rH(e) === false) return;
                this.cv = this.o.stopper ? n(r(e, this.o.max), this.o.min) : e;
                this.v = this.cv;
                this.$.val(this.o.format(this.v));
                this._draw()
            } else {
                return this.v
            }
        };
        this.xy2val = function (e, t) {
            var i, s;
            i = Math.atan2(e - (this.x + this.w2), -(t - this.y - this.w2)) - this.angleOffset;
            if (this.o.flip) {
                i = this.angleArc - i - this.PI2
            }
            if (this.angleArc != this.PI2 && i < 0 && i > -.5) {
                i = 0
            } else if (i < 0) {
                i += this.PI2
            }
            s = ~~(.5 + i * (this.o.max - this.o.min) / this.angleArc) + this.o.min;
            this.o.stopper && (s = n(r(s, this.o.max), this.o.min));
            return s
        };
        this.listen = function () {
            var t = this, i, s, o = function (e) {
                e.preventDefault();
                var o = e.originalEvent, u = o.detail || o.wheelDeltaX, a = o.detail || o.wheelDeltaY,
                    f = t._validate(t.o.parse(t.$.val())) + (u > 0 || a > 0 ? t.o.step : u < 0 || a < 0 ? -t.o.step : 0);
                f = n(r(f, t.o.max), t.o.min);
                t.val(f, false);
                if (t.rH) {
                    clearTimeout(i);
                    i = setTimeout(function () {
                        t.rH(f);
                        i = null
                    }, 100);
                    if (!s) {
                        s = setTimeout(function () {
                            if (i) t.rH(f);
                            s = null
                        }, 200)
                    }
                }
            }, u, a, f = 1, l = {37: -t.o.step, 38: t.o.step, 39: t.o.step, 40: -t.o.step};
            this.$.bind("keydown", function (i) {
                var s = i.keyCode;
                if (s >= 96 && s <= 105) {
                    s = i.keyCode = s - 48
                }
                u = parseInt(String.fromCharCode(s));
                if (isNaN(u)) {
                    s !== 13 && s !== 8 && s !== 9 && s !== 189 && (s !== 190 || t.$.val().match(/\./)) && i.preventDefault();
                    if (e.inArray(s, [37, 38, 39, 40]) > -1) {
                        i.preventDefault();
                        var o = t.o.parse(t.$.val()) + l[s] * f;
                        t.o.stopper && (o = n(r(o, t.o.max), t.o.min));
                        t.change(o);
                        t._draw();
                        a = window.setTimeout(function () {
                            f *= 2
                        }, 30)
                    }
                }
            }).bind("keyup", function (e) {
                if (isNaN(u)) {
                    if (a) {
                        window.clearTimeout(a);
                        a = null;
                        f = 1;
                        t.val(t.$.val())
                    }
                } else {
                    t.$.val() > t.o.max && t.$.val(t.o.max) || t.$.val() < t.o.min && t.$.val(t.o.min)
                }
            });
            this.$c.bind("mousewheel DOMMouseScroll", o);
            this.$.bind("mousewheel DOMMouseScroll", o)
        };
        this.init = function () {
            if (this.v < this.o.min || this.v > this.o.max) this.v = this.o.min;
            this.$.val(this.v);
            this.w2 = this.w / 2;
            this.cursorExt = this.o.cursor / 100;
            this.xy = this.w2 * this.scale;
            this.lineWidth = this.xy * this.o.thickness;
            this.lineCap = this.o.lineCap;
            this.radius = this.xy - this.lineWidth / 2;
            this.o.angleOffset && (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset);
            this.o.angleArc && (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc);
            this.angleOffset = this.o.angleOffset * Math.PI / 180;
            this.angleArc = this.o.angleArc * Math.PI / 180;
            this.startAngle = 1.5 * Math.PI + this.angleOffset;
            this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;
            var e = n(String(Math.abs(this.o.max)).length, String(Math.abs(this.o.min)).length, 2) + 2;
            this.o.displayInput && this.i.css({
                width: (this.w / 2 + 4 >> 0) + "px",
                height: (this.w / 3 >> 0) + "px",
                position: "absolute",
                "vertical-align": "middle",
                "margin-top": (this.w / 3 >> 0) + "px",
                "margin-left": "-" + (this.w * 3 / 4 + 2 >> 0) + "px",
                border: 0,
                background: "none",
                font: this.o.fontWeight + " " + (this.w / e >> 0) + "px " + this.o.font,
                "text-align": "center",
                color: this.o.inputColor || this.o.fgColor,
                padding: "0px",
                "-webkit-appearance": "none"
            }) || this.i.css({width: "0px", visibility: "hidden"})
        };
        this.change = function (e) {
            this.cv = e;
            this.$.val(this.o.format(e))
        };
        this.angle = function (e) {
            return (e - this.o.min) * this.angleArc / (this.o.max - this.o.min)
        };
        this.arc = function (e) {
            var t, n;
            e = this.angle(e);
            if (this.o.flip) {
                t = this.endAngle + 1e-5;
                n = t - e - 1e-5
            } else {
                t = this.startAngle - 1e-5;
                n = t + e + 1e-5
            }
            this.o.cursor && (t = n - this.cursorExt) && (n = n + this.cursorExt);
            return {s: t, e: n, d: this.o.flip && !this.o.cursor}
        };
        this.draw = function () {
            var e = this.g, t = this.arc(this.cv), n, r = 1;
            e.lineWidth = this.lineWidth;
            e.lineCap = this.lineCap;
            if (this.o.displayPrevious) {
                n = this.arc(this.v);
                e.beginPath();
                e.strokeStyle = this.pColor;
                e.arc(this.xy, this.xy, this.radius, n.s, n.e, n.d);
                e.stroke();
                r = this.cv == this.v
            }
            e.beginPath();
            e.strokeStyle = r ? this.o.fgColor : this.fgColor;
            e.arc(this.xy, this.xy, this.radius, t.s, t.e, t.d);
            e.stroke()
        };
        this.cancel = function () {
            this.val(this.v)
        }
    };
    e.fn.dial = e.fn.knob = function (n) {
        return this.each(function () {
            var r = new t.Dial;
            r.o = n;
            r.$ = e(this);
            r.run()
        }).parent()
    }
})(jQuery);

/*
* jQuery Form Plugin; v20131228
* http://jquery.malsup.com/form/
* Copyright (c) 2013 M. Alsup; Dual licensed: MIT/GPL
* https://github.com/malsup/form#copyright-and-license
*/
;!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function (a) {
    "use strict";

    function b(b) {
        var c = b.data;
        b.isDefaultPrevented() || (b.preventDefault(), a(b.target).ajaxSubmit(c))
    }

    function c(b) {
        var c = b.target, d = a(c);
        if (!d.is("[type=submit],[type=image]")) {
            var e = d.closest("[type=submit]");
            if (0 === e.length) return;
            c = e[0]
        }
        var f = this;
        if (f.clk = c, "image" == c.type) if (void 0 !== b.offsetX) f.clk_x = b.offsetX, f.clk_y = b.offsetY; else if ("function" == typeof a.fn.offset) {
            var g = d.offset();
            f.clk_x = b.pageX - g.left, f.clk_y = b.pageY - g.top
        } else f.clk_x = b.pageX - c.offsetLeft, f.clk_y = b.pageY - c.offsetTop;
        setTimeout(function () {
            f.clk = f.clk_x = f.clk_y = null
        }, 100)
    }

    function d() {
        if (a.fn.ajaxSubmit.debug) {
            var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(b) : window.opera && window.opera.postError && window.opera.postError(b)
        }
    }

    var e = {};
    e.fileapi = void 0 !== a("<input type='file'/>").get(0).files, e.formdata = void 0 !== window.FormData;
    var f = !!a.fn.prop;
    a.fn.attr2 = function () {
        if (!f) return this.attr.apply(this, arguments);
        var a = this.prop.apply(this, arguments);
        return a && a.jquery || "string" == typeof a ? a : this.attr.apply(this, arguments)
    }, a.fn.ajaxSubmit = function (b) {
        function c(c) {
            var d, e, f = a.param(c, b.traditional).split("&"), g = f.length, h = [];
            for (d = 0; g > d; d++) f[d] = f[d].replace(/\+/g, " "), e = f[d].split("="), h.push([decodeURIComponent(e[0]), decodeURIComponent(e[1])]);
            return h
        }

        function g(d) {
            for (var e = new FormData, f = 0; f < d.length; f++) e.append(d[f].name, d[f].value);
            if (b.extraData) {
                var g = c(b.extraData);
                for (f = 0; f < g.length; f++) g[f] && e.append(g[f][0], g[f][1])
            }
            b.data = null;
            var h = a.extend(!0, {}, a.ajaxSettings, b, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: i || "POST"
            });
            b.uploadProgress && (h.xhr = function () {
                var c = a.ajaxSettings.xhr();
                return c.upload && c.upload.addEventListener("progress", function (a) {
                    var c = 0, d = a.loaded || a.position, e = a.total;
                    a.lengthComputable && (c = Math.ceil(d / e * 100)), b.uploadProgress(a, d, e, c)
                }, !1), c
            }), h.data = null;
            var j = h.beforeSend;
            return h.beforeSend = function (a, c) {
                c.data = b.formData ? b.formData : e, j && j.call(this, a, c)
            }, a.ajax(h)
        }

        function h(c) {
            function e(a) {
                var b = null;
                try {
                    a.contentWindow && (b = a.contentWindow.document)
                } catch (c) {
                    d("cannot get iframe.contentWindow document: " + c)
                }
                if (b) return b;
                try {
                    b = a.contentDocument ? a.contentDocument : a.document
                } catch (c) {
                    d("cannot get iframe.contentDocument: " + c), b = a.document
                }
                return b
            }

            function g() {
                function b() {
                    try {
                        var a = e(r).readyState;
                        d("state = " + a), a && "uninitialized" == a.toLowerCase() && setTimeout(b, 50)
                    } catch (c) {
                        d("Server abort: ", c, " (", c.name, ")"), h(A), w && clearTimeout(w), w = void 0
                    }
                }

                var c = l.attr2("target"), f = l.attr2("action"), g = "multipart/form-data",
                    j = l.attr("enctype") || l.attr("encoding") || g;
                x.setAttribute("target", o), (!i || /post/i.test(i)) && x.setAttribute("method", "POST"), f != m.url && x.setAttribute("action", m.url), m.skipEncodingOverride || i && !/post/i.test(i) || l.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), m.timeout && (w = setTimeout(function () {
                    v = !0, h(z)
                }, m.timeout));
                var k = [];
                try {
                    if (m.extraData) for (var n in m.extraData) m.extraData.hasOwnProperty(n) && (a.isPlainObject(m.extraData[n]) && m.extraData[n].hasOwnProperty("name") && m.extraData[n].hasOwnProperty("value") ? k.push(a('<input type="hidden" name="' + m.extraData[n].name + '">').val(m.extraData[n].value).appendTo(x)[0]) : k.push(a('<input type="hidden" name="' + n + '">').val(m.extraData[n]).appendTo(x)[0]));
                    m.iframeTarget || q.appendTo("body"), r.attachEvent ? r.attachEvent("onload", h) : r.addEventListener("load", h, !1), setTimeout(b, 15);
                    try {
                        x.submit()
                    } catch (p) {
                        var s = document.createElement("form").submit;
                        s.apply(x)
                    }
                } finally {
                    x.setAttribute("action", f), x.setAttribute("enctype", j), c ? x.setAttribute("target", c) : l.removeAttr("target"), a(k).remove()
                }
            }

            function h(b) {
                if (!s.aborted && !F) {
                    if (E = e(r), E || (d("cannot access response document"), b = A), b === z && s) return s.abort("timeout"), y.reject(s, "timeout"), void 0;
                    if (b == A && s) return s.abort("server abort"), y.reject(s, "error", "server abort"), void 0;
                    if (E && E.location.href != m.iframeSrc || v) {
                        r.detachEvent ? r.detachEvent("onload", h) : r.removeEventListener("load", h, !1);
                        var c, f = "success";
                        try {
                            if (v) throw"timeout";
                            var g = "xml" == m.dataType || E.XMLDocument || a.isXMLDoc(E);
                            if (d("isXml=" + g), !g && window.opera && (null === E.body || !E.body.innerHTML) && --G) return d("requeing onLoad callback, DOM not available"), setTimeout(h, 250), void 0;
                            var i = E.body ? E.body : E.documentElement;
                            s.responseText = i ? i.innerHTML : null, s.responseXML = E.XMLDocument ? E.XMLDocument : E, g && (m.dataType = "xml"), s.getResponseHeader = function (a) {
                                var b = {"content-type": m.dataType};
                                return b[a.toLowerCase()]
                            }, i && (s.status = Number(i.getAttribute("status")) || s.status, s.statusText = i.getAttribute("statusText") || s.statusText);
                            var j = (m.dataType || "").toLowerCase(), k = /(json|script|text)/.test(j);
                            if (k || m.textarea) {
                                var l = E.getElementsByTagName("textarea")[0];
                                if (l) s.responseText = l.value, s.status = Number(l.getAttribute("status")) || s.status, s.statusText = l.getAttribute("statusText") || s.statusText; else if (k) {
                                    var o = E.getElementsByTagName("pre")[0], p = E.getElementsByTagName("body")[0];
                                    o ? s.responseText = o.textContent ? o.textContent : o.innerText : p && (s.responseText = p.textContent ? p.textContent : p.innerText)
                                }
                            } else "xml" == j && !s.responseXML && s.responseText && (s.responseXML = H(s.responseText));
                            try {
                                D = J(s, j, m)
                            } catch (t) {
                                f = "parsererror", s.error = c = t || f
                            }
                        } catch (t) {
                            d("error caught: ", t), f = "error", s.error = c = t || f
                        }
                        s.aborted && (d("upload aborted"), f = null), s.status && (f = s.status >= 200 && s.status < 300 || 304 === s.status ? "success" : "error"), "success" === f ? (m.success && m.success.call(m.context, D, "success", s), y.resolve(s.responseText, "success", s), n && a.event.trigger("ajaxSuccess", [s, m])) : f && (void 0 === c && (c = s.statusText), m.error && m.error.call(m.context, s, f, c), y.reject(s, "error", c), n && a.event.trigger("ajaxError", [s, m, c])), n && a.event.trigger("ajaxComplete", [s, m]), n && !--a.active && a.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, s, f), F = !0, m.timeout && clearTimeout(w), setTimeout(function () {
                            m.iframeTarget ? q.attr("src", m.iframeSrc) : q.remove(), s.responseXML = null
                        }, 100)
                    }
                }
            }

            var j, k, m, n, o, q, r, s, t, u, v, w, x = l[0], y = a.Deferred();
            if (y.abort = function (a) {
                s.abort(a)
            }, c) for (k = 0; k < p.length; k++) j = a(p[k]), f ? j.prop("disabled", !1) : j.removeAttr("disabled");
            if (m = a.extend(!0, {}, a.ajaxSettings, b), m.context = m.context || m, o = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (q = a(m.iframeTarget), u = q.attr2("name"), u ? o = u : q.attr2("name", o)) : (q = a('<iframe name="' + o + '" src="' + m.iframeSrc + '" />'), q.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            })), r = q[0], s = {
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function () {
                },
                getResponseHeader: function () {
                },
                setRequestHeader: function () {
                },
                abort: function (b) {
                    var c = "timeout" === b ? "timeout" : "aborted";
                    d("aborting upload... " + c), this.aborted = 1;
                    try {
                        r.contentWindow.document.execCommand && r.contentWindow.document.execCommand("Stop")
                    } catch (e) {
                    }
                    q.attr("src", m.iframeSrc), s.error = c, m.error && m.error.call(m.context, s, c, b), n && a.event.trigger("ajaxError", [s, m, c]), m.complete && m.complete.call(m.context, s, c)
                }
            }, n = m.global, n && 0 === a.active++ && a.event.trigger("ajaxStart"), n && a.event.trigger("ajaxSend", [s, m]), m.beforeSend && m.beforeSend.call(m.context, s, m) === !1) return m.global && a.active--, y.reject(), y;
            if (s.aborted) return y.reject(), y;
            t = x.clk, t && (u = t.name, u && !t.disabled && (m.extraData = m.extraData || {}, m.extraData[u] = t.value, "image" == t.type && (m.extraData[u + ".x"] = x.clk_x, m.extraData[u + ".y"] = x.clk_y)));
            var z = 1, A = 2, B = a("meta[name=csrf-token]").attr("content"),
                C = a("meta[name=csrf-param]").attr("content");
            C && B && (m.extraData = m.extraData || {}, m.extraData[C] = B), m.forceSync ? g() : setTimeout(g, 10);
            var D, E, F, G = 50, H = a.parseXML || function (a, b) {
                return window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a, "text/xml"), b && b.documentElement && "parsererror" != b.documentElement.nodeName ? b : null
            }, I = a.parseJSON || function (a) {
                return window.eval("(" + a + ")")
            }, J = function (b, c, d) {
                var e = b.getResponseHeader("content-type") || "", f = "xml" === c || !c && e.indexOf("xml") >= 0,
                    g = f ? b.responseXML : b.responseText;
                return f && "parsererror" === g.documentElement.nodeName && a.error && a.error("parsererror"), d && d.dataFilter && (g = d.dataFilter(g, c)), "string" == typeof g && ("json" === c || !c && e.indexOf("json") >= 0 ? g = I(g) : ("script" === c || !c && e.indexOf("javascript") >= 0) && a.globalEval(g)), g
            };
            return y
        }

        if (!this.length) return d("ajaxSubmit: skipping submit process - no element selected"), this;
        var i, j, k, l = this;
        "function" == typeof b ? b = {success: b} : void 0 === b && (b = {}), i = b.type || this.attr2("method"), j = b.url || this.attr2("action"), k = "string" == typeof j ? a.trim(j) : "", k = k || window.location.href || "", k && (k = (k.match(/^([^#]+)/) || [])[1]), b = a.extend(!0, {
            url: k,
            success: a.ajaxSettings.success,
            type: i || a.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, b);
        var m = {};
        if (this.trigger("form-pre-serialize", [this, b, m]), m.veto) return d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (b.beforeSerialize && b.beforeSerialize(this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var n = b.traditional;
        void 0 === n && (n = a.ajaxSettings.traditional);
        var o, p = [], q = this.formToArray(b.semantic, p);
        if (b.data && (b.extraData = b.data, o = a.param(b.data, n)), b.beforeSubmit && b.beforeSubmit(q, this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [q, this, b, m]), m.veto) return d("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var r = a.param(q, n);
        o && (r = r ? r + "&" + o : o), "GET" == b.type.toUpperCase() ? (b.url += (b.url.indexOf("?") >= 0 ? "&" : "?") + r, b.data = null) : b.data = r;
        var s = [];
        if (b.resetForm && s.push(function () {
            l.resetForm()
        }), b.clearForm && s.push(function () {
            l.clearForm(b.includeHidden)
        }), !b.dataType && b.target) {
            var t = b.success || function () {
            };
            s.push(function (c) {
                var d = b.replaceTarget ? "replaceWith" : "html";
                a(b.target)[d](c).each(t, arguments)
            })
        } else b.success && s.push(b.success);
        if (b.success = function (a, c, d) {
            for (var e = b.context || this, f = 0, g = s.length; g > f; f++) s[f].apply(e, [a, c, d || l, l])
        }, b.error) {
            var u = b.error;
            b.error = function (a, c, d) {
                var e = b.context || this;
                u.apply(e, [a, c, d, l])
            }
        }
        if (b.complete) {
            var v = b.complete;
            b.complete = function (a, c) {
                var d = b.context || this;
                v.apply(d, [a, c, l])
            }
        }
        var w = a("input[type=file]:enabled", this).filter(function () {
                return "" !== a(this).val()
            }), x = w.length > 0, y = "multipart/form-data", z = l.attr("enctype") == y || l.attr("encoding") == y,
            A = e.fileapi && e.formdata;
        d("fileAPI :" + A);
        var B, C = (x || z) && !A;
        b.iframe !== !1 && (b.iframe || C) ? b.closeKeepAlive ? a.get(b.closeKeepAlive, function () {
            B = h(q)
        }) : B = h(q) : B = (x || z) && A ? g(q) : a.ajax(b), l.removeData("jqxhr").data("jqxhr", B);
        for (var D = 0; D < p.length; D++) p[D] = null;
        return this.trigger("form-submit-notify", [this, b]), this
    }, a.fn.ajaxForm = function (e) {
        if (e = e || {}, e.delegation = e.delegation && a.isFunction(a.fn.on), !e.delegation && 0 === this.length) {
            var f = {s: this.selector, c: this.context};
            return !a.isReady && f.s ? (d("DOM not ready, queuing ajaxForm"), a(function () {
                a(f.s, f.c).ajaxForm(e)
            }), this) : (d("terminating; zero elements found by selector" + (a.isReady ? "" : " (DOM not ready)")), this)
        }
        return e.delegation ? (a(document).off("submit.form-plugin", this.selector, b).off("click.form-plugin", this.selector, c).on("submit.form-plugin", this.selector, e, b).on("click.form-plugin", this.selector, e, c), this) : this.ajaxFormUnbind().bind("submit.form-plugin", e, b).bind("click.form-plugin", e, c)
    }, a.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, a.fn.formToArray = function (b, c) {
        var d = [];
        if (0 === this.length) return d;
        var f, g = this[0], h = this.attr("id"), i = b ? g.getElementsByTagName("*") : g.elements;
        if (i && (i = a(i).get()), h && (f = a(":input[form=" + h + "]").get(), f.length && (i = (i || []).concat(f))), !i || !i.length) return d;
        var j, k, l, m, n, o, p;
        for (j = 0, o = i.length; o > j; j++) if (n = i[j], l = n.name, l && !n.disabled) if (b && g.clk && "image" == n.type) g.clk == n && (d.push({
            name: l,
            value: a(n).val(),
            type: n.type
        }), d.push({name: l + ".x", value: g.clk_x}, {
            name: l + ".y",
            value: g.clk_y
        })); else if (m = a.fieldValue(n, !0), m && m.constructor == Array) for (c && c.push(n), k = 0, p = m.length; p > k; k++) d.push({
            name: l,
            value: m[k]
        }); else if (e.fileapi && "file" == n.type) {
            c && c.push(n);
            var q = n.files;
            if (q.length) for (k = 0; k < q.length; k++) d.push({
                name: l,
                value: q[k],
                type: n.type
            }); else d.push({name: l, value: "", type: n.type})
        } else null !== m && "undefined" != typeof m && (c && c.push(n), d.push({
            name: l,
            value: m,
            type: n.type,
            required: n.required
        }));
        if (!b && g.clk) {
            var r = a(g.clk), s = r[0];
            l = s.name, l && !s.disabled && "image" == s.type && (d.push({
                name: l,
                value: r.val()
            }), d.push({name: l + ".x", value: g.clk_x}, {name: l + ".y", value: g.clk_y}))
        }
        return d
    }, a.fn.formSerialize = function (b) {
        return a.param(this.formToArray(b))
    }, a.fn.fieldSerialize = function (b) {
        var c = [];
        return this.each(function () {
            var d = this.name;
            if (d) {
                var e = a.fieldValue(this, b);
                if (e && e.constructor == Array) for (var f = 0, g = e.length; g > f; f++) c.push({
                    name: d,
                    value: e[f]
                }); else null !== e && "undefined" != typeof e && c.push({name: this.name, value: e})
            }
        }), a.param(c)
    }, a.fn.fieldValue = function (b) {
        for (var c = [], d = 0, e = this.length; e > d; d++) {
            var f = this[d], g = a.fieldValue(f, b);
            null === g || "undefined" == typeof g || g.constructor == Array && !g.length || (g.constructor == Array ? a.merge(c, g) : c.push(g))
        }
        return c
    }, a.fieldValue = function (b, c) {
        var d = b.name, e = b.type, f = b.tagName.toLowerCase();
        if (void 0 === c && (c = !0), c && (!d || b.disabled || "reset" == e || "button" == e || ("checkbox" == e || "radio" == e) && !b.checked || ("submit" == e || "image" == e) && b.form && b.form.clk != b || "select" == f && -1 == b.selectedIndex)) return null;
        if ("select" == f) {
            var g = b.selectedIndex;
            if (0 > g) return null;
            for (var h = [], i = b.options, j = "select-one" == e, k = j ? g + 1 : i.length, l = j ? g : 0; k > l; l++) {
                var m = i[l];
                if (m.selected) {
                    var n = m.value;
                    if (n || (n = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), j) return n;
                    h.push(n)
                }
            }
            return h
        }
        return a(b).val()
    }, a.fn.clearForm = function (b) {
        return this.each(function () {
            a("input,select,textarea", this).clearFields(b)
        })
    }, a.fn.clearFields = a.fn.clearInputs = function (b) {
        var c = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var d = this.type, e = this.tagName.toLowerCase();
            c.test(d) || "textarea" == e ? this.value = "" : "checkbox" == d || "radio" == d ? this.checked = !1 : "select" == e ? this.selectedIndex = -1 : "file" == d ? /MSIE/.test(navigator.userAgent) ? a(this).replaceWith(a(this).clone(!0)) : a(this).val("") : b && (b === !0 && /hidden/.test(d) || "string" == typeof b && a(this).is(b)) && (this.value = "")
        })
    }, a.fn.resetForm = function () {
        return this.each(function () {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, a.fn.enable = function (a) {
        return void 0 === a && (a = !0), this.each(function () {
            this.disabled = !a
        })
    }, a.fn.selected = function (b) {
        return void 0 === b && (b = !0), this.each(function () {
            var c = this.type;
            if ("checkbox" == c || "radio" == c) this.checked = b; else if ("option" == this.tagName.toLowerCase()) {
                var d = a(this).parent("select");
                b && d[0] && "select-one" == d[0].type && d.find("option").selected(!1), this.selected = b
            }
        })
    }, a.fn.ajaxSubmit.debug = !1
});

// PutCursorAtEnd
(function (e) {
    jQuery.fn.putCursorAtEnd = function () {
        return this.each(function () {
            e(this).focus();
            if (this.setSelectionRange) {
                var t = e(this).val().length * 2;
                this.setSelectionRange(t, t)
            } else {
                e(this).val(e(this).val())
            }
        })
    }
})(jQuery);