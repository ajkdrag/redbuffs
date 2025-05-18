---
{"publish":true,"created":"2025-01-29T14:34:31.272+05:30","tags":["type/zettel","status/done"],"cssclasses":""}
---


> [!Topics]
> - [[2 Zettels/linked lists\|linked lists]]

In a Doubly Linked List (DLL) each node contains a data field, a reference to the next node in the sequence (next), and a reference to the preceding node in the sequence (prev). There are a couple of standard implementations:
- Using just a `head` pointer ($O(n)$ time to insert/delete at the end)
- Using both `head` and `tail` pointers (constant time to insert/deletion at end)
    - If `tail` isn't available explicitly, one can loop till the last node of the list: `Node* tail = head; while (tail->next) tail = tail->next;`

```cpp
#include <iostream>

template <typename T>
class DoublyLinkedList {
private:
    struct Node {
        T data;
        Node* next;
        Node* prev;
        
        Node(const T& value) : data(value), next(nullptr), prev(nullptr) {}
    };
    
    Node* head;
    Node* tail;
    size_t size;

public:
    // Constructor and Destructor
    DoublyLinkedList() : head(nullptr), tail(nullptr), size(0) {}
    
    ~DoublyLinkedList() {
        clear();
    }

    // Insertion operations
    void insertFront(const T& value) {
        Node* newNode = new Node(value);
        
        if (empty()) {
            head = tail = newNode;
        } else {
            newNode->next = head;
            head->prev = newNode;
            head = newNode;
        }
        size++;
    }
    
    void insertBack(const T& value) {
        Node* newNode = new Node(value);
        
        if (empty()) {
            head = tail = newNode;
        } else {
            newNode->prev = tail;
            tail->next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    // Deletion operations
    void deleteFront() {
        if (empty()) return;
        
        Node* temp = head;
        head = head->next;
        
        if (head) {
            head->prev = nullptr;
        } else {
            tail = nullptr;
        }
        
        delete temp;
        size--;
    }
    
    void deleteBack() {
        if (empty()) return;
        
        Node* temp = tail;
        tail = tail->prev;
        
        if (tail) {
            tail->next = nullptr;
        } else {
            head = nullptr;
        }
        
        delete temp;
        size--;
    }
    
    bool deleteValue(const T& value) {
        if (empty()) return false;
        
        if (head->data == value) {
            deleteFront();
            return true;
        }
        
        if (tail->data == value) {
            deleteBack();
            return true;
        }
        
        Node* current = head;
        while (current && current->data != value) {
            current = current->next;
        }
        
        if (!current) return false;
        
        current->prev->next = current->next;
        current->next->prev = current->prev;
        delete current;
        size--;
        return true;
    }

    // Search and lookup operations
    Node* search(const T& value) const {
        Node* current = head;
        while (current && current->data != value) {
            current = current->next;
        }
        return current;
    }
    
    Node* getHead() const { return head; }
    Node* getTail() const { return tail; }
    
    // Utility functions
    bool empty() const { return size == 0; }
    size_t getSize() const { return size; }
    
    void clear() {
        while (!empty()) {
            deleteFront();
        }
    }
    
    void print() const {
        Node* current = head;
        while (current) {
            std::cout << current->data;
            if (current->next) std::cout << " <-> ";
            current = current->next;
        }
        std::cout << std::endl;
    }
};
```

## Related
