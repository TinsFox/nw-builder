function Wn(e, t) {
  const n = Object.create(null),
    s = e.split(",");
  for (let r = 0; r < s.length; r++) n[s[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function Vn(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = re(s) ? Ci(s) : Vn(s);
      if (r) for (const i in r) t[i] = r[i];
    }
    return t;
  } else {
    if (re(e)) return e;
    if (ee(e)) return e;
  }
}
const bi = /;(?![^(]*\))/g,
  yi = /:([^]+)/,
  wi = /\/\*.*?\*\//gs;
function Ci(e) {
  const t = {};
  return (
    e
      .replace(wi, "")
      .split(bi)
      .forEach((n) => {
        if (n) {
          const s = n.split(yi);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function qn(e) {
  let t = "";
  if (re(e)) t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const s = qn(e[n]);
      s && (t += s + " ");
    }
  else if (ee(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const xi =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Ei = Wn(xi);
function rr(e) {
  return !!e || e === "";
}
const xc = (e) =>
    re(e)
      ? e
      : e == null
      ? ""
      : N(e) || (ee(e) && (e.toString === cr || !U(e.toString)))
      ? JSON.stringify(e, ir, 2)
      : String(e),
  ir = (e, t) =>
    t && t.__v_isRef
      ? ir(e, t.value)
      : ut(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, r]) => ((n[`${s} =>`] = r), n),
            {},
          ),
        }
      : or(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ee(t) && !N(t) && !fr(t)
      ? String(t)
      : t,
  te = {},
  ft = [],
  Re = () => {},
  Ti = () => !1,
  vi = /^on[^a-z]/,
  Lt = (e) => vi.test(e),
  zn = (e) => e.startsWith("onUpdate:"),
  le = Object.assign,
  Yn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Ai = Object.prototype.hasOwnProperty,
  q = (e, t) => Ai.call(e, t),
  N = Array.isArray,
  ut = (e) => on(e) === "[object Map]",
  or = (e) => on(e) === "[object Set]",
  U = (e) => typeof e == "function",
  re = (e) => typeof e == "string",
  Jn = (e) => typeof e == "symbol",
  ee = (e) => e !== null && typeof e == "object",
  lr = (e) => ee(e) && U(e.then) && U(e.catch),
  cr = Object.prototype.toString,
  on = (e) => cr.call(e),
  Oi = (e) => on(e).slice(8, -1),
  fr = (e) => on(e) === "[object Object]",
  Xn = (e) =>
    re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Tt = Wn(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  ln = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Ri = /-(\w)/g,
  Se = ln((e) => e.replace(Ri, (t, n) => (n ? n.toUpperCase() : ""))),
  Ii = /\B([A-Z])/g,
  it = ln((e) => e.replace(Ii, "-$1").toLowerCase()),
  cn = ln((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Yt = ln((e) => (e ? `on${cn(e)}` : "")),
  Rt = (e, t) => !Object.is(e, t),
  wn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Qt = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Pi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Fi = (e) => {
    const t = re(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let _s;
const Mi = () =>
  _s ||
  (_s =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let _e;
class Si {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = _e),
      !t && _e && (this.index = (_e.scopes || (_e.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = _e;
      try {
        return (_e = this), t();
      } finally {
        _e = n;
      }
    }
  }
  on() {
    _e = this;
  }
  off() {
    _e = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Li(e, t = _e) {
  t && t.active && t.effects.push(e);
}
function Ni() {
  return _e;
}
function Ec(e) {
  _e && _e.cleanups.push(e);
}
const Zn = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  ur = (e) => (e.w & Ve) > 0,
  ar = (e) => (e.n & Ve) > 0,
  $i = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ve;
  },
  Hi = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const r = t[s];
        ur(r) && !ar(r) ? r.delete(e) : (t[n++] = r),
          (r.w &= ~Ve),
          (r.n &= ~Ve);
      }
      t.length = n;
    }
  },
  In = new WeakMap();
let Et = 0,
  Ve = 1;
const Pn = 30;
let Ae;
const st = Symbol(""),
  Fn = Symbol("");
class Qn {
  constructor(t, n = null, s) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Li(this, s);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ae,
      n = ke;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ae),
        (Ae = this),
        (ke = !0),
        (Ve = 1 << ++Et),
        Et <= Pn ? $i(this) : bs(this),
        this.fn()
      );
    } finally {
      Et <= Pn && Hi(this),
        (Ve = 1 << --Et),
        (Ae = this.parent),
        (ke = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ae === this
      ? (this.deferStop = !0)
      : this.active &&
        (bs(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function bs(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let ke = !0;
const dr = [];
function yt() {
  dr.push(ke), (ke = !1);
}
function wt() {
  const e = dr.pop();
  ke = e === void 0 ? !0 : e;
}
function pe(e, t, n) {
  if (ke && Ae) {
    let s = In.get(e);
    s || In.set(e, (s = new Map()));
    let r = s.get(n);
    r || s.set(n, (r = Zn())), hr(r);
  }
}
function hr(e, t) {
  let n = !1;
  Et <= Pn ? ar(e) || ((e.n |= Ve), (n = !ur(e))) : (n = !e.has(Ae)),
    n && (e.add(Ae), Ae.deps.push(e));
}
function $e(e, t, n, s, r, i) {
  const o = In.get(e);
  if (!o) return;
  let l = [];
  if (t === "clear") l = [...o.values()];
  else if (n === "length" && N(e)) {
    const f = Number(s);
    o.forEach((a, d) => {
      (d === "length" || d >= f) && l.push(a);
    });
  } else
    switch ((n !== void 0 && l.push(o.get(n)), t)) {
      case "add":
        N(e)
          ? Xn(n) && l.push(o.get("length"))
          : (l.push(o.get(st)), ut(e) && l.push(o.get(Fn)));
        break;
      case "delete":
        N(e) || (l.push(o.get(st)), ut(e) && l.push(o.get(Fn)));
        break;
      case "set":
        ut(e) && l.push(o.get(st));
        break;
    }
  if (l.length === 1) l[0] && Mn(l[0]);
  else {
    const f = [];
    for (const a of l) a && f.push(...a);
    Mn(Zn(f));
  }
}
function Mn(e, t) {
  const n = N(e) ? e : [...e];
  for (const s of n) s.computed && ys(s);
  for (const s of n) s.computed || ys(s);
}
function ys(e, t) {
  (e !== Ae || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Bi = Wn("__proto__,__v_isRef,__isVue"),
  pr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Jn),
  ),
  Ui = Gn(),
  ji = Gn(!1, !0),
  Di = Gn(!0),
  ws = Ki();
function Ki() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = Y(this);
        for (let i = 0, o = this.length; i < o; i++) pe(s, "get", i + "");
        const r = s[t](...n);
        return r === -1 || r === !1 ? s[t](...n.map(Y)) : r;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        yt();
        const s = Y(this)[t].apply(this, n);
        return wt(), s;
      };
    }),
    e
  );
}
function ki(e) {
  const t = Y(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
function Gn(e = !1, t = !1) {
  return function (s, r, i) {
    if (r === "__v_isReactive") return !e;
    if (r === "__v_isReadonly") return e;
    if (r === "__v_isShallow") return t;
    if (r === "__v_raw" && i === (e ? (t ? io : yr) : t ? br : _r).get(s))
      return s;
    const o = N(s);
    if (!e) {
      if (o && q(ws, r)) return Reflect.get(ws, r, i);
      if (r === "hasOwnProperty") return ki;
    }
    const l = Reflect.get(s, r, i);
    return (Jn(r) ? pr.has(r) : Bi(r)) || (e || pe(s, "get", r), t)
      ? l
      : fe(l)
      ? o && Xn(r)
        ? l
        : l.value
      : ee(l)
      ? e
        ? wr(l)
        : un(l)
      : l;
  };
}
const Wi = gr(),
  Vi = gr(!0);
function gr(e = !1) {
  return function (n, s, r, i) {
    let o = n[s];
    if (mt(o) && fe(o) && !fe(r)) return !1;
    if (
      !e &&
      (!Gt(r) && !mt(r) && ((o = Y(o)), (r = Y(r))), !N(n) && fe(o) && !fe(r))
    )
      return (o.value = r), !0;
    const l = N(n) && Xn(s) ? Number(s) < n.length : q(n, s),
      f = Reflect.set(n, s, r, i);
    return (
      n === Y(i) && (l ? Rt(r, o) && $e(n, "set", s, r) : $e(n, "add", s, r)), f
    );
  };
}
function qi(e, t) {
  const n = q(e, t);
  e[t];
  const s = Reflect.deleteProperty(e, t);
  return s && n && $e(e, "delete", t, void 0), s;
}
function zi(e, t) {
  const n = Reflect.has(e, t);
  return (!Jn(t) || !pr.has(t)) && pe(e, "has", t), n;
}
function Yi(e) {
  return pe(e, "iterate", N(e) ? "length" : st), Reflect.ownKeys(e);
}
const mr = { get: Ui, set: Wi, deleteProperty: qi, has: zi, ownKeys: Yi },
  Ji = {
    get: Di,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Xi = le({}, mr, { get: ji, set: Vi }),
  es = (e) => e,
  fn = (e) => Reflect.getPrototypeOf(e);
function Ut(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = Y(e),
    i = Y(t);
  n || (t !== i && pe(r, "get", t), pe(r, "get", i));
  const { has: o } = fn(r),
    l = s ? es : n ? ss : It;
  if (o.call(r, t)) return l(e.get(t));
  if (o.call(r, i)) return l(e.get(i));
  e !== r && e.get(t);
}
function jt(e, t = !1) {
  const n = this.__v_raw,
    s = Y(n),
    r = Y(e);
  return (
    t || (e !== r && pe(s, "has", e), pe(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function Dt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && pe(Y(e), "iterate", st), Reflect.get(e, "size", e)
  );
}
function Cs(e) {
  e = Y(e);
  const t = Y(this);
  return fn(t).has.call(t, e) || (t.add(e), $e(t, "add", e, e)), this;
}
function xs(e, t) {
  t = Y(t);
  const n = Y(this),
    { has: s, get: r } = fn(n);
  let i = s.call(n, e);
  i || ((e = Y(e)), (i = s.call(n, e)));
  const o = r.call(n, e);
  return (
    n.set(e, t), i ? Rt(t, o) && $e(n, "set", e, t) : $e(n, "add", e, t), this
  );
}
function Es(e) {
  const t = Y(this),
    { has: n, get: s } = fn(t);
  let r = n.call(t, e);
  r || ((e = Y(e)), (r = n.call(t, e))), s && s.call(t, e);
  const i = t.delete(e);
  return r && $e(t, "delete", e, void 0), i;
}
function Ts() {
  const e = Y(this),
    t = e.size !== 0,
    n = e.clear();
  return t && $e(e, "clear", void 0, void 0), n;
}
function Kt(e, t) {
  return function (s, r) {
    const i = this,
      o = i.__v_raw,
      l = Y(o),
      f = t ? es : e ? ss : It;
    return (
      !e && pe(l, "iterate", st), o.forEach((a, d) => s.call(r, f(a), f(d), i))
    );
  };
}
function kt(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      i = Y(r),
      o = ut(i),
      l = e === "entries" || (e === Symbol.iterator && o),
      f = e === "keys" && o,
      a = r[e](...s),
      d = n ? es : t ? ss : It;
    return (
      !t && pe(i, "iterate", f ? Fn : st),
      {
        next() {
          const { value: p, done: y } = a.next();
          return y
            ? { value: p, done: y }
            : { value: l ? [d(p[0]), d(p[1])] : d(p), done: y };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Be(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Zi() {
  const e = {
      get(i) {
        return Ut(this, i);
      },
      get size() {
        return Dt(this);
      },
      has: jt,
      add: Cs,
      set: xs,
      delete: Es,
      clear: Ts,
      forEach: Kt(!1, !1),
    },
    t = {
      get(i) {
        return Ut(this, i, !1, !0);
      },
      get size() {
        return Dt(this);
      },
      has: jt,
      add: Cs,
      set: xs,
      delete: Es,
      clear: Ts,
      forEach: Kt(!1, !0),
    },
    n = {
      get(i) {
        return Ut(this, i, !0);
      },
      get size() {
        return Dt(this, !0);
      },
      has(i) {
        return jt.call(this, i, !0);
      },
      add: Be("add"),
      set: Be("set"),
      delete: Be("delete"),
      clear: Be("clear"),
      forEach: Kt(!0, !1),
    },
    s = {
      get(i) {
        return Ut(this, i, !0, !0);
      },
      get size() {
        return Dt(this, !0);
      },
      has(i) {
        return jt.call(this, i, !0);
      },
      add: Be("add"),
      set: Be("set"),
      delete: Be("delete"),
      clear: Be("clear"),
      forEach: Kt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = kt(i, !1, !1)),
        (n[i] = kt(i, !0, !1)),
        (t[i] = kt(i, !1, !0)),
        (s[i] = kt(i, !0, !0));
    }),
    [e, n, t, s]
  );
}
const [Qi, Gi, eo, to] = Zi();
function ts(e, t) {
  const n = t ? (e ? to : eo) : e ? Gi : Qi;
  return (s, r, i) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
      ? e
      : r === "__v_raw"
      ? s
      : Reflect.get(q(n, r) && r in s ? n : s, r, i);
}
const no = { get: ts(!1, !1) },
  so = { get: ts(!1, !0) },
  ro = { get: ts(!0, !1) },
  _r = new WeakMap(),
  br = new WeakMap(),
  yr = new WeakMap(),
  io = new WeakMap();
function oo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function lo(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : oo(Oi(e));
}
function un(e) {
  return mt(e) ? e : ns(e, !1, mr, no, _r);
}
function co(e) {
  return ns(e, !1, Xi, so, br);
}
function wr(e) {
  return ns(e, !0, Ji, ro, yr);
}
function ns(e, t, n, s, r) {
  if (!ee(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = r.get(e);
  if (i) return i;
  const o = lo(e);
  if (o === 0) return e;
  const l = new Proxy(e, o === 2 ? s : n);
  return r.set(e, l), l;
}
function at(e) {
  return mt(e) ? at(e.__v_raw) : !!(e && e.__v_isReactive);
}
function mt(e) {
  return !!(e && e.__v_isReadonly);
}
function Gt(e) {
  return !!(e && e.__v_isShallow);
}
function Cr(e) {
  return at(e) || mt(e);
}
function Y(e) {
  const t = e && e.__v_raw;
  return t ? Y(t) : e;
}
function vt(e) {
  return Qt(e, "__v_skip", !0), e;
}
const It = (e) => (ee(e) ? un(e) : e),
  ss = (e) => (ee(e) ? wr(e) : e);
function xr(e) {
  ke && Ae && ((e = Y(e)), hr(e.dep || (e.dep = Zn())));
}
function Er(e, t) {
  e = Y(e);
  const n = e.dep;
  n && Mn(n);
}
function fe(e) {
  return !!(e && e.__v_isRef === !0);
}
function Tr(e) {
  return vr(e, !1);
}
function fo(e) {
  return vr(e, !0);
}
function vr(e, t) {
  return fe(e) ? e : new uo(e, t);
}
class uo {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Y(t)),
      (this._value = n ? t : It(t));
  }
  get value() {
    return xr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Gt(t) || mt(t);
    (t = n ? t : Y(t)),
      Rt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : It(t)), Er(this));
  }
}
function ao(e) {
  return fe(e) ? e.value : e;
}
const ho = {
  get: (e, t, n) => ao(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return fe(r) && !fe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Ar(e) {
  return at(e) ? e : new Proxy(e, ho);
}
var Or;
class po {
  constructor(t, n, s, r) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Or] = !1),
      (this._dirty = !0),
      (this.effect = new Qn(t, () => {
        this._dirty || ((this._dirty = !0), Er(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !r),
      (this.__v_isReadonly = s);
  }
  get value() {
    const t = Y(this);
    return (
      xr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
Or = "__v_isReadonly";
function go(e, t, n = !1) {
  let s, r;
  const i = U(e);
  return (
    i ? ((s = e), (r = Re)) : ((s = e.get), (r = e.set)),
    new po(s, r, i || !r, n)
  );
}
function We(e, t, n, s) {
  let r;
  try {
    r = s ? e(...s) : e();
  } catch (i) {
    an(i, t, n);
  }
  return r;
}
function xe(e, t, n, s) {
  if (U(e)) {
    const i = We(e, t, n, s);
    return (
      i &&
        lr(i) &&
        i.catch((o) => {
          an(o, t, n);
        }),
      i
    );
  }
  const r = [];
  for (let i = 0; i < e.length; i++) r.push(xe(e[i], t, n, s));
  return r;
}
function an(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const o = t.proxy,
      l = n;
    for (; i; ) {
      const a = i.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, o, l) === !1) return;
      }
      i = i.parent;
    }
    const f = t.appContext.config.errorHandler;
    if (f) {
      We(f, null, 10, [e, o, l]);
      return;
    }
  }
  mo(e, n, r, s);
}
function mo(e, t, n, s = !0) {
  console.error(e);
}
let Pt = !1,
  Sn = !1;
const ce = [];
let Me = 0;
const dt = [];
let Ne = null,
  Ge = 0;
const Rr = Promise.resolve();
let rs = null;
function Ir(e) {
  const t = rs || Rr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function _o(e) {
  let t = Me + 1,
    n = ce.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1;
    Ft(ce[s]) < e ? (t = s + 1) : (n = s);
  }
  return t;
}
function is(e) {
  (!ce.length || !ce.includes(e, Pt && e.allowRecurse ? Me + 1 : Me)) &&
    (e.id == null ? ce.push(e) : ce.splice(_o(e.id), 0, e), Pr());
}
function Pr() {
  !Pt && !Sn && ((Sn = !0), (rs = Rr.then(Fr)));
}
function bo(e) {
  const t = ce.indexOf(e);
  t > Me && ce.splice(t, 1);
}
function yo(e) {
  N(e)
    ? dt.push(...e)
    : (!Ne || !Ne.includes(e, e.allowRecurse ? Ge + 1 : Ge)) && dt.push(e),
    Pr();
}
function vs(e, t = Pt ? Me + 1 : 0) {
  for (; t < ce.length; t++) {
    const n = ce[t];
    n && n.pre && (ce.splice(t, 1), t--, n());
  }
}
function en(e) {
  if (dt.length) {
    const t = [...new Set(dt)];
    if (((dt.length = 0), Ne)) {
      Ne.push(...t);
      return;
    }
    for (Ne = t, Ne.sort((n, s) => Ft(n) - Ft(s)), Ge = 0; Ge < Ne.length; Ge++)
      Ne[Ge]();
    (Ne = null), (Ge = 0);
  }
}
const Ft = (e) => (e.id == null ? 1 / 0 : e.id),
  wo = (e, t) => {
    const n = Ft(e) - Ft(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Fr(e) {
  (Sn = !1), (Pt = !0), ce.sort(wo);
  const t = Re;
  try {
    for (Me = 0; Me < ce.length; Me++) {
      const n = ce[Me];
      n && n.active !== !1 && We(n, null, 14);
    }
  } finally {
    (Me = 0),
      (ce.length = 0),
      en(),
      (Pt = !1),
      (rs = null),
      (ce.length || dt.length) && Fr();
  }
}
function Co(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || te;
  let r = n;
  const i = t.startsWith("update:"),
    o = i && t.slice(7);
  if (o && o in s) {
    const d = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: p, trim: y } = s[d] || te;
    y && (r = n.map((O) => (re(O) ? O.trim() : O))), p && (r = n.map(Pi));
  }
  let l,
    f = s[(l = Yt(t))] || s[(l = Yt(Se(t)))];
  !f && i && (f = s[(l = Yt(it(t)))]), f && xe(f, e, 6, r);
  const a = s[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), xe(a, e, 6, r);
  }
}
function Mr(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const i = e.emits;
  let o = {},
    l = !1;
  if (!U(e)) {
    const f = (a) => {
      const d = Mr(a, t, !0);
      d && ((l = !0), le(o, d));
    };
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  return !i && !l
    ? (ee(e) && s.set(e, null), null)
    : (N(i) ? i.forEach((f) => (o[f] = null)) : le(o, i),
      ee(e) && s.set(e, o),
      o);
}
function dn(e, t) {
  return !e || !Lt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      q(e, t[0].toLowerCase() + t.slice(1)) || q(e, it(t)) || q(e, t));
}
let ue = null,
  hn = null;
function tn(e) {
  const t = ue;
  return (ue = e), (hn = (e && e.type.__scopeId) || null), t;
}
function Tc(e) {
  hn = e;
}
function vc() {
  hn = null;
}
function xo(e, t = ue, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Ns(-1);
    const i = tn(t);
    let o;
    try {
      o = e(...r);
    } finally {
      tn(i), s._d && Ns(1);
    }
    return o;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function Cn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: i,
    propsOptions: [o],
    slots: l,
    attrs: f,
    emit: a,
    render: d,
    renderCache: p,
    data: y,
    setupState: O,
    ctx: L,
    inheritAttrs: P,
  } = e;
  let W, _;
  const E = tn(e);
  try {
    if (n.shapeFlag & 4) {
      const H = r || s;
      (W = ve(d.call(H, H, p, i, O, y, L))), (_ = f);
    } else {
      const H = t;
      (W = ve(
        H.length > 1 ? H(i, { attrs: f, slots: l, emit: a }) : H(i, null),
      )),
        (_ = t.props ? f : Eo(f));
    }
  } catch (H) {
    (Ot.length = 0), an(H, e, 1), (W = oe(be));
  }
  let A = W;
  if (_ && P !== !1) {
    const H = Object.keys(_),
      { shapeFlag: D } = A;
    H.length && D & 7 && (o && H.some(zn) && (_ = To(_, o)), (A = qe(A, _)));
  }
  return (
    n.dirs && ((A = qe(A)), (A.dirs = A.dirs ? A.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (A.transition = n.transition),
    (W = A),
    tn(E),
    W
  );
}
const Eo = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Lt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  To = (e, t) => {
    const n = {};
    for (const s in e) (!zn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function vo(e, t, n) {
  const { props: s, children: r, component: i } = e,
    { props: o, children: l, patchFlag: f } = t,
    a = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && f >= 0) {
    if (f & 1024) return !0;
    if (f & 16) return s ? As(s, o, a) : !!o;
    if (f & 8) {
      const d = t.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        const y = d[p];
        if (o[y] !== s[y] && !dn(a, y)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === o
      ? !1
      : s
      ? o
        ? As(s, o, a)
        : !0
      : !!o;
  return !1;
}
function As(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !dn(n, i)) return !0;
  }
  return !1;
}
function Ao({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Oo = (e) => e.__isSuspense;
function Sr(e, t) {
  t && t.pendingBranch
    ? N(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : yo(e);
}
function Ro(e, t) {
  if (se) {
    let n = se.provides;
    const s = se.parent && se.parent.provides;
    s === n && (n = se.provides = Object.create(s)), (n[e] = t);
  }
}
function ht(e, t, n = !1) {
  const s = se || ue;
  if (s) {
    const r =
      s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && U(t) ? t.call(s.proxy) : t;
  }
}
function Io(e, t) {
  return pn(e, null, t);
}
function Po(e, t) {
  return pn(e, null, { flush: "post" });
}
const Wt = {};
function Jt(e, t, n) {
  return pn(e, t, n);
}
function pn(
  e,
  t,
  { immediate: n, deep: s, flush: r, onTrack: i, onTrigger: o } = te,
) {
  const l = Ni() === (se == null ? void 0 : se.scope) ? se : null;
  let f,
    a = !1,
    d = !1;
  if (
    (fe(e)
      ? ((f = () => e.value), (a = Gt(e)))
      : at(e)
      ? ((f = () => e), (s = !0))
      : N(e)
      ? ((d = !0),
        (a = e.some((A) => at(A) || Gt(A))),
        (f = () =>
          e.map((A) => {
            if (fe(A)) return A.value;
            if (at(A)) return ct(A);
            if (U(A)) return We(A, l, 2);
          })))
      : U(e)
      ? t
        ? (f = () => We(e, l, 2))
        : (f = () => {
            if (!(l && l.isUnmounted)) return p && p(), xe(e, l, 3, [y]);
          })
      : (f = Re),
    t && s)
  ) {
    const A = f;
    f = () => ct(A());
  }
  let p,
    y = (A) => {
      p = _.onStop = () => {
        We(A, l, 4);
      };
    },
    O;
  if (St)
    if (
      ((y = Re),
      t ? n && xe(t, l, 3, [f(), d ? [] : void 0, y]) : f(),
      r === "sync")
    ) {
      const A = xl();
      O = A.__watcherHandles || (A.__watcherHandles = []);
    } else return Re;
  let L = d ? new Array(e.length).fill(Wt) : Wt;
  const P = () => {
    if (_.active)
      if (t) {
        const A = _.run();
        (s || a || (d ? A.some((H, D) => Rt(H, L[D])) : Rt(A, L))) &&
          (p && p(),
          xe(t, l, 3, [A, L === Wt ? void 0 : d && L[0] === Wt ? [] : L, y]),
          (L = A));
      } else _.run();
  };
  P.allowRecurse = !!t;
  let W;
  r === "sync"
    ? (W = P)
    : r === "post"
    ? (W = () => he(P, l && l.suspense))
    : ((P.pre = !0), l && (P.id = l.uid), (W = () => is(P)));
  const _ = new Qn(f, W);
  t
    ? n
      ? P()
      : (L = _.run())
    : r === "post"
    ? he(_.run.bind(_), l && l.suspense)
    : _.run();
  const E = () => {
    _.stop(), l && l.scope && Yn(l.scope.effects, _);
  };
  return O && O.push(E), E;
}
function Fo(e, t, n) {
  const s = this.proxy,
    r = re(e) ? (e.includes(".") ? Lr(s, e) : () => s[e]) : e.bind(s, s);
  let i;
  U(t) ? (i = t) : ((i = t.handler), (n = t));
  const o = se;
  bt(this);
  const l = pn(r, i.bind(s), n);
  return o ? bt(o) : rt(), l;
}
function Lr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
function ct(e, t) {
  if (!ee(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), fe(e))) ct(e.value, t);
  else if (N(e)) for (let n = 0; n < e.length; n++) ct(e[n], t);
  else if (or(e) || ut(e))
    e.forEach((n) => {
      ct(n, t);
    });
  else if (fr(e)) for (const n in e) ct(e[n], t);
  return e;
}
function Mo() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Nt(() => {
      e.isMounted = !0;
    }),
    jr(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const ye = [Function, Array],
  So = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: ye,
      onEnter: ye,
      onAfterEnter: ye,
      onEnterCancelled: ye,
      onBeforeLeave: ye,
      onLeave: ye,
      onAfterLeave: ye,
      onLeaveCancelled: ye,
      onBeforeAppear: ye,
      onAppear: ye,
      onAfterAppear: ye,
      onAppearCancelled: ye,
    },
    setup(e, { slots: t }) {
      const n = us(),
        s = Mo();
      let r;
      return () => {
        const i = t.default && Hr(t.default(), !0);
        if (!i || !i.length) return;
        let o = i[0];
        if (i.length > 1) {
          for (const P of i)
            if (P.type !== be) {
              o = P;
              break;
            }
        }
        const l = Y(e),
          { mode: f } = l;
        if (s.isLeaving) return xn(o);
        const a = Os(o);
        if (!a) return xn(o);
        const d = Ln(a, l, s, n);
        Nn(a, d);
        const p = n.subTree,
          y = p && Os(p);
        let O = !1;
        const { getTransitionKey: L } = a.type;
        if (L) {
          const P = L();
          r === void 0 ? (r = P) : P !== r && ((r = P), (O = !0));
        }
        if (y && y.type !== be && (!et(a, y) || O)) {
          const P = Ln(y, l, s, n);
          if ((Nn(y, P), f === "out-in"))
            return (
              (s.isLeaving = !0),
              (P.afterLeave = () => {
                (s.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              xn(o)
            );
          f === "in-out" &&
            a.type !== be &&
            (P.delayLeave = (W, _, E) => {
              const A = $r(s, y);
              (A[String(y.key)] = y),
                (W._leaveCb = () => {
                  _(), (W._leaveCb = void 0), delete d.delayedLeave;
                }),
                (d.delayedLeave = E);
            });
        }
        return o;
      };
    },
  },
  Nr = So;
function $r(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function Ln(e, t, n, s) {
  const {
      appear: r,
      mode: i,
      persisted: o = !1,
      onBeforeEnter: l,
      onEnter: f,
      onAfterEnter: a,
      onEnterCancelled: d,
      onBeforeLeave: p,
      onLeave: y,
      onAfterLeave: O,
      onLeaveCancelled: L,
      onBeforeAppear: P,
      onAppear: W,
      onAfterAppear: _,
      onAppearCancelled: E,
    } = t,
    A = String(e.key),
    H = $r(n, e),
    D = (v, j) => {
      v && xe(v, s, 9, j);
    },
    Z = (v, j) => {
      const B = j[1];
      D(v, j),
        N(v) ? v.every((z) => z.length <= 1) && B() : v.length <= 1 && B();
    },
    V = {
      mode: i,
      persisted: o,
      beforeEnter(v) {
        let j = l;
        if (!n.isMounted)
          if (r) j = P || l;
          else return;
        v._leaveCb && v._leaveCb(!0);
        const B = H[A];
        B && et(e, B) && B.el._leaveCb && B.el._leaveCb(), D(j, [v]);
      },
      enter(v) {
        let j = f,
          B = a,
          z = d;
        if (!n.isMounted)
          if (r) (j = W || f), (B = _ || a), (z = E || d);
          else return;
        let R = !1;
        const K = (v._enterCb = (F) => {
          R ||
            ((R = !0),
            F ? D(z, [v]) : D(B, [v]),
            V.delayedLeave && V.delayedLeave(),
            (v._enterCb = void 0));
        });
        j ? Z(j, [v, K]) : K();
      },
      leave(v, j) {
        const B = String(e.key);
        if ((v._enterCb && v._enterCb(!0), n.isUnmounting)) return j();
        D(p, [v]);
        let z = !1;
        const R = (v._leaveCb = (K) => {
          z ||
            ((z = !0),
            j(),
            K ? D(L, [v]) : D(O, [v]),
            (v._leaveCb = void 0),
            H[B] === e && delete H[B]);
        });
        (H[B] = e), y ? Z(y, [v, R]) : R();
      },
      clone(v) {
        return Ln(v, t, n, s);
      },
    };
  return V;
}
function xn(e) {
  if (gn(e)) return (e = qe(e)), (e.children = null), e;
}
function Os(e) {
  return gn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Nn(e, t) {
  e.shapeFlag & 6 && e.component
    ? Nn(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Hr(e, t = !1, n) {
  let s = [],
    r = 0;
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : i);
    o.type === de
      ? (o.patchFlag & 128 && r++, (s = s.concat(Hr(o.children, t, l))))
      : (t || o.type !== be) && s.push(l != null ? qe(o, { key: l }) : o);
  }
  if (r > 1) for (let i = 0; i < s.length; i++) s[i].patchFlag = -2;
  return s;
}
function Br(e) {
  return U(e) ? { setup: e, name: e.name } : e;
}
const pt = (e) => !!e.type.__asyncLoader,
  gn = (e) => e.type.__isKeepAlive;
function Lo(e, t) {
  Ur(e, "a", t);
}
function No(e, t) {
  Ur(e, "da", t);
}
function Ur(e, t, n = se) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((mn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      gn(r.parent.vnode) && $o(s, t, n, r), (r = r.parent);
  }
}
function $o(e, t, n, s) {
  const r = mn(t, e, s, !0);
  $t(() => {
    Yn(s[t], r);
  }, n);
}
function mn(e, t, n = se, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          yt(), bt(n);
          const l = xe(t, n, e, o);
          return rt(), wt(), l;
        });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const He =
    (e) =>
    (t, n = se) =>
      (!St || e === "sp") && mn(e, (...s) => t(...s), n),
  Ho = He("bm"),
  Nt = He("m"),
  Bo = He("bu"),
  Uo = He("u"),
  jr = He("bum"),
  $t = He("um"),
  jo = He("sp"),
  Do = He("rtg"),
  Ko = He("rtc");
function ko(e, t = se) {
  mn("ec", e, t);
}
function Fe(e, t, n, s) {
  const r = e.dirs,
    i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let f = l.dir[s];
    f && (yt(), xe(f, n, 8, [e.el, l, e, t]), wt());
  }
}
const os = "components";
function Ac(e, t) {
  return Kr(os, e, !0, t) || e;
}
const Dr = Symbol();
function Oc(e) {
  return re(e) ? Kr(os, e, !1) || e : e || Dr;
}
function Kr(e, t, n = !0, s = !1) {
  const r = ue || se;
  if (r) {
    const i = r.type;
    if (e === os) {
      const l = bl(i, !1);
      if (l && (l === t || l === Se(t) || l === cn(Se(t)))) return i;
    }
    const o = Rs(r[e] || i[e], t) || Rs(r.appContext[e], t);
    return !o && s ? i : o;
  }
}
function Rs(e, t) {
  return e && (e[t] || e[Se(t)] || e[cn(Se(t))]);
}
function Rc(e, t, n, s) {
  let r;
  const i = n && n[s];
  if (N(e) || re(e)) {
    r = new Array(e.length);
    for (let o = 0, l = e.length; o < l; o++)
      r[o] = t(e[o], o, void 0, i && i[o]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let o = 0; o < e; o++) r[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (ee(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (o, l) => t(o, l, void 0, i && i[l]));
    else {
      const o = Object.keys(e);
      r = new Array(o.length);
      for (let l = 0, f = o.length; l < f; l++) {
        const a = o[l];
        r[l] = t(e[a], a, l, i && i[l]);
      }
    }
  else r = [];
  return n && (n[s] = r), r;
}
function Ic(e, t, n = {}, s, r) {
  if (ue.isCE || (ue.parent && pt(ue.parent) && ue.parent.isCE))
    return t !== "default" && (n.name = t), oe("slot", n, s && s());
  let i = e[t];
  i && i._c && (i._d = !1), Qr();
  const o = i && kr(i(n)),
    l = ei(
      de,
      { key: n.key || (o && o.key) || `_${t}` },
      o || (s ? s() : []),
      o && e._ === 1 ? 64 : -2,
    );
  return (
    !r && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    i && i._c && (i._d = !0),
    l
  );
}
function kr(e) {
  return e.some((t) =>
    rn(t) ? !(t.type === be || (t.type === de && !kr(t.children))) : !0,
  )
    ? e
    : null;
}
function Pc(e, t) {
  const n = {};
  for (const s in e) n[t && /[A-Z]/.test(s) ? `on:${s}` : Yt(s)] = e[s];
  return n;
}
const $n = (e) => (e ? (ri(e) ? as(e) || e.proxy : $n(e.parent)) : null),
  At = le(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => $n(e.parent),
    $root: (e) => $n(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ls(e),
    $forceUpdate: (e) => e.f || (e.f = () => is(e.update)),
    $nextTick: (e) => e.n || (e.n = Ir.bind(e.proxy)),
    $watch: (e) => Fo.bind(e),
  }),
  En = (e, t) => e !== te && !e.__isScriptSetup && q(e, t),
  Wo = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: i,
        accessCache: o,
        type: l,
        appContext: f,
      } = e;
      let a;
      if (t[0] !== "$") {
        const O = o[t];
        if (O !== void 0)
          switch (O) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (En(s, t)) return (o[t] = 1), s[t];
          if (r !== te && q(r, t)) return (o[t] = 2), r[t];
          if ((a = e.propsOptions[0]) && q(a, t)) return (o[t] = 3), i[t];
          if (n !== te && q(n, t)) return (o[t] = 4), n[t];
          Hn && (o[t] = 0);
        }
      }
      const d = At[t];
      let p, y;
      if (d) return t === "$attrs" && pe(e, "get", t), d(e);
      if ((p = l.__cssModules) && (p = p[t])) return p;
      if (n !== te && q(n, t)) return (o[t] = 4), n[t];
      if (((y = f.config.globalProperties), q(y, t))) return y[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: i } = e;
      return En(r, t)
        ? ((r[t] = n), !0)
        : s !== te && q(s, t)
        ? ((s[t] = n), !0)
        : q(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: i,
        },
      },
      o,
    ) {
      let l;
      return (
        !!n[o] ||
        (e !== te && q(e, o)) ||
        En(t, o) ||
        ((l = i[0]) && q(l, o)) ||
        q(s, o) ||
        q(At, o) ||
        q(r.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : q(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Hn = !0;
function Vo(e) {
  const t = ls(e),
    n = e.proxy,
    s = e.ctx;
  (Hn = !1), t.beforeCreate && Is(t.beforeCreate, e, "bc");
  const {
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: f,
    inject: a,
    created: d,
    beforeMount: p,
    mounted: y,
    beforeUpdate: O,
    updated: L,
    activated: P,
    deactivated: W,
    beforeDestroy: _,
    beforeUnmount: E,
    destroyed: A,
    unmounted: H,
    render: D,
    renderTracked: Z,
    renderTriggered: V,
    errorCaptured: v,
    serverPrefetch: j,
    expose: B,
    inheritAttrs: z,
    components: R,
    directives: K,
    filters: F,
  } = t;
  if ((a && qo(a, s, null, e.appContext.config.unwrapInjectedRef), o))
    for (const ne in o) {
      const Q = o[ne];
      U(Q) && (s[ne] = Q.bind(n));
    }
  if (r) {
    const ne = r.call(n, n);
    ee(ne) && (e.data = un(ne));
  }
  if (((Hn = !0), i))
    for (const ne in i) {
      const Q = i[ne],
        ze = U(Q) ? Q.bind(n, n) : U(Q.get) ? Q.get.bind(n, n) : Re,
        Ht = !U(Q) && U(Q.set) ? Q.set.bind(n) : Re,
        Ye = Te({ get: ze, set: Ht });
      Object.defineProperty(s, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ye.value,
        set: (Ie) => (Ye.value = Ie),
      });
    }
  if (l) for (const ne in l) Wr(l[ne], s, n, ne);
  if (f) {
    const ne = U(f) ? f.call(n) : f;
    Reflect.ownKeys(ne).forEach((Q) => {
      Ro(Q, ne[Q]);
    });
  }
  d && Is(d, e, "c");
  function J(ne, Q) {
    N(Q) ? Q.forEach((ze) => ne(ze.bind(n))) : Q && ne(Q.bind(n));
  }
  if (
    (J(Ho, p),
    J(Nt, y),
    J(Bo, O),
    J(Uo, L),
    J(Lo, P),
    J(No, W),
    J(ko, v),
    J(Ko, Z),
    J(Do, V),
    J(jr, E),
    J($t, H),
    J(jo, j),
    N(B))
  )
    if (B.length) {
      const ne = e.exposed || (e.exposed = {});
      B.forEach((Q) => {
        Object.defineProperty(ne, Q, {
          get: () => n[Q],
          set: (ze) => (n[Q] = ze),
        });
      });
    } else e.exposed || (e.exposed = {});
  D && e.render === Re && (e.render = D),
    z != null && (e.inheritAttrs = z),
    R && (e.components = R),
    K && (e.directives = K);
}
function qo(e, t, n = Re, s = !1) {
  N(e) && (e = Bn(e));
  for (const r in e) {
    const i = e[r];
    let o;
    ee(i)
      ? "default" in i
        ? (o = ht(i.from || r, i.default, !0))
        : (o = ht(i.from || r))
      : (o = ht(i)),
      fe(o) && s
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (l) => (o.value = l),
          })
        : (t[r] = o);
  }
}
function Is(e, t, n) {
  xe(N(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Wr(e, t, n, s) {
  const r = s.includes(".") ? Lr(n, s) : () => n[s];
  if (re(e)) {
    const i = t[e];
    U(i) && Jt(r, i);
  } else if (U(e)) Jt(r, e.bind(n));
  else if (ee(e))
    if (N(e)) e.forEach((i) => Wr(i, t, n, s));
    else {
      const i = U(e.handler) ? e.handler.bind(n) : t[e.handler];
      U(i) && Jt(r, i, e);
    }
}
function ls(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: i,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    l = i.get(t);
  let f;
  return (
    l
      ? (f = l)
      : !r.length && !n && !s
      ? (f = t)
      : ((f = {}), r.length && r.forEach((a) => nn(f, a, o, !0)), nn(f, t, o)),
    ee(t) && i.set(t, f),
    f
  );
}
function nn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && nn(e, i, n, !0), r && r.forEach((o) => nn(e, o, n, !0));
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = zo[o] || (n && n[o]);
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const zo = {
  data: Ps,
  props: Qe,
  emits: Qe,
  methods: Qe,
  computed: Qe,
  beforeCreate: ae,
  created: ae,
  beforeMount: ae,
  mounted: ae,
  beforeUpdate: ae,
  updated: ae,
  beforeDestroy: ae,
  beforeUnmount: ae,
  destroyed: ae,
  unmounted: ae,
  activated: ae,
  deactivated: ae,
  errorCaptured: ae,
  serverPrefetch: ae,
  components: Qe,
  directives: Qe,
  watch: Jo,
  provide: Ps,
  inject: Yo,
};
function Ps(e, t) {
  return t
    ? e
      ? function () {
          return le(
            U(e) ? e.call(this, this) : e,
            U(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function Yo(e, t) {
  return Qe(Bn(e), Bn(t));
}
function Bn(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ae(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Qe(e, t) {
  return e ? le(le(Object.create(null), e), t) : t;
}
function Jo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = le(Object.create(null), e);
  for (const s in t) n[s] = ae(e[s], t[s]);
  return n;
}
function Xo(e, t, n, s = !1) {
  const r = {},
    i = {};
  Qt(i, _n, 1), (e.propsDefaults = Object.create(null)), Vr(e, t, r, i);
  for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
  n ? (e.props = s ? r : co(r)) : e.type.props ? (e.props = r) : (e.props = i),
    (e.attrs = i);
}
function Zo(e, t, n, s) {
  const {
      props: r,
      attrs: i,
      vnode: { patchFlag: o },
    } = e,
    l = Y(r),
    [f] = e.propsOptions;
  let a = !1;
  if ((s || o > 0) && !(o & 16)) {
    if (o & 8) {
      const d = e.vnode.dynamicProps;
      for (let p = 0; p < d.length; p++) {
        let y = d[p];
        if (dn(e.emitsOptions, y)) continue;
        const O = t[y];
        if (f)
          if (q(i, y)) O !== i[y] && ((i[y] = O), (a = !0));
          else {
            const L = Se(y);
            r[L] = Un(f, l, L, O, e, !1);
          }
        else O !== i[y] && ((i[y] = O), (a = !0));
      }
    }
  } else {
    Vr(e, t, r, i) && (a = !0);
    let d;
    for (const p in l)
      (!t || (!q(t, p) && ((d = it(p)) === p || !q(t, d)))) &&
        (f
          ? n &&
            (n[p] !== void 0 || n[d] !== void 0) &&
            (r[p] = Un(f, l, p, void 0, e, !0))
          : delete r[p]);
    if (i !== l) for (const p in i) (!t || !q(t, p)) && (delete i[p], (a = !0));
  }
  a && $e(e, "set", "$attrs");
}
function Vr(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1,
    l;
  if (t)
    for (let f in t) {
      if (Tt(f)) continue;
      const a = t[f];
      let d;
      r && q(r, (d = Se(f)))
        ? !i || !i.includes(d)
          ? (n[d] = a)
          : ((l || (l = {}))[d] = a)
        : dn(e.emitsOptions, f) ||
          ((!(f in s) || a !== s[f]) && ((s[f] = a), (o = !0)));
    }
  if (i) {
    const f = Y(n),
      a = l || te;
    for (let d = 0; d < i.length; d++) {
      const p = i[d];
      n[p] = Un(r, f, p, a[p], e, !q(a, p));
    }
  }
  return o;
}
function Un(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = q(o, "default");
    if (l && s === void 0) {
      const f = o.default;
      if (o.type !== Function && U(f)) {
        const { propsDefaults: a } = r;
        n in a ? (s = a[n]) : (bt(r), (s = a[n] = f.call(null, t)), rt());
      } else s = f;
    }
    o[0] &&
      (i && !l ? (s = !1) : o[1] && (s === "" || s === it(n)) && (s = !0));
  }
  return s;
}
function qr(e, t, n = !1) {
  const s = t.propsCache,
    r = s.get(e);
  if (r) return r;
  const i = e.props,
    o = {},
    l = [];
  let f = !1;
  if (!U(e)) {
    const d = (p) => {
      f = !0;
      const [y, O] = qr(p, t, !0);
      le(o, y), O && l.push(...O);
    };
    !n && t.mixins.length && t.mixins.forEach(d),
      e.extends && d(e.extends),
      e.mixins && e.mixins.forEach(d);
  }
  if (!i && !f) return ee(e) && s.set(e, ft), ft;
  if (N(i))
    for (let d = 0; d < i.length; d++) {
      const p = Se(i[d]);
      Fs(p) && (o[p] = te);
    }
  else if (i)
    for (const d in i) {
      const p = Se(d);
      if (Fs(p)) {
        const y = i[d],
          O = (o[p] = N(y) || U(y) ? { type: y } : Object.assign({}, y));
        if (O) {
          const L = Ls(Boolean, O.type),
            P = Ls(String, O.type);
          (O[0] = L > -1),
            (O[1] = P < 0 || L < P),
            (L > -1 || q(O, "default")) && l.push(p);
        }
      }
    }
  const a = [o, l];
  return ee(e) && s.set(e, a), a;
}
function Fs(e) {
  return e[0] !== "$";
}
function Ms(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function Ss(e, t) {
  return Ms(e) === Ms(t);
}
function Ls(e, t) {
  return N(t) ? t.findIndex((n) => Ss(n, e)) : U(t) && Ss(t, e) ? 0 : -1;
}
const zr = (e) => e[0] === "_" || e === "$stable",
  cs = (e) => (N(e) ? e.map(ve) : [ve(e)]),
  Qo = (e, t, n) => {
    if (t._n) return t;
    const s = xo((...r) => cs(t(...r)), n);
    return (s._c = !1), s;
  },
  Yr = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (zr(r)) continue;
      const i = e[r];
      if (U(i)) t[r] = Qo(r, i, s);
      else if (i != null) {
        const o = cs(i);
        t[r] = () => o;
      }
    }
  },
  Jr = (e, t) => {
    const n = cs(t);
    e.slots.default = () => n;
  },
  Go = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = Y(t)), Qt(t, "_", n)) : Yr(t, (e.slots = {}));
    } else (e.slots = {}), t && Jr(e, t);
    Qt(e.slots, _n, 1);
  },
  el = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let i = !0,
      o = te;
    if (s.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (i = !1)
          : (le(r, t), !n && l === 1 && delete r._)
        : ((i = !t.$stable), Yr(t, r)),
        (o = t);
    } else t && (Jr(e, t), (o = { default: 1 }));
    if (i) for (const l in r) !zr(l) && !(l in o) && delete r[l];
  };
function Xr() {
  return {
    app: null,
    config: {
      isNativeTag: Ti,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let tl = 0;
function nl(e, t) {
  return function (s, r = null) {
    U(s) || (s = Object.assign({}, s)), r != null && !ee(r) && (r = null);
    const i = Xr(),
      o = new Set();
    let l = !1;
    const f = (i.app = {
      _uid: tl++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: El,
      get config() {
        return i.config;
      },
      set config(a) {},
      use(a, ...d) {
        return (
          o.has(a) ||
            (a && U(a.install)
              ? (o.add(a), a.install(f, ...d))
              : U(a) && (o.add(a), a(f, ...d))),
          f
        );
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), f;
      },
      component(a, d) {
        return d ? ((i.components[a] = d), f) : i.components[a];
      },
      directive(a, d) {
        return d ? ((i.directives[a] = d), f) : i.directives[a];
      },
      mount(a, d, p) {
        if (!l) {
          const y = oe(s, r);
          return (
            (y.appContext = i),
            d && t ? t(y, a) : e(y, a, p),
            (l = !0),
            (f._container = a),
            (a.__vue_app__ = f),
            as(y.component) || y.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, d) {
        return (i.provides[a] = d), f;
      },
    });
    return f;
  };
}
function sn(e, t, n, s, r = !1) {
  if (N(e)) {
    e.forEach((y, O) => sn(y, t && (N(t) ? t[O] : t), n, s, r));
    return;
  }
  if (pt(s) && !r) return;
  const i = s.shapeFlag & 4 ? as(s.component) || s.component.proxy : s.el,
    o = r ? null : i,
    { i: l, r: f } = e,
    a = t && t.r,
    d = l.refs === te ? (l.refs = {}) : l.refs,
    p = l.setupState;
  if (
    (a != null &&
      a !== f &&
      (re(a)
        ? ((d[a] = null), q(p, a) && (p[a] = null))
        : fe(a) && (a.value = null)),
    U(f))
  )
    We(f, l, 12, [o, d]);
  else {
    const y = re(f),
      O = fe(f);
    if (y || O) {
      const L = () => {
        if (e.f) {
          const P = y ? (q(p, f) ? p[f] : d[f]) : f.value;
          r
            ? N(P) && Yn(P, i)
            : N(P)
            ? P.includes(i) || P.push(i)
            : y
            ? ((d[f] = [i]), q(p, f) && (p[f] = d[f]))
            : ((f.value = [i]), e.k && (d[e.k] = f.value));
        } else
          y
            ? ((d[f] = o), q(p, f) && (p[f] = o))
            : O && ((f.value = o), e.k && (d[e.k] = o));
      };
      o ? ((L.id = -1), he(L, n)) : L();
    }
  }
}
let Ue = !1;
const Vt = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  qt = (e) => e.nodeType === 8;
function sl(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: s,
        createText: r,
        nextSibling: i,
        parentNode: o,
        remove: l,
        insert: f,
        createComment: a,
      },
    } = e,
    d = (_, E) => {
      if (!E.hasChildNodes()) {
        n(null, _, E), en(), (E._vnode = _);
        return;
      }
      (Ue = !1),
        p(E.firstChild, _, null, null, null),
        en(),
        (E._vnode = _),
        Ue && console.error("Hydration completed but contains mismatches.");
    },
    p = (_, E, A, H, D, Z = !1) => {
      const V = qt(_) && _.data === "[",
        v = () => P(_, E, A, H, D, V),
        { type: j, ref: B, shapeFlag: z, patchFlag: R } = E;
      let K = _.nodeType;
      (E.el = _), R === -2 && ((Z = !1), (E.dynamicChildren = null));
      let F = null;
      switch (j) {
        case _t:
          K !== 3
            ? E.children === ""
              ? (f((E.el = r("")), o(_), _), (F = _))
              : (F = v())
            : (_.data !== E.children && ((Ue = !0), (_.data = E.children)),
              (F = i(_)));
          break;
        case be:
          K !== 8 || V ? (F = v()) : (F = i(_));
          break;
        case gt:
          if ((V && ((_ = i(_)), (K = _.nodeType)), K === 1 || K === 3)) {
            F = _;
            const ge = !E.children.length;
            for (let J = 0; J < E.staticCount; J++)
              ge && (E.children += F.nodeType === 1 ? F.outerHTML : F.data),
                J === E.staticCount - 1 && (E.anchor = F),
                (F = i(F));
            return V ? i(F) : F;
          } else v();
          break;
        case de:
          V ? (F = L(_, E, A, H, D, Z)) : (F = v());
          break;
        default:
          if (z & 1)
            K !== 1 || E.type.toLowerCase() !== _.tagName.toLowerCase()
              ? (F = v())
              : (F = y(_, E, A, H, D, Z));
          else if (z & 6) {
            E.slotScopeIds = D;
            const ge = o(_);
            if (
              (t(E, ge, null, A, H, Vt(ge), Z),
              (F = V ? W(_) : i(_)),
              F && qt(F) && F.data === "teleport end" && (F = i(F)),
              pt(E))
            ) {
              let J;
              V
                ? ((J = oe(de)),
                  (J.anchor = F ? F.previousSibling : ge.lastChild))
                : (J = _.nodeType === 3 ? si("") : oe("div")),
                (J.el = _),
                (E.component.subTree = J);
            }
          } else
            z & 64
              ? K !== 8
                ? (F = v())
                : (F = E.type.hydrate(_, E, A, H, D, Z, e, O))
              : z & 128 &&
                (F = E.type.hydrate(_, E, A, H, Vt(o(_)), D, Z, e, p));
      }
      return B != null && sn(B, null, H, E), F;
    },
    y = (_, E, A, H, D, Z) => {
      Z = Z || !!E.dynamicChildren;
      const { type: V, props: v, patchFlag: j, shapeFlag: B, dirs: z } = E,
        R = (V === "input" && z) || V === "option";
      if (R || j !== -1) {
        if ((z && Fe(E, null, A, "created"), v))
          if (R || !Z || j & 48)
            for (const F in v)
              ((R && F.endsWith("value")) || (Lt(F) && !Tt(F))) &&
                s(_, F, null, v[F], !1, void 0, A);
          else v.onClick && s(_, "onClick", null, v.onClick, !1, void 0, A);
        let K;
        if (
          ((K = v && v.onVnodeBeforeMount) && we(K, A, E),
          z && Fe(E, null, A, "beforeMount"),
          ((K = v && v.onVnodeMounted) || z) &&
            Sr(() => {
              K && we(K, A, E), z && Fe(E, null, A, "mounted");
            }, H),
          B & 16 && !(v && (v.innerHTML || v.textContent)))
        ) {
          let F = O(_.firstChild, E, _, A, H, D, Z);
          for (; F; ) {
            Ue = !0;
            const ge = F;
            (F = F.nextSibling), l(ge);
          }
        } else
          B & 8 &&
            _.textContent !== E.children &&
            ((Ue = !0), (_.textContent = E.children));
      }
      return _.nextSibling;
    },
    O = (_, E, A, H, D, Z, V) => {
      V = V || !!E.dynamicChildren;
      const v = E.children,
        j = v.length;
      for (let B = 0; B < j; B++) {
        const z = V ? v[B] : (v[B] = ve(v[B]));
        if (_) _ = p(_, z, H, D, Z, V);
        else {
          if (z.type === _t && !z.children) continue;
          (Ue = !0), n(null, z, A, null, H, D, Vt(A), Z);
        }
      }
      return _;
    },
    L = (_, E, A, H, D, Z) => {
      const { slotScopeIds: V } = E;
      V && (D = D ? D.concat(V) : V);
      const v = o(_),
        j = O(i(_), E, v, A, H, D, Z);
      return j && qt(j) && j.data === "]"
        ? i((E.anchor = j))
        : ((Ue = !0), f((E.anchor = a("]")), v, j), j);
    },
    P = (_, E, A, H, D, Z) => {
      if (((Ue = !0), (E.el = null), Z)) {
        const j = W(_);
        for (;;) {
          const B = i(_);
          if (B && B !== j) l(B);
          else break;
        }
      }
      const V = i(_),
        v = o(_);
      return l(_), n(null, E, v, V, A, H, Vt(v), D), V;
    },
    W = (_) => {
      let E = 0;
      for (; _; )
        if (
          ((_ = i(_)), _ && qt(_) && (_.data === "[" && E++, _.data === "]"))
        ) {
          if (E === 0) return i(_);
          E--;
        }
      return _;
    };
  return [d, p];
}
const he = Sr;
function rl(e) {
  return il(e, sl);
}
function il(e, t) {
  const n = Mi();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: i,
      createElement: o,
      createText: l,
      createComment: f,
      setText: a,
      setElementText: d,
      parentNode: p,
      nextSibling: y,
      setScopeId: O = Re,
      insertStaticContent: L,
    } = e,
    P = (
      c,
      u,
      h,
      m = null,
      g = null,
      C = null,
      T = !1,
      w = null,
      x = !!u.dynamicChildren,
    ) => {
      if (c === u) return;
      c && !et(c, u) && ((m = Bt(c)), Ie(c, g, C, !0), (c = null)),
        u.patchFlag === -2 && ((x = !1), (u.dynamicChildren = null));
      const { type: b, ref: M, shapeFlag: I } = u;
      switch (b) {
        case _t:
          W(c, u, h, m);
          break;
        case be:
          _(c, u, h, m);
          break;
        case gt:
          c == null && E(u, h, m, T);
          break;
        case de:
          R(c, u, h, m, g, C, T, w, x);
          break;
        default:
          I & 1
            ? D(c, u, h, m, g, C, T, w, x)
            : I & 6
            ? K(c, u, h, m, g, C, T, w, x)
            : (I & 64 || I & 128) && b.process(c, u, h, m, g, C, T, w, x, ot);
      }
      M != null && g && sn(M, c && c.ref, C, u || c, !u);
    },
    W = (c, u, h, m) => {
      if (c == null) s((u.el = l(u.children)), h, m);
      else {
        const g = (u.el = c.el);
        u.children !== c.children && a(g, u.children);
      }
    },
    _ = (c, u, h, m) => {
      c == null ? s((u.el = f(u.children || "")), h, m) : (u.el = c.el);
    },
    E = (c, u, h, m) => {
      [c.el, c.anchor] = L(c.children, u, h, m, c.el, c.anchor);
    },
    A = ({ el: c, anchor: u }, h, m) => {
      let g;
      for (; c && c !== u; ) (g = y(c)), s(c, h, m), (c = g);
      s(u, h, m);
    },
    H = ({ el: c, anchor: u }) => {
      let h;
      for (; c && c !== u; ) (h = y(c)), r(c), (c = h);
      r(u);
    },
    D = (c, u, h, m, g, C, T, w, x) => {
      (T = T || u.type === "svg"),
        c == null ? Z(u, h, m, g, C, T, w, x) : j(c, u, g, C, T, w, x);
    },
    Z = (c, u, h, m, g, C, T, w) => {
      let x, b;
      const { type: M, props: I, shapeFlag: S, transition: $, dirs: k } = c;
      if (
        ((x = c.el = o(c.type, C, I && I.is, I)),
        S & 8
          ? d(x, c.children)
          : S & 16 &&
            v(c.children, x, null, m, g, C && M !== "foreignObject", T, w),
        k && Fe(c, null, m, "created"),
        V(x, c, c.scopeId, T, m),
        I)
      ) {
        for (const X in I)
          X !== "value" &&
            !Tt(X) &&
            i(x, X, null, I[X], C, c.children, m, g, Le);
        "value" in I && i(x, "value", null, I.value),
          (b = I.onVnodeBeforeMount) && we(b, m, c);
      }
      k && Fe(c, null, m, "beforeMount");
      const G = (!g || (g && !g.pendingBranch)) && $ && !$.persisted;
      G && $.beforeEnter(x),
        s(x, u, h),
        ((b = I && I.onVnodeMounted) || G || k) &&
          he(() => {
            b && we(b, m, c), G && $.enter(x), k && Fe(c, null, m, "mounted");
          }, g);
    },
    V = (c, u, h, m, g) => {
      if ((h && O(c, h), m)) for (let C = 0; C < m.length; C++) O(c, m[C]);
      if (g) {
        let C = g.subTree;
        if (u === C) {
          const T = g.vnode;
          V(c, T, T.scopeId, T.slotScopeIds, g.parent);
        }
      }
    },
    v = (c, u, h, m, g, C, T, w, x = 0) => {
      for (let b = x; b < c.length; b++) {
        const M = (c[b] = w ? Ke(c[b]) : ve(c[b]));
        P(null, M, u, h, m, g, C, T, w);
      }
    },
    j = (c, u, h, m, g, C, T) => {
      const w = (u.el = c.el);
      let { patchFlag: x, dynamicChildren: b, dirs: M } = u;
      x |= c.patchFlag & 16;
      const I = c.props || te,
        S = u.props || te;
      let $;
      h && Je(h, !1),
        ($ = S.onVnodeBeforeUpdate) && we($, h, u, c),
        M && Fe(u, c, h, "beforeUpdate"),
        h && Je(h, !0);
      const k = g && u.type !== "foreignObject";
      if (
        (b
          ? B(c.dynamicChildren, b, w, h, m, k, C)
          : T || Q(c, u, w, null, h, m, k, C, !1),
        x > 0)
      ) {
        if (x & 16) z(w, u, I, S, h, m, g);
        else if (
          (x & 2 && I.class !== S.class && i(w, "class", null, S.class, g),
          x & 4 && i(w, "style", I.style, S.style, g),
          x & 8)
        ) {
          const G = u.dynamicProps;
          for (let X = 0; X < G.length; X++) {
            const ie = G[X],
              Ee = I[ie],
              lt = S[ie];
            (lt !== Ee || ie === "value") &&
              i(w, ie, Ee, lt, g, c.children, h, m, Le);
          }
        }
        x & 1 && c.children !== u.children && d(w, u.children);
      } else !T && b == null && z(w, u, I, S, h, m, g);
      (($ = S.onVnodeUpdated) || M) &&
        he(() => {
          $ && we($, h, u, c), M && Fe(u, c, h, "updated");
        }, m);
    },
    B = (c, u, h, m, g, C, T) => {
      for (let w = 0; w < u.length; w++) {
        const x = c[w],
          b = u[w],
          M =
            x.el && (x.type === de || !et(x, b) || x.shapeFlag & 70)
              ? p(x.el)
              : h;
        P(x, b, M, null, m, g, C, T, !0);
      }
    },
    z = (c, u, h, m, g, C, T) => {
      if (h !== m) {
        if (h !== te)
          for (const w in h)
            !Tt(w) && !(w in m) && i(c, w, h[w], null, T, u.children, g, C, Le);
        for (const w in m) {
          if (Tt(w)) continue;
          const x = m[w],
            b = h[w];
          x !== b && w !== "value" && i(c, w, b, x, T, u.children, g, C, Le);
        }
        "value" in m && i(c, "value", h.value, m.value);
      }
    },
    R = (c, u, h, m, g, C, T, w, x) => {
      const b = (u.el = c ? c.el : l("")),
        M = (u.anchor = c ? c.anchor : l(""));
      let { patchFlag: I, dynamicChildren: S, slotScopeIds: $ } = u;
      $ && (w = w ? w.concat($) : $),
        c == null
          ? (s(b, h, m), s(M, h, m), v(u.children, h, M, g, C, T, w, x))
          : I > 0 && I & 64 && S && c.dynamicChildren
          ? (B(c.dynamicChildren, S, h, g, C, T, w),
            (u.key != null || (g && u === g.subTree)) && Zr(c, u, !0))
          : Q(c, u, h, M, g, C, T, w, x);
    },
    K = (c, u, h, m, g, C, T, w, x) => {
      (u.slotScopeIds = w),
        c == null
          ? u.shapeFlag & 512
            ? g.ctx.activate(u, h, m, T, x)
            : F(u, h, m, g, C, T, x)
          : ge(c, u, x);
    },
    F = (c, u, h, m, g, C, T) => {
      const w = (c.component = pl(c, m, g));
      if ((gn(c) && (w.ctx.renderer = ot), gl(w), w.asyncDep)) {
        if ((g && g.registerDep(w, J), !c.el)) {
          const x = (w.subTree = oe(be));
          _(null, x, u, h);
        }
        return;
      }
      J(w, c, u, h, g, C, T);
    },
    ge = (c, u, h) => {
      const m = (u.component = c.component);
      if (vo(c, u, h))
        if (m.asyncDep && !m.asyncResolved) {
          ne(m, u, h);
          return;
        } else (m.next = u), bo(m.update), m.update();
      else (u.el = c.el), (m.vnode = u);
    },
    J = (c, u, h, m, g, C, T) => {
      const w = () => {
          if (c.isMounted) {
            let { next: M, bu: I, u: S, parent: $, vnode: k } = c,
              G = M,
              X;
            Je(c, !1),
              M ? ((M.el = k.el), ne(c, M, T)) : (M = k),
              I && wn(I),
              (X = M.props && M.props.onVnodeBeforeUpdate) && we(X, $, M, k),
              Je(c, !0);
            const ie = Cn(c),
              Ee = c.subTree;
            (c.subTree = ie),
              P(Ee, ie, p(Ee.el), Bt(Ee), c, g, C),
              (M.el = ie.el),
              G === null && Ao(c, ie.el),
              S && he(S, g),
              (X = M.props && M.props.onVnodeUpdated) &&
                he(() => we(X, $, M, k), g);
          } else {
            let M;
            const { el: I, props: S } = u,
              { bm: $, m: k, parent: G } = c,
              X = pt(u);
            if (
              (Je(c, !1),
              $ && wn($),
              !X && (M = S && S.onVnodeBeforeMount) && we(M, G, u),
              Je(c, !0),
              I && yn)
            ) {
              const ie = () => {
                (c.subTree = Cn(c)), yn(I, c.subTree, c, g, null);
              };
              X
                ? u.type.__asyncLoader().then(() => !c.isUnmounted && ie())
                : ie();
            } else {
              const ie = (c.subTree = Cn(c));
              P(null, ie, h, m, c, g, C), (u.el = ie.el);
            }
            if ((k && he(k, g), !X && (M = S && S.onVnodeMounted))) {
              const ie = u;
              he(() => we(M, G, ie), g);
            }
            (u.shapeFlag & 256 ||
              (G && pt(G.vnode) && G.vnode.shapeFlag & 256)) &&
              c.a &&
              he(c.a, g),
              (c.isMounted = !0),
              (u = h = m = null);
          }
        },
        x = (c.effect = new Qn(w, () => is(b), c.scope)),
        b = (c.update = () => x.run());
      (b.id = c.uid), Je(c, !0), b();
    },
    ne = (c, u, h) => {
      u.component = c;
      const m = c.vnode.props;
      (c.vnode = u),
        (c.next = null),
        Zo(c, u.props, m, h),
        el(c, u.children, h),
        yt(),
        vs(),
        wt();
    },
    Q = (c, u, h, m, g, C, T, w, x = !1) => {
      const b = c && c.children,
        M = c ? c.shapeFlag : 0,
        I = u.children,
        { patchFlag: S, shapeFlag: $ } = u;
      if (S > 0) {
        if (S & 128) {
          Ht(b, I, h, m, g, C, T, w, x);
          return;
        } else if (S & 256) {
          ze(b, I, h, m, g, C, T, w, x);
          return;
        }
      }
      $ & 8
        ? (M & 16 && Le(b, g, C), I !== b && d(h, I))
        : M & 16
        ? $ & 16
          ? Ht(b, I, h, m, g, C, T, w, x)
          : Le(b, g, C, !0)
        : (M & 8 && d(h, ""), $ & 16 && v(I, h, m, g, C, T, w, x));
    },
    ze = (c, u, h, m, g, C, T, w, x) => {
      (c = c || ft), (u = u || ft);
      const b = c.length,
        M = u.length,
        I = Math.min(b, M);
      let S;
      for (S = 0; S < I; S++) {
        const $ = (u[S] = x ? Ke(u[S]) : ve(u[S]));
        P(c[S], $, h, null, g, C, T, w, x);
      }
      b > M ? Le(c, g, C, !0, !1, I) : v(u, h, m, g, C, T, w, x, I);
    },
    Ht = (c, u, h, m, g, C, T, w, x) => {
      let b = 0;
      const M = u.length;
      let I = c.length - 1,
        S = M - 1;
      for (; b <= I && b <= S; ) {
        const $ = c[b],
          k = (u[b] = x ? Ke(u[b]) : ve(u[b]));
        if (et($, k)) P($, k, h, null, g, C, T, w, x);
        else break;
        b++;
      }
      for (; b <= I && b <= S; ) {
        const $ = c[I],
          k = (u[S] = x ? Ke(u[S]) : ve(u[S]));
        if (et($, k)) P($, k, h, null, g, C, T, w, x);
        else break;
        I--, S--;
      }
      if (b > I) {
        if (b <= S) {
          const $ = S + 1,
            k = $ < M ? u[$].el : m;
          for (; b <= S; )
            P(null, (u[b] = x ? Ke(u[b]) : ve(u[b])), h, k, g, C, T, w, x), b++;
        }
      } else if (b > S) for (; b <= I; ) Ie(c[b], g, C, !0), b++;
      else {
        const $ = b,
          k = b,
          G = new Map();
        for (b = k; b <= S; b++) {
          const me = (u[b] = x ? Ke(u[b]) : ve(u[b]));
          me.key != null && G.set(me.key, b);
        }
        let X,
          ie = 0;
        const Ee = S - k + 1;
        let lt = !1,
          ps = 0;
        const Ct = new Array(Ee);
        for (b = 0; b < Ee; b++) Ct[b] = 0;
        for (b = $; b <= I; b++) {
          const me = c[b];
          if (ie >= Ee) {
            Ie(me, g, C, !0);
            continue;
          }
          let Pe;
          if (me.key != null) Pe = G.get(me.key);
          else
            for (X = k; X <= S; X++)
              if (Ct[X - k] === 0 && et(me, u[X])) {
                Pe = X;
                break;
              }
          Pe === void 0
            ? Ie(me, g, C, !0)
            : ((Ct[Pe - k] = b + 1),
              Pe >= ps ? (ps = Pe) : (lt = !0),
              P(me, u[Pe], h, null, g, C, T, w, x),
              ie++);
        }
        const gs = lt ? ol(Ct) : ft;
        for (X = gs.length - 1, b = Ee - 1; b >= 0; b--) {
          const me = k + b,
            Pe = u[me],
            ms = me + 1 < M ? u[me + 1].el : m;
          Ct[b] === 0
            ? P(null, Pe, h, ms, g, C, T, w, x)
            : lt && (X < 0 || b !== gs[X] ? Ye(Pe, h, ms, 2) : X--);
        }
      }
    },
    Ye = (c, u, h, m, g = null) => {
      const { el: C, type: T, transition: w, children: x, shapeFlag: b } = c;
      if (b & 6) {
        Ye(c.component.subTree, u, h, m);
        return;
      }
      if (b & 128) {
        c.suspense.move(u, h, m);
        return;
      }
      if (b & 64) {
        T.move(c, u, h, ot);
        return;
      }
      if (T === de) {
        s(C, u, h);
        for (let I = 0; I < x.length; I++) Ye(x[I], u, h, m);
        s(c.anchor, u, h);
        return;
      }
      if (T === gt) {
        A(c, u, h);
        return;
      }
      if (m !== 2 && b & 1 && w)
        if (m === 0) w.beforeEnter(C), s(C, u, h), he(() => w.enter(C), g);
        else {
          const { leave: I, delayLeave: S, afterLeave: $ } = w,
            k = () => s(C, u, h),
            G = () => {
              I(C, () => {
                k(), $ && $();
              });
            };
          S ? S(C, k, G) : G();
        }
      else s(C, u, h);
    },
    Ie = (c, u, h, m = !1, g = !1) => {
      const {
        type: C,
        props: T,
        ref: w,
        children: x,
        dynamicChildren: b,
        shapeFlag: M,
        patchFlag: I,
        dirs: S,
      } = c;
      if ((w != null && sn(w, null, h, c, !0), M & 256)) {
        u.ctx.deactivate(c);
        return;
      }
      const $ = M & 1 && S,
        k = !pt(c);
      let G;
      if ((k && (G = T && T.onVnodeBeforeUnmount) && we(G, u, c), M & 6))
        _i(c.component, h, m);
      else {
        if (M & 128) {
          c.suspense.unmount(h, m);
          return;
        }
        $ && Fe(c, null, u, "beforeUnmount"),
          M & 64
            ? c.type.remove(c, u, h, g, ot, m)
            : b && (C !== de || (I > 0 && I & 64))
            ? Le(b, u, h, !1, !0)
            : ((C === de && I & 384) || (!g && M & 16)) && Le(x, u, h),
          m && ds(c);
      }
      ((k && (G = T && T.onVnodeUnmounted)) || $) &&
        he(() => {
          G && we(G, u, c), $ && Fe(c, null, u, "unmounted");
        }, h);
    },
    ds = (c) => {
      const { type: u, el: h, anchor: m, transition: g } = c;
      if (u === de) {
        mi(h, m);
        return;
      }
      if (u === gt) {
        H(c);
        return;
      }
      const C = () => {
        r(h), g && !g.persisted && g.afterLeave && g.afterLeave();
      };
      if (c.shapeFlag & 1 && g && !g.persisted) {
        const { leave: T, delayLeave: w } = g,
          x = () => T(h, C);
        w ? w(c.el, C, x) : x();
      } else C();
    },
    mi = (c, u) => {
      let h;
      for (; c !== u; ) (h = y(c)), r(c), (c = h);
      r(u);
    },
    _i = (c, u, h) => {
      const { bum: m, scope: g, update: C, subTree: T, um: w } = c;
      m && wn(m),
        g.stop(),
        C && ((C.active = !1), Ie(T, c, u, h)),
        w && he(w, u),
        he(() => {
          c.isUnmounted = !0;
        }, u),
        u &&
          u.pendingBranch &&
          !u.isUnmounted &&
          c.asyncDep &&
          !c.asyncResolved &&
          c.suspenseId === u.pendingId &&
          (u.deps--, u.deps === 0 && u.resolve());
    },
    Le = (c, u, h, m = !1, g = !1, C = 0) => {
      for (let T = C; T < c.length; T++) Ie(c[T], u, h, m, g);
    },
    Bt = (c) =>
      c.shapeFlag & 6
        ? Bt(c.component.subTree)
        : c.shapeFlag & 128
        ? c.suspense.next()
        : y(c.anchor || c.el),
    hs = (c, u, h) => {
      c == null
        ? u._vnode && Ie(u._vnode, null, null, !0)
        : P(u._vnode || null, c, u, null, null, null, h),
        vs(),
        en(),
        (u._vnode = c);
    },
    ot = {
      p: P,
      um: Ie,
      m: Ye,
      r: ds,
      mt: F,
      mc: v,
      pc: Q,
      pbc: B,
      n: Bt,
      o: e,
    };
  let bn, yn;
  return (
    t && ([bn, yn] = t(ot)), { render: hs, hydrate: bn, createApp: nl(hs, bn) }
  );
}
function Je({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Zr(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (N(s) && N(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[i] = Ke(r[i])), (l.el = o.el)),
        n || Zr(o, l)),
        l.type === _t && (l.el = o.el);
    }
}
function ol(e) {
  const t = e.slice(),
    n = [0];
  let s, r, i, o, l;
  const f = e.length;
  for (s = 0; s < f; s++) {
    const a = e[s];
    if (a !== 0) {
      if (((r = n[n.length - 1]), e[r] < a)) {
        (t[s] = r), n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        (l = (i + o) >> 1), e[n[l]] < a ? (i = l + 1) : (o = l);
      a < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s));
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; ) (n[i] = o), (o = t[o]);
  return n;
}
const ll = (e) => e.__isTeleport,
  de = Symbol(void 0),
  _t = Symbol(void 0),
  be = Symbol(void 0),
  gt = Symbol(void 0),
  Ot = [];
let Oe = null;
function Qr(e = !1) {
  Ot.push((Oe = e ? null : []));
}
function cl() {
  Ot.pop(), (Oe = Ot[Ot.length - 1] || null);
}
let Mt = 1;
function Ns(e) {
  Mt += e;
}
function Gr(e) {
  return (
    (e.dynamicChildren = Mt > 0 ? Oe || ft : null),
    cl(),
    Mt > 0 && Oe && Oe.push(e),
    e
  );
}
function Fc(e, t, n, s, r, i) {
  return Gr(ni(e, t, n, s, r, i, !0));
}
function ei(e, t, n, s, r) {
  return Gr(oe(e, t, n, s, r, !0));
}
function rn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function et(e, t) {
  return e.type === t.type && e.key === t.key;
}
const _n = "__vInternal",
  ti = ({ key: e }) => e ?? null,
  Xt = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? re(e) || fe(e) || U(e)
        ? { i: ue, r: e, k: t, f: !!n }
        : e
      : null;
function ni(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  i = e === de ? 0 : 1,
  o = !1,
  l = !1,
) {
  const f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ti(t),
    ref: t && Xt(t),
    scopeId: hn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ue,
  };
  return (
    l
      ? (fs(f, n), i & 128 && e.normalize(f))
      : n && (f.shapeFlag |= re(n) ? 8 : 16),
    Mt > 0 &&
      !o &&
      Oe &&
      (f.patchFlag > 0 || i & 6) &&
      f.patchFlag !== 32 &&
      Oe.push(f),
    f
  );
}
const oe = fl;
function fl(e, t = null, n = null, s = 0, r = null, i = !1) {
  if (((!e || e === Dr) && (e = be), rn(e))) {
    const l = qe(e, t, !0);
    return (
      n && fs(l, n),
      Mt > 0 &&
        !i &&
        Oe &&
        (l.shapeFlag & 6 ? (Oe[Oe.indexOf(e)] = l) : Oe.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((yl(e) && (e = e.__vccOpts), t)) {
    t = ul(t);
    let { class: l, style: f } = t;
    l && !re(l) && (t.class = qn(l)),
      ee(f) && (Cr(f) && !N(f) && (f = le({}, f)), (t.style = Vn(f)));
  }
  const o = re(e) ? 1 : Oo(e) ? 128 : ll(e) ? 64 : ee(e) ? 4 : U(e) ? 2 : 0;
  return ni(e, t, n, s, r, o, i, !0);
}
function ul(e) {
  return e ? (Cr(e) || _n in e ? le({}, e) : e) : null;
}
function qe(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: i, children: o } = e,
    l = t ? al(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && ti(l),
    ref:
      t && t.ref ? (n && r ? (N(r) ? r.concat(Xt(t)) : [r, Xt(t)]) : Xt(t)) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== de ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && qe(e.ssContent),
    ssFallback: e.ssFallback && qe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function si(e = " ", t = 0) {
  return oe(_t, null, e, t);
}
function Mc(e, t) {
  const n = oe(gt, null, e);
  return (n.staticCount = t), n;
}
function Sc(e = "", t = !1) {
  return t ? (Qr(), ei(be, null, e)) : oe(be, null, e);
}
function ve(e) {
  return e == null || typeof e == "boolean"
    ? oe(be)
    : N(e)
    ? oe(de, null, e.slice())
    : typeof e == "object"
    ? Ke(e)
    : oe(_t, null, String(e));
}
function Ke(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : qe(e);
}
function fs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (N(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), fs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(_n in t)
        ? (t._ctx = ue)
        : r === 3 &&
          ue &&
          (ue.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    U(t)
      ? ((t = { default: t, _ctx: ue }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [si(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function al(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = qn([t.class, s.class]));
      else if (r === "style") t.style = Vn([t.style, s.style]);
      else if (Lt(r)) {
        const i = t[r],
          o = s[r];
        o &&
          i !== o &&
          !(N(i) && i.includes(o)) &&
          (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function we(e, t, n, s = null) {
  xe(e, t, 7, [n, s]);
}
const dl = Xr();
let hl = 0;
function pl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || dl,
    i = {
      uid: hl++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Si(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: qr(s, r),
      emitsOptions: Mr(s, r),
      emit: null,
      emitted: null,
      propsDefaults: te,
      inheritAttrs: s.inheritAttrs,
      ctx: te,
      data: te,
      props: te,
      attrs: te,
      slots: te,
      refs: te,
      setupState: te,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = Co.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let se = null;
const us = () => se || ue,
  bt = (e) => {
    (se = e), e.scope.on();
  },
  rt = () => {
    se && se.scope.off(), (se = null);
  };
function ri(e) {
  return e.vnode.shapeFlag & 4;
}
let St = !1;
function gl(e, t = !1) {
  St = t;
  const { props: n, children: s } = e.vnode,
    r = ri(e);
  Xo(e, n, r, t), Go(e, s);
  const i = r ? ml(e, t) : void 0;
  return (St = !1), i;
}
function ml(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = vt(new Proxy(e.ctx, Wo)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? oi(e) : null);
    bt(e), yt();
    const i = We(s, e, 0, [e.props, r]);
    if ((wt(), rt(), lr(i))) {
      if ((i.then(rt, rt), t))
        return i
          .then((o) => {
            $s(e, o, t);
          })
          .catch((o) => {
            an(o, e, 0);
          });
      e.asyncDep = i;
    } else $s(e, i, t);
  } else ii(e, t);
}
function $s(e, t, n) {
  U(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ee(t) && (e.setupState = Ar(t)),
    ii(e, n);
}
let Hs;
function ii(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Hs && !s.render) {
      const r = s.template || ls(e).template;
      if (r) {
        const { isCustomElement: i, compilerOptions: o } = e.appContext.config,
          { delimiters: l, compilerOptions: f } = s,
          a = le(le({ isCustomElement: i, delimiters: l }, o), f);
        s.render = Hs(r, a);
      }
    }
    e.render = s.render || Re;
  }
  bt(e), yt(), Vo(e), wt(), rt();
}
function _l(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return pe(e, "get", "$attrs"), t[n];
    },
  });
}
function oi(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = _l(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function as(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Ar(vt(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in At) return At[n](e);
        },
        has(t, n) {
          return n in t || n in At;
        },
      }))
    );
}
function bl(e, t = !0) {
  return U(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function yl(e) {
  return U(e) && "__vccOpts" in e;
}
const Te = (e, t) => go(e, t, St);
function Lc() {
  return wl().slots;
}
function wl() {
  const e = us();
  return e.setupContext || (e.setupContext = oi(e));
}
function jn(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? ee(t) && !N(t)
      ? rn(t)
        ? oe(e, null, [t])
        : oe(e, t)
      : oe(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && rn(n) && (n = [n]),
      oe(e, t, n));
}
const Cl = Symbol(""),
  xl = () => ht(Cl),
  El = "3.2.47",
  Tl = "http://www.w3.org/2000/svg",
  tt = typeof document < "u" ? document : null,
  Bs = tt && tt.createElement("template"),
  vl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r = t
        ? tt.createElementNS(Tl, e)
        : tt.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => tt.createTextNode(e),
    createComment: (e) => tt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => tt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, i) {
      const o = n ? n.previousSibling : t.lastChild;
      if (r && (r === i || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === i || !(r = r.nextSibling));

        );
      else {
        Bs.innerHTML = s ? `<svg>${e}</svg>` : e;
        const l = Bs.content;
        if (s) {
          const f = l.firstChild;
          for (; f.firstChild; ) l.appendChild(f.firstChild);
          l.removeChild(f);
        }
        t.insertBefore(l, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function Al(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function Ol(e, t, n) {
  const s = e.style,
    r = re(n);
  if (n && !r) {
    if (t && !re(t)) for (const i in t) n[i] == null && Dn(s, i, "");
    for (const i in n) Dn(s, i, n[i]);
  } else {
    const i = s.display;
    r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (s.display = i);
  }
}
const Us = /\s*!important$/;
function Dn(e, t, n) {
  if (N(n)) n.forEach((s) => Dn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Rl(e, t);
    Us.test(n)
      ? e.setProperty(it(s), n.replace(Us, ""), "important")
      : (e[s] = n);
  }
}
const js = ["Webkit", "Moz", "ms"],
  Tn = {};
function Rl(e, t) {
  const n = Tn[t];
  if (n) return n;
  let s = Se(t);
  if (s !== "filter" && s in e) return (Tn[t] = s);
  s = cn(s);
  for (let r = 0; r < js.length; r++) {
    const i = js[r] + s;
    if (i in e) return (Tn[t] = i);
  }
  return t;
}
const Ds = "http://www.w3.org/1999/xlink";
function Il(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ds, t.slice(6, t.length))
      : e.setAttributeNS(Ds, t, n);
  else {
    const i = Ei(t);
    n == null || (i && !rr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n);
  }
}
function Pl(e, t, n, s, r, i, o) {
  if (t === "innerHTML" || t === "textContent") {
    s && o(s, r, i), (e[t] = n ?? "");
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const f = n ?? "";
    (e.value !== f || e.tagName === "OPTION") && (e.value = f),
      n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const f = typeof e[t];
    f === "boolean"
      ? (n = rr(n))
      : n == null && f === "string"
      ? ((n = ""), (l = !0))
      : f === "number" && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function Fl(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Ml(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function Sl(e, t, n, s, r = null) {
  const i = e._vei || (e._vei = {}),
    o = i[t];
  if (s && o) o.value = s;
  else {
    const [l, f] = Ll(t);
    if (s) {
      const a = (i[t] = Hl(s, r));
      Fl(e, l, a, f);
    } else o && (Ml(e, l, o, f), (i[t] = void 0));
  }
}
const Ks = /(?:Once|Passive|Capture)$/;
function Ll(e) {
  let t;
  if (Ks.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Ks)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : it(e.slice(2)), t];
}
let vn = 0;
const Nl = Promise.resolve(),
  $l = () => vn || (Nl.then(() => (vn = 0)), (vn = Date.now()));
function Hl(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    xe(Bl(s, n.value), t, 5, [s]);
  };
  return (n.value = e), (n.attached = $l()), n;
}
function Bl(e, t) {
  if (N(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const ks = /^on[a-z]/,
  Ul = (e, t, n, s, r = !1, i, o, l, f) => {
    t === "class"
      ? Al(e, s, r)
      : t === "style"
      ? Ol(e, n, s)
      : Lt(t)
      ? zn(t) || Sl(e, t, n, s, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : jl(e, t, s, r)
        )
      ? Pl(e, t, s, i, o, l, f)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Il(e, t, s, r));
  };
function jl(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && ks.test(t) && U(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (ks.test(t) && re(n))
    ? !1
    : t in e;
}
function Nc(e) {
  const t = us();
  if (!t) return;
  const n = (t.ut = (r = e(t.proxy)) => {
      Array.from(
        document.querySelectorAll(`[data-v-owner="${t.uid}"]`),
      ).forEach((i) => kn(i, r));
    }),
    s = () => {
      const r = e(t.proxy);
      Kn(t.subTree, r), n(r);
    };
  Po(s),
    Nt(() => {
      const r = new MutationObserver(s);
      r.observe(t.subTree.el.parentNode, { childList: !0 }),
        $t(() => r.disconnect());
    });
}
function Kn(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          Kn(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) kn(e.el, t);
  else if (e.type === de) e.children.forEach((n) => Kn(n, t));
  else if (e.type === gt) {
    let { el: n, anchor: s } = e;
    for (; n && (kn(n, t), n !== s); ) n = n.nextSibling;
  }
}
function kn(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const s in t) n.setProperty(`--${s}`, t[s]);
  }
}
const je = "transition",
  xt = "animation",
  li = (e, { slots: t }) => jn(Nr, Dl(e), t);
li.displayName = "Transition";
const ci = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
li.props = le({}, Nr.props, ci);
const Xe = (e, t = []) => {
    N(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Ws = (e) => (e ? (N(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Dl(e) {
  const t = {};
  for (const R in e) R in ci || (t[R] = e[R]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: s,
      duration: r,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: o = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: f = i,
      appearActiveClass: a = o,
      appearToClass: d = l,
      leaveFromClass: p = `${n}-leave-from`,
      leaveActiveClass: y = `${n}-leave-active`,
      leaveToClass: O = `${n}-leave-to`,
    } = e,
    L = Kl(r),
    P = L && L[0],
    W = L && L[1],
    {
      onBeforeEnter: _,
      onEnter: E,
      onEnterCancelled: A,
      onLeave: H,
      onLeaveCancelled: D,
      onBeforeAppear: Z = _,
      onAppear: V = E,
      onAppearCancelled: v = A,
    } = t,
    j = (R, K, F) => {
      Ze(R, K ? d : l), Ze(R, K ? a : o), F && F();
    },
    B = (R, K) => {
      (R._isLeaving = !1), Ze(R, p), Ze(R, O), Ze(R, y), K && K();
    },
    z = (R) => (K, F) => {
      const ge = R ? V : E,
        J = () => j(K, R, F);
      Xe(ge, [K, J]),
        Vs(() => {
          Ze(K, R ? f : i), De(K, R ? d : l), Ws(ge) || qs(K, s, P, J);
        });
    };
  return le(t, {
    onBeforeEnter(R) {
      Xe(_, [R]), De(R, i), De(R, o);
    },
    onBeforeAppear(R) {
      Xe(Z, [R]), De(R, f), De(R, a);
    },
    onEnter: z(!1),
    onAppear: z(!0),
    onLeave(R, K) {
      R._isLeaving = !0;
      const F = () => B(R, K);
      De(R, p),
        Vl(),
        De(R, y),
        Vs(() => {
          R._isLeaving && (Ze(R, p), De(R, O), Ws(H) || qs(R, s, W, F));
        }),
        Xe(H, [R, F]);
    },
    onEnterCancelled(R) {
      j(R, !1), Xe(A, [R]);
    },
    onAppearCancelled(R) {
      j(R, !0), Xe(v, [R]);
    },
    onLeaveCancelled(R) {
      B(R), Xe(D, [R]);
    },
  });
}
function Kl(e) {
  if (e == null) return null;
  if (ee(e)) return [An(e.enter), An(e.leave)];
  {
    const t = An(e);
    return [t, t];
  }
}
function An(e) {
  return Fi(e);
}
function De(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function Ze(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Vs(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let kl = 0;
function qs(e, t, n, s) {
  const r = (e._endId = ++kl),
    i = () => {
      r === e._endId && s();
    };
  if (n) return setTimeout(i, n);
  const { type: o, timeout: l, propCount: f } = Wl(e, t);
  if (!o) return s();
  const a = o + "end";
  let d = 0;
  const p = () => {
      e.removeEventListener(a, y), i();
    },
    y = (O) => {
      O.target === e && ++d >= f && p();
    };
  setTimeout(() => {
    d < f && p();
  }, l + 1),
    e.addEventListener(a, y);
}
function Wl(e, t) {
  const n = window.getComputedStyle(e),
    s = (L) => (n[L] || "").split(", "),
    r = s(`${je}Delay`),
    i = s(`${je}Duration`),
    o = zs(r, i),
    l = s(`${xt}Delay`),
    f = s(`${xt}Duration`),
    a = zs(l, f);
  let d = null,
    p = 0,
    y = 0;
  t === je
    ? o > 0 && ((d = je), (p = o), (y = i.length))
    : t === xt
    ? a > 0 && ((d = xt), (p = a), (y = f.length))
    : ((p = Math.max(o, a)),
      (d = p > 0 ? (o > a ? je : xt) : null),
      (y = d ? (d === je ? i.length : f.length) : 0));
  const O =
    d === je && /\b(transform|all)(,|$)/.test(s(`${je}Property`).toString());
  return { type: d, timeout: p, propCount: y, hasTransform: O };
}
function zs(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, s) => Ys(n) + Ys(e[s])));
}
function Ys(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Vl() {
  return document.body.offsetHeight;
}
const ql = ["ctrl", "shift", "alt", "meta"],
  zl = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => ql.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  $c =
    (e, t) =>
    (n, ...s) => {
      for (let r = 0; r < t.length; r++) {
        const i = zl[t[r]];
        if (i && i(n, t)) return;
      }
      return e(n, ...s);
    },
  Yl = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Hc = (e, t) => (n) => {
    if (!("key" in n)) return;
    const s = it(n.key);
    if (t.some((r) => r === s || Yl[r] === s)) return e(n);
  },
  Jl = le({ patchProp: Ul }, vl);
let On,
  Js = !1;
function Xl() {
  return (On = Js ? On : rl(Jl)), (Js = !0), On;
}
const Bc = (...e) => {
  const t = Xl().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Zl(s);
      if (r) return n(r, !0, r instanceof SVGElement);
    }),
    t
  );
};
function Zl(e) {
  return re(e) ? document.querySelector(e) : e;
}
const Uc = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  Ql = "modulepreload",
  Gl = function (e) {
    return "/nw-builder/" + e;
  },
  Xs = {},
  jc = function (t, n, s) {
    if (!n || n.length === 0) return t();
    const r = document.getElementsByTagName("link");
    return Promise.all(
      n.map((i) => {
        if (((i = Gl(i)), i in Xs)) return;
        Xs[i] = !0;
        const o = i.endsWith(".css"),
          l = o ? '[rel="stylesheet"]' : "";
        if (!!s)
          for (let d = r.length - 1; d >= 0; d--) {
            const p = r[d];
            if (p.href === i && (!o || p.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${i}"]${l}`)) return;
        const a = document.createElement("link");
        if (
          ((a.rel = o ? "stylesheet" : Ql),
          o || ((a.as = "script"), (a.crossOrigin = "")),
          (a.href = i),
          document.head.appendChild(a),
          o)
        )
          return new Promise((d, p) => {
            a.addEventListener("load", d),
              a.addEventListener("error", () =>
                p(new Error(`Unable to preload CSS for ${i}`)),
              );
          });
      }),
    ).then(() => t());
  },
  ec = window.__VP_SITE_DATA__,
  fi = /^[a-z]+:/i,
  Dc = /^pathname:\/\//,
  Kc = "vitepress-theme-appearance",
  ui = /#.*$/,
  tc = /(index)?\.(md|html)$/,
  Ce = typeof document < "u",
  ai = {
    relativePath: "",
    title: "404",
    description: "Not Found",
    headers: [],
    frontmatter: { sidebar: !1, layout: "page" },
    lastUpdated: 0,
    isNotFound: !0,
  };
function nc(e, t, n = !1) {
  if (t === void 0) return !1;
  if (((e = Zs(`/${e}`)), n)) return new RegExp(t).test(e);
  if (Zs(t) !== e) return !1;
  const s = t.match(ui);
  return s ? (Ce ? location.hash : "") === s[0] : !0;
}
function Zs(e) {
  return decodeURI(e).replace(ui, "").replace(tc, "");
}
function sc(e) {
  return fi.test(e);
}
function rc(e, t) {
  var s, r, i, o, l, f, a;
  const n =
    Object.keys(e.locales).find(
      (d) => d !== "root" && !sc(d) && nc(t, `/${d}/`, !0),
    ) || "root";
  return Object.assign({}, e, {
    localeIndex: n,
    lang: ((s = e.locales[n]) == null ? void 0 : s.lang) ?? e.lang,
    dir: ((r = e.locales[n]) == null ? void 0 : r.dir) ?? e.dir,
    title: ((i = e.locales[n]) == null ? void 0 : i.title) ?? e.title,
    titleTemplate:
      ((o = e.locales[n]) == null ? void 0 : o.titleTemplate) ??
      e.titleTemplate,
    description:
      ((l = e.locales[n]) == null ? void 0 : l.description) ?? e.description,
    head: hi(e.head, ((f = e.locales[n]) == null ? void 0 : f.head) ?? []),
    themeConfig: {
      ...e.themeConfig,
      ...((a = e.locales[n]) == null ? void 0 : a.themeConfig),
    },
  });
}
function di(e, t) {
  const n = t.title || e.title,
    s = t.titleTemplate ?? e.titleTemplate;
  if (typeof s == "string" && s.includes(":title"))
    return s.replace(/:title/g, n);
  const r = ic(e.title, s);
  return `${n}${r}`;
}
function ic(e, t) {
  return t === !1
    ? ""
    : t === !0 || t === void 0
    ? ` | ${e}`
    : e === t
    ? ""
    : ` | ${t}`;
}
function oc(e, t) {
  const [n, s] = t;
  if (n !== "meta") return !1;
  const r = Object.entries(s)[0];
  return r == null ? !1 : e.some(([i, o]) => i === n && o[r[0]] === r[1]);
}
function hi(e, t) {
  return [...e.filter((n) => !oc(t, n)), ...t];
}
const lc = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  cc = /^[a-z]:/i;
function Qs(e) {
  const t = cc.exec(e),
    n = t ? t[0] : "";
  return (
    n +
    e
      .slice(n.length)
      .replace(lc, "_")
      .replace(/(^|\/)_+(?=[^/]*$)/, "$1")
  );
}
const fc = Symbol(),
  nt = fo(ec);
function kc(e) {
  const t = Te(() => rc(nt.value, e.data.relativePath));
  return {
    site: t,
    theme: Te(() => t.value.themeConfig),
    page: Te(() => e.data),
    frontmatter: Te(() => e.data.frontmatter),
    params: Te(() => e.data.params),
    lang: Te(() => t.value.lang),
    dir: Te(() => t.value.dir),
    localeIndex: Te(() => t.value.localeIndex || "root"),
    title: Te(() => di(t.value, e.data)),
    description: Te(() => e.data.description || t.value.description),
    isDark: Tr(!1),
  };
}
function Wc() {
  const e = ht(fc);
  if (!e) throw new Error("vitepress data not properly injected in app");
  return e;
}
function uc(e, t) {
  return `${e}${t}`.replace(/\/+/g, "/");
}
function Gs(e) {
  return fi.test(e) || e.startsWith(".") ? e : uc(nt.value.base, e);
}
function ac(e) {
  let t = e.replace(/\.html$/, "");
  if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, "/index")), Ce)) {
    const n = "/nw-builder/";
    t = Qs(t.slice(n.length).replace(/\//g, "_") || "index") + ".md";
    let s = __VP_HASH_MAP__[t.toLowerCase()];
    s ||
      ((t = t.endsWith("_index.md")
        ? t.slice(0, -9) + ".md"
        : t.slice(0, -3) + "_index.md"),
      (s = __VP_HASH_MAP__[t.toLowerCase()])),
      (t = `${n}assets/${t}.${s}.js`);
  } else t = `./${Qs(t.slice(1).replace(/\//g, "_"))}.md.js`;
  return t;
}
let Zt = [];
function Vc(e) {
  Zt.push(e),
    $t(() => {
      Zt = Zt.filter((t) => t !== e);
    });
}
const dc = Symbol(),
  er = "http://a.com",
  hc = () => ({ path: "/", component: null, data: ai });
function qc(e, t) {
  const n = un(hc()),
    s = { route: n, go: r };
  async function r(l = Ce ? location.href : "/") {
    var a, d;
    await ((a = s.onBeforeRouteChange) == null ? void 0 : a.call(s, l));
    const f = new URL(l, er);
    nt.value.cleanUrls ||
      (!f.pathname.endsWith("/") &&
        !f.pathname.endsWith(".html") &&
        ((f.pathname += ".html"), (l = f.pathname + f.search + f.hash))),
      Ce &&
        l !== location.href &&
        (history.replaceState(
          { scrollPosition: window.scrollY },
          document.title,
        ),
        history.pushState(null, "", l)),
      await o(l),
      await ((d = s.onAfterRouteChanged) == null ? void 0 : d.call(s, l));
  }
  let i = null;
  async function o(l, f = 0, a = !1) {
    const d = new URL(l, er),
      p = (i = d.pathname);
    try {
      let y = await e(p);
      if (i === p) {
        i = null;
        const { default: O, __pageData: L } = y;
        if (!O) throw new Error(`Invalid route component: ${O}`);
        (n.path = Ce ? p : Gs(p)),
          (n.component = vt(O)),
          (n.data = vt(L)),
          Ce &&
            Ir(() => {
              let P =
                nt.value.base +
                L.relativePath.replace(/(?:(^|\/)index)?\.md$/, "$1");
              if (
                (!nt.value.cleanUrls && !P.endsWith("/") && (P += ".html"),
                P !== d.pathname &&
                  ((d.pathname = P),
                  (l = P + d.search + d.hash),
                  history.replaceState(null, "", l)),
                d.hash && !f)
              ) {
                let W = null;
                try {
                  W = document.querySelector(decodeURIComponent(d.hash));
                } catch (_) {
                  console.warn(_);
                }
                if (W) {
                  tr(W, d.hash);
                  return;
                }
              }
              window.scrollTo(0, f);
            });
      }
    } catch (y) {
      if (
        (!/fetch/.test(y.message) &&
          !/^\/404(\.html|\/)?$/.test(l) &&
          console.error(y),
        !a)
      )
        try {
          const O = await fetch(nt.value.base + "hashmap.json");
          (window.__VP_HASH_MAP__ = await O.json()), await o(l, f, !0);
          return;
        } catch {}
      i === p &&
        ((i = null),
        (n.path = Ce ? p : Gs(p)),
        (n.component = t ? vt(t) : null),
        (n.data = ai));
    }
  }
  return (
    Ce &&
      (window.addEventListener(
        "click",
        (l) => {
          if (l.target.closest("button")) return;
          const a = l.target.closest("a");
          if (
            a &&
            !a.closest(".vp-raw") &&
            (a instanceof SVGElement || !a.download)
          ) {
            const { target: d } = a,
              {
                href: p,
                origin: y,
                pathname: O,
                hash: L,
                search: P,
              } = new URL(
                a.href instanceof SVGAnimatedString ? a.href.animVal : a.href,
                a.baseURI,
              ),
              W = window.location,
              _ = O.match(/\.\w+$/);
            !l.ctrlKey &&
              !l.shiftKey &&
              !l.altKey &&
              !l.metaKey &&
              d !== "_blank" &&
              y === W.origin &&
              !(_ && _[0] !== ".html") &&
              (l.preventDefault(),
              O === W.pathname && P === W.search
                ? L &&
                  L !== W.hash &&
                  (history.pushState(null, "", L),
                  window.dispatchEvent(new Event("hashchange")),
                  tr(a, L, a.classList.contains("header-anchor")))
                : r(p));
          }
        },
        { capture: !0 },
      ),
      window.addEventListener("popstate", (l) => {
        o(location.href, (l.state && l.state.scrollPosition) || 0);
      }),
      window.addEventListener("hashchange", (l) => {
        l.preventDefault();
      })),
    s
  );
}
function pc() {
  const e = ht(dc);
  if (!e) throw new Error("useRouter() is called without provider.");
  return e;
}
function pi() {
  return pc().route;
}
function tr(e, t, n = !1) {
  let s = null;
  try {
    s = e.classList.contains("header-anchor")
      ? e
      : document.querySelector(decodeURIComponent(t));
  } catch (r) {
    console.warn(r);
  }
  if (s) {
    const r = nt.value.scrollOffset;
    let i = 0;
    if (typeof r == "number") i = r;
    else if (typeof r == "string") i = nr(r);
    else if (Array.isArray(r))
      for (const f of r) {
        const a = nr(f);
        if (a) {
          i = a;
          break;
        }
      }
    const o = parseInt(window.getComputedStyle(s).paddingTop, 10),
      l = window.scrollY + s.getBoundingClientRect().top - i + o;
    !n || Math.abs(l - window.scrollY) > window.innerHeight
      ? window.scrollTo(0, l)
      : window.scrollTo({ left: 0, top: l, behavior: "smooth" });
  }
}
function nr(e) {
  const t = document.querySelector(e);
  if (!t) return 0;
  const n = t.getBoundingClientRect().bottom;
  return n < 0 ? 0 : n + 24;
}
const sr = () => Zt.forEach((e) => e()),
  zc = Br({
    name: "VitePressContent",
    props: { as: { type: [Object, String], default: "div" } },
    setup(e) {
      const t = pi();
      return () =>
        jn(e.as, { style: { position: "relative" } }, [
          t.component
            ? jn(t.component, { onVnodeMounted: sr, onVnodeUpdated: sr })
            : "404 Page Not Found",
        ]);
    },
  });
function Yc(e, t) {
  let n = [],
    s = !0;
  const r = (i) => {
    if (s) {
      s = !1;
      return;
    }
    n.forEach((o) => document.head.removeChild(o)),
      (n = []),
      i.forEach((o) => {
        const l = gc(o);
        document.head.appendChild(l), n.push(l);
      });
  };
  Io(() => {
    const i = e.data,
      o = t.value,
      l = i && i.description,
      f = (i && i.frontmatter.head) || [];
    (document.title = di(o, i)),
      document
        .querySelector("meta[name=description]")
        .setAttribute("content", l || o.description),
      r(hi(o.head, _c(f)));
  });
}
function gc([e, t, n]) {
  const s = document.createElement(e);
  for (const r in t) s.setAttribute(r, t[r]);
  return n && (s.innerHTML = n), s;
}
function mc(e) {
  return e[0] === "meta" && e[1] && e[1].name === "description";
}
function _c(e) {
  return e.filter((t) => !mc(t));
}
const Rn = new Set(),
  gi = () => document.createElement("link"),
  bc = (e) => {
    const t = gi();
    (t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
  },
  yc = (e) => {
    const t = new XMLHttpRequest();
    t.open("GET", e, (t.withCredentials = !0)), t.send();
  };
let zt;
const wc =
  Ce &&
  (zt = gi()) &&
  zt.relList &&
  zt.relList.supports &&
  zt.relList.supports("prefetch")
    ? bc
    : yc;
function Jc() {
  if (!Ce || !window.IntersectionObserver) return;
  let e;
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return;
  const t = window.requestIdleCallback || setTimeout;
  let n = null;
  const s = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((i) => {
        i.forEach((o) => {
          if (o.isIntersecting) {
            const l = o.target;
            n.unobserve(l);
            const { pathname: f } = l;
            if (!Rn.has(f)) {
              Rn.add(f);
              const a = ac(f);
              wc(a);
            }
          }
        });
      })),
      t(() => {
        document.querySelectorAll("#app a").forEach((i) => {
          const { target: o } = i,
            { hostname: l, pathname: f } = new URL(
              i.href instanceof SVGAnimatedString ? i.href.animVal : i.href,
              i.baseURI,
            ),
            a = f.match(/\.\w+$/);
          (a && a[0] !== ".html") ||
            (o !== "_blank" &&
              l === location.hostname &&
              (f !== location.pathname ? n.observe(i) : Rn.add(f)));
        });
      });
  };
  Nt(s);
  const r = pi();
  Jt(() => r.path, s),
    $t(() => {
      n && n.disconnect();
    });
}
const Xc = Br({
  setup(e, { slots: t }) {
    const n = Tr(!1);
    return (
      Nt(() => {
        n.value = !0;
      }),
      () => (n.value && t.default ? t.default() : null)
    );
  },
});
function Zc() {
  if (Ce) {
    const e = new Map();
    window.addEventListener("click", (t) => {
      var s;
      const n = t.target;
      if (n.matches('div[class*="language-"] > button.copy')) {
        const r = n.parentElement,
          i =
            (s = n.nextElementSibling) == null ? void 0 : s.nextElementSibling;
        if (!r || !i) return;
        const o = /language-(shellscript|shell|bash|sh|zsh)/.test(r.className);
        let l = "";
        i.querySelectorAll("span.line:not(.diff.remove)").forEach(
          (f) =>
            (l +=
              (f.textContent || "") +
              `
`),
        ),
          (l = l.slice(0, -1)),
          o && (l = l.replace(/^ *(\$|>) /gm, "").trim()),
          Cc(l).then(() => {
            n.classList.add("copied"), clearTimeout(e.get(n));
            const f = setTimeout(() => {
              n.classList.remove("copied"), n.blur(), e.delete(n);
            }, 2e3);
            e.set(n, f);
          });
      }
    });
  }
}
async function Cc(e) {
  try {
    return navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea"),
      n = document.activeElement;
    (t.value = e),
      t.setAttribute("readonly", ""),
      (t.style.contain = "strict"),
      (t.style.position = "absolute"),
      (t.style.left = "-9999px"),
      (t.style.fontSize = "12pt");
    const s = document.getSelection(),
      r = s ? s.rangeCount > 0 && s.getRangeAt(0) : null;
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand("copy"),
      document.body.removeChild(t),
      r && (s.removeAllRanges(), s.addRange(r)),
      n && n.focus();
  }
}
function Qc() {
  Ce &&
    window.addEventListener("click", (e) => {
      var n, s;
      const t = e.target;
      if (t.matches(".vp-code-group input")) {
        const r = (n = t.parentElement) == null ? void 0 : n.parentElement,
          i = Array.from(
            (r == null ? void 0 : r.querySelectorAll("input")) || [],
          ).indexOf(t),
          o =
            r == null
              ? void 0
              : r.querySelector('div[class*="language-"].active'),
          l =
            (s =
              r == null
                ? void 0
                : r.querySelectorAll(
                    'div[class*="language-"]:not(.language-id)',
                  )) == null
              ? void 0
              : s[i];
        o &&
          l &&
          o !== l &&
          (o.classList.remove("active"), l.classList.add("active"));
      }
    });
}
export {
  fo as $,
  Sc as A,
  al as B,
  oe as C,
  Ac as D,
  Nc as E,
  de as F,
  Oc as G,
  fi as H,
  Ce as I,
  wr as J,
  Rc as K,
  Tc as L,
  vc as M,
  Mc as N,
  Kc as O,
  Dc as P,
  ht as Q,
  Ro as R,
  Uo as S,
  li as T,
  Vc as U,
  Vn as V,
  Hc as W,
  Pc as X,
  Po as Y,
  $c as Z,
  Uc as _,
  si as a,
  Lc as a0,
  Yc as a1,
  Jc as a2,
  Zc as a3,
  Qc as a4,
  jn as a5,
  dc as a6,
  kc as a7,
  fc as a8,
  zc as a9,
  Xc as aa,
  nt as ab,
  Bc as ac,
  qc as ad,
  ac as ae,
  jc as af,
  ao as b,
  Fc as c,
  Br as d,
  Te as e,
  Tr as f,
  us as g,
  Nt as h,
  Ir as i,
  Ni as j,
  Ec as k,
  Io as l,
  sc as m,
  qn as n,
  Qr as o,
  Gs as p,
  nc as q,
  Ic as r,
  pi as s,
  xc as t,
  Wc as u,
  $t as v,
  Jt as w,
  ni as x,
  ei as y,
  xo as z,
};
