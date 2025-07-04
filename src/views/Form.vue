<script setup>
import { onMounted, reactive } from "vue";
import HttpService from "@/services/HttpService";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// 상태 관리: 메모 객체 저장 (id, 제목, 내용, 생성일시)
const state = reactive({
  memo: {
    id: 0,
    title: "",
    content: "",
    createdAt: "",
  },
});

// 컴포넌트 마운트 시 (페이지 열릴 때) 이전 페이지에서 전달된 데이터가 있으면 받아서 state에 저장
//passData라고 정의했고  history.state.data 있음 요곤 Detail.vue에서 넘긴 메모 정보
//넘어온 passData는 문자열이므로 객체로 되돌림
onMounted(() => {
  const passData = history.state.data;
  if (passData) {
    state.memo = JSON.parse(passData);
  }
});

// 폼 제출 시 호출되는 함수 (메모 저장 또는 수정 처리)
// procSubmit() "저장" 또는 "수정" 버튼을 눌렀을 때 실행되는 함수
// 백엔드 API에 보낼 데이터 생성 (제목, 내용)
const procSubmit = async () => {
  const jsonBody = {
    title: state.memo.title,
    content: state.memo.content,
  };

  // 기본 이동 경로(홈)
  let path = "/";
  let data = null;

  // 수정, 저장 아이디 호출부터!
  // id가 있으면 => 기존 메모 수정, 없으면 신규메모 저장

  if (state.memo.id) {
    path = `/memo/${state.memo.id}`;
    jsonBody.id = state.memo.id;
    data = await HttpService.modify(jsonBody);
  } else {
    data = await HttpService.save(jsonBody);
  }
  // 성공 시 해당 경로 이동, 실패 시 에러 메시지 표시
  if (data.resultData === 1) {
    router.push({ path });
  } else {
    alert(data.resultMessage);
  }
};
</script>

<template>
  <form class="detail" @submit.prevent="procSubmit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        type="text"
        id="title"
        class="form-control p-3"
        v-model="state.memo.title"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        id="content"
        class="form-control p-3"
        v-model="state.memo.content"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">
      {{ state.memo.id > 0 ? "수정" : "저장" }}
    </button>
  </form>
</template>

<style scoped></style>
