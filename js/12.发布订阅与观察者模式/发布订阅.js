// 发布订阅模式指的是基于一个主题通过自定义事件订阅，然后再通过该主题进行通知来执行自定义事件。

// 发布订阅模式
class EventEmitter {
  constructor() {
    // 事件中心
    // 存储格式: { 事件名: [回调函数1, 回调函数2, ...] }
    this.events = {};
  }

  // 订阅事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      // 如果事件不存在，创建一个新的事件数组
      this.events[eventName] = [];
    }
    // 将回调函数添加到事件数组中
    this.events[eventName].push(callback);
    return this; // 支持链式调用
  }

  // 发布事件
  emit(eventName, ...args) {
    // 获取该事件对应的所有回调函数
    const callbacks = this.events[eventName];
    if (callbacks) {
      // 依次调用回调函数
      callbacks.forEach((callback) => {
        callback.apply(this, args);
      });
    }
    return this; // 支持链式调用
  }

  // 取消订阅
  off(eventName, callback) {
    // 如果没有提供回调函数，则移除该事件的所有回调
    if (!callback) {
      console.log(
        "没有提供回调函数，移除该事件的所有回调",
        this.events[eventName]
      );
      this.events[eventName] = [];
      return this;
    }

    // 获取该事件对应的所有回调函数
    const callbacks = this.events[eventName];
    if (callbacks) {
      // 过滤掉要移除的回调函数,即过滤出来不需要移除的回调函数
      this.events[eventName] = callbacks.filter((cb) => cb !== callback);
    }
    return this; // 支持链式调用
  }

  // 只订阅一次
  once(eventName, callback) {
    // 创建一个新的函数，调用后自动取消订阅
    const wrapper = (...args) => {
      callback.apply(this, args);
      this.off(eventName, wrapper);
    };

    // 保存原始函数的引用，方便后续可能的取消订阅
    wrapper.original = callback; //original 是 wrapper 函数的一个属性，它保存了原始的 callback 函数。这样做的目的是为了在取消订阅时能够找到原始的 callback 函数。

    this.on(eventName, wrapper);
    return this; // 支持链式调用
  }
}

// 使用示例
const eventBus = new EventEmitter();

// 订阅事件
function messageHandler1(data) {
  console.log("订阅者1收到消息:", data);
}

function messageHandler2(data) {
  console.log("订阅者2收到消息:", data);
}

// 订阅 'message' 事件, 可以订阅多次, 会依次执行
eventBus.on("message", messageHandler1);
eventBus.on("message", messageHandler2);

// 只订阅一次 'once-event' 事件
eventBus.once("once-event", (data) => {
  console.log("这个事件只会触发一次:", data);
});

// 发布 'message' 事件
eventBus.emit("message", "你好，世界!");

// 发布 'once-event' 事件两次，但只会触发一次
eventBus.emit("once-event", "第一次触发");
eventBus.emit("once-event", "第二次触发，但不会有输出");

// 取消订阅
eventBus.off("message", messageHandler1);

// 再次发布 'message' 事件，只有订阅者2会收到
eventBus.emit("message", "只有订阅者2能看到这条消息");
