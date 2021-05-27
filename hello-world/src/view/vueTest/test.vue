<template>
  <div id="test">
    <div class="example1">
      <p>基础的信息:{{ message }}</p>
      <p>计算属性更改的数据:{{ reversedMessage }}</p>
    </div>
    <div class="watch-example">
      <p>询问一个问题</p>
      <input type="text" v-model="question" />
      <p>{{ answer }}</p>
    </div>
    <div class="class-example">
      <p>动态绑定样式 这里使用的技巧是可以把sass导入变成对象后使用</p>
    </div>
    <div class="vfor-example">
      <li v-for="(item, index) of items" :key="item.message">
        {{ item.message }} - {{ index }}
      </li>
    </div>
    <div class="vfor-object">v-for渲染对象就没必要了</div>
    <div class="todo-list">
      <form @submit.prevent="addNewTodo">
        <label for="new-todo">增加一个新的todo标签</label>
        <input
          type="text"
          name=""
          id="new-todo"
          v-model="newTodoText"
          placeholder="怎么修改html样式来着"
        />
        <button>Add</button>
      </form>
      <ul>
        <todo-item
          v-for="(todo, index) in todos"
          :key="todo.id"
          :title="todo.title"
          @remove="todos.splice(index, 1)"
        >{{todo.title}}</todo-item>
      </ul>
    </div>
    <div class="form-example">
        <p>表单输入</p>
        <div class="text">
            <p>文本输入</p>
            <input v-model="message" placeholder="编辑我" type="text" name="" id="">
        </div>
       <div class="checkBox">
           <input type="checkbox" name="" id="">
       </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './todo-item.vue';
export default {
  data() {
    return {
      message: "hello",
      firstName: "FOO",
      lastName: "Bar",
      fullName: "Foo Bar",
      question: "",
      answer: "我可没法在你没提问前回答哦",
      items: [{ message: "F00" }, { message: "Bar" }],
      object: {
        title: "How to do lists in Vue",
        author: "Jane Doe",
        publishedAt: "2016-04-10",
      },
      newTodoText: "",
      todos: [
        {
          id: 1,
          title: "Do the dishes",
        },
        {
          id: 2,
          title: "Take out the trash",
        },
        {
          id: 3,
          title: "Mow the lawn",
        },
      ],
      nextTodoId: 4,
    };
  },
  components:{
      TodoItem
  },
  computed: {
    reversedMessage() {
      return this.message.split("").reverse().join("");
    },
  },
  watch: {
    question(newQuestion, oldQuestion) {
      this.answer = "等你停下来先";
      this.getAnswer();
      console.log(newQuestion, oldQuestion);
    },
  },
  methods: {
    getAnswer() {
      if (this.question.indexOf("?") === -1) {
        this.answer = "身为问题应该拥有一个问题标志";
        return;
      }
      this.answer = "思考中";
      setTimeout(() => {
        console.log("定时器该执行了");
        this.answer = "就假装是我回答了吗";
      }, 1000);
    },
    // todoList添加
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText,
      });
      this.newTodoText = "";
    },
  },
  // 钩子函数
  beforeCreate() {
    console.log("vue实例的挂载元素$el和数据对象data都为undefined 还未初始化");
    console.log("这个时候可以加载loading内容");
  },
  created() {
    console.log("vue实例的数据对象data有了$el还没有");
  },
  beforeMount() {
    console.log("vue的Dom节点还是虚拟的");
  },
  mounted() {
    console.log("vue实例挂载成功 data.filter成功渲染");
  },
  beforeUpdata() {},
  updated() {},
  beforeDestroy() {},
  destroy() {
    console.log("组件销毁时触发");
  },
  actived() {
    console.log("keeplive保存的页面切换时触发的");
  },
};
</script>

<style>
</style>