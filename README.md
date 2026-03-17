# edcstore

Landing page + công cụ quản lý sản phẩm đơn giản cho shop online.

## Tech stack hiện tại
- HTML + CSS + JavaScript thuần (không dùng framework build).
- Dữ liệu sản phẩm lưu bằng `localStorage` (key: `edcstore_products_v1`).
- Có tính năng gợi ý mô tả sản phẩm theo dữ liệu nhập từ form.

## Tính năng hiện có
- Giao diện quản lý sản phẩm hiện đại, responsive và dễ dùng.
- Thêm / xoá sản phẩm nhanh, lưu tự động bằng `localStorage`.
- Thống kê nhanh số lượng sản phẩm và giá trung bình.
- Nút **AI gợi ý mô tả** để sinh mô tả bán hàng từ tên + danh mục + giá.

## Chạy local
```bash
python3 -m http.server 4173
# mở http://localhost:4173
```

## Hoàn tất để push GitHub
```bash
git remote add origin https://github.com/wind-of-war/edcstore.git
# nếu đã có origin thì dùng:
# git remote set-url origin https://github.com/wind-of-war/edcstore.git

git push -u origin work
```

> Nếu báo lỗi xác thực, hãy login GitHub CLI (`gh auth login`) hoặc dùng Personal Access Token khi push HTTPS.

## Deploy lên Vercel
Dự án đã có `vercel.json` nên có thể deploy trực tiếp như static site.

### Cách 1: Qua Vercel Dashboard
1. Đăng nhập Vercel bằng GitHub.
2. Import repo `wind-of-war/edcstore`.
3. Giữ cấu hình mặc định (không cần build command).
4. Bấm **Deploy**.

### Cách 2: Qua CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Cấu trúc file
- `index.html`: cấu trúc giao diện và form quản lý sản phẩm.
- `styles.css`: giao diện đẹp + responsive.
- `app.js`: logic thêm sản phẩm, lưu local, và AI gợi ý mô tả.
- `vercel.json`: cấu hình deploy Vercel cho static app.

## Kế hoạch tiếp theo
- Kết nối backend/database để đồng bộ sản phẩm đa thiết bị.
- Thêm upload ảnh trực tiếp thay vì nhập URL ảnh.
- Tích hợp API AI thực tế (OpenAI/Gemini) để sinh mô tả đa phong cách.
