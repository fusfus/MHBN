var ht = typeof self < "u" ? self : {};
function ks(e, t) {
  e: {
    for (var n = ["CLOSURE_FLAGS"], s = ht, r = 0; r < n.length; r++) if ((s = s[n[r]]) == null) {
      n = null;
      break e;
    }
    n = s;
  }
  return (e = n && n[e]) != null ? e : t;
}
function st() {
  throw Error("Invalid UTF8");
}
function Xr(e, t) {
  return t = String.fromCharCode.apply(null, t), e == null ? t : e + t;
}
let ln, cs;
const t2 = typeof TextDecoder < "u";
let n2;
const s2 = typeof TextEncoder < "u";
function so(e) {
  if (s2) e = (n2 ||= new TextEncoder()).encode(e);
  else {
    let n = 0;
    const s = new Uint8Array(3 * e.length);
    for (let r = 0; r < e.length; r++) {
      var t = e.charCodeAt(r);
      if (t < 128) s[n++] = t;
      else {
        if (t < 2048) s[n++] = t >> 6 | 192;
        else {
          if (t >= 55296 && t <= 57343) {
            if (t <= 56319 && r < e.length) {
              const i = e.charCodeAt(++r);
              if (i >= 56320 && i <= 57343) {
                t = 1024 * (t - 55296) + i - 56320 + 65536, s[n++] = t >> 18 | 240, s[n++] = t >> 12 & 63 | 128, s[n++] = t >> 6 & 63 | 128, s[n++] = 63 & t | 128;
                continue;
              }
              r--;
            }
            t = 65533;
          }
          s[n++] = t >> 12 | 224, s[n++] = t >> 6 & 63 | 128;
        }
        s[n++] = 63 & t | 128;
      }
    }
    e = n === s.length ? s : s.subarray(0, n);
  }
  return e;
}
var Kt, ro = ks(610401301, !1), r2 = ks(653718497, ks(1, !0));
const Wr = ht.navigator;
function Ss(e) {
  return !!ro && !!Kt && Kt.brands.some((({ brand: t }) => t && t.indexOf(e) != -1));
}
function ge(e) {
  var t;
  return (t = ht.navigator) && (t = t.userAgent) || (t = ""), t.indexOf(e) != -1;
}
function We() {
  return !!ro && !!Kt && Kt.brands.length > 0;
}
function hs() {
  return We() ? Ss("Chromium") : (ge("Chrome") || ge("CriOS")) && !(!We() && ge("Edge")) || ge("Silk");
}
function Xs(e) {
  return Xs[" "](e), e;
}
Kt = Wr && Wr.userAgentData || null, Xs[" "] = function() {
};
var i2 = !We() && (ge("Trident") || ge("MSIE"));
!ge("Android") || hs(), hs(), ge("Safari") && (hs() || !We() && ge("Coast") || !We() && ge("Opera") || !We() && ge("Edge") || (We() ? Ss("Microsoft Edge") : ge("Edg/")) || We() && Ss("Opera"));
var io = {}, jt = null;
function o2(e) {
  var t = e.length, n = 3 * t / 4;
  n % 3 ? n = Math.floor(n) : "=.".indexOf(e[t - 1]) != -1 && (n = "=.".indexOf(e[t - 2]) != -1 ? n - 2 : n - 1);
  var s = new Uint8Array(n), r = 0;
  return (function(i, o) {
    function c(Y) {
      for (; a < i.length; ) {
        var G = i.charAt(a++), j = jt[G];
        if (j != null) return j;
        if (!/^[\s\xa0]*$/.test(G)) throw Error("Unknown base64 encoding at char: " + G);
      }
      return Y;
    }
    oo();
    for (var a = 0; ; ) {
      var h = c(-1), l = c(0), y = c(64), m = c(64);
      if (m === 64 && h === -1) break;
      o(h << 2 | l >> 4), y != 64 && (o(l << 4 & 240 | y >> 2), m != 64 && o(y << 6 & 192 | m));
    }
  })(e, (function(i) {
    s[r++] = i;
  })), r !== n ? s.subarray(0, r) : s;
}
function oo() {
  if (!jt) {
    jt = {};
    for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), t = ["+/=", "+/", "-_=", "-_.", "-_"], n = 0; n < 5; n++) {
      var s = e.concat(t[n].split(""));
      io[n] = s;
      for (var r = 0; r < s.length; r++) {
        var i = s[r];
        jt[i] === void 0 && (jt[i] = r);
      }
    }
  }
}
var ao = typeof Uint8Array < "u", co = !i2 && typeof btoa == "function";
function zr(e) {
  if (!co) {
    var t;
    t === void 0 && (t = 0), oo(), t = io[t];
    var n = Array(Math.floor(e.length / 3)), s = t[64] || "";
    let a = 0, h = 0;
    for (; a < e.length - 2; a += 3) {
      var r = e[a], i = e[a + 1], o = e[a + 2], c = t[r >> 2];
      r = t[(3 & r) << 4 | i >> 4], i = t[(15 & i) << 2 | o >> 6], o = t[63 & o], n[h++] = c + r + i + o;
    }
    switch (c = 0, o = s, e.length - a) {
      case 2:
        o = t[(15 & (c = e[a + 1])) << 2] || s;
      case 1:
        e = e[a], n[h] = t[e >> 2] + t[(3 & e) << 4 | c >> 4] + o + s;
    }
    return n.join("");
  }
  for (t = "", n = 0, s = e.length - 10240; n < s; ) t += String.fromCharCode.apply(null, e.subarray(n, n += 10240));
  return t += String.fromCharCode.apply(null, n ? e.subarray(n) : e), btoa(t);
}
const Yr = /[-_.]/g, a2 = { "-": "+", _: "/", ".": "=" };
function c2(e) {
  return a2[e] || "";
}
function ho(e) {
  if (!co) return o2(e);
  Yr.test(e) && (e = e.replace(Yr, c2)), e = atob(e);
  const t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
  return t;
}
function en(e) {
  return ao && e != null && e instanceof Uint8Array;
}
var wt = {};
let h2;
function lo(e) {
  if (e !== wt) throw Error("illegal external caller");
}
function lt() {
  return h2 ||= new Ge(null, wt);
}
function Ws(e) {
  lo(wt);
  var t = e.g;
  return (t = t == null || en(t) ? t : typeof t == "string" ? ho(t) : null) == null ? t : e.g = t;
}
var Ge = class {
  constructor(e, t) {
    if (lo(t), this.g = e, e != null && e.length === 0) throw Error("ByteString should be constructed with non-empty values");
  }
  h() {
    return new Uint8Array(Ws(this) || 0);
  }
};
function uo(e, t) {
  e.__closure__error__context__984382 || (e.__closure__error__context__984382 = {}), e.__closure__error__context__984382.severity = t;
}
let l2;
function Nn() {
  const e = Error();
  uo(e, "incident"), (function(t) {
    ht.setTimeout((() => {
      throw t;
    }), 0);
  })(e);
}
function xs(e) {
  return uo(e = Error(e), "warning"), e;
}
function zs() {
  return typeof BigInt == "function";
}
function ae(e) {
  return Array.prototype.slice.call(e);
}
var Ct = typeof Symbol == "function" && typeof /* @__PURE__ */ Symbol() == "symbol";
function In(e) {
  return typeof Symbol == "function" && typeof /* @__PURE__ */ Symbol() == "symbol" ? /* @__PURE__ */ Symbol() : e;
}
var tn = In(), Kr = In("0di"), ls = In("2ex"), Dt = In("1oa"), Pn = Ct ? (e, t) => {
  e[tn] |= t;
} : (e, t) => {
  e.G !== void 0 ? e.G |= t : Object.defineProperties(e, { G: { value: t, configurable: !0, writable: !0, enumerable: !1 } });
}, En = Ct ? (e, t) => {
  e[tn] &= ~t;
} : (e, t) => {
  e.G !== void 0 && (e.G &= ~t);
}, N = Ct ? (e) => 0 | e[tn] : (e) => 0 | e.G, T = Ct ? (e) => e[tn] : (e) => e.G, O = Ct ? (e, t) => {
  e[tn] = t;
} : (e, t) => {
  e.G !== void 0 ? e.G = t : Object.defineProperties(e, { G: { value: t, configurable: !0, writable: !0, enumerable: !1 } });
};
function dt(e) {
  return Pn(e, 34), e;
}
function u2(e, t) {
  O(t, -30975 & (0 | e));
}
function Ls(e, t) {
  O(t, -30941 & (34 | e));
}
var Ys, nn = {}, fo = {};
function qr(e) {
  return !(!e || typeof e != "object" || e.Ja !== fo);
}
function Un(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e) && e.constructor === Object;
}
function Ks(e, t, n) {
  if (e != null) {
    if (typeof e == "string") e = e ? new Ge(e, wt) : lt();
    else if (e.constructor !== Ge) if (en(e)) e = e.length ? new Ge(n ? e : new Uint8Array(e), wt) : lt();
    else {
      if (!t) throw Error();
      e = void 0;
    }
  }
  return e;
}
function bn(e) {
  return !(!Array.isArray(e) || e.length) && !!(1 & N(e));
}
const $r = [];
function je(e) {
  if (2 & e) throw Error();
}
O($r, 55), Ys = Object.freeze($r);
class Tn {
  constructor(t, n, s) {
    this.l = 0, this.g = t, this.h = n, this.m = s;
  }
  next() {
    if (this.l < this.g.length) {
      const t = this.g[this.l++];
      return { done: !1, value: this.h ? this.h.call(this.m, t) : t };
    }
    return { done: !0, value: void 0 };
  }
  [Symbol.iterator]() {
    return new Tn(this.g, this.h, this.m);
  }
}
let Ye;
function go(e, t) {
  (t = Ye ? t[Ye] : void 0) && (e[Ye] = ae(t));
}
var d2 = Object.freeze({}), f2 = Object.freeze({}), g2 = Object.freeze({});
function Dn(e) {
  return e.Qa = !0, e;
}
var p2 = Dn(((e) => typeof e == "number")), Jr = Dn(((e) => typeof e == "string")), m2 = Dn(((e) => typeof e == "boolean")), Bn = typeof ht.BigInt == "function" && typeof ht.BigInt(0) == "bigint", Cs = Dn(((e) => Bn ? e >= v2 && e <= w2 : e[0] === "-" ? Zr(e, y2) : Zr(e, _2)));
const y2 = Number.MIN_SAFE_INTEGER.toString(), v2 = Bn ? BigInt(Number.MIN_SAFE_INTEGER) : void 0, _2 = Number.MAX_SAFE_INTEGER.toString(), w2 = Bn ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
function Zr(e, t) {
  if (e.length > t.length) return !1;
  if (e.length < t.length || e === t) return !0;
  for (let n = 0; n < e.length; n++) {
    const s = e[n], r = t[n];
    if (s > r) return !1;
    if (s < r) return !0;
  }
}
const E2 = typeof Uint8Array.prototype.slice == "function";
let po, k = 0, P = 0;
function Qr(e) {
  const t = e >>> 0;
  k = t, P = (e - t) / 4294967296 >>> 0;
}
function Et(e) {
  if (e < 0) {
    Qr(-e);
    const [t, n] = Zs(k, P);
    k = t >>> 0, P = n >>> 0;
  } else Qr(e);
}
function qs(e) {
  const t = po ||= new DataView(new ArrayBuffer(8));
  t.setFloat32(0, +e, !0), P = 0, k = t.getUint32(0, !0);
}
function $s(e, t) {
  return 4294967296 * t + (e >>> 0);
}
function Js(e, t) {
  const n = 2147483648 & t;
  return n && (t = ~t >>> 0, (e = 1 + ~e >>> 0) == 0 && (t = t + 1 >>> 0)), e = $s(e, t), n ? -e : e;
}
function An(e, t) {
  if (e >>>= 0, (t >>>= 0) <= 2097151) var n = "" + (4294967296 * t + e);
  else zs() ? n = "" + (BigInt(t) << BigInt(32) | BigInt(e)) : (e = (16777215 & e) + 6777216 * (n = 16777215 & (e >>> 24 | t << 8)) + 6710656 * (t = t >> 16 & 65535), n += 8147497 * t, t *= 2, e >= 1e7 && (n += e / 1e7 >>> 0, e %= 1e7), n >= 1e7 && (t += n / 1e7 >>> 0, n %= 1e7), n = t + ei(n) + ei(e));
  return n;
}
function ei(e) {
  return e = String(e), "0000000".slice(e.length) + e;
}
function Gn(e) {
  if (e.length < 16) Et(Number(e));
  else if (zs()) e = BigInt(e), k = Number(e & BigInt(4294967295)) >>> 0, P = Number(e >> BigInt(32) & BigInt(4294967295));
  else {
    const t = +(e[0] === "-");
    P = k = 0;
    const n = e.length;
    for (let s = t, r = (n - t) % 6 + t; r <= n; s = r, r += 6) {
      const i = Number(e.slice(s, r));
      P *= 1e6, k = 1e6 * k + i, k >= 4294967296 && (P += Math.trunc(k / 4294967296), P >>>= 0, k >>>= 0);
    }
    if (t) {
      const [s, r] = Zs(k, P);
      k = s, P = r;
    }
  }
}
function Zs(e, t) {
  return t = ~t, e ? e = 1 + ~e : t += 1, [e, t];
}
function tt(e) {
  return e == null || typeof e == "number" ? e : e === "NaN" || e === "Infinity" || e === "-Infinity" ? Number(e) : void 0;
}
function mo(e) {
  return e == null || typeof e == "boolean" ? e : typeof e == "number" ? !!e : void 0;
}
const b2 = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function Vn(e) {
  const t = typeof e;
  switch (t) {
    case "bigint":
      return !0;
    case "number":
      return Number.isFinite(e);
  }
  return t === "string" && b2.test(e);
}
function Mt(e) {
  if (e == null) return e;
  if (typeof e == "string") {
    if (!e) return;
    e = +e;
  }
  return typeof e == "number" && Number.isFinite(e) ? 0 | e : void 0;
}
function T2(e) {
  if (e == null) return e;
  if (typeof e == "string") {
    if (!e) return;
    e = +e;
  }
  return typeof e == "number" && Number.isFinite(e) ? e >>> 0 : void 0;
}
function ti(e) {
  return e[0] !== "-" && (e.length < 20 || e.length === 20 && Number(e.substring(0, 6)) < 184467);
}
function Qs(e) {
  return e = Math.trunc(e), Number.isSafeInteger(e) || (Et(e), e = Js(k, P)), e;
}
function er(e) {
  var t = Math.trunc(Number(e));
  if (Number.isSafeInteger(t)) return String(t);
  if ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), !(e[0] === "-" ? e.length < 20 || e.length === 20 && Number(e.substring(0, 7)) > -922337 : e.length < 19 || e.length === 19 && Number(e.substring(0, 6)) < 922337)) if (Gn(e), e = k, 2147483648 & (t = P)) if (zs()) e = "" + (BigInt(0 | t) << BigInt(32) | BigInt(e >>> 0));
  else {
    const [n, s] = Zs(e, t);
    e = "-" + An(n, s);
  }
  else e = An(e, t);
  return e;
}
function kn(e) {
  return e == null ? e : typeof e == "bigint" ? (Cs(e) ? e = Number(e) : (e = BigInt.asIntN(64, e), e = Cs(e) ? Number(e) : String(e)), e) : Vn(e) ? typeof e == "number" ? Qs(e) : er(e) : void 0;
}
function A2(e) {
  if (e == null) return e;
  var t = typeof e;
  if (t === "bigint") return String(BigInt.asUintN(64, e));
  if (Vn(e)) {
    if (t === "string") return t = Math.trunc(Number(e)), Number.isSafeInteger(t) && t >= 0 ? e = String(t) : ((t = e.indexOf(".")) !== -1 && (e = e.substring(0, t)), ti(e) || (Gn(e), e = An(k, P))), e;
    if (t === "number") return (e = Math.trunc(e)) >= 0 && Number.isSafeInteger(e) ? e : (function(n) {
      if (n < 0) {
        Et(n);
        const s = An(k, P);
        return n = Number(s), Number.isSafeInteger(n) ? n : s;
      }
      return ti(String(n)) ? n : (Et(n), $s(k, P));
    })(e);
  }
}
function yo(e) {
  if (typeof e != "string") throw Error();
  return e;
}
function Rt(e) {
  if (e != null && typeof e != "string") throw Error();
  return e;
}
function Ke(e) {
  return e == null || typeof e == "string" ? e : void 0;
}
function tr(e, t, n, s) {
  if (e != null && typeof e == "object" && e.X === nn) return e;
  if (!Array.isArray(e)) return n ? 2 & s ? (e = t[Kr]) ? t = e : (dt((e = new t()).u), t = t[Kr] = e) : t = new t() : t = void 0, t;
  let r = n = N(e);
  return r === 0 && (r |= 32 & s), r |= 2 & s, r !== n && O(e, r), new t(e);
}
function k2(e, t, n) {
  if (t) e: {
    if (!Vn(t = e)) throw xs("int64");
    switch (typeof t) {
      case "string":
        t = er(t);
        break e;
      case "bigint":
        if (e = t = BigInt.asIntN(64, t), Jr(e)) {
          if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e)) throw Error(String(e));
        } else if (p2(e) && !Number.isSafeInteger(e)) throw Error(String(e));
        t = Bn ? BigInt(t) : m2(t) ? t ? "1" : "0" : Jr(t) ? t.trim() || "0" : String(t);
        break e;
      default:
        t = Qs(t);
    }
  }
  else t = kn(e);
  return typeof (n = (e = t) == null ? n ? 0 : void 0 : e) == "string" && (t = +n, Number.isSafeInteger(t)) ? t : n;
}
function vo(e) {
  if (Bt === void 0 && (Bt = typeof Proxy == "function" ? bo(Proxy) : null), !Bt || !Eo()) return e;
  let t = bt?.get(e);
  return t || (Math.random() > 0.01 ? e : ((function(n) {
    if (us === void 0) {
      const s = new Bt([], {});
      us = Array.prototype.concat.call([], s).length === 1;
    }
    us && typeof Symbol == "function" && Symbol.isConcatSpreadable && (n[Symbol.isConcatSpreadable] = !0);
  })(e), t = new Bt(e, { set: (n, s, r) => (Nn(), n[s] = r, !0) }), (function(n, s) {
    (bt ||= new at()).set(n, s), (_o ||= new at()).set(s, n);
  })(e, t), t));
}
let bt, _o, Bt, at, us, qt, Sn, wo, S2;
function Eo() {
  return at === void 0 && (at = typeof WeakMap == "function" ? bo(WeakMap) : null), at;
}
function bo(e) {
  try {
    return e.toString().indexOf("[native code]") !== -1 ? e : null;
  } catch {
    return null;
  }
}
function nr(e, t, n) {
  if (Eo()) {
    if (qt?.get(t)?.get(e)) {
      if (n) return;
    } else if (Math.random() > 0.01) return;
    var s = e.length;
    n = { length: s };
    for (var r = 0; r < Math.min(s, 10); r++) {
      if (s <= 10) var i = r;
      else {
        i = s / 10;
        const o = Math.floor(r * i);
        i = o + Math.floor(Math.random() * (Math.floor((r + 1) * i) - o));
      }
      n[i] = e[i];
    }
    To(e, n) ? ((r = (s = qt ||= new at()).get(t)) || (r = new at(), s.set(t, r)), r.set(e, n)) : (Nn(), $t(e, t));
  }
}
function xn(e, t) {
  const n = qt?.get(t)?.get(e);
  n && !To(e, n) && (Nn(), $t(e, t));
}
function To(e, t) {
  if (e.length !== t.length) return !1;
  for (const r in t) {
    var n, s = Number(r);
    if ((n = Number.isInteger(s)) && (n = e[s], s = t[s], n = !(Number.isNaN(n) ? Number.isNaN(s) : n === s)), n) return !1;
  }
  return !0;
}
function jn(e) {
  if (e && qt?.has(e)) {
    var t = e.u;
    if (t) for (let n = 0; n < t.length; n++) {
      const s = t[n];
      if (n === t.length - 1 && Un(s)) for (const r in s) {
        const i = s[r];
        Array.isArray(i) && xn(i, e);
      }
      else Array.isArray(s) && xn(s, e);
    }
  }
}
function $t(e, t) {
  qt?.get(t)?.delete(e);
}
function qe(e, t, n) {
  return e = Ao(e, t[0], t[1], n ? 1 : 2), t !== wo && n && Pn(e, 16384), e;
}
function Ao(e, t, n, s) {
  if (s = s ?? 0, e == null && (e = Sn), Sn = void 0, e == null) {
    var r = 96;
    n ? (e = [n], r |= 512) : e = [], t && (r = -33521665 & r | (1023 & t) << 15);
  } else {
    if (!Array.isArray(e)) throw Error("narr");
    if (2048 & (r = N(e))) throw Error("farr");
    if (64 & r) return e;
    if (s === 1 || s === 2 || (r |= 64), n && (r |= 512, n !== e[0])) throw Error("mid");
    e: {
      if (s = (n = e).length) {
        const i = s - 1;
        if (Un(n[i])) {
          if ((t = i - (+!!(512 & (r |= 256)) - 1)) >= 1024) throw Error("pvtlmt");
          r = -33521665 & r | (1023 & t) << 15;
          break e;
        }
      }
      if (t) {
        if ((t = Math.max(t, s - (+!!(512 & r) - 1))) > 1024) throw Error("spvt");
        r = -33521665 & r | (1023 & t) << 15;
      }
    }
  }
  return O(e, r), e;
}
const x2 = {};
let L2 = (function() {
  try {
    return Xs(new class extends Map {
      constructor() {
        super();
      }
    }()), !1;
  } catch {
    return !0;
  }
})();
class ds {
  constructor() {
    this.g = /* @__PURE__ */ new Map();
  }
  get(t) {
    return this.g.get(t);
  }
  set(t, n) {
    return this.g.set(t, n), this.size = this.g.size, this;
  }
  delete(t) {
    return t = this.g.delete(t), this.size = this.g.size, t;
  }
  clear() {
    this.g.clear(), this.size = this.g.size;
  }
  has(t) {
    return this.g.has(t);
  }
  entries() {
    return this.g.entries();
  }
  keys() {
    return this.g.keys();
  }
  values() {
    return this.g.values();
  }
  forEach(t, n) {
    return this.g.forEach(t, n);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}
const C2 = L2 ? (Object.setPrototypeOf(ds.prototype, Map.prototype), Object.defineProperties(ds.prototype, { size: { value: 0, configurable: !0, enumerable: !0, writable: !0 } }), ds) : class extends Map {
  constructor() {
    super();
  }
};
function ni(e) {
  return e;
}
function fs(e) {
  if (2 & e.M) throw Error("Cannot mutate an immutable Map");
}
var me = class extends C2 {
  constructor(e, t, n = ni, s = ni) {
    super();
    let r = N(e);
    r |= 64, O(e, r), this.M = r, this.T = t, this.S = n, this.Z = this.T ? M2 : s;
    for (let i = 0; i < e.length; i++) {
      const o = e[i], c = n(o[0], !1, !0);
      let a = o[1];
      t ? a === void 0 && (a = null) : a = s(o[1], !1, !0, void 0, void 0, r), super.set(c, a);
    }
  }
  pa(e = si) {
    if (this.size !== 0) return this.Y(e);
  }
  Y(e = si) {
    const t = [], n = super.entries();
    for (var s; !(s = n.next()).done; ) (s = s.value)[0] = e(s[0]), s[1] = e(s[1]), t.push(s);
    return t;
  }
  clear() {
    fs(this), super.clear();
  }
  delete(e) {
    return fs(this), super.delete(this.S(e, !0, !1));
  }
  entries() {
    var e = this.oa();
    return new Tn(e, R2, this);
  }
  keys() {
    return this.Ia();
  }
  values() {
    var e = this.oa();
    return new Tn(e, me.prototype.get, this);
  }
  forEach(e, t) {
    super.forEach(((n, s) => {
      e.call(t, this.get(s), s, this);
    }));
  }
  set(e, t) {
    return fs(this), (e = this.S(e, !0, !1)) == null ? this : t == null ? (super.delete(e), this) : super.set(e, this.Z(t, !0, !0, this.T, !1, this.M));
  }
  Oa(e) {
    const t = this.S(e[0], !1, !0);
    e = e[1], e = this.T ? e === void 0 ? null : e : this.Z(e, !1, !0, void 0, !1, this.M), super.set(t, e);
  }
  has(e) {
    return super.has(this.S(e, !1, !1));
  }
  get(e) {
    e = this.S(e, !1, !1);
    const t = super.get(e);
    if (t !== void 0) {
      var n = this.T;
      return n ? ((n = this.Z(t, !1, !0, n, this.ta, this.M)) !== t && super.set(e, n), n) : t;
    }
  }
  oa() {
    return Array.from(super.keys());
  }
  Ia() {
    return super.keys();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
function M2(e, t, n, s, r, i) {
  return e = tr(e, s, n, i), r && (e = Xn(e)), e;
}
function si(e) {
  return e;
}
function R2(e) {
  return [e, this.get(e)];
}
let F2;
function ri() {
  return F2 ||= new me(dt([]), void 0, void 0, void 0, x2);
}
function sr(e, t, n, s, r) {
  if (e != null) {
    if (Array.isArray(e)) e = bn(e) ? void 0 : r && 2 & N(e) ? e : Hn(e, t, n, s !== void 0, r);
    else if (Un(e)) {
      const i = {};
      for (let o in e) i[o] = sr(e[o], t, n, s, r);
      e = i;
    } else e = t(e, s);
    return e;
  }
}
function Hn(e, t, n, s, r) {
  const i = s || n ? N(e) : 0;
  s = s ? !!(32 & i) : void 0;
  const o = ae(e);
  for (let c = 0; c < o.length; c++) o[c] = sr(o[c], t, n, s, r);
  return n && (go(o, e), n(i, o)), o;
}
function O2(e) {
  return sr(e, rr, void 0, void 0, !1);
}
function rr(e) {
  return e.X === nn ? e.toJSON() : e instanceof me ? e.pa(O2) : (function(t) {
    switch (typeof t) {
      case "number":
        return isFinite(t) ? t : String(t);
      case "bigint":
        return Cs(t) ? Number(t) : String(t);
      case "boolean":
        return t ? 1 : 0;
      case "object":
        if (t) if (Array.isArray(t)) {
          if (bn(t)) return;
        } else {
          if (en(t)) return zr(t);
          if (t instanceof Ge) {
            const n = t.g;
            return n == null ? "" : typeof n == "string" ? n : t.g = zr(n);
          }
          if (t instanceof me) return t.pa();
        }
    }
    return t;
  })(e);
}
function Ms(e, t, n = Ls) {
  if (e != null) {
    if (ao && e instanceof Uint8Array) return t ? e : new Uint8Array(e);
    if (Array.isArray(e)) {
      var s = N(e);
      return 2 & s ? e : (t &&= s === 0 || !!(32 & s) && !(64 & s || !(16 & s)), t ? (O(e, -12293 & (34 | s)), e) : Hn(e, Ms, 4 & s ? Ls : n, !0, !0));
    }
    return e.X === nn ? (n = e.u, e = 2 & (s = T(n)) ? e : ir(e, n, s, !0)) : e instanceof me && !(2 & e.M) && (n = dt(e.Y(Ms)), e = new me(n, e.T, e.S, e.Z)), e;
  }
}
function ir(e, t, n, s) {
  return jn(e), e = e.constructor, Sn = t = ko(t, n, s), t = new e(t), Sn = void 0, t;
}
function ko(e, t, n) {
  const s = n || 2 & t ? Ls : u2, r = !!(32 & t);
  return e = (function(i, o, c) {
    const a = ae(i);
    var h = a.length;
    const l = 256 & o ? a[h - 1] : void 0;
    for (h += l ? -1 : 0, o = 512 & o ? 1 : 0; o < h; o++) a[o] = c(a[o]);
    if (l) {
      o = a[o] = {};
      for (const y in l) o[y] = c(l[y]);
    }
    return go(a, i), a;
  })(e, t, ((i) => Ms(i, r, s))), Pn(e, 32 | (n ? 2 : 0)), e;
}
function Xn(e) {
  const t = e.u, n = T(t);
  return 2 & n ? ir(e, t, n, !1) : e;
}
function So(e, t, n, s) {
  return !(4 & t) || n != null;
}
function $e(e, t) {
  return Oe(e = e.u, T(e), t);
}
function ii(e, t, n, s) {
  if (!((t = s + (+!!(512 & t) - 1)) < 0 || t >= e.length || t >= n)) return e[t];
}
function Oe(e, t, n, s) {
  if (n === -1) return null;
  const r = t >> 15 & 1023 || 536870912;
  if (!(n >= r)) {
    var i = e.length;
    return s && 256 & t && (s = e[i - 1][n]) != null ? (ii(e, t, r, n) && ls != null && ((t = (e = l2 ??= {})[ls] || 0) >= 4 || (e[ls] = t + 1, Nn())), s) : ii(e, t, r, n);
  }
  return 256 & t ? e[e.length - 1][n] : void 0;
}
function S(e, t, n) {
  const s = e.u;
  let r = T(s);
  return je(r), M(s, r, t, n), e;
}
function M(e, t, n, s) {
  const r = t >> 15 & 1023 || 536870912;
  if (n >= r) {
    let i, o = t;
    if (256 & t) i = e[e.length - 1];
    else {
      if (s == null) return o;
      i = e[r + (+!!(512 & t) - 1)] = {}, o |= 256;
    }
    return i[n] = s, n < r && (e[n + (+!!(512 & t) - 1)] = void 0), o !== t && O(e, o), o;
  }
  return e[n + (+!!(512 & t) - 1)] = s, 256 & t && n in (e = e[e.length - 1]) && delete e[n], t;
}
function Ft(e, t, n, s, r) {
  var i = 2 & t;
  r = Oe(e, t, n, r), Array.isArray(r) || (r = Ys);
  const o = !(2 & s);
  s = !(1 & s);
  const c = !!(32 & t);
  let a = N(r);
  return a !== 0 || !c || i || o ? 1 & a || (a |= 1, O(r, a)) : (a |= 33, O(r, a)), i ? (e = !1, 2 & a || (dt(r), e = !!(4 & a)), (s || e) && Object.freeze(r)) : (i = !!(2 & a) || !!(2048 & a), s && i ? (r = ae(r), i = 1, c && !o && (i |= 32), O(r, i), M(e, t, n, r)) : o && 32 & a && !i && En(r, 32)), r;
}
function pn(e, t) {
  e = e.u;
  let n = T(e);
  const s = Oe(e, n, t), r = tt(s);
  return r != null && r !== s && M(e, n, t, r), r;
}
function xo(e) {
  e = e.u;
  let t = T(e);
  const n = Oe(e, t, 1), s = Ks(n, !0, !!(34 & t));
  return s != null && s !== n && M(e, t, 1, s), s;
}
function it() {
  return d2 === void 0 ? 2 : 5;
}
function ot(e, t, n, s, r, i) {
  const o = e.u;
  let c = T(o);
  s = 2 & c ? 1 : s, i = !!i, r = Lo(o, c, t, r);
  var a = N(r), h = r;
  if (xn(h, e), s !== 2 && s !== 1 || $t(h, e), So(e, a, void 0)) {
    4 & a && (r = ae(r), a = ut(a, c), c = M(o, c, t, r));
    let y = h = 0;
    for (; h < r.length; h++) {
      const m = n(r[h]);
      m != null && (r[y++] = m);
    }
    y < h && (r.length = y), a = -4097 & (20 | (a = Co(a, c))), O(r, a &= -8193), 2 & a && Object.freeze(r);
  }
  let l;
  return s === 1 || s === 4 && 32 & a ? De(a) || (e = a, (a |= 2) !== e && O(r, a), Object.freeze(r)) : (n = s === 5 && (!!(32 & a) || De(a) || !!bt?.get(r)), (s === 2 || n) && De(a) && (r = ae(r), a = Tt(a = ut(a, c), c, i), O(r, a), c = M(o, c, t, r)), De(a) || (t = a, (a = Tt(a, c, i)) !== t && O(r, a)), n ? (l = vo(r), nr(r, e, !0)) : s !== 2 || i || bt?.delete(r)), l || r;
}
function Lo(e, t, n, s) {
  return e = Oe(e, t, n, s), Array.isArray(e) ? e : Ys;
}
function Co(e, t) {
  return e === 0 && (e = ut(e, t)), 1 | e;
}
function De(e) {
  return !!(2 & e) && !!(4 & e) || !!(2048 & e);
}
function Mo(e) {
  e = ae(e);
  for (let t = 0; t < e.length; t++) {
    const n = e[t] = ae(e[t]);
    Array.isArray(n[1]) && (n[1] = dt(n[1]));
  }
  return e;
}
function Rs(e, t, n, s) {
  e = e.u;
  let r = T(e);
  je(r), M(e, r, t, (s === "0" ? Number(n) === 0 : n === s) ? void 0 : n);
}
function gs(e, t) {
  var n = va;
  return ar(or(e = e.u), e, T(e), n) === t ? t : -1;
}
function or(e) {
  if (Ct) return e[Dt] ?? (e[Dt] = /* @__PURE__ */ new Map());
  if (Dt in e) return e[Dt];
  const t = /* @__PURE__ */ new Map();
  return Object.defineProperty(e, Dt, { value: t }), t;
}
function Ro(e, t, n, s) {
  const r = or(e), i = ar(r, e, t, n);
  return i !== s && (i && (t = M(e, t, i)), r.set(n, s)), t;
}
function ar(e, t, n, s) {
  let r = e.get(s);
  if (r != null) return r;
  r = 0;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    Oe(t, n, o) != null && (r !== 0 && (n = M(t, n, r)), r = o);
  }
  return e.set(s, r), r;
}
function cr(e, t, n, s) {
  let r, i = T(e);
  if ((s = Oe(e, i, n, s)) != null && s.X === nn) return (t = Xn(s)) !== s && M(e, i, n, t), t.u;
  if (Array.isArray(s)) {
    const o = N(s);
    r = 2 & o ? qe(ko(s, o, !1), t, !0) : 64 & o ? s : qe(r, t, !0);
  } else r = qe(void 0, t, !0);
  return r !== s && M(e, i, n, r), r;
}
function Fo(e, t, n, s) {
  e = e.u;
  let r = T(e);
  return (t = tr(s = Oe(e, r, n, s), t, !1, r)) !== s && t != null && M(e, r, n, t), t;
}
function w(e, t, n, s = !1) {
  if ((t = Fo(e, t, n, s)) == null) return t;
  if (e = e.u, !(2 & (s = T(e)))) {
    const r = Xn(t);
    r !== t && M(e, s, n, t = r);
  }
  return t;
}
function Oo(e, t, n, s, r, i, o) {
  const c = e.u;
  var a = !!(2 & t);
  r = a ? 1 : r, i = !!i, o &&= !a, a = Lo(c, t, s);
  var h = N(a), l = a;
  if (xn(l, e), r !== 2 && r !== 1 || $t(l, e), !(l = !!(4 & h))) {
    var y = a, m = t;
    const G = !!(2 & (h = Co(h, t)));
    G && (m |= 2);
    let j = !G, cn = !0, gt = 0, He = 0;
    for (; gt < y.length; gt++) {
      const Ut = tr(y[gt], n, !1, m);
      if (Ut instanceof n) {
        if (!G) {
          const hn = !!(2 & N(Ut.u));
          j &&= !hn, cn &&= hn;
        }
        y[He++] = Ut;
      }
    }
    He < gt && (y.length = He), h |= 4, h = cn ? 16 | h : -17 & h, O(y, h = j ? 8 | h : -9 & h), G && Object.freeze(y);
  }
  if (o && !(8 & h || !a.length && (r === 1 || r === 4 && 32 & h))) {
    for (De(h) ? (a = ae(a), h = ut(h, t), t = M(c, t, s, a)) : $t(a, e), n = a, o = h, y = 0; y < n.length; y++) (h = n[y]) !== (m = Xn(h)) && (n[y] = m);
    o |= 8, o = n.length ? -17 & o : 16 | o, O(n, o), h = o;
  }
  let Y;
  return r === 1 || r === 4 && 32 & h ? De(h) || (e = h, (h |= !a.length || 16 & h && (!l || 32 & h) ? 2 : 2048) !== e && O(a, h), Object.freeze(a)) : (l = r === 5 && (!!(32 & h) || De(h) || !!bt?.get(a)), (r === 2 || l) && De(h) && (a = ae(a), h = Tt(h = ut(h, t), t, i), O(a, h), t = M(c, t, s, a)), De(h) || (s = h, (h = Tt(h, t, i)) !== s && O(a, h)), l ? (Y = vo(a), nr(a, e, !0)) : r !== 2 || i || bt?.delete(a)), Y || a;
}
function Ve(e, t, n) {
  const s = T(e.u);
  return Oo(e, s, t, n, it(), !1, !(2 & s));
}
function p(e, t, n, s) {
  return s == null && (s = void 0), S(e, n, s);
}
function Xt(e, t, n, s) {
  s == null && (s = void 0);
  e: {
    e = e.u;
    let r = T(e);
    if (je(r), s == null) {
      const i = or(e);
      if (ar(i, e, r, n) !== t) break e;
      i.set(n, 0);
    } else r = Ro(e, r, n, t);
    M(e, r, t, s);
  }
}
function ut(e, t) {
  return -2049 & (e = 32 | (2 & t ? 2 | e : -3 & e));
}
function Tt(e, t, n) {
  return 32 & t && n || (e &= -33), e;
}
function Ln(e, t, n, s) {
  const r = T(e.u);
  je(r), e = Oo(e, r, n, t, 2, !0), s = s ?? new n(), e.push(s), 2 & N(s.u) ? En(e, 8) : En(e, 16);
}
function Ee(e, t) {
  return e ?? t;
}
function pe(e, t) {
  return Mt($e(e, t));
}
function D(e, t) {
  return Ee(pn(e, t), 0);
}
function Re(e, t) {
  return Ee(Ke($e(e, t)), "");
}
function Jt(e, t, n) {
  if (n != null && typeof n != "boolean") throw e = typeof n, Error(`Expected boolean but got ${e != "object" ? e : n ? Array.isArray(n) ? "array" : e : "null"}: ${n}`);
  S(e, t, n);
}
function Fe(e, t, n) {
  if (n != null) {
    if (typeof n != "number" || !Number.isFinite(n)) throw xs("int32");
    n |= 0;
  }
  S(e, t, n);
}
function f(e, t, n) {
  if (n != null && typeof n != "number") throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);
  S(e, t, n);
}
function Cn(e, t, n) {
  {
    const c = e.u;
    let a = T(c);
    if (je(a), n == null) M(c, a, t);
    else {
      n = _o?.get(n) || n;
      var s, r = N(n), i = r, o = !!(2 & r) || Object.isFrozen(n);
      if ((s = !o) && ((s = g2 === void 0) || (s = !!r2 && f2 !== void 0)), So(e, r)) {
        r = 21, o && (n = ae(n), i = 0, r = Tt(r = ut(r, a), a, !0));
        for (let h = 0; h < n.length; h++) n[h] = yo(n[h]);
      }
      s ? (n = ae(n), i = 0, r = Tt(r = ut(r, a), a, !0)) : o || nr(n, e), r !== i && O(n, r), M(c, a, t, n);
    }
  }
}
function Wn(e, t, n) {
  je(T(e.u)), ot(e, t, Ke, 2, void 0, !0).push(yo(n));
}
function No(e, t) {
  return Error(`Invalid wire type: ${e} (at position ${t})`);
}
function hr() {
  return Error("Failed to read varint, encoding is invalid.");
}
function Io(e, t) {
  return Error(`Tried to read past the end of the data ${t} > ${e}`);
}
function lr(e) {
  if (typeof e == "string") return { buffer: ho(e), O: !1 };
  if (Array.isArray(e)) return { buffer: new Uint8Array(e), O: !1 };
  if (e.constructor === Uint8Array) return { buffer: e, O: !1 };
  if (e.constructor === ArrayBuffer) return { buffer: new Uint8Array(e), O: !1 };
  if (e.constructor === Ge) return { buffer: Ws(e) || new Uint8Array(0), O: !0 };
  if (e instanceof Uint8Array) return { buffer: new Uint8Array(e.buffer, e.byteOffset, e.byteLength), O: !1 };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function ur(e, t) {
  let n, s = 0, r = 0, i = 0;
  const o = e.h;
  let c = e.g;
  do
    n = o[c++], s |= (127 & n) << i, i += 7;
  while (i < 32 && 128 & n);
  for (i > 32 && (r |= (127 & n) >> 4), i = 3; i < 32 && 128 & n; i += 7) n = o[c++], r |= (127 & n) << i;
  if (ct(e, c), n < 128) return t(s >>> 0, r >>> 0);
  throw hr();
}
function dr(e) {
  let t = 0, n = e.g;
  const s = n + 10, r = e.h;
  for (; n < s; ) {
    const i = r[n++];
    if (t |= i, (128 & i) == 0) return ct(e, n), !!(127 & t);
  }
  throw hr();
}
function Je(e) {
  const t = e.h;
  let n = e.g, s = t[n++], r = 127 & s;
  if (128 & s && (s = t[n++], r |= (127 & s) << 7, 128 & s && (s = t[n++], r |= (127 & s) << 14, 128 & s && (s = t[n++], r |= (127 & s) << 21, 128 & s && (s = t[n++], r |= s << 28, 128 & s && 128 & t[n++] && 128 & t[n++] && 128 & t[n++] && 128 & t[n++] && 128 & t[n++]))))) throw hr();
  return ct(e, n), r;
}
function Ze(e) {
  return Je(e) >>> 0;
}
function Fs(e) {
  var t = e.h;
  const n = e.g, s = t[n], r = t[n + 1], i = t[n + 2];
  return t = t[n + 3], ct(e, e.g + 4), (s << 0 | r << 8 | i << 16 | t << 24) >>> 0;
}
function Os(e) {
  var t = Fs(e);
  e = 2 * (t >> 31) + 1;
  const n = t >>> 23 & 255;
  return t &= 8388607, n == 255 ? t ? NaN : e * (1 / 0) : n == 0 ? 1401298464324817e-60 * e * t : e * Math.pow(2, n - 150) * (t + 8388608);
}
function N2(e) {
  return Je(e);
}
function ps(e, t, { ca: n = !1 } = {}) {
  e.ca = n, t && (t = lr(t), e.h = t.buffer, e.m = t.O, e.j = 0, e.l = e.h.length, e.g = e.j);
}
function ct(e, t) {
  if (e.g = t, t > e.l) throw Io(e.l, t);
}
function Po(e, t) {
  if (t < 0) throw Error(`Tried to read a negative byte length: ${t}`);
  const n = e.g, s = n + t;
  if (s > e.l) throw Io(t, e.l - n);
  return e.g = s, n;
}
function Uo(e, t) {
  if (t == 0) return lt();
  var n = Po(e, t);
  return e.ca && e.m ? n = e.h.subarray(n, n + t) : (e = e.h, n = n === (t = n + t) ? new Uint8Array(0) : E2 ? e.slice(n, t) : new Uint8Array(e.subarray(n, t))), n.length == 0 ? lt() : new Ge(n, wt);
}
me.prototype.toJSON = void 0, me.prototype.Ja = fo;
var oi = [];
function Do(e) {
  var t = e.g;
  if (t.g == t.l) return !1;
  e.l = e.g.g;
  var n = Ze(e.g);
  if (t = n >>> 3, !((n &= 7) >= 0 && n <= 5)) throw No(n, e.l);
  if (t < 1) throw Error(`Invalid field number: ${t} (at position ${e.l})`);
  return e.m = t, e.h = n, !0;
}
function mn(e) {
  switch (e.h) {
    case 0:
      e.h != 0 ? mn(e) : dr(e.g);
      break;
    case 1:
      ct(e = e.g, e.g + 8);
      break;
    case 2:
      if (e.h != 2) mn(e);
      else {
        var t = Ze(e.g);
        ct(e = e.g, e.g + t);
      }
      break;
    case 5:
      ct(e = e.g, e.g + 4);
      break;
    case 3:
      for (t = e.m; ; ) {
        if (!Do(e)) throw Error("Unmatched start-group tag: stream EOF");
        if (e.h == 4) {
          if (e.m != t) throw Error("Unmatched end-group tag");
          break;
        }
        mn(e);
      }
      break;
    default:
      throw No(e.h, e.l);
  }
}
function sn(e, t, n) {
  const s = e.g.l, r = Ze(e.g), i = e.g.g + r;
  let o = i - s;
  if (o <= 0 && (e.g.l = i, n(t, e, void 0, void 0, void 0), o = i - e.g.g), o) throw Error(`Message parsing ended unexpectedly. Expected to read ${r} bytes, instead read ${r - o} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return e.g.g = i, e.g.l = s, t;
}
function fr(e) {
  var t = Ze(e.g), n = Po(e = e.g, t);
  if (e = e.h, t2) {
    var s, r = e;
    (s = cs) || (s = cs = new TextDecoder("utf-8", { fatal: !0 })), t = n + t, r = n === 0 && t === r.length ? r : r.subarray(n, t);
    try {
      var i = s.decode(r);
    } catch (c) {
      if (ln === void 0) {
        try {
          s.decode(new Uint8Array([128]));
        } catch {
        }
        try {
          s.decode(new Uint8Array([97])), ln = !0;
        } catch {
          ln = !1;
        }
      }
      throw !ln && (cs = void 0), c;
    }
  } else {
    t = (i = n) + t, n = [];
    let c, a = null;
    for (; i < t; ) {
      var o = e[i++];
      o < 128 ? n.push(o) : o < 224 ? i >= t ? st() : (c = e[i++], o < 194 || (192 & c) != 128 ? (i--, st()) : n.push((31 & o) << 6 | 63 & c)) : o < 240 ? i >= t - 1 ? st() : (c = e[i++], (192 & c) != 128 || o === 224 && c < 160 || o === 237 && c >= 160 || (192 & (s = e[i++])) != 128 ? (i--, st()) : n.push((15 & o) << 12 | (63 & c) << 6 | 63 & s)) : o <= 244 ? i >= t - 2 ? st() : (c = e[i++], (192 & c) != 128 || c - 144 + (o << 28) >> 30 != 0 || (192 & (s = e[i++])) != 128 || (192 & (r = e[i++])) != 128 ? (i--, st()) : (o = (7 & o) << 18 | (63 & c) << 12 | (63 & s) << 6 | 63 & r, o -= 65536, n.push(55296 + (o >> 10 & 1023), 56320 + (1023 & o)))) : st(), n.length >= 8192 && (a = Xr(a, n), n.length = 0);
    }
    i = Xr(a, n);
  }
  return i;
}
function Bo(e) {
  const t = Ze(e.g);
  return Uo(e.g, t);
}
function zn(e, t, n) {
  var s = Ze(e.g);
  for (s = e.g.g + s; e.g.g < s; ) n.push(t(e.g));
}
var un = [];
let Mn;
function Te(e, t, n) {
  t.g ? t.m(e, t.g, t.h, n, !0) : t.m(e, t.h, n, !0);
}
var d = class {
  constructor(e, t) {
    this.u = Ao(e, t);
  }
  toJSON() {
    return Go(this);
  }
  l() {
    var e = pc;
    return e.g ? e.l(this, e.g, e.h, !0) : e.l(this, e.h, e.defaultValue, !0);
  }
  clone() {
    const e = this.u;
    return ir(this, e, T(e), !1);
  }
  O() {
    return !!(2 & N(this.u));
  }
};
function Go(e) {
  jn(e), e = Mn ? e.u : Hn(e.u, rr, void 0, void 0, !1);
  {
    var t = !Mn;
    let h = e.length;
    if (h) {
      var n = e[h - 1], s = Un(n);
      s ? h-- : n = void 0;
      var r = e;
      if (s) {
        e: {
          var i, o = n, c = !1;
          if (o) for (let l in o) isNaN(+l) ? (i ??= {})[l] = o[l] : (s = o[l], Array.isArray(s) && (bn(s) || qr(s) && s.size === 0) && (s = null), s == null && (c = !0), s != null && ((i ??= {})[l] = s));
          if (c || (i = o), i) for (let l in i) {
            c = i;
            break e;
          }
          c = null;
        }
        o = c == null ? n != null : c !== n;
      }
      for (; h > 0 && ((i = r[h - 1]) == null || bn(i) || qr(i) && i.size === 0); h--) var a = !0;
      (r !== e || o || a) && (t ? (a || o || c) && (r.length = h) : r = Array.prototype.slice.call(r, 0, h), c && r.push(c)), a = r;
    } else a = e;
  }
  return a;
}
function ai(e) {
  return e ? /^\d+$/.test(e) ? (Gn(e), new Ns(k, P)) : null : I2 ||= new Ns(0, 0);
}
d.prototype.X = nn, d.prototype.toString = function() {
  try {
    return Mn = !0, Go(this).toString();
  } finally {
    Mn = !1;
  }
};
var Ns = class {
  constructor(e, t) {
    this.h = e >>> 0, this.g = t >>> 0;
  }
};
let I2;
function ci(e) {
  return e ? /^-?\d+$/.test(e) ? (Gn(e), new Is(k, P)) : null : P2 ||= new Is(0, 0);
}
var Is = class {
  constructor(e, t) {
    this.h = e >>> 0, this.g = t >>> 0;
  }
};
let P2;
function vt(e, t, n) {
  for (; n > 0 || t > 127; ) e.g.push(127 & t | 128), t = (t >>> 7 | n << 25) >>> 0, n >>>= 7;
  e.g.push(t);
}
function rn(e, t) {
  for (; t > 127; ) e.g.push(127 & t | 128), t >>>= 7;
  e.g.push(t);
}
function Yn(e, t) {
  if (t >= 0) rn(e, t);
  else {
    for (let n = 0; n < 9; n++) e.g.push(127 & t | 128), t >>= 7;
    e.g.push(1);
  }
}
function Zt(e, t) {
  e.g.push(t >>> 0 & 255), e.g.push(t >>> 8 & 255), e.g.push(t >>> 16 & 255), e.g.push(t >>> 24 & 255);
}
function At(e, t) {
  t.length !== 0 && (e.l.push(t), e.h += t.length);
}
function ye(e, t, n) {
  rn(e.g, 8 * t + n);
}
function gr(e, t) {
  return ye(e, t, 2), t = e.g.end(), At(e, t), t.push(e.h), t;
}
function pr(e, t) {
  var n = t.pop();
  for (n = e.h + e.g.length() - n; n > 127; ) t.push(127 & n | 128), n >>>= 7, e.h++;
  t.push(n), e.h++;
}
function Kn(e, t, n) {
  ye(e, t, 2), rn(e.g, n.length), At(e, e.g.end()), At(e, n);
}
function Rn(e, t, n, s) {
  n != null && (t = gr(e, t), s(n, e), pr(e, t));
}
function Ae() {
  const e = class {
    constructor() {
      throw Error();
    }
  };
  return Object.setPrototypeOf(e, e.prototype), e;
}
var mr = Ae(), Vo = Ae(), yr = Ae(), vr = Ae(), jo = Ae(), _r = Ae(), Ho = Ae(), Xo = Ae(), Ot = class {
  constructor(e, t, n) {
    this.g = e, this.h = t, e = mr, this.l = !!e && n === e || !1;
  }
};
function qn(e, t) {
  return new Ot(e, t, mr);
}
function Wo(e, t, n, s, r) {
  Rn(e, n, qo(t, s), r);
}
const U2 = qn((function(e, t, n, s, r) {
  return e.h === 2 && (sn(e, cr(t, s, n), r), !0);
}), Wo), D2 = qn((function(e, t, n, s, r) {
  return e.h === 2 && (sn(e, cr(t, s, n, !0), r), !0);
}), Wo);
var $n = /* @__PURE__ */ Symbol(), wr = /* @__PURE__ */ Symbol(), hi = /* @__PURE__ */ Symbol(), li = /* @__PURE__ */ Symbol();
let zo, Yo;
function ft(e, t, n, s) {
  var r = s[e];
  if (r) return r;
  (r = {}).W = (function(y) {
    switch (typeof y) {
      case "boolean":
        return wo ||= [0, void 0, !0];
      case "number":
        return y > 0 ? void 0 : y === 0 ? S2 ||= [0, void 0] : [-y, void 0];
      case "string":
        return [0, y];
      case "object":
        return y;
    }
  })(s[0]);
  var i = s[1];
  let o = 1;
  i && i.constructor === Object && (r.ia = i, typeof (i = s[++o]) == "function" && (r.na = !0, zo ??= i, Yo ??= s[o + 1], i = s[o += 2]));
  const c = {};
  for (; i && Array.isArray(i) && i.length && typeof i[0] == "number" && i[0] > 0; ) {
    for (var a = 0; a < i.length; a++) c[i[a]] = i;
    i = s[++o];
  }
  for (a = 1; i !== void 0; ) {
    let y;
    typeof i == "number" && (a += i, i = s[++o]);
    var h = void 0;
    if (i instanceof Ot ? y = i : (y = U2, o--), y?.l) {
      i = s[++o], h = s;
      var l = o;
      typeof i == "function" && (i = i(), h[l] = i), h = i;
    }
    for (l = a + 1, typeof (i = s[++o]) == "number" && i < 0 && (l -= i, i = s[++o]); a < l; a++) {
      const m = c[a];
      h ? n(r, a, y, h, m) : t(r, a, y, m);
    }
  }
  return s[e] = r;
}
function Ko(e) {
  return Array.isArray(e) ? e[0] instanceof Ot ? e : [D2, e] : [e, void 0];
}
function qo(e, t) {
  return e instanceof d ? (jn(e), e.u) : Array.isArray(e) ? qe(e, t, !1) : void 0;
}
function Er(e, t, n, s) {
  const r = n.g;
  e[t] = s ? (i, o, c) => r(i, o, c, s) : r;
}
function br(e, t, n, s, r) {
  const i = n.g;
  let o, c;
  e[t] = (a, h, l) => i(a, h, l, c ||= ft(wr, Er, br, s).W, o ||= Tr(s), r);
}
function Tr(e) {
  let t = e[hi];
  if (t != null) return t;
  const n = ft(wr, Er, br, e);
  return t = n.na ? (s, r) => zo(s, r, n) : (s, r) => {
    const i = T(s);
    for (; Do(r) && r.h != 4; ) {
      var o = r.m, c = n[o];
      if (c == null) {
        var a = n.ia;
        a && (a = a[o]) && (a = B2(a)) != null && (c = n[o] = a);
      }
      c != null && c(r, s, o) || (o = (c = r).l, mn(c), c.ha ? c = void 0 : (a = c.g.g - o, c.g.g = o, c = Uo(c.g, a)), o = s, c && (Ye ||= /* @__PURE__ */ Symbol(), (a = o[Ye]) ? a.push(c) : o[Ye] = [c]));
    }
    return 16384 & i && dt(s), !0;
  }, e[hi] = t;
}
function B2(e) {
  const t = (e = Ko(e))[0].g;
  if (e = e[1]) {
    const n = Tr(e), s = ft(wr, Er, br, e).W;
    return (r, i, o) => t(r, i, o, s, n);
  }
  return t;
}
function Jn(e, t, n) {
  e[t] = n.h;
}
function Zn(e, t, n, s) {
  let r, i;
  const o = n.h;
  e[t] = (c, a, h) => o(c, a, h, i ||= ft($n, Jn, Zn, s).W, r ||= $o(s));
}
function $o(e) {
  let t = e[li];
  if (!t) {
    const n = ft($n, Jn, Zn, e);
    t = (s, r) => Jo(s, r, n), e[li] = t;
  }
  return t;
}
function Jo(e, t, n) {
  for (var s = N(e), r = +!!(512 & s) - 1, i = e.length, o = 512 & s ? 1 : 0, c = i + (256 & s ? -1 : 0); o < c; o++) {
    const a = e[o];
    if (a == null) continue;
    const h = o - r, l = ui(n, h);
    l && l(t, a, h);
  }
  if (256 & s) {
    s = e[i - 1];
    for (const a in s) r = +a, Number.isNaN(r) || (i = s[r]) != null && (c = ui(n, r)) && c(t, i, r);
  }
  if (e = Ye ? e[Ye] : void 0) for (At(t, t.g.end()), n = 0; n < e.length; n++) At(t, Ws(e[n]) || new Uint8Array(0));
}
function ui(e, t) {
  var n = e[t];
  if (n) return n;
  if ((n = e.ia) && (n = n[t])) {
    var s = (n = Ko(n))[0].h;
    if (n = n[1]) {
      const r = $o(n), i = ft($n, Jn, Zn, n).W;
      n = e.na ? Yo(i, r) : (o, c, a) => s(o, c, a, i, r);
    } else n = s;
    return e[t] = n;
  }
}
function Nt(e, t) {
  if (Array.isArray(t)) {
    var n = N(t);
    if (4 & n) return t;
    for (var s = 0, r = 0; s < t.length; s++) {
      const i = e(t[s]);
      i != null && (t[r++] = i);
    }
    return r < s && (t.length = r), O(t, -12289 & (5 | n)), 2 & n && Object.freeze(t), t;
  }
}
function te(e, t, n) {
  return new Ot(e, t, n);
}
function It(e, t, n) {
  return new Ot(e, t, n);
}
function ne(e, t, n) {
  M(e, T(e), t, n);
}
var G2 = qn((function(e, t, n, s, r) {
  return e.h === 2 && (e = sn(e, qe([void 0, void 0], s, !0), r), je(s = T(t)), (r = Oe(t, s, n)) instanceof me ? (2 & r.M) != 0 ? ((r = r.Y()).push(e), M(t, s, n, r)) : r.Oa(e) : Array.isArray(r) ? (2 & N(r) && M(t, s, n, r = Mo(r)), r.push(e)) : M(t, s, n, [e]), !0);
}), (function(e, t, n, s, r) {
  if (t instanceof me) t.forEach(((i, o) => {
    Rn(e, n, qe([o, i], s, !1), r);
  }));
  else if (Array.isArray(t)) for (let i = 0; i < t.length; i++) {
    const o = t[i];
    Array.isArray(o) && Rn(e, n, qe(o, s, !1), r);
  }
}));
function Zo(e, t, n) {
  if (t = (function(s) {
    if (s == null) return s;
    const r = typeof s;
    if (r === "bigint") return String(BigInt.asIntN(64, s));
    if (Vn(s)) {
      if (r === "string") return er(s);
      if (r === "number") return Qs(s);
    }
  })(t), t != null && (typeof t == "string" && ci(t), t != null))
    switch (ye(e, n, 0), typeof t) {
      case "number":
        e = e.g, Et(t), vt(e, k, P);
        break;
      case "bigint":
        n = BigInt.asUintN(64, t), n = new Is(Number(n & BigInt(4294967295)), Number(n >> BigInt(32))), vt(e.g, n.h, n.g);
        break;
      default:
        n = ci(t), vt(e.g, n.h, n.g);
    }
}
function Qo(e, t, n) {
  (t = Mt(t)) != null && t != null && (ye(e, n, 0), Yn(e.g, t));
}
function ea(e, t, n) {
  (t = mo(t)) != null && (ye(e, n, 0), e.g.g.push(t ? 1 : 0));
}
function ta(e, t, n) {
  (t = Ke(t)) != null && Kn(e, n, so(t));
}
function na(e, t, n, s, r) {
  Rn(e, n, qo(t, s), r);
}
function sa(e, t, n) {
  (t = t == null || typeof t == "string" || en(t) || t instanceof Ge ? t : void 0) != null && Kn(e, n, lr(t).buffer);
}
function ra(e, t, n) {
  return (e.h === 5 || e.h === 2) && (t = Ft(t, T(t), n, 2, !1), e.h == 2 ? zn(e, Os, t) : t.push(Os(e.g)), !0);
}
var Pe = te((function(e, t, n) {
  if (e.h !== 1) return !1;
  var s = e.g;
  e = Fs(s);
  const r = Fs(s);
  s = 2 * (r >> 31) + 1;
  const i = r >>> 20 & 2047;
  return e = 4294967296 * (1048575 & r) + e, ne(t, n, i == 2047 ? e ? NaN : s * (1 / 0) : i == 0 ? 5e-324 * s * e : s * Math.pow(2, i - 1075) * (e + 4503599627370496)), !0;
}), (function(e, t, n) {
  (t = tt(t)) != null && (ye(e, n, 1), e = e.g, (n = po ||= new DataView(new ArrayBuffer(8))).setFloat64(0, +t, !0), k = n.getUint32(0, !0), P = n.getUint32(4, !0), Zt(e, k), Zt(e, P));
}), Ae()), W = te((function(e, t, n) {
  return e.h === 5 && (ne(t, n, Os(e.g)), !0);
}), (function(e, t, n) {
  (t = tt(t)) != null && (ye(e, n, 5), e = e.g, qs(t), Zt(e, k));
}), _r), V2 = It(ra, (function(e, t, n) {
  if ((t = Nt(tt, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && (ye(s, r, 5), s = s.g, qs(i), Zt(s, k));
  }
}), _r), Ar = It(ra, (function(e, t, n) {
  if ((t = Nt(tt, t)) != null && t.length) {
    ye(e, n, 2), rn(e.g, 4 * t.length);
    for (let s = 0; s < t.length; s++) n = e.g, qs(t[s]), Zt(n, k);
  }
}), _r), Qe = te((function(e, t, n) {
  return e.h === 0 && (ne(t, n, ur(e.g, Js)), !0);
}), Zo, jo), ms = te((function(e, t, n) {
  return e.h === 0 && (ne(t, n, (e = ur(e.g, Js)) === 0 ? void 0 : e), !0);
}), Zo, jo), j2 = te((function(e, t, n) {
  return e.h === 0 && (ne(t, n, ur(e.g, $s)), !0);
}), (function(e, t, n) {
  if ((t = A2(t)) != null && (typeof t == "string" && ai(t), t != null))
    switch (ye(e, n, 0), typeof t) {
      case "number":
        e = e.g, Et(t), vt(e, k, P);
        break;
      case "bigint":
        n = BigInt.asUintN(64, t), n = new Ns(Number(n & BigInt(4294967295)), Number(n >> BigInt(32))), vt(e.g, n.h, n.g);
        break;
      default:
        n = ai(t), vt(e.g, n.h, n.g);
    }
}), Ae()), U = te((function(e, t, n) {
  return e.h === 0 && (ne(t, n, Je(e.g)), !0);
}), Qo, vr), Qn = It((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Ft(t, T(t), n, 2, !1), e.h == 2 ? zn(e, Je, t) : t.push(Je(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Nt(Mt, t)) != null && t.length) {
    n = gr(e, n);
    for (let s = 0; s < t.length; s++) Yn(e.g, t[s]);
    pr(e, n);
  }
}), vr), yt = te((function(e, t, n) {
  return e.h === 0 && (ne(t, n, (e = Je(e.g)) === 0 ? void 0 : e), !0);
}), Qo, vr), F = te((function(e, t, n) {
  return e.h === 0 && (ne(t, n, dr(e.g)), !0);
}), ea, Vo), Wt = te((function(e, t, n) {
  return e.h === 0 && (ne(t, n, (e = dr(e.g)) === !1 ? void 0 : e), !0);
}), ea, Vo), K = It((function(e, t, n) {
  if (e.h !== 2) return !1;
  e = fr(e);
  const s = T(t);
  return je(s), Ft(t, s, n, 2).push(e), !0;
}), (function(e, t, n) {
  if ((t = Nt(Ke, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && Kn(s, r, so(i));
  }
}), yr), ze = te((function(e, t, n) {
  return e.h === 2 && (ne(t, n, (e = fr(e)) === "" ? void 0 : e), !0);
}), ta, yr), b = te((function(e, t, n) {
  return e.h === 2 && (ne(t, n, fr(e)), !0);
}), ta, yr), X = (function(e, t, n = mr) {
  return new Ot(e, t, n);
})((function(e, t, n, s, r) {
  if (e.h !== 2) return !1;
  s = qe(void 0, s, !0);
  let i = T(t);
  je(i);
  let o = Ft(t, i, n, 3);
  return i = T(t), 4 & N(o) && (o = ae(o), O(o, -2079 & (1 | N(o))), M(t, i, n, o)), o.push(s), sn(e, s, r), !0;
}), (function(e, t, n, s, r) {
  if (Array.isArray(t)) for (let i = 0; i < t.length; i++) na(e, t[i], n, s, r);
})), A = qn((function(e, t, n, s, r, i) {
  return e.h === 2 && (Ro(t, N(t), i, n), sn(e, t = cr(t, s, n), r), !0);
}), na), ia = te((function(e, t, n) {
  return e.h === 2 && (ne(t, n, Bo(e)), !0);
}), sa, Ho), H2 = It((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Ft(t, T(t), n, 2, !1), e.h == 2 ? zn(e, Ze, t) : t.push(Ze(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Nt(T2, t)) != null) for (let o = 0; o < t.length; o++) {
    var s = e, r = n, i = t[o];
    i != null && (ye(s, r, 0), rn(s.g, i));
  }
}), Ae()), be = te((function(e, t, n) {
  return e.h === 0 && (ne(t, n, Je(e.g)), !0);
}), (function(e, t, n) {
  (t = Mt(t)) != null && (t = parseInt(t, 10), ye(e, n, 0), Yn(e.g, t));
}), Xo);
class X2 {
  constructor(t, n) {
    this.h = t, this.g = n, this.l = w, this.m = p, this.defaultValue = void 0;
  }
}
function ke(e, t) {
  return new X2(e, t);
}
function nt(e, t) {
  return (n, s) => {
    if (un.length) {
      const i = un.pop();
      i.o(s), ps(i.g, n, s), n = i;
    } else n = new class {
      constructor(i, o) {
        if (oi.length) {
          const c = oi.pop();
          ps(c, i, o), i = c;
        } else i = new class {
          constructor(c, a) {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, ps(this, c, a);
          }
          clear() {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, this.ca = !1;
          }
        }(i, o);
        this.g = i, this.l = this.g.g, this.h = this.m = -1, this.o(o);
      }
      o({ ha: i = !1 } = {}) {
        this.ha = i;
      }
    }(n, s);
    try {
      const i = new e(), o = i.u;
      Tr(t)(o, n);
      var r = i;
    } finally {
      n.g.clear(), n.m = -1, n.h = -1, un.length < 100 && un.push(n);
    }
    return r;
  };
}
function es(e) {
  return function() {
    jn(this);
    const t = new class {
      constructor() {
        this.l = [], this.h = 0, this.g = new class {
          constructor() {
            this.g = [];
          }
          length() {
            return this.g.length;
          }
          end() {
            const o = this.g;
            return this.g = [], o;
          }
        }();
      }
    }();
    Jo(this.u, t, ft($n, Jn, Zn, e)), At(t, t.g.end());
    const n = new Uint8Array(t.h), s = t.l, r = s.length;
    let i = 0;
    for (let o = 0; o < r; o++) {
      const c = s[o];
      n.set(c, i), i += c.length;
    }
    return t.l = [n], n;
  };
}
var di = class extends d {
  constructor(e) {
    super(e);
  }
}, fi = [0, ze, te((function(e, t, n) {
  return e.h === 2 && (ne(t, n, (e = Bo(e)) === lt() ? void 0 : e), !0);
}), (function(e, t, n) {
  if (t != null) {
    if (t instanceof d) {
      const s = t.Ra;
      return void (s && (t = s(t), t != null && Kn(e, n, lr(t).buffer)));
    }
    if (Array.isArray(t)) return;
  }
  sa(e, t, n);
}), Ho)];
let ys, gi = globalThis.trustedTypes;
function pi(e) {
  ys === void 0 && (ys = (function() {
    let n = null;
    if (!gi) return n;
    try {
      const s = (r) => r;
      n = gi.createPolicy("goog#html", { createHTML: s, createScript: s, createScriptURL: s });
    } catch {
    }
    return n;
  })());
  var t = ys;
  return new class {
    constructor(n) {
      this.g = n;
    }
    toString() {
      return this.g + "";
    }
  }(t ? t.createScriptURL(e) : e);
}
function W2(e, ...t) {
  if (t.length === 0) return pi(e[0]);
  let n = e[0];
  for (let s = 0; s < t.length; s++) n += encodeURIComponent(t[s]) + e[s + 1];
  return pi(n);
}
var oa = [0, U, be, F, -1, Qn, be, -1], z2 = class extends d {
  constructor() {
    super();
  }
}, aa = [0, F, b, F, be, -1, It((function(e, t, n) {
  return (e.h === 0 || e.h === 2) && (t = Ft(t, T(t), n, 2, !1), e.h == 2 ? zn(e, N2, t) : t.push(Je(e.g)), !0);
}), (function(e, t, n) {
  if ((t = Nt(Mt, t)) != null && t.length) {
    n = gr(e, n);
    for (let s = 0; s < t.length; s++) Yn(e.g, t[s]);
    pr(e, n);
  }
}), Xo), b, -1, [0, F, -1], be, F, -1], ca = [0, b, -2], mi = class extends d {
  constructor() {
    super();
  }
}, ha = [0], la = [0, U, F, 1, F, -3], ce = class extends d {
  constructor(e) {
    super(e, 2);
  }
}, V = {};
V[336783863] = [0, b, F, -1, U, [0, [1, 2, 3, 4, 5, 6, 7], A, ha, A, aa, A, ca, A, la, A, oa, A, [0, b, -2], A, [0, b, be]], [0, b], F, [0, [1, 3], [2, 4], A, [0, Qn], -1, A, [0, K], -1, X, [0, b, -1]], b];
var yi = [0, ms, -1, Wt, -3, ms, Qn, ze, yt, ms, -1, Wt, yt, Wt, -2, ze];
function he(e, t) {
  Rs(e, 2, Rt(t), "");
}
function x(e, t) {
  Wn(e, 3, t);
}
function _(e, t) {
  Wn(e, 4, t);
}
var Z = class extends d {
  constructor(e) {
    super(e, 500);
  }
  o(e) {
    return p(this, 0, 7, e);
  }
}, zt = [-1, {}], vi = [0, b, 1, zt], _i = [0, b, K, zt];
function le(e, t) {
  Ln(e, 1, Z, t);
}
function L(e, t) {
  Wn(e, 10, t);
}
function E(e, t) {
  Wn(e, 15, t);
}
var se = class extends d {
  constructor(e) {
    super(e, 500);
  }
  o(e) {
    return p(this, 0, 1001, e);
  }
}, ua = [-500, X, [-500, ze, -1, K, -3, [-2, V, F], X, fi, yt, -1, vi, _i, X, [0, ze, Wt], ze, yi, yt, K, 987, K], 4, X, [-500, b, -1, [-1, {}], 998, b], X, [-500, b, K, -1, [-2, {}, F], 997, K, -1], yt, X, [-500, b, K, zt, 998, K], K, yt, vi, _i, X, [0, ze, -1, zt], K, -2, yi, ze, -1, Wt, 979, zt, X, fi];
se.prototype.g = es(ua);
var Y2 = nt(se, ua), K2 = class extends d {
  constructor(e) {
    super(e);
  }
}, da = class extends d {
  constructor(e) {
    super(e);
  }
  g() {
    return Ve(this, K2, 1);
  }
}, fa = [0, X, [0, U, W, b, -1]], ts = nt(da, fa), q2 = class extends d {
  constructor(e) {
    super(e);
  }
}, $2 = class extends d {
  constructor(e) {
    super(e);
  }
}, vs = class extends d {
  constructor(e) {
    super(e);
  }
  h() {
    return w(this, q2, 2);
  }
  g() {
    return Ve(this, $2, 5);
  }
}, ga = nt(class extends d {
  constructor(e) {
    super(e);
  }
}, [0, K, Qn, Ar, [0, be, [0, U, -3], [0, W, -3], [0, U, -1, [0, X, [0, U, -2]]], X, [0, W, -1, b, W]], b, -1, Qe, X, [0, U, W], K, Qe]), pa = class extends d {
  constructor(e) {
    super(e);
  }
}, _t = nt(class extends d {
  constructor(e) {
    super(e);
  }
}, [0, X, [0, W, -4]]), ma = class extends d {
  constructor(e) {
    super(e);
  }
}, on = nt(class extends d {
  constructor(e) {
    super(e);
  }
}, [0, X, [0, W, -4]]), J2 = class extends d {
  constructor(e) {
    super(e);
  }
}, Z2 = [0, U, -1, Ar, be], ya = class extends d {
  constructor() {
    super();
  }
};
ya.prototype.g = es([0, W, -4, Qe]);
var Q2 = class extends d {
  constructor(e) {
    super(e);
  }
}, ec = nt(class extends d {
  constructor(e) {
    super(e);
  }
}, [0, X, [0, 1, U, b, fa], Qe]), wi = class extends d {
  constructor(e) {
    super(e);
  }
}, tc = class extends d {
  constructor(e) {
    super(e);
  }
  qa() {
    const e = xo(this);
    return e ?? lt();
  }
}, nc = class extends d {
  constructor(e) {
    super(e);
  }
}, va = [1, 2], sc = nt(class extends d {
  constructor(e) {
    super(e);
  }
}, [0, X, [0, va, A, [0, Ar], A, [0, ia], U, b], Qe]), kr = class extends d {
  constructor(e) {
    super(e);
  }
}, _a = [0, b, U, W, K, -1], Ei = class extends d {
  constructor(e) {
    super(e);
  }
}, rc = [0, F, -1], bi = class extends d {
  constructor(e) {
    super(e);
  }
}, yn = [1, 2, 3, 4, 5], Fn = class extends d {
  constructor(e) {
    super(e);
  }
  g() {
    return xo(this) != null;
  }
  h() {
    return Ke($e(this, 2)) != null;
  }
}, R = class extends d {
  constructor(e) {
    super(e);
  }
  g() {
    return mo($e(this, 2)) ?? !1;
  }
}, wa = [0, ia, b, [0, U, Qe, -1], [0, j2, Qe]], B = [0, wa, F, [0, yn, A, la, A, aa, A, oa, A, ha, A, ca], be], ns = class extends d {
  constructor(e) {
    super(e);
  }
}, Sr = [0, B, W, -1, U], ic = ke(502141897, ns);
V[502141897] = Sr;
var oc = nt(class extends d {
  constructor(e) {
    super(e);
  }
}, [0, [0, be, -1, V2, H2], Z2]), Ea = class extends d {
  constructor(e) {
    super(e);
  }
}, ba = class extends d {
  constructor(e) {
    super(e);
  }
}, xr = [0, B, W, [0, B], F], Ta = [0, B, Sr, xr, W, [0, [0, wa]]], ac = ke(508968150, ba);
V[508968150] = Ta, V[508968149] = xr;
var Aa = class extends d {
  constructor(e) {
    super(e);
  }
}, cc = ke(513916220, Aa);
V[513916220] = [0, B, Ta, U];
var pt = class extends d {
  constructor(e) {
    super(e);
  }
  h() {
    return w(this, kr, 2);
  }
  g() {
    S(this, 2);
  }
}, ka = [0, B, _a];
V[478825465] = ka;
var hc = class extends d {
  constructor(e) {
    super(e);
  }
}, Sa = class extends d {
  constructor(e) {
    super(e);
  }
}, Lr = class extends d {
  constructor(e) {
    super(e);
  }
}, Cr = class extends d {
  constructor(e) {
    super(e);
  }
}, xa = class extends d {
  constructor(e) {
    super(e);
  }
}, Ti = [0, B, [0, B], ka, -1], La = [0, B, W, U], Mr = [0, B, W], Ca = [0, B, La, Mr, W], lc = ke(479097054, xa);
V[479097054] = [0, B, Ca, Ti], V[463370452] = Ti, V[464864288] = La;
var uc = ke(462713202, Cr);
V[462713202] = Ca, V[474472470] = Mr;
var dc = class extends d {
  constructor(e) {
    super(e);
  }
}, Ma = class extends d {
  constructor(e) {
    super(e);
  }
}, Ra = class extends d {
  constructor(e) {
    super(e);
  }
}, Fa = class extends d {
  constructor() {
    super();
  }
}, Rr = [0, B, W, -1, U], Ps = [0, B, W, F];
Fa.prototype.g = es([0, B, Mr, [0, B], Sr, xr, Rr, Ps]);
var Oa = class extends d {
  constructor(e) {
    super(e);
  }
}, fc = ke(456383383, Oa);
V[456383383] = [0, B, _a];
var Na = class extends d {
  constructor(e) {
    super(e);
  }
}, gc = ke(476348187, Na);
V[476348187] = [0, B, rc];
var Ia = class extends d {
  constructor(e) {
    super(e);
  }
}, Ai = class extends d {
  constructor(e) {
    super(e);
  }
}, Pa = [0, be, -1], pc = ke(458105876, class extends d {
  constructor(e) {
    super(e);
  }
  g() {
    var e = this.u;
    const t = T(e), n = 2 & t;
    return e = (function(s, r, i) {
      var o = Ai;
      const c = 2 & r;
      let a = !1;
      if (i == null) {
        if (c) return ri();
        i = [];
      } else if (i.constructor === me) {
        if ((2 & i.M) == 0 || c) return i;
        i = i.Y();
      } else Array.isArray(i) ? a = !!(2 & N(i)) : i = [];
      if (c) {
        if (!i.length) return ri();
        a || (a = !0, dt(i));
      } else a && (a = !1, i = Mo(i));
      return a || (64 & N(i) ? En(i, 32) : 32 & r && Pn(i, 32)), M(s, r, 2, o = new me(i, o, k2, void 0)), o;
    })(e, t, Oe(e, t, 2)), !n && Ai && (e.ta = !0), e;
  }
});
V[458105876] = [0, Pa, G2, [!0, Qe, [0, b, -1, K]]];
var Fr = class extends d {
  constructor(e) {
    super(e);
  }
}, Ua = ke(458105758, Fr);
V[458105758] = [0, B, b, Pa];
var Da = class extends d {
  constructor(e) {
    super(e);
  }
}, mc = ke(443442058, Da);
V[443442058] = [0, B, b, U, W, K, -1], V[514774813] = Rr;
var Ba = class extends d {
  constructor(e) {
    super(e);
  }
}, yc = ke(516587230, Ba);
function Us(e, t) {
  return t = t ? t.clone() : new kr(), e.displayNamesLocale !== void 0 ? S(t, 1, Rt(e.displayNamesLocale)) : e.displayNamesLocale === void 0 && S(t, 1), e.maxResults !== void 0 ? Fe(t, 2, e.maxResults) : "maxResults" in e && S(t, 2), e.scoreThreshold !== void 0 ? f(t, 3, e.scoreThreshold) : "scoreThreshold" in e && S(t, 3), e.categoryAllowlist !== void 0 ? Cn(t, 4, e.categoryAllowlist) : "categoryAllowlist" in e && S(t, 4), e.categoryDenylist !== void 0 ? Cn(t, 5, e.categoryDenylist) : "categoryDenylist" in e && S(t, 5), t;
}
function Or(e, t = -1, n = "") {
  return { categories: e.map(((s) => ({ index: Ee(pe(s, 1), 0) ?? -1, score: D(s, 2) ?? 0, categoryName: Re(s, 3) ?? "", displayName: Re(s, 4) ?? "" }))), headIndex: t, headName: n };
}
function Ga(e) {
  var t = ot(e, 3, tt, it()), n = ot(e, 2, Mt, it()), s = ot(e, 1, Ke, it()), r = ot(e, 9, Ke, it());
  const i = { categories: [], keypoints: [] };
  for (let o = 0; o < t.length; o++) i.categories.push({ score: t[o], index: n[o] ?? -1, categoryName: s[o] ?? "", displayName: r[o] ?? "" });
  if ((t = w(e, vs, 4)?.h()) && (i.boundingBox = { originX: pe(t, 1) ?? 0, originY: pe(t, 2) ?? 0, width: pe(t, 3) ?? 0, height: pe(t, 4) ?? 0, angle: 0 }), w(e, vs, 4)?.g().length) for (const o of w(e, vs, 4).g()) i.keypoints.push({ x: pn(o, 1) ?? 0, y: pn(o, 2) ?? 0, score: pn(o, 4) ?? 0, label: Ke($e(o, 3)) ?? "" });
  return i;
}
function ss(e) {
  const t = [];
  for (const n of Ve(e, ma, 1)) t.push({ x: D(n, 1) ?? 0, y: D(n, 2) ?? 0, z: D(n, 3) ?? 0, visibility: D(n, 4) ?? 0 });
  return t;
}
function Yt(e) {
  const t = [];
  for (const n of Ve(e, pa, 1)) t.push({ x: D(n, 1) ?? 0, y: D(n, 2) ?? 0, z: D(n, 3) ?? 0, visibility: D(n, 4) ?? 0 });
  return t;
}
function ki(e) {
  return Array.from(e, ((t) => t > 127 ? t - 256 : t));
}
function Si(e, t) {
  if (e.length !== t.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);
  let n = 0, s = 0, r = 0;
  for (let i = 0; i < e.length; i++) n += e[i] * t[i], s += e[i] * e[i], r += t[i] * t[i];
  if (s <= 0 || r <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return n / Math.sqrt(s * r);
}
let dn;
V[516587230] = [0, B, Rr, Ps, W], V[518928384] = Ps;
const vc = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function Va() {
  if (dn === void 0) try {
    await WebAssembly.instantiate(vc), dn = !0;
  } catch {
    dn = !1;
  }
  return dn;
}
async function Gt(e, t = W2``) {
  const n = await Va() ? "wasm_internal" : "wasm_nosimd_internal";
  return { wasmLoaderPath: `${t}/${e}_${n}.js`, wasmBinaryPath: `${t}/${e}_${n}.wasm` };
}
var rt = class {
};
function ja() {
  var e = navigator;
  return typeof OffscreenCanvas < "u" && (!(function(t = navigator) {
    return (t = t.userAgent).includes("Safari") && !t.includes("Chrome");
  })(e) || !!((e = e.userAgent.match(/Version\/([\d]+).*Safari/)) && e.length >= 1 && Number(e[1]) >= 17));
}
async function xi(e) {
  if (typeof importScripts != "function") {
    const t = document.createElement("script");
    return t.src = e.toString(), t.crossOrigin = "anonymous", new Promise(((n, s) => {
      t.addEventListener("load", (() => {
        n();
      }), !1), t.addEventListener("error", ((r) => {
        s(r);
      }), !1), document.body.appendChild(t);
    }));
  }
  importScripts(e.toString());
}
function Ha(e) {
  return e.videoWidth !== void 0 ? [e.videoWidth, e.videoHeight] : e.naturalWidth !== void 0 ? [e.naturalWidth, e.naturalHeight] : e.displayWidth !== void 0 ? [e.displayWidth, e.displayHeight] : [e.width, e.height];
}
function g(e, t, n) {
  e.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n(t = e.i.stringToNewUTF8(t)), e.i._free(t);
}
function Li(e, t, n) {
  if (!e.i.canvas) throw Error("No OpenGL canvas configured.");
  if (n ? e.i._bindTextureToStream(n) : e.i._bindTextureToCanvas(), !(n = e.i.canvas.getContext("webgl2") || e.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  e.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, t), e.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1);
  const [s, r] = Ha(t);
  return !e.l || s === e.i.canvas.width && r === e.i.canvas.height || (e.i.canvas.width = s, e.i.canvas.height = r), [s, r];
}
function Ci(e, t, n) {
  e.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const s = new Uint32Array(t.length);
  for (let r = 0; r < t.length; r++) s[r] = e.i.stringToNewUTF8(t[r]);
  t = e.i._malloc(4 * s.length), e.i.HEAPU32.set(s, t >> 2), n(t);
  for (const r of s) e.i._free(r);
  e.i._free(t);
}
function xe(e, t, n) {
  e.i.simpleListeners = e.i.simpleListeners || {}, e.i.simpleListeners[t] = n;
}
function Xe(e, t, n) {
  let s = [];
  e.i.simpleListeners = e.i.simpleListeners || {}, e.i.simpleListeners[t] = (r, i, o) => {
    i ? (n(s, o), s = []) : s.push(r);
  };
}
rt.forVisionTasks = function(e) {
  return Gt("vision", e);
}, rt.forTextTasks = function(e) {
  return Gt("text", e);
}, rt.forGenAiExperimentalTasks = function(e) {
  return Gt("genai_experimental", e);
}, rt.forGenAiTasks = function(e) {
  return Gt("genai", e);
}, rt.forAudioTasks = function(e) {
  return Gt("audio", e);
}, rt.isSimdSupported = function() {
  return Va();
};
async function _c(e, t, n, s) {
  return e = await (async (r, i, o, c, a) => {
    if (i && await xi(i), !self.ModuleFactory || o && (await xi(o), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && a && ((i = self.Module).locateFile = a.locateFile, a.mainScriptUrlOrBlob && (i.mainScriptUrlOrBlob = a.mainScriptUrlOrBlob)), a = await self.ModuleFactory(self.Module || a), self.ModuleFactory = self.Module = void 0, new r(a, c);
  })(e, n.wasmLoaderPath, n.assetLoaderPath, t, { locateFile: (r) => r.endsWith(".wasm") ? n.wasmBinaryPath.toString() : n.assetBinaryPath && r.endsWith(".data") ? n.assetBinaryPath.toString() : r }), await e.o(s), e;
}
function _s(e, t) {
  const n = w(e.baseOptions, Fn, 1) || new Fn();
  typeof t == "string" ? (S(n, 2, Rt(t)), S(n, 1)) : t instanceof Uint8Array && (S(n, 1, Ks(t, !1, !1)), S(n, 2)), p(e.baseOptions, 0, 1, n);
}
function Mi(e) {
  try {
    const t = e.H.length;
    if (t === 1) throw Error(e.H[0].message);
    if (t > 1) throw Error("Encountered multiple errors: " + e.H.map(((n) => n.message)).join(", "));
  } finally {
    e.H = [];
  }
}
function u(e, t) {
  e.B = Math.max(e.B, t);
}
function rs(e, t) {
  e.A = new Z(), he(e.A, "PassThroughCalculator"), x(e.A, "free_memory"), _(e.A, "free_memory_unused_out"), L(t, "free_memory"), le(t, e.A);
}
function kt(e, t) {
  x(e.A, t), _(e.A, t + "_unused_out");
}
function is(e) {
  e.g.addBoolToStream(!0, "free_memory", e.B);
}
var vn = class {
  constructor(e) {
    this.g = e, this.H = [], this.B = 0, this.g.setAutoRenderToScreen(!1);
  }
  l(e, t = !0) {
    if (t) {
      const n = e.baseOptions || {};
      if (e.baseOptions?.modelAssetBuffer && e.baseOptions?.modelAssetPath) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!(w(this.baseOptions, Fn, 1)?.g() || w(this.baseOptions, Fn, 1)?.h() || e.baseOptions?.modelAssetBuffer || e.baseOptions?.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if ((function(s, r) {
        let i = w(s.baseOptions, bi, 3);
        if (!i) {
          var o = i = new bi(), c = new mi();
          Xt(o, 4, yn, c);
        }
        "delegate" in r && (r.delegate === "GPU" ? (r = i, o = new z2(), Xt(r, 2, yn, o)) : (r = i, o = new mi(), Xt(r, 4, yn, o))), p(s.baseOptions, 0, 3, i);
      })(this, n), n.modelAssetPath) return fetch(n.modelAssetPath.toString()).then(((s) => {
        if (s.ok) return s.arrayBuffer();
        throw Error(`Failed to fetch model: ${n.modelAssetPath} (${s.status})`);
      })).then(((s) => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {
        }
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(s), !0, !1, !1), _s(this, "/model.dat"), this.m(), this.J();
      }));
      if (n.modelAssetBuffer instanceof Uint8Array) _s(this, n.modelAssetBuffer);
      else if (n.modelAssetBuffer) return (async function(s) {
        const r = [];
        for (var i = 0; ; ) {
          const { done: o, value: c } = await s.read();
          if (o) break;
          r.push(c), i += c.length;
        }
        if (r.length === 0) return new Uint8Array(0);
        if (r.length === 1) return r[0];
        s = new Uint8Array(i), i = 0;
        for (const o of r) s.set(o, i), i += o.length;
        return s;
      })(n.modelAssetBuffer).then(((s) => {
        _s(this, s), this.m(), this.J();
      }));
    }
    return this.m(), this.J(), Promise.resolve();
  }
  J() {
  }
  ea() {
    let e;
    if (this.g.ea(((t) => {
      e = Y2(t);
    })), !e) throw Error("Failed to retrieve CalculatorGraphConfig");
    return e;
  }
  setGraph(e, t) {
    this.g.attachErrorListener(((n, s) => {
      this.H.push(Error(s));
    })), this.g.Ma(), this.g.setGraph(e, t), this.A = void 0, Mi(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), Mi(this);
  }
  close() {
    this.A = void 0, this.g.closeGraph();
  }
};
function J(e, t) {
  if (!e) throw Error(`Unable to obtain required WebGL resource: ${t}`);
  return e;
}
vn.prototype.close = vn.prototype.close, (function(e, t) {
  e = e.split(".");
  var n, s = ht;
  for ((e[0] in s) || s.execScript === void 0 || s.execScript("var " + e[0]); e.length && (n = e.shift()); ) e.length || t === void 0 ? s = s[n] && s[n] !== Object.prototype[n] ? s[n] : s[n] = {} : s[n] = t;
})("TaskRunner", vn);
class wc {
  constructor(t, n, s, r) {
    this.g = t, this.h = n, this.m = s, this.l = r;
  }
  bind() {
    this.g.bindVertexArray(this.h);
  }
  close() {
    this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l);
  }
}
function Ri(e, t, n) {
  const s = e.g;
  if (n = J(s.createShader(n), "Failed to create WebGL shader"), s.shaderSource(n, t), s.compileShader(n), !s.getShaderParameter(n, s.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${s.getShaderInfoLog(n)}`);
  return s.attachShader(e.h, n), n;
}
function Fi(e, t) {
  const n = e.g, s = J(n.createVertexArray(), "Failed to create vertex array");
  n.bindVertexArray(s);
  const r = J(n.createBuffer(), "Failed to create buffer");
  n.bindBuffer(n.ARRAY_BUFFER, r), n.enableVertexAttribArray(e.P), n.vertexAttribPointer(e.P, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n.STATIC_DRAW);
  const i = J(n.createBuffer(), "Failed to create buffer");
  return n.bindBuffer(n.ARRAY_BUFFER, i), n.enableVertexAttribArray(e.J), n.vertexAttribPointer(e.J, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array(t ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n.STATIC_DRAW), n.bindBuffer(n.ARRAY_BUFFER, null), n.bindVertexArray(null), new wc(n, s, r, i);
}
function Nr(e, t) {
  if (e.g) {
    if (t !== e.g) throw Error("Cannot change GL context once initialized");
  } else e.g = t;
}
function an(e, t, n, s) {
  return Nr(e, t), e.h || (e.m(), e.C()), n ? (e.s || (e.s = Fi(e, !0)), n = e.s) : (e.v || (e.v = Fi(e, !1)), n = e.v), t.useProgram(e.h), n.bind(), e.l(), e = s(), n.g.bindVertexArray(null), e;
}
function et(e, t, n) {
  return Nr(e, t), e = J(t.createTexture(), "Failed to create texture"), t.bindTexture(t.TEXTURE_2D, e), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, n ?? t.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, n ?? t.LINEAR), t.bindTexture(t.TEXTURE_2D, null), e;
}
function os(e, t, n) {
  Nr(e, t), e.A || (e.A = J(t.createFramebuffer(), "Failed to create framebuffe.")), t.bindFramebuffer(t.FRAMEBUFFER, e.A), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, n, 0);
}
function Ir(e) {
  e.g?.bindFramebuffer(e.g.FRAMEBUFFER, null);
}
var Pt = class {
  H() {
    return `
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `;
  }
  m() {
    const e = this.g;
    if (this.h = J(e.createProgram(), "Failed to create WebGL program"), this.ba = Ri(this, `
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`, e.VERTEX_SHADER), this.aa = Ri(this, this.H(), e.FRAGMENT_SHADER), e.linkProgram(this.h), !e.getProgramParameter(this.h, e.LINK_STATUS)) throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);
    this.P = e.getAttribLocation(this.h, "aVertex"), this.J = e.getAttribLocation(this.h, "aTex");
  }
  C() {
  }
  l() {
  }
  close() {
    if (this.h) {
      const e = this.g;
      e.deleteProgram(this.h), e.deleteShader(this.ba), e.deleteShader(this.aa);
    }
    this.A && this.g.deleteFramebuffer(this.A), this.v && this.v.close(), this.s && this.s.close();
  }
}, Ec = class extends Pt {
  H() {
    return `
  precision mediump float;
  uniform sampler2D backgroundTexture;
  uniform sampler2D maskTexture;
  uniform sampler2D colorMappingTexture;
  varying vec2 vTex;
  void main() {
    vec4 backgroundColor = texture2D(backgroundTexture, vTex);
    float category = texture2D(maskTexture, vTex).r;
    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));
    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);
  }
 `;
  }
  C() {
    const e = this.g;
    e.activeTexture(e.TEXTURE1), this.B = et(this, e, e.LINEAR), e.activeTexture(e.TEXTURE2), this.j = et(this, e, e.NEAREST);
  }
  m() {
    super.m();
    const e = this.g;
    this.L = J(e.getUniformLocation(this.h, "backgroundTexture"), "Uniform location"), this.U = J(e.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location"), this.K = J(e.getUniformLocation(this.h, "maskTexture"), "Uniform location");
  }
  l() {
    super.l();
    const e = this.g;
    e.uniform1i(this.K, 0), e.uniform1i(this.L, 1), e.uniform1i(this.U, 2);
  }
  close() {
    this.B && this.g.deleteTexture(this.B), this.j && this.g.deleteTexture(this.j), super.close();
  }
}, bc = class extends Pt {
  H() {
    return `
  precision mediump float;
  uniform sampler2D maskTexture;
  uniform sampler2D defaultTexture;
  uniform sampler2D overlayTexture;
  varying vec2 vTex;
  void main() {
    float confidence = texture2D(maskTexture, vTex).r;
    vec4 defaultColor = texture2D(defaultTexture, vTex);
    vec4 overlayColor = texture2D(overlayTexture, vTex);
    // Apply the alpha from the overlay and merge in the default color
    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);
    gl_FragColor = mix(defaultColor, overlayColor, confidence);
  }
 `;
  }
  C() {
    const e = this.g;
    e.activeTexture(e.TEXTURE1), this.j = et(this, e), e.activeTexture(e.TEXTURE2), this.B = et(this, e);
  }
  m() {
    super.m();
    const e = this.g;
    this.K = J(e.getUniformLocation(this.h, "defaultTexture"), "Uniform location"), this.L = J(e.getUniformLocation(this.h, "overlayTexture"), "Uniform location"), this.I = J(e.getUniformLocation(this.h, "maskTexture"), "Uniform location");
  }
  l() {
    super.l();
    const e = this.g;
    e.uniform1i(this.I, 0), e.uniform1i(this.K, 1), e.uniform1i(this.L, 2);
  }
  close() {
    this.j && this.g.deleteTexture(this.j), this.B && this.g.deleteTexture(this.B), super.close();
  }
};
function Be(e, t) {
  switch (t) {
    case 0:
      return e.g.find(((n) => n instanceof Uint8Array));
    case 1:
      return e.g.find(((n) => n instanceof Float32Array));
    case 2:
      return e.g.find(((n) => typeof WebGLTexture < "u" && n instanceof WebGLTexture));
    default:
      throw Error(`Type is not supported: ${t}`);
  }
}
function Ds(e) {
  var t = Be(e, 1);
  if (!t) {
    if (t = Be(e, 0)) t = new Float32Array(t).map(((s) => s / 255));
    else {
      t = new Float32Array(e.width * e.height);
      const s = St(e);
      var n = Pr(e);
      if (os(n, s, Xa(e)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document" in self && "ontouchend" in self.document) {
        n = new Float32Array(e.width * e.height * 4), s.readPixels(0, 0, e.width, e.height, s.RGBA, s.FLOAT, n);
        for (let r = 0, i = 0; r < t.length; ++r, i += 4) t[r] = n[i];
      } else s.readPixels(0, 0, e.width, e.height, s.RED, s.FLOAT, t);
    }
    e.g.push(t);
  }
  return t;
}
function Xa(e) {
  let t = Be(e, 2);
  if (!t) {
    const n = St(e);
    t = za(e);
    const s = Ds(e), r = Wa(e);
    n.texImage2D(n.TEXTURE_2D, 0, r, e.width, e.height, 0, n.RED, n.FLOAT, s), Bs(e);
  }
  return t;
}
function St(e) {
  if (!e.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return e.h || (e.h = J(e.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), e.h;
}
function Wa(e) {
  if (e = St(e), !fn) if (e.getExtension("EXT_color_buffer_float") && e.getExtension("OES_texture_float_linear") && e.getExtension("EXT_float_blend")) fn = e.R32F;
  else {
    if (!e.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    fn = e.R16F;
  }
  return fn;
}
function Pr(e) {
  return e.l || (e.l = new Pt()), e.l;
}
function za(e) {
  const t = St(e);
  t.viewport(0, 0, e.width, e.height), t.activeTexture(t.TEXTURE0);
  let n = Be(e, 2);
  return n || (n = et(Pr(e), t, e.m ? t.LINEAR : t.NEAREST), e.g.push(n), e.j = !0), t.bindTexture(t.TEXTURE_2D, n), n;
}
function Bs(e) {
  e.h.bindTexture(e.h.TEXTURE_2D, null);
}
var fn, H = class {
  constructor(e, t, n, s, r, i, o) {
    this.g = e, this.m = t, this.j = n, this.canvas = s, this.l = r, this.width = i, this.height = o, this.j && --Oi === 0 && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.");
  }
  Ha() {
    return !!Be(this, 0);
  }
  la() {
    return !!Be(this, 1);
  }
  R() {
    return !!Be(this, 2);
  }
  ka() {
    return (t = Be(e = this, 0)) || (t = Ds(e), t = new Uint8Array(t.map(((n) => 255 * n))), e.g.push(t)), t;
    var e, t;
  }
  ja() {
    return Ds(this);
  }
  N() {
    return Xa(this);
  }
  clone() {
    const e = [];
    for (const t of this.g) {
      let n;
      if (t instanceof Uint8Array) n = new Uint8Array(t);
      else if (t instanceof Float32Array) n = new Float32Array(t);
      else {
        if (!(t instanceof WebGLTexture)) throw Error(`Type is not supported: ${t}`);
        {
          const s = St(this), r = Pr(this);
          s.activeTexture(s.TEXTURE1), n = et(r, s, this.m ? s.LINEAR : s.NEAREST), s.bindTexture(s.TEXTURE_2D, n);
          const i = Wa(this);
          s.texImage2D(s.TEXTURE_2D, 0, i, this.width, this.height, 0, s.RED, s.FLOAT, null), s.bindTexture(s.TEXTURE_2D, null), os(r, s, n), an(r, s, !1, (() => {
            za(this), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4), Bs(this);
          })), Ir(r), Bs(this);
        }
      }
      e.push(n);
    }
    return new H(e, this.m, this.R(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && St(this).deleteTexture(Be(this, 2)), Oi = -1;
  }
};
H.prototype.close = H.prototype.close, H.prototype.clone = H.prototype.clone, H.prototype.getAsWebGLTexture = H.prototype.N, H.prototype.getAsFloat32Array = H.prototype.ja, H.prototype.getAsUint8Array = H.prototype.ka, H.prototype.hasWebGLTexture = H.prototype.R, H.prototype.hasFloat32Array = H.prototype.la, H.prototype.hasUint8Array = H.prototype.Ha;
var Oi = 250;
const Tc = { color: "white", lineWidth: 4, radius: 6 };
function ws(e) {
  return { ...Tc, fillColor: (e = e || {}).color, ...e };
}
function Ie(e, t) {
  return e instanceof Function ? e(t) : e;
}
function Ni(e, t, n) {
  return Math.max(Math.min(t, n), Math.min(Math.max(t, n), e));
}
function Vt(e) {
  if (!e.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
  return e.l;
}
function Qt(e) {
  if (!e.j) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
  return e.j;
}
function Ii(e, t, n) {
  if (t.R()) n(t.N());
  else {
    const s = t.la() ? t.ja() : t.ka();
    e.m = e.m ?? new Pt();
    const r = Qt(e);
    n((e = new H([s], t.m, !1, r.canvas, e.m, t.width, t.height)).N()), e.close();
  }
}
function Pi(e, t, n, s) {
  const r = (function(c) {
    return c.g || (c.g = new Ec()), c.g;
  })(e), i = Qt(e), o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n;
  an(r, i, !0, (() => {
    (function(a, h, l, y) {
      const m = a.g;
      if (m.activeTexture(m.TEXTURE0), m.bindTexture(m.TEXTURE_2D, h), m.activeTexture(m.TEXTURE1), m.bindTexture(m.TEXTURE_2D, a.B), m.texImage2D(m.TEXTURE_2D, 0, m.RGBA, m.RGBA, m.UNSIGNED_BYTE, l), a.I && (function(Y, G) {
        if (Y !== G) return !1;
        Y = Y.entries(), G = G.entries();
        for (const [cn, gt] of Y) {
          Y = cn;
          const He = gt;
          var j = G.next();
          if (j.done) return !1;
          const [Ut, hn] = j.value;
          if (j = hn, Y !== Ut || He[0] !== j[0] || He[1] !== j[1] || He[2] !== j[2] || He[3] !== j[3]) return !1;
        }
        return !!G.next().done;
      })(a.I, y)) m.activeTexture(m.TEXTURE2), m.bindTexture(m.TEXTURE_2D, a.j);
      else {
        a.I = y;
        const Y = Array(1024).fill(0);
        y.forEach(((G, j) => {
          if (G.length !== 4) throw Error(`Color at index ${j} is not a four-channel value.`);
          Y[4 * j] = G[0], Y[4 * j + 1] = G[1], Y[4 * j + 2] = G[2], Y[4 * j + 3] = G[3];
        })), m.activeTexture(m.TEXTURE2), m.bindTexture(m.TEXTURE_2D, a.j), m.texImage2D(m.TEXTURE_2D, 0, m.RGBA, 256, 1, 0, m.RGBA, m.UNSIGNED_BYTE, new Uint8Array(Y));
      }
    })(r, t, o, s), i.clearColor(0, 0, 0, 0), i.clear(i.COLOR_BUFFER_BIT), i.drawArrays(i.TRIANGLE_FAN, 0, 4);
    const c = r.g;
    c.activeTexture(c.TEXTURE0), c.bindTexture(c.TEXTURE_2D, null), c.activeTexture(c.TEXTURE1), c.bindTexture(c.TEXTURE_2D, null), c.activeTexture(c.TEXTURE2), c.bindTexture(c.TEXTURE_2D, null);
  }));
}
function Ui(e, t, n, s) {
  const r = Qt(e), i = (function(a) {
    return a.h || (a.h = new bc()), a.h;
  })(e), o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n, c = Array.isArray(s) ? new ImageData(new Uint8ClampedArray(s), 1, 1) : s;
  an(i, r, !0, (() => {
    var a = i.g;
    a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, t), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, i.j), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, o), a.activeTexture(a.TEXTURE2), a.bindTexture(a.TEXTURE_2D, i.B), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, c), r.clearColor(0, 0, 0, 0), r.clear(r.COLOR_BUFFER_BIT), r.drawArrays(r.TRIANGLE_FAN, 0, 4), r.bindTexture(r.TEXTURE_2D, null), (a = i.g).activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D, null), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, null), a.activeTexture(a.TEXTURE2), a.bindTexture(a.TEXTURE_2D, null);
  }));
}
var q = class {
  constructor(e, t) {
    e instanceof CanvasRenderingContext2D || e instanceof OffscreenCanvasRenderingContext2D ? (this.l = e, this.j = t) : this.j = e;
  }
  Aa(e, t) {
    if (e) {
      var n = Vt(this);
      t = ws(t), n.save();
      var s = n.canvas, r = 0;
      for (const i of e) n.fillStyle = Ie(t.fillColor, { index: r, from: i }), n.strokeStyle = Ie(t.color, { index: r, from: i }), n.lineWidth = Ie(t.lineWidth, { index: r, from: i }), (e = new Path2D()).arc(i.x * s.width, i.y * s.height, Ie(t.radius, { index: r, from: i }), 0, 2 * Math.PI), n.fill(e), n.stroke(e), ++r;
      n.restore();
    }
  }
  za(e, t, n) {
    if (e && t) {
      var s = Vt(this);
      n = ws(n), s.save();
      var r = s.canvas, i = 0;
      for (const o of t) {
        s.beginPath(), t = e[o.start];
        const c = e[o.end];
        t && c && (s.strokeStyle = Ie(n.color, { index: i, from: t, to: c }), s.lineWidth = Ie(n.lineWidth, { index: i, from: t, to: c }), s.moveTo(t.x * r.width, t.y * r.height), s.lineTo(c.x * r.width, c.y * r.height)), ++i, s.stroke();
      }
      s.restore();
    }
  }
  wa(e, t) {
    const n = Vt(this);
    t = ws(t), n.save(), n.beginPath(), n.lineWidth = Ie(t.lineWidth, {}), n.strokeStyle = Ie(t.color, {}), n.fillStyle = Ie(t.fillColor, {}), n.moveTo(e.originX, e.originY), n.lineTo(e.originX + e.width, e.originY), n.lineTo(e.originX + e.width, e.originY + e.height), n.lineTo(e.originX, e.originY + e.height), n.lineTo(e.originX, e.originY), n.stroke(), n.fill(), n.restore();
  }
  xa(e, t, n = [0, 0, 0, 255]) {
    this.l ? (function(s, r, i, o) {
      const c = Qt(s);
      Ii(s, r, ((a) => {
        Pi(s, a, i, o), (a = Vt(s)).drawImage(c.canvas, 0, 0, a.canvas.width, a.canvas.height);
      }));
    })(this, e, n, t) : Pi(this, e.N(), n, t);
  }
  ya(e, t, n) {
    this.l ? (function(s, r, i, o) {
      const c = Qt(s);
      Ii(s, r, ((a) => {
        Ui(s, a, i, o), (a = Vt(s)).drawImage(c.canvas, 0, 0, a.canvas.width, a.canvas.height);
      }));
    })(this, e, t, n) : Ui(this, e.N(), t, n);
  }
  close() {
    this.g?.close(), this.g = void 0, this.h?.close(), this.h = void 0, this.m?.close(), this.m = void 0;
  }
};
function Me(e, t) {
  switch (t) {
    case 0:
      return e.g.find(((n) => n instanceof ImageData));
    case 1:
      return e.g.find(((n) => typeof ImageBitmap < "u" && n instanceof ImageBitmap));
    case 2:
      return e.g.find(((n) => typeof WebGLTexture < "u" && n instanceof WebGLTexture));
    default:
      throw Error(`Type is not supported: ${t}`);
  }
}
function Ya(e) {
  var t = Me(e, 0);
  if (!t) {
    t = xt(e);
    const n = as(e), s = new Uint8Array(e.width * e.height * 4);
    os(n, t, _n(e)), t.readPixels(0, 0, e.width, e.height, t.RGBA, t.UNSIGNED_BYTE, s), Ir(n), t = new ImageData(new Uint8ClampedArray(s.buffer), e.width, e.height), e.g.push(t);
  }
  return t;
}
function _n(e) {
  let t = Me(e, 2);
  if (!t) {
    const n = xt(e);
    t = wn(e);
    const s = Me(e, 1) || Ya(e);
    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, s), Ht(e);
  }
  return t;
}
function xt(e) {
  if (!e.canvas) throw Error("Conversion to different image formats require that a canvas is passed when iniitializing the image.");
  return e.h || (e.h = J(e.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), e.h;
}
function as(e) {
  return e.l || (e.l = new Pt()), e.l;
}
function wn(e) {
  const t = xt(e);
  t.viewport(0, 0, e.width, e.height), t.activeTexture(t.TEXTURE0);
  let n = Me(e, 2);
  return n || (n = et(as(e), t), e.g.push(n), e.m = !0), t.bindTexture(t.TEXTURE_2D, n), n;
}
function Ht(e) {
  e.h.bindTexture(e.h.TEXTURE_2D, null);
}
function Di(e) {
  const t = xt(e);
  return an(as(e), t, !0, (() => (function(n, s) {
    const r = n.canvas;
    if (r.width === n.width && r.height === n.height) return s();
    const i = r.width, o = r.height;
    return r.width = n.width, r.height = n.height, n = s(), r.width = i, r.height = o, n;
  })(e, (() => {
    if (t.bindFramebuffer(t.FRAMEBUFFER, null), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), !(e.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return e.canvas.transferToImageBitmap();
  }))));
}
q.prototype.close = q.prototype.close, q.prototype.drawConfidenceMask = q.prototype.ya, q.prototype.drawCategoryMask = q.prototype.xa, q.prototype.drawBoundingBox = q.prototype.wa, q.prototype.drawConnectors = q.prototype.za, q.prototype.drawLandmarks = q.prototype.Aa, q.lerp = function(e, t, n, s, r) {
  return Ni(s * (1 - (e - t) / (n - t)) + r * (1 - (n - e) / (n - t)), s, r);
}, q.clamp = Ni;
var z = class {
  constructor(e, t, n, s, r, i, o) {
    this.g = e, this.j = t, this.m = n, this.canvas = s, this.l = r, this.width = i, this.height = o, (this.j || this.m) && --Bi === 0 && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources.");
  }
  Ga() {
    return !!Me(this, 0);
  }
  ma() {
    return !!Me(this, 1);
  }
  R() {
    return !!Me(this, 2);
  }
  Ea() {
    return Ya(this);
  }
  Da() {
    var e = Me(this, 1);
    return e || (_n(this), wn(this), e = Di(this), Ht(this), this.g.push(e), this.j = !0), e;
  }
  N() {
    return _n(this);
  }
  clone() {
    const e = [];
    for (const t of this.g) {
      let n;
      if (t instanceof ImageData) n = new ImageData(t.data, this.width, this.height);
      else if (t instanceof WebGLTexture) {
        const s = xt(this), r = as(this);
        s.activeTexture(s.TEXTURE1), n = et(r, s), s.bindTexture(s.TEXTURE_2D, n), s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, this.width, this.height, 0, s.RGBA, s.UNSIGNED_BYTE, null), s.bindTexture(s.TEXTURE_2D, null), os(r, s, n), an(r, s, !1, (() => {
          wn(this), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4), Ht(this);
        })), Ir(r), Ht(this);
      } else {
        if (!(t instanceof ImageBitmap)) throw Error(`Type is not supported: ${t}`);
        _n(this), wn(this), n = Di(this), Ht(this);
      }
      e.push(n);
    }
    return new z(e, this.ma(), this.R(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Me(this, 1).close(), this.m && xt(this).deleteTexture(Me(this, 2)), Bi = -1;
  }
};
z.prototype.close = z.prototype.close, z.prototype.clone = z.prototype.clone, z.prototype.getAsWebGLTexture = z.prototype.N, z.prototype.getAsImageBitmap = z.prototype.Da, z.prototype.getAsImageData = z.prototype.Ea, z.prototype.hasWebGLTexture = z.prototype.R, z.prototype.hasImageBitmap = z.prototype.ma, z.prototype.hasImageData = z.prototype.Ga;
var Bi = 250;
function Se(...e) {
  return e.map((([t, n]) => ({ start: t, end: n })));
}
const Ac = /* @__PURE__ */ (function(e) {
  return class extends e {
    Ma() {
      this.i._registerModelResourcesGraphService();
    }
  };
})((Gi = class {
  constructor(e, t) {
    this.l = !0, this.i = e, this.g = null, this.h = 0, this.m = typeof this.i._addIntToInputStream == "function", t !== void 0 ? this.i.canvas = t : ja() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
  }
  async initializeGraph(e) {
    const t = await (await fetch(e)).arrayBuffer();
    e = !(e.endsWith(".pbtxt") || e.endsWith(".textproto")), this.setGraph(new Uint8Array(t), e);
  }
  setGraphFromString(e) {
    this.setGraph(new TextEncoder().encode(e), !1);
  }
  setGraph(e, t) {
    const n = e.length, s = this.i._malloc(n);
    this.i.HEAPU8.set(e, s), t ? this.i._changeBinaryGraph(n, s) : this.i._changeTextGraph(n, s), this.i._free(s);
  }
  configureAudio(e, t, n, s, r) {
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), g(this, s || "input_audio", ((i) => {
      g(this, r = r || "audio_header", ((o) => {
        this.i._configureAudio(i, o, e, t ?? 0, n);
      }));
    }));
  }
  setAutoResizeCanvas(e) {
    this.l = e;
  }
  setAutoRenderToScreen(e) {
    this.i._setAutoRenderToScreen(e);
  }
  setGpuBufferVerticalFlip(e) {
    this.i.gpuOriginForWebTexturesIsBottomLeft = e;
  }
  ea(e) {
    xe(this, "__graph_config__", ((t) => {
      e(t);
    })), g(this, "__graph_config__", ((t) => {
      this.i._getGraphConfig(t, void 0);
    })), delete this.i.simpleListeners.__graph_config__;
  }
  attachErrorListener(e) {
    this.i.errorListener = e;
  }
  attachEmptyPacketListener(e, t) {
    this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[e] = t;
  }
  addAudioToStream(e, t, n) {
    this.addAudioToStreamWithShape(e, 0, 0, t, n);
  }
  addAudioToStreamWithShape(e, t, n, s, r) {
    const i = 4 * e.length;
    this.h !== i && (this.g && this.i._free(this.g), this.g = this.i._malloc(i), this.h = i), this.i.HEAPF32.set(e, this.g / 4), g(this, s, ((o) => {
      this.i._addAudioToInputStream(this.g, t, n, o, r);
    }));
  }
  addGpuBufferToStream(e, t, n) {
    g(this, t, ((s) => {
      const [r, i] = Li(this, e, s);
      this.i._addBoundTextureToStream(s, r, i, n);
    }));
  }
  addBoolToStream(e, t, n) {
    g(this, t, ((s) => {
      this.i._addBoolToInputStream(e, s, n);
    }));
  }
  addDoubleToStream(e, t, n) {
    g(this, t, ((s) => {
      this.i._addDoubleToInputStream(e, s, n);
    }));
  }
  addFloatToStream(e, t, n) {
    g(this, t, ((s) => {
      this.i._addFloatToInputStream(e, s, n);
    }));
  }
  addIntToStream(e, t, n) {
    g(this, t, ((s) => {
      this.i._addIntToInputStream(e, s, n);
    }));
  }
  addUintToStream(e, t, n) {
    g(this, t, ((s) => {
      this.i._addUintToInputStream(e, s, n);
    }));
  }
  addStringToStream(e, t, n) {
    g(this, t, ((s) => {
      g(this, e, ((r) => {
        this.i._addStringToInputStream(r, s, n);
      }));
    }));
  }
  addStringRecordToStream(e, t, n) {
    g(this, t, ((s) => {
      Ci(this, Object.keys(e), ((r) => {
        Ci(this, Object.values(e), ((i) => {
          this.i._addFlatHashMapToInputStream(r, i, Object.keys(e).length, s, n);
        }));
      }));
    }));
  }
  addProtoToStream(e, t, n, s) {
    g(this, n, ((r) => {
      g(this, t, ((i) => {
        const o = this.i._malloc(e.length);
        this.i.HEAPU8.set(e, o), this.i._addProtoToInputStream(o, e.length, i, r, s), this.i._free(o);
      }));
    }));
  }
  addEmptyPacketToStream(e, t) {
    g(this, e, ((n) => {
      this.i._addEmptyPacketToInputStream(n, t);
    }));
  }
  addBoolVectorToStream(e, t, n) {
    g(this, t, ((s) => {
      const r = this.i._allocateBoolVector(e.length);
      if (!r) throw Error("Unable to allocate new bool vector on heap.");
      for (const i of e) this.i._addBoolVectorEntry(r, i);
      this.i._addBoolVectorToInputStream(r, s, n);
    }));
  }
  addDoubleVectorToStream(e, t, n) {
    g(this, t, ((s) => {
      const r = this.i._allocateDoubleVector(e.length);
      if (!r) throw Error("Unable to allocate new double vector on heap.");
      for (const i of e) this.i._addDoubleVectorEntry(r, i);
      this.i._addDoubleVectorToInputStream(r, s, n);
    }));
  }
  addFloatVectorToStream(e, t, n) {
    g(this, t, ((s) => {
      const r = this.i._allocateFloatVector(e.length);
      if (!r) throw Error("Unable to allocate new float vector on heap.");
      for (const i of e) this.i._addFloatVectorEntry(r, i);
      this.i._addFloatVectorToInputStream(r, s, n);
    }));
  }
  addIntVectorToStream(e, t, n) {
    g(this, t, ((s) => {
      const r = this.i._allocateIntVector(e.length);
      if (!r) throw Error("Unable to allocate new int vector on heap.");
      for (const i of e) this.i._addIntVectorEntry(r, i);
      this.i._addIntVectorToInputStream(r, s, n);
    }));
  }
  addUintVectorToStream(e, t, n) {
    g(this, t, ((s) => {
      const r = this.i._allocateUintVector(e.length);
      if (!r) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const i of e) this.i._addUintVectorEntry(r, i);
      this.i._addUintVectorToInputStream(r, s, n);
    }));
  }
  addStringVectorToStream(e, t, n) {
    g(this, t, ((s) => {
      const r = this.i._allocateStringVector(e.length);
      if (!r) throw Error("Unable to allocate new string vector on heap.");
      for (const i of e) g(this, i, ((o) => {
        this.i._addStringVectorEntry(r, o);
      }));
      this.i._addStringVectorToInputStream(r, s, n);
    }));
  }
  addBoolToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      this.i._addBoolToInputSidePacket(e, n);
    }));
  }
  addDoubleToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      this.i._addDoubleToInputSidePacket(e, n);
    }));
  }
  addFloatToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      this.i._addFloatToInputSidePacket(e, n);
    }));
  }
  addIntToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      this.i._addIntToInputSidePacket(e, n);
    }));
  }
  addUintToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      this.i._addUintToInputSidePacket(e, n);
    }));
  }
  addStringToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      g(this, e, ((s) => {
        this.i._addStringToInputSidePacket(s, n);
      }));
    }));
  }
  addProtoToInputSidePacket(e, t, n) {
    g(this, n, ((s) => {
      g(this, t, ((r) => {
        const i = this.i._malloc(e.length);
        this.i.HEAPU8.set(e, i), this.i._addProtoToInputSidePacket(i, e.length, r, s), this.i._free(i);
      }));
    }));
  }
  addBoolVectorToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      const s = this.i._allocateBoolVector(e.length);
      if (!s) throw Error("Unable to allocate new bool vector on heap.");
      for (const r of e) this.i._addBoolVectorEntry(s, r);
      this.i._addBoolVectorToInputSidePacket(s, n);
    }));
  }
  addDoubleVectorToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      const s = this.i._allocateDoubleVector(e.length);
      if (!s) throw Error("Unable to allocate new double vector on heap.");
      for (const r of e) this.i._addDoubleVectorEntry(s, r);
      this.i._addDoubleVectorToInputSidePacket(s, n);
    }));
  }
  addFloatVectorToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      const s = this.i._allocateFloatVector(e.length);
      if (!s) throw Error("Unable to allocate new float vector on heap.");
      for (const r of e) this.i._addFloatVectorEntry(s, r);
      this.i._addFloatVectorToInputSidePacket(s, n);
    }));
  }
  addIntVectorToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      const s = this.i._allocateIntVector(e.length);
      if (!s) throw Error("Unable to allocate new int vector on heap.");
      for (const r of e) this.i._addIntVectorEntry(s, r);
      this.i._addIntVectorToInputSidePacket(s, n);
    }));
  }
  addUintVectorToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      const s = this.i._allocateUintVector(e.length);
      if (!s) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const r of e) this.i._addUintVectorEntry(s, r);
      this.i._addUintVectorToInputSidePacket(s, n);
    }));
  }
  addStringVectorToInputSidePacket(e, t) {
    g(this, t, ((n) => {
      const s = this.i._allocateStringVector(e.length);
      if (!s) throw Error("Unable to allocate new string vector on heap.");
      for (const r of e) g(this, r, ((i) => {
        this.i._addStringVectorEntry(s, i);
      }));
      this.i._addStringVectorToInputSidePacket(s, n);
    }));
  }
  attachBoolListener(e, t) {
    xe(this, e, t), g(this, e, ((n) => {
      this.i._attachBoolListener(n);
    }));
  }
  attachBoolVectorListener(e, t) {
    Xe(this, e, t), g(this, e, ((n) => {
      this.i._attachBoolVectorListener(n);
    }));
  }
  attachIntListener(e, t) {
    xe(this, e, t), g(this, e, ((n) => {
      this.i._attachIntListener(n);
    }));
  }
  attachIntVectorListener(e, t) {
    Xe(this, e, t), g(this, e, ((n) => {
      this.i._attachIntVectorListener(n);
    }));
  }
  attachUintListener(e, t) {
    xe(this, e, t), g(this, e, ((n) => {
      this.i._attachUintListener(n);
    }));
  }
  attachUintVectorListener(e, t) {
    Xe(this, e, t), g(this, e, ((n) => {
      this.i._attachUintVectorListener(n);
    }));
  }
  attachDoubleListener(e, t) {
    xe(this, e, t), g(this, e, ((n) => {
      this.i._attachDoubleListener(n);
    }));
  }
  attachDoubleVectorListener(e, t) {
    Xe(this, e, t), g(this, e, ((n) => {
      this.i._attachDoubleVectorListener(n);
    }));
  }
  attachFloatListener(e, t) {
    xe(this, e, t), g(this, e, ((n) => {
      this.i._attachFloatListener(n);
    }));
  }
  attachFloatVectorListener(e, t) {
    Xe(this, e, t), g(this, e, ((n) => {
      this.i._attachFloatVectorListener(n);
    }));
  }
  attachStringListener(e, t) {
    xe(this, e, t), g(this, e, ((n) => {
      this.i._attachStringListener(n);
    }));
  }
  attachStringVectorListener(e, t) {
    Xe(this, e, t), g(this, e, ((n) => {
      this.i._attachStringVectorListener(n);
    }));
  }
  attachProtoListener(e, t, n) {
    xe(this, e, t), g(this, e, ((s) => {
      this.i._attachProtoListener(s, n || !1);
    }));
  }
  attachProtoVectorListener(e, t, n) {
    Xe(this, e, t), g(this, e, ((s) => {
      this.i._attachProtoVectorListener(s, n || !1);
    }));
  }
  attachAudioListener(e, t, n) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), xe(this, e, ((s, r) => {
      s = new Float32Array(s.buffer, s.byteOffset, s.length / 4), t(s, r);
    })), g(this, e, ((s) => {
      this.i._attachAudioListener(s, n || !1);
    }));
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends Gi {
  get ga() {
    return this.i;
  }
  sa(e, t, n) {
    g(this, t, ((s) => {
      const [r, i] = Li(this, e, s);
      this.ga._addBoundTextureAsImageToStream(s, r, i, n);
    }));
  }
  V(e, t) {
    xe(this, e, t), g(this, e, ((n) => {
      this.ga._attachImageListener(n);
    }));
  }
  da(e, t) {
    Xe(this, e, t), g(this, e, ((n) => {
      this.ga._attachImageVectorListener(n);
    }));
  }
}));
var Gi, ve = class extends Ac {
};
async function v(e, t, n) {
  return (async function(s, r, i, o) {
    return _c(s, r, i, o);
  })(e, n.canvas ?? (ja() ? void 0 : document.createElement("canvas")), t, n);
}
function Ka(e, t, n, s) {
  if (e.U) {
    const i = new ya();
    if (n?.regionOfInterest) {
      if (!e.ra) throw Error("This task doesn't support region-of-interest.");
      var r = n.regionOfInterest;
      if (r.left >= r.right || r.top >= r.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (r.left < 0 || r.top < 0 || r.right > 1 || r.bottom > 1) throw Error("Expected RectF values to be in [0,1].");
      f(i, 1, (r.left + r.right) / 2), f(i, 2, (r.top + r.bottom) / 2), f(i, 4, r.right - r.left), f(i, 3, r.bottom - r.top);
    } else f(i, 1, 0.5), f(i, 2, 0.5), f(i, 4, 1), f(i, 3, 1);
    if (n?.rotationDegrees) {
      if (n?.rotationDegrees % 90 != 0) throw Error("Expected rotation to be a multiple of 90°.");
      if (f(i, 5, -Math.PI * n.rotationDegrees / 180), n?.rotationDegrees % 180 != 0) {
        const [o, c] = Ha(t);
        n = D(i, 3) * c / o, r = D(i, 4) * o / c, f(i, 4, n), f(i, 3, r);
      }
    }
    e.g.addProtoToStream(i.g(), "mediapipe.NormalizedRect", e.U, s);
  }
  e.g.sa(t, e.ba, s ?? performance.now()), e.finishProcessing();
}
function _e(e, t, n) {
  if (e.baseOptions?.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  Ka(e, t, n, e.B + 1);
}
function Ne(e, t, n, s) {
  if (!e.baseOptions?.g()) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  Ka(e, t, n, s);
}
function Lt(e, t, n, s) {
  var r = t.data;
  const i = t.width, o = i * (t = t.height);
  if ((r instanceof Uint8Array || r instanceof Float32Array) && r.length !== o) throw Error("Unsupported channel count: " + r.length / o);
  return e = new H([r], n, !1, e.g.i.canvas, e.P, i, t), s ? e.clone() : e;
}
var ee = class extends vn {
  constructor(e, t, n, s) {
    super(e), this.g = e, this.ba = t, this.U = n, this.ra = s, this.P = new Pt();
  }
  l(e, t = !0) {
    if ("runningMode" in e && Jt(this.baseOptions, 2, !!e.runningMode && e.runningMode !== "IMAGE"), e.canvas !== void 0 && this.g.i.canvas !== e.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(e, t);
  }
  close() {
    this.P.close(), super.close();
  }
};
ee.prototype.close = ee.prototype.close;
var ue = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect_in", !1), this.j = { detections: [] }, p(e = this.h = new ns(), 0, 1, t = new R()), f(this.h, 2, 0.5), f(this.h, 3, 0.3);
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    return "minDetectionConfidence" in e && f(this.h, 2, e.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in e && f(this.h, 3, e.minSuppressionThreshold ?? 0.3), this.l(e);
  }
  D(e, t) {
    return this.j = { detections: [] }, _e(this, e, t), this.j;
  }
  F(e, t, n) {
    return this.j = { detections: [] }, Ne(this, e, n, t), this.j;
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "norm_rect_in"), E(e, "detections");
    const t = new ce();
    Te(t, ic, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), x(n, "IMAGE:image_in"), x(n, "NORM_RECT:norm_rect_in"), _(n, "DETECTIONS:detections"), n.o(t), le(e, n), this.g.attachProtoVectorListener("detections", ((s, r) => {
      for (const i of s) s = ga(i), this.j.detections.push(Ga(s));
      u(this, r);
    })), this.g.attachEmptyPacketListener("detections", ((s) => {
      u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ue.prototype.detectForVideo = ue.prototype.F, ue.prototype.detect = ue.prototype.D, ue.prototype.setOptions = ue.prototype.o, ue.createFromModelPath = async function(e, t) {
  return v(ue, e, { baseOptions: { modelAssetPath: t } });
}, ue.createFromModelBuffer = function(e, t) {
  return v(ue, e, { baseOptions: { modelAssetBuffer: t } });
}, ue.createFromOptions = function(e, t) {
  return v(ue, e, t);
};
var Ur = Se([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]), Dr = Se([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]), Br = Se([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]), qa = Se([474, 475], [475, 476], [476, 477], [477, 474]), Gr = Se([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]), Vr = Se([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]), $a = Se([469, 470], [470, 471], [471, 472], [472, 469]), jr = Se([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]), Ja = [...Ur, ...Dr, ...Br, ...Gr, ...Vr, ...jr], Za = Se([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function Vi(e) {
  e.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
}
var I = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect", !1), this.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1, p(e = this.h = new ba(), 0, 1, t = new R()), this.v = new Ea(), p(this.h, 0, 3, this.v), this.s = new ns(), p(this.h, 0, 2, this.s), Fe(this.s, 4, 1), f(this.s, 2, 0.5), f(this.v, 2, 0.5), f(this.h, 4, 0.5);
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    return "numFaces" in e && Fe(this.s, 4, e.numFaces ?? 1), "minFaceDetectionConfidence" in e && f(this.s, 2, e.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && f(this.h, 4, e.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in e && f(this.v, 2, e.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in e && (this.outputFaceBlendshapes = !!e.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in e && (this.outputFacialTransformationMatrixes = !!e.outputFacialTransformationMatrixes), this.l(e);
  }
  D(e, t) {
    return Vi(this), _e(this, e, t), this.j;
  }
  F(e, t, n) {
    return Vi(this), Ne(this, e, n, t), this.j;
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "norm_rect"), E(e, "face_landmarks");
    const t = new ce();
    Te(t, ac, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), x(n, "IMAGE:image_in"), x(n, "NORM_RECT:norm_rect"), _(n, "NORM_LANDMARKS:face_landmarks"), n.o(t), le(e, n), this.g.attachProtoVectorListener("face_landmarks", ((s, r) => {
      for (const i of s) s = on(i), this.j.faceLandmarks.push(ss(s));
      u(this, r);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((s) => {
      u(this, s);
    })), this.outputFaceBlendshapes && (E(e, "blendshapes"), _(n, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", ((s, r) => {
      if (this.outputFaceBlendshapes) for (const i of s) s = ts(i), this.j.faceBlendshapes.push(Or(s.g() ?? []));
      u(this, r);
    })), this.g.attachEmptyPacketListener("blendshapes", ((s) => {
      u(this, s);
    }))), this.outputFacialTransformationMatrixes && (E(e, "face_geometry"), _(n, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", ((s, r) => {
      if (this.outputFacialTransformationMatrixes) for (const i of s) (s = w(oc(i), J2, 2)) && this.j.facialTransformationMatrixes.push({ rows: Ee(pe(s, 1), 0) ?? 0, columns: Ee(pe(s, 2), 0) ?? 0, data: ot(s, 3, tt, it()).slice() ?? [] });
      u(this, r);
    })), this.g.attachEmptyPacketListener("face_geometry", ((s) => {
      u(this, s);
    }))), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
I.prototype.detectForVideo = I.prototype.F, I.prototype.detect = I.prototype.D, I.prototype.setOptions = I.prototype.o, I.createFromModelPath = function(e, t) {
  return v(I, e, { baseOptions: { modelAssetPath: t } });
}, I.createFromModelBuffer = function(e, t) {
  return v(I, e, { baseOptions: { modelAssetBuffer: t } });
}, I.createFromOptions = function(e, t) {
  return v(I, e, t);
}, I.FACE_LANDMARKS_LIPS = Ur, I.FACE_LANDMARKS_LEFT_EYE = Dr, I.FACE_LANDMARKS_LEFT_EYEBROW = Br, I.FACE_LANDMARKS_LEFT_IRIS = qa, I.FACE_LANDMARKS_RIGHT_EYE = Gr, I.FACE_LANDMARKS_RIGHT_EYEBROW = Vr, I.FACE_LANDMARKS_RIGHT_IRIS = $a, I.FACE_LANDMARKS_FACE_OVAL = jr, I.FACE_LANDMARKS_CONTOURS = Ja, I.FACE_LANDMARKS_TESSELATION = Za;
var Le = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect", !0), p(e = this.j = new Aa(), 0, 1, t = new R());
  }
  get baseOptions() {
    return w(this.j, R, 1);
  }
  set baseOptions(e) {
    p(this.j, 0, 1, e);
  }
  o(e) {
    return super.l(e);
  }
  Pa(e, t, n) {
    const s = typeof t != "function" ? t : {};
    if (this.h = typeof t == "function" ? t : n, _e(this, e, s ?? {}), !this.h) return this.s;
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "norm_rect"), E(e, "stylized_image");
    const t = new ce();
    Te(t, cc, this.j);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), x(n, "IMAGE:image_in"), x(n, "NORM_RECT:norm_rect"), _(n, "STYLIZED_IMAGE:stylized_image"), n.o(t), le(e, n), this.g.V("stylized_image", ((s, r) => {
      var i = !this.h, o = s.data, c = s.width;
      const a = c * (s = s.height);
      if (o instanceof Uint8Array) if (o.length === 3 * a) {
        const h = new Uint8ClampedArray(4 * a);
        for (let l = 0; l < a; ++l) h[4 * l] = o[3 * l], h[4 * l + 1] = o[3 * l + 1], h[4 * l + 2] = o[3 * l + 2], h[4 * l + 3] = 255;
        o = new ImageData(h, c, s);
      } else {
        if (o.length !== 4 * a) throw Error("Unsupported channel count: " + o.length / a);
        o = new ImageData(new Uint8ClampedArray(o.buffer, o.byteOffset, o.length), c, s);
      }
      else if (!(o instanceof WebGLTexture)) throw Error(`Unsupported format: ${o.constructor.name}`);
      c = new z([o], !1, !1, this.g.i.canvas, this.P, c, s), this.s = i = i ? c.clone() : c, this.h && this.h(i), u(this, r);
    })), this.g.attachEmptyPacketListener("stylized_image", ((s) => {
      this.s = null, this.h && this.h(null), u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
Le.prototype.stylize = Le.prototype.Pa, Le.prototype.setOptions = Le.prototype.o, Le.createFromModelPath = function(e, t) {
  return v(Le, e, { baseOptions: { modelAssetPath: t } });
}, Le.createFromModelBuffer = function(e, t) {
  return v(Le, e, { baseOptions: { modelAssetBuffer: t } });
}, Le.createFromOptions = function(e, t) {
  return v(Le, e, t);
};
var Hr = Se([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function ji(e) {
  e.gestures = [], e.landmarks = [], e.worldLandmarks = [], e.handedness = [];
}
function Hi(e) {
  return e.gestures.length === 0 ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: e.gestures, landmarks: e.landmarks, worldLandmarks: e.worldLandmarks, handedness: e.handedness, handednesses: e.handedness };
}
function Xi(e, t = !0) {
  const n = [];
  for (const r of e) {
    var s = ts(r);
    e = [];
    for (const i of s.g()) s = t && pe(i, 1) != null ? Ee(pe(i, 1), 0) : -1, e.push({ score: D(i, 2) ?? 0, index: s, categoryName: Re(i, 3) ?? "", displayName: Re(i, 4) ?? "" });
    n.push(e);
  }
  return n;
}
var re = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect", !1), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], p(e = this.j = new xa(), 0, 1, t = new R()), this.s = new Cr(), p(this.j, 0, 2, this.s), this.C = new Lr(), p(this.s, 0, 3, this.C), this.v = new Sa(), p(this.s, 0, 2, this.v), this.h = new hc(), p(this.j, 0, 3, this.h), f(this.v, 2, 0.5), f(this.s, 4, 0.5), f(this.C, 2, 0.5);
  }
  get baseOptions() {
    return w(this.j, R, 1);
  }
  set baseOptions(e) {
    p(this.j, 0, 1, e);
  }
  o(e) {
    if (Fe(this.v, 3, e.numHands ?? 1), "minHandDetectionConfidence" in e && f(this.v, 2, e.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && f(this.s, 4, e.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in e && f(this.C, 2, e.minHandPresenceConfidence ?? 0.5), e.cannedGesturesClassifierOptions) {
      var t = new pt(), n = t, s = Us(e.cannedGesturesClassifierOptions, w(this.h, pt, 3)?.h());
      p(n, 0, 2, s), p(this.h, 0, 3, t);
    } else e.cannedGesturesClassifierOptions === void 0 && w(this.h, pt, 3)?.g();
    return e.customGesturesClassifierOptions ? (p(n = t = new pt(), 0, 2, s = Us(e.customGesturesClassifierOptions, w(this.h, pt, 4)?.h())), p(this.h, 0, 4, t)) : e.customGesturesClassifierOptions === void 0 && w(this.h, pt, 4)?.g(), this.l(e);
  }
  Ka(e, t) {
    return ji(this), _e(this, e, t), Hi(this);
  }
  La(e, t, n) {
    return ji(this), Ne(this, e, n, t), Hi(this);
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "norm_rect"), E(e, "hand_gestures"), E(e, "hand_landmarks"), E(e, "world_hand_landmarks"), E(e, "handedness");
    const t = new ce();
    Te(t, lc, this.j);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), x(n, "IMAGE:image_in"), x(n, "NORM_RECT:norm_rect"), _(n, "HAND_GESTURES:hand_gestures"), _(n, "LANDMARKS:hand_landmarks"), _(n, "WORLD_LANDMARKS:world_hand_landmarks"), _(n, "HANDEDNESS:handedness"), n.o(t), le(e, n), this.g.attachProtoVectorListener("hand_landmarks", ((s, r) => {
      for (const i of s) {
        s = on(i);
        const o = [];
        for (const c of Ve(s, ma, 1)) o.push({ x: D(c, 1) ?? 0, y: D(c, 2) ?? 0, z: D(c, 3) ?? 0, visibility: D(c, 4) ?? 0 });
        this.landmarks.push(o);
      }
      u(this, r);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((s) => {
      u(this, s);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((s, r) => {
      for (const i of s) {
        s = _t(i);
        const o = [];
        for (const c of Ve(s, pa, 1)) o.push({ x: D(c, 1) ?? 0, y: D(c, 2) ?? 0, z: D(c, 3) ?? 0, visibility: D(c, 4) ?? 0 });
        this.worldLandmarks.push(o);
      }
      u(this, r);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((s) => {
      u(this, s);
    })), this.g.attachProtoVectorListener("hand_gestures", ((s, r) => {
      this.gestures.push(...Xi(s, !1)), u(this, r);
    })), this.g.attachEmptyPacketListener("hand_gestures", ((s) => {
      u(this, s);
    })), this.g.attachProtoVectorListener("handedness", ((s, r) => {
      this.handedness.push(...Xi(s)), u(this, r);
    })), this.g.attachEmptyPacketListener("handedness", ((s) => {
      u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
function Wi(e) {
  return { landmarks: e.landmarks, worldLandmarks: e.worldLandmarks, handednesses: e.handedness, handedness: e.handedness };
}
re.prototype.recognizeForVideo = re.prototype.La, re.prototype.recognize = re.prototype.Ka, re.prototype.setOptions = re.prototype.o, re.createFromModelPath = function(e, t) {
  return v(re, e, { baseOptions: { modelAssetPath: t } });
}, re.createFromModelBuffer = function(e, t) {
  return v(re, e, { baseOptions: { modelAssetBuffer: t } });
}, re.createFromOptions = function(e, t) {
  return v(re, e, t);
}, re.HAND_CONNECTIONS = Hr;
var $ = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], p(e = this.h = new Cr(), 0, 1, t = new R()), this.s = new Lr(), p(this.h, 0, 3, this.s), this.j = new Sa(), p(this.h, 0, 2, this.j), Fe(this.j, 3, 1), f(this.j, 2, 0.5), f(this.s, 2, 0.5), f(this.h, 4, 0.5);
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    return "numHands" in e && Fe(this.j, 3, e.numHands ?? 1), "minHandDetectionConfidence" in e && f(this.j, 2, e.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && f(this.h, 4, e.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in e && f(this.s, 2, e.minHandPresenceConfidence ?? 0.5), this.l(e);
  }
  D(e, t) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], _e(this, e, t), Wi(this);
  }
  F(e, t, n) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ne(this, e, n, t), Wi(this);
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "norm_rect"), E(e, "hand_landmarks"), E(e, "world_hand_landmarks"), E(e, "handedness");
    const t = new ce();
    Te(t, uc, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), x(n, "IMAGE:image_in"), x(n, "NORM_RECT:norm_rect"), _(n, "LANDMARKS:hand_landmarks"), _(n, "WORLD_LANDMARKS:world_hand_landmarks"), _(n, "HANDEDNESS:handedness"), n.o(t), le(e, n), this.g.attachProtoVectorListener("hand_landmarks", ((s, r) => {
      for (const i of s) s = on(i), this.landmarks.push(ss(s));
      u(this, r);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((s) => {
      u(this, s);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((s, r) => {
      for (const i of s) s = _t(i), this.worldLandmarks.push(Yt(s));
      u(this, r);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((s) => {
      u(this, s);
    })), this.g.attachProtoVectorListener("handedness", ((s, r) => {
      var i = this.handedness, o = i.push;
      const c = [];
      for (const a of s) {
        s = ts(a);
        const h = [];
        for (const l of s.g()) h.push({ score: D(l, 2) ?? 0, index: Ee(pe(l, 1), 0) ?? -1, categoryName: Re(l, 3) ?? "", displayName: Re(l, 4) ?? "" });
        c.push(h);
      }
      o.call(i, ...c), u(this, r);
    })), this.g.attachEmptyPacketListener("handedness", ((s) => {
      u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
$.prototype.detectForVideo = $.prototype.F, $.prototype.detect = $.prototype.D, $.prototype.setOptions = $.prototype.o, $.createFromModelPath = function(e, t) {
  return v($, e, { baseOptions: { modelAssetPath: t } });
}, $.createFromModelBuffer = function(e, t) {
  return v($, e, { baseOptions: { modelAssetBuffer: t } });
}, $.createFromOptions = function(e, t) {
  return v($, e, t);
}, $.HAND_CONNECTIONS = Hr;
var Qa = Se([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function zi(e) {
  e.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
}
function Yi(e) {
  try {
    if (!e.C) return e.h;
    e.C(e.h);
  } finally {
    is(e);
  }
}
function gn(e, t) {
  e = on(e), t.push(ss(e));
}
var C = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "input_frames_image", null, !1), this.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1, p(e = this.j = new Fa(), 0, 1, t = new R()), this.K = new Lr(), p(this.j, 0, 2, this.K), this.aa = new dc(), p(this.j, 0, 3, this.aa), this.s = new ns(), p(this.j, 0, 4, this.s), this.I = new Ea(), p(this.j, 0, 5, this.I), this.v = new Ma(), p(this.j, 0, 6, this.v), this.L = new Ra(), p(this.j, 0, 7, this.L), f(this.s, 2, 0.5), f(this.s, 3, 0.3), f(this.I, 2, 0.5), f(this.v, 2, 0.5), f(this.v, 3, 0.3), f(this.L, 2, 0.5), f(this.K, 2, 0.5);
  }
  get baseOptions() {
    return w(this.j, R, 1);
  }
  set baseOptions(e) {
    p(this.j, 0, 1, e);
  }
  o(e) {
    return "minFaceDetectionConfidence" in e && f(this.s, 2, e.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in e && f(this.s, 3, e.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in e && f(this.I, 2, e.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in e && (this.outputFaceBlendshapes = !!e.outputFaceBlendshapes), "minPoseDetectionConfidence" in e && f(this.v, 2, e.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in e && f(this.v, 3, e.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in e && f(this.L, 2, e.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in e && (this.outputPoseSegmentationMasks = !!e.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in e && f(this.K, 2, e.minHandLandmarksConfidence ?? 0.5), this.l(e);
  }
  D(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.C = typeof t == "function" ? t : n, zi(this), _e(this, e, s), Yi(this);
  }
  F(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.C = typeof n == "function" ? n : s, zi(this), Ne(this, e, r, t), Yi(this);
  }
  m() {
    var e = new se();
    L(e, "input_frames_image"), E(e, "pose_landmarks"), E(e, "pose_world_landmarks"), E(e, "face_landmarks"), E(e, "left_hand_landmarks"), E(e, "left_hand_world_landmarks"), E(e, "right_hand_landmarks"), E(e, "right_hand_world_landmarks");
    const t = new ce(), n = new di();
    Rs(n, 1, Rt("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), (function(r, i) {
      if (i != null) if (Array.isArray(i)) S(r, 2, Hn(i, rr, void 0, void 0, !1));
      else {
        if (!(typeof i == "string" || i instanceof Ge || en(i))) throw Error("invalid value in Any.value field: " + i + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        Rs(r, 2, Ks(i, !1, !1), lt());
      }
    })(n, this.j.g());
    const s = new Z();
    he(s, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Ln(s, 8, di, n), x(s, "IMAGE:input_frames_image"), _(s, "POSE_LANDMARKS:pose_landmarks"), _(s, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), _(s, "FACE_LANDMARKS:face_landmarks"), _(s, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), _(s, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), _(s, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), _(s, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), s.o(t), le(e, s), rs(this, e), this.g.attachProtoListener("pose_landmarks", ((r, i) => {
      gn(r, this.h.poseLandmarks), u(this, i);
    })), this.g.attachEmptyPacketListener("pose_landmarks", ((r) => {
      u(this, r);
    })), this.g.attachProtoListener("pose_world_landmarks", ((r, i) => {
      var o = this.h.poseWorldLandmarks;
      r = _t(r), o.push(Yt(r)), u(this, i);
    })), this.g.attachEmptyPacketListener("pose_world_landmarks", ((r) => {
      u(this, r);
    })), this.outputPoseSegmentationMasks && (_(s, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), kt(this, "pose_segmentation_mask"), this.g.V("pose_segmentation_mask", ((r, i) => {
      this.h.poseSegmentationMasks = [Lt(this, r, !0, !this.C)], u(this, i);
    })), this.g.attachEmptyPacketListener("pose_segmentation_mask", ((r) => {
      this.h.poseSegmentationMasks = [], u(this, r);
    }))), this.g.attachProtoListener("face_landmarks", ((r, i) => {
      gn(r, this.h.faceLandmarks), u(this, i);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((r) => {
      u(this, r);
    })), this.outputFaceBlendshapes && (E(e, "extra_blendshapes"), _(s, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", ((r, i) => {
      var o = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (r = ts(r), o.push(Or(r.g() ?? []))), u(this, i);
    })), this.g.attachEmptyPacketListener("extra_blendshapes", ((r) => {
      u(this, r);
    }))), this.g.attachProtoListener("left_hand_landmarks", ((r, i) => {
      gn(r, this.h.leftHandLandmarks), u(this, i);
    })), this.g.attachEmptyPacketListener("left_hand_landmarks", ((r) => {
      u(this, r);
    })), this.g.attachProtoListener("left_hand_world_landmarks", ((r, i) => {
      var o = this.h.leftHandWorldLandmarks;
      r = _t(r), o.push(Yt(r)), u(this, i);
    })), this.g.attachEmptyPacketListener("left_hand_world_landmarks", ((r) => {
      u(this, r);
    })), this.g.attachProtoListener("right_hand_landmarks", ((r, i) => {
      gn(r, this.h.rightHandLandmarks), u(this, i);
    })), this.g.attachEmptyPacketListener("right_hand_landmarks", ((r) => {
      u(this, r);
    })), this.g.attachProtoListener("right_hand_world_landmarks", ((r, i) => {
      var o = this.h.rightHandWorldLandmarks;
      r = _t(r), o.push(Yt(r)), u(this, i);
    })), this.g.attachEmptyPacketListener("right_hand_world_landmarks", ((r) => {
      u(this, r);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
C.prototype.detectForVideo = C.prototype.F, C.prototype.detect = C.prototype.D, C.prototype.setOptions = C.prototype.o, C.createFromModelPath = function(e, t) {
  return v(C, e, { baseOptions: { modelAssetPath: t } });
}, C.createFromModelBuffer = function(e, t) {
  return v(C, e, { baseOptions: { modelAssetBuffer: t } });
}, C.createFromOptions = function(e, t) {
  return v(C, e, t);
}, C.HAND_CONNECTIONS = Hr, C.POSE_CONNECTIONS = Qa, C.FACE_LANDMARKS_LIPS = Ur, C.FACE_LANDMARKS_LEFT_EYE = Dr, C.FACE_LANDMARKS_LEFT_EYEBROW = Br, C.FACE_LANDMARKS_LEFT_IRIS = qa, C.FACE_LANDMARKS_RIGHT_EYE = Gr, C.FACE_LANDMARKS_RIGHT_EYEBROW = Vr, C.FACE_LANDMARKS_RIGHT_IRIS = $a, C.FACE_LANDMARKS_FACE_OVAL = jr, C.FACE_LANDMARKS_CONTOURS = Ja, C.FACE_LANDMARKS_TESSELATION = Za;
var de = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "input_image", "norm_rect", !0), this.j = { classifications: [] }, p(e = this.h = new Oa(), 0, 1, t = new R());
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    return p(this.h, 0, 2, Us(e, w(this.h, kr, 2))), this.l(e);
  }
  ua(e, t) {
    return this.j = { classifications: [] }, _e(this, e, t), this.j;
  }
  va(e, t, n) {
    return this.j = { classifications: [] }, Ne(this, e, n, t), this.j;
  }
  m() {
    var e = new se();
    L(e, "input_image"), L(e, "norm_rect"), E(e, "classifications");
    const t = new ce();
    Te(t, fc, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), x(n, "IMAGE:input_image"), x(n, "NORM_RECT:norm_rect"), _(n, "CLASSIFICATIONS:classifications"), n.o(t), le(e, n), this.g.attachProtoListener("classifications", ((s, r) => {
      this.j = (function(i) {
        const o = { classifications: Ve(i, Q2, 1).map(((c) => Or(w(c, da, 4)?.g() ?? [], Ee(pe(c, 2), 0), Re(c, 3)))) };
        return kn($e(i, 2)) != null && (o.timestampMs = Ee(kn($e(i, 2)), 0)), o;
      })(ec(s)), u(this, r);
    })), this.g.attachEmptyPacketListener("classifications", ((s) => {
      u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
de.prototype.classifyForVideo = de.prototype.va, de.prototype.classify = de.prototype.ua, de.prototype.setOptions = de.prototype.o, de.createFromModelPath = function(e, t) {
  return v(de, e, { baseOptions: { modelAssetPath: t } });
}, de.createFromModelBuffer = function(e, t) {
  return v(de, e, { baseOptions: { modelAssetBuffer: t } });
}, de.createFromOptions = function(e, t) {
  return v(de, e, t);
};
var ie = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect", !0), this.h = new Na(), this.embeddings = { embeddings: [] }, p(e = this.h, 0, 1, t = new R());
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    var t = this.h, n = w(this.h, Ei, 2);
    return n = n ? n.clone() : new Ei(), e.l2Normalize !== void 0 ? Jt(n, 1, e.l2Normalize) : "l2Normalize" in e && S(n, 1), e.quantize !== void 0 ? Jt(n, 2, e.quantize) : "quantize" in e && S(n, 2), p(t, 0, 2, n), this.l(e);
  }
  Ba(e, t) {
    return _e(this, e, t), this.embeddings;
  }
  Ca(e, t, n) {
    return Ne(this, e, n, t), this.embeddings;
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "norm_rect"), E(e, "embeddings_out");
    const t = new ce();
    Te(t, gc, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), x(n, "IMAGE:image_in"), x(n, "NORM_RECT:norm_rect"), _(n, "EMBEDDINGS:embeddings_out"), n.o(t), le(e, n), this.g.attachProtoListener("embeddings_out", ((s, r) => {
      s = sc(s), this.embeddings = (function(i) {
        return { embeddings: Ve(i, nc, 1).map(((o) => {
          const c = { headIndex: Ee(pe(o, 3), 0) ?? -1, headName: Re(o, 4) ?? "" };
          if (Fo(o, wi, gs(o, 1)) !== void 0) o = ot(o = w(o, wi, gs(o, 1)), 1, tt, it()), c.floatEmbedding = o.slice();
          else {
            const a = new Uint8Array(0);
            c.quantizedEmbedding = w(o, tc, gs(o, 2))?.qa()?.h() ?? a;
          }
          return c;
        })), timestampMs: Ee(kn($e(i, 2)), 0) };
      })(s), u(this, r);
    })), this.g.attachEmptyPacketListener("embeddings_out", ((s) => {
      u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
ie.cosineSimilarity = function(e, t) {
  if (e.floatEmbedding && t.floatEmbedding) e = Si(e.floatEmbedding, t.floatEmbedding);
  else {
    if (!e.quantizedEmbedding || !t.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    e = Si(ki(e.quantizedEmbedding), ki(t.quantizedEmbedding));
  }
  return e;
}, ie.prototype.embedForVideo = ie.prototype.Ca, ie.prototype.embed = ie.prototype.Ba, ie.prototype.setOptions = ie.prototype.o, ie.createFromModelPath = function(e, t) {
  return v(ie, e, { baseOptions: { modelAssetPath: t } });
}, ie.createFromModelBuffer = function(e, t) {
  return v(ie, e, { baseOptions: { modelAssetBuffer: t } });
}, ie.createFromOptions = function(e, t) {
  return v(ie, e, t);
};
var Gs = class {
  constructor(e, t, n) {
    this.confidenceMasks = e, this.categoryMask = t, this.qualityScores = n;
  }
  close() {
    this.confidenceMasks?.forEach(((e) => {
      e.close();
    })), this.categoryMask?.close();
  }
};
function Ki(e) {
  e.categoryMask = void 0, e.confidenceMasks = void 0, e.qualityScores = void 0;
}
function qi(e) {
  try {
    const t = new Gs(e.confidenceMasks, e.categoryMask, e.qualityScores);
    if (!e.j) return t;
    e.j(t);
  } finally {
    is(e);
  }
}
Gs.prototype.close = Gs.prototype.close;
var Q = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect", !1), this.s = [], this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new Fr(), this.v = new Ia(), p(this.h, 0, 3, this.v), p(e = this.h, 0, 1, t = new R());
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    return e.displayNamesLocale !== void 0 ? S(this.h, 2, Rt(e.displayNamesLocale)) : "displayNamesLocale" in e && S(this.h, 2), "outputCategoryMask" in e && (this.outputCategoryMask = e.outputCategoryMask ?? !1), "outputConfidenceMasks" in e && (this.outputConfidenceMasks = e.outputConfidenceMasks ?? !0), super.l(e);
  }
  J() {
    (function(e) {
      const t = Ve(e.ea(), Z, 1).filter(((n) => Re(n, 1).includes("mediapipe.tasks.TensorsToSegmentationCalculator")));
      if (e.s = [], t.length > 1) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      t.length === 1 && (w(t[0], ce, 7)?.l()?.g() ?? /* @__PURE__ */ new Map()).forEach(((n, s) => {
        e.s[Number(s)] = Re(n, 1);
      }));
    })(this);
  }
  fa(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.j = typeof t == "function" ? t : n, Ki(this), _e(this, e, s), qi(this);
  }
  Na(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.j = typeof n == "function" ? n : s, Ki(this), Ne(this, e, r, t), qi(this);
  }
  Fa() {
    return this.s;
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "norm_rect");
    const t = new ce();
    Te(t, Ua, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), x(n, "IMAGE:image_in"), x(n, "NORM_RECT:norm_rect"), n.o(t), le(e, n), rs(this, e), this.outputConfidenceMasks && (E(e, "confidence_masks"), _(n, "CONFIDENCE_MASKS:confidence_masks"), kt(this, "confidence_masks"), this.g.da("confidence_masks", ((s, r) => {
      this.confidenceMasks = s.map(((i) => Lt(this, i, !0, !this.j))), u(this, r);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((s) => {
      this.confidenceMasks = [], u(this, s);
    }))), this.outputCategoryMask && (E(e, "category_mask"), _(n, "CATEGORY_MASK:category_mask"), kt(this, "category_mask"), this.g.V("category_mask", ((s, r) => {
      this.categoryMask = Lt(this, s, !1, !this.j), u(this, r);
    })), this.g.attachEmptyPacketListener("category_mask", ((s) => {
      this.categoryMask = void 0, u(this, s);
    }))), E(e, "quality_scores"), _(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((s, r) => {
      this.qualityScores = s, u(this, r);
    })), this.g.attachEmptyPacketListener("quality_scores", ((s) => {
      this.categoryMask = void 0, u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
Q.prototype.getLabels = Q.prototype.Fa, Q.prototype.segmentForVideo = Q.prototype.Na, Q.prototype.segment = Q.prototype.fa, Q.prototype.setOptions = Q.prototype.o, Q.createFromModelPath = function(e, t) {
  return v(Q, e, { baseOptions: { modelAssetPath: t } });
}, Q.createFromModelBuffer = function(e, t) {
  return v(Q, e, { baseOptions: { modelAssetBuffer: t } });
}, Q.createFromOptions = function(e, t) {
  return v(Q, e, t);
};
var Vs = class {
  constructor(e, t, n) {
    this.confidenceMasks = e, this.categoryMask = t, this.qualityScores = n;
  }
  close() {
    this.confidenceMasks?.forEach(((e) => {
      e.close();
    })), this.categoryMask?.close();
  }
};
Vs.prototype.close = Vs.prototype.close;
var kc = class extends d {
  constructor(e) {
    super(e);
  }
}, mt = [0, U, -2], On = [0, Pe, -3, F, Pe, -1], $i = [0, On], Ji = [0, On, U, -1], Es = class extends d {
  constructor(e) {
    super(e);
  }
}, Zi = [0, Pe, -1, F], Sc = class extends d {
  constructor() {
    super();
  }
}, Qi = class extends d {
  constructor(e) {
    super(e);
  }
}, js = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15], e2 = class extends d {
  constructor() {
    super();
  }
};
e2.prototype.g = es([0, X, [0, js, A, On, A, [0, On, mt], A, $i, A, [0, $i, mt], A, Zi, A, [0, Pe, -3, F, be], A, [0, Pe, -3, F], A, [0, b, Pe, -2, F, U, F, -1, 2, Pe, mt], A, Ji, A, [0, Ji, mt], Pe, mt, b, A, [0, Pe, -3, F, mt, -1], A, [0, X, Zi]], b, [0, b, U, -1, F]]);
var Ce = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect_in", !1), this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new Fr(), this.s = new Ia(), p(this.h, 0, 3, this.s), p(e = this.h, 0, 1, t = new R());
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    return "outputCategoryMask" in e && (this.outputCategoryMask = e.outputCategoryMask ?? !1), "outputConfidenceMasks" in e && (this.outputConfidenceMasks = e.outputConfidenceMasks ?? !0), super.l(e);
  }
  fa(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    this.j = typeof n == "function" ? n : s, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n = this.B + 1, s = new e2();
    const i = new Qi();
    var o = new kc();
    if (Fe(o, 1, 255), p(i, 0, 12, o), t.keypoint && t.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (t.keypoint) {
      var c = new Es();
      Jt(c, 3, !0), f(c, 1, t.keypoint.x), f(c, 2, t.keypoint.y), Xt(i, 5, js, c);
    } else {
      if (!t.scribble) throw Error("Must provide either a keypoint or a scribble.");
      for (c of (o = new Sc(), t.scribble)) Jt(t = new Es(), 3, !0), f(t, 1, c.x), f(t, 2, c.y), Ln(o, 1, Es, t);
      Xt(i, 15, js, o);
    }
    Ln(s, 1, Qi, i), this.g.addProtoToStream(s.g(), "drishti.RenderData", "roi_in", n), _e(this, e, r);
    e: {
      try {
        const h = new Vs(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var a = h;
          break e;
        }
        this.j(h);
      } finally {
        is(this);
      }
      a = void 0;
    }
    return a;
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "roi_in"), L(e, "norm_rect_in");
    const t = new ce();
    Te(t, Ua, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), x(n, "IMAGE:image_in"), x(n, "ROI:roi_in"), x(n, "NORM_RECT:norm_rect_in"), n.o(t), le(e, n), rs(this, e), this.outputConfidenceMasks && (E(e, "confidence_masks"), _(n, "CONFIDENCE_MASKS:confidence_masks"), kt(this, "confidence_masks"), this.g.da("confidence_masks", ((s, r) => {
      this.confidenceMasks = s.map(((i) => Lt(this, i, !0, !this.j))), u(this, r);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((s) => {
      this.confidenceMasks = [], u(this, s);
    }))), this.outputCategoryMask && (E(e, "category_mask"), _(n, "CATEGORY_MASK:category_mask"), kt(this, "category_mask"), this.g.V("category_mask", ((s, r) => {
      this.categoryMask = Lt(this, s, !1, !this.j), u(this, r);
    })), this.g.attachEmptyPacketListener("category_mask", ((s) => {
      this.categoryMask = void 0, u(this, s);
    }))), E(e, "quality_scores"), _(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((s, r) => {
      this.qualityScores = s, u(this, r);
    })), this.g.attachEmptyPacketListener("quality_scores", ((s) => {
      this.categoryMask = void 0, u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
Ce.prototype.segment = Ce.prototype.fa, Ce.prototype.setOptions = Ce.prototype.o, Ce.createFromModelPath = function(e, t) {
  return v(Ce, e, { baseOptions: { modelAssetPath: t } });
}, Ce.createFromModelBuffer = function(e, t) {
  return v(Ce, e, { baseOptions: { modelAssetBuffer: t } });
}, Ce.createFromOptions = function(e, t) {
  return v(Ce, e, t);
};
var fe = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "input_frame_gpu", "norm_rect", !1), this.j = { detections: [] }, p(e = this.h = new Da(), 0, 1, t = new R());
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    return e.displayNamesLocale !== void 0 ? S(this.h, 2, Rt(e.displayNamesLocale)) : "displayNamesLocale" in e && S(this.h, 2), e.maxResults !== void 0 ? Fe(this.h, 3, e.maxResults) : "maxResults" in e && S(this.h, 3), e.scoreThreshold !== void 0 ? f(this.h, 4, e.scoreThreshold) : "scoreThreshold" in e && S(this.h, 4), e.categoryAllowlist !== void 0 ? Cn(this.h, 5, e.categoryAllowlist) : "categoryAllowlist" in e && S(this.h, 5), e.categoryDenylist !== void 0 ? Cn(this.h, 6, e.categoryDenylist) : "categoryDenylist" in e && S(this.h, 6), this.l(e);
  }
  D(e, t) {
    return this.j = { detections: [] }, _e(this, e, t), this.j;
  }
  F(e, t, n) {
    return this.j = { detections: [] }, Ne(this, e, n, t), this.j;
  }
  m() {
    var e = new se();
    L(e, "input_frame_gpu"), L(e, "norm_rect"), E(e, "detections");
    const t = new ce();
    Te(t, mc, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.ObjectDetectorGraph"), x(n, "IMAGE:input_frame_gpu"), x(n, "NORM_RECT:norm_rect"), _(n, "DETECTIONS:detections"), n.o(t), le(e, n), this.g.attachProtoVectorListener("detections", ((s, r) => {
      for (const i of s) s = ga(i), this.j.detections.push(Ga(s));
      u(this, r);
    })), this.g.attachEmptyPacketListener("detections", ((s) => {
      u(this, s);
    })), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
fe.prototype.detectForVideo = fe.prototype.F, fe.prototype.detect = fe.prototype.D, fe.prototype.setOptions = fe.prototype.o, fe.createFromModelPath = async function(e, t) {
  return v(fe, e, { baseOptions: { modelAssetPath: t } });
}, fe.createFromModelBuffer = function(e, t) {
  return v(fe, e, { baseOptions: { modelAssetBuffer: t } });
}, fe.createFromOptions = function(e, t) {
  return v(fe, e, t);
};
var Hs = class {
  constructor(e, t, n) {
    this.landmarks = e, this.worldLandmarks = t, this.segmentationMasks = n;
  }
  close() {
    this.segmentationMasks?.forEach(((e) => {
      e.close();
    }));
  }
};
function eo(e) {
  e.landmarks = [], e.worldLandmarks = [], e.segmentationMasks = void 0;
}
function to(e) {
  try {
    const t = new Hs(e.landmarks, e.worldLandmarks, e.segmentationMasks);
    if (!e.s) return t;
    e.s(t);
  } finally {
    is(e);
  }
}
Hs.prototype.close = Hs.prototype.close;
var oe = class extends ee {
  constructor(e, t) {
    super(new ve(e, t), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = !1, p(e = this.h = new Ba(), 0, 1, t = new R()), this.v = new Ra(), p(this.h, 0, 3, this.v), this.j = new Ma(), p(this.h, 0, 2, this.j), Fe(this.j, 4, 1), f(this.j, 2, 0.5), f(this.v, 2, 0.5), f(this.h, 4, 0.5);
  }
  get baseOptions() {
    return w(this.h, R, 1);
  }
  set baseOptions(e) {
    p(this.h, 0, 1, e);
  }
  o(e) {
    return "numPoses" in e && Fe(this.j, 4, e.numPoses ?? 1), "minPoseDetectionConfidence" in e && f(this.j, 2, e.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in e && f(this.h, 4, e.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in e && f(this.v, 2, e.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in e && (this.outputSegmentationMasks = e.outputSegmentationMasks ?? !1), this.l(e);
  }
  D(e, t, n) {
    const s = typeof t != "function" ? t : {};
    return this.s = typeof t == "function" ? t : n, eo(this), _e(this, e, s), to(this);
  }
  F(e, t, n, s) {
    const r = typeof n != "function" ? n : {};
    return this.s = typeof n == "function" ? n : s, eo(this), Ne(this, e, r, t), to(this);
  }
  m() {
    var e = new se();
    L(e, "image_in"), L(e, "norm_rect"), E(e, "normalized_landmarks"), E(e, "world_landmarks"), E(e, "segmentation_masks");
    const t = new ce();
    Te(t, yc, this.h);
    const n = new Z();
    he(n, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), x(n, "IMAGE:image_in"), x(n, "NORM_RECT:norm_rect"), _(n, "NORM_LANDMARKS:normalized_landmarks"), _(n, "WORLD_LANDMARKS:world_landmarks"), n.o(t), le(e, n), rs(this, e), this.g.attachProtoVectorListener("normalized_landmarks", ((s, r) => {
      this.landmarks = [];
      for (const i of s) s = on(i), this.landmarks.push(ss(s));
      u(this, r);
    })), this.g.attachEmptyPacketListener("normalized_landmarks", ((s) => {
      this.landmarks = [], u(this, s);
    })), this.g.attachProtoVectorListener("world_landmarks", ((s, r) => {
      this.worldLandmarks = [];
      for (const i of s) s = _t(i), this.worldLandmarks.push(Yt(s));
      u(this, r);
    })), this.g.attachEmptyPacketListener("world_landmarks", ((s) => {
      this.worldLandmarks = [], u(this, s);
    })), this.outputSegmentationMasks && (_(n, "SEGMENTATION_MASK:segmentation_masks"), kt(this, "segmentation_masks"), this.g.da("segmentation_masks", ((s, r) => {
      this.segmentationMasks = s.map(((i) => Lt(this, i, !0, !this.s))), u(this, r);
    })), this.g.attachEmptyPacketListener("segmentation_masks", ((s) => {
      this.segmentationMasks = [], u(this, s);
    }))), e = e.g(), this.setGraph(new Uint8Array(e), !0);
  }
};
oe.prototype.detectForVideo = oe.prototype.F, oe.prototype.detect = oe.prototype.D, oe.prototype.setOptions = oe.prototype.o, oe.createFromModelPath = function(e, t) {
  return v(oe, e, { baseOptions: { modelAssetPath: t } });
}, oe.createFromModelBuffer = function(e, t) {
  return v(oe, e, { baseOptions: { modelAssetBuffer: t } });
}, oe.createFromOptions = function(e, t) {
  return v(oe, e, t);
}, oe.POSE_CONNECTIONS = Qa;
class xc {
  constructor() {
    this.video = null, this.handLandmarker = null, this.isRunning = !1, this.lastVideoTime = -1, this.results = null, this.offscreenCanvas = null, this.offscreenCtx = null, this.isSafari = !1;
  }
  async initialize() {
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const t = await rt.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm"
    ), n = () => {
      try {
        const o = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && (o.getContext("webgl") || o.getContext("experimental-webgl")));
      } catch {
        return !1;
      }
    }, r = n() && !this.isSafari ? "GPU" : "CPU";
    console.log(`VisionEngine: Environment Check - WebGL: ${n()}, Safari: ${this.isSafari}`), console.log(`VisionEngine: Selected Delegate: ${r}`);
    const i = async (o) => await $.createFromOptions(t, {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate: o
      },
      runningMode: "VIDEO",
      numHands: 1
    });
    try {
      let o = null, c = null;
      if (this.isSafari) {
        console.log('VisionEngine: Safari detected. Deploying "Black Hole" WebGL Context...');
        const a = new Proxy(() => {
        }, {
          get: (h, l) => l === "getExtension" ? () => null : l === "getParameter" ? (y) => 0 : l === "createTexture" ? () => ({}) : l === "createBuffer" ? () => ({}) : l === "createProgram" ? () => ({}) : l === "createShader" ? () => ({}) : l === "checkFramebufferStatus" ? () => 36053 : () => {
          }
        });
        o = HTMLCanvasElement.prototype.getContext, HTMLCanvasElement.prototype.getContext = function(h, l) {
          return h === "webgl" || h === "experimental-webgl" || h === "webgl2" ? (console.log(`VisionEngine: Serving Black Hole Context for ${h}`), a) : o.call(this, h, l);
        }, typeof OffscreenCanvas < "u" && (c = OffscreenCanvas.prototype.getContext, OffscreenCanvas.prototype.getContext = function(h, l) {
          return h === "webgl" || h === "experimental-webgl" || h === "webgl2" ? (console.log(`VisionEngine: Serving Black Hole Context (Offscreen) for ${h}`), a) : c.call(this, h, l);
        });
      }
      try {
        this.handLandmarker = await i(r), console.log(`VisionEngine: HandLandmarker initialized (${r})`);
      } finally {
        this.isSafari && (o && (HTMLCanvasElement.prototype.getContext = o), c && (OffscreenCanvas.prototype.getContext = c), console.log("VisionEngine: Safari WebGL Hooks Restored."));
      }
    } catch (o) {
      if (console.warn(`VisionEngine: ${r} initialization failed.`, o), r === "GPU") {
        console.log("VisionEngine: Falling back to CPU...");
        try {
          this.handLandmarker = await i("CPU"), console.log("VisionEngine: HandLandmarker initialized (CPU - Fallback)");
        } catch (c) {
          throw console.error("VisionEngine: CPU Fallback also failed.", c), c;
        }
      } else
        throw o;
    }
  }
  async startCamera(t) {
    if (this.video = t, !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
      throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");
    const n = async (s) => {
      const r = await navigator.mediaDevices.getUserMedia(s);
      this.video.srcObject = r, await new Promise((i) => {
        this.video.readyState >= 2 ? i() : this.video.onloadedmetadata = () => i();
      }), this.isSafari && (this.offscreenCanvas = document.createElement("canvas"), this.offscreenCanvas.width = this.video.videoWidth, this.offscreenCanvas.height = this.video.videoHeight, this.offscreenCtx = this.offscreenCanvas.getContext("2d"), console.log("VisionEngine: Offscreen Canvas initialized for Safari fallback"));
      try {
        await this.video.play();
      } catch (i) {
        console.warn("VisionEngine: Auto-play failed, attempting mute-play workaround.", i), this.video.muted = !0, await this.video.play();
      }
    };
    try {
      await n({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        }
      });
    } catch (s) {
      console.warn("VisionEngine: Standard constraints failed, trying fallback...", s), await n({ video: !0 });
    }
    this.isRunning = !0, console.log("VisionEngine: Camera started");
  }
  detect() {
    if (!this.isRunning || !this.handLandmarker || !this.video) return null;
    let t = performance.now();
    if (this.video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.video.currentTime;
      let n = this.video;
      this.isSafari && this.offscreenCtx && (this.offscreenCtx.drawImage(this.video, 0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height), n = this.offscreenCanvas), this.results = this.handLandmarker.detectForVideo(n, t);
    }
    if (this.results && this.results.landmarks && this.results.landmarks.length > 0) {
      const s = this.results.landmarks[0][8], r = this.remapCoordinates(s), i = s.x, o = s.y, c = i < 0.15 || i > 0.85 || o < 0.15 || o > 0.85;
      return {
        raw: this.results,
        cursor: r,
        isOutOfBounds: c
      };
    }
    return { raw: this.results, cursor: null };
  }
  // Map Hand coordinates (0-1) from ROI to Screen (0-1)
  remapCoordinates(t) {
    const n = t.x, s = t.y, r = 0.6, i = (1 - r) / 2;
    let o = (n - i) / r, c = (s - i) / r;
    return o = Math.max(0, Math.min(1, o)), c = Math.max(0, Math.min(1, c)), { x: 1 - o, y: c };
  }
}
const bs = new xc();
class Lc {
  constructor() {
    this.overlayContainer = null, this.videoElement = null, this.canvasElement = null, this.canvasCtx = null, this.infoElement = null, this.drawingUtils = null, this.worker = new Worker(new URL(
      /* @vite-ignore */
      "/MHBN/assets/LogWorker-Bu4CxyKN.js",
      import.meta.url
    )), this.worker.onmessage = this.handleWorkerMessage.bind(this), this.worker.postMessage({ type: "INIT" }), this.isRecording = !1, this.recordBtn = null;
  }
  handleWorkerMessage(t) {
    const { type: n, data: s } = t.data;
    n === "EXPORT_READY" ? this.downloadJSON(s) : n === "RECORDING_STARTED" ? (this.isRecording = !0, this.updateRecordBtn()) : n === "RECORDING_STOPPED" && (this.isRecording = !1, this.updateRecordBtn());
  }
  downloadJSON(t) {
    const n = JSON.stringify(t, null, 2), s = new Blob([n], { type: "application/json" }), r = URL.createObjectURL(s), i = document.createElement("a");
    i.href = r, i.download = `mhbn_session_${t.id}.json`, document.body.appendChild(i), i.click(), document.body.removeChild(i), URL.revokeObjectURL(r);
  }
  createOverlay() {
    return this.overlayContainer = document.createElement("div"), this.overlayContainer.className = "debug-overlay", this.videoElement = document.createElement("video"), this.videoElement.autoplay = !0, this.videoElement.playsInline = !0, this.videoElement.muted = !0, this.canvasElement = document.createElement("canvas"), this.infoElement = document.createElement("div"), this.infoElement.className = "debug-info", this.infoElement.innerText = "Initializing...", this.overlayContainer.appendChild(this.videoElement), this.overlayContainer.appendChild(this.canvasElement), this.overlayContainer.appendChild(this.infoElement), document.body.appendChild(this.overlayContainer), this.canvasCtx = this.canvasElement.getContext("2d"), this.drawingUtils = new q(this.canvasCtx), this.videoElement;
  }
  update(t, n = "", s = !1) {
    if (!this.canvasElement || !this.videoElement) return;
    if ((this.canvasElement.width !== this.videoElement.videoWidth || this.canvasElement.height !== this.videoElement.videoHeight) && (this.canvasElement.width = this.videoElement.videoWidth, this.canvasElement.height = this.videoElement.videoHeight), this.canvasCtx.save(), this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height), t && t.landmarks) {
      for (const o of t.landmarks)
        this.drawingUtils.drawConnectors(
          o,
          $.HAND_CONNECTIONS,
          { color: "#00FF00", lineWidth: 5 }
        ), this.drawingUtils.drawLandmarks(o, { color: "#FF0000", lineWidth: 2 });
      this.infoElement.innerText = `Hands: ${t.landmarks.length} | Gesture: ${n}`;
    } else
      this.infoElement.innerText = `No hands detected | ${n}`;
    const r = this.canvasElement.width, i = this.canvasElement.height;
    if (r > 0 && i > 0) {
      const o = r * 0.6, c = i * 0.6, a = (r - o) / 2, h = (i - c) / 2;
      this.canvasCtx.strokeStyle = s ? "#FF3B30" : "blue", this.canvasCtx.lineWidth = s ? 5 : 3, this.canvasCtx.strokeRect(a, h, o, c), s && (this.canvasCtx.fillStyle = "#FF3B30", this.canvasCtx.font = "24px Arial", this.canvasCtx.textAlign = "center", this.canvasCtx.fillText("MOVE HAND TO CENTER", r / 2, h - 10));
    }
    this.canvasCtx.restore(), this.canvasCtx.restore(), this.isRecording && t && t.landmarks && this.worker.postMessage({
      type: "LOG_FRAME",
      payload: {
        gesture: n,
        landmarks: t.landmarks[0]
        // just first hand
      }
    });
  }
  toggleRecording() {
    this.isRecording ? this.worker.postMessage({ type: "STOP" }) : this.worker.postMessage({ type: "START" });
  }
  updateRecordBtn() {
    this.recordBtn && (this.isRecording ? (this.recordBtn.innerText = "■ Stop", this.recordBtn.style.background = "#FF3B30", this.recordBtn.style.color = "white") : (this.recordBtn.innerText = "● Rec", this.recordBtn.style.background = "", this.recordBtn.style.color = ""));
  }
}
const Ts = new Lc();
class Cc {
  constructor() {
    this.state = {
      cursorSensitivity: 5,
      // 1-10
      scrollSpeed: 5,
      // 1-10
      gestures: {
        click: !0,
        scroll: !0,
        back: !0
        // Enable/Disable Shaka
      },
      showDebug: !1
    }, this.listeners = [], this.loadSettings();
  }
  // -- State Management --
  getState() {
    return this.state;
  }
  update(t) {
    this.state = { ...this.state, ...t }, this.notify(), this.saveSettings();
  }
  updateGesture(t, n) {
    this.state.gestures = { ...this.state.gestures, [t]: n }, this.notify(), this.saveSettings();
  }
  // -- Persistence --
  saveSettings() {
    try {
      localStorage.setItem("mhbn-settings", JSON.stringify(this.state));
    } catch (t) {
      console.error("Failed to save settings", t);
    }
  }
  loadSettings() {
    try {
      const t = localStorage.getItem("mhbn-settings");
      if (t) {
        const n = JSON.parse(t);
        this.state = { ...this.state, ...n, gestures: { ...this.state.gestures, ...n.gestures } };
      }
    } catch (t) {
      console.error("Failed to load settings", t);
    }
  }
  // -- Observer Pattern --
  addListener(t) {
    return this.listeners.push(t), t(this.state), () => {
      this.listeners = this.listeners.filter((n) => n !== t);
    };
  }
  notify() {
    this.listeners.forEach((t) => t(this.state));
  }
}
const Ue = new Cc();
class Mc {
  constructor() {
    this.cursor = null, this.x = 0, this.y = 0, this.targetX = 0, this.targetY = 0, this.smoothing = 0.3, this.isVisible = !1, Ue.addListener((t) => {
      const n = t.cursorSensitivity;
      this.smoothing = n === 1 ? 0.05 : n * 0.09;
    });
  }
  initialize() {
    this.cursor = document.createElement("div"), this.cursor.className = "virtual-cursor", document.body.appendChild(this.cursor), this.hide();
  }
  show() {
    !this.isVisible && this.cursor && (this.cursor.style.display = "block", this.isVisible = !0);
  }
  hide() {
    this.isVisible && this.cursor && (this.cursor.style.display = "none", this.isVisible = !1);
  }
  updatePosition(t, n) {
    if (!this.cursor) return;
    const s = t * window.innerWidth, r = n * window.innerHeight;
    this.targetX = s, this.targetY = r, this.x += (this.targetX - this.x) * this.smoothing, this.y += (this.targetY - this.y) * this.smoothing, this.cursor.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }
  getPosition() {
    return { x: this.x, y: this.y };
  }
  setClickState(t) {
    this.cursor && (t ? this.cursor.classList.add("active") : this.cursor.classList.remove("active"));
  }
  hideVisual() {
    this.cursor && (this.cursor.style.opacity = "0");
  }
  showVisual() {
    this.cursor && (this.cursor.style.opacity = "1");
  }
}
const we = new Mc();
class Rc {
  constructor() {
    this.lastGesture = "UNKNOWN";
  }
  detect(t) {
    if (!t || t.length === 0) return "UNKNOWN";
    const n = t[4], s = t[8], r = this.getDistance(n, s), i = this.isFingerCurled(t, 12, 9), o = this.isFingerCurled(t, 16, 13), c = this.isFingerCurled(t, 20, 17), a = this.isFingerCurled(t, 8, 5), h = t[5], l = this.getDistance(n, h) > 0.08, m = this.getDistance(s, h) > 0.06;
    return r < 0.05 ? "PINCH" : !c && l && i && o ? "SHAKA" : a && i && o && c || !m && i && o && c ? "FIST" : m && i && o && c ? "POINTING" : !a && !i && !o && !c ? "OPEN_PALM" : "UNKNOWN";
  }
  isFingerCurled(t, n, s) {
    const r = t[n], i = t[s], o = t[0];
    return this.getDistance(r, o) < this.getDistance(i, o);
  }
  getDistance(t, n) {
    return Math.sqrt(Math.pow(t.x - n.x, 2) + Math.pow(t.y - n.y, 2) + Math.pow(t.z - n.z, 2));
  }
}
const Fc = new Rc();
class Oc {
  constructor() {
    this.currentGesture = "UNKNOWN", this.lastGesture = "UNKNOWN", this.settings = Ue.getState(), Ue.addListener((t) => {
      this.settings = t;
    }), this.isClicking = !1, this.lastClickTime = 0, this.isScrolling = !1, this.scrollStartY = 0, this.lastScrollY = 0;
  }
  update(t, n, s) {
    this.lastGesture = this.currentGesture, this.currentGesture = t, this.handleClicks(t), this.handleScroll(t, n, s), this.handleNavigation(t);
  }
  handleNavigation(t) {
    if (this.settings.gestures.back && t === "SHAKA") {
      const n = Date.now();
      (!this.lastNavTime || n - this.lastNavTime > 1500) && (console.log("Shaka! Going Back."), this.lastNavTime = n, this.showToast("🤙 Going Back"), window.history.length > 1 && window.history.back());
    }
  }
  showToast(t) {
    const n = document.createElement("div");
    n.innerText = t, n.style.position = "fixed", n.style.bottom = "10%", n.style.left = "50%", n.style.transform = "translateX(-50%)", n.style.background = "rgba(0,0,0,0.8)", n.style.color = "#fff", n.style.padding = "10px 20px", n.style.borderRadius = "20px", n.style.zIndex = "10002", document.body.appendChild(n), setTimeout(() => n.remove(), 1e3);
  }
  handleClicks(t) {
    if (this.settings.gestures.click)
      if (t === "PINCH") {
        if (!this.isClicking) {
          this.isClicking = !0, we.setClickState(!0);
          const n = Date.now();
          n - this.lastClickTime > 200 && (this.triggerClickAtCursor(), this.lastClickTime = n);
        }
      } else
        this.isClicking && (this.isClicking = !1, we.setClickState(!1));
  }
  handleScroll(t, n, s) {
    if (!this.settings.gestures.scroll) {
      this.handleScrollEnd();
      return;
    }
    if (t === "FIST")
      if (this.isScrolling) {
        this.scrollSmoothedY = this.scrollSmoothedY * (1 - 0.15) + n * 0.15, typeof s == "number" && (this.scrollSmoothedX = this.scrollSmoothedX * (1 - 0.15) + s * 0.15);
        const i = this.scrollSmoothedY - this.lastScrollY;
        let o = 0;
        if (typeof s == "number" && (o = this.scrollSmoothedX - this.lastScrollX), Math.abs(i) < 2e-3 && Math.abs(o) < 2e-3)
          return;
        const c = 500 * this.settings.scrollSpeed;
        if (this.activeScrollElement && this.activeScrollElement !== window) {
          const a = o * c * 3, h = i * c * 2;
          this.activeScrollElement.scrollLeft += a, this.activeScrollElement.scrollTop += h;
        } else
          window.scrollBy(o * c * 1.5, i * c);
        this.lastScrollY = this.scrollSmoothedY, this.lastScrollX = this.scrollSmoothedX;
      } else {
        this.isScrolling = !0, this.scrollStartY = n, this.lastScrollY = n, this.scrollSmoothedY = n, this.lastScrollX = s, this.scrollSmoothedX = s;
        const { x: r, y: i } = we.getPosition();
        we.hideVisual();
        const o = document.elementFromPoint(r, i);
        we.showVisual(), this.activeScrollElement = this.getScrollParent(o);
        let c = "Window";
        this.activeScrollElement && this.activeScrollElement !== window && (c = this.activeScrollElement.className || this.activeScrollElement.tagName, this.activeScrollElement.style.outline = "2px solid rgba(0, 255, 0, 0.5)", setTimeout(() => this.activeScrollElement.style.outline = "", 500)), console.log("Scroll Target:", c), this.showToast(`Scrolling: ${c}`);
      }
    else
      this.handleScrollEnd();
  }
  handleScrollEnd() {
    this.isScrolling && (this.isScrolling = !1, this.activeScrollElement = null);
  }
  getScrollParent(t) {
    if (!t || t === document.body || t === document.documentElement) return window;
    if (t instanceof HTMLElement) {
      const s = window.getComputedStyle(t), r = s.overflowY, i = s.overflowX;
      if (r === "auto" || r === "scroll" || (i === "auto" || i === "scroll"))
        return t;
    }
    return t.parentElement ? this.getScrollParent(t.parentElement) : window;
  }
  triggerClickAtCursor() {
    const { x: t, y: n } = we.getPosition();
    console.log(`Triggering click at ${t}, ${n}`), we.hideVisual();
    const s = document.elementFromPoint(t, n);
    s && (console.log("Clicked element:", s), s.click(), s.classList.add("mhbn-clicked"), setTimeout(() => s.classList.remove("mhbn-clicked"), 200)), we.showVisual();
  }
}
const Nc = new Oc();
class Ic {
  constructor() {
    this.element = null, this.isOpen = !1, this.unsub = null;
  }
  render() {
    this.element || (this.element = document.createElement("div"), this.element.className = "mhbn-settings-modal hidden", this.element.innerHTML = `
            <div class="settings-content glass-panel">
                <div class="settings-header">
                    <h2>⚙️ Configuration</h2>
                    <button class="close-btn" id="settings-close">×</button>
                </div>
                
                <div class="settings-section">
                    <h3>Sensitivity</h3>
                    
                    <div class="control-row">
                        <label>Cursor Smoothness</label>
                        <input type="range" min="1" max="10" id="set-cursor-speed">
                    </div>
                    <div class="control-row">
                        <label>Scroll Speed</label>
                        <input type="range" min="1" max="10" id="set-scroll-speed">
                    </div>
                </div>

                <div class="settings-section">
                    <h3>Gestures</h3>
                    
                    <div class="control-row">
                        <label>👌 Pinch to Click</label>
                        <input type="checkbox" class="toggle" id="toggle-click">
                    </div>
                    <div class="control-row">
                        <label>✊ Fist to Scroll</label>
                        <input type="checkbox" class="toggle" id="toggle-scroll">
                    </div>
                    <div class="control-row">
                        <label>🤙 Shaka to Go Back</label>
                        <input type="checkbox" class="toggle" id="toggle-back">
                    </div>
                </div>
                
                <div class="settings-footer">
                    <button class="btn-primary" id="settings-save">Done</button>
                </div>
            </div>
        `, document.body.appendChild(this.element), this.attachListeners(), this.unsub = Ue.addListener((t) => {
      this.syncUI(t);
    }));
  }
  attachListeners() {
    const t = this.element.querySelector("#settings-close"), n = this.element.querySelector("#settings-save"), s = () => this.close();
    t.addEventListener("click", s), n.addEventListener("click", s), this.element.querySelector("#set-cursor-speed").addEventListener("input", (r) => {
      Ue.update({ cursorSensitivity: parseInt(r.target.value) });
    }), this.element.querySelector("#set-scroll-speed").addEventListener("input", (r) => {
      Ue.update({ scrollSpeed: parseInt(r.target.value) });
    }), this.element.querySelector("#toggle-click").addEventListener("change", (r) => {
      Ue.updateGesture("click", r.target.checked);
    }), this.element.querySelector("#toggle-scroll").addEventListener("change", (r) => {
      Ue.updateGesture("scroll", r.target.checked);
    }), this.element.querySelector("#toggle-back").addEventListener("change", (r) => {
      Ue.updateGesture("back", r.target.checked);
    });
  }
  syncUI(t) {
    this.element && (this.element.querySelector("#set-cursor-speed").value = t.cursorSensitivity, this.element.querySelector("#set-scroll-speed").value = t.scrollSpeed, this.element.querySelector("#toggle-click").checked = t.gestures.click, this.element.querySelector("#toggle-scroll").checked = t.gestures.scroll, this.element.querySelector("#toggle-back").checked = t.gestures.back);
  }
  open() {
    this.element.classList.remove("hidden"), this.isOpen = !0;
  }
  close() {
    this.element.classList.add("hidden"), this.isOpen = !1;
  }
}
const no = new Ic();
class Pc {
  constructor() {
    this.element = null, this.sensitivity = 3, this.gestureScale = {
      UNKNOWN: 1,
      OPEN_PALM: 1,
      FIST: 0.8,
      PINCH: 0.8,
      POINTING: 1,
      THUMB_OPEN: 1,
      VICTORY: 1,
      SHAKA: 1
    };
  }
  updateGesture(t, n = !1) {
    if (!this.element) return;
    const s = this.element.querySelector("#gesture-value");
    n ? (s && (s.innerText = "OUT OF RANGE"), s.style.color = "#FF3B30", this.element.querySelector(".glass-panel").classList.add("warning-border")) : (s && (s.innerText = t, s.style.color = "#fff"), this.element.querySelector(".glass-panel").classList.remove("warning-border")), this.gestureScale[t];
  }
  render() {
    no.render(), this.element = document.createElement("div"), this.element.className = "mhbn-dashboard", this.element.innerHTML = `
      <div class="glass-panel">
        <header class="dashboard-header">
           <div class="logo">
             <span class="icon">🖐️</span> HandFlow
           </div>
           <div class="status-indicator active" id="camera-status"></div>
        </header>

        <div class="content">
            <div class="stats">
                <div class="stat-item">
                    <span class="label">FPS</span>
                    <span class="value" id="fps-value">60</span>
                </div>
                <div class="stat-item">
                    <span class="label">Gesture</span>
                    <span class="value" id="gesture-value">--</span>
                </div>
            </div>

            <div class="actions">
                <button class="btn-primary" id="open-settings" style="background:#555; margin-bottom:10px;">⚙️ Settings</button>
                <button class="btn-primary" id="toggle-debug">Toggle Debug</button>
            </div>
        </div>
      </div>
    `, document.body.appendChild(this.element), this.attachListeners();
  }
  attachListeners() {
    this.element.querySelector("#toggle-debug").addEventListener("click", () => {
      const s = document.querySelector(".debug-overlay");
      s && (s.style.display = s.style.display === "none" ? "block" : "none");
    }), this.element.querySelector("#open-settings").addEventListener("click", () => {
      no.open();
    });
  }
}
const As = new Pc();
class Uc {
  constructor() {
    this.initialized = !1, this.loopId = null;
  }
  async init(t = {}) {
    if (this.initialized) return;
    console.log("MotionHand: Initializing...");
    const n = Ts.createOverlay(), s = document.querySelector(".debug-overlay");
    s && (s.style.display = t.showDebug ? "block" : "none"), we.initialize(), await bs.initialize(), await bs.startCamera(n), this.initialized = !0, this.startLoop(), console.log("MotionHand: System Ready.");
  }
  startLoop() {
    const t = () => {
      const n = bs.detect();
      let s = "UNKNOWN";
      if (n && n.raw && n.raw.landmarks && n.raw.landmarks.length > 0) {
        const r = n.raw.landmarks[0];
        s = Fc.detect(r), Ts.update(n.raw, s, n.isOutOfBounds), n.cursor && Nc.update(s, n.cursor.y, n.cursor.x);
      } else
        Ts.update(null, "NO HAND");
      typeof As < "u" && As.updateGesture && As.updateGesture(s, n ? n.isOutOfBounds : !1), n && n.cursor && (we.show(), we.updatePosition(n.cursor.x, n.cursor.y)), this.loopId = requestAnimationFrame(t);
    };
    t();
  }
  stop() {
    this.loopId && cancelAnimationFrame(this.loopId);
  }
}
const Dc = new Uc();
export {
  Uc as MotionHandSystem,
  Dc as motionHand
};
