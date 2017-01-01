function(e) {
    "use strict";
    e.fn.sti = function(t) {
        var o = e.extend({
                selector: "img",
                dontshow: ".dontshow",
                title: "",
                summary: "",
                minWidth: 200,
                minHeight: 200,
                fb_app: "",
                scroll: !0,
                align: {
                    x: "left",
                    y: "top"
                },
                offset: {
                    x: 10,
                    y: 10
                },
                orientation: "horizontal",
                style: "box",
                sharer: "http://kabekin.com/sharer.php",
                is_mobile: !1,
                always_show: !0,
                primary_menu: ["facebook", "twitter", "google", "pinterest", "tumblr"]
            }, t),
            n = {
                setStyle: function(e) {
                    for (var t, o = "", n = ["margin-top", "margin-bottom", "margin-left", "margin-right", "position", "top", "bottom", "left", "right", "float", "max-width", "width", "height"], i = 0; i < n.length; i++) {
                        var a = n[i];
                        if ("position" === a && "static" === e.css(a)) t = "relative";
                        else if ("display" === a && "inline" === e.css(a)) t = "inline-block";
                        else {
                            if ("display" === a && "none" === e.css(a)) return;
                            t = "width" === a ? "" + e.outerWidth() + "px" : "height" === a ? "" + e.outerHeight() + "px" : e.css(a)
                        }
                        o += a + ":" + t + ";"
                    }
                    return o
                },
                setBoxStyle: function(e) {
                    for (var t, n, i, a = "", s = ["padding-" + o.align.y, "padding-" + o.align.x], r = 0; r < s.length; r++) {
                        var l = s[r];
                        l === "padding-" + o.align.y ? (n = o.offset.y, i = o.align.y) : (n = o.offset.x, i = o.align.x), t = parseInt(e.css(l)) + n, a += i + ":" + t + "px;"
                    }
                    return a
                },
                createImgHash: function(e) {
                    var t, o, i;
                    if (!e) return "";
                    if (o = 0, 0 === e.length) return o;
                    for (i = 0; i < e.length; i++) t = e[i], o = n.hashChar(e, t, o);
                    return o = Math.abs(o) + "", o.substring(0, 5)
                },
                hashChar: function(e, t, o) {
                    return o = (o << 5) - o + e.charCodeAt(t), o & o
                },
                scrollToImage: function(t) {
                    if (o.scroll && "" !== location.hash) {
                        var i = location.hash.substring(1);
                        return t.each(function() {
                            var t = e(this).data("media") ? e(this).data("media") : e(this).attr("src");
                            return i === n.createImgHash(t) ? (e("html, body").animate({
                                scrollTop: e(this).offset().top
                            }, 1e3), !1) : void 0
                        })
                    }
                },
                shareButtons: function() {
                    for (var e = "", t = 0; t < o.primary_menu.length; t++) {
                        var n = o.primary_menu[t];
                        e += ' + n + '-btn" data-network="' + n + '" rel="nofollow">Share'
                    }
                    return e
                },
                showMobile: function(t) {
                    var i = e(t);
                    return "" !== o.dontshow && i.is(o.dontshow) ? !1 : i.width() < o.minWidth || i.height() < o.minHeight ? !1 : i.closest(".sti").length > 0 ? !1 : (i.addClass("sti_reset"), i.wrap(' + o.orientation + " style-" + o.style + ' sti-mobile" style="' + n.setStyle(i) + '">'), i.after(' + n.setBoxStyle(i) + '">'), void i.after(' + n.setBoxStyle(i) + '">' + n.shareButtons() + ""))
                },
                showShare: function(t) {
                    var i = e(t);
                    return "" !== o.dontshow && i.is(o.dontshow) ? !1 : i.width() < o.minWidth || i.height() < o.minHeight ? !1 : i.closest(".sti").length > 0 ? !1 : (i.addClass("sti_reset"), i.wrap(' + o.orientation + " style-" + o.style + '" style="' + n.setStyle(i) + '">'), void i.after(' + n.setBoxStyle(i) + '">' + n.shareButtons() + ""))
                },
                hideShare: function(t) {
                    var o = e(t);
                    o.find(".sti-share-box").remove(), o.find(".sti_reset").unwrap().removeClass("sti_reset")
                },
                windowSize: function(e) {
                    switch (e) {
                        case "facebook":
                            return "width=670,height=320";
                        case "twitter":
                            return "width=626,height=252";
                        case "google":
                            return "width=520,height=550";
                        case "linkedin":
                            return "width=620,height=450";
                        case "delicious":
                            return "width=800,height=600";
                        default:
                            return "width=800,height=350"
                    }
                },
                replaceChars: function(e) {
                    return e.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
                },
                shareData: function(t, i) {
                    var a = {},
                        s = e(t).closest(".sti").find(".sti_reset");
                    a.w_size = n.windowSize(i), a.media = s.data("media") ? s.data("media") : s[0].src, a.hash = o.scroll ? "#" + n.createImgHash(a.media) : "", a.title = s.data("title") ? s.data("title") : s.attr("title") ? s.attr("title") : o.title ? o.title : document.title, a.summary = s.data("summary") ? s.data("summary") : s.attr("alt") ? s.attr("alt") : o.summary ? o.summary : "", a.local = location.href.replace(/\?img.*$/, "").replace(/\&img.*$/, "").replace(/#.*$/, ""), a.schar = -1 != a.local.indexOf("?") ? "&" : "?", a.link = s.data("url") ? s.data("url") : a.local + a.hash, a.page = o.sharer + "?url=" + encodeURIComponent(a.link) + "&img=" + a.media.replace("http://", "") + "&title=" + encodeURIComponent(n.replaceChars(a.title)) + "&desc=" + encodeURIComponent(n.replaceChars(a.summary)) + a.hash, a.page2 = o.sharer + "?url=" + encodeURIComponent(a.link) + "&img=" + a.media.replace("http://", "") + "&title=" + n.replaceChars(a.title) + "&desc=" + n.replaceChars(a.summary) + a.hash, n.share(i, a)
                },
                share: function(e, t) {
                    var i = "";
                    switch (e) {
                        case "facebook":
                            o.fb_app ? (i += "https://www.facebook.com/dialog/feed?", i += "app_id=" + o.fb_app, i += "&display=popup", i += "&link=" + encodeURIComponent(t.link), i += "&picture=" + encodeURIComponent(t.media), i += "&name=" + encodeURIComponent(t.title), i += "&description=" + encodeURIComponent(t.summary), i += "&redirect_uri=" + encodeURIComponent(o.sharer + "?close=1")) : (i += "http://www.facebook.com/sharer.php?s=100", i += "&p[url]=" + encodeURIComponent(t.page));
                            break;
                        case "google":
                            i += "https://plus.google.com/share?", i += "url=" + encodeURIComponent(t.page);
                            break;
                        case "linkedin":
                            i += "http://www.linkedin.com/shareArticle?mini=true", i += "&url=" + encodeURIComponent(t.page2);
                            break;
                        case "vkontakte":
                            i += "http://vk.com/share.php?", i += "url=" + encodeURIComponent(t.link), i += "&title=" + encodeURIComponent(t.title), i += "&description=" + encodeURIComponent(t.summary), i += "&image=" + encodeURIComponent(t.media), i += "&noparse=true";
                            break;
                        case "odnoklassniki":
                            i += "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1", i += "&st.comments=" + encodeURIComponent(t.title), i += "&st._surl=" + encodeURIComponent(t.page);
                            break;
                        case "twitter":
                            i += "https://twitter.com/intent/tweet?", i += "text=" + encodeURIComponent(t.title), i += "&url=" + encodeURIComponent(t.page);
                            break;
                        case "pinterest":
                            i += "http://pinterest.com/pin/create/button/?", i += "url=" + encodeURIComponent(t.link), i += "&media=" + encodeURIComponent(t.media), i += "&description=" + encodeURIComponent(t.title);
                            break;
                        case "tumblr":
                            i += "http://www.tumblr.com/share/photo?", i += "source=" + encodeURIComponent(t.media), i += "&caption=" + encodeURIComponent(t.summary), i += "&click_thru=" + encodeURIComponent(t.link);
                            break;
                        case "reddit":
                            i += "http://reddit.com/submit?", i += "url=" + encodeURIComponent(t.link), i += "&title=" + encodeURIComponent(t.title), i += "&text=" + encodeURIComponent(t.summary);
                            break;
                        case "digg":
                            i += "http://digg.com/submit?phase=2&", i += "url=" + encodeURIComponent(t.link), i += "&title=" + encodeURIComponent(t.title), i += "&bodytext=" + encodeURIComponent(t.summary);
                            break;
                        case "delicious":
                            i += "http://delicious.com/post?", i += "url=" + encodeURIComponent(t.link), i += "&title=" + encodeURIComponent(t.title)
                    }
                    n.openPopup(i, t.w_size)
                },
                openPopup: function(e, t) {
                    window.open(e, "Share This Image", t + ",status=0,toolbar=0,menubar=0,location=1,scrollbars=1")
                }
            };
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (o.is_mobile = !0), o.is_mobile ? (this.each(function() {
            n.showMobile(this)
        }), e(".sti-mobile-btn").on("click", function(t) {
            t.preventDefault(), e(this).closest(".sti").addClass("sti-mobile-show")
        }), e(o.selector).on("click", function() {
            e(this).closest(".sti").removeClass("sti-mobile-show")
        })) : o.always_show ? this.each(function() {
            n.showShare(this)
        }) : (e("body").on("mouseenter", o.selector, function(e) {
            e.preventDefault(), n.showShare(this)
        }), e("body").on("mouseleave", ".sti", function(e) {
            e.preventDefault(), n.hideShare(this)
        })), e("body").on("click", ".sti-btn", function(t) {
            t.preventDefault(), t.stopPropagation();
            var o = e(this).data("network");
            n.shareData(this, o)
        }), n.scrollToImage(this)
    }
}(jQuery);