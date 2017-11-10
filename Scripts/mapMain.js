﻿

var map_google;
var map_baidu;
var map_gaode;
var map_qq;

var map_bing;
var map_tianditu;
var map_sogou;
var Point = function (lat, lng) {
    this.lat = lat;
    this.lng = lng;
}
Point.prototype.toGoogle = function () { return new google.maps.LatLng(this.lat, this.lng); };
Point.prototype.toBaidu = function () { return new BMap.Point(this.lng, this.lat); };
Point.prototype.toGaode = function () { return new AMap.LngLat(this.lng, this.lat); };
Point.prototype.toQQ = function () { return new qq.maps.LatLng(this.lat, this.lng); };

Point.prototype.toBing = function () { return new Microsoft.Maps.Location(this.lat, this.lng); };
Point.prototype.toSoGou = function () { return new sogou.maps.LatLng(this.lat, this.lng);};
Point.prototype.toTianDiTu = function () { return new T.LngLat(this.lng, this.lat); };
var init_point = new Point(32.041732, 118.784115);
var init_level = 15;
/*
function extent_changed() {
var google_level = map_google.getZoom();
var google_latlng = map_google.getCenter();
var center = new Point(google_latlng.lat(), google_latlng.lng());

map_leaflet.setView(center.toLeaflet(), google_level);
map_baidu.centerAndZoom(center.toBaidu(), google_level + 1);
map_tdt.centerAndZoom(center.toTdt(), google_level);
map_here.setZoomLevel(google_level);
map_here.setCenter(center.toHere());
map_bing.setView({ center: center.toBing(), zoom: google_level });
map_ali.centerAndZoom(center.toAli(), google_level);
}


}*/

function init_event() {
    //   map_google.addListener("drag", extent_changed);
    map_google.addListener("zoom_changed", extent_changed);
}

function extent_changed() {
    var google_level = map_google.getZoom();
    var google_latlng = map_google.getCenter();
    var center = new Point(google_latlng.lat(), google_latlng.lng());
    map_baidu.centerAndZoom(center.toBaidu(), google_level + 1);
    map_gaode.setZoomAndCenter(google_level, center.toGaode());
    map_qq.zoomTo(google_level); map_qq.setCenter(center.toQQ());

    map_tianditu.centerAndZoom(center.toTianDiTu(), google_level);
    map_sogou.setCenter(center.toSoGou(), google_level);
    map_bing.setView({ center: center.toBing(), zoom: google_level });
}

function init_google() {
  map_google = new google.maps.Map(document.getElementById('google'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8
});
}

function init_baidu() {
    map_baidu = new BMap.Map("baidu");    // 创建Map实例
    map_baidu.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    map_baidu.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map_baidu.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}

function init_gaode() {
     map_gaode = new AMap.Map('gaode', {
        resizeEnable: true,
        zoom: 11,
        center: [116.397428, 39.90923]
    });
}

function init_qq() {
     map_qq = new qq.maps.Map(document.getElementById("qq"), {
    // 地图的中心地理坐标。
    center: new qq.maps.LatLng(39.916527, 116.397128)
});
}


function init_bing() {
      map_bing = new Microsoft.Maps.Map('#bing', {
          credentials: '4LvGfLfFAPIh6UOpzoop〜u4K6PYrcVvRdaaqQ11-mYw〜AuqQZT9Nu0bW832qNg66FEP4k-Z9gtiVG0iFUXnQWeQe4BoaM01bnn_KMXGUzVke'
    });
}

function init_tianditu() {
    map_tianditu = new T.Map('tianditu');
    map_tianditu.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12);
}


function init_sogou() {
     map_sogou = new sogou.maps.Map(document.getElementById("sogou"), {});
}