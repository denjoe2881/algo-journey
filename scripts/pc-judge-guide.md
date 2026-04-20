# PC Judge — Hướng dẫn chuyển đổi và sử dụng

## Tổng quan

**PC Judge** là hệ thống cho phép giảng viên chấm bài Java của sinh viên trực tiếp trên máy tính (không cần browser). Mỗi bài trong catalog [Algo Journey](/src/content/problems/) có một folder tương ứng trong `docs/pc-judge/`, chứa đủ mọi thứ để compile và chạy.

---

## Cấu trúc một bài (folder output)

```
docs/pc-judge/<exercise-id>/
├── Runner.java         ← Harness chính (KHÔNG sửa)
├── <StudentFile>.java  ← Slot bài của sinh viên
├── ListNode.java       ← (nếu cần) Helper class, do platform cung cấp
├── _solution_ref.java  ← Đáp án mẫu để giảng viên tự kiểm tra
├── grade.bat           ← Script chấm nhanh (Windows)
├── grade.sh            ← Script chấm nhanh (Unix/Mac)
├── grade-ref.bat       ← Test đáp án mẫu (Windows)
└── README.txt          ← Hướng dẫn chi tiết + đề bài
```

---

## Cách dùng — Giảng viên

### Bước 1: Nhận bài của sinh viên

Sinh viên nộp file Java (ví dụ: `LRUCache.java`).

### Bước 2: Chép vào folder bài

```
docs/pc-judge/lru-cache/LRUCache.java   ← GHI ĐÈ file placeholder
```

### Bước 3: Chạy

**Windows:**
```bat
grade.bat
```

**Unix/Mac:**
```bash
bash grade.sh
```

**Thủ công:**
```bash
javac Runner.java LRUCache.java
java Runner
```

### Bước 4: Đọc kết quả

```
TEST|example-1|true|[null, null, null, 1, null, -1]|[null, null, null, 1, null, -1]
TEST|capacity-1|true|[null, null, 100, null, -1, 200]|[null, null, 100, null, -1, 200]
AJ|test-0|true|[]|[]
AJ|test-1|false|[get 5 -> -1]|[get 5 -> 3]   ← Sai tại stress test này
=== DONE ===
```

- **`TEST|...|true`** — Test tĩnh pass
- **`TEST|...|false`** — Test tĩnh fail, hiện actual vs expected
- **`AJ|...|true`** — Stress test pass
- **`AJ|...|false`** — Stress test fail, hiện điểm sai đầu tiên
- **`ERROR|...|<exception>`** — Code bị crash

---

## Generate / Cập nhật

### Generate một bài cụ thể

```bash
npm run pc-judge lru-cache
npm run pc-judge notification-observer ll-merge-two-sorted
```

### Generate toàn bộ 84 bài

```bash
npm run pc-judge:all
```

> **Lưu ý:** Mỗi lần generate sẽ overwrite folder đã có. Không ảnh hưởng đến file bài của sinh viên nếu đã chép vào vì tên file của sinh viên khác với placeholder.

---

## Hai loại bài (mode)

### function_implementation

Sinh viên viết **một function** trong class `Solution`. Runner sẽ:
- Gọi function với từng bộ test case
- So sánh actual vs expected
- Chạy stress tests với random inputs

**Ví dụ:** `sum-subarray-minimums`, `ll-merge-two-sorted`, `stock-span`

### class_implementation

Sinh viên implement **một cả class** (LRUCache, NotificationService...). Runner sẽ:
- Replay chuỗi operations
- Thu thập actual outputs
- So sánh với expected sequence

**Ví dụ:** `lru-cache`, `notification-observer`, `vehicle-factory`

---

## Loại tests

### Static tests (TEST|...)

Sinh từ file `.gen.ts` — các test case cụ thể với input và expected output rõ ràng:

- **Visible tests:** giống test mà sinh viên thấy trên platform
- **Hidden tests:** test bổ sung mà sinh viên không thấy

