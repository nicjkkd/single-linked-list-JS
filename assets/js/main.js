// [1] => [4] => [7] => [0]

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new ListNode(value);

    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  pop() {
    if (!this.head) return undefined;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      let prev = null;
      let current = this.head;

      while (current.next) {
        prev = current;
        current = current.next;
      }
      prev.next = null;
      this.length--;
      this.tail = prev;
    }
  }

  shift() {
    if (!this.head) return undefined;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      const currentHead = this.head;
      const newHead = currentHead.next;

      this.length--;
      this.head = newHead;

      currentHead.next = null;
      currentHead.value = null;
    }
  }

  unshift(value) {
    const newHead = new ListNode(value);

    if (!this.head && !this.tail) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      const currentHead = this.head;
      newHead.next = currentHead;
      this.head = newHead;
    }

    this.length++;
  }

  forEach(func) {
    if (!this.head) return undefined;

    let current = this.head;
    let currentIndex = 0;

    while (current) {
      func(current.value, currentIndex);
      current = current.next;
      currentIndex++;
    }
  }

  map(func) {
    if (!this.head) return undefined;
    const newLinkedList = new SinglyLinkedList();

    let current = this.head;
    let currentIndex = 0;

    while (current) {
      const newValue = func(current.value, currentIndex);
      newLinkedList.push(newValue);
      current = current.next;
      currentIndex++;
    }
    return newLinkedList;
  }

  replace(position, value) {
    if (position < 0 || position > this.length) {
      console.log("null check length");
      return 0;
    } else {
      let temp = this.head;
      for (let i = 0; i < position; i++) {
        temp = temp.next;
      }
      temp.value = value;
    }
  }

  insert(position, value) {
    const newNode = new ListNode(value);

    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    }

    if (position < 0 || position > this.length) {
      console.log("null check length");
      return 0;
    } else if (position === this.length) {
      this.tail.next = newNode;
      this.tail = newNode;
    } else if (position === 0) {
      let prevHead = this.head;
      this.head = newNode;
      this.head.next = prevHead;
    } else {
      let temp = this.head;
      for (let i = 0; i < position - 1; i++) {
        temp = temp.next;
      }
      let nextNode = temp.next;
      let prev = temp;
      prev.next = newNode;
      prev.next.next = nextNode;
    }

    this.length++;
  }

  remove(position) {
    if (!this.head) return undefined;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else if (position === 0) {
      this.shift();
    } else if (position === this.length) {
      this.pop();
    } else {
      let prev = null;
      let current = this.head;

      for (let i = 0; i < position; i++) {
        prev = current;
        current = current.next;
      }
      prev.next = current.next;
      current.value = null;
      current.next = null;
      this.length--;
    }
  }

  reverseNew() {
    const newList = new SinglyLinkedList();

    function pushToNewList(node) {
      if (node.next) pushToNewList(node.next);
      newList.push(node.value);
    }

    pushToNewList(this.head);

    return newList;
  }

  reverse() {
    const newList = new SinglyLinkedList();

    function pushToNewList(node) {
      if (node.next) pushToNewList(node.next);
      newList.push(node.value);
    }

    pushToNewList(this.head);

    this.head = newList.head;
    this.tail = newList.tail;
  }
}

const linkedList = new SinglyLinkedList();
linkedList.push(15);
linkedList.push(2);
linkedList.push(33);
linkedList.push(56);

const updated = linkedList.map((value) => value + 5);

//     0      1      2      3
// // [1] -> [2] -> [3] -> [4]

// replace(10, 5); // null check length
// replace(2, 10); // while currentIndex !== 2 ... currentIndex === 2

// insert(10, 5); // null check length
// insert(2, 5); // null check length // [1] -> [2] -> [3] -> [4]     =>    [1] -> [2] -> [3] -> [5] -> [4]
