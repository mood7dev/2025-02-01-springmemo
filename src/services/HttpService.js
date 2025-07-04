import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api";

class HttpService {
  // 메모 저장 - POST 요청
  async save(jsonBody) {
    const res = await axios.post("/memo", jsonBody);
    return res.data;
  }
  // 메모 수정 - PUT 요청
  async modify(jsonBody) {
    const res = await axios.put("/memo", jsonBody);
    return res.data;
  }
  // 메모 삭제 - DELETE 요청
  async delete(id) {
    const res = await axios.delete("/memo", { params: { id } });
    return res.data;
  }
  // 메모 리스트 조회 - GET 요청
  async findAll(params) {
    const res = await axios.get("/memo", { params });
    return res.data;
  }
  // 메모 하나 조회 - GET 요청
  async findById(id) {
    const res = await axios.get(`/memo/${id}`);
    return res.data;
  }
  // deleteById(id) - id로 메모 삭제
}
export default new HttpService();
