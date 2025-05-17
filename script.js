// Định nghĩa cấu trúc Node cho danh sách liên kết đơn
class Node {
    constructor(tenHocSinh, diemTrungBinh, soDienThoaiPhuHuynh) {
        this.tenHocSinh = tenHocSinh;
        this.diemTrungBinh = diemTrungBinh;
        this.soDienThoaiPhuHuynh = soDienThoaiPhuHuynh;
        this.next = null;
    }
}

// Định nghĩa danh sách liên kết đơn quản lý học sinh
class DanhSachHocSinh {
    constructor() {
        this.head = null;
    }

    // 1. Hàm thêm học sinh vào danh sách liên kết đơn
    themHocSinh(tenHocSinh, diemTrungBinh, soDienThoaiPhuHuynh) {
        // Tạo node mới
        const newNode = new Node(tenHocSinh, diemTrungBinh, soDienThoaiPhuHuynh);

        // Nếu danh sách rỗng, node mới sẽ là head
        if (this.head === null) {
            this.head = newNode;
            return;
        }

        // Nếu danh sách không rỗng, thêm node vào cuối danh sách
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }

    // 2. Hàm tìm học sinh theo tên
    timHocSinhTheoTen(ten) {
        // Nếu danh sách rỗng
        if (this.head === null) {
            console.log("Danh sách học sinh trống!");
            return null;
        }

        // Duyệt qua danh sách để tìm học sinh theo tên
        let current = this.head;
        while (current !== null) {
            // So sánh không phân biệt hoa thường và loại bỏ khoảng trắng dư thừa
            if (current.tenHocSinh.toLowerCase().trim() === ten.toLowerCase().trim()) {
                return current; // Trả về thông tin học sinh nếu tìm thấy
            }
            current = current.next;
        }

        console.log(`Không tìm thấy học sinh có tên "${ten}"`);
        return null;
    }

    // 3. Hàm sắp xếp học sinh theo điểm trung bình giảm dần
    sapXepTheoDiemGiamDan() {
        // Nếu danh sách rỗng hoặc chỉ có một phần tử
        if (this.head === null || this.head.next === null) {
            return;
        }

        // Sử dụng thuật toán Bubble Sort để sắp xếp danh sách liên kết
        let swapped;
        let current;
        let temp = null;

        do {
            swapped = false;
            current = this.head;

            while (current.next !== temp) {
                // Nếu điểm hiện tại nhỏ hơn điểm kế tiếp, hoán đổi (để sắp xếp giảm dần)
                if (current.diemTrungBinh < current.next.diemTrungBinh) {
                    // Hoán đổi dữ liệu giữa 2 node thay vì hoán đổi các liên kết
                    let tempTen = current.tenHocSinh;
                    let tempDiem = current.diemTrungBinh;
                    let tempSdt = current.soDienThoaiPhuHuynh;

                    current.tenHocSinh = current.next.tenHocSinh;
                    current.diemTrungBinh = current.next.diemTrungBinh;
                    current.soDienThoaiPhuHuynh = current.next.soDienThoaiPhuHuynh;

                    current.next.tenHocSinh = tempTen;
                    current.next.diemTrungBinh = tempDiem;
                    current.next.soDienThoaiPhuHuynh = tempSdt;

                    swapped = true;
                }
                current = current.next;
            }
            temp = current;
        } while (swapped);
    }

    // 4. Hàm xóa học sinh theo tên và tái cấu trúc lại danh sách
    xoaHocSinhTheoTen(ten) {
        // Nếu danh sách rỗng
        if (this.head === null) {
            console.log("Danh sách học sinh trống!");
            return false;
        }

        // Trường hợp xóa node đầu tiên (head)
        if (this.head.tenHocSinh.toLowerCase().trim() === ten.toLowerCase().trim()) {
            this.head = this.head.next;
            console.log(`Đã xóa học sinh có tên "${ten}"`);
            return true;
        }

        // Tìm node cần xóa
        let current = this.head;
        while (current.next !== null && current.next.tenHocSinh.toLowerCase().trim() !== ten.toLowerCase().trim()) {
            current = current.next;
        }

        // Nếu tìm thấy
        if (current.next !== null) {
            current.next = current.next.next; // Cập nhật liên kết, bỏ qua node cần xóa
            console.log(`Đã xóa học sinh có tên "${ten}"`);
            return true;
        } else {
            console.log(`Không tìm thấy học sinh có tên "${ten}"`);
            return false;
        }
    }

    // Hàm hiển thị danh sách học sinh để kiểm tra
    hienThiDanhSach() {
        if (this.head === null) {
            console.log("Danh sách học sinh trống!");
            return;
        }

        console.log("Danh sách học sinh:");
        let current = this.head;
        let stt = 1;

        while (current !== null) {
            console.log(`${stt}. Tên: ${current.tenHocSinh}, Điểm TB: ${current.diemTrungBinh}, SĐT phụ huynh: ${current.soDienThoaiPhuHuynh}`);
            current = current.next;
            stt++;
        }
    }
}

// Demo sử dụng
function demo() {
    const danhSach = new DanhSachHocSinh();

    // Thêm học sinh
    danhSach.themHocSinh("Nguyễn Văn A", 8.5, "0901234567");
    danhSach.themHocSinh("Trần Thị B", 9.2, "0912345678");
    danhSach.themHocSinh("Lê Văn C", 7.8, "0923456789");
    danhSach.themHocSinh("Phạm Thị D", 8.9, "0934567890");

    console.log("===== Danh sách học sinh ban đầu =====");
    danhSach.hienThiDanhSach();

    // Tìm học sinh theo tên
    console.log("\n===== Tìm học sinh theo tên =====");
    const ketQuaTimKiem = danhSach.timHocSinhTheoTen("Trần Thị B");
    if (ketQuaTimKiem) {
        console.log("Kết quả tìm kiếm:",
            `Tên: ${ketQuaTimKiem.tenHocSinh}, ` +
            `Điểm TB: ${ketQuaTimKiem.diemTrungBinh}, ` +
            `SĐT phụ huynh: ${ketQuaTimKiem.soDienThoaiPhuHuynh}`);
    }

    // Tìm học sinh không tồn tại
    danhSach.timHocSinhTheoTen("Hoàng Văn X");

    // Sắp xếp học sinh theo điểm trung bình giảm dần
    console.log("\n===== Danh sách sau khi sắp xếp theo điểm TB giảm dần =====");
    danhSach.sapXepTheoDiemGiamDan();
    danhSach.hienThiDanhSach();

    // Xóa học sinh theo tên
    console.log("\n===== Danh sách sau khi xóa học sinh 'Lê Văn C' =====");
    danhSach.xoaHocSinhTheoTen("Lê Văn C");
    danhSach.hienThiDanhSach();

    // Thử xóa học sinh không tồn tại
    danhSach.xoaHocSinhTheoTen("Hoàng Văn X");
}

// Chạy demo
demo();