import { parsers as pe } from "prettier/plugins/typescript";
function se(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var j = { exports: {} }, fe = j.exports, Y;
function ce() {
  return Y || (Y = 1, function(r) {
    (function(u, y) {
      r.exports ? r.exports = y() : u.nearley = y();
    })(fe, function() {
      function u(t, n, o) {
        return this.id = ++u.highestId, this.name = t, this.symbols = n, this.postprocess = o, this;
      }
      u.highestId = 0, u.prototype.toString = function(t) {
        var n = typeof t > "u" ? this.symbols.map(C).join(" ") : this.symbols.slice(0, t).map(C).join(" ") + " ● " + this.symbols.slice(t).map(C).join(" ");
        return this.name + " → " + n;
      };
      function y(t, n, o, a) {
        this.rule = t, this.dot = n, this.reference = o, this.data = [], this.wantedBy = a, this.isComplete = this.dot === t.symbols.length;
      }
      y.prototype.toString = function() {
        return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
      }, y.prototype.nextState = function(t) {
        var n = new y(this.rule, this.dot + 1, this.reference, this.wantedBy);
        return n.left = this, n.right = t, n.isComplete && (n.data = n.build(), n.right = void 0), n;
      }, y.prototype.build = function() {
        var t = [], n = this;
        do
          t.push(n.right.data), n = n.left;
        while (n.left);
        return t.reverse(), t;
      }, y.prototype.finish = function() {
        this.rule.postprocess && (this.data = this.rule.postprocess(this.data, this.reference, b.fail));
      };
      function g(t, n) {
        this.grammar = t, this.index = n, this.states = [], this.wants = {}, this.scannable = [], this.completed = {};
      }
      g.prototype.process = function(t) {
        for (var n = this.states, o = this.wants, a = this.completed, d = 0; d < n.length; d++) {
          var f = n[d];
          if (f.isComplete) {
            if (f.finish(), f.data !== b.fail) {
              for (var w = f.wantedBy, S = w.length; S--; ) {
                var L = w[S];
                this.complete(L, f);
              }
              if (f.reference === this.index) {
                var k = f.rule.name;
                (this.completed[k] = this.completed[k] || []).push(f);
              }
            }
          } else {
            var k = f.rule.symbols[f.dot];
            if (typeof k != "string") {
              this.scannable.push(f);
              continue;
            }
            if (o[k]) {
              if (o[k].push(f), a.hasOwnProperty(k))
                for (var O = a[k], S = 0; S < O.length; S++) {
                  var R = O[S];
                  this.complete(f, R);
                }
            } else
              o[k] = [f], this.predict(k);
          }
        }
      }, g.prototype.predict = function(t) {
        for (var n = this.grammar.byName[t] || [], o = 0; o < n.length; o++) {
          var a = n[o], d = this.wants[t], f = new y(a, 0, this.index, d);
          this.states.push(f);
        }
      }, g.prototype.complete = function(t, n) {
        var o = t.nextState(n);
        this.states.push(o);
      };
      function x(t, n) {
        this.rules = t, this.start = n || this.rules[0].name;
        var o = this.byName = {};
        this.rules.forEach(function(a) {
          o.hasOwnProperty(a.name) || (o[a.name] = []), o[a.name].push(a);
        });
      }
      x.fromCompiled = function(a, n) {
        var o = a.Lexer;
        a.ParserStart && (n = a.ParserStart, a = a.ParserRules);
        var a = a.map(function(f) {
          return new u(f.name, f.symbols, f.postprocess);
        }), d = new x(a, n);
        return d.lexer = o, d;
      };
      function T() {
        this.reset("");
      }
      T.prototype.reset = function(t, n) {
        this.buffer = t, this.index = 0, this.line = n ? n.line : 1, this.lastLineBreak = n ? -n.col : 0;
      }, T.prototype.next = function() {
        if (this.index < this.buffer.length) {
          var t = this.buffer[this.index++];
          return t === `
` && (this.line += 1, this.lastLineBreak = this.index), { value: t };
        }
      }, T.prototype.save = function() {
        return {
          line: this.line,
          col: this.index - this.lastLineBreak
        };
      }, T.prototype.formatError = function(t, n) {
        var o = this.buffer;
        if (typeof o == "string") {
          var a = o.split(`
`).slice(
            Math.max(0, this.line - 5),
            this.line
          ), d = o.indexOf(`
`, this.index);
          d === -1 && (d = o.length);
          var f = this.index - this.lastLineBreak, w = String(this.line).length;
          return n += " at line " + this.line + " col " + f + `:

`, n += a.map(function(L, k) {
            return S(this.line - a.length + k + 1, w) + " " + L;
          }, this).join(`
`), n += `
` + S("", w + f) + `^
`, n;
        } else
          return n + " at index " + (this.index - 1);
        function S(L, k) {
          var O = String(L);
          return Array(k - O.length + 1).join(" ") + O;
        }
      };
      function b(t, n, o) {
        if (t instanceof x)
          var a = t, o = n;
        else
          var a = x.fromCompiled(t, n);
        this.grammar = a, this.options = {
          keepHistory: !1,
          lexer: a.lexer || new T()
        };
        for (var d in o || {})
          this.options[d] = o[d];
        this.lexer = this.options.lexer, this.lexerState = void 0;
        var f = new g(a, 0);
        this.table = [f], f.wants[a.start] = [], f.predict(a.start), f.process(), this.current = 0;
      }
      b.fail = {}, b.prototype.feed = function(t) {
        var n = this.lexer;
        n.reset(t, this.lexerState);
        for (var o; ; ) {
          try {
            if (o = n.next(), !o)
              break;
          } catch (I) {
            var w = new g(this.grammar, this.current + 1);
            this.table.push(w);
            var a = new Error(this.reportLexerError(I));
            throw a.offset = this.current, a.token = I.token, a;
          }
          var d = this.table[this.current];
          this.options.keepHistory || delete this.table[this.current - 1];
          var f = this.current + 1, w = new g(this.grammar, f);
          this.table.push(w);
          for (var S = o.text !== void 0 ? o.text : o.value, L = n.constructor === T ? o.value : o, k = d.scannable, O = k.length; O--; ) {
            var R = k[O], A = R.rule.symbols[R.dot];
            if (A.test ? A.test(L) : A.type ? A.type === o.type : A.literal === S) {
              var Z = R.nextState({ data: L, token: o, isToken: !0, reference: f - 1 });
              w.states.push(Z);
            }
          }
          if (w.process(), w.states.length === 0) {
            var a = new Error(this.reportError(o));
            throw a.offset = this.current, a.token = o, a;
          }
          this.options.keepHistory && (d.lexerState = n.save()), this.current++;
        }
        return d && (this.lexerState = n.save()), this.results = this.finish(), this;
      }, b.prototype.reportLexerError = function(t) {
        var n, o, a = t.token;
        return a ? (n = "input " + JSON.stringify(a.text[0]) + " (lexer error)", o = this.lexer.formatError(a, "Syntax error")) : (n = "input (lexer error)", o = t.message), this.reportErrorCommon(o, n);
      }, b.prototype.reportError = function(t) {
        var n = (t.type ? t.type + " token: " : "") + JSON.stringify(t.value !== void 0 ? t.value : t), o = this.lexer.formatError(t, "Syntax error");
        return this.reportErrorCommon(o, n);
      }, b.prototype.reportErrorCommon = function(t, n) {
        var o = [];
        o.push(t);
        var a = this.table.length - 2, d = this.table[a], f = d.states.filter(function(S) {
          var L = S.rule.symbols[S.dot];
          return L && typeof L != "string";
        });
        if (f.length === 0)
          o.push("Unexpected " + n + `. I did not expect any more input. Here is the state of my parse table:
`), this.displayStateStack(d.states, o);
        else {
          o.push("Unexpected " + n + `. Instead, I was expecting to see one of the following:
`);
          var w = f.map(function(S) {
            return this.buildFirstStateStack(S, []) || [S];
          }, this);
          w.forEach(function(S) {
            var L = S[0], k = L.rule.symbols[L.dot], O = this.getSymbolDisplay(k);
            o.push("A " + O + " based on:"), this.displayStateStack(S, o);
          }, this);
        }
        return o.push(""), o.join(`
`);
      }, b.prototype.displayStateStack = function(t, n) {
        for (var o, a = 0, d = 0; d < t.length; d++) {
          var f = t[d], w = f.rule.toString(f.dot);
          w === o ? a++ : (a > 0 && n.push("    ^ " + a + " more lines identical to this"), a = 0, n.push("    " + w)), o = w;
        }
      }, b.prototype.getSymbolDisplay = function(t) {
        return G(t);
      }, b.prototype.buildFirstStateStack = function(t, n) {
        if (n.indexOf(t) !== -1)
          return null;
        if (t.wantedBy.length === 0)
          return [t];
        var o = t.wantedBy[0], a = [t].concat(n), d = this.buildFirstStateStack(o, a);
        return d === null ? null : [t].concat(d);
      }, b.prototype.save = function() {
        var t = this.table[this.current];
        return t.lexerState = this.lexerState, t;
      }, b.prototype.restore = function(t) {
        var n = t.index;
        this.current = n, this.table[n] = t, this.table.splice(n + 1), this.lexerState = t.lexerState, this.results = this.finish();
      }, b.prototype.rewind = function(t) {
        if (!this.options.keepHistory)
          throw new Error("set option `keepHistory` to enable rewinding");
        this.restore(this.table[t]);
      }, b.prototype.finish = function() {
        var t = [], n = this.grammar.start, o = this.table[this.table.length - 1];
        return o.states.forEach(function(a) {
          a.rule.name === n && a.dot === a.rule.symbols.length && a.reference === 0 && a.data !== b.fail && t.push(a);
        }), t.map(function(a) {
          return a.data;
        });
      };
      function G(t) {
        var n = typeof t;
        if (n === "string")
          return t;
        if (n === "object") {
          if (t.literal)
            return JSON.stringify(t.literal);
          if (t instanceof RegExp)
            return "character matching " + t;
          if (t.type)
            return t.type + " token";
          if (t.test)
            return "token matching " + String(t.test);
          throw new Error("Unknown symbol type: " + t);
        }
      }
      function C(t) {
        var n = typeof t;
        if (n === "string")
          return t;
        if (n === "object") {
          if (t.literal)
            return JSON.stringify(t.literal);
          if (t instanceof RegExp)
            return t.toString();
          if (t.type)
            return "%" + t.type;
          if (t.test)
            return "<" + String(t.test) + ">";
          throw new Error("Unknown symbol type: " + t);
        }
      }
      return {
        Parser: b,
        Grammar: x,
        Rule: u
      };
    });
  }(j)), j.exports;
}
var he = ce();
const K = /* @__PURE__ */ se(he);
var V = { exports: {} }, me = V.exports, ee;
function de() {
  return ee || (ee = 1, function(r) {
    (function(u, y) {
      r.exports ? r.exports = y() : u.moo = y();
    })(me, function() {
      var u = Object.prototype.hasOwnProperty, y = Object.prototype.toString, g = typeof new RegExp().sticky == "boolean";
      function x(e) {
        return e && y.call(e) === "[object RegExp]";
      }
      function T(e) {
        return e && typeof e == "object" && !x(e) && !Array.isArray(e);
      }
      function b(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      function G(e) {
        var s = new RegExp("|" + e);
        return s.exec("").length - 1;
      }
      function C(e) {
        return "(" + e + ")";
      }
      function t(e) {
        if (!e.length) return "(?!)";
        var s = e.map(function(i) {
          return "(?:" + i + ")";
        }).join("|");
        return "(?:" + s + ")";
      }
      function n(e) {
        if (typeof e == "string")
          return "(?:" + b(e) + ")";
        if (x(e)) {
          if (e.ignoreCase) throw new Error("RegExp /i flag not allowed");
          if (e.global) throw new Error("RegExp /g flag is implied");
          if (e.sticky) throw new Error("RegExp /y flag is implied");
          if (e.multiline) throw new Error("RegExp /m flag is implied");
          return e.source;
        } else
          throw new Error("Not a pattern: " + e);
      }
      function o(e, s) {
        return e.length > s ? e : Array(s - e.length + 1).join(" ") + e;
      }
      function a(e, s) {
        for (var i = e.length, l = 0; ; ) {
          var h = e.lastIndexOf(`
`, i - 1);
          if (h === -1 || (l++, i = h, l === s) || i === 0)
            break;
        }
        var p = l < s ? 0 : i + 1;
        return e.substring(p).split(`
`);
      }
      function d(e) {
        for (var s = Object.getOwnPropertyNames(e), i = [], l = 0; l < s.length; l++) {
          var h = s[l], p = e[h], m = [].concat(p);
          if (h === "include") {
            for (var E = 0; E < m.length; E++)
              i.push({ include: m[E] });
            continue;
          }
          var v = [];
          m.forEach(function(c) {
            T(c) ? (v.length && i.push(w(h, v)), i.push(w(h, c)), v = []) : v.push(c);
          }), v.length && i.push(w(h, v));
        }
        return i;
      }
      function f(e) {
        for (var s = [], i = 0; i < e.length; i++) {
          var l = e[i];
          if (l.include) {
            for (var h = [].concat(l.include), p = 0; p < h.length; p++)
              s.push({ include: h[p] });
            continue;
          }
          if (!l.type)
            throw new Error("Rule has no type: " + JSON.stringify(l));
          s.push(w(l.type, l));
        }
        return s;
      }
      function w(e, s) {
        if (T(s) || (s = { match: s }), s.include)
          throw new Error("Matching rules cannot also include states");
        var i = {
          defaultType: e,
          lineBreaks: !!s.error || !!s.fallback,
          pop: !1,
          next: null,
          push: null,
          error: !1,
          fallback: !1,
          value: null,
          type: null,
          shouldThrow: !1
        };
        for (var l in s)
          u.call(s, l) && (i[l] = s[l]);
        if (typeof i.type == "string" && e !== i.type)
          throw new Error("Type transform cannot be a string (type '" + i.type + "' for token '" + e + "')");
        var h = i.match;
        return i.match = Array.isArray(h) ? h : h ? [h] : [], i.match.sort(function(p, m) {
          return x(p) && x(m) ? 0 : x(m) ? -1 : x(p) ? 1 : m.length - p.length;
        }), i;
      }
      function S(e) {
        return Array.isArray(e) ? f(e) : d(e);
      }
      var L = w("error", { lineBreaks: !0, shouldThrow: !0 });
      function k(e, s) {
        for (var i = null, l = /* @__PURE__ */ Object.create(null), h = !0, p = null, m = [], E = [], v = 0; v < e.length; v++)
          e[v].fallback && (h = !1);
        for (var v = 0; v < e.length; v++) {
          var c = e[v];
          if (c.include)
            throw new Error("Inheritance is not allowed in stateless lexers");
          if (c.error || c.fallback) {
            if (i)
              throw !c.fallback == !i.fallback ? new Error("Multiple " + (c.fallback ? "fallback" : "error") + " rules not allowed (for token '" + c.defaultType + "')") : new Error("fallback and error are mutually exclusive (for token '" + c.defaultType + "')");
            i = c;
          }
          var _ = c.match.slice();
          if (h)
            for (; _.length && typeof _[0] == "string" && _[0].length === 1; ) {
              var P = _.shift();
              l[P.charCodeAt(0)] = c;
            }
          if (c.pop || c.push || c.next) {
            if (!s)
              throw new Error("State-switching options are not allowed in stateless lexers (for token '" + c.defaultType + "')");
            if (c.fallback)
              throw new Error("State-switching options are not allowed on fallback tokens (for token '" + c.defaultType + "')");
          }
          if (_.length !== 0) {
            h = !1, m.push(c);
            for (var N = 0; N < _.length; N++) {
              var B = _[N];
              if (x(B)) {
                if (p === null)
                  p = B.unicode;
                else if (p !== B.unicode && c.fallback === !1)
                  throw new Error("If one rule is /u then all must be");
              }
            }
            var M = t(_.map(n)), q = new RegExp(M);
            if (q.test(""))
              throw new Error("RegExp matches empty string: " + q);
            var F = G(M);
            if (F > 0)
              throw new Error("RegExp has capture groups: " + q + `
Use (?: … ) instead`);
            if (!c.lineBreaks && q.test(`
`))
              throw new Error("Rule should declare lineBreaks: " + q);
            E.push(C(M));
          }
        }
        var D = i && i.fallback, H = g && !D ? "ym" : "gm", z = g || D ? "" : "|";
        p === !0 && (H += "u");
        var ue = new RegExp(t(E) + z, H);
        return { regexp: ue, groups: m, fast: l, error: i || L };
      }
      function O(e) {
        var s = k(S(e));
        return new I({ start: s }, "start");
      }
      function R(e, s, i) {
        var l = e && (e.push || e.next);
        if (l && !i[l])
          throw new Error("Missing state '" + l + "' (in token '" + e.defaultType + "' of state '" + s + "')");
        if (e && e.pop && +e.pop != 1)
          throw new Error("pop must be 1 (in token '" + e.defaultType + "' of state '" + s + "')");
      }
      function A(e, s) {
        var i = e.$all ? S(e.$all) : [];
        delete e.$all;
        var l = Object.getOwnPropertyNames(e);
        s || (s = l[0]);
        for (var h = /* @__PURE__ */ Object.create(null), p = 0; p < l.length; p++) {
          var m = l[p];
          h[m] = S(e[m]).concat(i);
        }
        for (var p = 0; p < l.length; p++)
          for (var m = l[p], E = h[m], v = /* @__PURE__ */ Object.create(null), c = 0; c < E.length; c++) {
            var _ = E[c];
            if (_.include) {
              var P = [c, 1];
              if (_.include !== m && !v[_.include]) {
                v[_.include] = !0;
                var N = h[_.include];
                if (!N)
                  throw new Error("Cannot include nonexistent state '" + _.include + "' (in state '" + m + "')");
                for (var B = 0; B < N.length; B++) {
                  var M = N[B];
                  E.indexOf(M) === -1 && P.push(M);
                }
              }
              E.splice.apply(E, P), c--;
            }
          }
        for (var q = /* @__PURE__ */ Object.create(null), p = 0; p < l.length; p++) {
          var m = l[p];
          q[m] = k(h[m], !0);
        }
        for (var p = 0; p < l.length; p++) {
          for (var F = l[p], D = q[F], H = D.groups, c = 0; c < H.length; c++)
            R(H[c], F, q);
          for (var z = Object.getOwnPropertyNames(D.fast), c = 0; c < z.length; c++)
            R(D.fast[z[c]], F, q);
        }
        return new I(q, s);
      }
      function Z(e) {
        for (var s = typeof Map < "u", i = s ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null), l = Object.getOwnPropertyNames(e), h = 0; h < l.length; h++) {
          var p = l[h], m = e[p], E = Array.isArray(m) ? m : [m];
          E.forEach(function(v) {
            if (typeof v != "string")
              throw new Error("keyword must be string (in keyword '" + p + "')");
            s ? i.set(v, p) : i[v] = p;
          });
        }
        return function(v) {
          return s ? i.get(v) : i[v];
        };
      }
      var I = function(e, s) {
        this.startState = s, this.states = e, this.buffer = "", this.stack = [], this.reset();
      };
      I.prototype.reset = function(e, s) {
        return this.buffer = e || "", this.index = 0, this.line = s ? s.line : 1, this.col = s ? s.col : 1, this.queuedToken = s ? s.queuedToken : null, this.queuedText = s ? s.queuedText : "", this.queuedThrow = s ? s.queuedThrow : null, this.setState(s ? s.state : this.startState), this.stack = s && s.stack ? s.stack.slice() : [], this;
      }, I.prototype.save = function() {
        return {
          line: this.line,
          col: this.col,
          state: this.state,
          stack: this.stack.slice(),
          queuedToken: this.queuedToken,
          queuedText: this.queuedText,
          queuedThrow: this.queuedThrow
        };
      }, I.prototype.setState = function(e) {
        if (!(!e || this.state === e)) {
          this.state = e;
          var s = this.states[e];
          this.groups = s.groups, this.error = s.error, this.re = s.regexp, this.fast = s.fast;
        }
      }, I.prototype.popState = function() {
        this.setState(this.stack.pop());
      }, I.prototype.pushState = function(e) {
        this.stack.push(this.state), this.setState(e);
      };
      var ie = g ? function(e, s) {
        return e.exec(s);
      } : function(e, s) {
        var i = e.exec(s);
        return i[0].length === 0 ? null : i;
      };
      I.prototype._getGroup = function(e) {
        for (var s = this.groups.length, i = 0; i < s; i++)
          if (e[i + 1] !== void 0)
            return this.groups[i];
        throw new Error("Cannot find token type for matched text");
      };
      function le() {
        return this.value;
      }
      if (I.prototype.next = function() {
        var e = this.index;
        if (this.queuedGroup) {
          var s = this._token(this.queuedGroup, this.queuedText, e);
          return this.queuedGroup = null, this.queuedText = "", s;
        }
        var i = this.buffer;
        if (e !== i.length) {
          var m = this.fast[i.charCodeAt(e)];
          if (m)
            return this._token(m, i.charAt(e), e);
          var l = this.re;
          l.lastIndex = e;
          var h = ie(l, i), p = this.error;
          if (h == null)
            return this._token(p, i.slice(e, i.length), e);
          var m = this._getGroup(h), E = h[0];
          return p.fallback && h.index !== e ? (this.queuedGroup = m, this.queuedText = E, this._token(p, i.slice(e, h.index), e)) : this._token(m, E, e);
        }
      }, I.prototype._token = function(e, s, i) {
        var l = 0;
        if (e.lineBreaks) {
          var h = /\n/g, p = 1;
          if (s === `
`)
            l = 1;
          else
            for (; h.exec(s); )
              l++, p = h.lastIndex;
        }
        var m = {
          type: typeof e.type == "function" && e.type(s) || e.defaultType,
          value: typeof e.value == "function" ? e.value(s) : s,
          text: s,
          toString: le,
          offset: i,
          lineBreaks: l,
          line: this.line,
          col: this.col
        }, E = s.length;
        if (this.index += E, this.line += l, l !== 0 ? this.col = E - p + 1 : this.col += E, e.shouldThrow) {
          var v = new Error(this.formatError(m, "invalid syntax"));
          throw v;
        }
        return e.pop ? this.popState() : e.push ? this.pushState(e.push) : e.next && this.setState(e.next), m;
      }, typeof Symbol < "u" && Symbol.iterator) {
        var X = function(e) {
          this.lexer = e;
        };
        X.prototype.next = function() {
          var e = this.lexer.next();
          return { value: e, done: !e };
        }, X.prototype[Symbol.iterator] = function() {
          return this;
        }, I.prototype[Symbol.iterator] = function() {
          return new X(this);
        };
      }
      return I.prototype.formatError = function(e, s) {
        if (e == null)
          var i = this.buffer.slice(this.index), e = {
            text: i,
            offset: this.index,
            lineBreaks: i.indexOf(`
`) === -1 ? 0 : 1,
            line: this.line,
            col: this.col
          };
        var l = 2, h = Math.max(e.line - l, 1), p = e.line + l, m = String(p).length, E = a(
          this.buffer,
          this.line - e.line + l + 1
        ).slice(0, 5), v = [];
        v.push(s + " at line " + e.line + " col " + e.col + ":"), v.push("");
        for (var c = 0; c < E.length; c++) {
          var _ = E[c], P = h + c;
          v.push(o(String(P), m) + "  " + _), P === e.line && v.push(o("", m + e.col + 1) + "^");
        }
        return v.join(`
`);
      }, I.prototype.clone = function() {
        return new I(this.states, this.state);
      }, I.prototype.has = function(e) {
        return !0;
      }, {
        compile: O,
        states: A,
        error: Object.freeze({ error: !0 }),
        fallback: Object.freeze({ fallback: !0 }),
        keywords: Z
      };
    });
  }(V)), V.exports;
}
var ve = de();
const ye = /* @__PURE__ */ se(ve);
function Q(r) {
  return r[0];
}
function ge(r) {
  return {
    defaultImport: r[3].defaultImport,
    namespaceImport: r[3].namespaceImport,
    namedImports: r[3].namedImports,
    from: r[7]
  };
}
function be(r) {
  return { from: r[3] };
}
function te(r) {
  var u;
  return { name: r[0].text, alias: (u = r[4]) == null ? void 0 : u.text };
}
function oe(r) {
  return r.flatMap((u) => !Array.isArray(u) && !("alias" in (u ?? {})) ? [] : Array.isArray(u) ? oe(u) : u);
}
function xe(r) {
  return r[0].text;
}
const $ = ye.compile({
  wschar: /[ \t\r]+/,
  lbrace: "{",
  rbrace: "}",
  semicolon: ";",
  comma: ",",
  from: "from",
  single_quote: "'",
  double_quote: '"',
  asterix: "*",
  as: "as",
  newline: { match: /\n/, lineBreaks: !0 },
  comment: /\/\/.*?$/,
  ml_comment: /\/\*[\s\S]*?\*\//,
  string: /[\.\/a-zA-Z0-9_]+/
}), we = {
  Lexer: $,
  ParserRules: [
    { name: "program$ebnf$1", symbols: [] },
    { name: "program$ebnf$1", symbols: ["program$ebnf$1", "importStatement"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "program", symbols: ["program$ebnf$1"], postprocess: (r) => (console.log(r), r[0][0]) },
    { name: "importStatement", symbols: ["sideEffectImportStatement"], postprocess: Q },
    { name: "importStatement", symbols: ["defaultImportStatement"], postprocess: Q },
    { name: "defaultImportStatement$ebnf$1", symbols: [{ literal: ";" }], postprocess: Q },
    { name: "defaultImportStatement$ebnf$1", symbols: [], postprocess: () => null },
    { name: "defaultImportStatement", symbols: ["_", { literal: "import" }, "_", "importClause", "_", $.has("from") ? { type: "from" } : from, "_", "fromClause", "_", "defaultImportStatement$ebnf$1"], postprocess: ge },
    { name: "sideEffectImportStatement$ebnf$1", symbols: [{ literal: ";" }], postprocess: Q },
    { name: "sideEffectImportStatement$ebnf$1", symbols: [], postprocess: () => null },
    { name: "sideEffectImportStatement", symbols: ["_", { literal: "import" }, "_", "fromClause", "_", "sideEffectImportStatement$ebnf$1"], postprocess: be },
    { name: "importClause", symbols: ["defaultImport", "_", $.has("comma") ? { type: "comma" } : comma, "_", "namedImports"], postprocess: (r) => ({ defaultImport: r[0], namedImports: r[4] }) },
    { name: "importClause", symbols: ["defaultImport"], postprocess: (r) => ({ defaultImport: r[0] }) },
    { name: "importClause", symbols: ["namedImports"], postprocess: (r) => ({ namedImports: r[0] }) },
    { name: "importClause", symbols: ["namespaceImport"], postprocess: (r) => ({ namespaceImport: r[0] }) },
    { name: "defaultImport", symbols: [$.has("string") ? { type: "string" } : string], postprocess: xe },
    { name: "namedImports", symbols: [$.has("lbrace") ? { type: "lbrace" } : lbrace, "_", "namedImportList", "_", $.has("rbrace") ? { type: "rbrace" } : rbrace], postprocess: (r) => r[2] },
    { name: "namedImportList$ebnf$1", symbols: [] },
    { name: "namedImportList$ebnf$1$subexpression$1", symbols: ["_", $.has("comma") ? { type: "comma" } : comma, "_", "namedImport"] },
    { name: "namedImportList$ebnf$1", symbols: ["namedImportList$ebnf$1", "namedImportList$ebnf$1$subexpression$1"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "namedImportList", symbols: ["namedImport", "namedImportList$ebnf$1"], postprocess: oe },
    { name: "namedImport", symbols: [$.has("string") ? { type: "string" } : string, "_", $.has("as") ? { type: "as" } : as, "_", $.has("string") ? { type: "string" } : string], postprocess: te },
    { name: "namedImport", symbols: [$.has("string") ? { type: "string" } : string], postprocess: te },
    { name: "namespaceImport", symbols: [$.has("asterix") ? { type: "asterix" } : asterix, "_", $.has("as") ? { type: "as" } : as, "_", $.has("string") ? { type: "string" } : string], postprocess: (r) => r[4].text },
    { name: "fromClause", symbols: ["variativeQuoate", $.has("string") ? { type: "string" } : string, "variativeQuoate"], postprocess: (r) => r[1].text },
    { name: "variativeQuoate", symbols: [$.has("single_quote") ? { type: "single_quote" } : single_quote] },
    { name: "variativeQuoate", symbols: [$.has("double_quote") ? { type: "double_quote" } : double_quote], postprocess: (r) => null },
    { name: "_$ebnf$1", symbols: [] },
    { name: "_$ebnf$1$subexpression$1", symbols: [$.has("wschar") ? { type: "wschar" } : wschar] },
    { name: "_$ebnf$1$subexpression$1", symbols: [$.has("newline") ? { type: "newline" } : newline] },
    { name: "_$ebnf$1", symbols: ["_$ebnf$1", "_$ebnf$1$subexpression$1"], postprocess: (r) => r[0].concat([r[1]]) },
    { name: "_", symbols: ["_$ebnf$1"], postprocess: () => null }
  ],
  ParserStart: "program"
}, ae = () => new K.Parser(K.Grammar.fromCompiled(we)), Se = (r, u) => {
  r.startLoc += u.length;
}, U = (r, u) => {
  r.endLoc += u.length;
}, W = (r, u) => {
  r.imports.push(u);
}, re = (r, u) => {
  r.accumulator += u.length;
}, ne = (r, u) => {
  r.endLoc += u;
}, Ee = (r) => {
  r.accumulator = 0;
}, J = (r) => {
  r.parser = ae();
}, ke = (r) => {
  r.endLoc += 1;
}, $e = (r) => {
  const u = r.split(`
`).flatMap((x) => x.split(";")), y = {
    parser: ae(),
    accumulator: 0
  }, g = {
    startLoc: 0,
    endLoc: 0,
    imports: []
  };
  return u.forEach((x, T) => {
    let b;
    const { parser: G, accumulator: C } = y;
    try {
      b = G.feed(x).results[0];
    } catch (w) {
      b = w;
    }
    const t = C === 0, n = g.imports.length > 0, o = b instanceof Error, a = !!b && !o, d = !b && !o, f = T === 0;
    a && !n && t && (U(g, x), W(g, b), J(y)), a && n && t && (U(g, x), W(g, b), J(y)), a && n && !t && (U(g, x), W(g, b), ne(g, C), J(y)), !f && a && ke(g), d && f && re(y, x), d && !f && re(y, x + ";"), a && !t && !n && (ne(g, C), U(g, x), W(g, b), J(y), Ee(y)), o && !n && (Se(g, x + ";;"), U(g, x), J(y));
  }), g;
}, Ie = (r) => r == null ? void 0 : r.map((u) => u.alias ? `${u.name} as ${u.alias}` : u.name).join(", "), _e = (r) => {
  var y, g;
  return !r.namedImports && !r.defaultImport && !r.namespaceImport ? `import "${r.from}"` : `import ${[
    r.defaultImport,
    r.defaultImport && ((y = r.namedImports) != null && y.length) ? ", " : "",
    r.namespaceImport && `* as ${r.namespaceImport}`,
    ((g = r.namedImports) == null ? void 0 : g.length) && `{ ${Ie(r.namedImports)} }`
  ].filter(Boolean).join("")} from "${r.from}"`;
}, Le = (r) => r.map(_e).join(`
`), Oe = (r, u, y, g) => {
  const x = Le(u);
  return r.slice(0, y) + x + r.slice(g);
}, Te = (r) => r.sort((u, y) => u.from.localeCompare(y.from)), qe = (r) => {
  const u = $e(r);
  return Te(u.imports), Oe(
    r,
    u.imports,
    u.startLoc,
    u.endLoc
  );
}, Re = {
  parsers: {
    typescript: {
      ...pe.typescript,
      preprocess: qe
    }
  }
};
export {
  Re as default
};
