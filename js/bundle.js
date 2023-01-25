(() => {
    'use strict';
    function e(e) {
        return null !== e && 'object' == typeof e && 'constructor' in e && e.constructor === Object;
    }
    function t(s = {}, i = {}) {
        Object.keys(i).forEach(n => {
            void 0 === s[n]
                ? (s[n] = i[n])
                : e(i[n]) && e(s[n]) && Object.keys(i[n]).length > 0 && t(s[n], i[n]);
        });
    }
    const s = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: '' },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: () => []
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            protocol: '',
            search: ''
        }
    };
    function i() {
        const e = 'undefined' != typeof document ? document : {};
        return t(e, s), e;
    }
    const n = {
        document: s,
        navigator: { userAgent: '' },
        location: {
            hash: '',
            host: '',
            hostname: '',
            href: '',
            origin: '',
            pathname: '',
            protocol: '',
            search: ''
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => '' }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: e =>
            'undefined' == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
            'undefined' != typeof setTimeout && clearTimeout(e);
        }
    };
    function r() {
        const e = 'undefined' != typeof window ? window : {};
        return t(e, n), e;
    }
    class a extends Array {
        constructor(e) {
            'number' == typeof e
                ? super(e)
                : (super(...(e || [])),
                  (function (e) {
                      const t = e.__proto__;
                      Object.defineProperty(e, '__proto__', {
                          get: () => t,
                          set(e) {
                              t.__proto__ = e;
                          }
                      });
                  })(this));
        }
    }
    function o(e = []) {
        const t = [];
        return (
            e.forEach(e => {
                Array.isArray(e) ? t.push(...o(e)) : t.push(e);
            }),
            t
        );
    }
    function l(e, t) {
        return Array.prototype.filter.call(e, t);
    }
    function d(e, t) {
        const s = r(),
            n = i();
        let o = [];
        if (!t && e instanceof a) return e;
        if (!e) return new a(o);
        if ('string' == typeof e) {
            const s = e.trim();
            if (s.indexOf('<') >= 0 && s.indexOf('>') >= 0) {
                let e = 'div';
                0 === s.indexOf('<li') && (e = 'ul'),
                    0 === s.indexOf('<tr') && (e = 'tbody'),
                    (0 !== s.indexOf('<td') && 0 !== s.indexOf('<th')) || (e = 'tr'),
                    0 === s.indexOf('<tbody') && (e = 'table'),
                    0 === s.indexOf('<option') && (e = 'select');
                const t = n.createElement(e);
                t.innerHTML = s;
                for (let e = 0; e < t.childNodes.length; e += 1) o.push(t.childNodes[e]);
            } else
                o = (function (e, t) {
                    if ('string' != typeof e) return [e];
                    const s = [],
                        i = t.querySelectorAll(e);
                    for (let e = 0; e < i.length; e += 1) s.push(i[e]);
                    return s;
                })(e.trim(), t || n);
        } else if (e.nodeType || e === s || e === n) o.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof a) return e;
            o = e;
        }
        return new a(
            (function (e) {
                const t = [];
                for (let s = 0; s < e.length; s += 1) -1 === t.indexOf(e[s]) && t.push(e[s]);
                return t;
            })(o)
        );
    }
    d.fn = a.prototype;
    const c = 'resize scroll'.split(' ');
    function p(e) {
        return function (...t) {
            if (void 0 === t[0]) {
                for (let t = 0; t < this.length; t += 1)
                    c.indexOf(e) < 0 && (e in this[t] ? this[t][e]() : d(this[t]).trigger(e));
                return this;
            }
            return this.on(e, ...t);
        };
    }
    p('click'),
        p('blur'),
        p('focus'),
        p('focusin'),
        p('focusout'),
        p('keyup'),
        p('keydown'),
        p('keypress'),
        p('submit'),
        p('change'),
        p('mousedown'),
        p('mousemove'),
        p('mouseup'),
        p('mouseenter'),
        p('mouseleave'),
        p('mouseout'),
        p('mouseover'),
        p('touchstart'),
        p('touchend'),
        p('touchmove'),
        p('resize'),
        p('scroll');
    const u = {
        addClass: function (...e) {
            const t = o(e.map(e => e.split(' ')));
            return (
                this.forEach(e => {
                    e.classList.add(...t);
                }),
                this
            );
        },
        removeClass: function (...e) {
            const t = o(e.map(e => e.split(' ')));
            return (
                this.forEach(e => {
                    e.classList.remove(...t);
                }),
                this
            );
        },
        hasClass: function (...e) {
            const t = o(e.map(e => e.split(' ')));
            return l(this, e => t.filter(t => e.classList.contains(t)).length > 0).length > 0;
        },
        toggleClass: function (...e) {
            const t = o(e.map(e => e.split(' ')));
            this.forEach(e => {
                t.forEach(t => {
                    e.classList.toggle(t);
                });
            });
        },
        attr: function (e, t) {
            if (1 === arguments.length && 'string' == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (let s = 0; s < this.length; s += 1)
                if (2 === arguments.length) this[s].setAttribute(e, t);
                else for (const t in e) (this[s][t] = e[t]), this[s].setAttribute(t, e[t]);
            return this;
        },
        removeAttr: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this;
        },
        transform: function (e) {
            for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
            return this;
        },
        transition: function (e) {
            for (let t = 0; t < this.length; t += 1)
                this[t].style.transitionDuration = 'string' != typeof e ? `${e}ms` : e;
            return this;
        },
        on: function (...e) {
            let [t, s, i, n] = e;
            function r(e) {
                const t = e.target;
                if (!t) return;
                const n = e.target.dom7EventData || [];
                if ((n.indexOf(e) < 0 && n.unshift(e), d(t).is(s))) i.apply(t, n);
                else {
                    const e = d(t).parents();
                    for (let t = 0; t < e.length; t += 1) d(e[t]).is(s) && i.apply(e[t], n);
                }
            }
            function a(e) {
                const t = (e && e.target && e.target.dom7EventData) || [];
                t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
            }
            'function' == typeof e[1] && (([t, i, n] = e), (s = void 0)), n || (n = !1);
            const o = t.split(' ');
            let l;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (s)
                    for (l = 0; l < o.length; l += 1) {
                        const e = o[l];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                            t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                            t.dom7LiveListeners[e].push({ listener: i, proxyListener: r }),
                            t.addEventListener(e, r, n);
                    }
                else
                    for (l = 0; l < o.length; l += 1) {
                        const e = o[l];
                        t.dom7Listeners || (t.dom7Listeners = {}),
                            t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                            t.dom7Listeners[e].push({ listener: i, proxyListener: a }),
                            t.addEventListener(e, a, n);
                    }
            }
            return this;
        },
        off: function (...e) {
            let [t, s, i, n] = e;
            'function' == typeof e[1] && (([t, i, n] = e), (s = void 0)), n || (n = !1);
            const r = t.split(' ');
            for (let e = 0; e < r.length; e += 1) {
                const t = r[e];
                for (let e = 0; e < this.length; e += 1) {
                    const r = this[e];
                    let a;
                    if (
                        (!s && r.dom7Listeners
                            ? (a = r.dom7Listeners[t])
                            : s && r.dom7LiveListeners && (a = r.dom7LiveListeners[t]),
                        a && a.length)
                    )
                        for (let e = a.length - 1; e >= 0; e -= 1) {
                            const s = a[e];
                            (i && s.listener === i) ||
                            (i && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === i)
                                ? (r.removeEventListener(t, s.proxyListener, n), a.splice(e, 1))
                                : i ||
                                  (r.removeEventListener(t, s.proxyListener, n), a.splice(e, 1));
                        }
                }
            }
            return this;
        },
        trigger: function (...e) {
            const t = r(),
                s = e[0].split(' '),
                i = e[1];
            for (let n = 0; n < s.length; n += 1) {
                const r = s[n];
                for (let s = 0; s < this.length; s += 1) {
                    const n = this[s];
                    if (t.CustomEvent) {
                        const s = new t.CustomEvent(r, { detail: i, bubbles: !0, cancelable: !0 });
                        (n.dom7EventData = e.filter((e, t) => t > 0)),
                            n.dispatchEvent(s),
                            (n.dom7EventData = []),
                            delete n.dom7EventData;
                    }
                }
            }
            return this;
        },
        transitionEnd: function (e) {
            const t = this;
            return (
                e &&
                    t.on('transitionend', function s(i) {
                        i.target === this && (e.call(this, i), t.off('transitionend', s));
                    }),
                this
            );
        },
        outerWidth: function (e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return (
                        this[0].offsetWidth +
                        parseFloat(e.getPropertyValue('margin-right')) +
                        parseFloat(e.getPropertyValue('margin-left'))
                    );
                }
                return this[0].offsetWidth;
            }
            return null;
        },
        outerHeight: function (e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return (
                        this[0].offsetHeight +
                        parseFloat(e.getPropertyValue('margin-top')) +
                        parseFloat(e.getPropertyValue('margin-bottom'))
                    );
                }
                return this[0].offsetHeight;
            }
            return null;
        },
        styles: function () {
            const e = r();
            return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
            if (this.length > 0) {
                const e = r(),
                    t = i(),
                    s = this[0],
                    n = s.getBoundingClientRect(),
                    a = t.body,
                    o = s.clientTop || a.clientTop || 0,
                    l = s.clientLeft || a.clientLeft || 0,
                    d = s === e ? e.scrollY : s.scrollTop,
                    c = s === e ? e.scrollX : s.scrollLeft;
                return { top: n.top + d - o, left: n.left + c - l };
            }
            return null;
        },
        css: function (e, t) {
            const s = r();
            let i;
            if (1 === arguments.length) {
                if ('string' != typeof e) {
                    for (i = 0; i < this.length; i += 1) for (const t in e) this[i].style[t] = e[t];
                    return this;
                }
                if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e);
            }
            if (2 === arguments.length && 'string' == typeof e) {
                for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
                return this;
            }
            return this;
        },
        each: function (e) {
            return e
                ? (this.forEach((t, s) => {
                      e.apply(t, [t, s]);
                  }),
                  this)
                : this;
        },
        html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : null;
            for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this;
        },
        text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this;
        },
        is: function (e) {
            const t = r(),
                s = i(),
                n = this[0];
            let o, l;
            if (!n || void 0 === e) return !1;
            if ('string' == typeof e) {
                if (n.matches) return n.matches(e);
                if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector) return n.msMatchesSelector(e);
                for (o = d(e), l = 0; l < o.length; l += 1) if (o[l] === n) return !0;
                return !1;
            }
            if (e === s) return n === s;
            if (e === t) return n === t;
            if (e.nodeType || e instanceof a) {
                for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
                    if (o[l] === n) return !0;
                return !1;
            }
            return !1;
        },
        index: function () {
            let e,
                t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
                return e;
            }
        },
        eq: function (e) {
            if (void 0 === e) return this;
            const t = this.length;
            if (e > t - 1) return d([]);
            if (e < 0) {
                const s = t + e;
                return d(s < 0 ? [] : [this[s]]);
            }
            return d([this[e]]);
        },
        append: function (...e) {
            let t;
            const s = i();
            for (let i = 0; i < e.length; i += 1) {
                t = e[i];
                for (let e = 0; e < this.length; e += 1)
                    if ('string' == typeof t) {
                        const i = s.createElement('div');
                        for (i.innerHTML = t; i.firstChild; ) this[e].appendChild(i.firstChild);
                    } else if (t instanceof a)
                        for (let s = 0; s < t.length; s += 1) this[e].appendChild(t[s]);
                    else this[e].appendChild(t);
            }
            return this;
        },
        prepend: function (e) {
            const t = i();
            let s, n;
            for (s = 0; s < this.length; s += 1)
                if ('string' == typeof e) {
                    const i = t.createElement('div');
                    for (i.innerHTML = e, n = i.childNodes.length - 1; n >= 0; n -= 1)
                        this[s].insertBefore(i.childNodes[n], this[s].childNodes[0]);
                } else if (e instanceof a)
                    for (n = 0; n < e.length; n += 1)
                        this[s].insertBefore(e[n], this[s].childNodes[0]);
                else this[s].insertBefore(e, this[s].childNodes[0]);
            return this;
        },
        next: function (e) {
            return this.length > 0
                ? e
                    ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e)
                        ? d([this[0].nextElementSibling])
                        : d([])
                    : this[0].nextElementSibling
                    ? d([this[0].nextElementSibling])
                    : d([])
                : d([]);
        },
        nextAll: function (e) {
            const t = [];
            let s = this[0];
            if (!s) return d([]);
            for (; s.nextElementSibling; ) {
                const i = s.nextElementSibling;
                e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
            }
            return d(t);
        },
        prev: function (e) {
            if (this.length > 0) {
                const t = this[0];
                return e
                    ? t.previousElementSibling && d(t.previousElementSibling).is(e)
                        ? d([t.previousElementSibling])
                        : d([])
                    : t.previousElementSibling
                    ? d([t.previousElementSibling])
                    : d([]);
            }
            return d([]);
        },
        prevAll: function (e) {
            const t = [];
            let s = this[0];
            if (!s) return d([]);
            for (; s.previousElementSibling; ) {
                const i = s.previousElementSibling;
                e ? d(i).is(e) && t.push(i) : t.push(i), (s = i);
            }
            return d(t);
        },
        parent: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1)
                null !== this[s].parentNode &&
                    (e
                        ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode)
                        : t.push(this[s].parentNode));
            return d(t);
        },
        parents: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                let i = this[s].parentNode;
                for (; i; ) e ? d(i).is(e) && t.push(i) : t.push(i), (i = i.parentNode);
            }
            return d(t);
        },
        closest: function (e) {
            let t = this;
            return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const i = this[s].querySelectorAll(e);
                for (let e = 0; e < i.length; e += 1) t.push(i[e]);
            }
            return d(t);
        },
        children: function (e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const i = this[s].children;
                for (let s = 0; s < i.length; s += 1) (e && !d(i[s]).is(e)) || t.push(i[s]);
            }
            return d(t);
        },
        filter: function (e) {
            return d(l(this, e));
        },
        remove: function () {
            for (let e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this;
        }
    };
    Object.keys(u).forEach(e => {
        Object.defineProperty(d.fn, e, { value: u[e], writable: !0 });
    });
    const h = d;
    function f(e, t = 0) {
        return setTimeout(e, t);
    }
    function m() {
        return Date.now();
    }
    function g(e) {
        return (
            'object' == typeof e &&
            null !== e &&
            e.constructor &&
            'Object' === Object.prototype.toString.call(e).slice(8, -1)
        );
    }
    function v(...e) {
        const t = Object(e[0]),
            s = ['__proto__', 'constructor', 'prototype'];
        for (let n = 1; n < e.length; n += 1) {
            const r = e[n];
            if (
                null != r &&
                ((i = r),
                !('undefined' != typeof window && void 0 !== window.HTMLElement
                    ? i instanceof HTMLElement
                    : i && (1 === i.nodeType || 11 === i.nodeType)))
            ) {
                const e = Object.keys(Object(r)).filter(e => s.indexOf(e) < 0);
                for (let s = 0, i = e.length; s < i; s += 1) {
                    const i = e[s],
                        n = Object.getOwnPropertyDescriptor(r, i);
                    void 0 !== n &&
                        n.enumerable &&
                        (g(t[i]) && g(r[i])
                            ? r[i].__swiper__
                                ? (t[i] = r[i])
                                : v(t[i], r[i])
                            : !g(t[i]) && g(r[i])
                            ? ((t[i] = {}), r[i].__swiper__ ? (t[i] = r[i]) : v(t[i], r[i]))
                            : (t[i] = r[i]));
                }
            }
        }
        var i;
        return t;
    }
    function w(e, t, s) {
        e.style.setProperty(t, s);
    }
    function T({ swiper: e, targetPosition: t, side: s }) {
        const i = r(),
            n = -e.translate;
        let a,
            o = null;
        const l = e.params.speed;
        (e.wrapperEl.style.scrollSnapType = 'none'), i.cancelAnimationFrame(e.cssModeFrameID);
        const d = t > n ? 'next' : 'prev',
            c = (e, t) => ('next' === d && e >= t) || ('prev' === d && e <= t),
            p = () => {
                (a = new Date().getTime()), null === o && (o = a);
                const r = Math.max(Math.min((a - o) / l, 1), 0),
                    d = 0.5 - Math.cos(r * Math.PI) / 2;
                let u = n + d * (t - n);
                if ((c(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), c(u, t)))
                    return (
                        (e.wrapperEl.style.overflow = 'hidden'),
                        (e.wrapperEl.style.scrollSnapType = ''),
                        setTimeout(() => {
                            (e.wrapperEl.style.overflow = ''), e.wrapperEl.scrollTo({ [s]: u });
                        }),
                        void i.cancelAnimationFrame(e.cssModeFrameID)
                    );
                e.cssModeFrameID = i.requestAnimationFrame(p);
            };
        p();
    }
    let S, b, C;
    function E() {
        return (
            S ||
                (S = (function () {
                    const e = r(),
                        t = i();
                    return {
                        smoothScroll:
                            t.documentElement && 'scrollBehavior' in t.documentElement.style,
                        touch: !!(
                            'ontouchstart' in e ||
                            (e.DocumentTouch && t instanceof e.DocumentTouch)
                        ),
                        passiveListener: (function () {
                            let t = !1;
                            try {
                                const s = Object.defineProperty({}, 'passive', {
                                    get() {
                                        t = !0;
                                    }
                                });
                                e.addEventListener('testPassiveListener', null, s);
                            } catch (e) {}
                            return t;
                        })(),
                        gestures: 'ongesturestart' in e
                    };
                })()),
            S
        );
    }
    const x = {
            on(e, t, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ('function' != typeof t) return i;
                const n = s ? 'unshift' : 'push';
                return (
                    e.split(' ').forEach(e => {
                        i.eventsListeners[e] || (i.eventsListeners[e] = []),
                            i.eventsListeners[e][n](t);
                    }),
                    i
                );
            },
            once(e, t, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ('function' != typeof t) return i;
                function n(...s) {
                    i.off(e, n), n.__emitterProxy && delete n.__emitterProxy, t.apply(i, s);
                }
                return (n.__emitterProxy = t), i.on(e, n, s);
            },
            onAny(e, t) {
                const s = this;
                if (!s.eventsListeners || s.destroyed) return s;
                if ('function' != typeof e) return s;
                const i = t ? 'unshift' : 'push';
                return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s;
            },
            offAny(e) {
                const t = this;
                if (!t.eventsListeners || t.destroyed) return t;
                if (!t.eventsAnyListeners) return t;
                const s = t.eventsAnyListeners.indexOf(e);
                return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
            },
            off(e, t) {
                const s = this;
                return !s.eventsListeners || s.destroyed
                    ? s
                    : s.eventsListeners
                    ? (e.split(' ').forEach(e => {
                          void 0 === t
                              ? (s.eventsListeners[e] = [])
                              : s.eventsListeners[e] &&
                                s.eventsListeners[e].forEach((i, n) => {
                                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                                        s.eventsListeners[e].splice(n, 1);
                                });
                      }),
                      s)
                    : s;
            },
            emit(...e) {
                const t = this;
                if (!t.eventsListeners || t.destroyed) return t;
                if (!t.eventsListeners) return t;
                let s, i, n;
                return (
                    'string' == typeof e[0] || Array.isArray(e[0])
                        ? ((s = e[0]), (i = e.slice(1, e.length)), (n = t))
                        : ((s = e[0].events), (i = e[0].data), (n = e[0].context || t)),
                    i.unshift(n),
                    (Array.isArray(s) ? s : s.split(' ')).forEach(e => {
                        t.eventsAnyListeners &&
                            t.eventsAnyListeners.length &&
                            t.eventsAnyListeners.forEach(t => {
                                t.apply(n, [e, ...i]);
                            }),
                            t.eventsListeners &&
                                t.eventsListeners[e] &&
                                t.eventsListeners[e].forEach(e => {
                                    e.apply(n, i);
                                });
                    }),
                    t
                );
            }
        },
        y = {
            updateSize: function () {
                const e = this;
                let t, s;
                const i = e.$el;
                (t =
                    void 0 !== e.params.width && null !== e.params.width
                        ? e.params.width
                        : i[0].clientWidth),
                    (s =
                        void 0 !== e.params.height && null !== e.params.height
                            ? e.params.height
                            : i[0].clientHeight),
                    (0 === t && e.isHorizontal()) ||
                        (0 === s && e.isVertical()) ||
                        ((t =
                            t -
                            parseInt(i.css('padding-left') || 0, 10) -
                            parseInt(i.css('padding-right') || 0, 10)),
                        (s =
                            s -
                            parseInt(i.css('padding-top') || 0, 10) -
                            parseInt(i.css('padding-bottom') || 0, 10)),
                        Number.isNaN(t) && (t = 0),
                        Number.isNaN(s) && (s = 0),
                        Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s }));
            },
            updateSlides: function () {
                const e = this;
                function t(t) {
                    return e.isHorizontal()
                        ? t
                        : {
                              width: 'height',
                              'margin-top': 'margin-left',
                              'margin-bottom ': 'margin-right',
                              'margin-left': 'margin-top',
                              'margin-right': 'margin-bottom',
                              'padding-left': 'padding-top',
                              'padding-right': 'padding-bottom',
                              marginRight: 'marginBottom'
                          }[t];
                }
                function s(e, s) {
                    return parseFloat(e.getPropertyValue(t(s)) || 0);
                }
                const i = e.params,
                    { $wrapperEl: n, size: r, rtlTranslate: a, wrongRTL: o } = e,
                    l = e.virtual && i.virtual.enabled,
                    d = l ? e.virtual.slides.length : e.slides.length,
                    c = n.children(`.${e.params.slideClass}`),
                    p = l ? e.virtual.slides.length : c.length;
                let u = [];
                const h = [],
                    f = [];
                let m = i.slidesOffsetBefore;
                'function' == typeof m && (m = i.slidesOffsetBefore.call(e));
                let g = i.slidesOffsetAfter;
                'function' == typeof g && (g = i.slidesOffsetAfter.call(e));
                const v = e.snapGrid.length,
                    T = e.slidesGrid.length;
                let S = i.spaceBetween,
                    b = -m,
                    C = 0,
                    E = 0;
                if (void 0 === r) return;
                'string' == typeof S &&
                    S.indexOf('%') >= 0 &&
                    (S = (parseFloat(S.replace('%', '')) / 100) * r),
                    (e.virtualSize = -S),
                    a
                        ? c.css({ marginLeft: '', marginBottom: '', marginTop: '' })
                        : c.css({ marginRight: '', marginBottom: '', marginTop: '' }),
                    i.centeredSlides &&
                        i.cssMode &&
                        (w(e.wrapperEl, '--swiper-centered-offset-before', ''),
                        w(e.wrapperEl, '--swiper-centered-offset-after', ''));
                const x = i.grid && i.grid.rows > 1 && e.grid;
                let y;
                x && e.grid.initSlides(p);
                const M =
                    'auto' === i.slidesPerView &&
                    i.breakpoints &&
                    Object.keys(i.breakpoints).filter(
                        e => void 0 !== i.breakpoints[e].slidesPerView
                    ).length > 0;
                for (let n = 0; n < p; n += 1) {
                    y = 0;
                    const a = c.eq(n);
                    if ((x && e.grid.updateSlide(n, a, p, t), 'none' !== a.css('display'))) {
                        if ('auto' === i.slidesPerView) {
                            M && (c[n].style[t('width')] = '');
                            const r = getComputedStyle(a[0]),
                                o = a[0].style.transform,
                                l = a[0].style.webkitTransform;
                            if (
                                (o && (a[0].style.transform = 'none'),
                                l && (a[0].style.webkitTransform = 'none'),
                                i.roundLengths)
                            )
                                y = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
                            else {
                                const e = s(r, 'width'),
                                    t = s(r, 'padding-left'),
                                    i = s(r, 'padding-right'),
                                    n = s(r, 'margin-left'),
                                    o = s(r, 'margin-right'),
                                    l = r.getPropertyValue('box-sizing');
                                if (l && 'border-box' === l) y = e + n + o;
                                else {
                                    const { clientWidth: s, offsetWidth: r } = a[0];
                                    y = e + t + i + n + o + (r - s);
                                }
                            }
                            o && (a[0].style.transform = o),
                                l && (a[0].style.webkitTransform = l),
                                i.roundLengths && (y = Math.floor(y));
                        } else
                            (y = (r - (i.slidesPerView - 1) * S) / i.slidesPerView),
                                i.roundLengths && (y = Math.floor(y)),
                                c[n] && (c[n].style[t('width')] = `${y}px`);
                        c[n] && (c[n].swiperSlideSize = y),
                            f.push(y),
                            i.centeredSlides
                                ? ((b = b + y / 2 + C / 2 + S),
                                  0 === C && 0 !== n && (b = b - r / 2 - S),
                                  0 === n && (b = b - r / 2 - S),
                                  Math.abs(b) < 0.001 && (b = 0),
                                  i.roundLengths && (b = Math.floor(b)),
                                  E % i.slidesPerGroup == 0 && u.push(b),
                                  h.push(b))
                                : (i.roundLengths && (b = Math.floor(b)),
                                  (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                                      e.params.slidesPerGroup ==
                                      0 && u.push(b),
                                  h.push(b),
                                  (b = b + y + S)),
                            (e.virtualSize += y + S),
                            (C = y),
                            (E += 1);
                    }
                }
                if (
                    ((e.virtualSize = Math.max(e.virtualSize, r) + g),
                    a &&
                        o &&
                        ('slide' === i.effect || 'coverflow' === i.effect) &&
                        n.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
                    i.setWrapperSize &&
                        n.css({ [t('width')]: `${e.virtualSize + i.spaceBetween}px` }),
                    x && e.grid.updateWrapperSize(y, u, t),
                    !i.centeredSlides)
                ) {
                    const t = [];
                    for (let s = 0; s < u.length; s += 1) {
                        let n = u[s];
                        i.roundLengths && (n = Math.floor(n)),
                            u[s] <= e.virtualSize - r && t.push(n);
                    }
                    (u = t),
                        Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
                            u.push(e.virtualSize - r);
                }
                if ((0 === u.length && (u = [0]), 0 !== i.spaceBetween)) {
                    const s = e.isHorizontal() && a ? 'marginLeft' : t('marginRight');
                    c.filter((e, t) => !i.cssMode || t !== c.length - 1).css({ [s]: `${S}px` });
                }
                if (i.centeredSlides && i.centeredSlidesBounds) {
                    let e = 0;
                    f.forEach(t => {
                        e += t + (i.spaceBetween ? i.spaceBetween : 0);
                    }),
                        (e -= i.spaceBetween);
                    const t = e - r;
                    u = u.map(e => (e < 0 ? -m : e > t ? t + g : e));
                }
                if (i.centerInsufficientSlides) {
                    let e = 0;
                    if (
                        (f.forEach(t => {
                            e += t + (i.spaceBetween ? i.spaceBetween : 0);
                        }),
                        (e -= i.spaceBetween),
                        e < r)
                    ) {
                        const t = (r - e) / 2;
                        u.forEach((e, s) => {
                            u[s] = e - t;
                        }),
                            h.forEach((e, s) => {
                                h[s] = e + t;
                            });
                    }
                }
                if (
                    (Object.assign(e, {
                        slides: c,
                        snapGrid: u,
                        slidesGrid: h,
                        slidesSizesGrid: f
                    }),
                    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
                ) {
                    w(e.wrapperEl, '--swiper-centered-offset-before', -u[0] + 'px'),
                        w(
                            e.wrapperEl,
                            '--swiper-centered-offset-after',
                            e.size / 2 - f[f.length - 1] / 2 + 'px'
                        );
                    const t = -e.snapGrid[0],
                        s = -e.slidesGrid[0];
                    (e.snapGrid = e.snapGrid.map(e => e + t)),
                        (e.slidesGrid = e.slidesGrid.map(e => e + s));
                }
                if (
                    (p !== d && e.emit('slidesLengthChange'),
                    u.length !== v &&
                        (e.params.watchOverflow && e.checkOverflow(),
                        e.emit('snapGridLengthChange')),
                    h.length !== T && e.emit('slidesGridLengthChange'),
                    i.watchSlidesProgress && e.updateSlidesOffset(),
                    !(l || i.cssMode || ('slide' !== i.effect && 'fade' !== i.effect)))
                ) {
                    const t = `${i.containerModifierClass}backface-hidden`,
                        s = e.$el.hasClass(t);
                    p <= i.maxBackfaceHiddenSlides
                        ? s || e.$el.addClass(t)
                        : s && e.$el.removeClass(t);
                }
            },
            updateAutoHeight: function (e) {
                const t = this,
                    s = [],
                    i = t.virtual && t.params.virtual.enabled;
                let n,
                    r = 0;
                'number' == typeof e
                    ? t.setTransition(e)
                    : !0 === e && t.setTransition(t.params.speed);
                const a = e =>
                    i
                        ? t.slides.filter(
                              t => parseInt(t.getAttribute('data-swiper-slide-index'), 10) === e
                          )[0]
                        : t.slides.eq(e)[0];
                if ('auto' !== t.params.slidesPerView && t.params.slidesPerView > 1)
                    if (t.params.centeredSlides)
                        (t.visibleSlides || h([])).each(e => {
                            s.push(e);
                        });
                    else
                        for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                            const e = t.activeIndex + n;
                            if (e > t.slides.length && !i) break;
                            s.push(a(e));
                        }
                else s.push(a(t.activeIndex));
                for (n = 0; n < s.length; n += 1)
                    if (void 0 !== s[n]) {
                        const e = s[n].offsetHeight;
                        r = e > r ? e : r;
                    }
                (r || 0 === r) && t.$wrapperEl.css('height', `${r}px`);
            },
            updateSlidesOffset: function () {
                const e = this,
                    t = e.slides;
                for (let s = 0; s < t.length; s += 1)
                    t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop;
            },
            updateSlidesProgress: function (e = (this && this.translate) || 0) {
                const t = this,
                    s = t.params,
                    { slides: i, rtlTranslate: n, snapGrid: r } = t;
                if (0 === i.length) return;
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                let a = -e;
                n && (a = e),
                    i.removeClass(s.slideVisibleClass),
                    (t.visibleSlidesIndexes = []),
                    (t.visibleSlides = []);
                for (let e = 0; e < i.length; e += 1) {
                    const o = i[e];
                    let l = o.swiperSlideOffset;
                    s.cssMode && s.centeredSlides && (l -= i[0].swiperSlideOffset);
                    const d =
                            (a + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                            (o.swiperSlideSize + s.spaceBetween),
                        c =
                            (a - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                            (o.swiperSlideSize + s.spaceBetween),
                        p = -(a - l),
                        u = p + t.slidesSizesGrid[e];
                    ((p >= 0 && p < t.size - 1) ||
                        (u > 1 && u <= t.size) ||
                        (p <= 0 && u >= t.size)) &&
                        (t.visibleSlides.push(o),
                        t.visibleSlidesIndexes.push(e),
                        i.eq(e).addClass(s.slideVisibleClass)),
                        (o.progress = n ? -d : d),
                        (o.originalProgress = n ? -c : c);
                }
                t.visibleSlides = h(t.visibleSlides);
            },
            updateProgress: function (e) {
                const t = this;
                if (void 0 === e) {
                    const s = t.rtlTranslate ? -1 : 1;
                    e = (t && t.translate && t.translate * s) || 0;
                }
                const s = t.params,
                    i = t.maxTranslate() - t.minTranslate();
                let { progress: n, isBeginning: r, isEnd: a } = t;
                const o = r,
                    l = a;
                0 === i
                    ? ((n = 0), (r = !0), (a = !0))
                    : ((n = (e - t.minTranslate()) / i), (r = n <= 0), (a = n >= 1)),
                    Object.assign(t, { progress: n, isBeginning: r, isEnd: a }),
                    (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
                        t.updateSlidesProgress(e),
                    r && !o && t.emit('reachBeginning toEdge'),
                    a && !l && t.emit('reachEnd toEdge'),
                    ((o && !r) || (l && !a)) && t.emit('fromEdge'),
                    t.emit('progress', n);
            },
            updateSlidesClasses: function () {
                const e = this,
                    { slides: t, params: s, $wrapperEl: i, activeIndex: n, realIndex: r } = e,
                    a = e.virtual && s.virtual.enabled;
                let o;
                t.removeClass(
                    `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
                ),
                    (o = a
                        ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${n}"]`)
                        : t.eq(n)),
                    o.addClass(s.slideActiveClass),
                    s.loop &&
                        (o.hasClass(s.slideDuplicateClass)
                            ? i
                                  .children(
                                      `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`
                                  )
                                  .addClass(s.slideDuplicateActiveClass)
                            : i
                                  .children(
                                      `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`
                                  )
                                  .addClass(s.slideDuplicateActiveClass));
                let l = o.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
                s.loop && 0 === l.length && ((l = t.eq(0)), l.addClass(s.slideNextClass));
                let d = o.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
                s.loop && 0 === d.length && ((d = t.eq(-1)), d.addClass(s.slidePrevClass)),
                    s.loop &&
                        (l.hasClass(s.slideDuplicateClass)
                            ? i
                                  .children(
                                      `.${s.slideClass}:not(.${
                                          s.slideDuplicateClass
                                      })[data-swiper-slide-index="${l.attr(
                                          'data-swiper-slide-index'
                                      )}"]`
                                  )
                                  .addClass(s.slideDuplicateNextClass)
                            : i
                                  .children(
                                      `.${s.slideClass}.${
                                          s.slideDuplicateClass
                                      }[data-swiper-slide-index="${l.attr(
                                          'data-swiper-slide-index'
                                      )}"]`
                                  )
                                  .addClass(s.slideDuplicateNextClass),
                        d.hasClass(s.slideDuplicateClass)
                            ? i
                                  .children(
                                      `.${s.slideClass}:not(.${
                                          s.slideDuplicateClass
                                      })[data-swiper-slide-index="${d.attr(
                                          'data-swiper-slide-index'
                                      )}"]`
                                  )
                                  .addClass(s.slideDuplicatePrevClass)
                            : i
                                  .children(
                                      `.${s.slideClass}.${
                                          s.slideDuplicateClass
                                      }[data-swiper-slide-index="${d.attr(
                                          'data-swiper-slide-index'
                                      )}"]`
                                  )
                                  .addClass(s.slideDuplicatePrevClass)),
                    e.emitSlidesClasses();
            },
            updateActiveIndex: function (e) {
                const t = this,
                    s = t.rtlTranslate ? t.translate : -t.translate,
                    {
                        slidesGrid: i,
                        snapGrid: n,
                        params: r,
                        activeIndex: a,
                        realIndex: o,
                        snapIndex: l
                    } = t;
                let d,
                    c = e;
                if (void 0 === c) {
                    for (let e = 0; e < i.length; e += 1)
                        void 0 !== i[e + 1]
                            ? s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2
                                ? (c = e)
                                : s >= i[e] && s < i[e + 1] && (c = e + 1)
                            : s >= i[e] && (c = e);
                    r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
                }
                if (n.indexOf(s) >= 0) d = n.indexOf(s);
                else {
                    const e = Math.min(r.slidesPerGroupSkip, c);
                    d = e + Math.floor((c - e) / r.slidesPerGroup);
                }
                if ((d >= n.length && (d = n.length - 1), c === a))
                    return void (d !== l && ((t.snapIndex = d), t.emit('snapIndexChange')));
                const p = parseInt(t.slides.eq(c).attr('data-swiper-slide-index') || c, 10);
                Object.assign(t, { snapIndex: d, realIndex: p, previousIndex: a, activeIndex: c }),
                    t.emit('activeIndexChange'),
                    t.emit('snapIndexChange'),
                    o !== p && t.emit('realIndexChange'),
                    (t.initialized || t.params.runCallbacksOnInit) && t.emit('slideChange');
            },
            updateClickedSlide: function (e) {
                const t = this,
                    s = t.params,
                    i = h(e).closest(`.${s.slideClass}`)[0];
                let n,
                    r = !1;
                if (i)
                    for (let e = 0; e < t.slides.length; e += 1)
                        if (t.slides[e] === i) {
                            (r = !0), (n = e);
                            break;
                        }
                if (!i || !r) return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
                (t.clickedSlide = i),
                    t.virtual && t.params.virtual.enabled
                        ? (t.clickedIndex = parseInt(h(i).attr('data-swiper-slide-index'), 10))
                        : (t.clickedIndex = n),
                    s.slideToClickedSlide &&
                        void 0 !== t.clickedIndex &&
                        t.clickedIndex !== t.activeIndex &&
                        t.slideToClickedSlide();
            }
        };
    function M({ swiper: e, runCallbacks: t, direction: s, step: i }) {
        const { activeIndex: n, previousIndex: r } = e;
        let a = s;
        if (
            (a || (a = n > r ? 'next' : n < r ? 'prev' : 'reset'),
            e.emit(`transition${i}`),
            t && n !== r)
        ) {
            if ('reset' === a) return void e.emit(`slideResetTransition${i}`);
            e.emit(`slideChangeTransition${i}`),
                'next' === a
                    ? e.emit(`slideNextTransition${i}`)
                    : e.emit(`slidePrevTransition${i}`);
        }
    }
    const L = {
        slideTo: function (e = 0, t = this.params.speed, s = !0, i, n) {
            if ('number' != typeof e && 'string' != typeof e)
                throw new Error(
                    `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
                );
            if ('string' == typeof e) {
                const t = parseInt(e, 10);
                if (!isFinite(t))
                    throw new Error(
                        `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
                    );
                e = t;
            }
            const r = this;
            let a = e;
            a < 0 && (a = 0);
            const {
                params: o,
                snapGrid: l,
                slidesGrid: d,
                previousIndex: c,
                activeIndex: p,
                rtlTranslate: u,
                wrapperEl: h,
                enabled: f
            } = r;
            if ((r.animating && o.preventInteractionOnTransition) || (!f && !i && !n)) return !1;
            const m = Math.min(r.params.slidesPerGroupSkip, a);
            let g = m + Math.floor((a - m) / r.params.slidesPerGroup);
            g >= l.length && (g = l.length - 1);
            const v = -l[g];
            if (o.normalizeSlideIndex)
                for (let e = 0; e < d.length; e += 1) {
                    const t = -Math.floor(100 * v),
                        s = Math.floor(100 * d[e]),
                        i = Math.floor(100 * d[e + 1]);
                    void 0 !== d[e + 1]
                        ? t >= s && t < i - (i - s) / 2
                            ? (a = e)
                            : t >= s && t < i && (a = e + 1)
                        : t >= s && (a = e);
                }
            if (r.initialized && a !== p) {
                if (!r.allowSlideNext && v < r.translate && v < r.minTranslate()) return !1;
                if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (p || 0) !== a)
                    return !1;
            }
            let w;
            if (
                (a !== (c || 0) && s && r.emit('beforeSlideChangeStart'),
                r.updateProgress(v),
                (w = a > p ? 'next' : a < p ? 'prev' : 'reset'),
                (u && -v === r.translate) || (!u && v === r.translate))
            )
                return (
                    r.updateActiveIndex(a),
                    o.autoHeight && r.updateAutoHeight(),
                    r.updateSlidesClasses(),
                    'slide' !== o.effect && r.setTranslate(v),
                    'reset' !== w && (r.transitionStart(s, w), r.transitionEnd(s, w)),
                    !1
                );
            if (o.cssMode) {
                const e = r.isHorizontal(),
                    s = u ? v : -v;
                if (0 === t) {
                    const t = r.virtual && r.params.virtual.enabled;
                    t && ((r.wrapperEl.style.scrollSnapType = 'none'), (r._immediateVirtual = !0)),
                        (h[e ? 'scrollLeft' : 'scrollTop'] = s),
                        t &&
                            requestAnimationFrame(() => {
                                (r.wrapperEl.style.scrollSnapType = ''),
                                    (r._swiperImmediateVirtual = !1);
                            });
                } else {
                    if (!r.support.smoothScroll)
                        return T({ swiper: r, targetPosition: s, side: e ? 'left' : 'top' }), !0;
                    h.scrollTo({ [e ? 'left' : 'top']: s, behavior: 'smooth' });
                }
                return !0;
            }
            return (
                r.setTransition(t),
                r.setTranslate(v),
                r.updateActiveIndex(a),
                r.updateSlidesClasses(),
                r.emit('beforeTransitionStart', t, i),
                r.transitionStart(s, w),
                0 === t
                    ? r.transitionEnd(s, w)
                    : r.animating ||
                      ((r.animating = !0),
                      r.onSlideToWrapperTransitionEnd ||
                          (r.onSlideToWrapperTransitionEnd = function (e) {
                              r &&
                                  !r.destroyed &&
                                  e.target === this &&
                                  (r.$wrapperEl[0].removeEventListener(
                                      'transitionend',
                                      r.onSlideToWrapperTransitionEnd
                                  ),
                                  r.$wrapperEl[0].removeEventListener(
                                      'webkitTransitionEnd',
                                      r.onSlideToWrapperTransitionEnd
                                  ),
                                  (r.onSlideToWrapperTransitionEnd = null),
                                  delete r.onSlideToWrapperTransitionEnd,
                                  r.transitionEnd(s, w));
                          }),
                      r.$wrapperEl[0].addEventListener(
                          'transitionend',
                          r.onSlideToWrapperTransitionEnd
                      ),
                      r.$wrapperEl[0].addEventListener(
                          'webkitTransitionEnd',
                          r.onSlideToWrapperTransitionEnd
                      )),
                !0
            );
        },
        slideToLoop: function (e = 0, t = this.params.speed, s = !0, i) {
            if ('string' == typeof e) {
                const t = parseInt(e, 10);
                if (!isFinite(t))
                    throw new Error(
                        `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
                    );
                e = t;
            }
            const n = this;
            let r = e;
            return n.params.loop && (r += n.loopedSlides), n.slideTo(r, t, s, i);
        },
        slideNext: function (e = this.params.speed, t = !0, s) {
            const i = this,
                { animating: n, enabled: r, params: a } = i;
            if (!r) return i;
            let o = a.slidesPerGroup;
            'auto' === a.slidesPerView &&
                1 === a.slidesPerGroup &&
                a.slidesPerGroupAuto &&
                (o = Math.max(i.slidesPerViewDynamic('current', !0), 1));
            const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o;
            if (a.loop) {
                if (n && a.loopPreventsSlide) return !1;
                i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
            }
            return a.rewind && i.isEnd
                ? i.slideTo(0, e, t, s)
                : i.slideTo(i.activeIndex + l, e, t, s);
        },
        slidePrev: function (e = this.params.speed, t = !0, s) {
            const i = this,
                {
                    params: n,
                    animating: r,
                    snapGrid: a,
                    slidesGrid: o,
                    rtlTranslate: l,
                    enabled: d
                } = i;
            if (!d) return i;
            if (n.loop) {
                if (r && n.loopPreventsSlide) return !1;
                i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
            }
            function c(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            const p = c(l ? i.translate : -i.translate),
                u = a.map(e => c(e));
            let h = a[u.indexOf(p) - 1];
            if (void 0 === h && n.cssMode) {
                let e;
                a.forEach((t, s) => {
                    p >= t && (e = s);
                }),
                    void 0 !== e && (h = a[e > 0 ? e - 1 : e]);
            }
            let f = 0;
            if (
                (void 0 !== h &&
                    ((f = o.indexOf(h)),
                    f < 0 && (f = i.activeIndex - 1),
                    'auto' === n.slidesPerView &&
                        1 === n.slidesPerGroup &&
                        n.slidesPerGroupAuto &&
                        ((f = f - i.slidesPerViewDynamic('previous', !0) + 1),
                        (f = Math.max(f, 0)))),
                n.rewind && i.isBeginning)
            ) {
                const n =
                    i.params.virtual && i.params.virtual.enabled && i.virtual
                        ? i.virtual.slides.length - 1
                        : i.slides.length - 1;
                return i.slideTo(n, e, t, s);
            }
            return i.slideTo(f, e, t, s);
        },
        slideReset: function (e = this.params.speed, t = !0, s) {
            return this.slideTo(this.activeIndex, e, t, s);
        },
        slideToClosest: function (e = this.params.speed, t = !0, s, i = 0.5) {
            const n = this;
            let r = n.activeIndex;
            const a = Math.min(n.params.slidesPerGroupSkip, r),
                o = a + Math.floor((r - a) / n.params.slidesPerGroup),
                l = n.rtlTranslate ? n.translate : -n.translate;
            if (l >= n.snapGrid[o]) {
                const e = n.snapGrid[o];
                l - e > (n.snapGrid[o + 1] - e) * i && (r += n.params.slidesPerGroup);
            } else {
                const e = n.snapGrid[o - 1];
                l - e <= (n.snapGrid[o] - e) * i && (r -= n.params.slidesPerGroup);
            }
            return (
                (r = Math.max(r, 0)),
                (r = Math.min(r, n.slidesGrid.length - 1)),
                n.slideTo(r, e, t, s)
            );
        },
        slideToClickedSlide: function () {
            const e = this,
                { params: t, $wrapperEl: s } = e,
                i = 'auto' === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let n,
                r = e.clickedIndex;
            if (t.loop) {
                if (e.animating) return;
                (n = parseInt(h(e.clickedSlide).attr('data-swiper-slide-index'), 10)),
                    t.centeredSlides
                        ? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2
                            ? (e.loopFix(),
                              (r = s
                                  .children(
                                      `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                                  )
                                  .eq(0)
                                  .index()),
                              f(() => {
                                  e.slideTo(r);
                              }))
                            : e.slideTo(r)
                        : r > e.slides.length - i
                        ? (e.loopFix(),
                          (r = s
                              .children(
                                  `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                              )
                              .eq(0)
                              .index()),
                          f(() => {
                              e.slideTo(r);
                          }))
                        : e.slideTo(r);
            } else e.slideTo(r);
        }
    };
    function P(e) {
        const t = this,
            s = i(),
            n = r(),
            a = t.touchEventsData,
            { params: o, touches: l, enabled: d } = t;
        if (!d) return;
        if (t.animating && o.preventInteractionOnTransition) return;
        !t.animating && o.cssMode && o.loop && t.loopFix();
        let c = e;
        c.originalEvent && (c = c.originalEvent);
        let p = h(c.target);
        if ('wrapper' === o.touchEventsTarget && !p.closest(t.wrapperEl).length) return;
        if (
            ((a.isTouchEvent = 'touchstart' === c.type),
            !a.isTouchEvent && 'which' in c && 3 === c.which)
        )
            return;
        if (!a.isTouchEvent && 'button' in c && c.button > 0) return;
        if (a.isTouched && a.isMoved) return;
        const u = !!o.noSwipingClass && '' !== o.noSwipingClass,
            f = e.composedPath ? e.composedPath() : e.path;
        u && c.target && c.target.shadowRoot && f && (p = h(f[0]));
        const g = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
            v = !(!c.target || !c.target.shadowRoot);
        if (
            o.noSwiping &&
            (v
                ? (function (e, t = this) {
                      return (function t(s) {
                          if (!s || s === i() || s === r()) return null;
                          s.assignedSlot && (s = s.assignedSlot);
                          const n = s.closest(e);
                          return n || s.getRootNode ? n || t(s.getRootNode().host) : null;
                      })(t);
                  })(g, p[0])
                : p.closest(g)[0])
        )
            return void (t.allowClick = !0);
        if (o.swipeHandler && !p.closest(o.swipeHandler)[0]) return;
        (l.currentX = 'touchstart' === c.type ? c.targetTouches[0].pageX : c.pageX),
            (l.currentY = 'touchstart' === c.type ? c.targetTouches[0].pageY : c.pageY);
        const w = l.currentX,
            T = l.currentY,
            S = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
            b = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
        if (S && (w <= b || w >= n.innerWidth - b)) {
            if ('prevent' !== S) return;
            e.preventDefault();
        }
        if (
            (Object.assign(a, {
                isTouched: !0,
                isMoved: !1,
                allowTouchCallbacks: !0,
                isScrolling: void 0,
                startMoving: void 0
            }),
            (l.startX = w),
            (l.startY = T),
            (a.touchStartTime = m()),
            (t.allowClick = !0),
            t.updateSize(),
            (t.swipeDirection = void 0),
            o.threshold > 0 && (a.allowThresholdMove = !1),
            'touchstart' !== c.type)
        ) {
            let e = !0;
            p.is(a.focusableElements) &&
                ((e = !1), 'SELECT' === p[0].nodeName && (a.isTouched = !1)),
                s.activeElement &&
                    h(s.activeElement).is(a.focusableElements) &&
                    s.activeElement !== p[0] &&
                    s.activeElement.blur();
            const i = e && t.allowTouchMove && o.touchStartPreventDefault;
            (!o.touchStartForcePreventDefault && !i) ||
                p[0].isContentEditable ||
                c.preventDefault();
        }
        t.params.freeMode &&
            t.params.freeMode.enabled &&
            t.freeMode &&
            t.animating &&
            !o.cssMode &&
            t.freeMode.onTouchStart(),
            t.emit('touchStart', c);
    }
    function k(e) {
        const t = i(),
            s = this,
            n = s.touchEventsData,
            { params: r, touches: a, rtlTranslate: o, enabled: l } = s;
        if (!l) return;
        let d = e;
        if ((d.originalEvent && (d = d.originalEvent), !n.isTouched))
            return void (n.startMoving && n.isScrolling && s.emit('touchMoveOpposite', d));
        if (n.isTouchEvent && 'touchmove' !== d.type) return;
        const c =
                'touchmove' === d.type &&
                d.targetTouches &&
                (d.targetTouches[0] || d.changedTouches[0]),
            p = 'touchmove' === d.type ? c.pageX : d.pageX,
            u = 'touchmove' === d.type ? c.pageY : d.pageY;
        if (d.preventedByNestedSwiper) return (a.startX = p), void (a.startY = u);
        if (!s.allowTouchMove)
            return (
                h(d.target).is(n.focusableElements) || (s.allowClick = !1),
                void (
                    n.isTouched &&
                    (Object.assign(a, { startX: p, startY: u, currentX: p, currentY: u }),
                    (n.touchStartTime = m()))
                )
            );
        if (n.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
            if (s.isVertical()) {
                if (
                    (u < a.startY && s.translate <= s.maxTranslate()) ||
                    (u > a.startY && s.translate >= s.minTranslate())
                )
                    return (n.isTouched = !1), void (n.isMoved = !1);
            } else if (
                (p < a.startX && s.translate <= s.maxTranslate()) ||
                (p > a.startX && s.translate >= s.minTranslate())
            )
                return;
        if (
            n.isTouchEvent &&
            t.activeElement &&
            d.target === t.activeElement &&
            h(d.target).is(n.focusableElements)
        )
            return (n.isMoved = !0), void (s.allowClick = !1);
        if (
            (n.allowTouchCallbacks && s.emit('touchMove', d),
            d.targetTouches && d.targetTouches.length > 1)
        )
            return;
        (a.currentX = p), (a.currentY = u);
        const f = a.currentX - a.startX,
            g = a.currentY - a.startY;
        if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold) return;
        if (void 0 === n.isScrolling) {
            let e;
            (s.isHorizontal() && a.currentY === a.startY) ||
            (s.isVertical() && a.currentX === a.startX)
                ? (n.isScrolling = !1)
                : f * f + g * g >= 25 &&
                  ((e = (180 * Math.atan2(Math.abs(g), Math.abs(f))) / Math.PI),
                  (n.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle));
        }
        if (
            (n.isScrolling && s.emit('touchMoveOpposite', d),
            void 0 === n.startMoving &&
                ((a.currentX === a.startX && a.currentY === a.startY) || (n.startMoving = !0)),
            n.isScrolling)
        )
            return void (n.isTouched = !1);
        if (!n.startMoving) return;
        (s.allowClick = !1),
            !r.cssMode && d.cancelable && d.preventDefault(),
            r.touchMoveStopPropagation && !r.nested && d.stopPropagation(),
            n.isMoved ||
                (r.loop && !r.cssMode && s.loopFix(),
                (n.startTranslate = s.getTranslate()),
                s.setTransition(0),
                s.animating && s.$wrapperEl.trigger('webkitTransitionEnd transitionend'),
                (n.allowMomentumBounce = !1),
                !r.grabCursor ||
                    (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
                    s.setGrabCursor(!0),
                s.emit('sliderFirstMove', d)),
            s.emit('sliderMove', d),
            (n.isMoved = !0);
        let v = s.isHorizontal() ? f : g;
        (a.diff = v),
            (v *= r.touchRatio),
            o && (v = -v),
            (s.swipeDirection = v > 0 ? 'prev' : 'next'),
            (n.currentTranslate = v + n.startTranslate);
        let w = !0,
            T = r.resistanceRatio;
        if (
            (r.touchReleaseOnEdges && (T = 0),
            v > 0 && n.currentTranslate > s.minTranslate()
                ? ((w = !1),
                  r.resistance &&
                      (n.currentTranslate =
                          s.minTranslate() - 1 + (-s.minTranslate() + n.startTranslate + v) ** T))
                : v < 0 &&
                  n.currentTranslate < s.maxTranslate() &&
                  ((w = !1),
                  r.resistance &&
                      (n.currentTranslate =
                          s.maxTranslate() + 1 - (s.maxTranslate() - n.startTranslate - v) ** T)),
            w && (d.preventedByNestedSwiper = !0),
            !s.allowSlideNext &&
                'next' === s.swipeDirection &&
                n.currentTranslate < n.startTranslate &&
                (n.currentTranslate = n.startTranslate),
            !s.allowSlidePrev &&
                'prev' === s.swipeDirection &&
                n.currentTranslate > n.startTranslate &&
                (n.currentTranslate = n.startTranslate),
            s.allowSlidePrev || s.allowSlideNext || (n.currentTranslate = n.startTranslate),
            r.threshold > 0)
        ) {
            if (!(Math.abs(v) > r.threshold || n.allowThresholdMove))
                return void (n.currentTranslate = n.startTranslate);
            if (!n.allowThresholdMove)
                return (
                    (n.allowThresholdMove = !0),
                    (a.startX = a.currentX),
                    (a.startY = a.currentY),
                    (n.currentTranslate = n.startTranslate),
                    void (a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
                );
        }
        r.followFinger &&
            !r.cssMode &&
            (((r.freeMode && r.freeMode.enabled && s.freeMode) || r.watchSlidesProgress) &&
                (s.updateActiveIndex(), s.updateSlidesClasses()),
            s.params.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
            s.updateProgress(n.currentTranslate),
            s.setTranslate(n.currentTranslate));
    }
    function O(e) {
        const t = this,
            s = t.touchEventsData,
            { params: i, touches: n, rtlTranslate: r, slidesGrid: a, enabled: o } = t;
        if (!o) return;
        let l = e;
        if (
            (l.originalEvent && (l = l.originalEvent),
            s.allowTouchCallbacks && t.emit('touchEnd', l),
            (s.allowTouchCallbacks = !1),
            !s.isTouched)
        )
            return (
                s.isMoved && i.grabCursor && t.setGrabCursor(!1),
                (s.isMoved = !1),
                void (s.startMoving = !1)
            );
        i.grabCursor &&
            s.isMoved &&
            s.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
        const d = m(),
            c = d - s.touchStartTime;
        if (t.allowClick) {
            const e = l.path || (l.composedPath && l.composedPath());
            t.updateClickedSlide((e && e[0]) || l.target),
                t.emit('tap click', l),
                c < 300 && d - s.lastClickTime < 300 && t.emit('doubleTap doubleClick', l);
        }
        if (
            ((s.lastClickTime = m()),
            f(() => {
                t.destroyed || (t.allowClick = !0);
            }),
            !s.isTouched ||
                !s.isMoved ||
                !t.swipeDirection ||
                0 === n.diff ||
                s.currentTranslate === s.startTranslate)
        )
            return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
        let p;
        if (
            ((s.isTouched = !1),
            (s.isMoved = !1),
            (s.startMoving = !1),
            (p = i.followFinger ? (r ? t.translate : -t.translate) : -s.currentTranslate),
            i.cssMode)
        )
            return;
        if (t.params.freeMode && i.freeMode.enabled)
            return void t.freeMode.onTouchEnd({ currentPos: p });
        let u = 0,
            h = t.slidesSizesGrid[0];
        for (let e = 0; e < a.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
            const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
            void 0 !== a[e + t]
                ? p >= a[e] && p < a[e + t] && ((u = e), (h = a[e + t] - a[e]))
                : p >= a[e] && ((u = e), (h = a[a.length - 1] - a[a.length - 2]));
        }
        let g = null,
            v = null;
        i.rewind &&
            (t.isBeginning
                ? (v =
                      t.params.virtual && t.params.virtual.enabled && t.virtual
                          ? t.virtual.slides.length - 1
                          : t.slides.length - 1)
                : t.isEnd && (g = 0));
        const w = (p - a[u]) / h,
            T = u < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (c > i.longSwipesMs) {
            if (!i.longSwipes) return void t.slideTo(t.activeIndex);
            'next' === t.swipeDirection &&
                (w >= i.longSwipesRatio
                    ? t.slideTo(i.rewind && t.isEnd ? g : u + T)
                    : t.slideTo(u)),
                'prev' === t.swipeDirection &&
                    (w > 1 - i.longSwipesRatio
                        ? t.slideTo(u + T)
                        : null !== v && w < 0 && Math.abs(w) > i.longSwipesRatio
                        ? t.slideTo(v)
                        : t.slideTo(u));
        } else {
            if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
            !t.navigation || (l.target !== t.navigation.nextEl && l.target !== t.navigation.prevEl)
                ? ('next' === t.swipeDirection && t.slideTo(null !== g ? g : u + T),
                  'prev' === t.swipeDirection && t.slideTo(null !== v ? v : u))
                : l.target === t.navigation.nextEl
                ? t.slideTo(u + T)
                : t.slideTo(u);
        }
    }
    function $() {
        const e = this,
            { params: t, el: s } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e;
        (e.allowSlideNext = !0),
            (e.allowSlidePrev = !0),
            e.updateSize(),
            e.updateSlides(),
            e.updateSlidesClasses(),
            ('auto' === t.slidesPerView || t.slidesPerView > 1) &&
            e.isEnd &&
            !e.isBeginning &&
            !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0),
            e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
            (e.allowSlidePrev = n),
            (e.allowSlideNext = i),
            e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
    function A(e) {
        const t = this;
        t.enabled &&
            (t.allowClick ||
                (t.params.preventClicks && e.preventDefault(),
                t.params.preventClicksPropagation &&
                    t.animating &&
                    (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function z() {
        const e = this,
            { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
        if (!i) return;
        let n;
        (e.previousTranslate = e.translate),
            e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop),
            0 === e.translate && (e.translate = 0),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        (n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
            n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
            e.emit('setTranslate', e.translate, !1);
    }
    let I = !1;
    function D() {}
    const _ = (e, t) => {
            const s = i(),
                { params: n, touchEvents: r, el: a, wrapperEl: o, device: l, support: d } = e,
                c = !!n.nested,
                p = 'on' === t ? 'addEventListener' : 'removeEventListener',
                u = t;
            if (d.touch) {
                const t = !(
                    'touchstart' !== r.start ||
                    !d.passiveListener ||
                    !n.passiveListeners
                ) && { passive: !0, capture: !1 };
                a[p](r.start, e.onTouchStart, t),
                    a[p](
                        r.move,
                        e.onTouchMove,
                        d.passiveListener ? { passive: !1, capture: c } : c
                    ),
                    a[p](r.end, e.onTouchEnd, t),
                    r.cancel && a[p](r.cancel, e.onTouchEnd, t);
            } else
                a[p](r.start, e.onTouchStart, !1),
                    s[p](r.move, e.onTouchMove, c),
                    s[p](r.end, e.onTouchEnd, !1);
            (n.preventClicks || n.preventClicksPropagation) && a[p]('click', e.onClick, !0),
                n.cssMode && o[p]('scroll', e.onScroll),
                n.updateOnWindowResize
                    ? e[u](
                          l.ios || l.android
                              ? 'resize orientationchange observerUpdate'
                              : 'resize observerUpdate',
                          $,
                          !0
                      )
                    : e[u]('observerUpdate', $, !0);
        },
        G = {
            attachEvents: function () {
                const e = this,
                    t = i(),
                    { params: s, support: n } = e;
                (e.onTouchStart = P.bind(e)),
                    (e.onTouchMove = k.bind(e)),
                    (e.onTouchEnd = O.bind(e)),
                    s.cssMode && (e.onScroll = z.bind(e)),
                    (e.onClick = A.bind(e)),
                    n.touch && !I && (t.addEventListener('touchstart', D), (I = !0)),
                    _(e, 'on');
            },
            detachEvents: function () {
                _(this, 'off');
            }
        },
        N = (e, t) => e.grid && t.grid && t.grid.rows > 1,
        B = {
            addClasses: function () {
                const e = this,
                    { classNames: t, params: s, rtl: i, $el: n, device: r, support: a } = e,
                    o = (function (e, t) {
                        const s = [];
                        return (
                            e.forEach(e => {
                                'object' == typeof e
                                    ? Object.keys(e).forEach(i => {
                                          e[i] && s.push(t + i);
                                      })
                                    : 'string' == typeof e && s.push(t + e);
                            }),
                            s
                        );
                    })(
                        [
                            'initialized',
                            s.direction,
                            { 'pointer-events': !a.touch },
                            { 'free-mode': e.params.freeMode && s.freeMode.enabled },
                            { autoheight: s.autoHeight },
                            { rtl: i },
                            { grid: s.grid && s.grid.rows > 1 },
                            {
                                'grid-column': s.grid && s.grid.rows > 1 && 'column' === s.grid.fill
                            },
                            { android: r.android },
                            { ios: r.ios },
                            { 'css-mode': s.cssMode },
                            { centered: s.cssMode && s.centeredSlides },
                            { 'watch-progress': s.watchSlidesProgress }
                        ],
                        s.containerModifierClass
                    );
                t.push(...o), n.addClass([...t].join(' ')), e.emitContainerClasses();
            },
            removeClasses: function () {
                const { $el: e, classNames: t } = this;
                e.removeClass(t.join(' ')), this.emitContainerClasses();
            }
        },
        V = {
            init: !0,
            direction: 'horizontal',
            touchEventsTarget: 'wrapper',
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            resizeObserver: !0,
            nested: !1,
            createElements: !1,
            enabled: !0,
            focusableElements: 'input, select, option, textarea, button, video, label',
            width: null,
            height: null,
            preventInteractionOnTransition: !1,
            userAgent: null,
            url: null,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: 'slide',
            breakpoints: void 0,
            breakpointsBase: 'window',
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: !1,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            watchSlidesProgress: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopedSlidesLimit: !0,
            loopFillGroupWithBlank: !1,
            loopPreventsSlide: !0,
            rewind: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: 'swiper-no-swiping',
            noSwipingSelector: null,
            passiveListeners: !0,
            maxBackfaceHiddenSlides: 10,
            containerModifierClass: 'swiper-',
            slideClass: 'swiper-slide',
            slideBlankClass: 'swiper-slide-invisible-blank',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            runCallbacksOnInit: !0,
            _emitClasses: !1
        };
    function H(e, t) {
        return function (s = {}) {
            const i = Object.keys(s)[0],
                n = s[i];
            'object' == typeof n && null !== n
                ? (['navigation', 'pagination', 'scrollbar'].indexOf(i) >= 0 &&
                      !0 === e[i] &&
                      (e[i] = { auto: !0 }),
                  i in e && 'enabled' in n
                      ? (!0 === e[i] && (e[i] = { enabled: !0 }),
                        'object' != typeof e[i] || 'enabled' in e[i] || (e[i].enabled = !0),
                        e[i] || (e[i] = { enabled: !1 }),
                        v(t, s))
                      : v(t, s))
                : v(t, s);
        };
    }
    const j = {
            eventsEmitter: x,
            update: y,
            translate: {
                getTranslate: function (e = this.isHorizontal() ? 'x' : 'y') {
                    const { params: t, rtlTranslate: s, translate: i, $wrapperEl: n } = this;
                    if (t.virtualTranslate) return s ? -i : i;
                    if (t.cssMode) return i;
                    let a = (function (e, t = 'x') {
                        const s = r();
                        let i, n, a;
                        const o = (function (e) {
                            const t = r();
                            let s;
                            return (
                                t.getComputedStyle && (s = t.getComputedStyle(e, null)),
                                !s && e.currentStyle && (s = e.currentStyle),
                                s || (s = e.style),
                                s
                            );
                        })(e);
                        return (
                            s.WebKitCSSMatrix
                                ? ((n = o.transform || o.webkitTransform),
                                  n.split(',').length > 6 &&
                                      (n = n
                                          .split(', ')
                                          .map(e => e.replace(',', '.'))
                                          .join(', ')),
                                  (a = new s.WebKitCSSMatrix('none' === n ? '' : n)))
                                : ((a =
                                      o.MozTransform ||
                                      o.OTransform ||
                                      o.MsTransform ||
                                      o.msTransform ||
                                      o.transform ||
                                      o
                                          .getPropertyValue('transform')
                                          .replace('translate(', 'matrix(1, 0, 0, 1,')),
                                  (i = a.toString().split(','))),
                            'x' === t &&
                                (n = s.WebKitCSSMatrix
                                    ? a.m41
                                    : 16 === i.length
                                    ? parseFloat(i[12])
                                    : parseFloat(i[4])),
                            'y' === t &&
                                (n = s.WebKitCSSMatrix
                                    ? a.m42
                                    : 16 === i.length
                                    ? parseFloat(i[13])
                                    : parseFloat(i[5])),
                            n || 0
                        );
                    })(n[0], e);
                    return s && (a = -a), a || 0;
                },
                setTranslate: function (e, t) {
                    const s = this,
                        {
                            rtlTranslate: i,
                            params: n,
                            $wrapperEl: r,
                            wrapperEl: a,
                            progress: o
                        } = s;
                    let l,
                        d = 0,
                        c = 0;
                    s.isHorizontal() ? (d = i ? -e : e) : (c = e),
                        n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
                        n.cssMode
                            ? (a[s.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = s.isHorizontal()
                                  ? -d
                                  : -c)
                            : n.virtualTranslate || r.transform(`translate3d(${d}px, ${c}px, 0px)`),
                        (s.previousTranslate = s.translate),
                        (s.translate = s.isHorizontal() ? d : c);
                    const p = s.maxTranslate() - s.minTranslate();
                    (l = 0 === p ? 0 : (e - s.minTranslate()) / p),
                        l !== o && s.updateProgress(e),
                        s.emit('setTranslate', s.translate, t);
                },
                minTranslate: function () {
                    return -this.snapGrid[0];
                },
                maxTranslate: function () {
                    return -this.snapGrid[this.snapGrid.length - 1];
                },
                translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, n) {
                    const r = this,
                        { params: a, wrapperEl: o } = r;
                    if (r.animating && a.preventInteractionOnTransition) return !1;
                    const l = r.minTranslate(),
                        d = r.maxTranslate();
                    let c;
                    if (
                        ((c = i && e > l ? l : i && e < d ? d : e), r.updateProgress(c), a.cssMode)
                    ) {
                        const e = r.isHorizontal();
                        if (0 === t) o[e ? 'scrollLeft' : 'scrollTop'] = -c;
                        else {
                            if (!r.support.smoothScroll)
                                return (
                                    T({ swiper: r, targetPosition: -c, side: e ? 'left' : 'top' }),
                                    !0
                                );
                            o.scrollTo({ [e ? 'left' : 'top']: -c, behavior: 'smooth' });
                        }
                        return !0;
                    }
                    return (
                        0 === t
                            ? (r.setTransition(0),
                              r.setTranslate(c),
                              s && (r.emit('beforeTransitionStart', t, n), r.emit('transitionEnd')))
                            : (r.setTransition(t),
                              r.setTranslate(c),
                              s &&
                                  (r.emit('beforeTransitionStart', t, n),
                                  r.emit('transitionStart')),
                              r.animating ||
                                  ((r.animating = !0),
                                  r.onTranslateToWrapperTransitionEnd ||
                                      (r.onTranslateToWrapperTransitionEnd = function (e) {
                                          r &&
                                              !r.destroyed &&
                                              e.target === this &&
                                              (r.$wrapperEl[0].removeEventListener(
                                                  'transitionend',
                                                  r.onTranslateToWrapperTransitionEnd
                                              ),
                                              r.$wrapperEl[0].removeEventListener(
                                                  'webkitTransitionEnd',
                                                  r.onTranslateToWrapperTransitionEnd
                                              ),
                                              (r.onTranslateToWrapperTransitionEnd = null),
                                              delete r.onTranslateToWrapperTransitionEnd,
                                              s && r.emit('transitionEnd'));
                                      }),
                                  r.$wrapperEl[0].addEventListener(
                                      'transitionend',
                                      r.onTranslateToWrapperTransitionEnd
                                  ),
                                  r.$wrapperEl[0].addEventListener(
                                      'webkitTransitionEnd',
                                      r.onTranslateToWrapperTransitionEnd
                                  ))),
                        !0
                    );
                }
            },
            transition: {
                setTransition: function (e, t) {
                    const s = this;
                    s.params.cssMode || s.$wrapperEl.transition(e), s.emit('setTransition', e, t);
                },
                transitionStart: function (e = !0, t) {
                    const s = this,
                        { params: i } = s;
                    i.cssMode ||
                        (i.autoHeight && s.updateAutoHeight(),
                        M({ swiper: s, runCallbacks: e, direction: t, step: 'Start' }));
                },
                transitionEnd: function (e = !0, t) {
                    const s = this,
                        { params: i } = s;
                    (s.animating = !1),
                        i.cssMode ||
                            (s.setTransition(0),
                            M({ swiper: s, runCallbacks: e, direction: t, step: 'End' }));
                }
            },
            slide: L,
            loop: {
                loopCreate: function () {
                    const e = this,
                        t = i(),
                        { params: s, $wrapperEl: n } = e,
                        r = n.children().length > 0 ? h(n.children()[0].parentNode) : n;
                    r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
                    let a = r.children(`.${s.slideClass}`);
                    if (s.loopFillGroupWithBlank) {
                        const e = s.slidesPerGroup - (a.length % s.slidesPerGroup);
                        if (e !== s.slidesPerGroup) {
                            for (let i = 0; i < e; i += 1) {
                                const e = h(t.createElement('div')).addClass(
                                    `${s.slideClass} ${s.slideBlankClass}`
                                );
                                r.append(e);
                            }
                            a = r.children(`.${s.slideClass}`);
                        }
                    }
                    'auto' !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = a.length),
                        (e.loopedSlides = Math.ceil(
                            parseFloat(s.loopedSlides || s.slidesPerView, 10)
                        )),
                        (e.loopedSlides += s.loopAdditionalSlides),
                        e.loopedSlides > a.length &&
                            e.params.loopedSlidesLimit &&
                            (e.loopedSlides = a.length);
                    const o = [],
                        l = [];
                    a.each((e, t) => {
                        h(e).attr('data-swiper-slide-index', t);
                    });
                    for (let t = 0; t < e.loopedSlides; t += 1) {
                        const e = t - Math.floor(t / a.length) * a.length;
                        l.push(a.eq(e)[0]), o.unshift(a.eq(a.length - e - 1)[0]);
                    }
                    for (let e = 0; e < l.length; e += 1)
                        r.append(h(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
                    for (let e = o.length - 1; e >= 0; e -= 1)
                        r.prepend(h(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
                },
                loopFix: function () {
                    const e = this;
                    e.emit('beforeLoopFix');
                    const {
                        activeIndex: t,
                        slides: s,
                        loopedSlides: i,
                        allowSlidePrev: n,
                        allowSlideNext: r,
                        snapGrid: a,
                        rtlTranslate: o
                    } = e;
                    let l;
                    (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
                    const d = -a[t] - e.getTranslate();
                    t < i
                        ? ((l = s.length - 3 * i + t),
                          (l += i),
                          e.slideTo(l, 0, !1, !0) &&
                              0 !== d &&
                              e.setTranslate((o ? -e.translate : e.translate) - d))
                        : t >= s.length - i &&
                          ((l = -s.length + t + i),
                          (l += i),
                          e.slideTo(l, 0, !1, !0) &&
                              0 !== d &&
                              e.setTranslate((o ? -e.translate : e.translate) - d)),
                        (e.allowSlidePrev = n),
                        (e.allowSlideNext = r),
                        e.emit('loopFix');
                },
                loopDestroy: function () {
                    const { $wrapperEl: e, params: t, slides: s } = this;
                    e
                        .children(
                            `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
                        )
                        .remove(),
                        s.removeAttr('data-swiper-slide-index');
                }
            },
            grabCursor: {
                setGrabCursor: function (e) {
                    const t = this;
                    if (
                        t.support.touch ||
                        !t.params.simulateTouch ||
                        (t.params.watchOverflow && t.isLocked) ||
                        t.params.cssMode
                    )
                        return;
                    const s = 'container' === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                    (s.style.cursor = 'move'), (s.style.cursor = e ? 'grabbing' : 'grab');
                },
                unsetGrabCursor: function () {
                    const e = this;
                    e.support.touch ||
                        (e.params.watchOverflow && e.isLocked) ||
                        e.params.cssMode ||
                        (e[
                            'container' === e.params.touchEventsTarget ? 'el' : 'wrapperEl'
                        ].style.cursor = '');
                }
            },
            events: G,
            breakpoints: {
                setBreakpoint: function () {
                    const e = this,
                        {
                            activeIndex: t,
                            initialized: s,
                            loopedSlides: i = 0,
                            params: n,
                            $el: r
                        } = e,
                        a = n.breakpoints;
                    if (!a || (a && 0 === Object.keys(a).length)) return;
                    const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
                    if (!o || e.currentBreakpoint === o) return;
                    const l = (o in a ? a[o] : void 0) || e.originalParams,
                        d = N(e, n),
                        c = N(e, l),
                        p = n.enabled;
                    d && !c
                        ? (r.removeClass(
                              `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
                          ),
                          e.emitContainerClasses())
                        : !d &&
                          c &&
                          (r.addClass(`${n.containerModifierClass}grid`),
                          ((l.grid.fill && 'column' === l.grid.fill) ||
                              (!l.grid.fill && 'column' === n.grid.fill)) &&
                              r.addClass(`${n.containerModifierClass}grid-column`),
                          e.emitContainerClasses()),
                        ['navigation', 'pagination', 'scrollbar'].forEach(t => {
                            const s = n[t] && n[t].enabled,
                                i = l[t] && l[t].enabled;
                            s && !i && e[t].disable(), !s && i && e[t].enable();
                        });
                    const u = l.direction && l.direction !== n.direction,
                        h = n.loop && (l.slidesPerView !== n.slidesPerView || u);
                    u && s && e.changeDirection(), v(e.params, l);
                    const f = e.params.enabled;
                    Object.assign(e, {
                        allowTouchMove: e.params.allowTouchMove,
                        allowSlideNext: e.params.allowSlideNext,
                        allowSlidePrev: e.params.allowSlidePrev
                    }),
                        p && !f ? e.disable() : !p && f && e.enable(),
                        (e.currentBreakpoint = o),
                        e.emit('_beforeBreakpoint', l),
                        h &&
                            s &&
                            (e.loopDestroy(),
                            e.loopCreate(),
                            e.updateSlides(),
                            e.slideTo(t - i + e.loopedSlides, 0, !1)),
                        e.emit('breakpoint', l);
                },
                getBreakpoint: function (e, t = 'window', s) {
                    if (!e || ('container' === t && !s)) return;
                    let i = !1;
                    const n = r(),
                        a = 'window' === t ? n.innerHeight : s.clientHeight,
                        o = Object.keys(e).map(e => {
                            if ('string' == typeof e && 0 === e.indexOf('@')) {
                                const t = parseFloat(e.substr(1));
                                return { value: a * t, point: e };
                            }
                            return { value: e, point: e };
                        });
                    o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                    for (let e = 0; e < o.length; e += 1) {
                        const { point: r, value: a } = o[e];
                        'window' === t
                            ? n.matchMedia(`(min-width: ${a}px)`).matches && (i = r)
                            : a <= s.clientWidth && (i = r);
                    }
                    return i || 'max';
                }
            },
            checkOverflow: {
                checkOverflow: function () {
                    const e = this,
                        { isLocked: t, params: s } = e,
                        { slidesOffsetBefore: i } = s;
                    if (i) {
                        const t = e.slides.length - 1,
                            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                        e.isLocked = e.size > s;
                    } else e.isLocked = 1 === e.snapGrid.length;
                    !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                        !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                        t && t !== e.isLocked && (e.isEnd = !1),
                        t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock');
                }
            },
            classes: B,
            images: {
                loadImage: function (e, t, s, i, n, a) {
                    const o = r();
                    let l;
                    function d() {
                        a && a();
                    }
                    h(e).parent('picture')[0] || (e.complete && n)
                        ? d()
                        : t
                        ? ((l = new o.Image()),
                          (l.onload = d),
                          (l.onerror = d),
                          i && (l.sizes = i),
                          s && (l.srcset = s),
                          t && (l.src = t))
                        : d();
                },
                preloadImages: function () {
                    const e = this;
                    function t() {
                        null != e &&
                            e &&
                            !e.destroyed &&
                            (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                            e.imagesLoaded === e.imagesToLoad.length &&
                                (e.params.updateOnImagesReady && e.update(),
                                e.emit('imagesReady')));
                    }
                    e.imagesToLoad = e.$el.find('img');
                    for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                        const i = e.imagesToLoad[s];
                        e.loadImage(
                            i,
                            i.currentSrc || i.getAttribute('src'),
                            i.srcset || i.getAttribute('srcset'),
                            i.sizes || i.getAttribute('sizes'),
                            !0,
                            t
                        );
                    }
                }
            }
        },
        F = {};
    class W {
        constructor(...e) {
            let t, s;
            if (
                (1 === e.length &&
                e[0].constructor &&
                'Object' === Object.prototype.toString.call(e[0]).slice(8, -1)
                    ? (s = e[0])
                    : ([t, s] = e),
                s || (s = {}),
                (s = v({}, s)),
                t && !s.el && (s.el = t),
                s.el && h(s.el).length > 1)
            ) {
                const e = [];
                return (
                    h(s.el).each(t => {
                        const i = v({}, s, { el: t });
                        e.push(new W(i));
                    }),
                    e
                );
            }
            const i = this;
            (i.__swiper__ = !0),
                (i.support = E()),
                (i.device = (function (e = {}) {
                    return (
                        b ||
                            (b = (function ({ userAgent: e } = {}) {
                                const t = E(),
                                    s = r(),
                                    i = s.navigator.platform,
                                    n = e || s.navigator.userAgent,
                                    a = { ios: !1, android: !1 },
                                    o = s.screen.width,
                                    l = s.screen.height,
                                    d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
                                let c = n.match(/(iPad).*OS\s([\d_]+)/);
                                const p = n.match(/(iPod)(.*OS\s([\d_]+))?/),
                                    u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                                    h = 'Win32' === i;
                                let f = 'MacIntel' === i;
                                return (
                                    !c &&
                                        f &&
                                        t.touch &&
                                        [
                                            '1024x1366',
                                            '1366x1024',
                                            '834x1194',
                                            '1194x834',
                                            '834x1112',
                                            '1112x834',
                                            '768x1024',
                                            '1024x768',
                                            '820x1180',
                                            '1180x820',
                                            '810x1080',
                                            '1080x810'
                                        ].indexOf(`${o}x${l}`) >= 0 &&
                                        ((c = n.match(/(Version)\/([\d.]+)/)),
                                        c || (c = [0, 1, '13_0_0']),
                                        (f = !1)),
                                    d && !h && ((a.os = 'android'), (a.android = !0)),
                                    (c || u || p) && ((a.os = 'ios'), (a.ios = !0)),
                                    a
                                );
                            })(e)),
                        b
                    );
                })({ userAgent: s.userAgent })),
                (i.browser =
                    (C ||
                        (C = (function () {
                            const e = r();
                            return {
                                isSafari: (function () {
                                    const t = e.navigator.userAgent.toLowerCase();
                                    return (
                                        t.indexOf('safari') >= 0 &&
                                        t.indexOf('chrome') < 0 &&
                                        t.indexOf('android') < 0
                                    );
                                })(),
                                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                                    e.navigator.userAgent
                                )
                            };
                        })()),
                    C)),
                (i.eventsListeners = {}),
                (i.eventsAnyListeners = []),
                (i.modules = [...i.__modules__]),
                s.modules && Array.isArray(s.modules) && i.modules.push(...s.modules);
            const n = {};
            i.modules.forEach(e => {
                e({
                    swiper: i,
                    extendParams: H(s, n),
                    on: i.on.bind(i),
                    once: i.once.bind(i),
                    off: i.off.bind(i),
                    emit: i.emit.bind(i)
                });
            });
            const a = v({}, V, n);
            return (
                (i.params = v({}, a, F, s)),
                (i.originalParams = v({}, i.params)),
                (i.passedParams = v({}, s)),
                i.params &&
                    i.params.on &&
                    Object.keys(i.params.on).forEach(e => {
                        i.on(e, i.params.on[e]);
                    }),
                i.params && i.params.onAny && i.onAny(i.params.onAny),
                (i.$ = h),
                Object.assign(i, {
                    enabled: i.params.enabled,
                    el: t,
                    classNames: [],
                    slides: h(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: () => 'horizontal' === i.params.direction,
                    isVertical: () => 'vertical' === i.params.direction,
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: i.params.allowSlideNext,
                    allowSlidePrev: i.params.allowSlidePrev,
                    touchEvents: (function () {
                        const e = ['touchstart', 'touchmove', 'touchend', 'touchcancel'],
                            t = ['pointerdown', 'pointermove', 'pointerup'];
                        return (
                            (i.touchEventsTouch = {
                                start: e[0],
                                move: e[1],
                                end: e[2],
                                cancel: e[3]
                            }),
                            (i.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
                            i.support.touch || !i.params.simulateTouch
                                ? i.touchEventsTouch
                                : i.touchEventsDesktop
                        );
                    })(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: i.params.focusableElements,
                        lastClickTime: m(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: i.params.allowTouchMove,
                    touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }),
                i.emit('_swiper'),
                i.params.init && i.init(),
                i
            );
        }
        enable() {
            const e = this;
            e.enabled ||
                ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit('enable'));
        }
        disable() {
            const e = this;
            e.enabled &&
                ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit('disable'));
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const i = s.minTranslate(),
                n = (s.maxTranslate() - i) * e + i;
            s.translateTo(n, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className
                .split(' ')
                .filter(
                    t =>
                        0 === t.indexOf('swiper') ||
                        0 === t.indexOf(e.params.containerModifierClass)
                );
            e.emit('_containerClasses', t.join(' '));
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed
                ? ''
                : e.className
                      .split(' ')
                      .filter(
                          e =>
                              0 === e.indexOf('swiper-slide') ||
                              0 === e.indexOf(t.params.slideClass)
                      )
                      .join(' ');
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.each(s => {
                const i = e.getSlideClasses(s);
                t.push({ slideEl: s, classNames: i }), e.emit('_slideClass', s, i);
            }),
                e.emit('_slideClasses', t);
        }
        slidesPerViewDynamic(e = 'current', t = !1) {
            const {
                params: s,
                slides: i,
                slidesGrid: n,
                slidesSizesGrid: r,
                size: a,
                activeIndex: o
            } = this;
            let l = 1;
            if (s.centeredSlides) {
                let e,
                    t = i[o].swiperSlideSize;
                for (let s = o + 1; s < i.length; s += 1)
                    i[s] && !e && ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
                for (let s = o - 1; s >= 0; s -= 1)
                    i[s] && !e && ((t += i[s].swiperSlideSize), (l += 1), t > a && (e = !0));
            } else if ('current' === e)
                for (let e = o + 1; e < i.length; e += 1)
                    (t ? n[e] + r[e] - n[o] < a : n[e] - n[o] < a) && (l += 1);
            else for (let e = o - 1; e >= 0; e -= 1) n[o] - n[e] < a && (l += 1);
            return l;
        }
        update() {
            const e = this;
            if (!e || e.destroyed) return;
            const { snapGrid: t, params: s } = e;
            function i() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                    s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
            }
            let n;
            s.breakpoints && e.setBreakpoint(),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                e.params.freeMode && e.params.freeMode.enabled
                    ? (i(), e.params.autoHeight && e.updateAutoHeight())
                    : ((n =
                          ('auto' === e.params.slidesPerView || e.params.slidesPerView > 1) &&
                          e.isEnd &&
                          !e.params.centeredSlides
                              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                              : e.slideTo(e.activeIndex, 0, !1, !0)),
                      n || i()),
                s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                e.emit('update');
        }
        changeDirection(e, t = !0) {
            const s = this,
                i = s.params.direction;
            return (
                e || (e = 'horizontal' === i ? 'vertical' : 'horizontal'),
                e === i ||
                    ('horizontal' !== e && 'vertical' !== e) ||
                    (s.$el
                        .removeClass(`${s.params.containerModifierClass}${i}`)
                        .addClass(`${s.params.containerModifierClass}${e}`),
                    s.emitContainerClasses(),
                    (s.params.direction = e),
                    s.slides.each(t => {
                        'vertical' === e ? (t.style.width = '') : (t.style.height = '');
                    }),
                    s.emit('changeDirection'),
                    t && s.update()),
                s
            );
        }
        changeLanguageDirection(e) {
            const t = this;
            (t.rtl && 'rtl' === e) ||
                (!t.rtl && 'ltr' === e) ||
                ((t.rtl = 'rtl' === e),
                (t.rtlTranslate = 'horizontal' === t.params.direction && t.rtl),
                t.rtl
                    ? (t.$el.addClass(`${t.params.containerModifierClass}rtl`), (t.el.dir = 'rtl'))
                    : (t.$el.removeClass(`${t.params.containerModifierClass}rtl`),
                      (t.el.dir = 'ltr')),
                t.update());
        }
        mount(e) {
            const t = this;
            if (t.mounted) return !0;
            const s = h(e || t.params.el);
            if (!(e = s[0])) return !1;
            e.swiper = t;
            const n = () => `.${(t.params.wrapperClass || '').trim().split(' ').join('.')}`;
            let r = (() => {
                if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                    const t = h(e.shadowRoot.querySelector(n()));
                    return (t.children = e => s.children(e)), t;
                }
                return s.children ? s.children(n()) : h(s).children(n());
            })();
            if (0 === r.length && t.params.createElements) {
                const e = i().createElement('div');
                (r = h(e)),
                    (e.className = t.params.wrapperClass),
                    s.append(e),
                    s.children(`.${t.params.slideClass}`).each(e => {
                        r.append(e);
                    });
            }
            return (
                Object.assign(t, {
                    $el: s,
                    el: e,
                    $wrapperEl: r,
                    wrapperEl: r[0],
                    mounted: !0,
                    rtl: 'rtl' === e.dir.toLowerCase() || 'rtl' === s.css('direction'),
                    rtlTranslate:
                        'horizontal' === t.params.direction &&
                        ('rtl' === e.dir.toLowerCase() || 'rtl' === s.css('direction')),
                    wrongRTL: '-webkit-box' === r.css('display')
                }),
                !0
            );
        }
        init(e) {
            const t = this;
            return (
                t.initialized ||
                    !1 === t.mount(e) ||
                    (t.emit('beforeInit'),
                    t.params.breakpoints && t.setBreakpoint(),
                    t.addClasses(),
                    t.params.loop && t.loopCreate(),
                    t.updateSize(),
                    t.updateSlides(),
                    t.params.watchOverflow && t.checkOverflow(),
                    t.params.grabCursor && t.enabled && t.setGrabCursor(),
                    t.params.preloadImages && t.preloadImages(),
                    t.params.loop
                        ? t.slideTo(
                              t.params.initialSlide + t.loopedSlides,
                              0,
                              t.params.runCallbacksOnInit,
                              !1,
                              !0
                          )
                        : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
                    t.attachEvents(),
                    (t.initialized = !0),
                    t.emit('init'),
                    t.emit('afterInit')),
                t
            );
        }
        destroy(e = !0, t = !0) {
            const s = this,
                { params: i, $el: n, $wrapperEl: r, slides: a } = s;
            return (
                void 0 === s.params ||
                    s.destroyed ||
                    (s.emit('beforeDestroy'),
                    (s.initialized = !1),
                    s.detachEvents(),
                    i.loop && s.loopDestroy(),
                    t &&
                        (s.removeClasses(),
                        n.removeAttr('style'),
                        r.removeAttr('style'),
                        a &&
                            a.length &&
                            a
                                .removeClass(
                                    [
                                        i.slideVisibleClass,
                                        i.slideActiveClass,
                                        i.slideNextClass,
                                        i.slidePrevClass
                                    ].join(' ')
                                )
                                .removeAttr('style')
                                .removeAttr('data-swiper-slide-index')),
                    s.emit('destroy'),
                    Object.keys(s.eventsListeners).forEach(e => {
                        s.off(e);
                    }),
                    !1 !== e &&
                        ((s.$el[0].swiper = null),
                        (function (e) {
                            const t = e;
                            Object.keys(t).forEach(e => {
                                try {
                                    t[e] = null;
                                } catch (e) {}
                                try {
                                    delete t[e];
                                } catch (e) {}
                            });
                        })(s)),
                    (s.destroyed = !0)),
                null
            );
        }
        static extendDefaults(e) {
            v(F, e);
        }
        static get extendedDefaults() {
            return F;
        }
        static get defaults() {
            return V;
        }
        static installModule(e) {
            W.prototype.__modules__ || (W.prototype.__modules__ = []);
            const t = W.prototype.__modules__;
            'function' == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
            return Array.isArray(e)
                ? (e.forEach(e => W.installModule(e)), W)
                : (W.installModule(e), W);
        }
    }
    Object.keys(j).forEach(e => {
        Object.keys(j[e]).forEach(t => {
            W.prototype[t] = j[e][t];
        });
    }),
        W.use([
            function ({ swiper: e, on: t, emit: s }) {
                const i = r();
                let n = null,
                    a = null;
                const o = () => {
                        e && !e.destroyed && e.initialized && (s('beforeResize'), s('resize'));
                    },
                    l = () => {
                        e && !e.destroyed && e.initialized && s('orientationchange');
                    };
                t('init', () => {
                    e.params.resizeObserver && void 0 !== i.ResizeObserver
                        ? e &&
                          !e.destroyed &&
                          e.initialized &&
                          ((n = new ResizeObserver(t => {
                              a = i.requestAnimationFrame(() => {
                                  const { width: s, height: i } = e;
                                  let n = s,
                                      r = i;
                                  t.forEach(({ contentBoxSize: t, contentRect: s, target: i }) => {
                                      (i && i !== e.el) ||
                                          ((n = s ? s.width : (t[0] || t).inlineSize),
                                          (r = s ? s.height : (t[0] || t).blockSize));
                                  }),
                                      (n === s && r === i) || o();
                              });
                          })),
                          n.observe(e.el))
                        : (i.addEventListener('resize', o),
                          i.addEventListener('orientationchange', l));
                }),
                    t('destroy', () => {
                        a && i.cancelAnimationFrame(a),
                            n && n.unobserve && e.el && (n.unobserve(e.el), (n = null)),
                            i.removeEventListener('resize', o),
                            i.removeEventListener('orientationchange', l);
                    });
            },
            function ({ swiper: e, extendParams: t, on: s, emit: i }) {
                const n = [],
                    a = r(),
                    o = (e, t = {}) => {
                        const s = new (a.MutationObserver || a.WebkitMutationObserver)(e => {
                            if (1 === e.length) return void i('observerUpdate', e[0]);
                            const t = function () {
                                i('observerUpdate', e[0]);
                            };
                            a.requestAnimationFrame
                                ? a.requestAnimationFrame(t)
                                : a.setTimeout(t, 0);
                        });
                        s.observe(e, {
                            attributes: void 0 === t.attributes || t.attributes,
                            childList: void 0 === t.childList || t.childList,
                            characterData: void 0 === t.characterData || t.characterData
                        }),
                            n.push(s);
                    };
                t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
                    s('init', () => {
                        if (e.params.observer) {
                            if (e.params.observeParents) {
                                const t = e.$el.parents();
                                for (let e = 0; e < t.length; e += 1) o(t[e]);
                            }
                            o(e.$el[0], { childList: e.params.observeSlideChildren }),
                                o(e.$wrapperEl[0], { attributes: !1 });
                        }
                    }),
                    s('destroy', () => {
                        n.forEach(e => {
                            e.disconnect();
                        }),
                            n.splice(0, n.length);
                    });
            }
        ]);
    const q = W;
    window.addEventListener('DOMContentLoaded', () => {
        const e = document.querySelectorAll('.footer__arrow'),
            t = document.querySelectorAll('.footer__list'),
            s = document.querySelectorAll('.profile-info__timer-hours span'),
            i = document.querySelectorAll('.profile-info__timer-minutes span'),
            n = document.querySelectorAll('.profile-info__timer-seconds span'),
            r = document.querySelector('.burger'),
            a = document.querySelector('.sidemenu'),
            o = document.body,
            l = new Date('2023', '01', '27');
        new q('.swiper', {
            direction: 'horizontal',
            slidesPerView: 3,
            enabled: !1,
            spaceBetween: 35,
            breakpoints: {
                375: { slidesPerView: 1, enabled: !0 },
                426: { slidesPerView: 1, enabled: !0 },
                576: { slidesPerView: 1, enabled: !0 },
                769: { slidesPerView: 2, enabled: !0, grabCursor: !0 },
                1025: { slidesPerView: 2, enabled: !0, grabCursor: !0 },
                1436: { slidesPerView: 3, enabled: !1 }
            }
        }),
            r.addEventListener('click', () => {
                document.querySelector('.burger input').checked
                    ? (console.log('click add'),
                      r.classList.add('burger__active'),
                      a.classList.add('sidemenu__active'),
                      o.classList.add('lock'))
                    : (console.log('click delete'),
                      r.classList.remove('burger__active'),
                      a.classList.remove('sidemenu__active'),
                      o.classList.remove('lock'));
            });
        const d = setInterval(function () {
            const e = l - new Date();
            e <= 0 && clearInterval(d);
            const t = e > 0 ? Math.floor(e / 1e3 / 60 / 60) % 24 : 0,
                r = e > 0 ? Math.floor(e / 1e3 / 60) % 60 : 0,
                a = e > 0 ? Math.floor(e / 1e3) % 60 : 0;
            s.forEach(e => {
                e.textContent = t < 10 ? '0' + t : t;
            }),
                i.forEach(e => {
                    e.textContent = r < 10 ? '0' + r : r;
                }),
                n.forEach(e => {
                    e.textContent = a < 10 ? '0' + a : a;
                });
        }, 1e3);
        e.forEach((e, s) => {
            e.addEventListener('click', () => {
                e.classList.toggle('rotate'), t[s].classList.toggle('show');
            });
        });
    });
})();
//# sourceMappingURL=bundle.js.map
