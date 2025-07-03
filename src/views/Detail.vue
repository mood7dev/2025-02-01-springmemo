<script setup>
//메모 하나의 상세 데이터 저장용 객체

//컴포넌트가 마운트될 때(페이지 열릴 때) 실행

//수정 페이지로 이동하는 함수
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
