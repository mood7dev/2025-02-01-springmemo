<script setup>
import { reactive, onMounted } from "vue";
import httpService from "@/services/HttpService";
import MemoCard from "@/components/MemoCard.vue";

//반응형 변수
const state = reactive({
  memos: [],
});

onMounted(() => {
  getItems();
});

const getItems = async (params) => {
  const data = await httpService.getMemoList({ params });
  state.memos = data.resultData;
  console.log("state.memos :", state.memos);
};

const removeItem = async (id) => {
  console.log("removeItem: ", id);

  if (confirm("삭제하시겠습니까?")) {
    console.log("삭제");
    const params = { memo_id: id };
    const data = await httpService.delMemo(params);
    if (data.resultData === 1) {
      //getItems({});
      const deleteIdx = state.memos.findIndex((item) => item.id === id);
      if (deleteIdx >= 0) {
        state.memos.splice(deleteIdx, 1);
      }
    }
  }
};
</script>

<template>
  <div class="memo-list">
    <router-link to="add" class="add btn btn-light"> + 추가하기 </router-link>
  </div>

  <MemoCard
    @delete-item="removeItem"
    v-for="m in state.memos"
    :item="m"
    :key="m.id"
  />
</template>

<style lang="scss" scoped>
.add {
  display: block;
  padding: 25px;
  border: 1px solid #eee;
  text-align: center;
}
</style>
