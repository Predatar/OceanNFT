(() => {
    'use strict';
    function e(e) {
        return null !== e && 'object' == typeof e && 'constructor' in e && e.constructor === Object;
    }
    function t(s = {}, i = {}) {
        Object.keys(i).forEach(r => {
            void 0 === s[r]
                ? (s[r] = i[r])
                : e(i[r]) && e(s[r]) && Object.keys(i[r]).length > 0 && t(s[r], i[r]);
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
    const r = {
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
    function n() {
        const e = 'undefined' != typeof window ? window : {};
        return t(e, r), e;
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
        const s = n(),
            r = i();
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
                const t = r.createElement(e);
                t.innerHTML = s;
                for (let e = 0; e < t.childNodes.length; e += 1) o.push(t.childNodes[e]);
            } else
                o = (function (e, t) {
                    if ('string' != typeof e) return [e];
                    const s = [],
                        i = t.querySelectorAll(e);
                    for (let e = 0; e < i.length; e += 1) s.push(i[e]);
                    return s;
                })(e.trim(), t || r);
        } else if (e.nodeType || e === s || e === r) o.push(e);
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
            let [t, s, i, r] = e;
            function n(e) {
                const t = e.target;
                if (!t) return;
                const r = e.target.dom7EventData || [];
                if ((r.indexOf(e) < 0 && r.unshift(e), d(t).is(s))) i.apply(t, r);
                else {
                    const e = d(t).parents();
                    for (let t = 0; t < e.length; t += 1) d(e[t]).is(s) && i.apply(e[t], r);
                }
            }
            function a(e) {
                const t = (e && e.target && e.target.dom7EventData) || [];
                t.indexOf(e) < 0 && t.unshift(e), i.apply(this, t);
            }
            'function' == typeof e[1] && (([t, i, r] = e), (s = void 0)), r || (r = !1);
            const o = t.split(' ');
            let l;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (s)
                    for (l = 0; l < o.length; l += 1) {
                        const e = o[l];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                            t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                            t.dom7LiveListeners[e].push({ listener: i, proxyListener: n }),
                            t.addEventListener(e, n, r);
                    }
                else
                    for (l = 0; l < o.length; l += 1) {
                        const e = o[l];
                        t.dom7Listeners || (t.dom7Listeners = {}),
                            t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                            t.dom7Listeners[e].push({ listener: i, proxyListener: a }),
                            t.addEventListener(e, a, r);
                    }
            }
            return this;
        },
        off: function (...e) {
            let [t, s, i, r] = e;
            'function' == typeof e[1] && (([t, i, r] = e), (s = void 0)), r || (r = !1);
            const n = t.split(' ');
            for (let e = 0; e < n.length; e += 1) {
                const t = n[e];
                for (let e = 0; e < this.length; e += 1) {
                    const n = this[e];
                    let a;
                    if (
                        (!s && n.dom7Listeners
                            ? (a = n.dom7Listeners[t])
                            : s && n.dom7LiveListeners && (a = n.dom7LiveListeners[t]),
                        a && a.length)
                    )
                        for (let e = a.length - 1; e >= 0; e -= 1) {
                            const s = a[e];
                            (i && s.listener === i) ||
                            (i && s.listener && s.listener.dom7proxy && s.listener.dom7proxy === i)
                                ? (n.removeEventListener(t, s.proxyListener, r), a.splice(e, 1))
                                : i ||
                                  (n.removeEventListener(t, s.proxyListener, r), a.splice(e, 1));
                        }
                }
            }
            return this;
        },
        trigger: function (...e) {
            const t = n(),
                s = e[0].split(' '),
                i = e[1];
            for (let r = 0; r < s.length; r += 1) {
                const n = s[r];
                for (let s = 0; s < this.length; s += 1) {
                    const r = this[s];
                    if (t.CustomEvent) {
                        const s = new t.CustomEvent(n, { detail: i, bubbles: !0, cancelable: !0 });
                        (r.dom7EventData = e.filter((e, t) => t > 0)),
                            r.dispatchEvent(s),
                            (r.dom7EventData = []),
                            delete r.dom7EventData;
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
            const e = n();
            return this[0] ? e.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
            if (this.length > 0) {
                const e = n(),
                    t = i(),
                    s = this[0],
                    r = s.getBoundingClientRect(),
                    a = t.body,
                    o = s.clientTop || a.clientTop || 0,
                    l = s.clientLeft || a.clientLeft || 0,
                    d = s === e ? e.scrollY : s.scrollTop,
                    c = s === e ? e.scrollX : s.scrollLeft;
                return { top: r.top + d - o, left: r.left + c - l };
            }
            return null;
        },
        css: function (e, t) {
            const s = n();
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
            const t = n(),
                s = i(),
                r = this[0];
            let o, l;
            if (!r || void 0 === e) return !1;
            if ('string' == typeof e) {
                if (r.matches) return r.matches(e);
                if (r.webkitMatchesSelector) return r.webkitMatchesSelector(e);
                if (r.msMatchesSelector) return r.msMatchesSelector(e);
                for (o = d(e), l = 0; l < o.length; l += 1) if (o[l] === r) return !0;
                return !1;
            }
            if (e === s) return r === s;
            if (e === t) return r === t;
            if (e.nodeType || e instanceof a) {
                for (o = e.nodeType ? [e] : e, l = 0; l < o.length; l += 1)
                    if (o[l] === r) return !0;
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
            let s, r;
            for (s = 0; s < this.length; s += 1)
                if ('string' == typeof e) {
                    const i = t.createElement('div');
                    for (i.innerHTML = e, r = i.childNodes.length - 1; r >= 0; r -= 1)
                        this[s].insertBefore(i.childNodes[r], this[s].childNodes[0]);
                } else if (e instanceof a)
                    for (r = 0; r < e.length; r += 1)
                        this[s].insertBefore(e[r], this[s].childNodes[0]);
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
        for (let r = 1; r < e.length; r += 1) {
            const n = e[r];
            if (
                null != n &&
                ((i = n),
                !('undefined' != typeof window && void 0 !== window.HTMLElement
                    ? i instanceof HTMLElement
                    : i && (1 === i.nodeType || 11 === i.nodeType)))
            ) {
                const e = Object.keys(Object(n)).filter(e => s.indexOf(e) < 0);
                for (let s = 0, i = e.length; s < i; s += 1) {
                    const i = e[s],
                        r = Object.getOwnPropertyDescriptor(n, i);
                    void 0 !== r &&
                        r.enumerable &&
                        (g(t[i]) && g(n[i])
                            ? n[i].__swiper__
                                ? (t[i] = n[i])
                                : v(t[i], n[i])
                            : !g(t[i]) && g(n[i])
                            ? ((t[i] = {}), n[i].__swiper__ ? (t[i] = n[i]) : v(t[i], n[i]))
                            : (t[i] = n[i]));
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
        const i = n(),
            r = -e.translate;
        let a,
            o = null;
        const l = e.params.speed;
        (e.wrapperEl.style.scrollSnapType = 'none'), i.cancelAnimationFrame(e.cssModeFrameID);
        const d = t > r ? 'next' : 'prev',
            c = (e, t) => ('next' === d && e >= t) || ('prev' === d && e <= t),
            p = () => {
                (a = new Date().getTime()), null === o && (o = a);
                const n = Math.max(Math.min((a - o) / l, 1), 0),
                    d = 0.5 - Math.cos(n * Math.PI) / 2;
                let u = r + d * (t - r);
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
                    const e = n(),
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
    const y = {
            on(e, t, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ('function' != typeof t) return i;
                const r = s ? 'unshift' : 'push';
                return (
                    e.split(' ').forEach(e => {
                        i.eventsListeners[e] || (i.eventsListeners[e] = []),
                            i.eventsListeners[e][r](t);
                    }),
                    i
                );
            },
            once(e, t, s) {
                const i = this;
                if (!i.eventsListeners || i.destroyed) return i;
                if ('function' != typeof t) return i;
                function r(...s) {
                    i.off(e, r), r.__emitterProxy && delete r.__emitterProxy, t.apply(i, s);
                }
                return (r.__emitterProxy = t), i.on(e, r, s);
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
                                s.eventsListeners[e].forEach((i, r) => {
                                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                                        s.eventsListeners[e].splice(r, 1);
                                });
                      }),
                      s)
                    : s;
            },
            emit(...e) {
                const t = this;
                if (!t.eventsListeners || t.destroyed) return t;
                if (!t.eventsListeners) return t;
                let s, i, r;
                return (
                    'string' == typeof e[0] || Array.isArray(e[0])
                        ? ((s = e[0]), (i = e.slice(1, e.length)), (r = t))
                        : ((s = e[0].events), (i = e[0].data), (r = e[0].context || t)),
                    i.unshift(r),
                    (Array.isArray(s) ? s : s.split(' ')).forEach(e => {
                        t.eventsAnyListeners &&
                            t.eventsAnyListeners.length &&
                            t.eventsAnyListeners.forEach(t => {
                                t.apply(r, [e, ...i]);
                            }),
                            t.eventsListeners &&
                                t.eventsListeners[e] &&
                                t.eventsListeners[e].forEach(e => {
                                    e.apply(r, i);
                                });
                    }),
                    t
                );
            }
        },
        x = {
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
                    { $wrapperEl: r, size: n, rtlTranslate: a, wrongRTL: o } = e,
                    l = e.virtual && i.virtual.enabled,
                    d = l ? e.virtual.slides.length : e.slides.length,
                    c = r.children(`.${e.params.slideClass}`),
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
                if (void 0 === n) return;
                'string' == typeof S &&
                    S.indexOf('%') >= 0 &&
                    (S = (parseFloat(S.replace('%', '')) / 100) * n),
                    (e.virtualSize = -S),
                    a
                        ? c.css({ marginLeft: '', marginBottom: '', marginTop: '' })
                        : c.css({ marginRight: '', marginBottom: '', marginTop: '' }),
                    i.centeredSlides &&
                        i.cssMode &&
                        (w(e.wrapperEl, '--swiper-centered-offset-before', ''),
                        w(e.wrapperEl, '--swiper-centered-offset-after', ''));
                const y = i.grid && i.grid.rows > 1 && e.grid;
                let x;
                y && e.grid.initSlides(p);
                const M =
                    'auto' === i.slidesPerView &&
                    i.breakpoints &&
                    Object.keys(i.breakpoints).filter(
                        e => void 0 !== i.breakpoints[e].slidesPerView
                    ).length > 0;
                for (let r = 0; r < p; r += 1) {
                    x = 0;
                    const a = c.eq(r);
                    if ((y && e.grid.updateSlide(r, a, p, t), 'none' !== a.css('display'))) {
                        if ('auto' === i.slidesPerView) {
                            M && (c[r].style[t('width')] = '');
                            const n = getComputedStyle(a[0]),
                                o = a[0].style.transform,
                                l = a[0].style.webkitTransform;
                            if (
                                (o && (a[0].style.transform = 'none'),
                                l && (a[0].style.webkitTransform = 'none'),
                                i.roundLengths)
                            )
                                x = e.isHorizontal() ? a.outerWidth(!0) : a.outerHeight(!0);
                            else {
                                const e = s(n, 'width'),
                                    t = s(n, 'padding-left'),
                                    i = s(n, 'padding-right'),
                                    r = s(n, 'margin-left'),
                                    o = s(n, 'margin-right'),
                                    l = n.getPropertyValue('box-sizing');
                                if (l && 'border-box' === l) x = e + r + o;
                                else {
                                    const { clientWidth: s, offsetWidth: n } = a[0];
                                    x = e + t + i + r + o + (n - s);
                                }
                            }
                            o && (a[0].style.transform = o),
                                l && (a[0].style.webkitTransform = l),
                                i.roundLengths && (x = Math.floor(x));
                        } else
                            (x = (n - (i.slidesPerView - 1) * S) / i.slidesPerView),
                                i.roundLengths && (x = Math.floor(x)),
                                c[r] && (c[r].style[t('width')] = `${x}px`);
                        c[r] && (c[r].swiperSlideSize = x),
                            f.push(x),
                            i.centeredSlides
                                ? ((b = b + x / 2 + C / 2 + S),
                                  0 === C && 0 !== r && (b = b - n / 2 - S),
                                  0 === r && (b = b - n / 2 - S),
                                  Math.abs(b) < 0.001 && (b = 0),
                                  i.roundLengths && (b = Math.floor(b)),
                                  E % i.slidesPerGroup == 0 && u.push(b),
                                  h.push(b))
                                : (i.roundLengths && (b = Math.floor(b)),
                                  (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                                      e.params.slidesPerGroup ==
                                      0 && u.push(b),
                                  h.push(b),
                                  (b = b + x + S)),
                            (e.virtualSize += x + S),
                            (C = x),
                            (E += 1);
                    }
                }
                if (
                    ((e.virtualSize = Math.max(e.virtualSize, n) + g),
                    a &&
                        o &&
                        ('slide' === i.effect || 'coverflow' === i.effect) &&
                        r.css({ width: `${e.virtualSize + i.spaceBetween}px` }),
                    i.setWrapperSize &&
                        r.css({ [t('width')]: `${e.virtualSize + i.spaceBetween}px` }),
                    y && e.grid.updateWrapperSize(x, u, t),
                    !i.centeredSlides)
                ) {
                    const t = [];
                    for (let s = 0; s < u.length; s += 1) {
                        let r = u[s];
                        i.roundLengths && (r = Math.floor(r)),
                            u[s] <= e.virtualSize - n && t.push(r);
                    }
                    (u = t),
                        Math.floor(e.virtualSize - n) - Math.floor(u[u.length - 1]) > 1 &&
                            u.push(e.virtualSize - n);
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
                    const t = e - n;
                    u = u.map(e => (e < 0 ? -m : e > t ? t + g : e));
                }
                if (i.centerInsufficientSlides) {
                    let e = 0;
                    if (
                        (f.forEach(t => {
                            e += t + (i.spaceBetween ? i.spaceBetween : 0);
                        }),
                        (e -= i.spaceBetween),
                        e < n)
                    ) {
                        const t = (n - e) / 2;
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
                let r,
                    n = 0;
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
                        for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
                            const e = t.activeIndex + r;
                            if (e > t.slides.length && !i) break;
                            s.push(a(e));
                        }
                else s.push(a(t.activeIndex));
                for (r = 0; r < s.length; r += 1)
                    if (void 0 !== s[r]) {
                        const e = s[r].offsetHeight;
                        n = e > n ? e : n;
                    }
                (n || 0 === n) && t.$wrapperEl.css('height', `${n}px`);
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
                    { slides: i, rtlTranslate: r, snapGrid: n } = t;
                if (0 === i.length) return;
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                let a = -e;
                r && (a = e),
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
                            (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - l) /
                            (o.swiperSlideSize + s.spaceBetween),
                        p = -(a - l),
                        u = p + t.slidesSizesGrid[e];
                    ((p >= 0 && p < t.size - 1) ||
                        (u > 1 && u <= t.size) ||
                        (p <= 0 && u >= t.size)) &&
                        (t.visibleSlides.push(o),
                        t.visibleSlidesIndexes.push(e),
                        i.eq(e).addClass(s.slideVisibleClass)),
                        (o.progress = r ? -d : d),
                        (o.originalProgress = r ? -c : c);
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
                let { progress: r, isBeginning: n, isEnd: a } = t;
                const o = n,
                    l = a;
                0 === i
                    ? ((r = 0), (n = !0), (a = !0))
                    : ((r = (e - t.minTranslate()) / i), (n = r <= 0), (a = r >= 1)),
                    Object.assign(t, { progress: r, isBeginning: n, isEnd: a }),
                    (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
                        t.updateSlidesProgress(e),
                    n && !o && t.emit('reachBeginning toEdge'),
                    a && !l && t.emit('reachEnd toEdge'),
                    ((o && !n) || (l && !a)) && t.emit('fromEdge'),
                    t.emit('progress', r);
            },
            updateSlidesClasses: function () {
                const e = this,
                    { slides: t, params: s, $wrapperEl: i, activeIndex: r, realIndex: n } = e,
                    a = e.virtual && s.virtual.enabled;
                let o;
                t.removeClass(
                    `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
                ),
                    (o = a
                        ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${r}"]`)
                        : t.eq(r)),
                    o.addClass(s.slideActiveClass),
                    s.loop &&
                        (o.hasClass(s.slideDuplicateClass)
                            ? i
                                  .children(
                                      `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${n}"]`
                                  )
                                  .addClass(s.slideDuplicateActiveClass)
                            : i
                                  .children(
                                      `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${n}"]`
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
                        snapGrid: r,
                        params: n,
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
                    n.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
                }
                if (r.indexOf(s) >= 0) d = r.indexOf(s);
                else {
                    const e = Math.min(n.slidesPerGroupSkip, c);
                    d = e + Math.floor((c - e) / n.slidesPerGroup);
                }
                if ((d >= r.length && (d = r.length - 1), c === a))
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
                let r,
                    n = !1;
                if (i)
                    for (let e = 0; e < t.slides.length; e += 1)
                        if (t.slides[e] === i) {
                            (n = !0), (r = e);
                            break;
                        }
                if (!i || !n) return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
                (t.clickedSlide = i),
                    t.virtual && t.params.virtual.enabled
                        ? (t.clickedIndex = parseInt(h(i).attr('data-swiper-slide-index'), 10))
                        : (t.clickedIndex = r),
                    s.slideToClickedSlide &&
                        void 0 !== t.clickedIndex &&
                        t.clickedIndex !== t.activeIndex &&
                        t.slideToClickedSlide();
            }
        };
    function M({ swiper: e, runCallbacks: t, direction: s, step: i }) {
        const { activeIndex: r, previousIndex: n } = e;
        let a = s;
        if (
            (a || (a = r > n ? 'next' : r < n ? 'prev' : 'reset'),
            e.emit(`transition${i}`),
            t && r !== n)
        ) {
            if ('reset' === a) return void e.emit(`slideResetTransition${i}`);
            e.emit(`slideChangeTransition${i}`),
                'next' === a
                    ? e.emit(`slideNextTransition${i}`)
                    : e.emit(`slidePrevTransition${i}`);
        }
    }
    const L = {
        slideTo: function (e = 0, t = this.params.speed, s = !0, i, r) {
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
            const n = this;
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
            } = n;
            if ((n.animating && o.preventInteractionOnTransition) || (!f && !i && !r)) return !1;
            const m = Math.min(n.params.slidesPerGroupSkip, a);
            let g = m + Math.floor((a - m) / n.params.slidesPerGroup);
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
            if (n.initialized && a !== p) {
                if (!n.allowSlideNext && v < n.translate && v < n.minTranslate()) return !1;
                if (!n.allowSlidePrev && v > n.translate && v > n.maxTranslate() && (p || 0) !== a)
                    return !1;
            }
            let w;
            if (
                (a !== (c || 0) && s && n.emit('beforeSlideChangeStart'),
                n.updateProgress(v),
                (w = a > p ? 'next' : a < p ? 'prev' : 'reset'),
                (u && -v === n.translate) || (!u && v === n.translate))
            )
                return (
                    n.updateActiveIndex(a),
                    o.autoHeight && n.updateAutoHeight(),
                    n.updateSlidesClasses(),
                    'slide' !== o.effect && n.setTranslate(v),
                    'reset' !== w && (n.transitionStart(s, w), n.transitionEnd(s, w)),
                    !1
                );
            if (o.cssMode) {
                const e = n.isHorizontal(),
                    s = u ? v : -v;
                if (0 === t) {
                    const t = n.virtual && n.params.virtual.enabled;
                    t && ((n.wrapperEl.style.scrollSnapType = 'none'), (n._immediateVirtual = !0)),
                        (h[e ? 'scrollLeft' : 'scrollTop'] = s),
                        t &&
                            requestAnimationFrame(() => {
                                (n.wrapperEl.style.scrollSnapType = ''),
                                    (n._swiperImmediateVirtual = !1);
                            });
                } else {
                    if (!n.support.smoothScroll)
                        return T({ swiper: n, targetPosition: s, side: e ? 'left' : 'top' }), !0;
                    h.scrollTo({ [e ? 'left' : 'top']: s, behavior: 'smooth' });
                }
                return !0;
            }
            return (
                n.setTransition(t),
                n.setTranslate(v),
                n.updateActiveIndex(a),
                n.updateSlidesClasses(),
                n.emit('beforeTransitionStart', t, i),
                n.transitionStart(s, w),
                0 === t
                    ? n.transitionEnd(s, w)
                    : n.animating ||
                      ((n.animating = !0),
                      n.onSlideToWrapperTransitionEnd ||
                          (n.onSlideToWrapperTransitionEnd = function (e) {
                              n &&
                                  !n.destroyed &&
                                  e.target === this &&
                                  (n.$wrapperEl[0].removeEventListener(
                                      'transitionend',
                                      n.onSlideToWrapperTransitionEnd
                                  ),
                                  n.$wrapperEl[0].removeEventListener(
                                      'webkitTransitionEnd',
                                      n.onSlideToWrapperTransitionEnd
                                  ),
                                  (n.onSlideToWrapperTransitionEnd = null),
                                  delete n.onSlideToWrapperTransitionEnd,
                                  n.transitionEnd(s, w));
                          }),
                      n.$wrapperEl[0].addEventListener(
                          'transitionend',
                          n.onSlideToWrapperTransitionEnd
                      ),
                      n.$wrapperEl[0].addEventListener(
                          'webkitTransitionEnd',
                          n.onSlideToWrapperTransitionEnd
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
            const r = this;
            let n = e;
            return r.params.loop && (n += r.loopedSlides), r.slideTo(n, t, s, i);
        },
        slideNext: function (e = this.params.speed, t = !0, s) {
            const i = this,
                { animating: r, enabled: n, params: a } = i;
            if (!n) return i;
            let o = a.slidesPerGroup;
            'auto' === a.slidesPerView &&
                1 === a.slidesPerGroup &&
                a.slidesPerGroupAuto &&
                (o = Math.max(i.slidesPerViewDynamic('current', !0), 1));
            const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o;
            if (a.loop) {
                if (r && a.loopPreventsSlide) return !1;
                i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
            }
            return a.rewind && i.isEnd
                ? i.slideTo(0, e, t, s)
                : i.slideTo(i.activeIndex + l, e, t, s);
        },
        slidePrev: function (e = this.params.speed, t = !0, s) {
            const i = this,
                {
                    params: r,
                    animating: n,
                    snapGrid: a,
                    slidesGrid: o,
                    rtlTranslate: l,
                    enabled: d
                } = i;
            if (!d) return i;
            if (r.loop) {
                if (n && r.loopPreventsSlide) return !1;
                i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
            }
            function c(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            const p = c(l ? i.translate : -i.translate),
                u = a.map(e => c(e));
            let h = a[u.indexOf(p) - 1];
            if (void 0 === h && r.cssMode) {
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
                    'auto' === r.slidesPerView &&
                        1 === r.slidesPerGroup &&
                        r.slidesPerGroupAuto &&
                        ((f = f - i.slidesPerViewDynamic('previous', !0) + 1),
                        (f = Math.max(f, 0)))),
                r.rewind && i.isBeginning)
            ) {
                const r =
                    i.params.virtual && i.params.virtual.enabled && i.virtual
                        ? i.virtual.slides.length - 1
                        : i.slides.length - 1;
                return i.slideTo(r, e, t, s);
            }
            return i.slideTo(f, e, t, s);
        },
        slideReset: function (e = this.params.speed, t = !0, s) {
            return this.slideTo(this.activeIndex, e, t, s);
        },
        slideToClosest: function (e = this.params.speed, t = !0, s, i = 0.5) {
            const r = this;
            let n = r.activeIndex;
            const a = Math.min(r.params.slidesPerGroupSkip, n),
                o = a + Math.floor((n - a) / r.params.slidesPerGroup),
                l = r.rtlTranslate ? r.translate : -r.translate;
            if (l >= r.snapGrid[o]) {
                const e = r.snapGrid[o];
                l - e > (r.snapGrid[o + 1] - e) * i && (n += r.params.slidesPerGroup);
            } else {
                const e = r.snapGrid[o - 1];
                l - e <= (r.snapGrid[o] - e) * i && (n -= r.params.slidesPerGroup);
            }
            return (
                (n = Math.max(n, 0)),
                (n = Math.min(n, r.slidesGrid.length - 1)),
                r.slideTo(n, e, t, s)
            );
        },
        slideToClickedSlide: function () {
            const e = this,
                { params: t, $wrapperEl: s } = e,
                i = 'auto' === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let r,
                n = e.clickedIndex;
            if (t.loop) {
                if (e.animating) return;
                (r = parseInt(h(e.clickedSlide).attr('data-swiper-slide-index'), 10)),
                    t.centeredSlides
                        ? n < e.loopedSlides - i / 2 || n > e.slides.length - e.loopedSlides + i / 2
                            ? (e.loopFix(),
                              (n = s
                                  .children(
                                      `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                                  )
                                  .eq(0)
                                  .index()),
                              f(() => {
                                  e.slideTo(n);
                              }))
                            : e.slideTo(n)
                        : n > e.slides.length - i
                        ? (e.loopFix(),
                          (n = s
                              .children(
                                  `.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`
                              )
                              .eq(0)
                              .index()),
                          f(() => {
                              e.slideTo(n);
                          }))
                        : e.slideTo(n);
            } else e.slideTo(n);
        }
    };
    function P(e) {
        const t = this,
            s = i(),
            r = n(),
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
                          if (!s || s === i() || s === n()) return null;
                          s.assignedSlot && (s = s.assignedSlot);
                          const r = s.closest(e);
                          return r || s.getRootNode ? r || t(s.getRootNode().host) : null;
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
        if (S && (w <= b || w >= r.innerWidth - b)) {
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
            r = s.touchEventsData,
            { params: n, touches: a, rtlTranslate: o, enabled: l } = s;
        if (!l) return;
        let d = e;
        if ((d.originalEvent && (d = d.originalEvent), !r.isTouched))
            return void (r.startMoving && r.isScrolling && s.emit('touchMoveOpposite', d));
        if (r.isTouchEvent && 'touchmove' !== d.type) return;
        const c =
                'touchmove' === d.type &&
                d.targetTouches &&
                (d.targetTouches[0] || d.changedTouches[0]),
            p = 'touchmove' === d.type ? c.pageX : d.pageX,
            u = 'touchmove' === d.type ? c.pageY : d.pageY;
        if (d.preventedByNestedSwiper) return (a.startX = p), void (a.startY = u);
        if (!s.allowTouchMove)
            return (
                h(d.target).is(r.focusableElements) || (s.allowClick = !1),
                void (
                    r.isTouched &&
                    (Object.assign(a, { startX: p, startY: u, currentX: p, currentY: u }),
                    (r.touchStartTime = m()))
                )
            );
        if (r.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
            if (s.isVertical()) {
                if (
                    (u < a.startY && s.translate <= s.maxTranslate()) ||
                    (u > a.startY && s.translate >= s.minTranslate())
                )
                    return (r.isTouched = !1), void (r.isMoved = !1);
            } else if (
                (p < a.startX && s.translate <= s.maxTranslate()) ||
                (p > a.startX && s.translate >= s.minTranslate())
            )
                return;
        if (
            r.isTouchEvent &&
            t.activeElement &&
            d.target === t.activeElement &&
            h(d.target).is(r.focusableElements)
        )
            return (r.isMoved = !0), void (s.allowClick = !1);
        if (
            (r.allowTouchCallbacks && s.emit('touchMove', d),
            d.targetTouches && d.targetTouches.length > 1)
        )
            return;
        (a.currentX = p), (a.currentY = u);
        const f = a.currentX - a.startX,
            g = a.currentY - a.startY;
        if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold) return;
        if (void 0 === r.isScrolling) {
            let e;
            (s.isHorizontal() && a.currentY === a.startY) ||
            (s.isVertical() && a.currentX === a.startX)
                ? (r.isScrolling = !1)
                : f * f + g * g >= 25 &&
                  ((e = (180 * Math.atan2(Math.abs(g), Math.abs(f))) / Math.PI),
                  (r.isScrolling = s.isHorizontal() ? e > n.touchAngle : 90 - e > n.touchAngle));
        }
        if (
            (r.isScrolling && s.emit('touchMoveOpposite', d),
            void 0 === r.startMoving &&
                ((a.currentX === a.startX && a.currentY === a.startY) || (r.startMoving = !0)),
            r.isScrolling)
        )
            return void (r.isTouched = !1);
        if (!r.startMoving) return;
        (s.allowClick = !1),
            !n.cssMode && d.cancelable && d.preventDefault(),
            n.touchMoveStopPropagation && !n.nested && d.stopPropagation(),
            r.isMoved ||
                (n.loop && !n.cssMode && s.loopFix(),
                (r.startTranslate = s.getTranslate()),
                s.setTransition(0),
                s.animating && s.$wrapperEl.trigger('webkitTransitionEnd transitionend'),
                (r.allowMomentumBounce = !1),
                !n.grabCursor ||
                    (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
                    s.setGrabCursor(!0),
                s.emit('sliderFirstMove', d)),
            s.emit('sliderMove', d),
            (r.isMoved = !0);
        let v = s.isHorizontal() ? f : g;
        (a.diff = v),
            (v *= n.touchRatio),
            o && (v = -v),
            (s.swipeDirection = v > 0 ? 'prev' : 'next'),
            (r.currentTranslate = v + r.startTranslate);
        let w = !0,
            T = n.resistanceRatio;
        if (
            (n.touchReleaseOnEdges && (T = 0),
            v > 0 && r.currentTranslate > s.minTranslate()
                ? ((w = !1),
                  n.resistance &&
                      (r.currentTranslate =
                          s.minTranslate() - 1 + (-s.minTranslate() + r.startTranslate + v) ** T))
                : v < 0 &&
                  r.currentTranslate < s.maxTranslate() &&
                  ((w = !1),
                  n.resistance &&
                      (r.currentTranslate =
                          s.maxTranslate() + 1 - (s.maxTranslate() - r.startTranslate - v) ** T)),
            w && (d.preventedByNestedSwiper = !0),
            !s.allowSlideNext &&
                'next' === s.swipeDirection &&
                r.currentTranslate < r.startTranslate &&
                (r.currentTranslate = r.startTranslate),
            !s.allowSlidePrev &&
                'prev' === s.swipeDirection &&
                r.currentTranslate > r.startTranslate &&
                (r.currentTranslate = r.startTranslate),
            s.allowSlidePrev || s.allowSlideNext || (r.currentTranslate = r.startTranslate),
            n.threshold > 0)
        ) {
            if (!(Math.abs(v) > n.threshold || r.allowThresholdMove))
                return void (r.currentTranslate = r.startTranslate);
            if (!r.allowThresholdMove)
                return (
                    (r.allowThresholdMove = !0),
                    (a.startX = a.currentX),
                    (a.startY = a.currentY),
                    (r.currentTranslate = r.startTranslate),
                    void (a.diff = s.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
                );
        }
        n.followFinger &&
            !n.cssMode &&
            (((n.freeMode && n.freeMode.enabled && s.freeMode) || n.watchSlidesProgress) &&
                (s.updateActiveIndex(), s.updateSlidesClasses()),
            s.params.freeMode && n.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
            s.updateProgress(r.currentTranslate),
            s.setTranslate(r.currentTranslate));
    }
    function O(e) {
        const t = this,
            s = t.touchEventsData,
            { params: i, touches: r, rtlTranslate: n, slidesGrid: a, enabled: o } = t;
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
                0 === r.diff ||
                s.currentTranslate === s.startTranslate)
        )
            return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
        let p;
        if (
            ((s.isTouched = !1),
            (s.isMoved = !1),
            (s.startMoving = !1),
            (p = i.followFinger ? (n ? t.translate : -t.translate) : -s.currentTranslate),
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
        const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e;
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
            (e.allowSlidePrev = r),
            (e.allowSlideNext = i),
            e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
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
    function _() {
        const e = this,
            { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
        if (!i) return;
        let r;
        (e.previousTranslate = e.translate),
            e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop),
            0 === e.translate && (e.translate = 0),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        const n = e.maxTranslate() - e.minTranslate();
        (r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
            r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
            e.emit('setTranslate', e.translate, !1);
    }
    let z = !1;
    function I() {}
    const D = (e, t) => {
            const s = i(),
                { params: r, touchEvents: n, el: a, wrapperEl: o, device: l, support: d } = e,
                c = !!r.nested,
                p = 'on' === t ? 'addEventListener' : 'removeEventListener',
                u = t;
            if (d.touch) {
                const t = !(
                    'touchstart' !== n.start ||
                    !d.passiveListener ||
                    !r.passiveListeners
                ) && { passive: !0, capture: !1 };
                a[p](n.start, e.onTouchStart, t),
                    a[p](
                        n.move,
                        e.onTouchMove,
                        d.passiveListener ? { passive: !1, capture: c } : c
                    ),
                    a[p](n.end, e.onTouchEnd, t),
                    n.cancel && a[p](n.cancel, e.onTouchEnd, t);
            } else
                a[p](n.start, e.onTouchStart, !1),
                    s[p](n.move, e.onTouchMove, c),
                    s[p](n.end, e.onTouchEnd, !1);
            (r.preventClicks || r.preventClicksPropagation) && a[p]('click', e.onClick, !0),
                r.cssMode && o[p]('scroll', e.onScroll),
                r.updateOnWindowResize
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
                    { params: s, support: r } = e;
                (e.onTouchStart = P.bind(e)),
                    (e.onTouchMove = k.bind(e)),
                    (e.onTouchEnd = O.bind(e)),
                    s.cssMode && (e.onScroll = _.bind(e)),
                    (e.onClick = A.bind(e)),
                    r.touch && !z && (t.addEventListener('touchstart', I), (z = !0)),
                    D(e, 'on');
            },
            detachEvents: function () {
                D(this, 'off');
            }
        },
        N = (e, t) => e.grid && t.grid && t.grid.rows > 1,
        B = {
            addClasses: function () {
                const e = this,
                    { classNames: t, params: s, rtl: i, $el: r, device: n, support: a } = e,
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
                            { android: n.android },
                            { ios: n.ios },
                            { 'css-mode': s.cssMode },
                            { centered: s.cssMode && s.centeredSlides },
                            { 'watch-progress': s.watchSlidesProgress }
                        ],
                        s.containerModifierClass
                    );
                t.push(...o), r.addClass([...t].join(' ')), e.emitContainerClasses();
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
                r = s[i];
            'object' == typeof r && null !== r
                ? (['navigation', 'pagination', 'scrollbar'].indexOf(i) >= 0 &&
                      !0 === e[i] &&
                      (e[i] = { auto: !0 }),
                  i in e && 'enabled' in r
                      ? (!0 === e[i] && (e[i] = { enabled: !0 }),
                        'object' != typeof e[i] || 'enabled' in e[i] || (e[i].enabled = !0),
                        e[i] || (e[i] = { enabled: !1 }),
                        v(t, s))
                      : v(t, s))
                : v(t, s);
        };
    }
    const j = {
            eventsEmitter: y,
            update: x,
            translate: {
                getTranslate: function (e = this.isHorizontal() ? 'x' : 'y') {
                    const { params: t, rtlTranslate: s, translate: i, $wrapperEl: r } = this;
                    if (t.virtualTranslate) return s ? -i : i;
                    if (t.cssMode) return i;
                    let a = (function (e, t = 'x') {
                        const s = n();
                        let i, r, a;
                        const o = (function (e) {
                            const t = n();
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
                                ? ((r = o.transform || o.webkitTransform),
                                  r.split(',').length > 6 &&
                                      (r = r
                                          .split(', ')
                                          .map(e => e.replace(',', '.'))
                                          .join(', ')),
                                  (a = new s.WebKitCSSMatrix('none' === r ? '' : r)))
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
                                (r = s.WebKitCSSMatrix
                                    ? a.m41
                                    : 16 === i.length
                                    ? parseFloat(i[12])
                                    : parseFloat(i[4])),
                            'y' === t &&
                                (r = s.WebKitCSSMatrix
                                    ? a.m42
                                    : 16 === i.length
                                    ? parseFloat(i[13])
                                    : parseFloat(i[5])),
                            r || 0
                        );
                    })(r[0], e);
                    return s && (a = -a), a || 0;
                },
                setTranslate: function (e, t) {
                    const s = this,
                        {
                            rtlTranslate: i,
                            params: r,
                            $wrapperEl: n,
                            wrapperEl: a,
                            progress: o
                        } = s;
                    let l,
                        d = 0,
                        c = 0;
                    s.isHorizontal() ? (d = i ? -e : e) : (c = e),
                        r.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
                        r.cssMode
                            ? (a[s.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = s.isHorizontal()
                                  ? -d
                                  : -c)
                            : r.virtualTranslate || n.transform(`translate3d(${d}px, ${c}px, 0px)`),
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
                translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, r) {
                    const n = this,
                        { params: a, wrapperEl: o } = n;
                    if (n.animating && a.preventInteractionOnTransition) return !1;
                    const l = n.minTranslate(),
                        d = n.maxTranslate();
                    let c;
                    if (
                        ((c = i && e > l ? l : i && e < d ? d : e), n.updateProgress(c), a.cssMode)
                    ) {
                        const e = n.isHorizontal();
                        if (0 === t) o[e ? 'scrollLeft' : 'scrollTop'] = -c;
                        else {
                            if (!n.support.smoothScroll)
                                return (
                                    T({ swiper: n, targetPosition: -c, side: e ? 'left' : 'top' }),
                                    !0
                                );
                            o.scrollTo({ [e ? 'left' : 'top']: -c, behavior: 'smooth' });
                        }
                        return !0;
                    }
                    return (
                        0 === t
                            ? (n.setTransition(0),
                              n.setTranslate(c),
                              s && (n.emit('beforeTransitionStart', t, r), n.emit('transitionEnd')))
                            : (n.setTransition(t),
                              n.setTranslate(c),
                              s &&
                                  (n.emit('beforeTransitionStart', t, r),
                                  n.emit('transitionStart')),
                              n.animating ||
                                  ((n.animating = !0),
                                  n.onTranslateToWrapperTransitionEnd ||
                                      (n.onTranslateToWrapperTransitionEnd = function (e) {
                                          n &&
                                              !n.destroyed &&
                                              e.target === this &&
                                              (n.$wrapperEl[0].removeEventListener(
                                                  'transitionend',
                                                  n.onTranslateToWrapperTransitionEnd
                                              ),
                                              n.$wrapperEl[0].removeEventListener(
                                                  'webkitTransitionEnd',
                                                  n.onTranslateToWrapperTransitionEnd
                                              ),
                                              (n.onTranslateToWrapperTransitionEnd = null),
                                              delete n.onTranslateToWrapperTransitionEnd,
                                              s && n.emit('transitionEnd'));
                                      }),
                                  n.$wrapperEl[0].addEventListener(
                                      'transitionend',
                                      n.onTranslateToWrapperTransitionEnd
                                  ),
                                  n.$wrapperEl[0].addEventListener(
                                      'webkitTransitionEnd',
                                      n.onTranslateToWrapperTransitionEnd
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
                        { params: s, $wrapperEl: r } = e,
                        n = r.children().length > 0 ? h(r.children()[0].parentNode) : r;
                    n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
                    let a = n.children(`.${s.slideClass}`);
                    if (s.loopFillGroupWithBlank) {
                        const e = s.slidesPerGroup - (a.length % s.slidesPerGroup);
                        if (e !== s.slidesPerGroup) {
                            for (let i = 0; i < e; i += 1) {
                                const e = h(t.createElement('div')).addClass(
                                    `${s.slideClass} ${s.slideBlankClass}`
                                );
                                n.append(e);
                            }
                            a = n.children(`.${s.slideClass}`);
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
                        n.append(h(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
                    for (let e = o.length - 1; e >= 0; e -= 1)
                        n.prepend(h(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
                },
                loopFix: function () {
                    const e = this;
                    e.emit('beforeLoopFix');
                    const {
                        activeIndex: t,
                        slides: s,
                        loopedSlides: i,
                        allowSlidePrev: r,
                        allowSlideNext: n,
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
                        (e.allowSlidePrev = r),
                        (e.allowSlideNext = n),
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
                            params: r,
                            $el: n
                        } = e,
                        a = r.breakpoints;
                    if (!a || (a && 0 === Object.keys(a).length)) return;
                    const o = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
                    if (!o || e.currentBreakpoint === o) return;
                    const l = (o in a ? a[o] : void 0) || e.originalParams,
                        d = N(e, r),
                        c = N(e, l),
                        p = r.enabled;
                    d && !c
                        ? (n.removeClass(
                              `${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`
                          ),
                          e.emitContainerClasses())
                        : !d &&
                          c &&
                          (n.addClass(`${r.containerModifierClass}grid`),
                          ((l.grid.fill && 'column' === l.grid.fill) ||
                              (!l.grid.fill && 'column' === r.grid.fill)) &&
                              n.addClass(`${r.containerModifierClass}grid-column`),
                          e.emitContainerClasses()),
                        ['navigation', 'pagination', 'scrollbar'].forEach(t => {
                            const s = r[t] && r[t].enabled,
                                i = l[t] && l[t].enabled;
                            s && !i && e[t].disable(), !s && i && e[t].enable();
                        });
                    const u = l.direction && l.direction !== r.direction,
                        h = r.loop && (l.slidesPerView !== r.slidesPerView || u);
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
                    const r = n(),
                        a = 'window' === t ? r.innerHeight : s.clientHeight,
                        o = Object.keys(e).map(e => {
                            if ('string' == typeof e && 0 === e.indexOf('@')) {
                                const t = parseFloat(e.substr(1));
                                return { value: a * t, point: e };
                            }
                            return { value: e, point: e };
                        });
                    o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                    for (let e = 0; e < o.length; e += 1) {
                        const { point: n, value: a } = o[e];
                        'window' === t
                            ? r.matchMedia(`(min-width: ${a}px)`).matches && (i = n)
                            : a <= s.clientWidth && (i = n);
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
                loadImage: function (e, t, s, i, r, a) {
                    const o = n();
                    let l;
                    function d() {
                        a && a();
                    }
                    h(e).parent('picture')[0] || (e.complete && r)
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
                                    s = n(),
                                    i = s.navigator.platform,
                                    r = e || s.navigator.userAgent,
                                    a = { ios: !1, android: !1 },
                                    o = s.screen.width,
                                    l = s.screen.height,
                                    d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
                                let c = r.match(/(iPad).*OS\s([\d_]+)/);
                                const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
                                    u = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
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
                                        ((c = r.match(/(Version)\/([\d.]+)/)),
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
                            const e = n();
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
            const r = {};
            i.modules.forEach(e => {
                e({
                    swiper: i,
                    extendParams: H(s, r),
                    on: i.on.bind(i),
                    once: i.once.bind(i),
                    off: i.off.bind(i),
                    emit: i.emit.bind(i)
                });
            });
            const a = v({}, V, r);
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
                r = (s.maxTranslate() - i) * e + i;
            s.translateTo(r, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
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
                slidesGrid: r,
                slidesSizesGrid: n,
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
                    (t ? r[e] + n[e] - r[o] < a : r[e] - r[o] < a) && (l += 1);
            else for (let e = o - 1; e >= 0; e -= 1) r[o] - r[e] < a && (l += 1);
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
            let r;
            s.breakpoints && e.setBreakpoint(),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                e.params.freeMode && e.params.freeMode.enabled
                    ? (i(), e.params.autoHeight && e.updateAutoHeight())
                    : ((r =
                          ('auto' === e.params.slidesPerView || e.params.slidesPerView > 1) &&
                          e.isEnd &&
                          !e.params.centeredSlides
                              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                              : e.slideTo(e.activeIndex, 0, !1, !0)),
                      r || i()),
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
            const r = () => `.${(t.params.wrapperClass || '').trim().split(' ').join('.')}`;
            let n = (() => {
                if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                    const t = h(e.shadowRoot.querySelector(r()));
                    return (t.children = e => s.children(e)), t;
                }
                return s.children ? s.children(r()) : h(s).children(r());
            })();
            if (0 === n.length && t.params.createElements) {
                const e = i().createElement('div');
                (n = h(e)),
                    (e.className = t.params.wrapperClass),
                    s.append(e),
                    s.children(`.${t.params.slideClass}`).each(e => {
                        n.append(e);
                    });
            }
            return (
                Object.assign(t, {
                    $el: s,
                    el: e,
                    $wrapperEl: n,
                    wrapperEl: n[0],
                    mounted: !0,
                    rtl: 'rtl' === e.dir.toLowerCase() || 'rtl' === s.css('direction'),
                    rtlTranslate:
                        'horizontal' === t.params.direction &&
                        ('rtl' === e.dir.toLowerCase() || 'rtl' === s.css('direction')),
                    wrongRTL: '-webkit-box' === n.css('display')
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
                { params: i, $el: r, $wrapperEl: n, slides: a } = s;
            return (
                void 0 === s.params ||
                    s.destroyed ||
                    (s.emit('beforeDestroy'),
                    (s.initialized = !1),
                    s.detachEvents(),
                    i.loop && s.loopDestroy(),
                    t &&
                        (s.removeClasses(),
                        r.removeAttr('style'),
                        n.removeAttr('style'),
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
                const i = n();
                let r = null,
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
                          ((r = new ResizeObserver(t => {
                              a = i.requestAnimationFrame(() => {
                                  const { width: s, height: i } = e;
                                  let r = s,
                                      n = i;
                                  t.forEach(({ contentBoxSize: t, contentRect: s, target: i }) => {
                                      (i && i !== e.el) ||
                                          ((r = s ? s.width : (t[0] || t).inlineSize),
                                          (n = s ? s.height : (t[0] || t).blockSize));
                                  }),
                                      (r === s && n === i) || o();
                              });
                          })),
                          r.observe(e.el))
                        : (i.addEventListener('resize', o),
                          i.addEventListener('orientationchange', l));
                }),
                    t('destroy', () => {
                        a && i.cancelAnimationFrame(a),
                            r && r.unobserve && e.el && (r.unobserve(e.el), (r = null)),
                            i.removeEventListener('resize', o),
                            i.removeEventListener('orientationchange', l);
                    });
            },
            function ({ swiper: e, extendParams: t, on: s, emit: i }) {
                const r = [],
                    a = n(),
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
                            r.push(s);
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
                        r.forEach(e => {
                            e.disconnect();
                        }),
                            r.splice(0, r.length);
                    });
            }
        ]);
    const q = W;
    window.addEventListener('DOMContentLoaded', () => {
        const e = document.querySelectorAll('.footer__arrow'),
            t = document.querySelectorAll('.footer__list'),
            s = document.querySelectorAll('.profile-info__timer-hours span'),
            i = document.querySelectorAll('.profile-info__timer-minutes span'),
            r = document.querySelectorAll('.profile-info__timer-seconds span'),
            n = document.querySelector('.burger'),
            a = document.querySelector('.sidemenu'),
            o = document.body,
            l = document.querySelector('.sellers__list'),
            d = document.querySelector('.sellers__sort span'),
            c = document.querySelectorAll('.category__group-item'),
            p = new Date('2023', '01', '27');
        new q('.swiper', {
            direction: 'horizontal',
            slidesPerView: 3,
            enabled: !1,
            spaceBetween: 25,
            breakpoints: {
                375: { slidesPerView: 1, enabled: !0 },
                426: { slidesPerView: 1, enabled: !0 },
                576: { slidesPerView: 1, enabled: !0 },
                740: { slidesPerView: 2, enabled: !0, grabCursor: !0 },
                1025: { slidesPerView: 2, enabled: !0, grabCursor: !0 },
                1436: { slidesPerView: 3, enabled: !1 }
            }
        }),
            n.addEventListener('click', () => {
                document.querySelector('.burger input').checked
                    ? (console.log('click add'),
                      n.classList.add('burger__active'),
                      a.classList.add('sidemenu__active'),
                      o.classList.add('lock'))
                    : (console.log('click delete'),
                      n.classList.remove('burger__active'),
                      a.classList.remove('sidemenu__active'),
                      o.classList.remove('lock'));
            });
        const u = setInterval(function () {
            const e = p - new Date();
            e <= 0 && clearInterval(u);
            const t = e > 0 ? Math.floor(e / 1e3 / 60 / 60) % 24 : 0,
                n = e > 0 ? Math.floor(e / 1e3 / 60) % 60 : 0,
                a = e > 0 ? Math.floor(e / 1e3) % 60 : 0;
            s.forEach(e => {
                e.textContent = t < 10 ? '0' + t : t;
            }),
                i.forEach(e => {
                    e.textContent = n < 10 ? '0' + n : n;
                }),
                r.forEach(e => {
                    e.textContent = a < 10 ? '0' + a : a;
                });
        }, 1e3);
        e.forEach((e, s) => {
            e.addEventListener('click', () => {
                e.classList.toggle('rotate'), t[s].classList.toggle('show');
            });
        }),
            l.addEventListener('click', e => {
                d.textContent = e.target.getAttribute('data-tag');
            }),
            c.forEach(e => {
                e.addEventListener('click', e => {
                    c.forEach(e => {
                        e.classList.remove('category__group-item__active');
                    }),
                        e.target.classList.add('category__group-item__active');
                });
            });
    });
})();
//# sourceMappingURL=bundle.js.map
