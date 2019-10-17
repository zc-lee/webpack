<template>
  <div style="width:100%; height:100%" class="position-relative">
    <el-autocomplete class="mapSearch" v-if="input" :focus="focus" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
      @select="handleSelect">
      <template slot-scope="{ item }">
        <div class="name">{{item.value}}</div>
        <span class="addr">{{item.desc}}</span>
      </template>
    </el-autocomplete>
    <div :id="id" style="width:100%; height:100%"></div>
  </div>
</template>

<script>
export default {
  props: {
    address: String,
    input: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: "",
      map: null,
      placeSearch: null,
      autocomplete: null,
      geocoder: null,
      marker: [],
      focus: false
    };
  },
  watch: {
    address(val) {
      this.placeSearch.search(val);
    }
  },
  mounted() {
    this.id = (Math.random() * 100000).toFixed();
    setTimeout(() => {
      this.initMap();
    }, 0);
  },
  methods: {
    //远程搜索提示
    querySearchAsync(queryString, cb) {
      if (!queryString) {
        cb([]);
        return;
      }
      this.placeSearch.search(queryString, (status, result) => {
        if (result === "NO_PARAMS" && result.info !== "OK") {
          cb([]);
          return;
        }
        let pois = result.poiList.pois;
        let data = [];
        pois.forEach(item => {
          const obj = {
            value: `${item.name}`,
            desc: `${item.pname}${item.cityname}${item.adname}${item.address}`,
            address: [item.pname, item.cityname, item.adname, item.address],
            latLng: {
              lat: item.location.lat,
              lng: item.location.lng
            }
          };
          data.push(obj);
        });
        cb(data);
      });
    },
    //点击选中建议项时触发
    handleSelect(item) {
      let addressList = {
        address: item.address,
        latLng: item.latLng
      };
      this.$emit("update:addressList", addressList);
      this.placeSearch.search(item.desc);
    },

    /**
     * 初始化地图
     */
    initMap() {
      this.map = new AMap.Map(this.id, {
        resizeEnable: true,
        zoom: 11
      });
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
        // console.log(e)
        if(e){
          this.searchByKey(e);
        }
      });
    },
    /**
     * @method
     * @description 根据关键字搜索
     */
     searchByKey(keyword) {
      //  keyword='浙江省宁波市江北区'
      //  console.log(keyword)
      this.placeSearch.search(String(keyword));
    },
    /**
     * 初始化地理编码
     */
    initGeocoder() {
      AMap.plugin("AMap.Geocoder", () => {
        this.geocoder = new AMap.Geocoder({
          map: this.map
        });
      });
    },

    /**
     * 逆向地理编码
     */
    getAddress() {
      var lnglat = [116.396574, 39.992706];
      this.geocoder.getAddress(lnglat, (status, result) => {
        if (status === "complete" && result.info === "OK") {
        }
      });
    }
  }
};
</script>


<style scoped>
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.mapSearch {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 70%;
}
</style>
