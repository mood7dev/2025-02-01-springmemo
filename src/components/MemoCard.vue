<script setup>
import httpService from "@/services/HttpService";

const props = defineProps({
  item: Object,
});

const remove = () => {
  console.log("삭제할 ID:", props.item.id);
  if (confirm("삭제하시겠습니까?")) {
    console.log("삭제");
    const params = { memo_id: props.item.id };
    const data = httpService.delMemo(params);
  }
};
</script>

<template>
  <router-link
    :key="props.item.id"
    :to="`/memos/${props.item.id}`"
    class="item"
  >
    <div class="d-flex pt-3">
      <div class="pb-3 mb-0 w-100">
        <div class="d-flex justify-content-between">
          <b>{{ props.item.title }}</b>
          <div>
            <span role="button" @click.prevent.stop="remove(props.item.id)"
              >삭제</span
            >
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
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
</style>
