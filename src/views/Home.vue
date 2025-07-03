<script setup>
// 상태관리: reactive로 memos 배열 선언

// 초기 메모 조회: 컴포넌트가 마운트 될 때 findAll() 호출

// 메모 불러오기 함수: 서버에서 메모 리스트 가져오는 async 함수

// 검색 버튼 클릭 시 findAll을 호출할 때 { searchText: '' } 객체 전달

// 검색 버튼 클릭 시 호출하는 함수 search() 작성

// 삭제 기능: 메모 삭제 API 호출, 삭제 성공하면 목록 다시 조회
//최신 메모 리스트 다시 조회
</script>

<template>
  <div class="memo-list">
    <router-link to="/memo/add" class="add btn btn-light">
      + 추가하기
    </router-link>

    <div class="mb-3 mt-3 d-flex">
      <input
        type="text"
        id="title"
        class="form-control p-3 me-3"
        placeholder="검색 키워드"
        v-model="model.searchText"
        @keyup.enter="search"
      />
      <button class="btn btn-primary" @click.prevent="search">검색</button>
    </div>

    <router-link
      v-for="m in state.memos"
      :to="`/memos/${m.id}`"
      class="item"
      :key="m.id"
    >
      <div class="d-flex pt-3">
        <div class="pb-3 mb-0 w-100">
          <div class="d-flex justify-content-between">
            <b>{{ m.title }}</b>
            <div>
              <span role="button" @click.prevent="remove(m.id)">삭제</span>
            </div>
          </div>
          <div class="mt-2">{{ m.content }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.memo-list {
  .item {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    display: block;
    color: #000;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 0;
    &:hover {
      border-color: #aaa;
    }
  }
}
.add {
  display: block;
  padding: 25px;
  border: 1px solid #eee;
}
</style>
