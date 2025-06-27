import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api";

//객체화 한 걸 리턴
class httpService {
  // 메모 저장 (POST)
  async saveMemo(item) {
    console.log("item: ", item);
  }

  async getItems(parms) {
    console.log("parms: ", parms);
  }

  // 메모 수정 (PUT)
  async updateMemo(item) {
    console.log("updateMemo - item: ", item);
  }

  // 메모 삭제 (DELETE)
  async delMemo(params) {
    console.log("delMemo - params", params);
    const res = await axios.delete("/memo", { params });
    return res.data;
  }

  // 메모 리스트 조회 (GET)
  async getMemoList(params) {
    console.log("getMemoList - params: ", params);
    const res = await axios.get("/memo", { params });
    console.log("getMemoList = res.data:", res.data);
    return res.data;
  }

  // 단일 메모 조회 (GET /{id})
  async getMemo(id) {
    console.log("getMemo - id:", id);
  }
}

export default new httpService();
