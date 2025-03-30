// 观察者模式指的是一个对象（Subject）维持一系列依赖对象（Observer) ，
// 当有关状态发生变更时 Subject 对象则通知一系列 Observer 对象进行更新。

// 观察者模式
class Subject {
  constructor() {
    this.observers = [];
  }

  // 添加观察者
  addObserver(observer) {
    // 避免重复添加同一个观察者
    if (this.observers.includes(observer)) return;
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // 通知所有观察者
  notify(data) {
    this.observers.forEach((observer) => {
      observer.update(data);
    });
  }
}

// 观察者类
class Observer {
  constructor(name) {
    this.name = name;
  }

  // 当收到主题通知时调用的方法
  update(data) {
    console.log(`${this.name} 收到通知，数据是: ${data}`);
  }
}

// 使用示例
// 创建主题
const subject = new Subject();

// 创建观察者
const observer1 = new Observer("观察者1");
const observer2 = new Observer("观察者2");

// 添加观察者到主题
subject.addObserver(observer1);
subject.addObserver(observer2);
// 主题发生变化，通知所有观察者
subject.notify("主题数据已更新");

// 移除一个观察者
subject.removeObserver(observer1);
// 再次通知，只有观察者2会收到通知
subject.notify("主题数据再次更新");
