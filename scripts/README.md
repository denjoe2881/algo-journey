# Algo-Journey Scripts

This directory contains standalone utility scripts for managing and bulk-updating the algorithm exercises catalog.

## How to run

The easiest way to execute these scripts in a modern Node.js environment (ES Modules) is using `npx tsx`. Alternatively, you can use `npx ts-node --esm`.

From the root directory (`d:\EIU\algo-journey`), run:

```bash
npx tsx scripts/<script-name>.ts
# or via npm shortcut (where available):
npm run lint:exercises
```

## Scripts overview

- **`export_catalog.ts`**: Quét toàn bộ các file bài tập (`.exercise.ts`) trong source code và xuất thông tin (ID, Title, Order, Tags) ra một file `docs/problems_catalog.csv` để dễ dàng thống kê và review bên ngoài.
- **`import_catalog.ts`**: Đọc dữ liệu từ file `docs/problems_catalog.csv` nói trên và cập nhật ngược lại các trường `order` và `tags` vào từng file `.exercise.ts` tương ứng. Thường dùng sau khi bạn đã chỉnh sửa hàng loạt tags/order trên file Excel.
- **`update_order.ts`**: Tự động đánh lại số thứ tự (`order`) cho một danh sách các bài tập cố định (như mảng Arrays) dựa trên mảng config có sẵn trong code (bắt đầu từ số 401).
- **`generate-pc-judge.ts`**: Chuyển đổi các bài tập `.exercise.ts` trên platform thành các package Java độc lập (PC Judge) giúp giảng viên chấm điểm tự động (chạy qua CLI) mà không cần browser. Xem chi tiết tại [Hướng dẫn PC Judge](./pc-judge-guide.md).
- **`verify-pc-judge.ts`**: Công cụ chạy nghiệm thu tất cả bài tập đã xuất ra bằng `generate-pc-judge.ts`. Tự động scan kết quả test lỗi qua file JSON khi chạy bằng Code Khởi tạo (Starter Code) hoặc Mã mẫu (Reference Solution).
- **`lint_exercises.ts`**: Kiểm tra tự động các lỗi cú pháp phổ biến trong tất cả file `.exercise.ts` và `.gen.ts`. Nên chạy script này mỗi khi thêm bài tập mới để tránh lỗi runtime trên trình duyệt.

  Chạy nhanh qua npm:
  ```bash
  npm run lint:exercises
  ```

  Các lỗi được phát hiện:

  | # | Lỗi | Triệu chứng trên browser |
  |---|---|---|
  | 1 | `\\'` (double-escape) trong single-quoted string | `Expected "]" but found "s"` — Vite crash khi build |
  | 2 | `${var}` chưa escape bên trong backtick template literal | `ReferenceError: X is not defined` — trang trắng khi load |
  | 3 | `.gen.ts` dùng `export const genMap` thay vì `export default defineTests(...)` | Auto-test luôn trả về rỗng, mọi bài đều failed |
