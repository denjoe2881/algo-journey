## 1. MovingAverage
Thiết kế một lớp xử lý dòng số nguyên đi vào theo thời gian thực.  
Mỗi lần nhận một giá trị mới, lớp phải trả về **trung bình cộng của `k` phần tử gần nhất**.

**Gợi ý methods**
- `MovingAverage(int size)`
- `double next(int val)`

**Mục tiêu**
- luyện thiết kế class có trạng thái
- hiểu queue / sliding window
- cập nhật kết quả theo thời gian

---

## 2. RecentCounter
Thiết kế một bộ đếm số request gần đây.  
Mỗi lần gọi `ping(t)`, hãy trả về số lượng request xảy ra trong khoảng thời gian **[t - 3000, t]**.

**Gợi ý methods**
- `RecentCounter()`
- `int ping(int t)`

**Mục tiêu**
- luyện queue
- hiểu cách loại bỏ dữ liệu cũ
- mô phỏng dữ liệu theo thời gian

---

## 3. BrowserHistory
Thiết kế hệ thống lịch sử trình duyệt.  
Người dùng có thể truy cập URL mới, quay lại trang trước, hoặc tiến tới trang sau.

**Gợi ý methods**
- `BrowserHistory(String homepage)`
- `void visit(String url)`
- `String back(int steps)`
- `String forward(int steps)`

**Mục tiêu**
- luyện quản lý trạng thái
- hiểu cấu trúc dữ liệu cho history
- thực hành OOP với hành vi thực tế

---

## 4. ParkingSystem
Thiết kế hệ thống quản lý bãi đỗ xe với 3 loại chỗ: lớn, vừa, nhỏ.  
Mỗi xe đến sẽ thuộc một loại, và hệ thống phải quyết định có thể đỗ hay không.

**Gợi ý methods**
- `ParkingSystem(int big, int medium, int small)`
- `boolean addCar(int carType)`

**Mục tiêu**
- luyện constructor + fields
- mô hình hóa tài nguyên có giới hạn
- thực hành thiết kế class đơn giản

---

## 5. OrderedStream
Thiết kế một luồng dữ liệu có chỉ số từ `1..n`.  
Mỗi lần chèn một cặp `(id, value)`, hãy trả về **đoạn liên tiếp dài nhất bắt đầu từ con trỏ hiện tại**.

**Gợi ý methods**
- `OrderedStream(int n)`
- `List<String> insert(int idKey, String value)`

**Mục tiêu**
- luyện array + pointer
- hiểu trạng thái tăng dần
- thực hành thiết kế class xử lý dữ liệu theo thứ tự

---

## 6. FrontMiddleBackQueue
Thiết kế một hàng đợi đặc biệt hỗ trợ thêm/xóa phần tử ở **đầu**, **giữa**, và **cuối**.

**Gợi ý methods**
- `FrontMiddleBackQueue()`
- `void pushFront(int val)`
- `void pushMiddle(int val)`
- `void pushBack(int val)`
- `int popFront()`
- `int popMiddle()`
- `int popBack()`

**Mục tiêu**
- luyện thiết kế API phức tạp hơn
- hiểu cách duy trì cân bằng trạng thái
- thực hành cấu trúc dữ liệu tùy biến

---

## 7. FrequencyTracker
Thiết kế một lớp theo dõi tần suất xuất hiện của các số nguyên.  
Lớp cần hỗ trợ thêm số, xóa bớt một lần xuất hiện, và kiểm tra xem có số nào đang có đúng một tần suất cho trước hay không.

**Gợi ý methods**
- `FrequencyTracker()`
- `void add(int number)`
- `void deleteOne(int number)`
- `boolean hasFrequency(int frequency)`

**Mục tiêu**
- luyện HashMap
- hiểu cách duy trì dữ liệu phụ trợ
- thực hành invariant trong class

---

## 8. NumberContainers
Thiết kế hệ thống lưu trữ số theo chỉ số.  
Có thể thay đổi số tại một vị trí, và truy vấn **chỉ số nhỏ nhất** đang chứa một số cho trước.

**Gợi ý methods**
- `NumberContainers()`
- `void change(int index, int number)`
- `int find(int number)`

**Mục tiêu**
- luyện mapping hai chiều
- thực hành cập nhật dữ liệu động
- hiểu thiết kế class phục vụ truy vấn nhanh

---

## 9. LRUCache
Thiết kế bộ nhớ đệm có dung lượng cố định theo quy tắc **Least Recently Used**.  
Khi đầy, phần tử ít được truy cập gần đây nhất sẽ bị loại bỏ.

**Gợi ý methods**
- `LRUCache(int capacity)`
- `int get(int key)`
- `void put(int key, int value)`

**Mục tiêu**
- kết hợp nhiều cấu trúc dữ liệu
- luyện OOP nâng cao
- hiểu cache và quản lý thứ tự truy cập

---

## 10. TextEditorWithUndoRedo
Thiết kế một trình soạn thảo văn bản đơn giản hỗ trợ các lệnh cơ bản như thêm nội dung, xóa nội dung, undo và redo.  
Mỗi thao tác phải được lưu như một **command** để có thể hoàn tác hoặc thực hiện lại.

**Gợi ý methods**
- `TextEditor()`
- `void add(String text)`
- `void delete(int k)`
- `String getText()`
- `void undo()`
- `void redo()`

**Mục tiêu**
- giới thiệu Command pattern
- luyện lưu lịch sử thao tác
- hiểu quan hệ giữa action, undo, redo

---

## 11. CommandHistory
Thiết kế một hệ thống quản lý danh sách lệnh đơn giản.  
Mỗi lệnh có thể được thực thi, hoàn tác, hoặc thực hiện lại.  
Có thể bắt đầu với các lệnh như `Add`, `Subtract`, `Multiply` trên một giá trị hiện tại.

**Gợi ý methods**
- `CommandHistory()`
- `void execute(Command command)`
- `void undo()`
- `void redo()`
- `int getValue()`

**Ví dụ command**
- `AddCommand(int x)`
- `SubtractCommand(int x)`
- `MultiplyCommand(int x)`

**Mục tiêu**
- thực hành interface / abstraction
- hiểu cách tách command thành object riêng
- làm quen với kiến trúc dễ mở rộng

---

## 12. ShoppingCartWithUndoRedo
Thiết kế giỏ hàng cho phép thêm sản phẩm, xóa sản phẩm, cập nhật số lượng, undo và redo.  
Mỗi thao tác trên giỏ hàng được xem như một command.

**Gợi ý methods**
- `ShoppingCart()`
- `void addItem(String name, int quantity)`
- `void removeItem(String name)`
- `void updateQuantity(String name, int quantity)`
- `void undo()`
- `void redo()`
- `Map<String, Integer> getItems()`

**Mục tiêu**
- áp dụng Command pattern vào tình huống thực tế
- luyện quản lý state phức tạp hơn
- thực hành thiết kế class có lịch sử thao tác