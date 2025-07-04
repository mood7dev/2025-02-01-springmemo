<script setup>
import HttpService from "@/services/HttpService";
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

//메모 하나의 상세 데이터 저장용 객체
const state = reactive({
  memo: {
    id: 0,
    title: "",
    content: "",
    createdAt: "",
  },
});

//컴포넌트가 마운트될 때(페이지 열릴 때) 실행
onMounted(async () => {
  const id = route.params.id;
  const data = await HttpService.findById(id);
  state.memo = data.resultData;
  console.log("불러온 메모 데이터:", state.memo);
});

//수정 페이지로 이동하는 함수 moveToForm
// JSON.stringify (직렬화)
const moveToForm = () => {
  const json = JSON.stringify(state.memo);
  router.push({
    path: "/memo/add",
    state: {
      data: json,
    },
  });
};
</script>

<template>
  <div class="mb-3">등록일시: {{ state.memo.createdAt }}</div>
  <div class="mb-3">제목: {{ state.memo.title }}</div>
  <div class="mb-3">내용: {{ state.memo.content }}</div>
  <button type="button" class="btn btn-primary w-100 py-3" @click="moveToForm">
    수정
  </button>
</template>

<style scoped></style>
