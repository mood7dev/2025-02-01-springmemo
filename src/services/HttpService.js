import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api";

class HttpService {
  // 메모 저장 - POST 요청
  // 메모 수정 - PUT 요청
  // 메모 삭제 - DELETE 요청
  // 메모 리스트 조회 - GET 요청
  // 메모 하나 조회 - GET 요청
  // deleteById(id) - id로 메모 삭제
}
export default new HttpService();
