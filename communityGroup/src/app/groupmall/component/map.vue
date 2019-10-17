<template>
  <section class="gdmap">
    <!-- <div v-if="location.lat" class="maplat"><span ref="currlng">当前点击获得坐标为：{{location.lat+','+location.lng}}</span></div> -->
    <div class="containers" :id="id" ref="gdmap"></div>
    <!-- <div class="maptip">提示：可在地图片上点击选择坐标</div> -->
  </section>
</template>
<script>
export default {
  props: {
    address: String
  },
  data() {
    return {
      placeSearch: null,
      map: null,
      id: "",
      serchList: [],
      location: {}
    };
  },
  watch: {
    address(val) {
      this.searchByKey(val);
    }
  },
  mounted() {
    this.id = (Math.random() * 100000).toFixed();
    setTimeout(() => {
      this.initMap();
    }, 0);
  },
  methods: {
    onChange(item) {
      this.location = {
        lat: item.location.lat,
        lng: item.location.lng,
        name: item.name
      };
    },
    initMap() {
      if (this.map) {
        this.map.clearMap();
      }
      this.map = new AMap.Map(this.id, {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11 //初始化地图层级
      });
      this.map.on("click", this.getLocation);
      this.initPlaceSearch();
    },
    /**
     * 初始化搜索
     */
    initPlaceSearch(e) {
      // console.log('init placeSearch')
      AMap.service("AMap.PlaceSearch", async () => {
        this.placeSearch = new AMap.PlaceSearch({
          pageSize: 5,
          pageIndex: 1,
          map: this.map
        });
        if (e) {
          this.searchByKey(e);
        }
      });
    },
    searchByKey(keyword) {
      //  keyword='浙江省宁波市江北区'
      this.placeSearch.search(String(keyword), (status, result) => {
        if (result.info == "OK") {
          this.serchList = result.poiList.pois;
          this.setLabel();
        }
      });
    },
    setLabel() {
      if (this.serchList.length > 0) {
        this.location = {
          lat: this.serchList[0].location.lat,
          lng: this.serchList[0].location.lng,
          name: this.serchList[0].name
        };
        this.$emit("getlabel", this.location);
        // for (let item of this.serchList) {
        //   let marker = new AMap.Marker({
        //     position: item.location,
        //     map: this.map
        //   });
        //   marker.setMap(this.map);
        //   marker.setLabel({
        //     content: item.name
        //   });
        // }
      }
    },
    getLocation(e) {
      this.location.lat = e.lnglat.lat;
      this.location.lng = e.lnglat.lng;
      this.$emit("getlabel", this.location);
    }
  }
};
</script>

<style lang="less">
.gdmap {
  width: 100%;
  position: relative;
  height: 100%;
  min-height: 200px;
  max-height: 400px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  .maplat {
    position: absolute;
    top: 5px;
    right: 5px;
    opacity: 0.9;
    padding: 3px;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    background-color: white;
    border-width: 0;
    box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
    z-index: 8888;
  }
  .maptip {
    padding: 3px;
    color: #aaa;
    background-color: #fff;
    margin-top: 1px;
  }
  .containers {
    flex: 1;
    .amap-marker-label {
      border: 1px solid #57a3f3 !important;
      z-index: 5555;
      top: 15px !important;
      left: 15px !important;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background-color: #57a3f3;
        color: #fff;
      }
    }
  }
}
</style>

