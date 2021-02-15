import commentsAPI from '@/api/comments';

export default {
  namespaced: true,
  state: {
    data: null
  },
  mutations: {
    addNewCommentStart() {},
    addNewCommentSuccess(state, payload) {
      state.data.push(payload);
    },
    addNewCommentFailure(state, payload) {
      state.errors = payload;
    },
    getCommentsStart(state) {
      state.data = null;
    },
    getCommentsSuccess(state, payload) {
      state.data = payload;
    },
    getCommentsFailure(state, payload) {
      state.errors = payload;
    },
    removeCommentStart() {},
    removeCommentSuccess(state, payload) {
      state.data = state.data.filter(comment => comment.id !== payload);
    },
    removeCommentFailure() {}
  },
  actions: {
    async fetchComments({ commit }, { slug }) {
      commit('getCommentsStart');
      const comments = await commentsAPI.getComments(slug);
      commit('getCommentsSuccess', comments);
      return comments;
    },
    async deleteComment({ commit }, { slug, commentId }) {
      commit('removeCommentStart');
      await commentsAPI.deleteComment(slug, commentId);
      commit('removeCommentSuccess', commentId);
    },
    async createNewComment({ commit }, { slug, commentInput }) {
      commit('addNewCommentStart');
      const newComment = await commentsAPI.createComment(slug, commentInput);
      commit('addNewCommentSuccess', newComment);
      return newComment;
    }
  }
};