### Stress tests (AJ|...)

Sinh từ `javaGenerator` trong exercise — code Java generate random inputs và tự tính expected output. Thường có 5-20 test, mỗi test gồm hàng nghìn operations.

Khi pass = false, output hiện điểm sai đầu tiên:
```
AJ|test-5|false|[get 42 -> -1]|[get 42 -> 7]
```

---

## Bộ công cụ Nghiệm thu (Verification)

Sau khi generate xong hàng loạt bài, thay vì vào từng folder chạy thủ công, bạn nên sử dụng script nghiệm thu tự động để rà soát toàn bộ kết quả. Có thể cấu hình npm chạy ở thư mục gốc như sau:

### 1. Test cấu trúc mã khởi tạo (Starter Code)
```bash
npm run pc-judge:verify run-starter
```
Lệnh này sẽ biên dịch mã khởi tạo (code trống) của toàn bộ sinh viên, thu thập log báo lỗi và kiểm tra xem test harness có chạy bình thường hay bị crash không. File báo cáo sẽ được sinh ra ở `docs/pc-judge/1_report_starter.json`.

### 2. Dọn sạch rác
```bash
npm run pc-judge:verify clean
```
Quét và xóa toàn bộ file `.class` biên dịch dư thừa cũng như các file `results.json` cũ trên hàng loạt folder. Rất hữu ích trước khi gửi folder cho giảng viên để đảm bảo môi trường "sạch".

### 3. Nghiệm thu Đáp án mẫu (Reference Verification)
```bash
npm run pc-judge:verify verify-refs
```
Đây là bước **quan trọng nhất**. Script sẽ chép đè đáp án mẫu (`_solution_ref.java`) vào file nộp bài cho từng problem, dịch và chạy test, sau đó quét kết quả JSON để đảm bảo **tất cả tests đạt 100% Pass**. 

Bất kỳ trường hợp nào sai khác (do generator lỗi, hoặc reference lỗi) sẽ lập tức báo `FAILED`. File báo cáo sinh ra tại `docs/pc-judge/3_report_ref.json`.

## Danh sách bài đã có

| ID | Tên bài | Mode | Tests |
|----|---------|------|-------|
| `lru-cache` | LRU Cache | class | 3 static + 20 stress |
| `notification-observer` | Notification Observer | class | 4 static + 20 stress |
| `vehicle-factory` | Vehicle Factory | class | 3 static + 20 stress |
| `ll-merge-two-sorted` | Merge Two Sorted Lists | function | 18 static + 5 stress |
| `sum-subarray-minimums` | Sum of Subarray Minimums | function | 9 static + 5 stress |
| `min-stack` | Min Stack | class | 3 static + 20 stress |
| ... | *(84 bài tổng cộng)* | | |

Xem đầy đủ: `docs/problems_catalog.csv`

---

## Chuẩn hóa giải pháp (Technical)

### Cơ chế convert

Script `scripts/generate-pc-judge.ts` đọc:
1. `<id>.exercise.ts` → lấy metadata, mode, requiredStructure, evaluation.javaGenerator
2. `<id>.gen.ts` → lấy danh sách test cases (visible + hidden)
3. `<id>.solution.java` → copy làm reference

Sau đó sinh ra `Runner.java` với:
- Static test methods cho từng test case
- `runGeneratedTests()` method chứa javaGenerator body
- Helper methods nếu cần (buildList, listToString)

### Patch tự động

Vì javaGenerator trong exercises dùng `RunnerMain.buildList()` (class name cũ của browser runner), script tự động thay thế thành `Runner.buildList()`.

### Compile strategy

Compile chỉ các file cần thiết:
```
javac Runner.java <StudentFile>.java [ListNode.java ...]
```

**Không dùng** `javac *.java` vì `_solution_ref.java` sẽ gây duplicate class error.
