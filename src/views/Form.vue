<script setup>
// 상태 관리: 메모 객체 저장 (id, 제목, 내용, 생성일시)

// 컴포넌트 마운트 시 (페이지 열릴 때) 이전 페이지에서 전달된 데이터가 있으면 받아서 state에 저장

// 폼 제출 시 호출되는 함수 (메모 저장 또는 수정 처리)
// 백엔드 API에 보낼 데이터 생성 (제목, 내용)
// 기본 이동 경로(홈)
// id가 있으면 => 기존 메모 수정, 없으면 신규메모 저장
// 성공 시 해당 경로 이동, 실패 시 에러 메시지 표시
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
