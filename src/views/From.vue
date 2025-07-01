<script setup>
import { reactive, onMounted, useTemplateRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import httpService from "@/services/HttpService";

const router = useRouter(); //주소 이동: 라우터 처리
const route = useRoute(); //PathVariable 데이터 가져오기 위한 용도
const refTitle = useTemplateRef("ref_title");
const refCtnts = useTemplateRef("ref_ctnts");

const state = reactive({
  memo: {
    memoId: 0,
    title: "",
    ctnts: "",
    createdAt: "",
  },
});

//onMounted에서 memoId로 데이터 조회 (수정 모드)
onMounted(() => {
  if (route.params.memoId) {
    findById();
  }
});

const findById = async () => {
  const data = await httpService.findById(route.params.memoId);
  state.memo = data.resultData;
};

const submit = async () => {
  //간단한 validation(유효성 검사)

  if (state.memo.title.trim().replace(/\s{2,}/g, " ").length === 0) {
    refTitle.value.focus();
    alert("제목을 작성해 주세요");
    return;
  } else if (state.memo.ctnts.trim().replace(/\s{2,}/g, " ").length === 0) {
    alert("내용을 작성해 주세요");
    refCtnts.value.focus();
    return;
  } else if (state.memo.title.length > 20) {
    alert("20자 이내 작성해 주세요");
    return;
  } else if (state.memo.ctnts.length > 200) {
    refCtnts.value.focus();
    alert("내용은 200자 이내로 작성해 주세요");
    return;
  }

  if (route.params.memoId) {
    // 수정 처리
    const bodyJson = {
      memoId: state.memo.memoId,
      title: state.memo.title,
      ctnts: state.memo.ctnts,
    };
    const data = await httpService.modify(bodyJson);
    if (data.resultData === 1) {
      alert("수정 성공");
      router.push({ path: "/" });
    } else {
      alert(data.resultMessage);
    }
  } else {
    // 등록 처리
    const bodyJson = {
      title: state.memo.title,
      ctnts: state.memo.ctnts,
    };
    const data = await httpService.save(bodyJson);
    if (data.resultData === 1) {
      alert("등록 성공");
      router.push({ path: "/" });
    } else {
      alert(data.resultMessage);
    }
  }
};
</script>

<template>
  <form class="detail" @submit.prevent="submit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        type="text"
        ref="ref_title"
        id="title"
        class="form-control p-3"
        v-model="state.memo.title"
      />
    </div>
    <div class="mb-3">
      <label for="ctnts" class="form-label">내용</label>
      <textarea
        id="ctnts"
        ref="ref_ctnts"
        class="form-control p-3"
        v-model="state.memo.ctnts"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">저장</button>
  </form>
</template>
