<script setup>
import HttpService from "@/services/HttpService";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const state = reactive({
  memo: {
    id: 0,
    title: "",
    content: "",
    contentAT: "",
  },
});

onMounted(async () => {
  const id = route.params.id;
  const data = await HttpService.findById(id);
  state.memo = data.resultData;
});

const moveToForm = () => {
  const json = JSON.stringify(state.memo);
  router.push({
    path: "/memo/add",
    state: { data: json },
  });
};

//메모 하나의 상세 데이터 저장용 객체

//컴포넌트가 마운트될 때(페이지 열릴 때) 실행
// [1].URL에서 id 가져오기 route
// [2].id로 API 요청해서 메모 데이터 받아오기
// [3].받아온 데이터 상태에 저장하기

//수정 페이지로 이동하는 함수 moveToForm : 데이터 덮어씌우기
//[1].직렬화
//[2].router
</script>

<template>
  <div class="mb-3">등록일시: {{ state.memo.contentAt }}</div>
  <div class="mb-3">제목: {{ state.memo.title }}</div>
  <div class="mb-3">내용: {{ state.memo.content }}</div>
  <button type="button" class="btn btn-primary w-100 py-3" @click="moveToForm">
    수정
  </button>
</template>

<style scoped></style>
