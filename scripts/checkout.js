var Razorpay = (function () {
  var e = function (e, n) {
      var t = { tags: n };
      switch (!0) {
        case !e:
          t.message = "NA";
          break;
        case "string" == typeof e:
          t.message = e;
          break;
        case "object" == typeof e:
          var r = e.name,
            a = e.message,
            i = e.stack,
            o = e.fileName,
            u = e.lineNumber,
            c = e.columnNumber;
          t = window.Object.assign(JSON.parse(JSON.stringify(e)), {
            name: r,
            message: a,
            stack: i,
            fileName: o,
            lineNumber: u,
            columnNumber: c,
            tags: n,
          });
          break;
        default:
          t.message = JSON.stringify(e);
      }
      return t;
    },
    n = "S0",
    t = "S1",
    r = !1;
  function a(e, n) {
    return [
      {
        name: "checkout.sessionErrored.metrics",
        labels: [{ type: e, severity: n }],
      },
    ];
  }
  var i = function (i, o) {
      var u,
        l,
        d,
        m,
        f = o.analytics,
        p = o.severity,
        h = void 0 === p ? t : p,
        v = o.unhandled,
        _ = void 0 !== v && v;
      try {
        var y = f || {},
          g = y.event,
          b = y.data,
          w = y.immediately,
          k = void 0 === w || w,
          E = "string" == typeof g ? g : "js_error";
        try {
          if ((h === n || h === t) && !r) {
            var S = { metrics: a("session_errored", h) };
            s({
              url: "https://lumberjack-metrics.razorpay.com/v1/frontend-metrics",
              data: {
                key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
                data: window.encodeURIComponent(
                  window.btoa(
                    window.unescape(
                      window.encodeURIComponent(JSON.stringify(S))
                    )
                  )
                ),
              },
            });
            var A = JSON.stringify({
              data: { data: { sessionErrored: !0 } },
              topic: "syncAvailability",
              source: "__razorpay",
              time: window.Date.now(),
            });
            window.postMessage(A, "*"), (r = !0);
          }
        } catch (e) {}
        (u = E),
          (l = {
            data: window.Object.assign({}, "object" == typeof b ? b : {}, {
              error: e(i, { severity: h, unhandled: _ }),
            }),
            immediately: window.Boolean(k),
            isError: !0,
          }),
          (d = (void 0 === l ? {} : l).data),
          (m = {
            event: u,
            properties: {
              data: void 0 === d ? {} : d,
              build_number: 3460140111,
            },
            timestamp: window.Date.now(),
          }),
          c.push(m);
      } catch (e) {}
    },
    o = [
      "https://checkout.razorpay.com",
      "https://checkout-static.razorpay.com",
    ];
  function u(e) {
    var n,
      t = e.error;
    if (
      t &&
      (e.filename || t.stack) &&
      ((n = e.filename || e.error.stack),
      o.some(function (e) {
        return -1 !== n.indexOf(e);
      }))
    ) {
      var r = {
        message: t.message,
        lineNumber: e.lineno,
        fileName: e.filename,
        columnNumber: e.colno,
        stack: t.stack,
      };
      i(t, { unhandled: !0, analytics: { event: "js_error", data: r } });
    }
  }
  var c = [];
  function s(e) {
    try {
      var n = "sendBeacon" in window.navigator,
        t = !1;
      n && (t = window.navigator.sendBeacon(e.url, JSON.stringify(e.data))),
        t || fetch(e.url, { method: "POST", body: JSON.stringify(e.data) });
    } catch (e) {}
  }
  window.setInterval(function () {
    !(function () {
      if (c.length) {
        var e = {
          context: {
            platform: window.CheckoutBridge ? "mobile_sdk" : "browser",
          },
          addons: [
            {
              name: "ua_parser",
              input_key: "user_agent",
              output_key: "user_agent_parsed",
            },
          ],
          events: c.splice(0, 5),
        };
        s({
          url: "https://lumberjack.razorpay.com/v1/track",
          data: {
            key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
            data: window.encodeURIComponent(
              window.btoa(
                window.unescape(window.encodeURIComponent(JSON.stringify(e)))
              )
            ),
          },
        });
      }
    })();
  }, 1e3);
  try {
    -1 === "canary".indexOf("TRAFFIC_ENV") &&
      (window.addEventListener("message", function (e) {
        var n = {};
        try {
          n = JSON.parse(e.data);
        } catch (e) {}
        try {
          var t = (n || {}).topic;
          t &&
            "clearMountErrorListener" === t &&
            window.removeEventListener("error", u, { capture: !0 });
        } catch (e) {}
      }),
      window.addEventListener("error", u, { capture: !0 }));
  } catch (e) {}
  var l = window,
    d = l.document,
    m = l.Boolean,
    f = l.Array,
    p = l.Object,
    h = l.String,
    v = l.Number,
    _ = l.Date,
    y = l.Math,
    g = l.setTimeout,
    b = l.setInterval,
    w = l.clearTimeout,
    k = l.clearInterval,
    E = l.parseInt,
    S = l.encodeURIComponent,
    A = l.decodeURIComponent,
    C = l.btoa,
    R = l.unescape,
    x = l.TypeError,
    I = l.navigator,
    P = l.location,
    D = l.XMLHttpRequest,
    N = l.NodeList,
    T = l.FormData;
  function M(e) {
    var n = this.constructor;
    return this.then(
      function (t) {
        return n.resolve(e()).then(function () {
          return t;
        });
      },
      function (t) {
        return n.resolve(e()).then(function () {
          return n.reject(t);
        });
      }
    );
  }
  function L(e) {
    return new this(function (n, t) {
      if (!e || void 0 === e.length)
        return t(
          new x(
            typeof e +
              " " +
              e +
              " is not iterable(cannot read property Symbol(Symbol.iterator))"
          )
        );
      var r = f.prototype.slice.call(e);
      if (0 === r.length) return n([]);
      var a = r.length;
      function i(e, t) {
        if (t && ("object" == typeof t || "function" == typeof t)) {
          var o = t.then;
          if ("function" == typeof o)
            return void o.call(
              t,
              function (n) {
                i(e, n);
              },
              function (t) {
                (r[e] = { status: "rejected", reason: t }), 0 == --a && n(r);
              }
            );
        }
        (r[e] = { status: "fulfilled", value: t }), 0 == --a && n(r);
      }
      for (var o = 0; o < r.length; o++) i(o, r[o]);
    });
  }
  var O = g;
  function B(e) {
    return m(e && void 0 !== e.length);
  }
  function z() {}
  function F(e) {
    if (!(this instanceof F))
      throw new x("Promises must be constructed via new");
    if ("function" != typeof e) throw new x("not a function");
    (this._state = 0),
      (this._handled = !1),
      (this._value = void 0),
      (this._deferreds = []),
      G(e, this);
  }
  function K(e, n) {
    for (; 3 === e._state; ) e = e._value;
    0 !== e._state
      ? ((e._handled = !0),
        F._immediateFn(function () {
          var t = 1 === e._state ? n.onFulfilled : n.onRejected;
          if (null !== t) {
            var r;
            try {
              r = t(e._value);
            } catch (e) {
              return void $(n.promise, e);
            }
            U(n.promise, r);
          } else (1 === e._state ? U : $)(n.promise, e._value);
        }))
      : e._deferreds.push(n);
  }
  function U(e, n) {
    try {
      if (n === e) throw new x("A promise cannot be resolved with itself.");
      if (n && ("object" == typeof n || "function" == typeof n)) {
        var t = n.then;
        if (n instanceof F) return (e._state = 3), (e._value = n), void j(e);
        if ("function" == typeof t)
          return void G(
            ((r = t),
            (a = n),
            function () {
              r.apply(a, arguments);
            }),
            e
          );
      }
      (e._state = 1), (e._value = n), j(e);
    } catch (n) {
      $(e, n);
    }
    var r, a;
  }
  function $(e, n) {
    (e._state = 2), (e._value = n), j(e);
  }
  function j(e) {
    2 === e._state &&
      0 === e._deferreds.length &&
      F._immediateFn(function () {
        e._handled || F._unhandledRejectionFn(e._value);
      });
    for (var n = 0, t = e._deferreds.length; n < t; n++) K(e, e._deferreds[n]);
    e._deferreds = null;
  }
  function H(e, n, t) {
    (this.onFulfilled = "function" == typeof e ? e : null),
      (this.onRejected = "function" == typeof n ? n : null),
      (this.promise = t);
  }
  function G(e, n) {
    var t = !1;
    try {
      e(
        function (e) {
          t || ((t = !0), U(n, e));
        },
        function (e) {
          t || ((t = !0), $(n, e));
        }
      );
    } catch (e) {
      if (t) return;
      (t = !0), $(n, e);
    }
  }
  (F.prototype.catch = function (e) {
    return this.then(null, e);
  }),
    (F.prototype.then = function (e, n) {
      var t = new this.constructor(z);
      return K(this, new H(e, n, t)), t;
    }),
    (F.prototype.finally = M),
    (F.all = function (e) {
      return new F(function (n, t) {
        if (!B(e)) return t(new x("Promise.all accepts an array"));
        var r = f.prototype.slice.call(e);
        if (0 === r.length) return n([]);
        var a = r.length;
        function i(e, o) {
          try {
            if (o && ("object" == typeof o || "function" == typeof o)) {
              var u = o.then;
              if ("function" == typeof u)
                return void u.call(
                  o,
                  function (n) {
                    i(e, n);
                  },
                  t
                );
            }
            (r[e] = o), 0 == --a && n(r);
          } catch (e) {
            t(e);
          }
        }
        for (var o = 0; o < r.length; o++) i(o, r[o]);
      });
    }),
    (F.allSettled = L),
    (F.resolve = function (e) {
      return e && "object" == typeof e && e.constructor === F
        ? e
        : new F(function (n) {
            n(e);
          });
    }),
    (F.reject = function (e) {
      return new F(function (n, t) {
        t(e);
      });
    }),
    (F.race = function (e) {
      return new F(function (n, t) {
        if (!B(e)) return t(new x("Promise.race accepts an array"));
        for (var r = 0, a = e.length; r < a; r++) F.resolve(e[r]).then(n, t);
      });
    }),
    (F._immediateFn =
      ("function" == typeof setImmediate &&
        function (e) {
          setImmediate(e);
        }) ||
      function (e) {
        O(e, 0);
      }),
    (F._unhandledRejectionFn = function (e) {
      "undefined" != typeof console && console;
    });
  var Y = (function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if (void 0 !== l) return l;
    throw new Error("unable to locate global object");
  })();
  "function" != typeof Y.Promise
    ? (Y.Promise = F)
    : (Y.Promise.prototype.finally || (Y.Promise.prototype.finally = M),
      Y.Promise.allSettled || (Y.Promise.allSettled = L)),
    p.entries ||
      (p.entries = function (e) {
        for (var n = p.keys(e), t = n.length, r = new f(t); t--; )
          r[t] = [n[t], e[n[t]]];
        return r;
      }),
    p.values ||
      (p.values = function (e) {
        for (var n = p.keys(e), t = n.length, r = new f(t); t--; )
          r[t] = e[n[t]];
        return r;
      }),
    "function" != typeof p.assign &&
      p.defineProperty(p, "assign", {
        value: function (e) {
          if (null == e)
            throw new x("Cannot convert undefined or null to object");
          for (var n = p(e), t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            if (null != r)
              for (var a in r)
                p.prototype.hasOwnProperty.call(r, a) && (n[a] = r[a]);
          }
          return n;
        },
        writable: !0,
        configurable: !0,
      }),
    window.NodeList &&
      !N.prototype.forEach &&
      (N.prototype.forEach = f.prototype.forEach),
    f.prototype.find ||
      (f.prototype.find = function (e) {
        if ("function" != typeof e) throw new x("callback must be a function");
        for (var n = arguments[1] || this, t = 0; t < this.length; t++)
          if (e.call(n, this[t], t, this)) return this[t];
      }),
    f.prototype.includes ||
      (f.prototype.includes = function () {
        return -1 !== f.prototype.indexOf.apply(this, arguments);
      }),
    f.prototype.flat ||
      p.defineProperty(f.prototype, "flat", {
        configurable: !0,
        writable: !0,
        value: function () {
          var e = void 0 === arguments[0] ? 1 : v(arguments[0]) || 0,
            n = [],
            t = n.forEach,
            r = function e(r, a) {
              t.call(r, function (t) {
                a > 0 && f.isArray(t) ? e(t, a - 1) : n.push(t);
              });
            };
          return r(this, e), n;
        },
      }),
    f.prototype.flatMap ||
      (f.prototype.flatMap = function (e, n) {
        for (
          var t = n || this, r = [], a = p(t), i = a.length >>> 0, o = 0;
          o < i;
          ++o
        )
          if (o in a) {
            var u = e.call(t, a[o], o, a);
            r = r.concat(u);
          }
        return r;
      }),
    f.prototype.findIndex ||
      (f.prototype.findIndex = function (e) {
        if ("function" != typeof e) throw new x("callback must be a function");
        for (var n = arguments[1] || this, t = 0; t < this.length; t++)
          if (e.call(n, this[t], t, this)) return t;
        return -1;
      }),
    h.prototype.endsWith ||
      (h.prototype.endsWith = function (e, n) {
        return (
          n < this.length ? (n |= 0) : (n = this.length),
          this.substr(n - e.length, e.length) === e
        );
      });
  var V,
    Z,
    W,
    q,
    J,
    Q =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
  function X() {
    return (
      (X =
        p.assign ||
        function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var r in t)
              p.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e;
        }),
      X.apply(this, arguments)
    );
  }
  h.prototype.includes ||
    (h.prototype.includes = function () {
      return -1 !== h.prototype.indexOf.apply(this, arguments);
    }),
    h.prototype.startsWith ||
      (h.prototype.startsWith = function () {
        return 0 === h.prototype.indexOf.apply(this, arguments);
      }),
    f.from ||
      (f.from =
        ((V = p.prototype.toString),
        (Z = function (e) {
          return "function" == typeof e || "[object Function]" === V.call(e);
        }),
        (W = y.pow(2, 53) - 1),
        (q = function (e) {
          var n = (function (e) {
            var n = v(e);
            return isNaN(n)
              ? 0
              : 0 !== n && isFinite(n)
              ? (n > 0 ? 1 : -1) * y.floor(y.abs(n))
              : n;
          })(e);
          return y.min(y.max(n, 0), W);
        }),
        (J = function (e) {
          var n = [];
          return (
            e.forEach(function (e) {
              return n.push(e);
            }),
            n
          );
        }),
        function (e) {
          if (e instanceof Set) return J(e);
          var n = this,
            t = p(e);
          if (null == e)
            throw new x(
              "Array.from requires an array-like object - not null or undefined"
            );
          var r,
            a = arguments.length > 1 ? arguments[1] : void 0;
          if (void 0 !== a) {
            if (!Z(a))
              throw new x(
                "Array.from: when provided, the second argument must be a function"
              );
            arguments.length > 2 && (r = arguments[2]);
          }
          for (
            var i, o = q(t.length), u = Z(n) ? p(new n(o)) : new f(o), c = 0;
            c < o;

          )
            (i = t[c]),
              (u[c] = a ? (void 0 === r ? a(i, c) : a.call(r, i, c)) : i),
              (c += 1);
          return (u.length = o), u;
        })),
    f.prototype.fill ||
      p.defineProperty(f.prototype, "fill", {
        value: function (e) {
          if (null == this) throw new x("this is null or not defined");
          for (
            var n = p(this),
              t = n.length >>> 0,
              r = arguments[1],
              a = r >> 0,
              i = a < 0 ? y.max(t + a, 0) : y.min(a, t),
              o = arguments[2],
              u = void 0 === o ? t : o >> 0,
              c = u < 0 ? y.max(t + u, 0) : y.min(u, t);
            i < c;

          )
            (n[i] = e), i++;
          return n;
        },
      }),
    "function" != typeof p.assign &&
      p.defineProperty(p, "assign", {
        value: function (e) {
          if (null == e)
            throw new x("Cannot convert undefined or null to object");
          for (var n = p(e), t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            if (null != r)
              for (var a in r)
                p.prototype.hasOwnProperty.call(r, a) && (n[a] = r[a]);
          }
          return n;
        },
        writable: !0,
        configurable: !0,
      }),
    Q.alert.name ||
      p.defineProperty(Function.prototype, "name", {
        get: function () {
          var e = (this.toString()
            .replace(/\n/g, "")
            .match(/^function\s*([^\s(]+)/) || [])[1];
          return p.defineProperty(this, "name", { value: e }), e;
        },
        configurable: !0,
      }),
    f.prototype.filter ||
      (f.prototype.filter = function (e) {
        for (var n = [], t = this.length, r = 0; r < t; r++)
          e(this[r], r, this) && n.push(this[r]);
        return n;
      });
  var ee = "behav",
    ne = "render",
    te = "metric",
    re = "integration",
    ae = "api",
    ie = "error",
    oe = Object.freeze({
      __proto__: null,
      BEHAV: ee,
      RENDER: ne,
      METRIC: te,
      DEBUG: "debug",
      INTEGRATION: re,
      API: ae,
      ERROR: ie,
    }),
    ue = function () {
      return (
        (ue =
          p.assign ||
          function (e) {
            for (var n, t = 1, r = arguments.length; t < r; t++)
              for (var a in (n = arguments[t]))
                p.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            return e;
          }),
        ue.apply(this, arguments)
      );
    };
  function ce(e, n, t) {
    if (t || 2 === arguments.length)
      for (var r, a = 0, i = n.length; a < i; a++)
        (!r && a in n) ||
          (r || (r = f.prototype.slice.call(n, 0, a)), (r[a] = n[a]));
    return e.concat(r || f.prototype.slice.call(n));
  }
  var se = {
    _storage: {},
    setItem: function (e, n) {
      this._storage[e] = n;
    },
    getItem: function (e) {
      return this._storage[e] || null;
    },
    removeItem: function (e) {
      delete this._storage[e];
    },
  };
  var le = (function () {
      var e = _.now();
      try {
        l.localStorage.setItem("_storage", e);
        var n = l.localStorage.getItem("_storage");
        return (
          l.localStorage.removeItem("_storage"),
          e !== E(h(n)) ? se : l.localStorage
        );
      } catch (e) {
        return se;
      }
    })(),
    de = "rzp_checkout_exp",
    me = (function () {
      function e(n) {
        void 0 === n && (n = {});
        var t = this;
        (this.getExperiment = function (e) {
          return e ? t.experiments[e] : null;
        }),
          (this.getAllActiveExperimentsName = function () {
            return p.keys(t.experiments);
          }),
          (this.getRegisteredExperiments = function () {
            return t.experiments;
          }),
          (this.clearOldExperiments = function () {
            var n = e.getExperimentsFromStorage(),
              r = t.getAllActiveExperimentsName().reduce(function (e, t) {
                return void 0 !== n[t] && (e[t] = n[t]), e;
              }, {});
            e.setExperimentsInStorage(r);
          }),
          (this.create = function (e, n, r) {
            var a;
            void 0 === r && (r = {});
            var i = r.evaluatorArg,
              o = r.overrideFn;
            var u = n;
            if (
              ("number" == typeof n &&
                (u = function () {
                  return y.random() < n ? 0 : 1;
                }),
              "function" != typeof u)
            )
              throw new Error("evaluatorFn must be a function or number");
            var c = {
              name: e,
              enabled: function () {
                return 1 === this.getSegmentOrCreate(e, i, o);
              }.bind(t),
              evaluator: u,
            };
            return (
              "number" == typeof n && (c.rolloutValue = n),
              t.register((((a = {})[e] = c), a)),
              c
            );
          }),
          (this.experiments = n);
      }
      return (
        (e.setExperimentsInStorage = function (e) {
          if (e && "object" == typeof e)
            try {
              le.setItem(de, JSON.stringify(e));
            } catch (e) {
              return;
            }
        }),
        (e.getExperimentsFromStorage = function () {
          var e;
          try {
            e = JSON.parse(le.getItem(de));
          } catch (e) {}
          return e && "object" == typeof e && !f.isArray(e) ? e : {};
        }),
        (e.prototype.setSegment = function (n, t, r) {
          var a = this.getExperiment(n);
          if (a) {
            var i = ("function" == typeof r ? r : a.evaluator)(t),
              o = e.getExperimentsFromStorage();
            return (o[a.name] = i), e.setExperimentsInStorage(o), i;
          }
        }),
        (e.prototype.getSegment = function (n) {
          return e.getExperimentsFromStorage()[n];
        }),
        (e.prototype.getSegmentOrCreate = function (e, n, t) {
          var r = this.getSegment(e);
          return "function" == typeof t
            ? t(n)
            : void 0 === r
            ? this.setSegment(e, n, t)
            : r;
        }),
        (e.prototype.register = function (e) {
          this.experiments = ue(ue({}, this.experiments), e);
        }),
        e
      );
    })();
  new me({});
  var fe = [
    "rzp_test_mZcDnA8WJMFQQD",
    "rzp_live_ENneAQv5t7kTEQ",
    "rzp_test_kD8QgcxVGzYSOU",
    "rzp_live_alEMh9FVT4XpwM",
  ];
  function pe(e, n, t) {
    return (
      void 0 === t && (t = null),
      he(e)
        ? ("string" == typeof n && (n = n.split(".")),
          n.reduce(function (e, n) {
            return e && void 0 !== e[n] ? e[n] : t;
          }, e))
        : e
    );
  }
  function he(e) {
    return null !== e && "object" == typeof e;
  }
  var ve = function (e, n) {
      return !!he(e) && n in e;
    },
    _e = function (e) {
      return !p.keys(e || {}).length;
    },
    ye = function (e, n) {
      return p.keys(e).reduce(function (t, r) {
        return (t[r] = n(e[r], r, e)), t;
      }, {});
    },
    ge = function (e, n) {
      void 0 === e && (e = {}), void 0 === n && (n = "");
      var t = {};
      return (
        p.entries(e).forEach(function (e) {
          var r = e[0],
            a = e[1],
            i = n ? "".concat(n, ".").concat(r) : r;
          a && "object" == typeof a ? p.assign(t, ge(a, i)) : (t[i] = a);
        }),
        t
      );
    },
    be = function (e) {
      void 0 === e && (e = {});
      var n,
        t = {};
      return (
        p.entries(e).forEach(function (e) {
          var r = e[0],
            a = e[1],
            i = (r = r.replace(/\[([^[\]]+)\]/g, "".concat(".", "$1"))).split(
              "."
            ),
            o = t;
          i.forEach(function (e, t) {
            t < i.length - 1
              ? (o[e] || (o[e] = {}), (n = o[e]), (o = n))
              : (o[e] = a);
          });
        }),
        t
      );
    },
    we = function (e) {
      return he(e) ? JSON.parse(JSON.stringify(e)) : e;
    },
    ke = function (e, n) {
      he(e) &&
        p.keys(e).forEach(function (t) {
          return n(e[t], t, e);
        });
    },
    Ee = function (e) {
      try {
        return JSON.parse(e);
      } catch (e) {}
    },
    Se = (function () {
      function e() {
        var e = this;
        (this.instance = null),
          (this.preferenceResponse = {}),
          (this.isEmbedded = !1),
          (this.subscription = []),
          (this.updateInstance = function (n) {
            e.razorpayInstance = n;
          }),
          (this.triggerInstanceMethod = function (n, t) {
            if ((void 0 === t && (t = []), e.instance))
              return e.instance[n].apply(e.instance, t);
          }),
          (this.set = function () {
            for (var n = [], t = 0; t < arguments.length; t++)
              n[t] = arguments[t];
            return e.triggerInstanceMethod("set", n);
          }),
          (this.subscribe = function (n) {
            e.subscription.push(n);
          }),
          (this.get = function () {
            for (var n = [], t = 0; t < arguments.length; t++)
              n[t] = arguments[t];
            return n.length ? e.triggerInstanceMethod("get", n) : e.instance;
          }),
          (this.getMerchantOption = function (n) {
            void 0 === n && (n = "");
            var t = e.triggerInstanceMethod("get") || {};
            return n ? pe(t, n) : t;
          }),
          (this.isIRCTC = function () {
            return fe.indexOf(e.get("key")) >= 0;
          }),
          (this.getCardFeatures = function (n) {
            return e.instance.getCardFeatures(n);
          }),
          (this.subscription = []);
      }
      return (
        p.defineProperty(e.prototype, "razorpayInstance", {
          get: function () {
            return this.instance;
          },
          set: function (e) {
            (this.instance = e),
              (this.preferenceResponse = e.preferences),
              this.subscription.forEach(function (n) {
                "function" == typeof n && n(e);
              }),
              this.isIRCTC() && this.set("theme.image_frame", !1);
          },
          enumerable: !1,
          configurable: !0,
        }),
        p.defineProperty(e.prototype, "preferences", {
          get: function () {
            return this.preferenceResponse;
          },
          enumerable: !1,
          configurable: !0,
        }),
        e
      );
    })(),
    Ae = new Se(),
    Ce = {
      AED: {
        code: "784",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "Ø¯.Ø¥",
        name: "Emirati Dirham",
      },
      ALL: {
        code: "008",
        denomination: 100,
        min_value: 221,
        min_auth_value: 100,
        symbol: "Lek",
        name: "Albanian Lek",
      },
      AMD: {
        code: "051",
        denomination: 100,
        min_value: 975,
        min_auth_value: 100,
        symbol: "Ö",
        name: "Armenian Dram",
      },
      ARS: {
        code: "032",
        denomination: 100,
        min_value: 80,
        min_auth_value: 100,
        symbol: "ARS",
        name: "Argentine Peso",
      },
      AUD: {
        code: "036",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "A$",
        name: "Australian Dollar",
      },
      AWG: {
        code: "533",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "Afl.",
        name: "Aruban or Dutch Guilder",
      },
      BBD: {
        code: "052",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "Bds$",
        name: "Barbadian or Bajan Dollar",
      },
      BDT: {
        code: "050",
        denomination: 100,
        min_value: 168,
        min_auth_value: 100,
        symbol: "à§³",
        name: "Bangladeshi Taka",
      },
      BMD: {
        code: "060",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "$",
        name: "Bermudian Dollar",
      },
      BND: {
        code: "096",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "BND",
        name: "Bruneian Dollar",
      },
      BOB: {
        code: "068",
        denomination: 100,
        min_value: 14,
        min_auth_value: 100,
        symbol: "Bs",
        name: "Bolivian BolÃ­viano",
      },
      BSD: {
        code: "044",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "BSD",
        name: "Bahamian Dollar",
      },
      BWP: {
        code: "072",
        denomination: 100,
        min_value: 22,
        min_auth_value: 100,
        symbol: "P",
        name: "Botswana Pula",
      },
      BZD: {
        code: "084",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "BZ$",
        name: "Belizean Dollar",
      },
      CAD: {
        code: "124",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "C$",
        name: "Canadian Dollar",
      },
      CHF: {
        code: "756",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "CHf",
        name: "Swiss Franc",
      },
      CNY: {
        code: "156",
        denomination: 100,
        min_value: 14,
        min_auth_value: 100,
        symbol: "Â¥",
        name: "Chinese Yuan Renminbi",
      },
      COP: {
        code: "170",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "COL$",
        name: "Colombian Peso",
      },
      CRC: {
        code: "188",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "â‚¡",
        name: "Costa Rican Colon",
      },
      CUP: {
        code: "192",
        denomination: 100,
        min_value: 53,
        min_auth_value: 100,
        symbol: "$MN",
        name: "Cuban Peso",
      },
      CZK: {
        code: "203",
        denomination: 100,
        min_value: 46,
        min_auth_value: 100,
        symbol: "KÄ",
        name: "Czech Koruna",
      },
      DKK: {
        code: "208",
        denomination: 100,
        min_value: 250,
        min_auth_value: 100,
        symbol: "DKK",
        name: "Danish Krone",
      },
      DOP: {
        code: "214",
        denomination: 100,
        min_value: 102,
        min_auth_value: 100,
        symbol: "RD$",
        name: "Dominican Peso",
      },
      DZD: {
        code: "012",
        denomination: 100,
        min_value: 239,
        min_auth_value: 100,
        symbol: "Ø¯.Ø¬",
        name: "Algerian Dinar",
      },
      EGP: {
        code: "818",
        denomination: 100,
        min_value: 35,
        min_auth_value: 100,
        symbol: "EÂ£",
        name: "Egyptian Pound",
      },
      ETB: {
        code: "230",
        denomination: 100,
        min_value: 57,
        min_auth_value: 100,
        symbol: "á‰¥áˆ­",
        name: "Ethiopian Birr",
      },
      EUR: {
        code: "978",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "â‚¬",
        name: "Euro",
      },
      FJD: {
        code: "242",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "FJ$",
        name: "Fijian Dollar",
      },
      GBP: {
        code: "826",
        denomination: 100,
        min_value: 30,
        min_auth_value: 100,
        symbol: "Â£",
        name: "British Pound",
      },
      GIP: {
        code: "292",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "GIP",
        name: "Gibraltar Pound",
      },
      GMD: {
        code: "270",
        denomination: 100,
        min_value: 100,
        min_auth_value: 100,
        symbol: "D",
        name: "Gambian Dalasi",
      },
      GTQ: {
        code: "320",
        denomination: 100,
        min_value: 16,
        min_auth_value: 100,
        symbol: "Q",
        name: "Guatemalan Quetzal",
      },
      GYD: {
        code: "328",
        denomination: 100,
        min_value: 418,
        min_auth_value: 100,
        symbol: "G$",
        name: "Guyanese Dollar",
      },
      HKD: {
        code: "344",
        denomination: 100,
        min_value: 400,
        min_auth_value: 100,
        symbol: "HK$",
        name: "Hong Kong Dollar",
      },
      HNL: {
        code: "340",
        denomination: 100,
        min_value: 49,
        min_auth_value: 100,
        symbol: "HNL",
        name: "Honduran Lempira",
      },
      HRK: {
        code: "191",
        denomination: 100,
        min_value: 14,
        min_auth_value: 100,
        symbol: "kn",
        name: "Croatian Kuna",
      },
      HTG: {
        code: "332",
        denomination: 100,
        min_value: 167,
        min_auth_value: 100,
        symbol: "G",
        name: "Haitian Gourde",
      },
      HUF: {
        code: "348",
        denomination: 100,
        min_value: 555,
        min_auth_value: 100,
        symbol: "Ft",
        name: "Hungarian Forint",
      },
      IDR: {
        code: "360",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "Rp",
        name: "Indonesian Rupiah",
      },
      ILS: {
        code: "376",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "â‚ª",
        name: "Israeli Shekel",
      },
      INR: {
        code: "356",
        denomination: 100,
        min_value: 100,
        min_auth_value: 100,
        symbol: "â‚¹",
        name: "Indian Rupee",
      },
      JMD: {
        code: "388",
        denomination: 100,
        min_value: 250,
        min_auth_value: 100,
        symbol: "J$",
        name: "Jamaican Dollar",
      },
      KES: {
        code: "404",
        denomination: 100,
        min_value: 201,
        min_auth_value: 100,
        symbol: "Ksh",
        name: "Kenyan Shilling",
      },
      KGS: {
        code: "417",
        denomination: 100,
        min_value: 140,
        min_auth_value: 100,
        symbol: "Ð›Ð²",
        name: "Kyrgyzstani Som",
      },
      KHR: {
        code: "116",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "áŸ›",
        name: "Cambodian Riel",
      },
      KYD: {
        code: "136",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "CI$",
        name: "Caymanian Dollar",
      },
      KZT: {
        code: "398",
        denomination: 100,
        min_value: 759,
        min_auth_value: 100,
        symbol: "â‚¸",
        name: "Kazakhstani Tenge",
      },
      LAK: {
        code: "418",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "â‚­",
        name: "Lao Kip",
      },
      LBP: {
        code: "422",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "&#1604;.&#1604;.",
        name: "Lebanese Pound",
      },
      LKR: {
        code: "144",
        denomination: 100,
        min_value: 358,
        min_auth_value: 100,
        symbol: "à¶»à·”",
        name: "Sri Lankan Rupee",
      },
      LRD: {
        code: "430",
        denomination: 100,
        min_value: 325,
        min_auth_value: 100,
        symbol: "L$",
        name: "Liberian Dollar",
      },
      LSL: {
        code: "426",
        denomination: 100,
        min_value: 29,
        min_auth_value: 100,
        symbol: "LSL",
        name: "Basotho Loti",
      },
      MAD: {
        code: "504",
        denomination: 100,
        min_value: 20,
        min_auth_value: 100,
        symbol: "Ø¯.Ù….",
        name: "Moroccan Dirham",
      },
      MDL: {
        code: "498",
        denomination: 100,
        min_value: 35,
        min_auth_value: 100,
        symbol: "MDL",
        name: "Moldovan Leu",
      },
      MKD: {
        code: "807",
        denomination: 100,
        min_value: 109,
        min_auth_value: 100,
        symbol: "Ð´ÐµÐ½",
        name: "Macedonian Denar",
      },
      MMK: {
        code: "104",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "MMK",
        name: "Burmese Kyat",
      },
      MNT: {
        code: "496",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "â‚®",
        name: "Mongolian Tughrik",
      },
      MOP: {
        code: "446",
        denomination: 100,
        min_value: 17,
        min_auth_value: 100,
        symbol: "MOP$",
        name: "Macau Pataca",
      },
      MUR: {
        code: "480",
        denomination: 100,
        min_value: 70,
        min_auth_value: 100,
        symbol: "â‚¨",
        name: "Mauritian Rupee",
      },
      MVR: {
        code: "462",
        denomination: 100,
        min_value: 31,
        min_auth_value: 100,
        symbol: "Rf",
        name: "Maldivian Rufiyaa",
      },
      MWK: {
        code: "454",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "MK",
        name: "Malawian Kwacha",
      },
      MXN: {
        code: "484",
        denomination: 100,
        min_value: 39,
        min_auth_value: 100,
        symbol: "Mex$",
        name: "Mexican Peso",
      },
      MYR: {
        code: "458",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "RM",
        name: "Malaysian Ringgit",
      },
      NAD: {
        code: "516",
        denomination: 100,
        min_value: 29,
        min_auth_value: 100,
        symbol: "N$",
        name: "Namibian Dollar",
      },
      NGN: {
        code: "566",
        denomination: 100,
        min_value: 723,
        min_auth_value: 100,
        symbol: "â‚¦",
        name: "Nigerian Naira",
      },
      NIO: {
        code: "558",
        denomination: 100,
        min_value: 66,
        min_auth_value: 100,
        symbol: "NIO",
        name: "Nicaraguan Cordoba",
      },
      NOK: {
        code: "578",
        denomination: 100,
        min_value: 300,
        min_auth_value: 100,
        symbol: "NOK",
        name: "Norwegian Krone",
      },
      NPR: {
        code: "524",
        denomination: 100,
        min_value: 221,
        min_auth_value: 100,
        symbol: "à¤°à¥‚",
        name: "Nepalese Rupee",
      },
      NZD: {
        code: "554",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "NZ$",
        name: "New Zealand Dollar",
      },
      PEN: {
        code: "604",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "S/",
        name: "Peruvian Sol",
      },
      PGK: {
        code: "598",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "PGK",
        name: "Papua New Guinean Kina",
      },
      PHP: {
        code: "608",
        denomination: 100,
        min_value: 106,
        min_auth_value: 100,
        symbol: "â‚±",
        name: "Philippine Peso",
      },
      PKR: {
        code: "586",
        denomination: 100,
        min_value: 227,
        min_auth_value: 100,
        symbol: "â‚¨",
        name: "Pakistani Rupee",
      },
      QAR: {
        code: "634",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "QR",
        name: "Qatari Riyal",
      },
      RUB: {
        code: "643",
        denomination: 100,
        min_value: 130,
        min_auth_value: 100,
        symbol: "â‚½",
        name: "Russian Ruble",
      },
      SAR: {
        code: "682",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "SR",
        name: "Saudi Arabian Riyal",
      },
      SCR: {
        code: "690",
        denomination: 100,
        min_value: 28,
        min_auth_value: 100,
        symbol: "SRe",
        name: "Seychellois Rupee",
      },
      SEK: {
        code: "752",
        denomination: 100,
        min_value: 300,
        min_auth_value: 100,
        symbol: "SEK",
        name: "Swedish Krona",
      },
      SGD: {
        code: "702",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "S$",
        name: "Singapore Dollar",
      },
      SLL: {
        code: "694",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "Le",
        name: "Sierra Leonean Leone",
      },
      SOS: {
        code: "706",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "Sh.so.",
        name: "Somali Shilling",
      },
      SSP: {
        code: "728",
        denomination: 100,
        min_value: 100,
        min_auth_value: 100,
        symbol: "SSÂ£",
        name: "South Sudanese Pound",
      },
      SVC: {
        code: "222",
        denomination: 100,
        min_value: 18,
        min_auth_value: 100,
        symbol: "â‚¡",
        name: "Salvadoran Colon",
      },
      SZL: {
        code: "748",
        denomination: 100,
        min_value: 29,
        min_auth_value: 100,
        symbol: "E",
        name: "Swazi Lilangeni",
      },
      THB: {
        code: "764",
        denomination: 100,
        min_value: 64,
        min_auth_value: 100,
        symbol: "à¸¿",
        name: "Thai Baht",
      },
      TTD: {
        code: "780",
        denomination: 100,
        min_value: 14,
        min_auth_value: 100,
        symbol: "TT$",
        name: "Trinidadian Dollar",
      },
      TZS: {
        code: "834",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "Sh",
        name: "Tanzanian Shilling",
      },
      USD: {
        code: "840",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "$",
        name: "US Dollar",
      },
      UYU: {
        code: "858",
        denomination: 100,
        min_value: 67,
        min_auth_value: 100,
        symbol: "$U",
        name: "Uruguayan Peso",
      },
      UZS: {
        code: "860",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "so'm",
        name: "Uzbekistani Som",
      },
      YER: {
        code: "886",
        denomination: 100,
        min_value: 501,
        min_auth_value: 100,
        symbol: "ï·¼",
        name: "Yemeni Rial",
      },
      ZAR: {
        code: "710",
        denomination: 100,
        min_value: 29,
        min_auth_value: 100,
        symbol: "R",
        name: "South African Rand",
      },
    },
    Re = function (e, n) {
      return (
        void 0 === n && (n = "."),
        function (t) {
          for (var r = n, a = 0; a < e; a++) r += "0";
          return t.replace(r, "");
        }
      );
    },
    xe = function (e, n) {
      return void 0 === n && (n = ","), e.replace(/\./, n);
    },
    Ie = {
      three: function (e, n) {
        var t = h(e).replace(
          new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"),
          "$1,"
        );
        return Re(n)(t);
      },
      threecommadecimal: function (e, n) {
        var t = xe(h(e)).replace(
          new RegExp("(.{1,3})(?=(...)+(\\,.{" + n + "})$)", "g"),
          "$1."
        );
        return Re(n, ",")(t);
      },
      threespaceseparator: function (e, n) {
        var t = h(e).replace(
          new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"),
          "$1 "
        );
        return Re(n)(t);
      },
      threespacecommadecimal: function (e, n) {
        var t = xe(h(e)).replace(
          new RegExp("(.{1,3})(?=(...)+(\\,.{" + n + "})$)", "g"),
          "$1 "
        );
        return Re(n, ",")(t);
      },
      szl: function (e, n) {
        var t = h(e).replace(
          new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"),
          "$1, "
        );
        return Re(n)(t);
      },
      chf: function (e, n) {
        var t = h(e).replace(
          new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"),
          "$1'"
        );
        return Re(n)(t);
      },
      inr: function (e, n) {
        var t = h(e).replace(
          new RegExp("(.{1,2})(?=.(..)+(\\..{" + n + "})$)", "g"),
          "$1,"
        );
        return Re(n)(t);
      },
      none: function (e) {
        return h(e);
      },
    },
    Pe = {
      default: { decimals: 2, format: Ie.three, minimum: 100 },
      AED: { minor: "fil", minimum: 10 },
      AFN: { minor: "pul" },
      ALL: { minor: "qindarka", minimum: 221 },
      AMD: { minor: "luma", minimum: 975 },
      ANG: { minor: "cent" },
      AOA: { minor: "lwei" },
      ARS: { format: Ie.threecommadecimal, minor: "centavo", minimum: 80 },
      AUD: { format: Ie.threespaceseparator, minimum: 50, minor: "cent" },
      AWG: { minor: "cent", minimum: 10 },
      AZN: { minor: "qÃ¤pik" },
      BAM: { minor: "fenning" },
      BBD: { minor: "cent", minimum: 10 },
      BDT: { minor: "paisa", minimum: 168 },
      BGN: { minor: "stotinki" },
      BHD: { dir: "rtl", decimals: 3, minor: "fils" },
      BIF: { decimals: 0, major: "franc", minor: "centime" },
      BMD: { minor: "cent", minimum: 10 },
      BND: { minor: "sen", minimum: 10 },
      BOB: { minor: "centavo", minimum: 14 },
      BRL: { format: Ie.threecommadecimal, minimum: 50, minor: "centavo" },
      BSD: { minor: "cent", minimum: 10 },
      BTN: { minor: "chetrum" },
      BWP: { minor: "thebe", minimum: 22 },
      BYR: { decimals: 0, major: "ruble" },
      BZD: { minor: "cent", minimum: 10 },
      CAD: { minimum: 50, minor: "cent" },
      CDF: { minor: "centime" },
      CHF: { format: Ie.chf, minimum: 50, minor: "rappen" },
      CLP: { decimals: 0, format: Ie.none, major: "peso", minor: "centavo" },
      CNY: { minor: "jiao", minimum: 14 },
      COP: { format: Ie.threecommadecimal, minor: "centavo", minimum: 1e3 },
      CRC: { format: Ie.threecommadecimal, minor: "centimo", minimum: 1e3 },
      CUC: { minor: "centavo" },
      CUP: { minor: "centavo", minimum: 53 },
      CVE: { minor: "centavo" },
      CZK: { format: Ie.threecommadecimal, minor: "haler", minimum: 46 },
      DJF: { decimals: 0, major: "franc", minor: "centime" },
      DKK: { minimum: 250, minor: "Ã¸re" },
      DOP: { minor: "centavo", minimum: 102 },
      DZD: { minor: "centime", minimum: 239 },
      EGP: { minor: "piaster", minimum: 35 },
      ERN: { minor: "cent" },
      ETB: { minor: "cent", minimum: 57 },
      EUR: { minimum: 50, minor: "cent" },
      FJD: { minor: "cent", minimum: 10 },
      FKP: { minor: "pence" },
      GBP: { minimum: 30, minor: "pence" },
      GEL: { minor: "tetri" },
      GHS: { minor: "pesewas", minimum: 3 },
      GIP: { minor: "pence", minimum: 10 },
      GMD: { minor: "butut" },
      GTQ: { minor: "centavo", minimum: 16 },
      GYD: { minor: "cent", minimum: 418 },
      HKD: { minimum: 400, minor: "cent" },
      HNL: { minor: "centavo", minimum: 49 },
      HRK: { format: Ie.threecommadecimal, minor: "lipa", minimum: 14 },
      HTG: { minor: "centime", minimum: 167 },
      HUF: { decimals: 0, format: Ie.none, major: "forint", minimum: 555 },
      IDR: { format: Ie.threecommadecimal, minor: "sen", minimum: 1e3 },
      ILS: { minor: "agorot", minimum: 10 },
      INR: { format: Ie.inr, minor: "paise" },
      IQD: { decimals: 3, minor: "fil" },
      IRR: { minor: "rials" },
      ISK: { decimals: 0, format: Ie.none, major: "krÃ³na", minor: "aurar" },
      JMD: { minor: "cent", minimum: 250 },
      JOD: { decimals: 3, minor: "fil" },
      JPY: { decimals: 0, minimum: 50, minor: "sen" },
      KES: { minor: "cent", minimum: 201 },
      KGS: { minor: "tyyn", minimum: 140 },
      KHR: { minor: "sen", minimum: 1e3 },
      KMF: { decimals: 0, major: "franc", minor: "centime" },
      KPW: { minor: "chon" },
      KRW: { decimals: 0, major: "won", minor: "chon" },
      KWD: { dir: "rtl", decimals: 3, minor: "fil" },
      KYD: { minor: "cent", minimum: 10 },
      KZT: { minor: "tiyn", minimum: 759 },
      LAK: { minor: "at", minimum: 1e3 },
      LBP: { format: Ie.threespaceseparator, minor: "piastre", minimum: 1e3 },
      LKR: { minor: "cent", minimum: 358 },
      LRD: { minor: "cent", minimum: 325 },
      LSL: { minor: "lisente", minimum: 29 },
      LTL: { format: Ie.threespacecommadecimal, minor: "centu" },
      LVL: { minor: "santim" },
      LYD: { decimals: 3, minor: "dirham" },
      MAD: { minor: "centime", minimum: 20 },
      MDL: { minor: "ban", minimum: 35 },
      MGA: { decimals: 0, major: "ariary" },
      MKD: { minor: "deni" },
      MMK: { minor: "pya", minimum: 1e3 },
      MNT: { minor: "mongo", minimum: 1e3 },
      MOP: { minor: "avo", minimum: 17 },
      MRO: { minor: "khoum" },
      MUR: { minor: "cent", minimum: 70 },
      MVR: { minor: "lari", minimum: 31 },
      MWK: { minor: "tambala", minimum: 1e3 },
      MXN: { minor: "centavo", minimum: 39 },
      MYR: { minor: "sen", minimum: 10 },
      MZN: { decimals: 0, major: "metical" },
      NAD: { minor: "cent", minimum: 29 },
      NGN: { minor: "kobo", minimum: 723 },
      NIO: { minor: "centavo", minimum: 66 },
      NOK: { format: Ie.threecommadecimal, minimum: 300, minor: "Ã¸re" },
      NPR: { minor: "paise", minimum: 221 },
      NZD: { minimum: 50, minor: "cent" },
      OMR: { dir: "rtl", minor: "baiza", decimals: 3 },
      PAB: { minor: "centesimo" },
      PEN: { minor: "centimo", minimum: 10 },
      PGK: { minor: "toea", minimum: 10 },
      PHP: { minor: "centavo", minimum: 106 },
      PKR: { minor: "paisa", minimum: 227 },
      PLN: { format: Ie.threespacecommadecimal, minor: "grosz" },
      PYG: { decimals: 0, major: "guarani", minor: "centimo" },
      QAR: { minor: "dirham", minimum: 10 },
      RON: { format: Ie.threecommadecimal, minor: "bani" },
      RUB: { format: Ie.threecommadecimal, minor: "kopeck", minimum: 130 },
      RWF: { decimals: 0, major: "franc", minor: "centime" },
      SAR: { minor: "halalat", minimum: 10 },
      SBD: { minor: "cent" },
      SCR: { minor: "cent", minimum: 28 },
      SEK: { format: Ie.threespacecommadecimal, minimum: 300, minor: "Ã¶re" },
      SGD: { minimum: 50, minor: "cent" },
      SHP: { minor: "new pence" },
      SLL: { minor: "cent", minimum: 1e3 },
      SOS: { minor: "centesimi", minimum: 1e3 },
      SRD: { minor: "cent" },
      STD: { minor: "centimo" },
      SSP: { minor: "piaster" },
      SVC: { minor: "centavo", minimum: 18 },
      SYP: { minor: "piaster" },
      SZL: { format: Ie.szl, minor: "cent", minimum: 29 },
      THB: { minor: "satang", minimum: 64 },
      TJS: { minor: "diram" },
      TMT: { minor: "tenga" },
      TND: { decimals: 3, minor: "millime" },
      TOP: { minor: "seniti" },
      TRY: { minor: "kurus" },
      TTD: { minor: "cent", minimum: 14 },
      TWD: { minor: "cent" },
      TZS: { minor: "cent", minimum: 1e3 },
      UAH: { format: Ie.threespacecommadecimal, minor: "kopiyka" },
      UGX: { minor: "cent" },
      USD: { minimum: 50, minor: "cent" },
      UYU: { format: Ie.threecommadecimal, minor: "centÃ©", minimum: 67 },
      UZS: { minor: "tiyin", minimum: 1e3 },
      VND: { format: Ie.none, minor: "hao,xu" },
      VUV: { decimals: 0, major: "vatu", minor: "centime" },
      WST: { minor: "sene" },
      XAF: { decimals: 0, major: "franc", minor: "centime" },
      XCD: { minor: "cent" },
      XPF: { decimals: 0, major: "franc", minor: "centime" },
      YER: { minor: "fil", minimum: 501 },
      ZAR: { format: Ie.threespaceseparator, minor: "cent", minimum: 29 },
      ZMK: { minor: "ngwee" },
    },
    De = function (e) {
      return Pe[e] ? Pe[e] : Pe.default;
    },
    Ne = [
      "AED",
      "ALL",
      "AMD",
      "ARS",
      "AUD",
      "AWG",
      "BBD",
      "BDT",
      "BHD",
      "BMD",
      "BND",
      "BOB",
      "BSD",
      "BWP",
      "BZD",
      "CAD",
      "CHF",
      "CNY",
      "COP",
      "CRC",
      "CUP",
      "CZK",
      "DKK",
      "DOP",
      "DZD",
      "EGP",
      "ETB",
      "EUR",
      "FJD",
      "GBP",
      "GHS",
      "GIP",
      "GMD",
      "GTQ",
      "GYD",
      "HKD",
      "HNL",
      "HRK",
      "HTG",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "JMD",
      "KES",
      "KGS",
      "KHR",
      "KWD",
      "KYD",
      "KZT",
      "LAK",
      "LBP",
      "LKR",
      "LRD",
      "LSL",
      "MAD",
      "MDL",
      "MKD",
      "MMK",
      "MNT",
      "MOP",
      "MUR",
      "MVR",
      "MWK",
      "MXN",
      "MYR",
      "NAD",
      "NGN",
      "NIO",
      "NOK",
      "NPR",
      "NZD",
      "OMR",
      "PEN",
      "PGK",
      "PHP",
      "PKR",
      "QAR",
      "RUB",
      "SAR",
      "SCR",
      "SEK",
      "SGD",
      "SLL",
      "SOS",
      "SSP",
      "SVC",
      "SZL",
      "THB",
      "TTD",
      "TZS",
      "USD",
      "UYU",
      "UZS",
      "YER",
      "ZAR",
    ],
    Te = {
      AED: "Ø¯.Ø¥",
      AFN: "&#x60b;",
      ALL: "Lek",
      AMD: "Ö",
      ANG: "NAÆ’",
      AOA: "Kz",
      ARS: "ARS",
      AUD: "A$",
      AWG: "Afl.",
      AZN: "Ð¼Ð°Ð½",
      BAM: "KM",
      BBD: "Bds$",
      BDT: "à§³",
      BGN: "Ð»Ð²",
      BHD: "Ø¯.Ø¨",
      BIF: "FBu",
      BMD: "$",
      BND: "BND",
      BOB: "Bs.",
      BRL: "R$",
      BSD: "BSD",
      BTN: "Nu.",
      BWP: "P",
      BYR: "Br",
      BZD: "BZ$",
      CAD: "C$",
      CDF: "FC",
      CHF: "CHf",
      CLP: "CLP$",
      CNY: "Â¥",
      COP: "COL$",
      CRC: "â‚¡",
      CUC: "&#x20b1;",
      CUP: "$MN",
      CVE: "Esc",
      CZK: "KÄ",
      DJF: "Fdj",
      DKK: "DKK",
      DOP: "RD$",
      DZD: "Ø¯.Ø¬",
      EGP: "EÂ£",
      ERN: "Nfa",
      ETB: "á‰¥áˆ­",
      EUR: "â‚¬",
      FJD: "FJ$",
      FKP: "FK&#163;",
      GBP: "Â£",
      GEL: "áƒš",
      GHS: "&#x20b5;",
      GIP: "GIP",
      GMD: "D",
      GNF: "FG",
      GTQ: "Q",
      GYD: "G$",
      HKD: "HK$",
      HNL: "HNL",
      HRK: "kn",
      HTG: "G",
      HUF: "Ft",
      IDR: "Rp",
      ILS: "â‚ª",
      INR: "â‚¹",
      IQD: "Ø¹.Ø¯",
      IRR: "&#xfdfc;",
      ISK: "ISK",
      JMD: "J$",
      JOD: "Ø¯.Ø§",
      JPY: "&#165;",
      KES: "Ksh",
      KGS: "Ð›Ð²",
      KHR: "áŸ›",
      KMF: "CF",
      KPW: "KPW",
      KRW: "KRW",
      KWD: "Ø¯.Ùƒ",
      KYD: "CI$",
      KZT: "â‚¸",
      LAK: "â‚­",
      LBP: "&#1604;.&#1604;.",
      LD: "LD",
      LKR: "à¶»à·”",
      LRD: "L$",
      LSL: "LSL",
      LTL: "Lt",
      LVL: "Ls",
      LYD: "LYD",
      MAD: "Ø¯.Ù….",
      MDL: "MDL",
      MGA: "Ar",
      MKD: "Ð´ÐµÐ½",
      MMK: "MMK",
      MNT: "â‚®",
      MOP: "MOP$",
      MRO: "UM",
      MUR: "â‚¨",
      MVR: "Rf",
      MWK: "MK",
      MXN: "Mex$",
      MYR: "RM",
      MZN: "MT",
      NAD: "N$",
      NGN: "â‚¦",
      NIO: "NIO",
      NOK: "NOK",
      NPR: "à¤°à¥‚",
      NZD: "NZ$",
      OMR: "Ø±.Ø¹.",
      PAB: "B/.",
      PEN: "S/",
      PGK: "PGK",
      PHP: "â‚±",
      PKR: "â‚¨",
      PLN: "ZÅ‚",
      PYG: "&#x20b2;",
      QAR: "QR",
      RON: "RON",
      RSD: "Ð”Ð¸Ð½.",
      RUB: "â‚½",
      RWF: "RF",
      SAR: "SR",
      SBD: "SI$",
      SCR: "SRe",
      SDG: "&#163;Sd",
      SEK: "SEK",
      SFR: "Fr",
      SGD: "S$",
      SHP: "&#163;",
      SLL: "Le",
      SOS: "Sh.so.",
      SRD: "Sr$",
      SSP: "SSÂ£",
      STD: "Db",
      SVC: "â‚¡",
      SYP: "S&#163;",
      SZL: "E",
      THB: "à¸¿",
      TJS: "SM",
      TMT: "M",
      TND: "Ø¯.Øª",
      TOP: "T$",
      TRY: "TL",
      TTD: "TT$",
      TWD: "NT$",
      TZS: "Sh",
      UAH: "&#x20b4;",
      UGX: "USh",
      USD: "$",
      UYU: "$U",
      UZS: "so'm",
      VEF: "Bs",
      VND: "&#x20ab;",
      VUV: "VT",
      WST: "T",
      XAF: "FCFA",
      XCD: "EC$",
      XOF: "CFA",
      XPF: "CFPF",
      YER: "ï·¼",
      ZAR: "R",
      ZMK: "ZK",
      ZWL: "Z$",
    },
    Me = function (e) {
      ke(e, function (n, t) {
        (Pe[t] = p.assign({}, Pe.default, Pe[t] || {})),
          (Pe[t].code = t),
          e[t] && (Pe[t].symbol = e[t]);
      });
    };
  function Le(e, n) {
    var t = De(n),
      r = e / y.pow(10, t.decimals);
    return t.format(r.toFixed(t.decimals), t.decimals);
  }
  function Oe(e, n) {
    return e ? pe(Ae.preferences, e, n) : Ae.preferences;
  }
  function Be(e) {
    return e ? Ae.get(e) : Ae.triggerInstanceMethod("get");
  }
  !(function (e) {
    var n = {};
    ke(e, function (t, r) {
      (Ce[r] = t),
        (Pe[r] = Pe[r] || {}),
        e[r].min_value && (Pe[r].minimum = e[r].min_value),
        e[r].denomination &&
          (Pe[r].decimals = y.LOG10E * y.log(e[r].denomination)),
        (n[r] = e[r].symbol);
    }),
      p.assign(Te, n),
      Me(n);
  })(Ce),
    Me(Te),
    Ne.reduce(function (e, n) {
      return (e[n] = Te[n]), e;
    }, {});
  var ze = Ae.isIRCTC;
  function Fe() {
    return Be("payout");
  }
  var Ke,
    Ue =
      ((Ke = "callback_url"),
      function () {
        return Be(Ke);
      });
  var $e = function () {
      return pe(
        null === Be("config") ? null : { display: Be("config.display") },
        "display.language"
      );
    },
    je = function () {
      return $e() || Oe("language_code");
    },
    He = function () {
      return Be("amount");
    };
  var Ge = function () {
      return Oe("methods", {}) || {};
    },
    Ye = function () {
      return Oe("order");
    },
    Ve = function () {
      return Oe("order.method");
    },
    Ze = function (e, n) {
      return Oe("features.".concat(e), n);
    };
  function We() {
    return "INR" !== Be("currency");
  }
  var qe = function () {
    return Oe("methods.recurring");
  };
  function Je() {
    return (
      !("emandate" !== Ve() || !qe()) || Oe("subscription") || Be("recurring")
    );
  }
  function Qe() {
    return Je() && Oe("subscription");
  }
  function Xe(e) {
    if ((void 0 === e && (e = null), !Oe("subscription"))) return !1;
    if (!e) return !0;
    var n = Oe();
    return n.subscription[e] && !1 !== n.subscription[e];
  }
  var en = function () {
      return Oe("experiments.recurring_upi_intent_qr");
    },
    nn = function () {
      var e;
      return m(
        (null === (e = Ye()) || void 0 === e ? void 0 : e.line_items_total) &&
          Oe("features.one_click_checkout")
      );
    },
    tn = function () {
      return Oe("invoice.order_id") || Be("order_id");
    };
  var rn = ["rzp_test_1DP5mmOlF5G5ag", "rzp_live_ILgsfZCZoFIKMb"];
  var an = function () {
      try {
        if (nn()) return !0;
        var e = Be("disable_redesign_v15"),
          n = Oe("experiments.cb_redesign_v1_5"),
          t = Oe("experiments.banking_redesign_v15"),
          r = Oe("experiments.recurring_redesign_v1_5"),
          a = (Oe("org") || {}).isOrgRazorpay,
          i = Oe("experiments.checkout_redesign_v1_5");
        return (
          (function () {
            try {
              var e = Oe("merchant_policy");
              return !!(e && p.keys(e).length > 0 && e.url && e.display_name);
            } catch (e) {
              return !1;
            }
          })() && (i = !0),
          "boolean" == typeof e && (i = !e),
          a || t || Ze("hdfc_checkout_2", !1) || (i = !1),
          (!We() && !Ze("dcc", !1)) ||
            n ||
            ((o = Be("key")), rn.includes(o)) ||
            (i = !1),
          (!Je() && !Qe()) || r || (i = !1),
          Fe() && (i = !1),
          i
        );
      } catch (e) {
        return !1;
      }
      var o;
    },
    on = function () {
      var e = Be("disable_emi_ux"),
        n = Oe("experiments.emi_ux_revamp");
      return "boolean" == typeof e && (n = !e), n;
    };
  var un = function (e) {
      return function (n, t) {
        return arguments.length < 2
          ? function (t) {
              return e.call(null, t, n);
            }
          : e.call(null, n, t);
      };
    },
    cn = function (e) {
      return function (n, t, r) {
        return arguments.length < 3
          ? function (r) {
              return e.call(null, r, n, t);
            }
          : e.call(null, n, t, r);
      };
    };
  function sn() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    return function (n) {
      return function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return e.every(function (e, n) {
          if (e(t[n])) return !0;
          l.dispatchEvent(
            new Ln("rzp_error", {
              detail: new Error("wrong ".concat(n, "th argtype ").concat(t[n])),
            })
          );
        })
          ? n.apply(null, ce([], t, !0))
          : t[0];
      };
    };
  }
  var ln = un(function (e, n) {
      return typeof e === n;
    }),
    dn = ln("boolean"),
    mn = ln("number"),
    fn = ln("string"),
    pn = ln("function"),
    hn = ln("object"),
    vn = f.isArray,
    _n = ln("undefined"),
    yn = function (e) {
      return gn(e) && 1 === e.nodeType;
    },
    gn = function (e) {
      return (
        !(function (e) {
          return null === e;
        })(e) && hn(e)
      );
    },
    bn = un(function (e, n) {
      return e && e[n];
    }),
    wn = bn("length"),
    kn = bn("prototype"),
    En = un(function (e, n) {
      return e instanceof n;
    }),
    Sn = _.now,
    An = y.random,
    Cn = y.floor,
    Rn = function () {
      var e = Sn();
      return function () {
        return Sn() - e;
      };
    };
  function xn(e, n) {
    void 0 === n && (n = "");
    var t = { description: h(e) };
    return n && (t.field = n), t;
  }
  function In(e, n) {
    return void 0 === n && (n = ""), { error: xn(e, n) };
  }
  function Pn(e) {
    throw new Error(e);
  }
  var Dn = function (e) {
    return /data:image\/[^;]+;base64/.test(e);
  };
  function Nn(e, n) {
    var t = {};
    if (!gn(e)) return t;
    var r = null == n;
    return (
      p.keys(e).forEach(function (a) {
        var i = e[a],
          o = r ? a : "".concat(n, "[").concat(a, "]");
        if ("object" == typeof i) {
          var u = Nn(i, o);
          p.keys(u).forEach(function (e) {
            t[e] = u[e];
          });
        } else t[o] = i;
      }),
      t
    );
  }
  function Tn(e) {
    var n = Nn(e);
    return p
      .keys(n)
      .map(function (e) {
        return "".concat(S(e), "=").concat(S(n[e]));
      })
      .join("&");
  }
  function Mn(e, n) {
    var t = n;
    return (
      gn(n) && (t = Tn(n)),
      t &&
        ((e += (null == e ? void 0 : e.indexOf("?")) > 0 ? "&" : "?"),
        (e += t)),
      e
    );
  }
  function Ln(e, n) {
    n = n || { bubbles: !1, cancelable: !1, detail: void 0 };
    var t = d.createEvent("CustomEvent");
    return t.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), t;
  }
  var On = l.Element,
    Bn = function (e) {
      return d.createElement(e || "div");
    },
    zn = function (e) {
      return e.parentNode;
    },
    Fn = sn(yn),
    Kn = sn(yn, yn),
    Un = sn(yn, fn),
    $n = sn(yn, fn, function () {
      return !0;
    }),
    jn = sn(yn, gn),
    Hn = un(
      Kn(function (e, n) {
        return n.appendChild(e);
      })
    ),
    Gn = un(
      Kn(function (e, n) {
        return Hn(n, e), e;
      })
    ),
    Yn = Fn(function (e) {
      var n = zn(e);
      return n && n.removeChild(e), e;
    });
  Fn(bn("selectionStart")),
    Fn(bn("selectionEnd")),
    un(
      sn(
        yn,
        mn
      )(function (e, n) {
        return (e.selectionStart = e.selectionEnd = n), e;
      })
    );
  var Vn = cn(
      $n(function (e, n, t) {
        return e.setAttribute(n, t), e;
      })
    ),
    Zn = cn(
      $n(function (e, n, t) {
        return (e.style[n] = t), e;
      })
    ),
    Wn = un(
      jn(function (e, n) {
        return (
          ke(n, function (n, t) {
            return Vn(e, t, n);
          }),
          e
        );
      })
    ),
    qn = un(
      jn(function (e, n) {
        return (
          ke(n, function (n, t) {
            return Zn(e, t, n);
          }),
          e
        );
      })
    ),
    Jn = un(
      Un(function (e, n) {
        return (e.innerHTML = n), e;
      })
    ),
    Qn = un(
      Un(function (e, n) {
        return Zn(e, "display", n);
      })
    );
  Qn("none"), Qn("block"), Qn("inline-block");
  var Xn,
    et,
    nt,
    tt = bn("offsetWidth"),
    rt = bn("offsetHeight"),
    at = kn(On),
    it =
      at.matches ||
      at.matchesSelector ||
      at.webkitMatchesSelector ||
      at.mozMatchesSelector ||
      at.msMatchesSelector ||
      at.oMatchesSelector,
    ot = un(
      Un(function (e, n) {
        return it.call(e, n);
      })
    ),
    ut = function (e, n, t, r) {
      if (!En(e, On))
        return function (a) {
          var i = n;
          return (
            fn(t)
              ? (i = function (e) {
                  for (var r = e.target; !ot(r, t) && r !== a; ) r = zn(r);
                  r !== a && ((e.delegateTarget = r), n(e));
                })
              : (r = t),
            (r = !!r),
            a.addEventListener(e, i, r),
            function () {
              return a.removeEventListener(e, i, r);
            }
          );
        };
    },
    ct = D,
    st = In("Network error"),
    lt = 0,
    dt = !1,
    mt = 0;
  function ft() {
    dt && (dt = !1), pt(0);
  }
  function pt(e) {
    isNaN(e) || (mt = +e);
  }
  function ht(e) {
    return ft(), this ? this(e) : null;
  }
  function vt(e, n) {
    return (function (e, n, t) {
      var r;
      return n && t ? Mn(e, Tn((((r = {})[n] = t), r))) : e;
    })(e, "keyless_header", n);
  }
  function _t(e) {
    if (!En(this, _t)) return new _t(e);
    (this.options = (function (e) {
      var n = e;
      fn(e) && (n = { url: e });
      if (n) {
        var t = n.method,
          r = n.headers,
          a = n.callback,
          i = n.data;
        return (
          r || (n.headers = {}),
          t || (n.method = "get"),
          a ||
            (n.callback = function (e) {
              return e;
            }),
          gn(i) && !En(i, T) && (i = Tn(i)),
          (n.data = i),
          n
        );
      }
      return e;
    })(e)),
      this.defer();
  }
  var yt = {
    options: {
      url: "",
      method: "get",
      callback: function (e) {
        return e;
      },
    },
    setReq: function (e, n) {
      return this.abort(), (this.type = e), (this.req = n), this;
    },
    till: function (e, n, t) {
      var r = this;
      if ((void 0 === n && (n = 0), void 0 === t && (t = 3e3), !dt)) {
        var a = mt ? mt * t : t;
        return this.setReq(
          "timeout",
          g(function () {
            r.call(function (a) {
              a.error && n > 0
                ? r.till(e, n - 1, t)
                : e(a)
                ? r.till(e, n, t)
                : r.options.callback && r.options.callback(a);
            });
          }, a)
        );
      }
      g(function () {
        r.till(e, n, t);
      }, t);
    },
    abort: function () {
      var e = this.req,
        n = this.type;
      e &&
        ("ajax" === n
          ? e.abort()
          : "jsonp" === n
          ? (l.Razorpay[e] = function (e) {
              return e;
            })
          : w(e),
        (this.req = null));
    },
    defer: function () {
      var e = this;
      this.req = g(function () {
        return e.call();
      });
    },
    call: function (e) {
      void 0 === e && (e = this.options.callback);
      var n = this.options,
        t = n.method,
        r = n.data,
        a = n.headers,
        i = void 0 === a ? {} : a,
        o = this.options.url;
      o = vt(o, nt);
      var u = new ct();
      this.setReq("ajax", u),
        u.open(t, o, !0),
        (u.onreadystatechange = function () {
          var n;
          if (4 === u.readyState && u.status) {
            if (
              null === (n = u.getResponseHeader("content-type")) || void 0 === n
                ? void 0
                : n.includes("text")
            )
              return void e({
                status_code: u.status,
                xhr: { status: u.status, text: u.responseText },
              });
            if (u.responseText) {
              var r = Ee(u.responseText);
              return (
                r ||
                  ((r = In("Parsing error")).xhr = {
                    status: u.status,
                    text: u.responseText,
                  }),
                r.error &&
                  l.dispatchEvent(
                    Ln("rzp_network_error", {
                      detail: {
                        method: t,
                        url: o,
                        baseUrl: null == o ? void 0 : o.split("?")[0],
                        status: u.status,
                        xhrErrored: !1,
                        response: r,
                      },
                    })
                  ),
                (r.status_code = u.status),
                void e(r)
              );
            }
            var a = { status_code: u.status };
            e(a);
          }
        }),
        (u.onerror = function () {
          var n = st;
          (n.xhr = { status: 0 }),
            l.dispatchEvent(
              Ln("rzp_network_error", {
                detail: {
                  method: t,
                  url: o,
                  baseUrl: null == o ? void 0 : o.split("?")[0],
                  status: 0,
                  xhrErrored: !0,
                  response: n,
                },
              })
            ),
            e(n);
        }),
        Xn && (i["X-Razorpay-SessionId"] = Xn),
        et && (i["X-Razorpay-TrackId"] = et),
        ke(i, function (e, n) {
          return u.setRequestHeader(n, e);
        }),
        u.send(r);
    },
  };
  function gt(e) {
    var n = e.doc,
      t = void 0 === n ? window.document : n,
      r = e.url,
      a = e.method,
      i = void 0 === a ? "post" : a,
      o = e.target,
      u = e.params,
      c = void 0 === u ? {} : u;
    if (((c = Et(c)), i && "get" === i.toLowerCase())) {
      var s = kt(r, c || "");
      o
        ? window.open(s, o)
        : t !== window.document
        ? t.location.assign(s)
        : window.location.assign(s);
    } else {
      var l = t.createElement("form");
      (l.method = i),
        (l.action = r),
        o && (l.target = o),
        bt({ doc: t, form: l, data: c }),
        t.body.appendChild(l),
        l.submit();
    }
  }
  function bt(e) {
    var n = e.doc,
      t = void 0 === n ? window.document : n,
      r = e.form,
      a = e.data;
    if (he(a))
      for (var i in a)
        if (a.hasOwnProperty(i)) {
          var o = wt({ doc: t, name: i, value: a[i] });
          r.appendChild(o);
        }
  }
  function wt(e) {
    var n = e.doc,
      t = void 0 === n ? window.document : n,
      r = e.name,
      a = e.value,
      i = t.createElement("input");
    return (i.type = "hidden"), (i.name = r), (i.value = a), i;
  }
  function kt(e, n) {
    return (
      "object" == typeof n &&
        null !== n &&
        (n = (function (e) {
          he(e) || (e = {});
          var n = [];
          for (var t in e) e.hasOwnProperty(t) && n.push(S(t) + "=" + S(e[t]));
          return n.join("&");
        })(n)),
      n && ((e += e.indexOf("?") > 0 ? "&" : "?"), (e += n)),
      e
    );
  }
  function Et(e) {
    var n = e;
    he(n) || (n = {});
    var t = {};
    if (0 === p.keys(n).length) return {};
    return (
      (function e(n, r) {
        if (p(n) !== n) t[r] = n;
        else if (f.isArray(n)) {
          for (var a = n.length, i = 0; i < a; i++) e(n[i], r + "[" + i + "]");
          0 === a && (t[r] = []);
        } else {
          var o = !0;
          for (var u in n) (o = !1), e(n[u], r ? r + "[" + u + "]" : u);
          o && r && (t[r] = {});
        }
      })(n, ""),
      t
    );
  }
  (yt.constructor = _t),
    (_t.prototype = yt),
    (_t.post = ht.bind(function (e) {
      return (
        (e.method = "post"),
        e.headers || (e.headers = {}),
        e.headers["Content-type"] ||
          (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
        _t(e)
      );
    })),
    (_t.patch = ht.bind(function (e) {
      return (
        (e.method = "PATCH"),
        e.headers || (e.headers = {}),
        e.headers["Content-type"] ||
          (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
        _t(e)
      );
    })),
    (_t.put = ht.bind(function (e) {
      return (
        (e.method = "put"),
        e.headers || (e.headers = {}),
        e.headers["Content-type"] ||
          (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
        _t(e)
      );
    })),
    (_t.delete = function (e) {
      return (
        (e.method = "delete"),
        e.headers || (e.headers = {}),
        e.headers["Content-type"] ||
          (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
        _t(e)
      );
    }),
    (_t.setSessionId = function (e) {
      Xn = e;
    }),
    (_t.setTrackId = function (e) {
      et = e;
    }),
    (_t.setKeylessHeader = function (e) {
      nt = e;
    }),
    (_t.jsonp = ht.bind(function (e) {
      e.data || (e.data = {});
      var n = lt++,
        t = 0,
        r = new _t(e);
      return (
        (e = r.options),
        (r.call = function (r) {
          void 0 === r && (r = e.callback), t++;
          var a = "jsonp".concat(n, "_").concat(t),
            i = !1,
            o = function () {
              i ||
                (this.readyState &&
                  "loaded" !== this.readyState &&
                  "complete" !== this.readyState) ||
                ((i = !0),
                (this.onload = this.onreadystatechange = null),
                Yn(this));
            },
            u = (l.Razorpay[a] = function (e) {
              delete e.http_status_code, r(e), delete l.Razorpay[a];
            });
          this.setReq("jsonp", u);
          var c = Mn(e.url, e.data);
          c = Mn((c = vt(c, nt)), Tn({ callback: "Razorpay.".concat(a) }));
          var s = Bn("script");
          p.assign(s, {
            src: c,
            async: !0,
            onerror: function () {
              return r(st);
            },
            onload: o,
            onreadystatechange: o,
          }),
            Hn(s, d.documentElement);
        }),
        r
      );
    })),
    (_t.pausePoll = function () {
      dt || (dt = !0);
    }),
    (_t.resumePoll = ft),
    (_t.setPollDelayBy = pt);
  var St,
    At = d.body,
    Ct = l.innerHeight,
    Rt = l.pageYOffset,
    xt = window.scrollBy,
    It = window.scrollTo,
    Pt = window.requestAnimationFrame,
    Dt = d.querySelector.bind(d),
    Nt = d.querySelectorAll.bind(d);
  d.getElementById.bind(d), l.getComputedStyle.bind(l);
  var Tt,
    Mt = function (e) {
      return "string" == typeof e ? Dt(e) : e;
    };
  function Lt(e) {
    if (!e.target && l !== l.parent)
      return l.Razorpay.sendMessage({ event: "redirect", data: e });
    gt({ url: e.url, params: e.content, method: e.method, target: e.target });
  }
  function Ot(e) {
    var n = {};
    return (
      null == e ||
        e.querySelectorAll("[name]").forEach(function (e) {
          n[e.name] = e.value;
        }),
      n
    );
  }
  function Bt(e) {
    !(function (e) {
      if (!l.requestAnimationFrame) return xt(0, e);
      Tt && w(Tt);
      Tt = g(function () {
        var n = Rt,
          t = y.min(n + e, rt(At) - Ct);
        e = t - n;
        var r = 0,
          a = l.performance.now();
        function i(o) {
          if ((r += (o - a) / 300) >= 1) return It(0, t);
          var u = y.sin((zt * r) / 2);
          It(0, n + y.round(e * u)), (a = o), Pt(i);
        }
        Pt(i);
      }, 100);
    })(e - Rt);
  }
  var zt = y.PI;
  var Ft = {
    api: "https://api.razorpay.com/",
    version: "v1/",
    frameApi: "/",
    cdn: "https://cdn.razorpay.com/",
  };
  try {
    p.assign(Ft, l.Razorpay.config);
  } catch (e) {}
  var Kt = l !== l.parent,
    Ut = Kt ? l.parent : l.opener,
    $t = 3460140111,
    jt = "canary",
    Ht = "3180df89721ff39f0699d56c11e248b1e38c66a7";
  var Gt = (function () {
      try {
        var e = Ft.api;
        return (
          Kt && ((n = Ft.frameApi), ((St = Bn("a")).href = n), (e = St.href)),
          e.startsWith("https://api.razorpay.com") ||
            e.startsWith("https://api-dark.razorpay.com")
        );
      } catch (e) {
        return !1;
      }
      var n;
    })(),
    Yt = (function () {
      function e() {}
      return (
        (e.setId = function (n) {
          (e.id = n), e.sendMessage("updateInterfaceId", n);
        }),
        (e.subscribe = function (n, t) {
          e.subscriptions[n] || (e.subscriptions[n] = []),
            e.subscriptions[n].push(t);
        }),
        (e.resetSubscriptions = function (n) {
          n ? (e.subscriptions[n] = []) : (e.subscriptions = {});
        }),
        (e.publishToParent = function (n, t) {
          if ((void 0 === t && (t = {}), Ut)) {
            e.source || e.updateSource();
            var r = { data: t, id: e.id, source: e.source || "reset" },
              a = JSON.stringify({
                data: r,
                topic: n,
                source: r.source,
                time: _.now(),
              });
            Ut.postMessage(a, "*");
          }
        }),
        (e.updateSource = function () {
          Kt && window && window.location && (e.source = "checkout-frame");
        }),
        (e.sendMessage = function (n, t) {
          var r =
            e.iframeReference && e.iframeReference.contentWindow
              ? e.iframeReference.contentWindow
              : window;
          r &&
            r.postMessage(
              JSON.stringify({
                topic: n,
                data: { data: t, id: e.id, source: "checkoutjs" },
                time: _.now(),
                source: "checkoutjs",
                _module: "interface",
              }),
              "*"
            );
        }),
        (e.subscriptions = {}),
        e
      );
    })();
  Yt.updateSource(),
    Kt &&
      (Yt.publishToParent("ready"),
      Yt.subscribe("updateInterfaceId", function (e) {
        Yt.id = e.data;
      })),
    window.addEventListener("message", function (e) {
      var n = {};
      try {
        n = JSON.parse(e.data);
      } catch (e) {}
      var t = n || {},
        r = t.topic,
        a = t.data;
      r &&
        Yt.subscriptions[r] &&
        Yt.subscriptions[r].forEach(function (e) {
          e(a);
        });
    });
  var Vt = "session_created",
    Zt = "session_errored",
    Wt = !1,
    qt = !1,
    Jt = jt;
  try {
    if (0 === P.href.indexOf("https://api.razorpay.com/v1/checkout/public")) {
      var Qt = "traffic_env=",
        Xt = P.search
          .slice(1)
          .split("&")
          .filter(function (e) {
            return 0 === e.indexOf(Qt);
          })[0];
      Xt && (Jt = Xt.slice(Qt.length));
    }
  } catch (e) {}
  function er(e, n) {
    var t = (function (e) {
        return e === Vt
          ? ("checkout." + Jt + ".sessionCreated.metrics").replace(
              ".production",
              ""
            )
          : ("checkout." + Jt + ".sessionErrored.metrics").replace(
              ".production",
              ""
            );
      })(e),
      r = [{ name: t, labels: [{ type: e, env: Jt }] }];
    return n && (r[0].labels[0].severity = n), r;
  }
  function nr(e, n) {
    var t = ve(I, "sendBeacon"),
      r = { metrics: er(e, n) },
      a = {
        url: "https://lumberjack-metrics.razorpay.com/v1/frontend-metrics",
        data: {
          key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
          data: S(C(R(S(JSON.stringify(r))))),
        },
      },
      i = Oe("merchant_key") || Be("key") || "",
      o = e === Zt;
    if (
      !((i && i.indexOf("test_") > -1) || (!i && !o)) &&
      ((!Wt && e === Vt) || (!qt && e === Zt))
    )
      try {
        t ? I.sendBeacon(a.url, JSON.stringify(a.data)) : _t.post(a),
          e === Vt && (Wt = !0),
          e === Zt && (qt = !0),
          (function (e, n) {
            Kt
              ? Yt.publishToParent("syncAvailability", {
                  sessionCreated: e,
                  sessionErrored: n,
                })
              : Yt.sendMessage("syncAvailability", {
                  sessionCreated: e,
                  sessionErrored: n,
                });
          })(Wt, qt);
      } catch (e) {}
  }
  Yt.subscribe("syncAvailability", function (e) {
    var n = e.data || {},
      t = n.sessionCreated,
      r = n.sessionErrored;
    (Wt = "boolean" == typeof t ? t : Wt),
      (qt = "boolean" == typeof r ? r : qt);
  });
  var tr,
    rr,
    ar,
    ir = "rzp_device_id",
    or = 1,
    ur = "",
    cr = "",
    sr = l.screen;
  try {
    ((ar = [
      I.userAgent,
      I.language,
      new _().getTimezoneOffset(),
      I.platform,
      I.cpuClass,
      I.hardwareConcurrency,
      sr.colorDepth,
      I.deviceMemory,
      sr.width + sr.height,
      sr.width * sr.height,
      l.devicePixelRatio,
    ]),
    (tr = ar.join()),
    (rr = new l.TextEncoder("utf-8").encode(tr)),
    l.crypto.subtle.digest("SHA-1", rr).then(function (e) {
      return (ur = (function (e) {
        for (
          var n = [], t = new l.DataView(e), r = 0;
          r < t.byteLength;
          r += 4
        ) {
          var a = "00000000",
            i = (a + t.getUint32(r).toString(16)).slice(-a.length);
          n.push(i);
        }
        return n.join("");
      })(e));
    }))
      .then(function (e) {
        e &&
          ((ur = e),
          (function (e) {
            if (e) {
              try {
                cr = le.getItem(ir);
              } catch (e) {}
              if (!cr) {
                cr = [or, e, _.now(), y.random().toString().slice(-8)].join(
                  "."
                );
                try {
                  le.setItem(ir, cr);
                } catch (e) {}
              }
            }
          })(e));
      })
      .catch(m);
  } catch (e) {}
  function lr() {
    var e;
    return null != (e = cr) ? e : null;
  }
  var dr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    mr = dr.split("").reduce(function (e, n, t) {
      var r;
      return X({}, e, (((r = {})[n] = t), r));
    }, {});
  function fr(e) {
    for (var n = ""; e; ) (n = dr[e % 62] + n), (e = Cn(e / 62));
    return n;
  }
  function pr() {
    var e,
      n =
        fr(h(Sn() - 13885344e5) + h("000000" + Cn(1e6 * An())).slice(-6)) +
        fr(Cn(238328 * An())) +
        "0",
      t = 0;
    return (
      n.split("").forEach(function (r, a) {
        (e = mr[n[n.length - 1 - a]]),
          (n.length - a) % 2 && (e *= 2),
          e >= 62 && (e = (e % 62) + 1),
          (t += e);
      }),
      (e = t % 62) && (e = dr[62 - e]),
      h(n).slice(0, 13) + e
    );
  }
  var hr = pr(),
    vr = {
      library: "checkoutjs",
      platform: "browser",
      referer: P.href,
      env: "",
    };
  function _r(e) {
    var n,
      t = {
        checkout_id: e ? e.id : hr,
        "device.id": null != (n = lr()) ? n : "",
      };
    return (
      [
        "device",
        "env",
        "integration",
        "library",
        "os_version",
        "os",
        "platform_version",
        "platform",
        "referer",
      ].forEach(function (e) {
        vr[e] && (t[e] = vr[e]);
      }),
      t
    );
  }
  var yr,
    gr,
    br = [],
    wr = [],
    kr = function (e) {
      if ((e && (yr = e), br.length && "live" === yr)) {
        br.forEach(function (e) {
          ("open" === e.event ||
            ("submit" === e.event && "razorpayjs" === Er.props.library)) &&
            nr("session_created");
        });
        var n = ve(I, "sendBeacon"),
          t = {
            context: gr,
            addons: [
              {
                name: "ua_parser",
                input_key: "user_agent",
                output_key: "user_agent_parsed",
              },
            ],
            events: br.splice(0, 5),
          },
          r = {
            url: "https://lumberjack.razorpay.com/v1/track",
            data: {
              key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
              data: S(C(R(S(JSON.stringify(t))))),
            },
          };
        try {
          var a = !1;
          n && (a = I.sendBeacon(r.url, JSON.stringify(r.data))),
            a || _t.post(r);
        } catch (e) {}
      }
    };
  function Er(e, n, t, r) {
    e
      ? "test" !== (yr = e.getMode()) &&
        g(function () {
          t instanceof Error && (t = { message: t.message, stack: t.stack });
          var a = _r(e);
          (a.user_agent = null), (a.mode = "live");
          var i = tn();
          i && (a.order_id = i);
          var o = {},
            u = { options: o };
          t && (u.data = t),
            (o = p.assign(o, be(e.get()))),
            "function" == typeof e.get("handler") && (o.handler = !0);
          var c = e.get("callback_url");
          c && "string" == typeof c && (o.callback_url = !0),
            ve(o, "prefill") &&
              ["card"].forEach(function (e) {
                ve(o.prefill, e) && (o.prefill[e] = !0);
              }),
            o.image && Dn(o.image) && (o.image = "base64");
          var s = e.get("external.wallets") || [];
          (o.external_wallets = s.reduce(function (e, n) {
            var t;
            return X({}, e, (((t = {})[n] = !0), t));
          }, {})),
            hr && (u.local_order_id = hr),
            (u.build_number = $t),
            (u.experiments = me.getExperimentsFromStorage());
          var l,
            d = Oe("experiments");
          try {
            he(d) && (u.backendExperiments = X({}, d));
          } catch (e) {}
          (l = { event: n, properties: u, timestamp: Sn() }),
            br.push(l),
            (gr = a),
            r && kr();
        })
      : wr.push([n, t, r]);
  }
  b(function () {
    kr();
  }, 1e3),
    (Er.dispatchPendingEvents = function (e) {
      if (e) {
        var n = Er.bind(Er, e);
        wr.splice(0, wr.length).forEach(function (e) {
          n.apply(Er, e);
        });
      }
    }),
    (Er.parseAnalyticsData = function (e) {
      gn(e) &&
        ke(e, function (e, n) {
          vr[n] = e;
        });
    }),
    (Er.makeUid = pr),
    (Er.common = _r),
    (Er.props = vr),
    (Er.id = hr),
    (Er.updateUid = function (e) {
      (hr = e), (Er.id = e);
    }),
    (Er.flush = kr);
  var Sr = function (e, n) {
    var t,
      r = { tags: n };
    switch (!0) {
      case !e:
        r.message = "NA";
        break;
      case "string" == typeof e:
        r.message = e;
        break;
      case "object" == typeof e &&
        ((t = e),
        ["source", "step", "description", "reason", "code", "metadata"].every(
          function (e) {
            return t.hasOwnProperty(e);
          }
        )):
        r = X({}, JSON.parse(JSON.stringify(e)), {
          message: "[NETWORK ERROR] " + e.description,
        });
        break;
      case "object" == typeof e:
        var a = e.name,
          i = e.message,
          o = e.stack,
          u = e.fileName,
          c = e.lineNumber,
          s = e.columnNumber;
        r = X({}, JSON.parse(JSON.stringify(e)), {
          name: a,
          message: i,
          stack: o,
          fileName: u,
          lineNumber: c,
          columnNumber: s,
          tags: n,
        });
        break;
      default:
        r.message = JSON.stringify(e);
    }
    return r;
  };
  var Ar,
    Cr = "S0",
    Rr = "S1",
    xr = "S2",
    Ir = "S3",
    Pr = "js_error",
    Dr = {},
    Nr = {},
    Tr = {
      setR: function (e) {
        (Ar = e), Er.dispatchPendingEvents(e);
      },
      track: function (e, n) {
        var t,
          r = void 0 === n ? {} : n,
          a = r.type,
          i = r.data,
          o = void 0 === i ? {} : i,
          u = r.r,
          c = void 0 === u ? Ar : u,
          s = r.immediately,
          l = void 0 !== s && s,
          d = r.isError;
        try {
          d &&
            !c &&
            (c = {
              id: Er.id,
              getMode: function () {
                return "live";
              },
              get: function (e) {
                return "string" != typeof e && {};
              },
            });
          var m =
            ((t = ge(Dr)),
            ke(t, function (e, n) {
              pn(e) && (t[n] = e.call());
            }),
            t);
          (o = (function (e) {
            var n = we(e || {});
            return (
              ["token"].forEach(function (e) {
                n[e] && (n[e] = "__REDACTED__");
              }),
              n
            );
          })(o)),
            (o = gn(o) ? we(o) : { data: o }).meta &&
              gn(o.meta) &&
              (m = p.assign(m, o.meta)),
            (o.meta = m),
            (o.meta.request_index = c ? Nr[c.id] : null),
            a && (e = a + ":" + e),
            Er(c, e, o, l);
        } catch (e) {
          Er(
            c,
            Pr,
            { data: { error: Sr(e, { severity: xr, unhandled: !1 }) } },
            !0
          );
        }
      },
      setMeta: function (e, n) {
        Dr[e] = n;
      },
      removeMeta: function (e) {
        delete Dr[e];
      },
      getMeta: function () {
        return be(Dr);
      },
      updateRequestIndex: function (e) {
        if (!Ar || !e) return 0;
        ve(Nr, Ar.id) || (Nr[Ar.id] = {});
        var n = Nr[Ar.id];
        return ve(n, e) || (n[e] = -1), (n[e] += 1), n[e];
      },
    },
    Mr = function (e, n) {
      if (!e) return n;
      var t = {};
      return (
        p.keys(n).forEach(function (r) {
          var a = n[r];
          "__PREFIX" !== r || "__PREFIX" !== a
            ? (t[r] = e + ":" + a)
            : (t[e.toUpperCase()] = "" + e);
        }),
        t
      );
    },
    Lr = Mr(
      "card",
      X(
        {},
        { ADD_NEW_CARD: "add_new" },
        {
          APP_SELECT: "app:select",
          ADD_CARD_SCREEN_RENDERED: "1cc_payments_add_new_card_screen_loaded",
          SAVED_CARD_SCREEN_RENDERED: "1cc_payments_saved_card_screen_loaded",
        }
      )
    ),
    Or = Mr("saved_cards", {
      __PREFIX: "__PREFIX",
      CHECK_SAVED_CARDS: "check",
      HIDE_SAVED_CARDS: "hide",
      SHOW_SAVED_CARDS: "show",
      SKIP_SAVED_CARDS: "skip",
      EMI_PLAN_VIEW_SAVED_CARDS: "emi:plans:view",
      OTP_SUBMIT_SAVED_CARDS: "save:otp:submit",
      ACCESS_OTP_SUBMIT_SAVED_CARDS: "access:otp:submit",
      USER_CONSENT_FOR_TOKENIZATION: "user_consent_for_tokenization",
      TOKENIZATION_KNOW_MORE_MODAL: "tokenization_know_more_modal",
    }),
    Br = Mr("emi", {
      VIEW_EMI_PLANS: "plans:view",
      EDIT_EMI_PLANS: "plans:edit",
      PAY_WITHOUT_EMI: "pay_without",
      VIEW_ALL_EMI_PLANS: "plans:view:all",
      SELECT_EMI_PLAN: "plan:select",
      CHOOSE_EMI_PLAN: "plan:choose",
      EMI_PLANS: "plans",
      EMI_CONTACT: "contact",
      EMI_CONTACT_FILLED: "contact:filled",
    }),
    zr = X(
      {},
      {
        SHOW_AVS_SCREEN: "avs_screen:show",
        LOAD_AVS_FORM: "avs_screen:load_form",
        AVS_FORM_DATA_INPUT: "avs_screen:form_data_input",
        AVS_FORM_SUBMIT: "avs_screen:form_submit",
      },
      { HIDE_ADD_CARD_SCREEN: "add_cards:hide" },
      {
        SHOW_PAYPAL_RETRY_SCREEN: "paypal_retry:show",
        SHOW_PAYPAL_RETRY_ON_OTP_SCREEN: "paypal_retry:show:otp_screen",
        PAYPAL_RETRY_CANCEL_BTN_CLICK: "paypal_retry:cancel_click",
        PAYPAL_RETRY_PAYPAL_BTN_CLICK: "paypal_retry:paypal_click",
        PAYPAL_RETRY_PAYPAL_ENABLED: "paypal_retry:paypal_enabled",
      }
    );
  X({}, Lr, Or, Br, zr);
  var Fr = Mr("cred", {
    ELIGIBILITY_CHECK: "eligibility_check",
    SUBTEXT_OFFER_EXPERIMENT: "subtext_offer_experiment",
    EXPERIMENT_OFFER_SELECTED: "experiment_offer_selected",
  });
  Mr("offer", X({}, { APPLY: "apply" }));
  Mr(
    "p13n",
    X(
      {},
      {
        INSTRUMENTS_SHOWN: "instruments_shown",
        INSTRUMENTS_LIST: "instruments:list",
      }
    )
  );
  Mr(
    "home",
    X(
      {},
      {
        HOME_LOADED: "checkoutHomeScreenLoaded",
        HOME_LOADED_V2: "1cc_payment_home_screen_loaded",
        PAYMENT_INSTRUMENT_SELECTED: "checkoutPaymentInstrumentSelected",
        PAYMENT_INSTRUMENT_SELECTED_V2:
          "1cc_payment_home_screen_instrument_selected",
        PAYMENT_METHOD_SELECTED: "checkoutPaymentMethodSelected",
        PAYMENT_METHOD_SELECTED_V2: "1cc_payment_home_screen_method_selected",
        METHODS_SHOWN: "methods:shown",
        METHODS_HIDE: "methods:hide",
        P13N_EXPERIMENT: "p13n:experiment",
        LANDING: "landing",
        PROCEED: "proceed",
        CONTACT_SCREEN_LOAD: "complete:contact_details",
        PAYPAL_RENDERED: "paypal:render",
      }
    )
  );
  Mr("order", X({}, { INVALID_TPV: "invalid_tpv" }));
  var Kr = "automatic_checkout_open",
    Ur = "automatic_checkout_click",
    $r = "intl_missing";
  Mr(
    "downtime",
    X(
      {},
      {
        ALERT_SHOW: "alert:show",
        CALLOUT_SHOW: "callout:show",
        DOWNTIME_ALERTSHOW: "alert:show",
      }
    )
  );
  var jr = (function () {
    var e = {};
    return (
      p.keys(oe).forEach(function (n) {
        var t = oe[n],
          r = "Track" + t.charAt(0).toUpperCase() + t.slice(1);
        e[r] = function (e, n) {
          Tr.track(e, { type: t, data: n });
        };
      }),
      (e.Track = function (e, n) {
        Tr.track(e, { data: n });
      }),
      e
    );
  })();
  function Hr(e, n, t, r, a, i, o) {
    try {
      var u = e[i](o),
        c = u.value;
    } catch (e) {
      return void t(e);
    }
    u.done ? n(c) : Promise.resolve(c).then(r, a);
  }
  jr = (function (e) {
    return X({}, e, {
      setMeta: Tr.setMeta,
      removeMeta: Tr.removeMeta,
      updateRequestIndex: Tr.updateRequestIndex,
      setR: Tr.setR,
    });
  })(jr);
  var Gr,
    Yr,
    Vr =
      ((Gr = function (e) {
        var n = (function (e) {
          var n,
            t = p.prototype,
            r = t.hasOwnProperty,
            a = "function" == typeof Symbol ? Symbol : {},
            i = a.iterator || "@@iterator",
            o = a.asyncIterator || "@@asyncIterator",
            u = a.toStringTag || "@@toStringTag";
          function c(e, n, t) {
            return (
              p.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              e[n]
            );
          }
          try {
            c({}, "");
          } catch (e) {
            c = function (e, n, t) {
              return (e[n] = t);
            };
          }
          function s(e, n, t, r) {
            var a = n && n.prototype instanceof _ ? n : _,
              i = p.create(a.prototype),
              o = new P(r || []);
            return (
              (i._invoke = (function (e, n, t) {
                var r = d;
                return function (a, i) {
                  if (r === f) throw new Error("Generator is already running");
                  if (r === h) {
                    if ("throw" === a) throw i;
                    return N();
                  }
                  for (t.method = a, t.arg = i; ; ) {
                    var o = t.delegate;
                    if (o) {
                      var u = C(o, t);
                      if (u) {
                        if (u === v) continue;
                        return u;
                      }
                    }
                    if ("next" === t.method) t.sent = t._sent = t.arg;
                    else if ("throw" === t.method) {
                      if (r === d) throw ((r = h), t.arg);
                      t.dispatchException(t.arg);
                    } else "return" === t.method && t.abrupt("return", t.arg);
                    r = f;
                    var c = l(e, n, t);
                    if ("normal" === c.type) {
                      if (((r = t.done ? h : m), c.arg === v)) continue;
                      return { value: c.arg, done: t.done };
                    }
                    "throw" === c.type &&
                      ((r = h), (t.method = "throw"), (t.arg = c.arg));
                  }
                };
              })(e, t, o)),
              i
            );
          }
          function l(e, n, t) {
            try {
              return { type: "normal", arg: e.call(n, t) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          e.wrap = s;
          var d = "suspendedStart",
            m = "suspendedYield",
            f = "executing",
            h = "completed",
            v = {};
          function _() {}
          function y() {}
          function g() {}
          var b = {};
          b[i] = function () {
            return this;
          };
          var w = p.getPrototypeOf,
            k = w && w(w(D([])));
          k && k !== t && r.call(k, i) && (b = k);
          var E = (g.prototype = _.prototype = p.create(b));
          function S(e) {
            ["next", "throw", "return"].forEach(function (n) {
              c(e, n, function (e) {
                return this._invoke(n, e);
              });
            });
          }
          function A(e, n) {
            function t(a, i, o, u) {
              var c = l(e[a], e, i);
              if ("throw" !== c.type) {
                var s = c.arg,
                  d = s.value;
                return d && "object" == typeof d && r.call(d, "__await")
                  ? n.resolve(d.__await).then(
                      function (e) {
                        t("next", e, o, u);
                      },
                      function (e) {
                        t("throw", e, o, u);
                      }
                    )
                  : n.resolve(d).then(
                      function (e) {
                        (s.value = e), o(s);
                      },
                      function (e) {
                        return t("throw", e, o, u);
                      }
                    );
              }
              u(c.arg);
            }
            var a;
            this._invoke = function (e, r) {
              function i() {
                return new n(function (n, a) {
                  t(e, r, n, a);
                });
              }
              return (a = a ? a.then(i, i) : i());
            };
          }
          function C(e, t) {
            var r = e.iterator[t.method];
            if (r === n) {
              if (((t.delegate = null), "throw" === t.method)) {
                if (
                  e.iterator.return &&
                  ((t.method = "return"),
                  (t.arg = n),
                  C(e, t),
                  "throw" === t.method)
                )
                  return v;
                (t.method = "throw"),
                  (t.arg = new x(
                    "The iterator does not provide a 'throw' method"
                  ));
              }
              return v;
            }
            var a = l(r, e.iterator, t.arg);
            if ("throw" === a.type)
              return (
                (t.method = "throw"), (t.arg = a.arg), (t.delegate = null), v
              );
            var i = a.arg;
            return i
              ? i.done
                ? ((t[e.resultName] = i.value),
                  (t.next = e.nextLoc),
                  "return" !== t.method && ((t.method = "next"), (t.arg = n)),
                  (t.delegate = null),
                  v)
                : i
              : ((t.method = "throw"),
                (t.arg = new x("iterator result is not an object")),
                (t.delegate = null),
                v);
          }
          function R(e) {
            var n = { tryLoc: e[0] };
            1 in e && (n.catchLoc = e[1]),
              2 in e && ((n.finallyLoc = e[2]), (n.afterLoc = e[3])),
              this.tryEntries.push(n);
          }
          function I(e) {
            var n = e.completion || {};
            (n.type = "normal"), delete n.arg, (e.completion = n);
          }
          function P(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(R, this),
              this.reset(!0);
          }
          function D(e) {
            if (e) {
              var t = e[i];
              if (t) return t.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var a = -1,
                  o = function t() {
                    for (; ++a < e.length; )
                      if (r.call(e, a))
                        return (t.value = e[a]), (t.done = !1), t;
                    return (t.value = n), (t.done = !0), t;
                  };
                return (o.next = o);
              }
            }
            return { next: N };
          }
          function N() {
            return { value: n, done: !0 };
          }
          return (
            (y.prototype = E.constructor = g),
            (g.constructor = y),
            (y.displayName = c(g, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (e) {
              var n = "function" == typeof e && e.constructor;
              return (
                !!n &&
                (n === y || "GeneratorFunction" === (n.displayName || n.name))
              );
            }),
            (e.mark = function (e) {
              return (
                p.setPrototypeOf
                  ? p.setPrototypeOf(e, g)
                  : ((e.__proto__ = g), c(e, u, "GeneratorFunction")),
                (e.prototype = p.create(E)),
                e
              );
            }),
            (e.awrap = function (e) {
              return { __await: e };
            }),
            S(A.prototype),
            (A.prototype[o] = function () {
              return this;
            }),
            (e.AsyncIterator = A),
            (e.async = function (n, t, r, a, i) {
              void 0 === i && (i = Promise);
              var o = new A(s(n, t, r, a), i);
              return e.isGeneratorFunction(t)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            S(E),
            c(E, u, "Generator"),
            (E[i] = function () {
              return this;
            }),
            (E.toString = function () {
              return "[object Generator]";
            }),
            (e.keys = function (e) {
              var n = [];
              for (var t in e) n.push(t);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = D),
            (P.prototype = {
              constructor: P,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = n),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = n),
                  this.tryEntries.forEach(I),
                  !e)
                )
                  for (var t in this)
                    "t" === t.charAt(0) &&
                      r.call(this, t) &&
                      !isNaN(+t.slice(1)) &&
                      (this[t] = n);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var t = this;
                function a(r, a) {
                  return (
                    (u.type = "throw"),
                    (u.arg = e),
                    (t.next = r),
                    a && ((t.method = "next"), (t.arg = n)),
                    !!a
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var o = this.tryEntries[i],
                    u = o.completion;
                  if ("root" === o.tryLoc) return a("end");
                  if (o.tryLoc <= this.prev) {
                    var c = r.call(o, "catchLoc"),
                      s = r.call(o, "finallyLoc");
                    if (c && s) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    } else if (c) {
                      if (this.prev < o.catchLoc) return a(o.catchLoc, !0);
                    } else {
                      if (!s)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return a(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, n) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var a = this.tryEntries[t];
                  if (
                    a.tryLoc <= this.prev &&
                    r.call(a, "finallyLoc") &&
                    this.prev < a.finallyLoc
                  ) {
                    var i = a;
                    break;
                  }
                }
                i &&
                  ("break" === e || "continue" === e) &&
                  i.tryLoc <= n &&
                  n <= i.finallyLoc &&
                  (i = null);
                var o = i ? i.completion : {};
                return (
                  (o.type = e),
                  (o.arg = n),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                    : this.complete(o)
                );
              },
              complete: function (e, n) {
                if ("throw" === e.type) throw e.arg;
                return (
                  "break" === e.type || "continue" === e.type
                    ? (this.next = e.arg)
                    : "return" === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === e.type && n && (this.next = n),
                  v
                );
              },
              finish: function (e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var t = this.tryEntries[n];
                  if (t.finallyLoc === e)
                    return this.complete(t.completion, t.afterLoc), I(t), v;
                }
              },
              catch: function (e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var t = this.tryEntries[n];
                  if (t.tryLoc === e) {
                    var r = t.completion;
                    if ("throw" === r.type) {
                      var a = r.arg;
                      I(t);
                    }
                    return a;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, t, r) {
                return (
                  (this.delegate = {
                    iterator: D(e),
                    resultName: t,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = n),
                  v
                );
              },
            }),
            e
          );
        })(e.exports);
        try {
          regeneratorRuntime = n;
        } catch (e) {
          Function("r", "regeneratorRuntime = r")(n);
        }
      }),
      Gr((Yr = { exports: {} }), Yr.exports),
      Yr.exports),
    Zr = Vr,
    Wr = I.userAgent,
    qr = I.vendor;
  function Jr(e) {
    return e.test(Wr);
  }
  function Qr(e) {
    return e.test(qr);
  }
  var Xr = Jr(/MSIE |Trident\//),
    ea = Jr(/iPhone/),
    na = ea || Jr(/iPad/),
    ta = Jr(/Android/),
    ra = Jr(/iPad/),
    aa = Jr(/Windows NT/),
    ia = Jr(/Linux/),
    oa = Jr(/Mac OS/);
  Jr(/^((?!chrome|android).)*safari/i) || Qr(/Apple/),
    Jr(/firefox/),
    Jr(/Chrome/) && Qr(/Google Inc/);
  var ua = Jr(/; wv\) |Gecko\) Version\/[^ ]+ Chrome/);
  Jr(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);
  var ca = Jr(/Instagram/);
  Jr(/SamsungBrowser/);
  var sa = Jr(/FB_IAB/),
    la = Jr(/FBAN/),
    da = sa || la;
  function ma() {
    return da || ca;
  }
  var fa =
    Jr(
      /; wv\) |Gecko\) Version\/[^ ]+ Chrome|Windows Phone|Opera Mini|UCBrowser|CriOS/
    ) ||
    ma() ||
    na ||
    Jr(/Android 4/);
  Jr(/iPhone/), Wr.match(/Chrome\/(\d+)/);
  var pa = function () {
      var e;
      return (
        !l.matchMedia ||
        (null ==
        (e = l.matchMedia(
          "(max-device-height: 485px),(max-device-width: 485px)"
        ))
          ? void 0
          : e.matches)
      );
    },
    ha = (function () {
      var e = (function (e) {
        return function () {
          var n = this,
            t = arguments;
          return new Promise(function (r, a) {
            var i = e.apply(n, t);
            function o(e) {
              Hr(i, r, a, o, u, "next", e);
            }
            function u(e) {
              Hr(i, r, a, o, u, "throw", e);
            }
            o(void 0);
          });
        };
      })(
        Zr.mark(function e() {
          return Zr.wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (!I.brave) {
                      e.next = 10;
                      break;
                    }
                    return (e.prev = 1), (e.next = 4), I.brave.isBrave();
                  case 4:
                    return e.abrupt("return", e.sent);
                  case 7:
                    return (
                      (e.prev = 7), (e.t0 = e.catch(1)), e.abrupt("return", !1)
                    );
                  case 10:
                    return e.abrupt("return", !1);
                  case 11:
                  case "end":
                    return e.stop();
                }
            },
            e,
            null,
            [[1, 7]]
          );
        })
      );
      return function () {
        return e.apply(this, arguments);
      };
    })();
  Jr(/(Vivo|HeyTap|Realme|Oppo)Browser/);
  var va = function () {
    return ea
      ? "iPhone"
      : ra
      ? "iPad"
      : ta
      ? "android"
      : pa()
      ? "mobile"
      : "desktop";
  };
  function _a(e) {
    return e.reduce(function (e, n) {
      return (
        (e[n.name] = {
          enabled: n.enabled,
          loaded: n.loaded,
          pendingQ: null,
          config: n,
        }),
        e
      );
    }, {});
  }
  var ya = function () {};
  function ga(e, n) {
    var t,
      r,
      a,
      i = (n = n || {}).initial || [],
      o = n.max || 1 / 0,
      u = n.interval || 1e3,
      c = n.onEmpty || ya,
      s = n.onPause || ya;
    function l(n) {
      k(t);
      var r = i.splice(0, o);
      return r.length && e(r, i), i.length ? (n ? l() : d()) : ((a = !1), c());
    }
    function d() {
      (a = !0), (t = b(l, u));
    }
    return (
      i.length && d(),
      {
        flush: function (e) {
          void 0 === e && (e = !1), l(e);
        },
        resume: l,
        push: function (e) {
          return (r = i.push(e)), a || d(), r;
        },
        size: function () {
          return i.length;
        },
        pause: function (e) {
          void 0 === e && (e = !1), e && l(), k(t), (a = !1), s(i);
        },
      }
    );
  }
  var ba = {
    USER_ID_UPDATED: "userIdUpdated",
    ANON_ID_UPDATED: "anonymousIdUpdated",
  };
  function wa(e, n, t, r) {
    void 0 === t && (t = { isImmediate: !1 });
    var a,
      i = new _(_.now()).toISOString(),
      o = ue(ue({}, e), { originalTimestamp: i });
    ((a = n.plugins),
    p
      .keys(a)
      .filter(function (e) {
        var n;
        return !!(null === (n = a[e]) || void 0 === n ? void 0 : n.enabled);
      })
      .map(function (e) {
        return a[e];
      })).forEach(function (e) {
      var n,
        a = null === (n = e.config) || void 0 === n ? void 0 : n[r];
      "function" == typeof a &&
        ((null == e ? void 0 : e.loaded()) || "initialize" === r
          ? a(o, t)
          : (function (e, n, t, r) {
              e.pendingQ ||
                (e.pendingQ = ga(
                  function (n) {
                    n.forEach(function (n) {
                      var r,
                        a,
                        i = n.payload,
                        o = n.type,
                        u =
                          null === (r = e.config) || void 0 === r
                            ? void 0
                            : r[o];
                      e.loaded()
                        ? u && u(i, t)
                        : null === (a = e.pendingQ) ||
                          void 0 === a ||
                          a.push({ payload: i, type: o });
                    });
                  },
                  { interval: 1e3 }
                )),
                e.pendingQ.push({ payload: n, type: r });
            })(e, o, t, r));
    });
  }
  function ka() {
    var e = window.crypto || window.msCrypto;
    if (void 0 !== e && e.getRandomValues) {
      var n = new Uint16Array(8);
      e.getRandomValues(n),
        (n[3] = (4095 & n[3]) | 16384),
        (n[4] = (16383 & n[4]) | 32768);
      var t = function (e) {
        for (var n = e.toString(16); n.length < 4; ) n = "0".concat(n);
        return n;
      };
      return (
        t(n[0]) +
        t(n[1]) +
        t(n[2]) +
        t(n[3]) +
        t(n[4]) +
        t(n[5]) +
        t(n[6]) +
        t(n[7])
      );
    }
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
      var n = (16 * y.random()) | 0;
      return ("x" === e ? n : (3 & n) | 8).toString(16);
    });
  }
  function Ea(e, n, t) {
    e[n].forEach(function (e) {
      e(t);
    });
  }
  var Sa,
    Aa = (function () {
      function e(e) {
        var n,
          t,
          r,
          a,
          i = e.app,
          o = e.plugins,
          u = void 0 === o ? [] : o,
          c = {
            locale:
              ((n = I),
              (t = n.language),
              (r = n.languages),
              (a = n.userLanguage),
              a || (r && r.length ? r[0] : t) || ""),
            userAgent: I.userAgent,
            referrer: d.referrer,
            screen: {
              height: window.screen.height,
              width: window.screen.width,
              availHeight: window.screen.availHeight,
              availWidth: window.screen.availWidth,
              innerHeight: window.innerHeight,
              innerWidth: window.innerWidth,
            },
            platform: va(),
          };
        (this.flattenedContext = ge(c)),
          (this.userIdKey = "".concat(i, "_user_id")),
          (this.anonIdKey = "".concat(i, "_anon_id")),
          le.getItem(this.anonIdKey) || this.setAnonymousId(ka()),
          (this.state = {
            app: i,
            anonymousId: le.getItem(this.anonIdKey) || "",
            userId: le.getItem(this.userIdKey) || "",
            context: c,
            plugins: _a(u),
            subscriptions: p.keys(ba).reduce(function (e, n) {
              return (e[ba[n]] = []), e;
            }, {}),
          }),
          wa({}, this.state, {}, "initialize");
      }
      return (
        (e.prototype.setAnonymousId = function (e) {
          le.setItem(this.anonIdKey, e),
            this.state &&
              ((this.state.anonymousId = e),
              Ea(this.state.subscriptions, ba.ANON_ID_UPDATED, e));
        }),
        (e.prototype.setUserId = function (e) {
          le.setItem(this.userIdKey, e),
            this.state &&
              ((this.state.userId = e),
              Ea(this.state.subscriptions, ba.USER_ID_UPDATED, e));
        }),
        (e.prototype.on = function (e, n) {
          p.values(ba).includes(e) &&
            (function (e, n, t) {
              e[n].push(t);
            })(this.state.subscriptions, e, n);
        }),
        (e.prototype.setContext = function (e, n) {
          this.flattenedContext[e] = n;
        }),
        (e.prototype.track = function (e, n, t) {
          wa(
            {
              event: e,
              properties: n,
              userId: this.state.userId,
              anonymousId: this.state.anonymousId,
              context: be(this.flattenedContext),
              type: "track",
            },
            this.state,
            t,
            "track"
          );
        }),
        (e.prototype.identify = function (e, n, t) {
          this.setUserId(e),
            wa(
              {
                anonymousId: this.state.anonymousId,
                userId: e,
                traits: n,
                type: "identify",
              },
              this.state,
              t,
              "identify"
            );
        }),
        (e.prototype.reset = function () {
          this.setAnonymousId(ka()), this.setUserId("");
        }),
        (e.prototype.getState = function () {
          return ue(ue({}, this.state), { context: be(this.flattenedContext) });
        }),
        e
      );
    })();
  function Ca(e) {
    var n = e.method,
      t = void 0 === n ? "post" : n,
      r = e.url,
      a = e.key,
      i = e.data,
      o = void 0 === i ? {} : i;
    try {
      return new Promise(function (e, n) {
        _t({
          method: t,
          url: r,
          data: JSON.stringify(o),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic ".concat(C("".concat(a, ":"))),
          },
          callback: function (t) {
            200 !== t.status_code && n(t), e(t);
          },
        });
      });
    } catch (e) {
      return Promise.reject();
    }
  }
  function Ra(e) {
    var n = e.url,
      t = e.key,
      r = e.events,
      a = e.useBeacon;
    try {
      var i = !1;
      return (
        a &&
          (i = (function (e) {
            var n = e.url,
              t = e.key,
              r = e.data;
            try {
              var a = JSON.stringify(r),
                i = new Blob([a], { type: "text/plain" });
              return I.sendBeacon("".concat(n, "?writeKey=").concat(t), i);
            } catch (e) {
              return !1;
            }
          })({
            url: "".concat(n, "/beacon/v1/batch"),
            key: t,
            data: { batch: r },
          })),
        i
          ? Promise.resolve()
          : Ca({ url: "".concat(n, "/v1/batch"), key: t, data: { batch: r } })
      );
    } catch (e) {
      return Promise.reject();
    }
  }
  !(function (e) {
    (e.CONSOLE_PLUGIN = "CONSOLE_PLUGIN"),
      (e.RUDDERSTACK_PLUGIN = "RUDDERSTACK_PLUGIN");
  })(Sa || (Sa = {}));
  function xa(e) {
    return e;
  }
  var Ia = void 0 !== I && I && "function" == typeof I.sendBeacon;
  var Pa,
    Da,
    Na = "checkout.id",
    Ta = "checkout.referrerType",
    Ma = "checkout.integration.name",
    La = "checkout.integration.type",
    Oa = "checkout.integration.version",
    Ba = "checkout.integration.parentVersion",
    za = "checkout.integration.platform",
    Fa = "checkout.library",
    Ka = "checkout.order.id",
    Ua = "checkout.version",
    $a = "locale",
    ja = "traits.contact",
    Ha = "traits.email",
    Ga = "referrer",
    Ya = Gt
      ? "https://rudderstack.razorpay.com"
      : "https://rudderstack.ext.dev.razorpay.in",
    Va = Gt ? "2Fle0rY1hHoLCMetOdzYFs1RIJF" : "27TM2uVMCl4nm4d7gqR4tysvdU1";
  !(function (e) {
    (e.INTEGRATION = "integration"),
      (e.RZP_APP = "rzp_app"),
      (e.EXTERNAL = "external");
  })(Pa || (Pa = {})),
    (function (e) {
      (e.WEB = "web"), (e.PLUGIN = "plugin"), (e.SDK = "sdk");
    })(Da || (Da = {}));
  var Za,
    Wa,
    qa,
    Ja,
    Qa,
    Xa = new Aa({
      app: "rzp_checkout",
      plugins: [
        {
          name: Sa.CONSOLE_PLUGIN,
          track: function (e) {},
          identify: function (e) {},
          loaded: function () {
            return !0;
          },
          enabled: !1,
        },
        ue(
          ue(
            {},
            ((Za = { domainUrl: Ya, key: Va }),
            (Wa = Za.domainUrl),
            (qa = Za.key),
            (Ja = null),
            (Qa = !0),
            {
              name: Sa.RUDDERSTACK_PLUGIN,
              initialize: function () {
                (Ja = ga(
                  function (e) {
                    try {
                      var n = new _(_.now()).toISOString();
                      (e = e.map(function (e) {
                        return ue(ue({}, "object" == typeof e ? e : null), {
                          sentAt: n,
                        });
                      })),
                        Ra({
                          url: Wa,
                          key: qa,
                          events: e,
                          useBeacon: Qa && Ia,
                        }).catch(xa);
                    } catch (e) {}
                  },
                  { max: 10, interval: 1e3 }
                )),
                  window.addEventListener("beforeunload", function () {
                    (Qa = !0), null == Ja || Ja.flush(!0);
                  }),
                  window.addEventListener("offline", function () {
                    null == Ja || Ja.pause();
                  }),
                  window.addEventListener("online", function () {
                    null == Ja || Ja.resume();
                  });
              },
              track: function (e, n) {
                null == Ja || Ja.push(e),
                  n.isImmediate && (null == Ja || Ja.flush());
              },
              identify: function (e) {
                (function (e) {
                  var n = e.url,
                    t = e.key,
                    r = e.payload;
                  return Ca({
                    url: "".concat(n, "/v1/identify"),
                    key: t,
                    data: r,
                  });
                })({ url: Wa, key: qa, payload: e }).catch(xa);
              },
              loaded: function () {
                return !0;
              },
              enabled: !0,
            })
          ),
          { enabled: !0 }
        ),
      ],
    });
  Yt.subscribe("syncContext", function (e) {
    var n, t;
    e.data && ((n = e.data.key), (t = e.data.value)), n && Xa.setContext(n, t);
  }),
    Yt.subscribe("syncAnonymousId", function (e) {
      var n;
      (null === (n = e.data) || void 0 === n ? void 0 : n.anonymousId) &&
        Xa.setAnonymousId(e.data.anonymousId);
    }),
    Yt.subscribe("syncUserId", function (e) {
      var n;
      (null === (n = e.data) || void 0 === n ? void 0 : n.userId) &&
        Xa.setUserId(e.data.userId);
    });
  var ei = {};
  function ni(e, n) {
    var t = (void 0 === n ? { skipEvents: !1 } : n).skipEvents,
      r = p.keys(e),
      a = {};
    return (
      r.forEach(function (n) {
        a[n] = (function (e, n, t) {
          return function () {
            for (var r = [], a = 0; a < arguments.length; a++)
              r[a] = arguments[a];
            if (!t) {
              var i = e[n],
                o = r[0],
                u = r[1];
              if ("string" == typeof i) Xa.track(i, o, u);
              else if (i.name) {
                var c = i.name;
                i.type &&
                  ((c = "".concat(i.type, " ").concat(c)),
                  (ei[i.type] = { event: c })),
                  Xa.track(c, o, u);
              }
            }
          };
        })(e, n, t);
      }),
      a
    );
  }
  var ti = {
      setContext: function (e, n, t) {
        void 0 === t && (t = !0),
          Xa.setContext(e, n),
          t &&
            (function (e, n) {
              Kt
                ? Yt.publishToParent("syncContext", { key: e, value: n })
                : Yt.sendMessage("syncContext", { key: e, value: n });
            })(e, n);
      },
      getState: function () {
        return ue(ue({}, Xa.getState()), { last: ei });
      },
      Identify: Xa.identify.bind(Xa),
      Reset: Xa.reset.bind(Xa),
      createTrackMethodForModule: ni,
    },
    ri = ni({ TRIGGERED: { name: "triggered", type: ie } }),
    ai = function (e, n) {
      var t = n.analytics,
        r = n.severity,
        a = void 0 === r ? Rr : r,
        i = n.unhandled,
        o = void 0 !== i && i;
      try {
        var u,
          c = t || {},
          s = c.event,
          l = c.data,
          d = c.immediately,
          f = void 0 === d || d;
        if ("razorpayjs" !== Er.props.library && !Gt) return;
        var p = "string" == typeof s ? s : Pr;
        (a !== Cr && a !== Rr) || nr("session_errored", a),
          Tr.track(p, {
            data: X({}, "object" == typeof l ? l : {}, {
              error: Sr(e, { severity: a, unhandled: o }),
            }),
            immediately: m(f),
            isError: !0,
          }),
          ri.TRIGGERED({
            error: Sr(e, { severity: a, unhandled: o }),
            last: null == (u = ti.getState()) ? void 0 : u.last,
          });
      } catch (e) {}
    };
  function ii() {
    return (this._evts = {}), (this._defs = {}), this;
  }
  ii.prototype = {
    onNew: xa,
    def: function (e, n) {
      this._defs[e] = n;
    },
    on: function (e, n) {
      if (fn(e) && pn(n)) {
        var t = this._evts;
        t[e] || (t[e] = []), !1 !== this.onNew(e, n) && t[e].push(n);
      }
      return this;
    },
    once: function (e, n) {
      var t = n,
        r = this;
      return (
        (n = function n() {
          t.apply(r, arguments), r.off(e, n);
        }),
        this.on(e, n)
      );
    },
    off: function (e, n) {
      var t = arguments.length;
      if (!t) return ii.call(this);
      var r = this._evts;
      if (2 === t) {
        var a = r[e];
        if (!pn(n) || !vn(a)) return;
        if ((a.splice(a.indexOf(n), 1), a.length)) return;
      }
      return (
        r[e]
          ? delete r[e]
          : ((e += "."),
            ke(r, function (n, t) {
              t.indexOf(e) || delete r[t];
            })),
        this
      );
    },
    emit: function (e, n) {
      var t = this;
      return (
        (this._evts[e] || []).forEach(function (e) {
          try {
            e.call(t, n);
          } catch (e) {
            console.error &&
              "razorpayjs" === Er.props.library &&
              (["TypeError", "ReferenceError"].indexOf(
                null == e ? void 0 : e.name
              ),
              ai(e, { severity: xr }));
          }
        }),
        this
      );
    },
    emitter: function () {
      var e = arguments,
        n = this;
      return function () {
        n.emit.apply(n, e);
      };
    },
  };
  var oi = {
    key: "",
    account_id: "",
    image: "",
    amount: 100,
    currency: "INR",
    order_id: "",
    invoice_id: "",
    subscription_id: "",
    auth_link_id: "",
    payment_link_id: "",
    notes: null,
    disable_redesign_v15: null,
    callback_url: "",
    redirect: !1,
    description: "",
    customer_id: "",
    recurring: null,
    payout: null,
    contact_id: "",
    signature: "",
    retry: !0,
    target: "",
    subscription_card_change: null,
    display_currency: "",
    display_amount: "",
    recurring_token: { max_amount: 0, expire_by: 0 },
    checkout_config_id: "",
    send_sms_hash: !1,
    show_address: !0,
    show_coupons: !0,
    mandatory_login: !1,
    enable_ga_analytics: !1,
    enable_fb_analytics: !1,
    customer_cart: {},
    script_coupon_applied: !1,
    disable_emi_ux: null,
  };
  function ui(e, n, t, r) {
    var a = n[(t = t.toLowerCase())],
      i = typeof a;
    "object" === i && null === a
      ? fn(r) &&
        ("true" === r || "1" === r
          ? (r = !0)
          : ("false" !== r && "0" !== r) || (r = !1))
      : "string" === i && (mn(r) || dn(r))
      ? (r = h(r))
      : "number" === i
      ? (r = v(r))
      : "boolean" === i &&
        (fn(r)
          ? "true" === r || "1" === r
            ? (r = !0)
            : ("false" !== r && "0" !== r) || (r = !1)
          : mn(r) && (r = !!r)),
      (null !== a && i !== typeof r) || (e[t] = r);
  }
  function ci(e, n, t) {
    ke(e[n], function (r, a) {
      var i = typeof r;
      ("string" !== i && "number" !== i && "boolean" !== i) ||
        ((a = n + t[0] + a), t.length > 1 && (a += t[1]), (e[a] = r));
    }),
      delete e[n];
  }
  function si(e, n) {
    var t = {};
    return (
      ke(e, function (e, r) {
        r in li
          ? ke(e, function (e, a) {
              ui(t, n, r + "." + a, e);
            })
          : ui(t, n, r, e);
      }),
      t
    );
  }
  var li = {};
  function di(e) {
    (e = (function (e) {
      return (
        "object" == typeof e.retry &&
          "boolean" == typeof e.retry.enabled &&
          (e.retry = e.retry.enabled),
        e
      );
    })(e)),
      ke(oi, function (e, n) {
        gn(e) &&
          !(function (e) {
            return !wn(p.keys(e));
          })(e) &&
          ((li[n] = !0),
          ke(e, function (e, t) {
            oi[n + "." + t] = e;
          }),
          delete oi[n]);
      }),
      (e = si(e, oi)).callback_url && fa && (e.redirect = !0),
      (this.get = function (n) {
        return arguments.length ? (n in e ? e[n] : oi[n]) : e;
      }),
      (this.set = function (n, t) {
        e[n] = t;
      }),
      (this.unset = function (n) {
        delete e[n];
      });
  }
  var mi,
    fi = "com.google.android.apps.nbu.paisa.user",
    pi = function (e, n) {
      void 0 === n && (n = {});
      var t = we(e);
      t.default_dcc_currency && delete t.default_dcc_currency,
        n.feesRedirect && (t.view = "html"),
        [
          "amount",
          "currency",
          "signature",
          "description",
          "order_id",
          "account_id",
          "notes",
          "subscription_id",
          "auth_link_id",
          "payment_link_id",
          "customer_id",
          "recurring",
          "subscription_card_change",
          "recurring_token.max_amount",
          "recurring_token.expire_by",
        ].forEach(function (e) {
          if (!t.hasOwnProperty(e)) {
            var n = "order_id" === e ? tn() : Be(e);
            n &&
              ("boolean" == typeof n && (n = 1),
              (t[e.replace(/\.(\w+)/g, "[$1]")] = n));
          }
        });
      var r = Be("key");
      !t.key_id && r && (t.key_id = r),
        n.avoidPopup &&
          "wallet" === t.method &&
          (t["_[source]"] = "checkoutjs"),
        (n.tez || n.gpay) &&
          ((t["_[flow]"] = "intent"), t["_[app]"] || (t["_[app]"] = fi));
      [
        "integration",
        "integration_version",
        "integration_parent_version",
      ].forEach(function (e) {
        var n = Be("_." + e);
        n && (t["_[" + e + "]"] = n);
      });
      var a,
        i = null != (a = ur) ? a : null;
      i && (t["_[shield][fhash]"] = i);
      var o = lr();
      o && (t["_[device_id]"] = o),
        (t["_[shield][tz]"] = -new _().getTimezoneOffset()),
        (t["_[build]"] = $t),
        ci(t, "notes", "[]"),
        ci(t, "card", "[]");
      var u = t["card[expiry]"];
      return (
        fn(u) &&
          ((t["card[expiry_month]"] = u.slice(0, 2)),
          (t["card[expiry_year]"] = u.slice(-2)),
          delete t["card[expiry]"]),
        (t._ = Er.common()),
        ci(t, "_", "[]"),
        t
      );
    };
  function hi(e, n) {
    (null == n || n > e.length) && (n = e.length);
    for (var t = 0, r = new f(n); t < n; t++) r[t] = e[t];
    return r;
  }
  function vi(e) {
    return (
      (function (e) {
        if (f.isArray(e)) return hi(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return f.from(e);
      })(e) ||
      (function (e, n) {
        if (e) {
          if ("string" == typeof e) return hi(e, n);
          var t = p.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === t && e.constructor && (t = e.constructor.name),
            "Map" === t || "Set" === t
              ? f.from(e)
              : "Arguments" === t ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
              ? hi(e, n)
              : void 0
          );
        }
      })(e) ||
      (function () {
        throw new x(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function _i(e) {
    return (
      (_i = p.setPrototypeOf
        ? p.getPrototypeOf
        : function (e) {
            return e.__proto__ || p.getPrototypeOf(e);
          }),
      _i(e)
    );
  }
  function yi(e, n) {
    return (
      (yi =
        p.setPrototypeOf ||
        function (e, n) {
          return (e.__proto__ = n), e;
        }),
      yi(e, n)
    );
  }
  function gi() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        m.prototype.valueOf.call(Reflect.construct(m, [], function () {})), !0
      );
    } catch (e) {
      return !1;
    }
  }
  function bi(e, n, t) {
    return (
      (bi = gi()
        ? Reflect.construct
        : function (e, n, t) {
            var r = [null];
            r.push.apply(r, n);
            var a = new (Function.bind.apply(e, r))();
            return t && yi(a, t.prototype), a;
          }),
      bi.apply(null, arguments)
    );
  }
  function wi(e) {
    var n = "function" == typeof Map ? new Map() : void 0;
    return (
      (wi = function (e) {
        if (
          null === e ||
          !(function (e) {
            return -1 !== Function.toString.call(e).indexOf("[native code]");
          })(e)
        )
          return e;
        if ("function" != typeof e)
          throw new x("Super expression must either be null or a function");
        if (void 0 !== n) {
          if (n.has(e)) return n.get(e);
          n.set(e, t);
        }
        function t() {
          return bi(e, arguments, _i(this).constructor);
        }
        return (
          (t.prototype = p.create(e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          yi(t, e)
        );
      }),
      wi(e)
    );
  }
  function ki(e, n) {
    (e.prototype = p.create(n.prototype)),
      (e.prototype.constructor = e),
      yi(e, n);
  }
  function Ei() {}
  function Si(e) {
    return e();
  }
  function Ai() {
    return Object.create(null);
  }
  function Ci(e) {
    e.forEach(Si);
  }
  function Ri(e) {
    return "function" == typeof e;
  }
  function xi(e, n) {
    return e != e
      ? n == n
      : e !== n || (e && "object" == typeof e) || "function" == typeof e;
  }
  function Ii(e) {
    if (null == e) return Ei;
    for (
      var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), r = 1;
      r < n;
      r++
    )
      t[r - 1] = arguments[r];
    var a = e.subscribe.apply(e, t);
    return a.unsubscribe
      ? function () {
          return a.unsubscribe();
        }
      : a;
  }
  function Pi(e) {
    var n;
    return (
      Ii(e, function (e) {
        return (n = e);
      })(),
      n
    );
  }
  function Di(e, n, t, r) {
    return e[1] && r
      ? (function (e, n) {
          for (var t in n) e[t] = n[t];
          return e;
        })(t.ctx.slice(), e[1](r(n)))
      : t.ctx;
  }
  function Ni(e, n) {
    e.appendChild(n);
  }
  function Ti(e, n, t) {
    e.insertBefore(n, t || null);
  }
  function Mi(e) {
    e.parentNode.removeChild(e);
  }
  function Li(e) {
    return document.createElement(e);
  }
  function Oi(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function Bi(e) {
    return document.createTextNode(e);
  }
  function zi(e, n, t) {
    null == t
      ? e.removeAttribute(n)
      : e.getAttribute(n) !== t && e.setAttribute(n, t);
  }
  function Fi(e, n, t, r) {
    e.style.setProperty(n, t, r ? "important" : "");
  }
  function Ki(e) {
    mi = e;
  }
  function Ui() {
    var e = (function () {
      if (!mi)
        throw new Error("Function called outside component initialization");
      return mi;
    })();
    return function (n, t) {
      var r = e.$$.callbacks[n];
      if (r) {
        var a = (function (e, n, t) {
          void 0 === t && (t = !1);
          var r = document.createEvent("CustomEvent");
          return r.initCustomEvent(e, t, !1, n), r;
        })(n, t);
        r.slice().forEach(function (n) {
          n.call(e, a);
        });
      }
    };
  }
  var $i = [],
    ji = [],
    Hi = [],
    Gi = [],
    Yi = Promise.resolve(),
    Vi = !1;
  function Zi(e) {
    Hi.push(e);
  }
  var Wi = !1,
    qi = new Set();
  function Ji() {
    if (!Wi) {
      Wi = !0;
      do {
        for (var e = 0; e < $i.length; e += 1) {
          var n = $i[e];
          Ki(n), Qi(n.$$);
        }
        for (Ki(null), $i.length = 0; ji.length; ) ji.pop()();
        for (var t = 0; t < Hi.length; t += 1) {
          var r = Hi[t];
          qi.has(r) || (qi.add(r), r());
        }
        Hi.length = 0;
      } while ($i.length);
      for (; Gi.length; ) Gi.pop()();
      (Vi = !1), (Wi = !1), qi.clear();
    }
  }
  function Qi(e) {
    if (null !== e.fragment) {
      e.update(), Ci(e.before_update);
      var n = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, n),
        e.after_update.forEach(Zi);
    }
  }
  var Xi = new Set();
  function eo(e, n) {
    e && e.i && (Xi.delete(e), e.i(n));
  }
  function no(e, n) {
    -1 === e.$$.dirty[0] &&
      ($i.push(e), Vi || ((Vi = !0), Yi.then(Ji)), e.$$.dirty.fill(0)),
      (e.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
  }
  function to(e, n, t, r, a, i, o, u) {
    void 0 === u && (u = [-1]);
    var c = mi;
    Ki(e);
    var s = (e.$$ = {
      fragment: null,
      ctx: null,
      props: i,
      update: Ei,
      not_equal: a,
      bound: Ai(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (c ? c.$$.context : [])),
      callbacks: Ai(),
      dirty: u,
      skip_bound: !1,
      root: n.target || c.$$.root,
    });
    o && o(s.root);
    var l = !1;
    if (
      ((s.ctx = t
        ? t(e, n.props || {}, function (n, t) {
            var r =
              !(arguments.length <= 2) && arguments.length - 2
                ? arguments.length <= 2
                  ? void 0
                  : arguments[2]
                : t;
            return (
              s.ctx &&
                a(s.ctx[n], (s.ctx[n] = r)) &&
                (!s.skip_bound && s.bound[n] && s.bound[n](r), l && no(e, n)),
              t
            );
          })
        : []),
      s.update(),
      (l = !0),
      Ci(s.before_update),
      (s.fragment = !!r && r(s.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        var d = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        s.fragment && s.fragment.l(d), d.forEach(Mi);
      } else s.fragment && s.fragment.c();
      n.intro && eo(e.$$.fragment),
        (function (e, n, t, r) {
          var a = e.$$,
            i = a.fragment,
            o = a.on_mount,
            u = a.on_destroy,
            c = a.after_update;
          i && i.m(n, t),
            r ||
              Zi(function () {
                var n = o.map(Si).filter(Ri);
                u ? u.push.apply(u, vi(n)) : Ci(n), (e.$$.on_mount = []);
              }),
            c.forEach(Zi);
        })(e, n.target, n.anchor, n.customElement),
        Ji();
    }
    Ki(c);
  }
  var ro = (function () {
    function e() {}
    var n = e.prototype;
    return (
      (n.$destroy = function () {
        var e, n;
        (e = 1),
          null !== (n = this.$$).fragment &&
            (Ci(n.on_destroy),
            n.fragment && n.fragment.d(e),
            (n.on_destroy = n.fragment = null),
            (n.ctx = [])),
          (this.$destroy = Ei);
      }),
      (n.$on = function (e, n) {
        var t = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return (
          t.push(n),
          function () {
            var e = t.indexOf(n);
            -1 !== e && t.splice(e, 1);
          }
        );
      }),
      (n.$set = function (e) {
        var n;
        this.$$set &&
          ((n = e), 0 !== Object.keys(n).length) &&
          ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
      }),
      e
    );
  })();
  function ao(e, n) {
    var t =
      ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
    if (t) return (t = t.call(e)).next.bind(t);
    if (
      Array.isArray(e) ||
      (t = (function (e, n) {
        if (!e) return;
        if ("string" == typeof e) return io(e, n);
        var t = Object.prototype.toString.call(e).slice(8, -1);
        "Object" === t && e.constructor && (t = e.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(e);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return io(e, n);
      })(e)) ||
      (n && e && "number" == typeof e.length)
    ) {
      t && (e = t);
      var r = 0;
      return function () {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function io(e, n) {
    (null == n || n > e.length) && (n = e.length);
    for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
    return r;
  }
  var oo = [];
  function uo(e, n) {
    var t;
    void 0 === n && (n = Ei);
    var r = new Set();
    function a(n) {
      if (xi(e, n) && ((e = n), t)) {
        for (var a, i = !oo.length, o = ao(r); !(a = o()).done; ) {
          var u = a.value;
          u[1](), oo.push(u, e);
        }
        if (i) {
          for (var c = 0; c < oo.length; c += 2) oo[c][0](oo[c + 1]);
          oo.length = 0;
        }
      }
    }
    return {
      set: a,
      update: function (n) {
        a(n(e));
      },
      subscribe: function (i, o) {
        void 0 === o && (o = Ei);
        var u = [i, o];
        return (
          r.add(u),
          1 === r.size && (t = n(a) || Ei),
          i(e),
          function () {
            r.delete(u), 0 === r.size && (t(), (t = null));
          }
        );
      },
    };
  }
  function co(e, n, t) {
    var r,
      a = !Array.isArray(e),
      i = a ? [e] : e,
      o = n.length < 2;
    return (
      (r = function (e) {
        var t = !1,
          r = [],
          u = 0,
          c = Ei,
          s = function () {
            if (!u) {
              c();
              var t = n(a ? r[0] : r, e);
              o ? e(t) : (c = Ri(t) ? t : Ei);
            }
          },
          l = i.map(function (e, n) {
            return Ii(
              e,
              function (e) {
                (r[n] = e), (u &= ~(1 << n)), t && s();
              },
              function () {
                u |= 1 << n;
              }
            );
          });
        return (
          (t = !0),
          s(),
          function () {
            Ci(l), c();
          }
        );
      }),
      { subscribe: uo(t, r).subscribe }
    );
  }
  var so = {
    properties: ["providers"],
    payment: ["provider"],
    groupedToIndividual: function (e) {
      var n = we(e);
      return (
        delete n.providers,
        (e.providers || []).map(function (e) {
          return p.assign({ provider: e }, n);
        })
      );
    },
    isValid: function (e) {
      return m(e.providers) && e.providers.length > 0;
    },
  };
  function lo(e, n, t) {
    n = we(n);
    var r = e.method,
      a = vo[r].payment;
    if (
      ((n.method = r),
      a.forEach(function (t) {
        var r = e[t];
        _n(r) || (n[t] = r);
      }),
      e.token_id && t)
    ) {
      var i = pe(t, "tokens.items", []).find(function (n) {
        return n.id === e.token_id;
      });
      i && (n.token = i.token);
    }
    return n;
  }
  function mo() {
    return !0;
  }
  function fo(e) {
    return [e];
  }
  var po = ["types", "iins", "issuers", "networks", "token_id", "countries"],
    ho = ["flows", "apps", "token_id", "vpas"],
    vo = {
      card: {
        properties: po,
        payment: ["token"],
        groupedToIndividual: function (e, n) {
          var t = pe(n, "tokens.items", []),
            r = we(e);
          if (
            (po.forEach(function (e) {
              delete r[e];
            }),
            e.token_id)
          ) {
            var a = e.token_id,
              i = t.find(function (e) {
                return e.id === a;
              });
            if (i)
              return [
                p.assign(
                  {
                    token_id: a,
                    type: i.card.type,
                    issuer: i.card.issuer,
                    network: i.card.network,
                  },
                  r
                ),
              ];
          }
          var o = (function (e, n) {
            void 0 === n && (n = []);
            var t = [];
            return (
              n.forEach(function (n) {
                var r = e[n];
                if (r && r.length) {
                  var a = n.slice(0, -1);
                  if (0 === t.length)
                    t = r.map(function (e) {
                      var n;
                      return ((n = {})[a] = e), n;
                    });
                  else {
                    var i = r.flatMap(function (e) {
                      return t.map(function (n) {
                        var t;
                        return p.assign((((t = {})[a] = e), t), n);
                      });
                    });
                    t = i;
                  }
                }
              }),
              t
            );
          })(e, ["issuers", "networks", "types", "iins"]);
          return o.map(function (e) {
            return p.assign(e, r);
          });
        },
        isValid: function (e) {
          var n = m(e.issuers),
            t = m(e.networks),
            r = m(e.types),
            a = m(e.countries);
          return (
            !(n && !e.issuers.length) &&
            !(t && !e.networks.length) &&
            !(r && !e.types.length) &&
            !(a && !e.countries.length)
          );
        },
      },
      netbanking: {
        properties: ["banks"],
        payment: ["bank"],
        groupedToIndividual: function (e) {
          var n = we(e);
          return (
            delete n.banks,
            (e.banks || []).map(function (e) {
              return p.assign({ bank: e }, n);
            })
          );
        },
        isValid: function (e) {
          return m(e.banks) && e.banks.length > 0;
        },
      },
      wallet: {
        properties: ["wallets"],
        payment: ["wallet"],
        groupedToIndividual: function (e) {
          var n = we(e);
          return (
            delete n.wallets,
            (e.wallets || []).map(function (e) {
              return p.assign({ wallet: e }, n);
            })
          );
        },
        isValid: function (e) {
          return m(e.wallets) && e.wallets.length > 0;
        },
      },
      upi: {
        properties: ho,
        payment: ["flow", "app", "token", "vpa"],
        groupedToIndividual: function (e, n) {
          var t = [],
            r = [],
            a = [],
            i = [],
            o = pe(n, "tokens.items", []),
            u = we(e);
          if (
            (ho.forEach(function (e) {
              delete u[e];
            }),
            e.flows && (t = e.flows),
            e.vpas && (a = e.vpas),
            e.apps && (r = e.apps),
            t.includes("collect") && a.length)
          ) {
            var c = a.map(function (n) {
              var t = p.assign({ vpa: n, flow: "collect" }, u);
              if (e.token_id) {
                var r = e.token_id;
                o.find(function (e) {
                  return e.id === r;
                }) && (t.token_id = r);
              }
              return t;
            });
            i = i.concat(c);
          }
          if (t.includes("intent") && r.length) {
            var s = r.map(function (e) {
              return p.assign({ app: e, flow: "intent" }, u);
            });
            i = i.concat(s);
          }
          if (t.length > 0) {
            var l = t
              .map(function (e) {
                var n = p.assign({ flow: e }, u);
                if (
                  !(
                    ("intent" === e && r.length) ||
                    ("collect" === e && a.length)
                  )
                )
                  return n;
              })
              .filter(m);
            i = i.concat(l);
          }
          return i;
        },
        getPaymentPayload: function (e, n, t) {
          return (
            "collect" === (n = lo(e, n, t)).flow &&
              ((n.flow = "directpay"), n.token && n.vpa && delete n.vpa),
            "qr" === n.flow && ((n["_[upiqr]"] = 1), (n.flow = "intent")),
            n.flow && ((n["_[flow]"] = n.flow), delete n.flow),
            n.app && ((n.upi_app = n.app), delete n.app),
            n
          );
        },
        isValid: function (e) {
          var n = m(e.flows),
            t = m(e.apps);
          if (!n || !e.flows.length) return !1;
          if (t) {
            if (!e.apps.length) return !1;
            if (!n || !e.flows.includes("intent")) return !1;
          }
          return !0;
        },
      },
      cardless_emi: {
        properties: ["providers"],
        payment: ["provider"],
        groupedToIndividual: function (e) {
          var n = we(e);
          return (
            delete n.providers,
            (e.providers || []).map(function (e) {
              return p.assign({ provider: e }, n);
            })
          );
        },
        isValid: function (e) {
          return m(e.providers) && e.providers.length > 0;
        },
      },
      paylater: {
        properties: ["providers"],
        payment: ["provider"],
        groupedToIndividual: function (e) {
          var n = we(e);
          return (
            delete n.providers,
            (e.providers || []).map(function (e) {
              return p.assign({ provider: e }, n);
            })
          );
        },
        isValid: function (e) {
          return m(e.providers) && e.providers.length > 0;
        },
      },
      app: {
        properties: ["providers"],
        payment: ["provider"],
        groupedToIndividual: function (e) {
          var n = we(e);
          return (
            delete n.providers,
            (e.providers || []).map(function (e) {
              return p.assign({ provider: e }, n);
            })
          );
        },
        isValid: function (e) {
          return m(e.providers) && e.providers.length > 0;
        },
      },
      international: so,
      intl_bank_transfer: so,
    };
  function _o(e) {
    var n = e.method,
      t = vo[n];
    if (!t) return !1;
    var r = p.keys(e);
    return t.properties.every(function (e) {
      return !r.includes(e);
    });
  }
  (vo.emi = vo.card),
    (vo.credit_card = vo.card),
    (vo.debit_card = vo.card),
    (vo.upi_otm = vo.upi),
    (vo.emandate = vo.netbanking),
    [
      "card",
      "upi",
      "netbanking",
      "wallet",
      "upi_otm",
      "gpay",
      "emi",
      "cardless_emi",
      "qr",
      "paylater",
      "paypal",
      "bank_transfer",
      "offline_challan",
      "nach",
      "app",
      "emandate",
      "cod",
      "international",
      "intl_bank_transfer",
    ].forEach(function (e) {
      vo[e] || (vo[e] = {});
    }),
    ke(vo, function (e, n) {
      vo[n] = p.assign(
        {
          getPaymentPayload: lo,
          groupedToIndividual: fo,
          isValid: mo,
          properties: [],
          payment: [],
        },
        vo[n]
      );
    });
  var yo = uo(""),
    go = uo("");
  uo("");
  var bo = co([yo, go], function (e) {
    var n = e[0],
      t = e[1];
    return t ? n + t : "";
  });
  uo({});
  var wo = uo(""),
    ko = uo("");
  co([wo, ko], function (e) {
    var n = e[0],
      t = e[1];
    return t ? n + t : "";
  }),
    yo.subscribe(function (e) {
      wo.set(e);
    }),
    go.subscribe(function (e) {
      ko.set(e);
    }),
    uo(""),
    uo(""),
    uo(""),
    uo(""),
    uo(""),
    uo("netbanking");
  var Eo = uo(),
    So = uo(""),
    Ao = co(uo([]), function (e) {
      return e.flatMap(function (e) {
        return e.instruments;
      });
    });
  uo([]), uo([]), uo([]);
  var Co = co([Ao, uo(null)], function (e) {
    var n = e[0],
      t = void 0 === n ? [] : n,
      r = e[1],
      a = void 0 === r ? null : r;
    return t.find(function (e) {
      return e.id === a;
    });
  });
  uo(""),
    co(Co, function (e) {
      return e &&
        (_o(e) ||
          (function (e) {
            var n = _o(e),
              t = ["card", "emi"].includes(e.method);
            if ("emandate" === e.method) return !0;
            if (n) return !0;
            if (t) return !e.token_id;
            if ("upi" === e.method && e.flows) {
              if (e.flows.length > 1) return !0;
              if (e.flows.includes("omnichannel")) return !0;
              if (e.flows.includes("collect")) {
                var r = e._ungrouped;
                if (1 === r.length) {
                  var a = r[0],
                    i = a.flow,
                    o = a.vpa;
                  if ("collect" === i && o) return !1;
                }
                return !0;
              }
              if (e.flows.includes("intent") && !e.apps) return !0;
            }
            return e._ungrouped.length > 1;
          })(e))
        ? e
        : null;
    }),
    co(bo, function (e) {
      return e && "+91" !== e && "+" !== e;
    }),
    uo([]),
    co([bo], function (e) {
      return e[0].startsWith("+91");
    });
  var Ro = Ft.cdn,
    xo = {
      TRUSTLY: "trustly",
      POLI: "poli",
      SOFORT: "sofort",
      GIROPAY: "giropay",
    },
    Io = Ft.cdn;
  function Po(e) {
    (this.name = e),
      (this._exists = !1),
      (this.platform = ""),
      (this.bridge = {}),
      this.init();
  }
  X(
    {
      google_pay: {
        code: "google_pay",
        logo: Io + "app/googlepay.svg",
        card_logo: Io + "card/googlepay.svg",
        verify_registration: !0,
        externalSDK: "googlepay",
        isCompatibleWithSDK: function (e) {
          return "android" === e.platform;
        },
      },
      cred: {
        code: "cred",
        logo: Io + "checkout/cred.png",
        uri: "credpay",
        package_name: "com.dreamplug.androidapp",
        isCompatibleWithSDK: function (e) {
          var n = e.platform;
          return "android" === n || "ios" === n;
        },
      },
    },
    (function () {
      var e = {};
      return (
        p.keys(xo).forEach(function (n) {
          e[xo[n]] = {
            code: xo[n],
            logo: Ro + "international/" + xo[n] + ".png",
            uri: "",
            package_name: "",
            isCompatibleWithSDK: function (e) {
              var n = e.platform;
              return "android" === n || "ios" === n;
            },
          };
        }),
        e
      );
    })()
  ),
    (Po.prototype = {
      init: function () {
        var e = this.name,
          n = window[e],
          t = ((window.webkit || {}).messageHandlers || {})[e];
        t
          ? ((this._exists = !0), (this.bridge = t), (this.platform = "ios"))
          : n &&
            ((this._exists = !0),
            (this.bridge = n),
            (this.platform = "android"));
      },
      exists: function () {
        return this._exists;
      },
      get: function (e) {
        if (this.exists())
          if ("android" === this.platform) {
            if (pn(this.bridge[e])) return this.bridge[e];
          } else if ("ios" === this.platform) return this.bridge.postMessage;
      },
      has: function (e) {
        return !(!this.exists() || !this.get(e));
      },
      callAndroid: function (e) {
        for (
          var n = arguments.length, t = new f(n > 1 ? n - 1 : 0), r = 1;
          r < n;
          r++
        )
          t[r - 1] = arguments[r];
        t = t.map(function (e) {
          return "object" == typeof e ? JSON.stringify(e) : e;
        });
        var a = this.get(e);
        if (a) return a.apply(this.bridge, t);
      },
      callIos: function (e) {
        var n = this.get(e);
        if (n)
          try {
            var t = { action: e },
              r = arguments.length <= 1 ? void 0 : arguments[1];
            return r && (t.body = r), n.call(this.bridge, t);
          } catch (e) {}
      },
      call: function (e) {
        for (
          var n = arguments.length, t = new f(n > 1 ? n - 1 : 0), r = 1;
          r < n;
          r++
        )
          t[r - 1] = arguments[r];
        var a = this.get(e);
        (t = [e].concat(t)),
          a && (this.callAndroid.apply(this, t), this.callIos.apply(this, t));
      },
    }),
    new Po("CheckoutBridge"),
    new Po("StorageBridge");
  var Do = {};
  [
    { package_name: fi, method: "upi" },
    { package_name: "com.phonepe.app", method: "upi" },
    { package_name: "cred", method: "app" },
  ].forEach(function (e) {
    Do[e.package_name] = !1;
  });
  var No,
    To,
    Mo,
    Lo =
      (void 0 === No && (No = P.search),
      fn(No)
        ? ((To = No.slice(1)),
          (Mo = {}),
          To.split(/=|&/).forEach(function (e, n, t) {
            n % 2 && (Mo[t[n - 1]] = A(e));
          }),
          Mo)
        : {}),
    Oo = { all: [], filtered: [] };
  function Bo() {
    return pe(window, "webkit.messageHandlers.CheckoutBridge")
      ? { platform: "ios" }
      : {
          platform: Lo.platform || "web",
          library: "checkoutjs",
          version: (Lo.version || $t) + "",
        };
  }
  function zo(e) {
    return {
      "_[agent][platform]": Bo().platform,
      "_[agent][device]": (null == e ? void 0 : e.cred)
        ? "desktop" !== va()
          ? "mobile"
          : "desktop"
        : va(),
      "_[agent][os]":
        ea || ra
          ? "iOS"
          : ta
          ? "android"
          : aa
          ? "windows"
          : ia
          ? "linux"
          : oa
          ? "macOS"
          : "other",
    };
  }
  function Fo(e, n) {
    return (
      void 0 === e && (e = ""),
      void 0 === n && (n = !0),
      ["checkoutjs", "hosted"].includes(Er.props.library) &&
      l.session_token &&
      n
        ? (function (e, n) {
            return (
              void 0 === e && (e = ""),
              kt(Ft.api + Ft.version + "standard_checkout/" + e, {
                session_token: n,
              })
            );
          })(e, l.session_token)
        : Ft.api + Ft.version + e
    );
  }
  var Ko = [
    "key",
    "order_id",
    "invoice_id",
    "subscription_id",
    "auth_link_id",
    "payment_link_id",
    "contact_id",
    "checkout_config_id",
  ];
  var Uo,
    $o,
    jo,
    Ho,
    Go,
    Yo = {},
    Vo = "avoidPopup",
    Zo = "forceIframeFlow",
    Wo = "onlyPhoneRequired",
    qo = "forcePopupCustomCheckout",
    Jo = "disableWalletAmountCheck",
    Qo = {
      wallet: {
        paytm: ((Uo = {}), (Uo["popupIframe"] = !0), Uo),
        paypal: (($o = {}), ($o[Jo] = !0), $o),
      },
      cardless_emi: {
        walnut369: ((jo = {}), (jo[Zo] = !0), (jo[Wo] = !0), (jo[qo] = !0), jo),
      },
      app: { twid: ((Ho = {}), (Ho[qo] = !0), Ho) },
      cod: (((Go = {})[Vo] = !0), Go),
    };
  uo({}), uo({}), uo(""), uo("");
  [
    { name: "visa", regex: /^4/ },
    { name: "mastercard", regex: /^(5[1-5]|2[2-7])/ },
    { name: "maestro16", regex: /^(50(81(25|26|59|92)|8227)|4(437|681))/ },
    { name: "amex", regex: /^3[47]/ },
    { name: "rupay", regex: /^787878/ },
    {
      name: "rupay",
      regex:
        /^(508[5-9]|60(80(0|)[^0]|8[1-4]|8500|698[5-9]|699|7[^9]|79[0-7]|798[0-4])|65(2(1[5-9]|[2-9])|30|31[0-4])|817[2-9]|81[89]|820[01])/,
    },
    { name: "discover", regex: /^(65[1,3-9]|6011)/ },
    { name: "maestro", regex: /^(6|5(0|[6-9])).{5}/ },
    { name: "diners", regex: /^3[0689]/ },
    { name: "jcb", regex: /^35/ },
    { name: "bajaj", regex: /^203040/ },
  ].reduce(function (e, n) {
    return (e[n.name] = !0), e;
  }, {});
  var Xo,
    eu = Ft.cdn + "bank/";
  (Xo = {
    ICIC_C: "ICICI Corporate",
    UTIB_C: "Axis Corporate",
    SBIN: "SBI",
    HDFC: "HDFC",
    ICIC: "ICICI",
    UTIB: "Axis",
    KKBK: "Kotak",
    YESB: "Yes",
    IBKL: "IDBI",
    BARB_R: "BOB",
    PUNB_R: "PNB",
    IOBA: "IOB",
    FDRL: "Federal",
    CORP: "Corporate",
    IDFB: "IDFC",
    INDB: "IndusInd",
    VIJB: "Vijaya Bank",
    BARB: "BOB",
    RATN: "RBL",
  }),
    p.entries(Xo).map(function (e) {
      return {
        name: e[1],
        code: e[0],
        logo: ((n = e[0]), "" + eu + n.slice(0, 4) + ".gif"),
      };
      var n;
    });
  var nu = (
    [
      { code: "KKBK", name: "Kotak Mahindra Bank" },
      { code: "KKBK_DC", name: "Kotak Debit Cards" },
      { code: "HDFC_DC", name: "HDFC Debit Cards" },
      { code: "HDFC", name: "HDFC Credit Cards" },
      { code: "UTIB", name: "Axis Bank" },
      { code: "INDB", name: "Indusind Bank" },
      { code: "RATN", name: "RBL Bank" },
      { code: "ICIC", name: "ICICI Bank" },
      { code: "SCBL", name: "Standard Chartered Bank" },
      { code: "YESB", name: "Yes Bank" },
      { code: "AMEX", name: "American Express" },
      { code: "SBIN", name: "State Bank of India" },
      { code: "BARB", name: "Bank of Baroda" },
      { code: "BAJAJ", name: "Bajaj Finserv" },
      { code: "CITI", name: "CITI Bank" },
      { code: "HSBC", name: "HSBC Credit Cards" },
      { code: "FDRL", name: "Federal Bank" },
      { code: "IDFB", name: "IDFC First Bank" },
      { code: "onecard", name: "OneCard" },
    ] || []
  ).reduce(function (e, n) {
    return (e[n.code] = n), e;
  }, {});
  function tu(e) {
    return nu[e];
  }
  function ru(e) {
    void 0 === e && (e = {});
    var n = 1 / 0;
    return (
      ke(e, function (e) {
        e.min_amount < n && (n = e.min_amount);
      }),
      n
    );
  }
  var au = Ft.cdn,
    iu = au + "cardless_emi/",
    ou = au + "cardless_emi-sq/",
    uu = { min_amount: 3e5, headless: !0, fee_bearer_customer: !0 },
    cu = ye(
      {
        walnut369: {
          name: "axio",
          fee_bearer_customer: !1,
          headless: !1,
          pushToFirst: !0,
          min_amount: 100,
        },
        bajaj: { name: "Bajaj Finserv" },
        sezzle: {
          name: "Sezzle",
          headless: !1,
          fee_bearer_customer: !1,
          min_amount: 2e4,
        },
        earlysalary: { name: "EarlySalary", fee_bearer_customer: !1 },
        zestmoney: {
          name: "ZestMoney",
          min_amount: 9900,
          fee_bearer_customer: !1,
        },
        flexmoney: {
          name: "Cardless EMI by InstaCred",
          headless: !1,
          fee_bearer_customer: !1,
        },
        barb: { name: "Bank of Baroda Cardless EMI", headless: !1 },
        fdrl: { name: "Federal Bank Cardless EMI", headless: !1 },
        hdfc: { name: "HDFC Bank Cardless EMI", headless: !1 },
        idfb: { name: "IDFC First Bank Cardless EMI", headless: !1 },
        kkbk: { name: "Kotak Mahindra Bank Cardless EMI", headless: !1 },
        icic: { name: "ICICI Bank Cardless EMI", headless: !1 },
        hcin: {
          name: "Home Credit Ujjwal Card",
          headless: !1,
          min_amount: 5e4,
        },
        onecard: { name: "OneCard" },
      },
      function (e, n) {
        return p.assign(
          {},
          uu,
          { code: n, logo: iu + n + ".svg", sqLogo: ou + n + ".svg" },
          e
        );
      }
    );
  function su(e, n) {
    var t = {};
    return n
      ? (ke(n, function (r, a) {
          n[a] && cu[a] && cu[a].min_amount <= e && (t[a] = cu[a] || {});
        }),
        t)
      : t;
  }
  var lu = Ft.cdn,
    du = lu + "paylater/",
    mu = lu + "paylater-sq/",
    fu = { min_amount: 3e5 };
  ye(
    {
      epaylater: { name: "ePayLater", display_name: "ePayLater" },
      getsimpl: { name: "Simpl", display_name: "Simpl" },
      icic: { name: "ICICI Bank PayLater", display_name: "ICICI" },
      hdfc: { name: "FlexiPay by HDFC Bank", display_name: "FlexiPay" },
      lazypay: { name: "LazyPay", display_name: "LazyPay" },
      kkbk: { name: "kkbk", display_name: "Kotak Mahindra Bank" },
    },
    function (e, n) {
      return p.assign(
        {},
        fu,
        { code: n, logo: du + n + ".svg", sqLogo: mu + n + ".svg" },
        e
      );
    }
  );
  var pu = Ft.cdn,
    hu = pu + "wallet/",
    vu = pu + "wallet-sq/",
    _u = [
      "phonepe",
      "amazonpay",
      "mobikwik",
      "freecharge",
      "airtelmoney",
      "olamoney",
      "jiomoney",
      "paytm",
      "paypal",
    ];
  var yu,
    gu = ["mobikwik", "freecharge", "payumoney"],
    bu = ye(
      {
        airtelmoney: ["Airtel Money", 32],
        amazonpay: ["Amazon Pay", 28],
        citrus: ["Citrus Wallet", 32],
        freecharge: ["Freecharge", 18],
        jiomoney: ["JioMoney", 68],
        mobikwik: ["Mobikwik", 20],
        olamoney: ["Ola Money (Postpaid + Wallet)", 22],
        paypal: ["PayPal", 20],
        paytm: ["Paytm", 18],
        payumoney: ["PayUMoney", 18],
        payzapp: ["PayZapp", 24],
        phonepe: ["PhonePe", 20],
        sbibuddy: ["SBI Buddy", 22],
        zeta: ["Zeta", 25],
        citibankrewards: ["Citibank Reward Points", 20],
        itzcash: ["Itz Cash", 20],
        paycash: ["PayCash", 20],
      },
      function (e, n) {
        return {
          power: -1 !== gu.indexOf(n),
          name: e[0],
          h: e[1],
          code: n,
          logo: hu + n + ".png",
          sqLogo: vu + n + ".png",
        };
      }
    );
  function wu(e) {
    return e.type === yu.literal;
  }
  function ku(e) {
    return e.type === yu.argument;
  }
  function Eu(e) {
    return e.type === yu.number;
  }
  function Su(e) {
    return e.type === yu.date;
  }
  function Au(e) {
    return e.type === yu.time;
  }
  function Cu(e) {
    return e.type === yu.select;
  }
  function Ru(e) {
    return e.type === yu.plural;
  }
  function xu(e) {
    return e.type === yu.pound;
  }
  function Iu(e) {
    return !(!e || "object" != typeof e || 0 !== e.type);
  }
  function Pu(e) {
    return !(!e || "object" != typeof e || 1 !== e.type);
  }
  !(function (e) {
    (e[(e.literal = 0)] = "literal"),
      (e[(e.argument = 1)] = "argument"),
      (e[(e.number = 2)] = "number"),
      (e[(e.date = 3)] = "date"),
      (e[(e.time = 4)] = "time"),
      (e[(e.select = 5)] = "select"),
      (e[(e.plural = 6)] = "plural"),
      (e[(e.pound = 7)] = "pound");
  })(yu || (yu = {}));
  var Du,
    Nu =
      ((Du = function (e, n) {
        return (
          (Du =
            p.setPrototypeOf ||
            ({ __proto__: [] } instanceof f &&
              function (e, n) {
                e.__proto__ = n;
              }) ||
            function (e, n) {
              for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
            }),
          Du(e, n)
        );
      }),
      function (e, n) {
        function t() {
          this.constructor = e;
        }
        Du(e, n),
          (e.prototype =
            null === n ? p.create(n) : ((t.prototype = n.prototype), new t()));
      }),
    Tu = function () {
      return (
        (Tu =
          p.assign ||
          function (e) {
            for (var n, t = 1, r = arguments.length; t < r; t++)
              for (var a in (n = arguments[t]))
                p.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            return e;
          }),
        Tu.apply(this, arguments)
      );
    },
    Mu = (function (e) {
      function n(t, r, a, i) {
        var o = e.call(this) || this;
        return (
          (o.message = t),
          (o.expected = r),
          (o.found = a),
          (o.location = i),
          (o.name = "SyntaxError"),
          "function" == typeof Error.captureStackTrace &&
            Error.captureStackTrace(o, n),
          o
        );
      }
      return (
        Nu(n, e),
        (n.buildMessage = function (e, n) {
          function t(e) {
            return e.charCodeAt(0).toString(16).toUpperCase();
          }
          function r(e) {
            return e
              .replace(/\\/g, "\\\\")
              .replace(/"/g, '\\"')
              .replace(/\0/g, "\\0")
              .replace(/\t/g, "\\t")
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/[\x00-\x0F]/g, function (e) {
                return "\\x0" + t(e);
              })
              .replace(/[\x10-\x1F\x7F-\x9F]/g, function (e) {
                return "\\x" + t(e);
              });
          }
          function a(e) {
            return e
              .replace(/\\/g, "\\\\")
              .replace(/\]/g, "\\]")
              .replace(/\^/g, "\\^")
              .replace(/-/g, "\\-")
              .replace(/\0/g, "\\0")
              .replace(/\t/g, "\\t")
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/[\x00-\x0F]/g, function (e) {
                return "\\x0" + t(e);
              })
              .replace(/[\x10-\x1F\x7F-\x9F]/g, function (e) {
                return "\\x" + t(e);
              });
          }
          function i(e) {
            switch (e.type) {
              case "literal":
                return '"' + r(e.text) + '"';
              case "class":
                var n = e.parts.map(function (e) {
                  return f.isArray(e) ? a(e[0]) + "-" + a(e[1]) : a(e);
                });
                return "[" + (e.inverted ? "^" : "") + n + "]";
              case "any":
                return "any character";
              case "end":
                return "end of input";
              case "other":
                return e.description;
            }
          }
          return (
            "Expected " +
            (function (e) {
              var n,
                t,
                r = e.map(i);
              if ((r.sort(), r.length > 0)) {
                for (n = 1, t = 1; n < r.length; n++)
                  r[n - 1] !== r[n] && ((r[t] = r[n]), t++);
                r.length = t;
              }
              switch (r.length) {
                case 1:
                  return r[0];
                case 2:
                  return r[0] + " or " + r[1];
                default:
                  return r.slice(0, -1).join(", ") + ", or " + r[r.length - 1];
              }
            })(e) +
            " but " +
            (((o = n) ? '"' + r(o) + '"' : "end of input") + " found.")
          );
          var o;
        }),
        n
      );
    })(Error);
  var Lu = function (e, n) {
      n = void 0 !== n ? n : {};
      var t,
        r = {},
        a = { start: Ne },
        i = Ne,
        o = Ce("#", !1),
        u = xe("argumentElement"),
        c = "{",
        s = Ce("{", !1),
        l = "}",
        d = Ce("}", !1),
        m = xe("numberSkeletonId"),
        f = /^['\/{}]/,
        p = Re(["'", "/", "{", "}"], !1, !1),
        h = { type: "any" },
        v = xe("numberSkeletonTokenOption"),
        _ = Ce("/", !1),
        y = xe("numberSkeletonToken"),
        g = "::",
        b = Ce("::", !1),
        w = function (e) {
          return tn.pop(), e.replace(/\s*$/, "");
        },
        k = ",",
        S = Ce(",", !1),
        A = "number",
        C = Ce("number", !1),
        R = function (e, n, t) {
          return Tu(
            {
              type:
                "number" === n ? yu.number : "date" === n ? yu.date : yu.time,
              style: t && t[2],
              value: e,
            },
            an()
          );
        },
        x = "'",
        I = Ce("'", !1),
        P = /^[^']/,
        D = Re(["'"], !0, !1),
        N = /^[^a-zA-Z'{}]/,
        T = Re([["a", "z"], ["A", "Z"], "'", "{", "}"], !0, !1),
        M = /^[a-zA-Z]/,
        L = Re(
          [
            ["a", "z"],
            ["A", "Z"],
          ],
          !1,
          !1
        ),
        O = "date",
        B = Ce("date", !1),
        z = "time",
        F = Ce("time", !1),
        K = "plural",
        U = Ce("plural", !1),
        $ = "selectordinal",
        j = Ce("selectordinal", !1),
        H = "offset:",
        G = Ce("offset:", !1),
        Y = "select",
        V = Ce("select", !1),
        Z = Ce("=", !1),
        W = xe("whitespace"),
        q =
          /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,
        J = Re(
          [
            ["\t", "\r"],
            " ",
            "Â…",
            "Â ",
            "áš€",
            ["â€€", "â€Š"],
            "\u2028",
            "\u2029",
            "â€¯",
            "âŸ",
            "ã€€",
          ],
          !1,
          !1
        ),
        Q = xe("syntax pattern"),
        X =
          /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/,
        ee = Re(
          [
            ["!", "/"],
            [":", "@"],
            ["[", "^"],
            "`",
            ["{", "~"],
            ["Â¡", "Â§"],
            "Â©",
            "Â«",
            "Â¬",
            "Â®",
            "Â°",
            "Â±",
            "Â¶",
            "Â»",
            "Â¿",
            "Ã—",
            "Ã·",
            ["â€", "â€§"],
            ["â€°", "â€¾"],
            ["â", "â“"],
            ["â•", "âž"],
            ["â†", "â‘Ÿ"],
            ["â”€", "âµ"],
            ["âž”", "â¯¿"],
            ["â¸€", "â¹¿"],
            ["ã€", "ã€ƒ"],
            ["ã€ˆ", "ã€ "],
            "ã€°",
            "ï´¾",
            "ï´¿",
            "ï¹…",
            "ï¹†",
          ],
          !1,
          !1
        ),
        ne = xe("optional whitespace"),
        te = xe("number"),
        re = Ce("-", !1),
        ae = xe("double apostrophes"),
        ie = "''",
        oe = Ce("''", !1),
        ue = function (e) {
          return !(
            "{" === e ||
            (rn() && "#" === e) ||
            (tn.length > 1 && "}" === e)
          );
        },
        ce = Ce("\n", !1),
        se = xe("argNameOrNumber"),
        le = xe("argNumber"),
        de = Ce("0", !1),
        me = /^[1-9]/,
        fe = Re([["1", "9"]], !1, !1),
        pe = /^[0-9]/,
        he = Re([["0", "9"]], !1, !1),
        ve = xe("argName"),
        _e = 0,
        ye = 0,
        ge = [{ line: 1, column: 1 }],
        be = 0,
        we = [],
        ke = 0;
      if (void 0 !== n.startRule) {
        if (!(n.startRule in a))
          throw new Error(
            "Can't start parsing from rule \"" + n.startRule + '".'
          );
        i = a[n.startRule];
      }
      function Ee() {
        return e.substring(ye, _e);
      }
      function Se() {
        return Pe(ye, _e);
      }
      function Ae(e, n) {
        throw (function (e, n) {
          return new Mu(e, [], "", n);
        })(e, (n = void 0 !== n ? n : Pe(ye, _e)));
      }
      function Ce(e, n) {
        return { type: "literal", text: e, ignoreCase: n };
      }
      function Re(e, n, t) {
        return { type: "class", parts: e, inverted: n, ignoreCase: t };
      }
      function xe(e) {
        return { type: "other", description: e };
      }
      function Ie(n) {
        var t,
          r = ge[n];
        if (r) return r;
        for (t = n - 1; !ge[t]; ) t--;
        for (r = { line: (r = ge[t]).line, column: r.column }; t < n; )
          10 === e.charCodeAt(t) ? (r.line++, (r.column = 1)) : r.column++, t++;
        return (ge[n] = r), r;
      }
      function Pe(e, n) {
        var t = Ie(e),
          r = Ie(n);
        return {
          start: { offset: e, line: t.line, column: t.column },
          end: { offset: n, line: r.line, column: r.column },
        };
      }
      function De(e) {
        _e < be || (_e > be && ((be = _e), (we = [])), we.push(e));
      }
      function Ne() {
        return Te();
      }
      function Te() {
        var e, n;
        for (e = [], n = Me(); n !== r; ) e.push(n), (n = Me());
        return e;
      }
      function Me() {
        var n;
        return (
          (n = (function () {
            var e, n;
            (e = _e),
              (n = Le()) !== r &&
                ((ye = e),
                (t = n),
                (n = Tu({ type: yu.literal, value: t }, an())));
            var t;
            return (e = n);
          })()) === r &&
            (n = (function () {
              var n, t, a, i;
              ke++,
                (n = _e),
                123 === e.charCodeAt(_e)
                  ? ((t = c), _e++)
                  : ((t = r), 0 === ke && De(s));
              t !== r && Ge() !== r && (a = qe()) !== r && Ge() !== r
                ? (125 === e.charCodeAt(_e)
                    ? ((i = l), _e++)
                    : ((i = r), 0 === ke && De(d)),
                  i !== r
                    ? ((ye = n),
                      (o = a),
                      (n = t = Tu({ type: yu.argument, value: o }, an())))
                    : ((_e = n), (n = r)))
                : ((_e = n), (n = r));
              var o;
              ke--, n === r && ((t = r), 0 === ke && De(u));
              return n;
            })()) === r &&
            (n = (function () {
              var n;
              (n = (function () {
                var n, t, a, i, o, u, m, f, p;
                (n = _e),
                  123 === e.charCodeAt(_e)
                    ? ((t = c), _e++)
                    : ((t = r), 0 === ke && De(s));
                t !== r && Ge() !== r && (a = qe()) !== r && Ge() !== r
                  ? (44 === e.charCodeAt(_e)
                      ? ((i = k), _e++)
                      : ((i = r), 0 === ke && De(S)),
                    i !== r && Ge() !== r
                      ? (e.substr(_e, 6) === A
                          ? ((o = A), (_e += 6))
                          : ((o = r), 0 === ke && De(C)),
                        o !== r && Ge() !== r
                          ? ((u = _e),
                            44 === e.charCodeAt(_e)
                              ? ((m = k), _e++)
                              : ((m = r), 0 === ke && De(S)),
                            m !== r && (f = Ge()) !== r
                              ? ((p = (function () {
                                  var n, t, a;
                                  (n = _e),
                                    e.substr(_e, 2) === g
                                      ? ((t = g), (_e += 2))
                                      : ((t = r), 0 === ke && De(b));
                                  t !== r
                                    ? ((a = (function () {
                                        var e, n, t;
                                        if (
                                          ((e = _e), (n = []), (t = ze()) !== r)
                                        )
                                          for (; t !== r; )
                                            n.push(t), (t = ze());
                                        else n = r;
                                        n !== r &&
                                          ((ye = e),
                                          (n = Tu(
                                            { type: 0, tokens: n },
                                            an()
                                          )));
                                        return (e = n);
                                      })()),
                                      a !== r
                                        ? ((ye = n), (n = t = a))
                                        : ((_e = n), (n = r)))
                                    : ((_e = n), (n = r));
                                  n === r &&
                                    ((n = _e),
                                    (ye = _e),
                                    tn.push("numberArgStyle"),
                                    (t = (t = !0) ? void 0 : r) !== r &&
                                    (a = Le()) !== r
                                      ? ((ye = n), (n = t = w(a)))
                                      : ((_e = n), (n = r)));
                                  return n;
                                })()),
                                p !== r
                                  ? (u = m = [m, f, p])
                                  : ((_e = u), (u = r)))
                              : ((_e = u), (u = r)),
                            u === r && (u = null),
                            u !== r && (m = Ge()) !== r
                              ? (125 === e.charCodeAt(_e)
                                  ? ((f = l), _e++)
                                  : ((f = r), 0 === ke && De(d)),
                                f !== r
                                  ? ((ye = n), (n = t = R(a, o, u)))
                                  : ((_e = n), (n = r)))
                              : ((_e = n), (n = r)))
                          : ((_e = n), (n = r)))
                      : ((_e = n), (n = r)))
                  : ((_e = n), (n = r));
                return n;
              })()) === r &&
                (n = (function () {
                  var n, t, a, i, o, u, m, f, p;
                  (n = _e),
                    123 === e.charCodeAt(_e)
                      ? ((t = c), _e++)
                      : ((t = r), 0 === ke && De(s));
                  t !== r && Ge() !== r && (a = qe()) !== r && Ge() !== r
                    ? (44 === e.charCodeAt(_e)
                        ? ((i = k), _e++)
                        : ((i = r), 0 === ke && De(S)),
                      i !== r && Ge() !== r
                        ? (e.substr(_e, 4) === O
                            ? ((o = O), (_e += 4))
                            : ((o = r), 0 === ke && De(B)),
                          o === r &&
                            (e.substr(_e, 4) === z
                              ? ((o = z), (_e += 4))
                              : ((o = r), 0 === ke && De(F))),
                          o !== r && Ge() !== r
                            ? ((u = _e),
                              44 === e.charCodeAt(_e)
                                ? ((m = k), _e++)
                                : ((m = r), 0 === ke && De(S)),
                              m !== r && (f = Ge()) !== r
                                ? ((p = (function () {
                                    var n, t, a;
                                    (n = _e),
                                      e.substr(_e, 2) === g
                                        ? ((t = g), (_e += 2))
                                        : ((t = r), 0 === ke && De(b));
                                    t !== r
                                      ? ((a = (function () {
                                          var n, t, a, i;
                                          (n = _e),
                                            (t = _e),
                                            (a = []),
                                            (i = Fe()) === r && (i = Ke());
                                          if (i !== r)
                                            for (; i !== r; )
                                              a.push(i),
                                                (i = Fe()) === r && (i = Ke());
                                          else a = r;
                                          t = a !== r ? e.substring(t, _e) : a;
                                          t !== r &&
                                            ((ye = n),
                                            (t = Tu(
                                              { type: 1, pattern: t },
                                              an()
                                            )));
                                          return (n = t);
                                        })()),
                                        a !== r
                                          ? ((ye = n), (n = t = a))
                                          : ((_e = n), (n = r)))
                                      : ((_e = n), (n = r));
                                    n === r &&
                                      ((n = _e),
                                      (ye = _e),
                                      tn.push("dateOrTimeArgStyle"),
                                      (t = (t = !0) ? void 0 : r) !== r &&
                                      (a = Le()) !== r
                                        ? ((ye = n), (n = t = w(a)))
                                        : ((_e = n), (n = r)));
                                    return n;
                                  })()),
                                  p !== r
                                    ? (u = m = [m, f, p])
                                    : ((_e = u), (u = r)))
                                : ((_e = u), (u = r)),
                              u === r && (u = null),
                              u !== r && (m = Ge()) !== r
                                ? (125 === e.charCodeAt(_e)
                                    ? ((f = l), _e++)
                                    : ((f = r), 0 === ke && De(d)),
                                  f !== r
                                    ? ((ye = n), (n = t = R(a, o, u)))
                                    : ((_e = n), (n = r)))
                                : ((_e = n), (n = r)))
                            : ((_e = n), (n = r)))
                        : ((_e = n), (n = r)))
                    : ((_e = n), (n = r));
                  return n;
                })());
              return n;
            })()) === r &&
            ((n = (function () {
              var n, t, a, i, o, u, m, f, p, h, v;
              (n = _e),
                123 === e.charCodeAt(_e)
                  ? ((t = c), _e++)
                  : ((t = r), 0 === ke && De(s));
              if (t !== r)
                if (Ge() !== r)
                  if ((a = qe()) !== r)
                    if (Ge() !== r)
                      if (
                        (44 === e.charCodeAt(_e)
                          ? ((i = k), _e++)
                          : ((i = r), 0 === ke && De(S)),
                        i !== r)
                      )
                        if (Ge() !== r)
                          if (
                            (e.substr(_e, 6) === K
                              ? ((o = K), (_e += 6))
                              : ((o = r), 0 === ke && De(U)),
                            o === r &&
                              (e.substr(_e, 13) === $
                                ? ((o = $), (_e += 13))
                                : ((o = r), 0 === ke && De(j))),
                            o !== r)
                          )
                            if (Ge() !== r)
                              if (
                                (44 === e.charCodeAt(_e)
                                  ? ((u = k), _e++)
                                  : ((u = r), 0 === ke && De(S)),
                                u !== r)
                              )
                                if (Ge() !== r)
                                  if (
                                    ((m = _e),
                                    e.substr(_e, 7) === H
                                      ? ((f = H), (_e += 7))
                                      : ((f = r), 0 === ke && De(G)),
                                    f !== r &&
                                    (p = Ge()) !== r &&
                                    (h = Ye()) !== r
                                      ? (m = f = [f, p, h])
                                      : ((_e = m), (m = r)),
                                    m === r && (m = null),
                                    m !== r)
                                  )
                                    if ((f = Ge()) !== r) {
                                      if (((p = []), (h = $e()) !== r))
                                        for (; h !== r; ) p.push(h), (h = $e());
                                      else p = r;
                                      p !== r && (h = Ge()) !== r
                                        ? (125 === e.charCodeAt(_e)
                                            ? ((v = l), _e++)
                                            : ((v = r), 0 === ke && De(d)),
                                          v !== r
                                            ? ((ye = n),
                                              (t = (function (e, n, t, r) {
                                                return Tu(
                                                  {
                                                    type: yu.plural,
                                                    pluralType:
                                                      "plural" === n
                                                        ? "cardinal"
                                                        : "ordinal",
                                                    value: e,
                                                    offset: t ? t[2] : 0,
                                                    options: r.reduce(function (
                                                      e,
                                                      n
                                                    ) {
                                                      var t = n.id,
                                                        r = n.value,
                                                        a = n.location;
                                                      return (
                                                        t in e &&
                                                          Ae(
                                                            'Duplicate option "' +
                                                              t +
                                                              '" in plural element: "' +
                                                              Ee() +
                                                              '"',
                                                            Se()
                                                          ),
                                                        (e[t] = {
                                                          value: r,
                                                          location: a,
                                                        }),
                                                        e
                                                      );
                                                    },
                                                    {}),
                                                  },
                                                  an()
                                                );
                                              })(a, o, m, p)),
                                              (n = t))
                                            : ((_e = n), (n = r)))
                                        : ((_e = n), (n = r));
                                    } else (_e = n), (n = r);
                                  else (_e = n), (n = r);
                                else (_e = n), (n = r);
                              else (_e = n), (n = r);
                            else (_e = n), (n = r);
                          else (_e = n), (n = r);
                        else (_e = n), (n = r);
                      else (_e = n), (n = r);
                    else (_e = n), (n = r);
                  else (_e = n), (n = r);
                else (_e = n), (n = r);
              else (_e = n), (n = r);
              return n;
            })()),
            n === r &&
              ((n = (function () {
                var n, t, a, i, o, u, m, f, p;
                (n = _e),
                  123 === e.charCodeAt(_e)
                    ? ((t = c), _e++)
                    : ((t = r), 0 === ke && De(s));
                if (t !== r)
                  if (Ge() !== r)
                    if ((a = qe()) !== r)
                      if (Ge() !== r)
                        if (
                          (44 === e.charCodeAt(_e)
                            ? ((i = k), _e++)
                            : ((i = r), 0 === ke && De(S)),
                          i !== r)
                        )
                          if (Ge() !== r)
                            if (
                              (e.substr(_e, 6) === Y
                                ? ((o = Y), (_e += 6))
                                : ((o = r), 0 === ke && De(V)),
                              o !== r)
                            )
                              if (Ge() !== r)
                                if (
                                  (44 === e.charCodeAt(_e)
                                    ? ((u = k), _e++)
                                    : ((u = r), 0 === ke && De(S)),
                                  u !== r)
                                )
                                  if (Ge() !== r) {
                                    if (((m = []), (f = Ue()) !== r))
                                      for (; f !== r; ) m.push(f), (f = Ue());
                                    else m = r;
                                    m !== r && (f = Ge()) !== r
                                      ? (125 === e.charCodeAt(_e)
                                          ? ((p = l), _e++)
                                          : ((p = r), 0 === ke && De(d)),
                                        p !== r
                                          ? ((ye = n),
                                            (t = (function (e, n) {
                                              return Tu(
                                                {
                                                  type: yu.select,
                                                  value: e,
                                                  options: n.reduce(function (
                                                    e,
                                                    n
                                                  ) {
                                                    var t = n.id,
                                                      r = n.value,
                                                      a = n.location;
                                                    return (
                                                      t in e &&
                                                        Ae(
                                                          'Duplicate option "' +
                                                            t +
                                                            '" in select element: "' +
                                                            Ee() +
                                                            '"',
                                                          Se()
                                                        ),
                                                      (e[t] = {
                                                        value: r,
                                                        location: a,
                                                      }),
                                                      e
                                                    );
                                                  },
                                                  {}),
                                                },
                                                an()
                                              );
                                            })(a, m)),
                                            (n = t))
                                          : ((_e = n), (n = r)))
                                      : ((_e = n), (n = r));
                                  } else (_e = n), (n = r);
                                else (_e = n), (n = r);
                              else (_e = n), (n = r);
                            else (_e = n), (n = r);
                          else (_e = n), (n = r);
                        else (_e = n), (n = r);
                      else (_e = n), (n = r);
                    else (_e = n), (n = r);
                  else (_e = n), (n = r);
                else (_e = n), (n = r);
                return n;
              })()),
              n === r &&
                (n = (function () {
                  var n, t;
                  (n = _e),
                    35 === e.charCodeAt(_e)
                      ? ((t = "#"), _e++)
                      : ((t = r), 0 === ke && De(o));
                  t !== r && ((ye = n), (t = Tu({ type: yu.pound }, an())));
                  return (n = t);
                })()))),
          n
        );
      }
      function Le() {
        var e, n, t;
        if (
          ((e = _e),
          (n = []),
          (t = Ve()) === r && (t = Ze()) === r && (t = We()),
          t !== r)
        )
          for (; t !== r; )
            n.push(t), (t = Ve()) === r && (t = Ze()) === r && (t = We());
        else n = r;
        return n !== r && ((ye = e), (n = n.join(""))), (e = n);
      }
      function Oe() {
        var n, t, a, i, o;
        if (
          (ke++,
          (n = _e),
          (t = []),
          (a = _e),
          (i = _e),
          ke++,
          (o = je()) === r &&
            (f.test(e.charAt(_e))
              ? ((o = e.charAt(_e)), _e++)
              : ((o = r), 0 === ke && De(p))),
          ke--,
          o === r ? (i = void 0) : ((_e = i), (i = r)),
          i !== r
            ? (e.length > _e
                ? ((o = e.charAt(_e)), _e++)
                : ((o = r), 0 === ke && De(h)),
              o !== r ? (a = i = [i, o]) : ((_e = a), (a = r)))
            : ((_e = a), (a = r)),
          a !== r)
        )
          for (; a !== r; )
            t.push(a),
              (a = _e),
              (i = _e),
              ke++,
              (o = je()) === r &&
                (f.test(e.charAt(_e))
                  ? ((o = e.charAt(_e)), _e++)
                  : ((o = r), 0 === ke && De(p))),
              ke--,
              o === r ? (i = void 0) : ((_e = i), (i = r)),
              i !== r
                ? (e.length > _e
                    ? ((o = e.charAt(_e)), _e++)
                    : ((o = r), 0 === ke && De(h)),
                  o !== r ? (a = i = [i, o]) : ((_e = a), (a = r)))
                : ((_e = a), (a = r));
        else t = r;
        return (
          (n = t !== r ? e.substring(n, _e) : t),
          ke--,
          n === r && ((t = r), 0 === ke && De(m)),
          n
        );
      }
      function Be() {
        var n, t, a;
        return (
          ke++,
          (n = _e),
          47 === e.charCodeAt(_e)
            ? ((t = "/"), _e++)
            : ((t = r), 0 === ke && De(_)),
          t !== r && (a = Oe()) !== r
            ? ((ye = n), (n = t = a))
            : ((_e = n), (n = r)),
          ke--,
          n === r && ((t = r), 0 === ke && De(v)),
          n
        );
      }
      function ze() {
        var e, n, t, a, i;
        if ((ke++, (e = _e), (n = Ge()) !== r))
          if ((t = Oe()) !== r) {
            for (a = [], i = Be(); i !== r; ) a.push(i), (i = Be());
            a !== r
              ? ((ye = e),
                (n = (function (e, n) {
                  return { stem: e, options: n };
                })(t, a)),
                (e = n))
              : ((_e = e), (e = r));
          } else (_e = e), (e = r);
        else (_e = e), (e = r);
        return ke--, e === r && ((n = r), 0 === ke && De(y)), e;
      }
      function Fe() {
        var n, t, a, i;
        if (
          ((n = _e),
          39 === e.charCodeAt(_e)
            ? ((t = x), _e++)
            : ((t = r), 0 === ke && De(I)),
          t !== r)
        ) {
          if (
            ((a = []),
            (i = Ve()) === r &&
              (P.test(e.charAt(_e))
                ? ((i = e.charAt(_e)), _e++)
                : ((i = r), 0 === ke && De(D))),
            i !== r)
          )
            for (; i !== r; )
              a.push(i),
                (i = Ve()) === r &&
                  (P.test(e.charAt(_e))
                    ? ((i = e.charAt(_e)), _e++)
                    : ((i = r), 0 === ke && De(D)));
          else a = r;
          a !== r
            ? (39 === e.charCodeAt(_e)
                ? ((i = x), _e++)
                : ((i = r), 0 === ke && De(I)),
              i !== r ? (n = t = [t, a, i]) : ((_e = n), (n = r)))
            : ((_e = n), (n = r));
        } else (_e = n), (n = r);
        if (n === r)
          if (
            ((n = []),
            (t = Ve()) === r &&
              (N.test(e.charAt(_e))
                ? ((t = e.charAt(_e)), _e++)
                : ((t = r), 0 === ke && De(T))),
            t !== r)
          )
            for (; t !== r; )
              n.push(t),
                (t = Ve()) === r &&
                  (N.test(e.charAt(_e))
                    ? ((t = e.charAt(_e)), _e++)
                    : ((t = r), 0 === ke && De(T)));
          else n = r;
        return n;
      }
      function Ke() {
        var n, t;
        if (
          ((n = []),
          M.test(e.charAt(_e))
            ? ((t = e.charAt(_e)), _e++)
            : ((t = r), 0 === ke && De(L)),
          t !== r)
        )
          for (; t !== r; )
            n.push(t),
              M.test(e.charAt(_e))
                ? ((t = e.charAt(_e)), _e++)
                : ((t = r), 0 === ke && De(L));
        else n = r;
        return n;
      }
      function Ue() {
        var n, t, a, i, o, u, m;
        return (
          (n = _e),
          Ge() !== r && (t = Qe()) !== r && Ge() !== r
            ? (123 === e.charCodeAt(_e)
                ? ((a = c), _e++)
                : ((a = r), 0 === ke && De(s)),
              a !== r
                ? ((ye = _e),
                  tn.push("select"),
                  (!0 ? void 0 : r) !== r && (i = Te()) !== r
                    ? (125 === e.charCodeAt(_e)
                        ? ((o = l), _e++)
                        : ((o = r), 0 === ke && De(d)),
                      o !== r
                        ? ((ye = n),
                          (u = t),
                          (m = i),
                          tn.pop(),
                          (n = Tu({ id: u, value: m }, an())))
                        : ((_e = n), (n = r)))
                    : ((_e = n), (n = r)))
                : ((_e = n), (n = r)))
            : ((_e = n), (n = r)),
          n
        );
      }
      function $e() {
        var n, t, a, i, o, u, m;
        return (
          (n = _e),
          Ge() !== r
            ? ((t = (function () {
                var n, t, a, i;
                return (
                  (n = _e),
                  (t = _e),
                  61 === e.charCodeAt(_e)
                    ? ((a = "="), _e++)
                    : ((a = r), 0 === ke && De(Z)),
                  a !== r && (i = Ye()) !== r
                    ? (t = a = [a, i])
                    : ((_e = t), (t = r)),
                  (n = t !== r ? e.substring(n, _e) : t) === r && (n = Qe()),
                  n
                );
              })()),
              t !== r && Ge() !== r
                ? (123 === e.charCodeAt(_e)
                    ? ((a = c), _e++)
                    : ((a = r), 0 === ke && De(s)),
                  a !== r
                    ? ((ye = _e),
                      tn.push("plural"),
                      (!0 ? void 0 : r) !== r && (i = Te()) !== r
                        ? (125 === e.charCodeAt(_e)
                            ? ((o = l), _e++)
                            : ((o = r), 0 === ke && De(d)),
                          o !== r
                            ? ((ye = n),
                              (u = t),
                              (m = i),
                              tn.pop(),
                              (n = Tu({ id: u, value: m }, an())))
                            : ((_e = n), (n = r)))
                        : ((_e = n), (n = r)))
                    : ((_e = n), (n = r)))
                : ((_e = n), (n = r)))
            : ((_e = n), (n = r)),
          n
        );
      }
      function je() {
        var n;
        return (
          ke++,
          q.test(e.charAt(_e))
            ? ((n = e.charAt(_e)), _e++)
            : ((n = r), 0 === ke && De(J)),
          ke--,
          n === r && 0 === ke && De(W),
          n
        );
      }
      function He() {
        var n;
        return (
          ke++,
          X.test(e.charAt(_e))
            ? ((n = e.charAt(_e)), _e++)
            : ((n = r), 0 === ke && De(ee)),
          ke--,
          n === r && 0 === ke && De(Q),
          n
        );
      }
      function Ge() {
        var n, t, a;
        for (ke++, n = _e, t = [], a = je(); a !== r; ) t.push(a), (a = je());
        return (
          (n = t !== r ? e.substring(n, _e) : t),
          ke--,
          n === r && ((t = r), 0 === ke && De(ne)),
          n
        );
      }
      function Ye() {
        var n, t, a, i, o;
        return (
          ke++,
          (n = _e),
          45 === e.charCodeAt(_e)
            ? ((t = "-"), _e++)
            : ((t = r), 0 === ke && De(re)),
          t === r && (t = null),
          t !== r && (a = Je()) !== r
            ? ((ye = n), (i = t), (n = t = (o = a) ? (i ? -o : o) : 0))
            : ((_e = n), (n = r)),
          ke--,
          n === r && ((t = r), 0 === ke && De(te)),
          n
        );
      }
      function Ve() {
        var n, t;
        return (
          ke++,
          (n = _e),
          e.substr(_e, 2) === ie
            ? ((t = ie), (_e += 2))
            : ((t = r), 0 === ke && De(oe)),
          t !== r && ((ye = n), (t = "'")),
          ke--,
          (n = t) === r && ((t = r), 0 === ke && De(ae)),
          n
        );
      }
      function Ze() {
        var n, t, a, i, o, u;
        if (
          ((n = _e),
          39 === e.charCodeAt(_e)
            ? ((t = x), _e++)
            : ((t = r), 0 === ke && De(I)),
          t !== r)
        )
          if (
            ((a = (function () {
              var n, t, a, i;
              (n = _e),
                (t = _e),
                e.length > _e
                  ? ((a = e.charAt(_e)), _e++)
                  : ((a = r), 0 === ke && De(h));
              a !== r
                ? ((ye = _e),
                  (i = (function (e) {
                    return "{" === e || "}" === e || (rn() && "#" === e);
                  })(a)),
                  (i = i ? void 0 : r) !== r
                    ? (t = a = [a, i])
                    : ((_e = t), (t = r)))
                : ((_e = t), (t = r));
              n = t !== r ? e.substring(n, _e) : t;
              return n;
            })()),
            a !== r)
          ) {
            for (
              i = _e,
                o = [],
                e.substr(_e, 2) === ie
                  ? ((u = ie), (_e += 2))
                  : ((u = r), 0 === ke && De(oe)),
                u === r &&
                  (P.test(e.charAt(_e))
                    ? ((u = e.charAt(_e)), _e++)
                    : ((u = r), 0 === ke && De(D)));
              u !== r;

            )
              o.push(u),
                e.substr(_e, 2) === ie
                  ? ((u = ie), (_e += 2))
                  : ((u = r), 0 === ke && De(oe)),
                u === r &&
                  (P.test(e.charAt(_e))
                    ? ((u = e.charAt(_e)), _e++)
                    : ((u = r), 0 === ke && De(D)));
            (i = o !== r ? e.substring(i, _e) : o) !== r
              ? (39 === e.charCodeAt(_e)
                  ? ((o = x), _e++)
                  : ((o = r), 0 === ke && De(I)),
                o === r && (o = null),
                o !== r
                  ? ((ye = n), (n = t = a + i.replace("''", "'")))
                  : ((_e = n), (n = r)))
              : ((_e = n), (n = r));
          } else (_e = n), (n = r);
        else (_e = n), (n = r);
        return n;
      }
      function We() {
        var n, t, a, i;
        return (
          (n = _e),
          (t = _e),
          e.length > _e
            ? ((a = e.charAt(_e)), _e++)
            : ((a = r), 0 === ke && De(h)),
          a !== r
            ? ((ye = _e),
              (i = (i = ue(a)) ? void 0 : r) !== r
                ? (t = a = [a, i])
                : ((_e = t), (t = r)))
            : ((_e = t), (t = r)),
          t === r &&
            (10 === e.charCodeAt(_e)
              ? ((t = "\n"), _e++)
              : ((t = r), 0 === ke && De(ce))),
          (n = t !== r ? e.substring(n, _e) : t)
        );
      }
      function qe() {
        var n, t;
        return (
          ke++,
          (n = _e),
          (t = Je()) === r && (t = Qe()),
          (n = t !== r ? e.substring(n, _e) : t),
          ke--,
          n === r && ((t = r), 0 === ke && De(se)),
          n
        );
      }
      function Je() {
        var n, t, a, i, o;
        if (
          (ke++,
          (n = _e),
          48 === e.charCodeAt(_e)
            ? ((t = "0"), _e++)
            : ((t = r), 0 === ke && De(de)),
          t !== r && ((ye = n), (t = 0)),
          (n = t) === r)
        ) {
          if (
            ((n = _e),
            (t = _e),
            me.test(e.charAt(_e))
              ? ((a = e.charAt(_e)), _e++)
              : ((a = r), 0 === ke && De(fe)),
            a !== r)
          ) {
            for (
              i = [],
                pe.test(e.charAt(_e))
                  ? ((o = e.charAt(_e)), _e++)
                  : ((o = r), 0 === ke && De(he));
              o !== r;

            )
              i.push(o),
                pe.test(e.charAt(_e))
                  ? ((o = e.charAt(_e)), _e++)
                  : ((o = r), 0 === ke && De(he));
            i !== r ? (t = a = [a, i]) : ((_e = t), (t = r));
          } else (_e = t), (t = r);
          t !== r && ((ye = n), (t = E(t.join(""), 10))), (n = t);
        }
        return ke--, n === r && ((t = r), 0 === ke && De(le)), n;
      }
      function Qe() {
        var n, t, a, i, o;
        if (
          (ke++,
          (n = _e),
          (t = []),
          (a = _e),
          (i = _e),
          ke++,
          (o = je()) === r && (o = He()),
          ke--,
          o === r ? (i = void 0) : ((_e = i), (i = r)),
          i !== r
            ? (e.length > _e
                ? ((o = e.charAt(_e)), _e++)
                : ((o = r), 0 === ke && De(h)),
              o !== r ? (a = i = [i, o]) : ((_e = a), (a = r)))
            : ((_e = a), (a = r)),
          a !== r)
        )
          for (; a !== r; )
            t.push(a),
              (a = _e),
              (i = _e),
              ke++,
              (o = je()) === r && (o = He()),
              ke--,
              o === r ? (i = void 0) : ((_e = i), (i = r)),
              i !== r
                ? (e.length > _e
                    ? ((o = e.charAt(_e)), _e++)
                    : ((o = r), 0 === ke && De(h)),
                  o !== r ? (a = i = [i, o]) : ((_e = a), (a = r)))
                : ((_e = a), (a = r));
        else t = r;
        return (
          (n = t !== r ? e.substring(n, _e) : t),
          ke--,
          n === r && ((t = r), 0 === ke && De(ve)),
          n
        );
      }
      var Xe,
        en,
        nn,
        tn = ["root"];
      function rn() {
        return "plural" === tn[tn.length - 1];
      }
      function an() {
        return n && n.captureLocation ? { location: Se() } : {};
      }
      if ((t = i()) !== r && _e === e.length) return t;
      throw (
        (t !== r && _e < e.length && De({ type: "end" }),
        (Xe = we),
        (en = be < e.length ? e.charAt(be) : null),
        (nn = be < e.length ? Pe(be, be + 1) : Pe(be, be)),
        new Mu(Mu.buildMessage(Xe, en), Xe, en, nn))
      );
    },
    Ou = function () {
      for (var e = 0, n = 0, t = arguments.length; n < t; n++)
        e += arguments[n].length;
      var r = f(e),
        a = 0;
      for (n = 0; n < t; n++)
        for (var i = arguments[n], o = 0, u = i.length; o < u; o++, a++)
          r[a] = i[o];
      return r;
    },
    Bu = /(^|[^\\])#/g;
  function zu(e) {
    e.forEach(function (e) {
      (Ru(e) || Cu(e)) &&
        p.keys(e.options).forEach(function (n) {
          for (
            var t, r = e.options[n], a = -1, i = void 0, o = 0;
            o < r.value.length;
            o++
          ) {
            var u = r.value[o];
            if (wu(u) && Bu.test(u.value)) {
              (a = o), (i = u);
              break;
            }
          }
          if (i) {
            var c = i.value.replace(Bu, "$1{" + e.value + ", number}"),
              s = Lu(c);
            (t = r.value).splice.apply(t, Ou([a, 1], s));
          }
          zu(r.value);
        });
    });
  }
  var Fu = function () {
      return (
        (Fu =
          p.assign ||
          function (e) {
            for (var n, t = 1, r = arguments.length; t < r; t++)
              for (var a in (n = arguments[t]))
                p.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
            return e;
          }),
        Fu.apply(this, arguments)
      );
    },
    Ku =
      /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  function Uu(e) {
    var n = {};
    return (
      e.replace(Ku, function (e) {
        var t = e.length;
        switch (e[0]) {
          case "G":
            n.era = 4 === t ? "long" : 5 === t ? "narrow" : "short";
            break;
          case "y":
            n.year = 2 === t ? "2-digit" : "numeric";
            break;
          case "Y":
          case "u":
          case "U":
          case "r":
            throw new RangeError(
              "`Y/u/U/r` (year) patterns are not supported, use `y` instead"
            );
          case "q":
          case "Q":
            throw new RangeError("`q/Q` (quarter) patterns are not supported");
          case "M":
          case "L":
            n.month = ["numeric", "2-digit", "short", "long", "narrow"][t - 1];
            break;
          case "w":
          case "W":
            throw new RangeError("`w/W` (week) patterns are not supported");
          case "d":
            n.day = ["numeric", "2-digit"][t - 1];
            break;
          case "D":
          case "F":
          case "g":
            throw new RangeError(
              "`D/F/g` (day) patterns are not supported, use `d` instead"
            );
          case "E":
            n.weekday = 4 === t ? "short" : 5 === t ? "narrow" : "short";
            break;
          case "e":
            if (t < 4)
              throw new RangeError(
                "`e..eee` (weekday) patterns are not supported"
              );
            n.weekday = ["short", "long", "narrow", "short"][t - 4];
            break;
          case "c":
            if (t < 4)
              throw new RangeError(
                "`c..ccc` (weekday) patterns are not supported"
              );
            n.weekday = ["short", "long", "narrow", "short"][t - 4];
            break;
          case "a":
            n.hour12 = !0;
            break;
          case "b":
          case "B":
            throw new RangeError(
              "`b/B` (period) patterns are not supported, use `a` instead"
            );
          case "h":
            (n.hourCycle = "h12"), (n.hour = ["numeric", "2-digit"][t - 1]);
            break;
          case "H":
            (n.hourCycle = "h23"), (n.hour = ["numeric", "2-digit"][t - 1]);
            break;
          case "K":
            (n.hourCycle = "h11"), (n.hour = ["numeric", "2-digit"][t - 1]);
            break;
          case "k":
            (n.hourCycle = "h24"), (n.hour = ["numeric", "2-digit"][t - 1]);
            break;
          case "j":
          case "J":
          case "C":
            throw new RangeError(
              "`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead"
            );
          case "m":
            n.minute = ["numeric", "2-digit"][t - 1];
            break;
          case "s":
            n.second = ["numeric", "2-digit"][t - 1];
            break;
          case "S":
          case "A":
            throw new RangeError(
              "`S/A` (second) pattenrs are not supported, use `s` instead"
            );
          case "z":
            n.timeZoneName = t < 4 ? "short" : "long";
            break;
          case "Z":
          case "O":
          case "v":
          case "V":
          case "X":
          case "x":
            throw new RangeError(
              "`Z/O/v/V/X/x` (timeZone) pattenrs are not supported, use `z` instead"
            );
        }
        return "";
      }),
      n
    );
  }
  var $u = /^\.(?:(0+)(\+|#+)?)?$/g,
    ju = /^(@+)?(\+|#+)?$/g;
  function Hu(e) {
    var n = {};
    return (
      e.replace(ju, function (e, t, r) {
        return (
          "string" != typeof r
            ? ((n.minimumSignificantDigits = t.length),
              (n.maximumSignificantDigits = t.length))
            : "+" === r
            ? (n.minimumSignificantDigits = t.length)
            : "#" === t[0]
            ? (n.maximumSignificantDigits = t.length)
            : ((n.minimumSignificantDigits = t.length),
              (n.maximumSignificantDigits =
                t.length + ("string" == typeof r ? r.length : 0))),
          ""
        );
      }),
      n
    );
  }
  function Gu(e) {
    switch (e) {
      case "sign-auto":
        return { signDisplay: "auto" };
      case "sign-accounting":
        return { currencySign: "accounting" };
      case "sign-always":
        return { signDisplay: "always" };
      case "sign-accounting-always":
        return { signDisplay: "always", currencySign: "accounting" };
      case "sign-except-zero":
        return { signDisplay: "exceptZero" };
      case "sign-accounting-except-zero":
        return { signDisplay: "exceptZero", currencySign: "accounting" };
      case "sign-never":
        return { signDisplay: "never" };
    }
  }
  function Yu(e) {
    var n = Gu(e);
    return n || {};
  }
  function Vu(e) {
    for (var n = {}, t = 0, r = e; t < r.length; t++) {
      var a = r[t];
      switch (a.stem) {
        case "percent":
          n.style = "percent";
          continue;
        case "currency":
          (n.style = "currency"), (n.currency = a.options[0]);
          continue;
        case "group-off":
          n.useGrouping = !1;
          continue;
        case "precision-integer":
          n.maximumFractionDigits = 0;
          continue;
        case "measure-unit":
          (n.style = "unit"), (n.unit = a.options[0].replace(/^(.*?)-/, ""));
          continue;
        case "compact-short":
          (n.notation = "compact"), (n.compactDisplay = "short");
          continue;
        case "compact-long":
          (n.notation = "compact"), (n.compactDisplay = "long");
          continue;
        case "scientific":
          n = Fu(
            Fu(Fu({}, n), { notation: "scientific" }),
            a.options.reduce(function (e, n) {
              return Fu(Fu({}, e), Yu(n));
            }, {})
          );
          continue;
        case "engineering":
          n = Fu(
            Fu(Fu({}, n), { notation: "engineering" }),
            a.options.reduce(function (e, n) {
              return Fu(Fu({}, e), Yu(n));
            }, {})
          );
          continue;
        case "notation-simple":
          n.notation = "standard";
          continue;
        case "unit-width-narrow":
          (n.currencyDisplay = "narrowSymbol"), (n.unitDisplay = "narrow");
          continue;
        case "unit-width-short":
          (n.currencyDisplay = "code"), (n.unitDisplay = "short");
          continue;
        case "unit-width-full-name":
          (n.currencyDisplay = "name"), (n.unitDisplay = "long");
          continue;
        case "unit-width-iso-code":
          n.currencyDisplay = "symbol";
          continue;
      }
      if ($u.test(a.stem)) {
        if (a.options.length > 1)
          throw new RangeError(
            "Fraction-precision stems only accept a single optional option"
          );
        a.stem.replace($u, function (e, t, r) {
          return (
            "." === e
              ? (n.maximumFractionDigits = 0)
              : "+" === r
              ? (n.minimumFractionDigits = r.length)
              : "#" === t[0]
              ? (n.maximumFractionDigits = t.length)
              : ((n.minimumFractionDigits = t.length),
                (n.maximumFractionDigits =
                  t.length + ("string" == typeof r ? r.length : 0))),
            ""
          );
        }),
          a.options.length && (n = Fu(Fu({}, n), Hu(a.options[0])));
      } else if (ju.test(a.stem)) n = Fu(Fu({}, n), Hu(a.stem));
      else {
        var i = Gu(a.stem);
        i && (n = Fu(Fu({}, n), i));
      }
    }
    return n;
  }
  function Zu(e, n) {
    var t = Lu(e, n);
    return (n && !1 === n.normalizeHashtagInPlural) || zu(t), t;
  }
  var Wu = function () {
    for (var e = 0, n = 0, t = arguments.length; n < t; n++)
      e += arguments[n].length;
    var r = f(e),
      a = 0;
    for (n = 0; n < t; n++)
      for (var i = arguments[n], o = 0, u = i.length; o < u; o++, a++)
        r[a] = i[o];
    return r;
  };
  function qu(e) {
    return JSON.stringify(
      e.map(function (e) {
        return e && "object" == typeof e
          ? (function (e) {
              return p
                .keys(e)
                .sort()
                .map(function (n) {
                  var t;
                  return ((t = {})[n] = e[n]), t;
                });
            })(e)
          : e;
      })
    );
  }
  var Ju,
    Qu = function (e, n) {
      return (
        void 0 === n && (n = {}),
        function () {
          for (var t, r = [], a = 0; a < arguments.length; a++)
            r[a] = arguments[a];
          var i = qu(r),
            o = i && n[i];
          return (
            o ||
              ((o = new ((t = e).bind.apply(t, Wu([void 0], r)))()),
              i && (n[i] = o)),
            o
          );
        }
      );
    },
    Xu = (function () {
      var e = function (n, t) {
        return (
          (e =
            p.setPrototypeOf ||
            ({ __proto__: [] } instanceof f &&
              function (e, n) {
                e.__proto__ = n;
              }) ||
            function (e, n) {
              for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
            }),
          e(n, t)
        );
      };
      return function (n, t) {
        function r() {
          this.constructor = n;
        }
        e(n, t),
          (n.prototype =
            null === t ? p.create(t) : ((r.prototype = t.prototype), new r()));
      };
    })(),
    ec = function () {
      for (var e = 0, n = 0, t = arguments.length; n < t; n++)
        e += arguments[n].length;
      var r = f(e),
        a = 0;
      for (n = 0; n < t; n++)
        for (var i = arguments[n], o = 0, u = i.length; o < u; o++, a++)
          r[a] = i[o];
      return r;
    },
    nc = (function (e) {
      function n(n, t) {
        var r = e.call(this, n) || this;
        return (r.variableId = t), r;
      }
      return Xu(n, e), n;
    })(Error);
  function tc(e, n, t, r, a, i, o) {
    if (1 === e.length && wu(e[0])) return [{ type: 0, value: e[0].value }];
    for (var u, c = [], s = 0, l = e; s < l.length; s++) {
      var d = l[s];
      if (wu(d)) c.push({ type: 0, value: d.value });
      else if (xu(d))
        "number" == typeof i &&
          c.push({ type: 0, value: t.getNumberFormat(n).format(i) });
      else {
        var m = d.value;
        if (!a || !(m in a))
          throw new nc(
            'The intl string context variable "' +
              m +
              '" was not provided to the string "' +
              o +
              '"'
          );
        var f = a[m];
        if (ku(d))
          (f && "string" != typeof f && "number" != typeof f) ||
            (f = "string" == typeof f || "number" == typeof f ? h(f) : ""),
            c.push({ type: 1, value: f });
        else if (Su(d)) {
          var v = "string" == typeof d.style ? r.date[d.style] : void 0;
          c.push({ type: 0, value: t.getDateTimeFormat(n, v).format(f) });
        } else if (Au(d)) {
          v =
            "string" == typeof d.style
              ? r.time[d.style]
              : Pu(d.style)
              ? Uu(d.style.pattern)
              : void 0;
          c.push({ type: 0, value: t.getDateTimeFormat(n, v).format(f) });
        } else if (Eu(d)) {
          v =
            "string" == typeof d.style
              ? r.number[d.style]
              : Iu(d.style)
              ? Vu(d.style.tokens)
              : void 0;
          c.push({ type: 0, value: t.getNumberFormat(n, v).format(f) });
        } else if (Cu(d)) {
          if (!(_ = d.options[f] || d.options.other))
            throw new RangeError(
              'Invalid values for "' +
                d.value +
                '": "' +
                f +
                '". Options are "' +
                p.keys(d.options).join('", "') +
                '"'
            );
          c.push.apply(c, tc(_.value, n, t, r, a));
        } else if (Ru(d)) {
          var _;
          if (!(_ = d.options["=" + f])) {
            if (!Intl.PluralRules)
              throw new nc(
                'Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n'
              );
            var y = t
              .getPluralRules(n, { type: d.pluralType })
              .select(f - (d.offset || 0));
            _ = d.options[y] || d.options.other;
          }
          if (!_)
            throw new RangeError(
              'Invalid values for "' +
                d.value +
                '": "' +
                f +
                '". Options are "' +
                p.keys(d.options).join('", "') +
                '"'
            );
          c.push.apply(c, tc(_.value, n, t, r, a, f - (d.offset || 0)));
        } else;
      }
    }
    return (u = c).length < 2
      ? u
      : u.reduce(function (e, n) {
          var t = e[e.length - 1];
          return (
            t && 0 === t.type && 0 === n.type
              ? (t.value += n.value)
              : e.push(n),
            e
          );
        }, []);
  }
  var rc = /@@(\d+_\d+)@@/g,
    ac = 0;
  function ic(e, n) {
    return e
      .split(rc)
      .filter(m)
      .map(function (e) {
        return null != n[e] ? n[e] : e;
      })
      .reduce(function (e, n) {
        return (
          e.length && "string" == typeof n && "string" == typeof e[e.length - 1]
            ? (e[e.length - 1] += n)
            : e.push(n),
          e
        );
      }, []);
  }
  var oc =
      /(<([0-9a-zA-Z-_]*?)>(.*?)<\/([0-9a-zA-Z-_]*?)>)|(<[0-9a-zA-Z-_]*?\/>)/,
    uc = _.now() + "@@",
    cc = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ];
  function sc(e, n, t) {
    var r = e.tagName,
      a = e.outerHTML,
      i = e.textContent,
      o = e.childNodes;
    if (!r) return ic(i || "", n);
    r = r.toLowerCase();
    var u = ~cc.indexOf(r),
      c = t[r];
    if (c && u)
      throw new nc(
        r +
          " is a self-closing tag and can not be used, please use another tag name."
      );
    if (!o.length) return [a];
    var s = f.prototype.slice.call(o).reduce(function (e, r) {
      return e.concat(sc(r, n, t));
    }, []);
    return c
      ? "function" == typeof c
        ? [c.apply(void 0, s)]
        : [c]
      : ec(["<" + r + ">"], s, ["</" + r + ">"]);
  }
  function lc(e, n, t, r, a, i) {
    var o = tc(e, n, t, r, a, void 0, i),
      u = {},
      c = o.reduce(function (e, n) {
        if (0 === n.type) return e + n.value;
        var t = _.now() + "_" + ++ac;
        return (u[t] = n.value), e + "@@" + t + "@@";
      }, "");
    if (!oc.test(c)) return ic(c, u);
    if (!a) throw new nc("Message has placeholders but no values was given");
    if ("undefined" == typeof DOMParser)
      throw new nc("Cannot format XML message without DOMParser");
    Ju || (Ju = new DOMParser());
    var s = Ju.parseFromString(
      '<formatted-message id="' + uc + '">' + c + "</formatted-message>",
      "text/html"
    ).getElementById(uc);
    if (!s) throw new nc("Malformed HTML message " + c);
    var l = p.keys(a).filter(function (e) {
      return !!s.getElementsByTagName(e).length;
    });
    if (!l.length) return ic(c, u);
    var d = l.filter(function (e) {
      return e !== e.toLowerCase();
    });
    if (d.length)
      throw new nc(
        "HTML tag must be lowercased but the following tags are not: " +
          d.join(", ")
      );
    return f.prototype.slice.call(s.childNodes).reduce(function (e, n) {
      return e.concat(sc(n, u, a));
    }, []);
  }
  var dc = function () {
    return (
      (dc =
        p.assign ||
        function (e) {
          for (var n, t = 1, r = arguments.length; t < r; t++)
            for (var a in (n = arguments[t]))
              p.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
          return e;
        }),
      dc.apply(this, arguments)
    );
  };
  function mc(e, n) {
    return n
      ? p.keys(e).reduce(function (t, r) {
          var a, i;
          return (
            (t[r] =
              ((a = e[r]),
              (i = n[r])
                ? dc(
                    dc(dc({}, a || {}), i || {}),
                    p.keys(a).reduce(function (e, n) {
                      return (e[n] = dc(dc({}, a[n]), i[n] || {})), e;
                    }, {})
                  )
                : a)),
            t
          );
        }, dc({}, e))
      : e;
  }
  var fc,
    pc = (function () {
      function e(n, t, r, a) {
        var i,
          o = this;
        if (
          (void 0 === t && (t = e.defaultLocale),
          (this.formatterCache = { number: {}, dateTime: {}, pluralRules: {} }),
          (this.format = function (e) {
            return (function (e, n, t, r, a, i) {
              var o = tc(e, n, t, r, a, void 0, i);
              return 1 === o.length
                ? o[0].value
                : o.reduce(function (e, n) {
                    return e + n.value;
                  }, "");
            })(o.ast, o.locales, o.formatters, o.formats, e, o.message);
          }),
          (this.formatToParts = function (e) {
            return tc(
              o.ast,
              o.locales,
              o.formatters,
              o.formats,
              e,
              void 0,
              o.message
            );
          }),
          (this.formatHTMLMessage = function (e) {
            return lc(o.ast, o.locales, o.formatters, o.formats, e, o.message);
          }),
          (this.resolvedOptions = function () {
            return {
              locale: Intl.NumberFormat.supportedLocalesOf(o.locales)[0],
            };
          }),
          (this.getAst = function () {
            return o.ast;
          }),
          "string" == typeof n)
        ) {
          if (((this.message = n), !e.__parse))
            throw new x(
              "IntlMessageFormat.__parse must be set to process `message` of type `string`"
            );
          this.ast = e.__parse(n, { normalizeHashtagInPlural: !1 });
        } else this.ast = n;
        if (!f.isArray(this.ast))
          throw new x("A message must be provided as a String or AST.");
        (this.formats = mc(e.formats, r)),
          (this.locales = t),
          (this.formatters =
            (a && a.formatters) ||
            (void 0 === (i = this.formatterCache) &&
              (i = { number: {}, dateTime: {}, pluralRules: {} }),
            {
              getNumberFormat: Qu(Intl.NumberFormat, i.number),
              getDateTimeFormat: Qu(Intl.DateTimeFormat, i.dateTime),
              getPluralRules: Qu(Intl.PluralRules, i.pluralRules),
            }));
      }
      return (
        (e.defaultLocale = new Intl.NumberFormat().resolvedOptions().locale),
        (e.__parse = Zu),
        (e.formats = {
          number: {
            currency: { style: "currency" },
            percent: { style: "percent" },
          },
          date: {
            short: { month: "numeric", day: "numeric", year: "2-digit" },
            medium: { month: "short", day: "numeric", year: "numeric" },
            long: { month: "long", day: "numeric", year: "numeric" },
            full: {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          },
          time: {
            short: { hour: "numeric", minute: "numeric" },
            medium: { hour: "numeric", minute: "numeric", second: "numeric" },
            long: {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              timeZoneName: "short",
            },
            full: {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              timeZoneName: "short",
            },
          },
        }),
        e
      );
    })(),
    hc = function e(n, t) {
      void 0 === t && (t = "");
      var r = {};
      for (var a in n) {
        var i = t + a;
        "object" == typeof n[a] ? p.assign(r, e(n[a], i + ".")) : (r[i] = n[a]);
      }
      return r;
    },
    vc = uo({});
  function _c(e) {
    return e in fc;
  }
  function yc(e) {
    return null == e || _c(e) ? e : yc(Mc(e));
  }
  function gc(e) {
    for (
      var n = arguments.length, t = new f(n > 1 ? n - 1 : 0), r = 1;
      r < n;
      r++
    )
      t[r - 1] = arguments[r];
    var a = t.map(function (e) {
      return hc(e);
    });
    vc.update(function (n) {
      return (n[e] = p.assign.apply(p, [n[e] || {}].concat(vi(a)))), n;
    });
  }
  co([vc], function (e) {
    var n = e[0];
    return p.keys(n);
  }),
    vc.subscribe(function (e) {
      return (fc = e);
    });
  var bc = {};
  function wc(e) {
    return bc[e];
  }
  function kc(e) {
    return Lc(e)
      .reverse()
      .some(function (e) {
        var n;
        return null === (n = wc(e)) || void 0 === n ? void 0 : n.size;
      });
  }
  function Ec(e, n) {
    return Promise.all(
      n.map(function (n) {
        return (
          (function (e, n) {
            bc[e].delete(n), 0 === bc[e].size && delete bc[e];
          })(e, n),
          n().then(function (e) {
            return e.default || e;
          })
        );
      })
    ).then(function (n) {
      return gc.apply(void 0, [e].concat(vi(n)));
    });
  }
  var Sc = {};
  function Ac(e) {
    if (!kc(e)) return e in Sc ? Sc[e] : void 0;
    var n = (function (e) {
      return Lc(e)
        .reverse()
        .map(function (e) {
          var n = wc(e);
          return [e, n ? vi(n) : []];
        })
        .filter(function (e) {
          return e[1].length > 0;
        });
    })(e);
    return (
      (Sc[e] = Promise.all(
        n.map(function (e) {
          return Ec(e[0], e[1]);
        })
      ).then(function () {
        if (kc(e)) return Ac(e);
        delete Sc[e];
      })),
      Sc[e]
    );
  }
  function Cc(e, n) {
    var t = {};
    for (var r in e)
      p.prototype.hasOwnProperty.call(e, r) &&
        n.indexOf(r) < 0 &&
        (t[r] = e[r]);
    if (null != e && "function" == typeof p.getOwnPropertySymbols) {
      var a = 0;
      for (r = p.getOwnPropertySymbols(e); a < r.length; a++)
        n.indexOf(r[a]) < 0 &&
          p.prototype.propertyIsEnumerable.call(e, r[a]) &&
          (t[r[a]] = e[r[a]]);
    }
    return t;
  }
  var Rc = {
    fallbackLocale: null,
    initialLocale: null,
    loadingDelay: 200,
    formats: {
      number: {
        scientific: { notation: "scientific" },
        engineering: { notation: "engineering" },
        compactLong: { notation: "compact", compactDisplay: "long" },
        compactShort: { notation: "compact", compactDisplay: "short" },
      },
      date: {
        short: { month: "numeric", day: "numeric", year: "2-digit" },
        medium: { month: "short", day: "numeric", year: "numeric" },
        long: { month: "long", day: "numeric", year: "numeric" },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        },
      },
      time: {
        short: { hour: "numeric", minute: "numeric" },
        medium: { hour: "numeric", minute: "numeric", second: "numeric" },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        },
      },
    },
    warnOnMissingMessages: !0,
  };
  function xc() {
    return Rc;
  }
  var Ic,
    Pc = uo(!1),
    Dc = uo(null);
  function Nc(e, n) {
    return 0 === n.indexOf(e) && e !== n;
  }
  function Tc(e, n) {
    return e === n || Nc(e, n) || Nc(n, e);
  }
  function Mc(e) {
    var n = e.lastIndexOf("-");
    if (n > 0) return e.slice(0, n);
    var t = xc().fallbackLocale;
    return t && !Tc(e, t) ? t : null;
  }
  function Lc(e) {
    var n = e.split("-").map(function (e, n, t) {
        return t.slice(0, n + 1).join("-");
      }),
      t = xc().fallbackLocale;
    return t && !Tc(e, t) ? n.concat(Lc(t)) : n;
  }
  function Oc() {
    return Ic;
  }
  Dc.subscribe(function (e) {
    (Ic = e),
      "undefined" != typeof window && d.documentElement.setAttribute("lang", e);
  });
  var Bc = Dc.set;
  (Dc.set = function (e) {
    if (yc(e) && kc(e)) {
      var n,
        t = xc().loadingDelay;
      return (
        "undefined" != typeof window && null != Oc() && t
          ? (n = window.setTimeout(function () {
              return Pc.set(!0);
            }, t))
          : Pc.set(!0),
        Ac(e)
          .then(function () {
            Bc(e);
          })
          .finally(function () {
            w(n), Pc.set(!1);
          })
      );
    }
    return Bc(e);
  }),
    (Dc.update = function (e) {
      return Bc(e(Ic));
    });
  var zc = {},
    Fc = function e(n, t) {
      if (null == t) return null;
      var r = (function (e, n) {
        if (_c(e)) {
          var t = (function (e) {
            return fc[e] || null;
          })(e);
          if (n in t) return t[n];
        }
        return null;
      })(t, n);
      return r || e(n, Mc(t));
    },
    Kc = function (e) {
      var n = p.create(null);
      return function (t) {
        var r = JSON.stringify(t);
        return r in n ? n[r] : (n[r] = e(t));
      };
    },
    Uc = function (e, n) {
      var t = xc().formats;
      if (e in t && n in t[e]) return t[e][n];
      throw new Error('[svelte-i18n] Unknown "' + n + '" ' + e + " format.");
    },
    $c = Kc(function (e) {
      var n = e.locale,
        t = e.format,
        r = Cc(e, ["locale", "format"]);
      if (null == n)
        throw new Error(
          '[svelte-i18n] A "locale" must be set to format numbers'
        );
      return t && (r = Uc("number", t)), new Intl.NumberFormat(n, r);
    }),
    jc = Kc(function (e) {
      var n = e.locale,
        t = e.format,
        r = Cc(e, ["locale", "format"]);
      if (null == n)
        throw new Error('[svelte-i18n] A "locale" must be set to format dates');
      return (
        t
          ? (r = Uc("date", t))
          : 0 === p.keys(r).length && (r = Uc("date", "short")),
        new Intl.DateTimeFormat(n, r)
      );
    }),
    Hc = Kc(function (e) {
      var n = e.locale,
        t = e.format,
        r = Cc(e, ["locale", "format"]);
      if (null == n)
        throw new Error(
          '[svelte-i18n] A "locale" must be set to format time values'
        );
      return (
        t
          ? (r = Uc("time", t))
          : 0 === p.keys(r).length && (r = Uc("time", "short")),
        new Intl.DateTimeFormat(n, r)
      );
    }),
    Gc = Kc(function (e, n) {
      return void 0 === n && (n = Oc()), new pc(e, n, xc().formats);
    }),
    Yc = function (e, n) {
      void 0 === n && (n = {}), "object" == typeof e && (e = (n = e).id);
      var t = n,
        r = t.values,
        a = t.locale,
        i = void 0 === a ? Oc() : a,
        o = t.default;
      if (null == i)
        throw new Error(
          "[svelte-i18n] Cannot format a message without first setting the initial locale."
        );
      var u = (function (e, n) {
        if (n in zc && e in zc[n]) return zc[n][e];
        var t = Fc(e, n);
        return t
          ? (function (e, n, t) {
              return t
                ? (n in zc || (zc[n] = {}), e in zc[n] || (zc[n][e] = t), t)
                : t;
            })(e, n, t)
          : null;
      })(e, i);
      return u
        ? r
          ? Gc(u, i).format(r)
          : u
        : (xc().warnOnMissingMessages, o || e);
    },
    Vc = function (e, n) {
      return (function (e) {
        void 0 === e && (e = {});
        var n = e.locale,
          t = void 0 === n ? Oc() : n,
          r = Cc(e, ["locale"]);
        return Hc(p.assign({ locale: t }, r));
      })(n).format(e);
    },
    Zc = function (e, n) {
      return (function (e) {
        void 0 === e && (e = {});
        var n = e.locale,
          t = void 0 === n ? Oc() : n,
          r = Cc(e, ["locale"]);
        return jc(p.assign({ locale: t }, r));
      })(n).format(e);
    },
    Wc = function (e, n) {
      return (function (e) {
        void 0 === e && (e = {});
        var n = e.locale,
          t = void 0 === n ? Oc() : n,
          r = Cc(e, ["locale"]);
        return $c(p.assign({ locale: t }, r));
      })(n).format(e);
    };
  co([Dc, vc], function () {
    return Yc;
  }),
    co([Dc], function () {
      return Vc;
    }),
    co([Dc], function () {
      return Zc;
    }),
    co([Dc], function () {
      return Wc;
    });
  var qc = ["va_usd", "va_eur", "va_cad", "va_gbp"],
    Jc = ["bajaj", "onecard"];
  function Qc() {
    return ma() && !Ue();
  }
  var Xc = {
      card: function () {
        var e, n;
        if (He() && Be("method.card"))
          return Xe()
            ? Xe("card") && (null == (e = qe()) ? void 0 : e.card)
            : Je()
            ? null == (n = qe())
              ? void 0
              : n.card
            : Ge().card;
      },
      prepaid_card: function () {
        var e, n;
        if (Je())
          return null == (e = qe()) || null == (n = e.card)
            ? void 0
            : n.prepaid;
      },
      credit_card: function () {
        var e, n;
        if (He() && Be("method.card") && Be("method.credit_card"))
          return Je()
            ? null == (e = qe()) || null == (n = e.card)
              ? void 0
              : n.credit
            : Ge().credit_card;
      },
      debit_card: function () {
        var e, n;
        if (He() && Be("method.card") && Be("method.debit_card"))
          return Je()
            ? null == (e = qe()) || null == (n = e.card)
              ? void 0
              : n.debit
            : Ge().debit_card;
      },
      netbanking: function () {
        return wn(
          p.keys(
            (He() &&
              !Je() &&
              !We() &&
              !1 !== Be("method.netbanking") &&
              (function () {
                var e = Ge().netbanking;
                if (_e(e)) return {};
                return e;
              })()) ||
              {}
          )
        );
      },
      wallet: function () {
        return us().length;
      },
      nach: function () {
        var e, n;
        return (
          !He() &&
          "nach" === (null == (e = Ye()) ? void 0 : e.method) &&
          (null == (n = qe()) ? void 0 : n.nach)
        );
      },
      emandate: function () {
        var e, n;
        return Xe() && !We()
          ? Xe("emandate") && (null == (n = qe()) ? void 0 : n.emandate)
          : "emandate" === Ve() &&
              !We() &&
              !_e(null == (e = qe()) ? void 0 : e.emandate);
      },
      emi: function () {
        return (
          He() &&
          Be("method.emi") &&
          Ge().emi &&
          Ge().card &&
          !We() &&
          !Je() &&
          !_e(os())
        );
      },
      upi: function () {
        var e,
          n = p.keys(rs).some(is);
        return Qe()
          ? Xe("upi") && (null == (e = qe()) ? void 0 : e.upi) && n
          : Je()
          ? "upi" === Ve() && n
          : n;
      },
      app: function () {
        var e = !1;
        return (
          ke(Ge().app, function (n) {
            n && (e = !0);
          }),
          !(!e && !Ge().gpay)
        );
      },
      qr: function () {
        return is("qr");
      },
      cardless_emi: function () {
        if (!He() || We() || Je()) return !1;
        var e = (function () {
            var e = {};
            os().BAJAJ && (e.bajaj = !0);
            on() && os().onecard && (e.onecard = !0);
            (e = X({}, e, Ge().cardless_emi)), _e(e) && (e = {});
            var n = su(He(), e);
            Oe("fee_bearer") &&
              (n = (function (e) {
                var n = {};
                return (
                  p.keys(e).forEach(function (t) {
                    e[t].fee_bearer_customer && (n[t] = e[t]);
                  }),
                  n
                );
              })(n));
            return n;
          })(),
          n = !1 !== Be("method.cardless_emi") || e.bajaj;
        return (
          on() &&
            Jc.forEach(function (n) {
              return delete e[n];
            }),
          n && !_e(e)
        );
      },
      paylater: function () {
        return He() && !Je() && !We() && !_e(Ge().paylater);
      },
      bank_transfer: function () {
        var e = Oe("order.amount"),
          n = Oe("order.amount_due"),
          t = "full" !== Pi(Eo) && Pi(So) ? 100 * parseFloat(Pi(So)) : "",
          r = n ? e === n && !t : !t,
          a = (Oe("order.partial_payment") && e === t) || r;
        return (
          !Je() &&
          He() &&
          Ge().bank_transfer &&
          !We() &&
          Be("method.bank_transfer") &&
          a &&
          tn()
        );
      },
      offline_challan: function () {
        return (
          !Je() &&
          !We() &&
          He() &&
          Ge().offline &&
          Be("method.offline_challan") &&
          tn()
        );
      },
      paypal: function () {
        var e;
        return !Je() && We() && (null == (e = Ge().wallet) ? void 0 : e.paypal);
      },
      gpay: function () {
        return as() && ze();
      },
      upi_otm: function () {
        return (
          !1 !== Be("method.upi_otm") &&
          Ge().upi_otm &&
          (He() < 1e7 ||
            "upi_otm" === (null == (e = Ye()) ? void 0 : e.method)) &&
          !We() &&
          !Je() &&
          He()
        );
        var e;
      },
      cod: function () {
        return Be("method.cod") && Ge().cod && nn();
      },
      international: function () {
        return (
          (n = (null == (e = Ge()) ? void 0 : e.app) || {}),
          p.values(xo).some(function (e) {
            return n[e];
          })
        );
        var e, n;
      },
      intl_bank_transfer: function () {
        return (
          He() &&
          (function () {
            var e,
              n =
                null === (e = Ge()) || void 0 === e
                  ? void 0
                  : e.intl_bank_transfer;
            return (
              !(!n || "object" != typeof n) &&
              qc.some(function (e) {
                return n[e];
              })
            );
          })()
        );
      },
    },
    es = {
      credit_card: function () {
        return !0;
      },
      debit_card: function () {
        return !0;
      },
      card: function () {
        return !0;
      },
      upi: function () {
        return !0;
      },
      wallet: function () {
        return us().length > 0;
      },
      cod: function () {
        return !0;
      },
    };
  function ns(e) {
    var n = Ve(),
      t = function (e) {
        return m(
          Xc[e] &&
            Xc[e].call() &&
            (function (e) {
              if (Qc()) {
                var n = es[e];
                return !!n && n();
              }
              return !0;
            })(e)
        );
      };
    if (n && n !== e) {
      if ("card" === n && e.includes("_" + n)) return t(e);
      if ("upi" !== n || "qr" !== e) return !1;
    }
    return t(e);
  }
  function ts() {
    var e,
      n = [
        "card",
        "emi",
        "netbanking",
        "emandate",
        "nach",
        "upi_otm",
        "upi",
        "wallet",
        "paypal",
        "bank_transfer",
        "offline_challan",
        "international",
      ];
    if (Ve()) return Ve();
    var t = (function () {
      var e = Ye(),
        n = null == e ? void 0 : e.method;
      e && Je() && He() && (n = e.method || "card");
      var t = p.keys(Xc);
      return n && (t = [n]), t.filter(ns);
    })();
    return 1 ===
      (t = t.filter(function (e) {
        return n.includes(e);
      })).length
      ? (n.some(function (n) {
          if (n === t[0]) return (e = n), !0;
        }),
        e)
      : void 0;
  }
  var rs = {
    collect: function () {
      return m(Oe("methods.upi_type.collect", 1));
    },
    omnichannel: function () {
      return !Je() && !Fe() && Ze("google_pay_omnichannel");
    },
    qr: function () {
      var e =
        !Fe() &&
        Be("method.qr") &&
        !pa() &&
        Ge().upi_intent &&
        m(Oe("methods.upi_type.intent", 1));
      if (Je()) {
        var n,
          t = e && (null == (n = qe()) ? void 0 : n.upi) && en();
        return Qe() ? Xe("upi") && t : "upi" === ts() && t;
      }
      return e;
    },
    intent: function () {
      var e =
        !Fe() &&
        Ge().upi_intent &&
        m(Oe("methods.upi_type.intent", 1)) &&
        Oo.all.length;
      if (Je()) {
        var n = e && en();
        return Qe() ? Xe("upi") && n : "upi" === ts() && n;
      }
      return e;
    },
    intentUrl: function () {
      var e;
      return (
        !Je() &&
        !Fe() &&
        !l.CheckoutBridge &&
        !ua &&
        !ma() &&
        Ge().upi_intent &&
        m(Oe("methods.upi_type.intent", 1)) &&
        (function () {
          var e = Be("method.upi");
          if (he(e) && !1 === e.intent) return !1;
          return !0;
        })() &&
        "web" === (null == (e = Bo()) ? void 0 : e.platform) &&
        (ta || (na && Oe("experiments.reuse_upi_paymentId") && an()))
      );
    },
  };
  function as() {
    var e;
    return (
      !1 !== Be("method.upi") &&
      Ge().upi &&
      (He() <= 1e7 || "upi" === (null == (e = Ye()) ? void 0 : e.method)) &&
      !We() &&
      He()
    );
  }
  function is(e) {
    var n = Be("method.upi");
    return (!he(n) || !1 !== n[e]) && as() && rs[e]();
  }
  function os(e) {
    var n = Ge().emi_options;
    if (_e(n)) return {};
    var t = (function (e, n) {
      var t = {};
      return (
        ke(n, function (n, r) {
          if (tu(r)) {
            var a = n.filter(function (n) {
              return n.min_amount <= e;
            });
            a.length &&
              (t[r] = a.reduce(function (e, n) {
                return (e[n.duration] = n), e;
              }, {}));
          }
        }),
        t
      );
    })(e || He(), n);
    return (
      (t = ye(t, function (e, n) {
        return X({}, tu(n), { plans: e, min_amount: ru(e) });
      })).BAJAJ &&
        (function (e, n) {
          if (cu[e]) (cu[e] = p.assign(cu[e], n)), cu[e];
        })("bajaj", { min_amount: t.BAJAJ.min_amount }),
      t
    );
  }
  function us() {
    var e,
      n = Be("method.wallet"),
      t = (null == (e = Ge()) ? void 0 : e.wallet) || {},
      r = (function (e) {
        return (
          void 0 === e && (e = []),
          He() >= 1e7
            ? e.filter(function (e) {
                var n, t;
                return m(
                  null == (n = Qo.wallet) || null == (t = n[e]) ? void 0 : t[Jo]
                );
              })
            : e
        );
      })(p.keys(t));
    if (
      ((function (e) {
        var n = Be("external.wallets");
        ke(n, function (n) {
          bu[n] && ((bu[n].custom = !0), e.includes(n) || e.unshift(n));
        });
      })(r),
      !He() || !1 === n || 0 === r.length || Je() || We())
    )
      return [];
    n &&
      "object" == typeof n &&
      (r = r.filter(function (e) {
        return !1 !== n[e];
      }));
    var a = Qc(),
      i = r
        .map(function (e) {
          return bu[e];
        })
        .filter(function (e) {
          return !!e && (!a || e.power);
        });
    return (function (e) {
      return e.sort(function (e, n) {
        var t = _u.includes(e.code),
          r = _u.includes(n.code),
          a = _u.indexOf(e.code),
          i = _u.indexOf(n.code);
        return t && r ? a - i : t ? -1 : r ? 1 : 0;
      });
    })(i);
  }
  uo(!1);
  var cs,
    ss = !1;
  function ls(e) {
    var n,
      t = this;
    if (!En(this, ls)) return new ls(e);
    ii.call(this),
      (this.id = Er.makeUid()),
      ti.setContext(Na, this.id),
      Tr.setR(this);
    try {
      (n = (function (e) {
        (e && "object" == typeof e) || Pn("Invalid options");
        var n = new di(e);
        return (
          (function (e, n) {
            void 0 === n && (n = []);
            var t = !0;
            (e = e.get()),
              ke(hs, function (r, a) {
                if (!n.includes(a) && a in e) {
                  var i = r(e[a], e);
                  i && ((t = !1), Pn("Invalid " + a + " (" + i + ")"));
                }
              });
          })(n, ["amount"]),
          (function (e) {
            ke(e, function (n, t) {
              fn(n)
                ? n.length > 254 && (e[t] = n.slice(0, 254))
                : mn(n) || dn(n) || delete e[t];
            });
          })(n.get("notes")),
          n
        );
      })(e)),
        (this.get = n.get),
        (this.set = n.set);
    } catch (n) {
      var r = n.message;
      (this.get && this.isLiveMode()) || (he(e) && !e.parent && l.alert(r)),
        Pn(r);
    }
    [
      "integration",
      "integration_version",
      "integration_parent_version",
    ].forEach(function (e) {
      var n = t.get("_." + e);
      n && (Er.props[e] = n);
    }),
      Ko.every(function (e) {
        return !n.get(e);
      }) && Pn("No key passed"),
      Ae.updateInstance(this),
      this.postInit();
  }
  var ds = (ls.prototype = new ii());
  function ms(e, n) {
    return _t.jsonp({
      url: Fo("preferences"),
      data: e,
      callback: function (e) {
        (Ae.preferenceResponse = e), n(e);
      },
    });
  }
  function fs(e) {
    if (e) {
      var n = {},
        t = Be("key");
      t && (n.key_id = t);
      var r = [Be("currency")],
        a = Be("display_currency"),
        i = Be("display_amount");
      a && ("" + i).length && r.push(a),
        (n.currency = r),
        [
          "order_id",
          "customer_id",
          "invoice_id",
          "payment_link_id",
          "subscription_id",
          "auth_link_id",
          "recurring",
          "subscription_card_change",
          "account_id",
          "contact_id",
          "checkout_config_id",
          "amount",
        ].forEach(function (e) {
          var t = Be(e);
          t && (n[e] = t);
        }),
        (n["_[build]"] = $t),
        (n["_[checkout_id]"] = e.id),
        (n["_[library]"] = Er.props.library),
        (n["_[platform]"] = Er.props.platform),
        "desktop" === va() && (n.qr_required = !0);
      var o = zo() || {};
      return (n = X({}, n, o));
    }
  }
  (ds.postInit = xa),
    (ds.onNew = function (e, n) {
      var t = this;
      "ready" === e &&
        (this.prefs
          ? n(e, this.prefs)
          : ms(fs(this), function (e) {
              e.methods && ((t.prefs = e), (t.methods = e.methods)),
                n(t.prefs, e);
            }));
    }),
    (ds.emi_calculator = function (e, n) {
      return ls.emi.calculator(this.get("amount") / 100, e, n);
    }),
    (ls.emi = {
      calculator: function (e, n, t) {
        if (!t) return y.ceil(e / n);
        t /= 1200;
        var r = y.pow(1 + t, n);
        return E((e * t * r) / (r - 1), 10);
      },
      calculatePlan: function (e, n, t) {
        var r = this.calculator(e, n, t);
        return { total: t ? r * n : e, installment: r };
      },
    }),
    (ls.payment = {
      getMethods: function (e) {
        return ms({ key_id: ls.defaults.key }, function (n) {
          e(n.methods || n);
        });
      },
      getPrefs: function (e, n) {
        var t = Rn();
        return (
          Tr.track("prefs:start", { type: te }),
          he(e) &&
            (e["_[request_index]"] = Tr.updateRequestIndex("preferences")),
          _e(cs) || _e(cs.order)
            ? _t({
                url: Mn(Fo("preferences"), e),
                callback: function (r) {
                  if (
                    (Tr.track("prefs:end", { type: te, data: { time: t() } }),
                    r.xhr && 0 === r.xhr.status)
                  )
                    return ms(e, n);
                  n(r);
                },
              })
            : (Tr.track("prefs:end", { type: te, data: { time: t() } }),
              void n(cs))
        );
      },
      getRewards: function (e, n) {
        var t = Rn();
        return (
          Tr.track("rewards:start", { type: te }),
          _t({
            url: Mn(Fo("checkout/rewards"), e),
            callback: function (e) {
              Tr.track("rewards:end", { type: te, data: { time: t() } }), n(e);
            },
          })
        );
      },
    }),
    (ds.isLiveMode = function () {
      var e = this.preferences;
      return (!e && /^rzp_l/.test(this.get("key"))) || (e && "live" === e.mode);
    }),
    (ds.getMode = function () {
      var e = this.preferences;
      return this.get("key") || e
        ? (!e && /^rzp_l/.test(this.get("key"))) || (e && "live" === e.mode)
          ? "live"
          : "test"
        : "pending";
    }),
    (ds.calculateFees = function (e) {
      var n = this;
      return new Promise(function (t, r) {
        (e = pi(e, n)),
          _t.post({
            url: Fo("payments/calculate/fees"),
            data: e,
            callback: function (e) {
              return e.error ? r(e) : t(e);
            },
          });
      });
    }),
    (ds.fetchVirtualAccount = function (e) {
      var n = e.customer_id,
        t = e.order_id,
        r = e.notes;
      return new Promise(function (e, a) {
        if (t) {
          var i = { customer_id: n, notes: r };
          n || delete i.customer_id, r || delete i.notes;
          var o = Fo("orders/" + t + "/virtual_accounts?x_entity_id=" + t);
          _t.post({
            url: o,
            data: i,
            callback: function (n) {
              return n.error ? a(n) : e(n);
            },
          });
        } else a("Order ID is required to fetch the account details");
      });
    }),
    (ds.checkCREDEligibility = function (e) {
      var n,
        t = this,
        r = (void 0 === n && (n = Er.id), Yo[n]),
        a = zo({ cred: !0 }) || {},
        i = (function (e, n) {
          n = Fo(n);
          for (var t = 0; t < Ko.length; t++) {
            var r = Ko[t],
              a = Be(r);
            if (((r = "key" === r ? "key_id" : "x_entity_id"), a)) {
              var i = Be("account_id");
              return (
                i && (a += "&account_id=" + i),
                n + (n.indexOf("?") >= 0 ? "&" : "?") + r + "=" + a
              );
            }
          }
          return n;
        })(r && r.r, "payments/validate/account"),
        o = new Promise(function (n, o) {
          if (!e)
            return o(new Error("contact is required to check eligibility"));
          _t.post({
            url: i,
            data: X(
              {
                entity: "cred",
                value: e,
                "_[checkout_id]":
                  (null == r ? void 0 : r.id) || (null == t ? void 0 : t.id),
                "_[build]": $t,
                "_[library]": Er.props.library,
                "_[platform]": Er.props.platform,
              },
              a
            ),
            callback: function (e) {
              var t,
                r = "ELIGIBLE" === (null == (t = e.data) ? void 0 : t.state);
              return (
                jr.Track(Fr.ELIGIBILITY_CHECK, {
                  source: "validate_api",
                  isEligible: r,
                }),
                r ? n(e) : o(e)
              );
            },
          });
        });
      return o;
    });
  var ps,
    hs = {
      notes: function (e) {
        if (he(e) && wn(p.keys(e)) > 15) return "At most 15 notes are allowed";
      },
      amount: function (e, n) {
        var t,
          r,
          a = n.display_currency || n.currency || "INR",
          i = De(a),
          o = i.minimum,
          u = "";
        if (
          (i.decimals && i.minor
            ? (u = " " + i.minor)
            : i.major && (u = " " + i.major),
          void 0 === (r = o) && (r = 100),
          (/[^0-9]/.test((t = e)) || !((t = E(t, 10)) >= r)) && !n.recurring)
        )
          return (
            "should be passed in integer" +
            u +
            ". Minimum value is " +
            o +
            u +
            ", i.e. " +
            (function (e, n, t) {
              return (
                void 0 === t && (t = !0), [Te[n], Le(e, n)].join(t ? " " : "")
              );
            })(o, a)
          );
      },
      currency: function (e) {
        if (!Ne.includes(e))
          return "The provided currency is not currently supported";
      },
      display_currency: function (e) {
        if (!(e in Te) && e !== ls.defaults.display_currency)
          return "This display currency is not supported";
      },
      display_amount: function (e) {
        if (
          !(e = h(e).replace(/([^0-9.])/g, "")) &&
          e !== ls.defaults.display_amount
        )
          return "";
      },
      payout: function (e, n) {
        if (e) {
          if (!n.key) return "key is required for a Payout";
          if (!n.contact_id) return "contact_id is required for a Payout";
        }
      },
    };
  function vs(e, n) {
    for (var t = 0; t < n.length; t++) {
      var r = n[t];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        p.defineProperty(e, r.key, r);
    }
  }
  function _s(e, n, t) {
    return n && vs(e.prototype, n), t && vs(e, t), e;
  }
  (ls.configure = function (e, n) {
    void 0 === n && (n = {}),
      ke(si(e, oi), function (e, n) {
        typeof oi[n] == typeof e && (oi[n] = e);
      }),
      n.library &&
        ((Er.props.library = n.library), ti.setContext(Fa, n.library)),
      n.referer &&
        ((Er.props.referer = n.referer), ti.setContext(Ga, n.referer));
  }),
    (ls.hasCheckoutFrameLoaded = function () {
      return ss;
    }),
    (ls.defaults = oi),
    (l.Razorpay = ls),
    (oi.timeout = 0),
    (oi.name = ""),
    (oi.partnership_logo = ""),
    (oi.nativeotp = !0),
    (oi.remember_customer = !1),
    (oi.personalization = !1),
    (oi.paused = !1),
    (oi.fee_label = ""),
    (oi.force_terminal_id = ""),
    (oi.is_donation_checkout = !1),
    (oi.keyless_header = ""),
    (oi.min_amount_label = ""),
    (oi.partial_payment = {
      min_amount_label: "",
      full_amount_label: "",
      partial_amount_label: "",
      partial_amount_description: "",
      select_partial: !1,
    }),
    (oi.method = {
      netbanking: null,
      card: !0,
      credit_card: !0,
      debit_card: !0,
      cardless_emi: null,
      wallet: null,
      emi: !0,
      upi: null,
      upi_intent: !0,
      qr: !0,
      bank_transfer: !0,
      offline_challan: !0,
      upi_otm: !0,
      cod: !0,
    }),
    (oi.prefill = {
      amount: "",
      wallet: "",
      provider: "",
      method: "",
      name: "",
      contact: "",
      email: "",
      vpa: "",
      coupon_code: "",
      "card[number]": "",
      "card[expiry]": "",
      "card[cvv]": "",
      "billing_address[line1]": "",
      "billing_address[line2]": "",
      "billing_address[postal_code]": "",
      "billing_address[city]": "",
      "billing_address[country]": "",
      "billing_address[state]": "",
      "billing_address[first_name]": "",
      "billing_address[last_name]": "",
      bank: "",
      "bank_account[name]": "",
      "bank_account[account_number]": "",
      "bank_account[account_type]": "",
      "bank_account[ifsc]": "",
      auth_type: "",
    }),
    (oi.features = { cardsaving: !0 }),
    (oi.readonly = { contact: !1, email: !1, name: !1 }),
    (oi.hidden = { contact: !1, email: !1 }),
    (oi.modal = {
      confirm_close: !1,
      ondismiss: xa,
      onhidden: xa,
      escape: !0,
      animation:
        !l.matchMedia ||
        !(
          null != (ps = l.matchMedia("(prefers-reduced-motion: reduce)")) &&
          ps.matches
        ),
      backdropclose: !1,
      handleback: !0,
    }),
    (oi.external = { wallets: [], handler: xa }),
    (oi.challan = { fields: [], disclaimers: [], expiry: {} }),
    (oi.theme = {
      upi_only: !1,
      color: "",
      backdrop_color: "rgba(0,0,0,0.6)",
      image_padding: !0,
      image_frame: !0,
      close_button: !0,
      close_method_back: !1,
      hide_topbar: !1,
      branding: "",
      debit_card: !1,
    }),
    (oi._ = {
      integration: null,
      integration_version: null,
      integration_parent_version: null,
      integration_type: null,
    }),
    (oi.config = { display: {} });
  var ys =
    "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap";
  function gs() {
    var e;
    (e = ys),
      d.querySelector('link[href$="'.concat(e, '"]')) ||
        (function (e) {
          return new Promise(function (n, t) {
            var r = Bn("link");
            (r.rel = "stylesheet"),
              (r.href = e),
              (r.onload = n),
              (r.onerror = t),
              d.head.appendChild(r);
          });
        })(ys).catch(function (e) {
          jr.TrackMetric("inter_font_load_failure", { data: { error: e } });
        });
  }
  var bs = {
      PRODUCT: { page: "product", text: "Buy now with Magic" },
      PRODUCT_SM: { page: "product_sm", text: "Buy now" },
      CART: { page: "cart", text: "Checkout with Magic" },
      CART_SM: { page: "cart_sm", text: "Checkout" },
    },
    ws = ["page-type", "width", "border-radius", "bg-color", "title"];
  var ks = function (e) {
      return {};
    },
    Es = function (e) {
      return {};
    };
  function Ss(e) {
    var n,
      t,
      r,
      a,
      i,
      o,
      u,
      c,
      s = e[8].title,
      l = (function (e, n, t, r) {
        if (e) {
          var a = Di(e, n, t, r);
          return e[0](a);
        }
      })(s, e, e[7], Es),
      d =
        l ||
        (function (e) {
          var n,
            t,
            r = (e[3] || e[4]) + "";
          return {
            c: function () {
              (n = Li("span")), (t = Bi(r));
            },
            m: function (e, r) {
              Ti(e, n, r), Ni(n, t);
            },
            p: function (e, n) {
              24 & n &&
                r !== (r = (e[3] || e[4]) + "") &&
                (function (e, n) {
                  (n = "" + n), e.wholeText !== n && (e.data = n);
                })(t, r);
            },
            d: function (e) {
              e && Mi(n);
            },
          };
        })(e);
    return {
      c: function () {
        (n = Li("button")),
          (t = Oi("svg")),
          (r = Oi("path")),
          (a = Oi("path")),
          (i = Bi(" ")),
          d && d.c(),
          zi(
            r,
            "d",
            "M5.14321 4.72412L4.47803 7.1758L8.28423 4.71034L5.7951 14.0119L8.32281 14.0142L11.9999 0.275635L5.14321 4.72412Z"
          ),
          zi(r, "fill", "#F4F6FE"),
          zi(
            a,
            "d",
            "M1.04646 10.1036L0 14.0138H5.18124C5.18124 14.0138 7.3005 6.06116 7.30109 6.05884C7.2991 6.06011 1.04646 10.1036 1.04646 10.1036Z"
          ),
          zi(a, "fill", "#F4F6FE"),
          zi(t, "width", "12"),
          zi(t, "height", "15"),
          zi(t, "viewBox", "0 0 12 15"),
          zi(t, "fill", "none"),
          zi(t, "xmlns", "http://www.w3.org/2000/svg"),
          zi(t, "class", "icon"),
          zi(n, "id", "razorpay-magic-btn"),
          Fi(n, "width", e[0], 1),
          Fi(n, "border-radius", e[1], 1),
          Fi(n, "background-color", e[2], 1),
          zi(n, "data-testid", "razorpay-magic-btn");
      },
      m: function (s, l) {
        var m, f, p, h;
        Ti(s, n, l),
          Ni(n, t),
          Ni(t, r),
          Ni(t, a),
          Ni(n, i),
          d && d.m(n, null),
          (o = !0),
          u ||
            ((m = n),
            (f = "click"),
            (p = e[5]),
            m.addEventListener(f, p, h),
            (c = function () {
              return m.removeEventListener(f, p, h);
            }),
            (u = !0));
      },
      p: function (e, t) {
        var r = t[0];
        l
          ? l.p &&
            (!o || 128 & r) &&
            (function (e, n, t, r, a, i) {
              if (a) {
                var o = Di(n, t, r, i);
                e.p(o, a);
              }
            })(
              l,
              s,
              e,
              e[7],
              o
                ? (function (e, n, t, r) {
                    if (e[2] && r) {
                      var a = e[2](r(t));
                      if (void 0 === n.dirty) return a;
                      if ("object" == typeof a) {
                        for (
                          var i = [],
                            o = Math.max(n.dirty.length, a.length),
                            u = 0;
                          u < o;
                          u += 1
                        )
                          i[u] = n.dirty[u] | a[u];
                        return i;
                      }
                      return n.dirty | a;
                    }
                    return n.dirty;
                  })(s, e[7], r, ks)
                : (function (e) {
                    if (e.ctx.length > 32) {
                      for (var n = [], t = e.ctx.length / 32, r = 0; r < t; r++)
                        n[r] = -1;
                      return n;
                    }
                    return -1;
                  })(e[7]),
              Es
            )
          : d && d.p && (!o || 24 & r) && d.p(e, o ? r : -1),
          (!o || 1 & r) && Fi(n, "width", e[0], 1),
          (!o || 2 & r) && Fi(n, "border-radius", e[1], 1),
          (!o || 4 & r) && Fi(n, "background-color", e[2], 1);
      },
      i: function (e) {
        o || (eo(d, e), (o = !0));
      },
      o: function (e) {
        !(function (e, n, t, r) {
          if (e && e.o) {
            if (Xi.has(e)) return;
            Xi.add(e),
              (void 0).c.push(function () {
                Xi.delete(e), r && (t && e.d(1), r());
              }),
              e.o(n);
          }
        })(d, e),
          (o = !1);
      },
      d: function (e) {
        e && Mi(n), d && d.d(e), (u = !1), c();
      },
    };
  }
  function As(e, n, t) {
    var r,
      a = n.$$slots,
      i = void 0 === a ? {} : a,
      o = n.$$scope,
      u = n.width,
      c = void 0 === u ? "100%" : u,
      s = n.borderRadius,
      l = void 0 === s ? "4px" : s,
      d = n.pageType,
      m = void 0 === d ? bs.CART : d,
      f = n.bgColor,
      p = void 0 === f ? "#0460f8" : f,
      h = n.title,
      v = void 0 === h ? "" : h,
      _ = Ui();
    return (
      (e.$$set = function (e) {
        "width" in e && t(0, (c = e.width)),
          "borderRadius" in e && t(1, (l = e.borderRadius)),
          "pageType" in e && t(6, (m = e.pageType)),
          "bgColor" in e && t(2, (p = e.bgColor)),
          "title" in e && t(3, (v = e.title)),
          "$$scope" in e && t(7, (o = e.$$scope));
      }),
      (e.$$.update = function () {
        if (64 & e.$$.dirty) {
          var n = bs.PRODUCT,
            a = bs.PRODUCT_SM,
            i = bs.CART,
            o = bs.CART_SM;
          switch (m) {
            case n.page:
              t(4, (r = n.text));
              break;
            case a.page:
              t(4, (r = a.text));
              break;
            case i.page:
              t(4, (r = i.text));
              break;
            case o.page:
              t(4, (r = o.text));
              break;
            default:
              t(4, (r = "Checkout with Magic"));
          }
        }
      }),
      [
        c,
        l,
        p,
        v,
        r,
        function (e) {
          _("click", e);
        },
        m,
        o,
        i,
      ]
    );
  }
  var Cs = (function (e) {
      function n(n) {
        var t;
        return (
          to(
            (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })((t = e.call(this) || this)),
            n,
            As,
            Ss,
            xi,
            { width: 0, borderRadius: 1, pageType: 6, bgColor: 2, title: 3 }
          ),
          t
        );
      }
      return (
        ki(n, e),
        _s(n, [
          {
            key: "width",
            get: function () {
              return this.$$.ctx[0];
            },
            set: function (e) {
              this.$$set({ width: e }), Ji();
            },
          },
          {
            key: "borderRadius",
            get: function () {
              return this.$$.ctx[1];
            },
            set: function (e) {
              this.$$set({ borderRadius: e }), Ji();
            },
          },
          {
            key: "pageType",
            get: function () {
              return this.$$.ctx[6];
            },
            set: function (e) {
              this.$$set({ pageType: e }), Ji();
            },
          },
          {
            key: "bgColor",
            get: function () {
              return this.$$.ctx[2];
            },
            set: function (e) {
              this.$$set({ bgColor: e }), Ji();
            },
          },
          {
            key: "title",
            get: function () {
              return this.$$.ctx[3];
            },
            set: function (e) {
              this.$$set({ title: e }), Ji();
            },
          },
        ]),
        n
      );
    })(ro),
    Rs = d.createElement("template");
  if (
    ((Rs.innerHTML =
      "\n  <style>\n  * {\n    padding: 0px;\n    margin: 0px;\n    border: 0px;\n    box-sizing: border-box;\n  }\n\n  #razorpay-magic-btn {\n    width: 100% !important;\n    padding: 14px !important;\n    background-color: #0460F8 !important;\n    color: #fff !important;\n    border-radius: 4px !important;\n    cursor: pointer !important;\n  }\n\n  #razorpay-magic-btn span {\n    font-family: 'Inter' !important;\n    font-weight: bold !important;\n    font-size: 14px !important;\n  }\n\n  #razorpay-magic-btn .icon {\n    margin-bottom: -1.1px;\n  }\n  </style>\n"),
    !Xr && "customElements" in window)
  ) {
    var xs = (function (e) {
      function n() {
        var n;
        return (
          ((n = e.call(this) || this)._root = n.attachShadow({
            mode: "closed",
          })),
          (n._options = {}),
          (n._rzp = null),
          gs(),
          n._root.appendChild(Rs.content.cloneNode(!0)),
          (n._button = new Cs({ target: n._root })),
          n
        );
      }
      ki(n, e);
      var t = n.prototype;
      return (
        (t.restyle = function () {
          var e = this;
          ws.forEach(function (n) {
            var t = e.getAttribute(n);
            if (t) {
              var r = n.replace(/-([a-z])/g, function (e, n) {
                return n.toUpperCase();
              });
              e._button[r] = t;
            }
          });
        }),
        (t.attributeChangedCallback = function (e, n, t) {
          t !== n && this.restyle();
        }),
        (t.openRzpModal = function (e) {
          e.stopPropagation();
          var n = this._options,
            t = n.key,
            r = n.order_id,
            a = n.amount;
          "true" === this.getAttribute("auto-checkout") &&
            ((t && a) || r) &&
            ((this._rzp = new window.Razorpay(this._options)),
            this._rzp.open()),
            this.dispatchEvent(new CustomEvent("click", e));
        }),
        (t.connectedCallback = function () {
          var e = this;
          this._root
            .getElementById("razorpay-magic-btn")
            .addEventListener("click", this.openRzpModal.bind(this)),
            g(function () {
              var n = e.querySelector('[slot="title"]');
              null != n && n.textContent && (e._button.title = n.textContent);
            }),
            this.restyle();
        }),
        (t.disconnectedCallback = function () {
          this._button.removeEventListener(
            "click",
            this.openRzpModal.bind(this)
          );
        }),
        _s(
          n,
          [
            {
              key: "rzp",
              get: function () {
                return this._rzp;
              },
            },
            {
              key: "options",
              set: function (e) {
                (this._options = e),
                  (this._rzp = new window.Razorpay(this._options));
              },
            },
          ],
          [
            {
              key: "observedAttributes",
              get: function () {
                return ws;
              },
            },
          ]
        ),
        n
      );
    })(wi(HTMLElement));
    // window.customElements.get("magic-checkout-btn") ||
    //   window.customElements.define("magic-checkout-btn", xs);
  }
  var Is = "page_view",
    Ps = "payment_successful",
    Ds = "payment_failed",
    Ns = "pay_now_clicked",
    Ts = "rzp_payments";
  function Ms(e, n) {
    var t;
    if (null != (t = window) && t.ga)
      for (
        var r = window.ga,
          a = "function" == typeof r.getAll ? r.getAll() : [],
          i = 0;
        i < a.length;
        i++
      ) {
        r(a[i].get("name") + "." + e, n);
      }
  }
  function Ls() {
    try {
      undefined;
    } catch (e) {}
  }
  function Os(e) {
    nn() &&
      ((Oe("features.one_cc_ga_analytics") || Be("enable_ga_analytics")) &&
        l.Razorpay.sendMessage({ event: "gaevent", data: e }),
      (Oe("features.one_cc_fb_analytics") || Be("enable_fb_analytics")) &&
        l.Razorpay.sendMessage({ event: "fbaevent", data: e }));
  }
  var Bs,
    zs,
    Fs,
    Ks,
    Us = l,
    $s = Us.screen,
    js = Us.scrollTo,
    Hs = ea,
    Gs = !1,
    Ys = {
      overflow: "",
      metas: null,
      orientationchange: function () {
        Ys.resize.call(this), Ys.scroll.call(this);
      },
      resize: function () {
        var e = l.innerHeight || $s.height;
        (qs.container.style.position = e < 450 ? "absolute" : "fixed"),
          (this.el.style.height = y.max(e, 460) + "px");
      },
      scroll: function () {
        if ("number" == typeof l.pageYOffset)
          if (l.innerHeight < 460) {
            var e = 460 - l.innerHeight;
            l.pageYOffset > e + 120 && Bt(e);
          } else this.isFocused || Bt(0);
      },
    };
  function Vs() {
    return (
      Ys.metas ||
        (Ys.metas = Nt(
          'head meta[name=viewport],head meta[name="theme-color"]'
        )),
      Ys.metas
    );
  }
  function Zs(e) {
    var n = Ft.frame;
    if (!n) {
      n = Fo("checkout", !1);
      var t = fs(e);
      t ? (n = Mn(n, t)) : (n += "/public");
    }
    return (n = Mn(n, { traffic_env: jt, build: Ht }));
  }
  function Ws(e) {
    try {
      qs.backdrop.style.background = e;
    } catch (e) {}
  }
  function qs(e) {
    if (((Bs = d.body), (zs = d.head), (Fs = Bs.style), e))
      return this.getEl(e), this.openRzp(e);
    this.getEl(), (this.time = Sn());
  }
  qs.prototype = {
    getEl: function (e) {
      if (!this.el) {
        var n = {
          style:
            "opacity: 1; height: 100%; position: relative; background: none; display: block; border: 0 none transparent; margin: 0px; padding: 0px; z-index: 2;",
          allowtransparency: !0,
          frameborder: 0,
          width: "100%",
          height: "100%",
          allowpaymentrequest: !0,
          src: Zs(e),
          class: "razorpay-checkout-frame",
        };
        this.el = Wn(Bn("iframe"), n);
      }
      return this.el;
    },
    openRzp: function (e) {
      var n = qn(this.el, { width: "100%", height: "100%" }),
        t = e.get("parent");
      t && (t = Mt(t));
      var r = t || qs.container;
      Ks ||
        (Ks = (function (e, n, t) {
          var r;
          void 0 === e && (e = d.body), void 0 === t && (t = !1);
          try {
            if (t) {
              d.body.style.background = "#00000080";
              var a = Bn("style");
              (a.innerText =
                "@keyframes rzp-rot{to{transform: rotate(360deg);}}@-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}}"),
                Hn(a, e);
            }
            (r = d.createElement("div")).className = "razorpay-loader";
            var i =
              "margin:-25px 0 0 -25px;height:50px;width:50px;animation:rzp-rot 1s infinite linear;-webkit-animation:rzp-rot 1s infinite linear;border: 1px solid rgba(255, 255, 255, 0.2);border-top-color: rgba(255, 255, 255, 0.7);border-radius: 50%;";
            return (
              (i += n
                ? "margin: 100px auto -150px;border: 1px solid rgba(0, 0, 0, 0.2);border-top-color: rgba(0, 0, 0, 0.7);"
                : "position:absolute;left:50%;top:50%;"),
              r.setAttribute("style", i),
              Hn(r, e),
              r
            );
          } catch (e) {
            ai(e, { severity: Ir, unhandled: !1 });
          }
        })(r, t)),
        e !== this.rzp && (zn(n) !== r && Gn(r, n), (this.rzp = e)),
        (function () {
          var e = Be("prefill.contact"),
            n = Be("prefill.email");
          e && ti.setContext(ja, e),
            n && ti.setContext(Ha, n),
            tn() && ti.setContext(Ka, tn());
          var t = Be("_.integration");
          t && ti.setContext(Ma, t);
          var r = Be("_.integration_version");
          r && ti.setContext(Oa, r);
          var a = Pa.INTEGRATION,
            i = Da.WEB,
            o = Be("_.integration_type");
          o &&
            (o === Pa.RZP_APP
              ? (a = Pa.RZP_APP)
              : o === Da.PLUGIN && (i = Da.PLUGIN),
            ti.setContext(La, o)),
            ti.setContext(Ta, a),
            ti.setContext(za, i);
          var u = Be("_.integration_parent_version");
          u && ti.setContext(Ba, u);
        })(),
        t
          ? (Zn(n, "minHeight", "530px"), (this.embedded = !0))
          : (tt(Zn(r, "display", "block")),
            Ws(e.get("theme.backdrop_color")),
            /^rzp_t/.test(e.get("key")) &&
              qs.ribbon &&
              (qs.ribbon.style.opacity = 1),
            this.setMetaAndOverflow()),
        this.bind(),
        this.onload();
    },
    makeMessage: function (e, n) {
      var t = this.rzp,
        r = t.get(),
        a = {
          integration: Er.props.integration,
          referer: Er.props.referer || P.href,
          options: r,
          library: Er.props.library,
          id: t.id,
        };
      return (
        e && (a.event = e),
        t._order && (a._order = t._order),
        t._prefs && (a._prefs = t._prefs),
        t.metadata && (a.metadata = t.metadata),
        n && (a.extra = n),
        ke(t.modal.options, function (e, n) {
          r["modal." + n] = e;
        }),
        this.embedded && (delete r.parent, (a.embedded = !0)),
        (function (e) {
          var n = e.image;
          if (n && fn(n)) {
            if (Dn(n)) return;
            if (n.indexOf("http")) {
              var t =
                  P.protocol + "//" + P.hostname + (P.port ? ":" + P.port : ""),
                r = "";
              "/" !== n[0] &&
                "/" !== (r += P.pathname.replace(/[^/]*$/g, ""))[0] &&
                (r = "/" + r),
                (e.image = t + r + n);
            }
          }
        })(r),
        a
      );
    },
    close: function () {
      Ws(""),
        qs.ribbon && (qs.ribbon.style.opacity = 0),
        (function (e) {
          e && e.forEach(Yn);
          var n = Vs();
          n && n.forEach(Hn(zs));
        })(this.$metas),
        (Fs.overflow = Ys.overflow),
        this.unbind(),
        Hs && js(0, Ys.oldY),
        Ls(),
        Er.flush();
    },
    bind: function () {
      var e = this;
      if (!this.listeners) {
        this.listeners = [];
        var n = {};
        Hs &&
          ((n.orientationchange = Ys.orientationchange),
          this.rzp.get("parent") || (n.resize = Ys.resize)),
          ke(n, function (n, t) {
            e.listeners.push(ut(t, n.bind(e))(window));
          });
      }
    },
    unbind: function () {
      this.listeners.forEach(function (e) {
        "function" == typeof e && e();
      }),
        (this.listeners = null);
    },
    setMetaAndOverflow: function () {
      zs &&
        (Vs().forEach(function (e) {
          return Yn(e);
        }),
        (this.$metas = [
          Wn(Bn("meta"), {
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
          }),
          Wn(Bn("meta"), {
            name: "theme-color",
            content: this.rzp.get("theme.color"),
          }),
        ]),
        this.$metas.forEach(Hn(zs)),
        (Ys.overflow = Fs.overflow),
        (Fs.overflow = "hidden"),
        Hs &&
          ((Ys.oldY = l.pageYOffset),
          l.scrollTo(0, 0),
          Ys.orientationchange.call(this)));
    },
    postMessage: function (e) {
      var n, t;
      (e.id = this.rzp.id),
        (e = JSON.stringify(e)),
        null == (n = this.el) ||
          null == (t = n.contentWindow) ||
          t.postMessage(e, "*");
    },
    prefetchPrefs: function (e) {
      e !== this.rzp && (this.rzp = e),
        this.postMessage(this.makeMessage("prefetch"));
    },
    makeCheckoutCallForShopify: function (e, n) {
      e !== this.rzp && (this.rzp = e),
        Gs
          ? this.postMessage(
              this.makeMessage("1cc_shopify_checkout_initiate", n)
            )
          : this.onevent({ event: "shopify_failure" });
    },
    onmessage: function (e) {
      var n = Ee(e.data);
      if (n) {
        var t = n.event,
          r = this.rzp;
        if (
          e.origin &&
          "frame" === n.source &&
          e.source === this.el.contentWindow
        ) {
          try {
            if (
              0 !== Ft.api.indexOf(e.origin) &&
              !/.*[.]razorpay.(com|in)$/.test(e.origin)
            )
              return void Tr.track("postmessage_origin_redflag", {
                type: te,
                data: { origin: e.origin },
                immediately: !0,
              });
          } catch (e) {}
          (n = n.data),
            this["on" + t](n),
            ("dismiss" !== t && "fault" !== t) ||
              Tr.track(t, { data: n, r: r, immediately: !0 });
        }
      }
    },
    onload: function (e) {
      e && "checkout-frame" === e.origin && ((Gs = !0), (ss = !0)),
        this.rzp && this.postMessage(this.makeMessage());
    },
    onfocus: function () {
      this.isFocused = !0;
    },
    onblur: function () {
      (this.isFocused = !1), Ys.orientationchange.call(this);
    },
    onrender: function () {
      Ks && (Yn(Ks), (Ks = null)), this.rzp.emit("render");
    },
    onevent: function (e) {
      this.rzp.emit(e.event, e.data);
    },
    ongaevent: function (e) {
      var n,
        t,
        r = e.event,
        a = e.category,
        i = e.params,
        o = void 0 === i ? {} : i;
      this.rzp.set("enable_ga_analytics", !0),
        null != (n = window) &&
          n.gtag &&
          "function" == typeof window.gtag &&
          window.gtag("event", r, X({ event_category: a }, o)),
        null != (t = window) &&
          t.ga &&
          "function" == typeof window.ga &&
          Ms(
            "send",
            r === Is
              ? { hitType: "pageview", title: a }
              : { hitType: "event", eventCategory: a, eventAction: r }
          );
    },
    onfbaevent: function (e) {
      var n,
        t = e.eventType,
        r = void 0 === t ? "trackCustom" : t,
        a = e.event,
        i = e.category,
        o = e.params,
        u = void 0 === o ? {} : o;
      null != (n = window) &&
        n.fbq &&
        "function" == typeof window.fbq &&
        (this.rzp.set("enable_fb_analytics", !0),
        i && (u.page = i),
        window.fbq(r, a, u));
    },
    onredirect: function (e) {
      Er.flush(),
        e.target || (e.target = this.rzp.get("target") || "_top"),
        Lt(e);
    },
    onsubmit: function (e) {
      Os({ event: Ns, category: Ts }), Er.flush();
      var n = this.rzp;
      "wallet" === e.method &&
        (n.get("external.wallets") || []).forEach(function (t) {
          if (t === e.wallet)
            try {
              n.get("external.handler").call(n, e);
            } catch (e) {}
        }),
        n.emit("payment.submit", { method: e.method });
    },
    ondismiss: function (e) {
      this.close();
      var n = this.rzp.get("modal.ondismiss");
      pn(n) &&
        g(function () {
          return n(e);
        });
    },
    onhidden: function () {
      Er.flush(), this.afterClose();
      var e = this.rzp.get("modal.onhidden");
      pn(e) && e();
    },
    oncomplete: function (e) {
      var n = this.rzp.get(),
        t = n.enable_ga_analytics,
        r = n.enable_fb_analytics;
      t && this.ongaevent({ event: Ps, category: Ts }),
        r && this.onfbaevent({ event: Ps, category: Ts }),
        this.close();
      var a = this.rzp,
        i = a.get("handler");
      Tr.track("checkout_success", { r: a, data: e, immediately: !0 }),
        pn(i) &&
          g(function () {
            i.call(a, e);
          }, 200);
    },
    onpaymenterror: function (e) {
      Er.flush();
      var n = this.rzp.get(),
        t = n.enable_ga_analytics,
        r = n.enable_fb_analytics;
      t && this.ongaevent({ event: Ds, category: Ts }),
        r && this.onfbaevent({ event: Ds, category: Ts });
      try {
        var a,
          i = this.rzp.get("callback_url"),
          o = this.rzp.get("redirect") || fa,
          u = this.rzp.get("retry");
        if (o && i && !1 === u)
          return (
            null != e &&
              null != (a = e.error) &&
              a.metadata &&
              (e.error.metadata = JSON.stringify(e.error.metadata)),
            void Lt({
              url: i,
              content: e,
              method: "post",
              target: this.rzp.get("target") || "_top",
            })
          );
        this.rzp.emit("payment.error", e), this.rzp.emit("payment.failed", e);
      } catch (e) {}
    },
    onfailure: function (e) {
      var n = this.rzp.get(),
        t = n.enable_ga_analytics,
        r = n.enable_fb_analytics;
      t && this.ongaevent({ event: Ds, category: Ts }),
        r && this.onfbaevent({ event: Ds, category: Ts }),
        this.ondismiss(),
        l.alert("Payment Failed.\n" + e.error.description),
        this.onhidden();
    },
    onfault: function (e) {
      var n = "Something went wrong.";
      fn(e)
        ? (n = e)
        : hn(e) &&
          (e.message || e.description) &&
          (n = e.message || e.description),
        Er.flush(),
        this.rzp.close(),
        this.rzp.emit("fault.close");
      var t = this.rzp.get("callback_url");
      (this.rzp.get("redirect") || fa) && t
        ? gt({ url: t, params: { error: e }, method: "POST" })
        : l.alert("Oops! Something went wrong.\n" + n),
        this.afterClose();
    },
    afterClose: function () {
      Ls(), (qs.container.style.display = "none");
    },
    onflush: function (e) {
      Er.flush(e);
    },
  };
  X(
    {
      name_label: "Full Name",
      pincode_label: "Pincode",
      city_label: "City",
      state_label: "State",
      international_pincode_label: "Pincode/Zipcode",
      international_state_label: "State/Province",
      country_label: "Country",
      house_label: "House Number, Apartment",
      area_label: "Area, Colony, Street, Sector*",
      landmark_label: "Landmark",
      landmark_optional_label: "Landmark (Optional)",
      shipping_address_label: "Delivery Address",
      save_label: "Save As",
      cta_label: "Continue",
      save_consent_label: "Save address",
      save_consent_label_tnc: "Terms and Conditions",
      save_consent_label_privacy: "Privacy Policy",
      save_consent_label_and: "and",
      save_consent_tooltip: "I agree to save my details as per Razorpayâ€™s",
      input_error_label: "Please enter your {field}",
      house_error_label: "Enter a minimum of 10 characters",
      area_error_label: "Enter a minimum of 5 characters",
      add_address_label: "Add New Address",
      non_serviceable_label: "This order cannot be delivered to this location.",
      saved_address_phone_label: "Phone no",
      saved_address_landmark_label: "Landmark",
      saved_address_cta_label: "Use your Saved Address",
      shipping_charges_label: "{charge} delivery charges added",
      same_address_checkbox_label: "Billing address same as delivery address",
      saved_address_label: "Your address has been saved",
      error_label: "Address should be less than 255 characters",
      landmark_error_label: "Enter characters between 2 to 32 only.",
      city_state_error_label: "Enter alphabets (a-z) only.",
      name_lang_error: "Enter your name in English only.",
      address_lang_error: "Enter an address in English only.",
      name_error_label: "Enter characters between 2 to 64 only.",
      unserviceable_label: "Unserviceable",
      serviceable_label: "Serviceable",
      order_update_failure: "We could not proceed due to some technical error.",
      state_search_all: "All states",
      state_search_placeholder: "Search a state",
      custom_tag_label: "Save As",
      required_label: "Required",
      zipcode_error_label: "Invalid zipcode entered.",
      generic_pattern_error_label: "Inalid input entered.",
      indian_contact_error_label: "Enter a 10-digit number only.",
      contact_error_label: "Enter a valid mobile number.",
      pincode_error_message: "Enter a 6-digit pincode only.",
      edit_address_label: "Edit",
      pincode_non_serviceable_label:
        "This pincode is not serviceable. Try again with another address",
      add_landmark: "Add Landmark",
      optional: "(Optional)",
      address_tags_heading: "Save address as",
      home: "Home",
      office: "Office",
      others: "Others",
    },
    { billing_address_label: "Billing Address" },
    {
      consent_modal_title: "Use saved addresses?",
      consent_modal_content_label:
        "Allow using addresses saved earlier on other Razorpay products.",
      consent_modal_cta_label: "Continue",
      consent_banner_title: "Can't find your address?",
      consent_banner_content_label:
        "Weâ€™ve found a few addresses youâ€™ve saved earlier on other Razorpay products.",
      consent_banner_cta_label: "Allow using saved addresses",
      consent_error_title: "Address load failed",
      consent_error_content_label:
        "We are unable to load your saved addresses. Please try again or add a new address.",
      consent_error_cta_label: "Retry",
    }
  );
  X(
    {
      add_another_card_btn: "Add another card",
      auth_type_header: "Complete Payment Using",
      auth_type_otp: "OTP / Password",
      auth_type_pin: "ATM PIN",
      bank_verification_action_continue: "Continue",
      bank_verification_description:
        "Click continue to complete the payment on the bank page",
      bank_verification_title: "Bank verification required",
      card_number_help: "Please enter a valid card number.",
      card_number_help_amex:
        "Amex cards are not supported for this transaction.",
      card_number_help_recurring: "Card does not support recurring payments.",
      card_number_help_unsupported:
        "This card is not supported for the payment",
      card_number_label: "Card Number",
      card_expiry_help: "Invalid expiry date",
      cards_saved_on_apps_label: "Pay with card on other apps",
      cards_saved_on_rzp_label: "YOUR SAVED CARDS",
      cards_saved_on_rzp_label_redesign: "Saved Cards",
      cards_saved_label_one_cc: "All cards supported",
      checking_cred_eligibility: "Checking you eligibility status on CRED",
      cvv_help: "It's a {length} digit code printed on the back of your card.",
      cvv_label: "CVV",
      enter_card_details_option_label: "Or, Enter card details",
      expiry_label: "Expiry",
      name_help: "Please enter name on your card",
      name_label: "Card Holder's name",
      no_cred_account:
        "You're currently not a CRED member. Become a CRED member to pay via CRED Pay and earn special perks. To proceed for now, try a different payment method.",
      nocvv_label: "My Maestro Card doesn't have Expiry/CVV",
      recurring_callout:
        "Future payments on this card will be charged automatically.",
      save_card_text: "Keep card saved for future payments",
      save_card_text_new_card: "Save card securely for future payments",
      know_more: "Know More",
      saved_card_label: "Card ending with <b>{last4}<b>",
      saved_card_checkbox_tooltip: "Required for recurring payments",
      subscription_callout:
        "This card will be linked to the subscription and future payments will be charged automatically.",
      subscription_refund_callout:
        "The charge is to enable subscription on this card and it will be refunded.",
      use_saved_cards_btn: "Use saved cards",
      use_saved_cards_on_rzp_btn: "Use saved cards on Razorpay",
      view_all_emi_plans: "View all EMI Plans",
      international_currency_charges:
        "Relevant currency conversion charges might be applicable, as Amex will process the transaction in INR. To avoid currency conversion charges please use MasterCard or Visa.",
      avs_form_address_line_1: "Address Line 1*",
      avs_form_address_line_2: "Address Line 2",
      avs_form_zip_code: "Zipcode*",
      avs_form_country: "Country*",
      avs_form_state: "State*",
      avs_form_city: "City*",
      avs_country_search_title: "Search for a country",
      avs_state_search_title: "Search for a state",
      avs_info_title: "Help us verify the transaction",
      avs_heading: "Verify your billing address linked to the bank",
      avs_info_message_1:
        "This is the address on your bankâ€™s record and is used to send your account statements.",
      avs_info_message_2:
        "The billing address verification helps us protect you from fraud transactions.",
      avs_info_message_3:
        "Your address is used only for verification and is securely processed via encrypted servers.",
      avs_country_all: "All Countries",
      avs_state_all: "All States",
      avs_country_select: "Select a country",
      avs_state_select: "Select a state",
      avs_address_details: "Address Details",
      avs_form_input_required: "This field is required",
      save_card_know_more_existing_card_modal_title:
        "Keep card saved for future payments",
      save_card_know_more_existing_card_modal_content:
        "As per RBI guidelines, your permission is required to continue keeping this card saved securely on Razorpay.",
      save_card_know_more_existing_card_modal_content_bullet1:
        "Skip entering card details everytime for a faster experience",
      save_card_know_more_existing_card_modal_content_bullet2:
        "Protect sensitive card information & increase security",
      save_card_know_more_add_card_modal_title:
        "Save cards securely for future payments",
      save_card_know_more_add_card_modal_subtitle_caw:
        "Future payments on this card will be charged automatically.",
      save_card_know_more_add_card_modal_subtitle_subscription:
        "This card will be linked to the subscription and future payments will be charged automatically.",
      save_card_know_more_add_card_modal_content1:
        "Your card will be stored securely as a saved payment method as per RBIâ€™s latest guidelines.",
      save_card_know_more_add_card_modal_content_international:
        "Saving the card is required to automatically charge your card for future payments on Razorpay",
      save_card_know_more_add_card_modal_content_international1:
        "All saved cards are compliant with the latest security guidelines.",
      save_card_know_more_add_card_modal_content_recurring:
        "As per RBIâ€™s latest guidelines, your permission is required to continue keeping this card saved securely for future payments on Razorpay.",
      save_card_know_more_add_card_modal_content_recurring_without_merchant_name:
        "Your card will be stored securely as a saved payment method on Razorpay as per RBIâ€™s latest guidelines.",
      save_card_know_more_add_card_modal_recurring_content:
        "This is required to automatically charge your card for recurring payments.",
      save_card_compliant_with_guidelines:
        "All saved cards are compliant with the latest security guidelines",
      enter_cvv: "Enter CVV",
      use_bank_card: "Use {bank} {type} card only",
      enter_bank_card_to_avail_emi:
        "Enter a {bank} {type} card to avail EMI or try another EMI option.",
      emi_not_supported:
        "EMI not supported on this card. Try again with another {bank} {type} card or pay full amount.",
      saved_cards: "Saved Cards",
      credit_debit_card: "{type} Card",
    },
    {
      pay_with_saved_cards: "Pay With Your Saved Card",
      pay_with_saved_cards_subtitle: "Access securely with OTP",
      add_new_card: "Add New Card",
    }
  ),
    X(
      {
        cancel_reason_back_action: "Back",
        cancel_reason_collect_not_received: "Did not receive collect request",
        cancel_reason_failed_in_app: "Payment failed in UPI app",
        cancel_reason_money_deducted:
          "Money got deducted but payment is still processing",
        cancel_reason_other: "Other",
        cancel_reason_submit_action: "Submit",
        cancel_reason_title:
          "Please give us a reason before we cancel the payment",
        collect_block_heading: "Pay using UPI ID",
        collect_block_subheading:
          "You will receive a payment request on your UPI app",
        collect_enter_upi_id: "Enter your UPI ID",
        collect_new_vpa_help:
          "Please enter a valid VPA of the form username@bank",
        collect_securely_save: "Securely save your UPI ID",
        gpay_block_heading: "Pay using Gpay App",
        gpay_web_api_title: "Google Pay",
        intent_accept_request:
          "Please accept the request from Razorpay's VPA on your UPI app",
        intent_block_heading: "Pay Using Apps",
        intent_no_apps_error:
          "No UPI App on this device. Select other UPI option to proceed.",
        intent_select_app: "Select UPI App in your device",
        invalid_vpa_default_message:
          "Invalid VPA, please try again with correct VPA",
        new_vpa_subtitle: "Google Pay, BHIM, PhonePe & more",
        new_vpa_subtitle_upi_otm: "Phonepe, GooglePay, PayTM & BHIM",
        new_vpa_title_logged_in: "Add UPI ID",
        new_vpa_title_logged_out: "UPI ID",
        omni_block_heading: "Or, pay using phone number",
        omni_enter_number: "Enter your phone number",
        omni_error:
          "Please ensure the same number is linked to the Google Pay account.",
        omni_gpay_number: "Google Pay phone number",
        omni_gpay_subtitle: "Instant payment using Google Pay App",
        omni_verifying_phone: "Verifying mobile number with Google Pay..",
        qr_block_heading: "Pay using QR Code",
        recommended: "Recommended",
        recurring_subscription_callout:
          "The charge is to enable subscription on this card and it will be refunded.",
        recurring_caw_callout_all_data:
          "This is a recurring payment and upto {maxAmount} will be charged now. {merchantName} can charge upto {amount} on a {recurringFrequency} basis till {endDate}.",
        recurring_caw_callout_no_frequency:
          "This is a recurring payment and {maxAmount} will be charged now. {merchantName} can charge upto {amount} anytime till {endDate}.",
        recurring_caw_callout_no_name:
          "This is a recurring payment and upto {maxAmount} will be charged now. You will be charged upto {amount} on a {recurringFrequency} basis till {endDate}.",
        recurring_caw_callout_no_name_no_frequency:
          "This is a recurring payment and {maxAmount} will be charged now. You will be charged upto {amount} anytime till {endDate}.",
        recurring_caw_callout_as_presented:
          "This is a recurring payment and upto {maxAmount} will be charged now. {merchantName} can automatically charge upto {amount} for each payment in the future.",
        redirect_to_app: "You will be redirected to your UPI app",
        redirect_to_app_v2:
          "Choose the app installed on your phone to make the payment directly using the app",
        ux_failed_app_callout:
          "Payment failed with <b>{appName}<b>. Please retry payment with a different UPI app",
        scan_qr_code: "Scan the QR code using your UPI app",
        upi_id_linked_to_bank: "UPI ID is linked to",
        show_other_apps: "Show other UPI apps",
        show_qr_code: "Show QR Code",
        subscription_refund_callout:
          "This card will be linked to the subscription and future payments will be charged automatically.",
        upi_otm_callout:
          "<strong>{amount}<strong> will be blocked on your account by clicking pay. Your account will be charged {nameString} between <strong>{startDate}<strong> to <strong>{endDate}<strong>.",
        use_saved_cards_btn: "Use saved cards",
        use_saved_cards_on_rzp_btn: "Use saved cards on Razorpay",
        view_all_emi_plans: "View all EMI Plans",
        verifying_vpa_info: "Verifying your VPA",
      },
      {
        pay_with_installed_or_others: "Pay with installed app, or use others",
        qr_timer_callout_text: "QR Code is valid for ",
        qr_timer_callout:
          '<span color="red">{minutes}<span color="red"> minutes',
        qr_expired: "The previous QR got expired",
        qr_refresh: "Refresh QR",
        qr_show: "Show QR",
        qr_scan_on_phone: "Scan the QR using any UPI app on your phone.",
        pay_with_upi_qr: "Pay With UPI QR",
        apps_plural: "are",
        apps_singular: "is",
        facing_issues: "facing issues. Please use other UPI apps.",
      }
    ),
    uo(!1);
  var Js = p.keys({
    en: "English",
    ben: "à¦¬à¦¾à¦‚à¦²à¦¾",
    hi: "à¤¹à¤¿à¤‚à¤¦à¥€",
    mar: "à¤®à¤°à¤¾à¤ à¥€",
    guj: "àª—à«àªœàª°àª¾àª¤à«€",
    tam: "à®¤à®®à®¿à®´à¯",
    tel: "à°¤à±†à°²à±à°—à±",
    kan: "à²•à²¨à³à²¨à²¡",
  });
  function Qs(e) {
    return Js.some(function (n) {
      return e === n;
    });
  }
  function Xs() {
    var e = je();
    if ("auto" === e) {
      var n =
        "undefined" == typeof window
          ? null
          : window.navigator.language || window.navigator.languages[0];
      n && (e = n.split("-")[0]);
    }
    return Qs(e) ? e : null;
  }
  var el = {
      RETRY_BUTTON: { name: "retry_button", type: ne },
      RETRY_CLICKED: { name: "retry_ckicked", type: ee },
      AFTER_RETRY_SCREEN: { name: "after_retry_screen", type: ne },
      RETRY_VANISHED: { name: "retry_vanished", type: ee },
      PAYMENT_CANCELLED: { name: "payment_cancelled", type: ee },
    },
    nl = {
      P13N_INITIATED: { name: "p13n_initiated", type: ae },
      P13N_RESPONSE: { name: "p13n_response", type: ae },
      P13N_CALL_FAILED: { name: "p13n_call_failed", type: ae },
      P13N_SECTION: { name: "p13n_section", type: ne },
      P13N_METHOD_SHOWN: { name: "p13n_methods_shown", type: ne },
    },
    tl = ni({
      OPEN: { name: "checkout_open", type: ne },
      INVOKED: { name: "checkout_invoked", type: re },
      CONTACT_NUMBER_FILLED: { name: "contact_number_filled", type: ee },
      EMAIL_FILLED: { name: "email_filled", type: ee },
      CONTACT_DETAILS: { name: "contact_details", type: ne },
      METHOD_SELECTION_SCREEN: { name: "method_selection_screen", type: ne },
      CONTACT_DETAILS_PROCEED_CLICK: {
        name: "contact_details_proceed_clicked",
        type: ee,
      },
      INSTRUMENTATION_SELECTION_SCREEN: {
        name: "Instrument_selection_screen",
        type: ne,
      },
      METHOD_SELECTED: { name: "Method:selected", type: ee },
      INSTRUMENT_SELECTED: { name: "instrument:selected", type: ee },
      USER_LOGGED_IN: { name: "user_logged_in", type: ee },
    });
  ni(el, { skipEvents: !0 }), ni(nl, { skipEvents: !0 });
  var rl,
    al = kn(ls);
  function il(e) {
    return function n() {
      return rl ? e.call(this) : (g(n.bind(this), 99), this);
    };
  }
  !(function e() {
    (rl = d.body || d.getElementsByTagName("body")[0]) || g(e, 99);
  })();
  var ol,
    ul = d.currentScript || (ol = Nt("script"))[ol.length - 1];
  function cl(e) {
    var n = zn(ul);
    bt({ form: n, data: Et(e) }), (n.onsubmit = xa), n.submit();
  }
  var sl, ll;
  function dl() {
    var e = {};
    ke(ul.attributes, function (n) {
      var t = n.name.toLowerCase();
      if (/^data-/.test(t)) {
        var r = e;
        t = t.replace(/^data-/, "");
        var a = n.value;
        "true" === a ? (a = !0) : "false" === a && (a = !1),
          /^notes\./.test(t) &&
            (e.notes || (e.notes = {}),
            (r = e.notes),
            (t = t.replace(/^notes\./, ""))),
          (r[t] = a);
      }
    });
    var n = e.key;
    if (n && n.length > 0) {
      e.handler = cl;
      var t = ls(e);
      e.parent ||
        (jr.TrackRender(Kr, t),
        (function (e) {
          var n = zn(ul);
          Gn(
            n,
            p.assign(Bn("input"), {
              type: "submit",
              value: e.get("buttontext"),
              className: "razorpay-payment-button",
            })
          ).onsubmit = function (n) {
            n.preventDefault();
            var t = this,
              r = t.action,
              a = t.method,
              i = t.target,
              o = e.get();
            if (fn(r) && r && !o.callback_url) {
              var u = {
                url: r,
                content: Ot(t),
                method: fn(a) ? a : "get",
                target: fn(i) && i,
              };
              try {
                var c = C(
                  JSON.stringify({
                    request: u,
                    options: JSON.stringify(o),
                    back: P.href,
                  })
                );
                o.callback_url = Fo("checkout/onyx") + "?data=" + c;
              } catch (e) {}
            }
            return e.open(), jr.TrackBehav(Ur), !1;
          };
        })(t));
    }
  }
  function ml() {
    if (!sl) {
      var e = Bn();
      (e.className = "razorpay-container"),
        Jn(
          e,
          "<style>@keyframes rzp-rot{to{transform: rotate(360deg);}}@-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}}</style>"
        ),
        qn(e, {
          zIndex: 2147483647,
          position: "fixed",
          top: 0,
          display: "none",
          left: 0,
          height: "100%",
          width: "100%",
          "-webkit-overflow-scrolling": "touch",
          "-webkit-backface-visibility": "hidden",
          "overflow-y": "visible",
        }),
        (sl = Hn(e, rl)),
        (qs.container = sl);
      var n =
        ((r = sl),
        ((a = Bn()).className = "razorpay-backdrop"),
        qn(a, {
          "min-height": "100%",
          transition: "0.3s ease-out",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }),
        Hn(a, r));
      qs.backdrop = n;
      var t = (function (e) {
        var n = "rotate(45deg)",
          t = "opacity 0.3s ease-in",
          r = Bn("span");
        return (
          (r.textContent = "Test Mode"),
          qn(r, {
            "text-decoration": "none",
            background: "#D64444",
            border: "1px dashed white",
            padding: "3px",
            opacity: "0",
            "-webkit-transform": n,
            "-moz-transform": n,
            "-ms-transform": n,
            "-o-transform": n,
            transform: n,
            "-webkit-transition": t,
            "-moz-transition": t,
            transition: t,
            "font-family": "lato,ubuntu,helvetica,sans-serif",
            color: "white",
            position: "absolute",
            width: "200px",
            "text-align": "center",
            right: "-50px",
            top: "50px",
          }),
          Hn(r, e)
        );
      })(n);
      qs.ribbon = t;
    }
    var r, a;
    return sl;
  }
  var fl,
    pl = !1,
    hl =
      ((fl = (function (e) {
        try {
          var n = localStorage.getItem(e);
          if (!n) return null;
          var t = JSON.parse(n);
          return new _().getTime() > t.expiry
            ? (localStorage.removeItem(e), null)
            : t;
        } catch (e) {
          return null;
        }
      })("razorpay_affordability_widget_fid")),
      (null == fl ? void 0 : fl.id) ? fl.id : null);
  function vl(e) {
    return (
      ll
        ? ll.openRzp(e)
        : ((ll = new qs(e)),
          (Yt.iframeReference = ll.el),
          Yt.setId(Er.id),
          ut("message", ll.onmessage.bind(ll))(l),
          Gn(sl, ll.el)),
      ll
    );
  }
  ha().then(function (e) {
    pl = e;
  }),
    (ls.open = function (e) {
      return ls(e).open();
    }),
    (al.postInit = function () {
      (this.modal = { options: {} }), this.get("parent") && this.open();
    });
  var _l = al.onNew;
  (al.onNew = function (e, n) {
    "payment.error" === e && Er(this, "event_paymenterror", P.href),
      pn(_l) && _l.call(this, e, n);
  }),
    (al.initAndPrefetchPrefs = function () {
      return ll.prefetchPrefs(this), this;
    }),
    (al.createCheckoutAndFetchPrefs = function (e) {
      ll
        ? ll.makeCheckoutCallForShopify(this, e)
        : this.emit("shopify_failure");
    }),
    (al.open = il(function () {
      this.metadata ||
        ((this.metadata = { isBrave: pl }),
        hl && (this.metadata.affordability_widget_fid = hl)),
        (this.metadata.openedAt = _.now());
      var e,
        n = (this.checkoutFrame = vl(this));
      Er(this, "open");
      try {
        tl.INVOKED({
          prefill: {
            contact: Be("prefill.contact"),
            email: Be("prefill.email"),
            method: Be("prefll.method") || "",
          },
        });
      } catch (e) {}
      return (
        !Ze("checkout_disable_i18n") &&
          !Fe() &&
          !ns("nach") &&
          (e =
            (function () {
              try {
                var e = l.localStorage.getItem("locale");
                if (Qs(e)) return e;
              } catch (e) {}
              return null;
            })() ||
            Xs() ||
            "en"),
        ti.setContext($a, e),
        n.el.contentWindow ||
          (n.close(),
          n.afterClose(),
          l.alert(
            "This browser is not supported.\nPlease try payment in another browser."
          )),
        "-new.js" === ul.src.slice(-7) && Er(this, "oldscript", P.href),
        this
      );
    })),
    (al.resume = function (e) {
      var n = this.checkoutFrame;
      n && n.postMessage({ event: "resume", data: e });
    }),
    (al.close = function () {
      var e = this.checkoutFrame;
      e && e.postMessage({ event: "close" });
    });
  var yl = il(function () {
    ml(), window.Intl ? (ll = vl()) : jr.Track($r);
    try {
      dl();
    } catch (e) {}
  });
  l.addEventListener("rzp_error", function (e) {
    var n = e.detail;
    Tr.track("cfu_error", { data: { error: n }, immediately: !0 });
  }),
    l.addEventListener("rzp_network_error", function (e) {
      var n = e.detail;
      (n && "https://lumberjack.razorpay.com/v1/track" === n.baseUrl) ||
        Tr.track("network_error", { data: n, immediately: !0 });
    });
  var gl = "checkoutjs";
  return (
    (Er.props.library = gl),
    ti.setContext(Fa, gl),
    ti.setContext(Ua, Ht),
    (oi.handler = function (e) {
      if (En(this, ls)) {
        var n = this.get("callback_url");
        n && gt({ url: n, params: e, method: "POST" });
      }
    }),
    (oi.buttontext = "Pay Now"),
    (oi.parent = null),
    (hs.parent = function (e) {
      if (!Mt(e)) return "parent provided for embedded mode doesn't exist";
    }),
    yl(),
    ls
  );
})();
//# sourceMappingURL=checkout.js.map
