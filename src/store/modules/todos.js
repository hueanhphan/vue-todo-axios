import axios from "axios";

const state = {
  todos: [],
};
const getters = {
  allTodos: (state) => state.todos,
};
const actions = {
  async fetchTodos({ commit }) {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");

    // console.log(res.data);
    commit("setTodos", res.data);
  },
  async addTodo({ commit }, title) {
    const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false,
    });
    commit("newTodo", res.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit("deleteTodo", id);
  },
  async filterTodos({ commit }, e) {
    // get selected number
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    // console.log(limit);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit("setTodos", res.data);
  },
  async updateTodo({ commit }, updTodo) {
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updTodo.id} `,
      updTodo
    );
    console.log(res.data);
    commit("updateTodo", res.data);
  },
};
const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  deleteTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id != id)),

  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
